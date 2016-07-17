import { Record } from '../record/index.ts'
import { Owner, aquire, free, Transaction, markAsDirty,
        TransactionOptions, Transactional, commit } from '../transactions.ts'

import { trigger2, trigger3 } from '../objectplus/index.ts'        

export interface CollectionCore extends Transactional, Owner {
    _byId : IdIndex
    models : Record[]
    model : typeof Record
    _comparator : Comparator    
}

// Collection's manipulation methods elements
export type Elements = ( Object | Record )[];

export interface CollectionOptions extends TransactionOptions {
    sort? : boolean
}

export type Comparator = ( a : Record, b : Record ) => number;  

export function dispose( collection : CollectionCore ) : Record[]{
    const models = collection.models;

    collection.models = [];
    collection._byId  = {};

    freeAll( collection, models );
    return models;
}

export function freeAll( collection : CollectionCore, children : Record[] ) : Record[] {
    for( let child of children ){
        free( collection, child );
    }

    return children;
}

// Silently sort collection, if its required. Returns true if sort happened.  
export function sortElements( collection : CollectionCore, options : CollectionOptions ) : boolean {
    let { _comparator } = collection;
    if( _comparator && options.sort !== false ){
        collection.models.sort( ( a, b ) => _comparator.call( collection, a, b ) )
        return true;
    }

    return false;
}

/**********************************
 * Collection Index 
 */

// Index data structure
export interface IdIndex {
    [ id : string ] : Record
}

// Add record
export function addIndex( index : IdIndex, model : Record ) : void {
    index[ model.cid ] = model;
    var id             = model.id;
    
    if( id != null ){
        index[ id ] = model;
    }
}

// Remove record
export function removeIndex( index : IdIndex, model : Record ) : void {
    delete index[ model.cid ];
    var id = model.id;
    if( id != null ){
        delete index[ id ];
    }
}

// convert argument to model. Return false if fails.
export function toModel( collection : CollectionCore, attrs, options ){
    const { model } = collection;
    return attrs instanceof model ? attrs : model.create( attrs, options, collection );
}

export function convertAndAquire( collection : CollectionCore, attrs, options ){
    const { model } = collection,
    	  record = attrs instanceof model ? attrs : model.create( attrs, options, collection );

    aquire( collection, record );
    return record;
}

/***
 * In Collections, transactions appears only when
 * add remove or change events might be emitted.
 * reset doesn't require transaction.
 * 
 * Transaction holds information regarding events, and knows how to emit them.
 * 
 * Two major optimization cases.
 * 1) Population of an empty collection
 * 2) Update of the collection (no or little changes) - it's crucial to reject empty transactions.
 * 3) 
 */


// Transaction class. Implements two-phase transactions on object's tree. 
export class CollectionTransaction implements Transaction {
    // open transaction
    constructor(    public object : CollectionCore,
                    public isRoot : boolean,
                    public added : Record[],
                    public removed : Record[],
                    public nested : Transaction[],
                    public sorted : boolean ){
        markAsDirty( object );
    }

    // commit transaction
    commit( options : TransactionOptions = {}, isNested? : boolean ){
        const { nested, object } = this;

        // Commit all nested transactions...
        for( let transaction of nested ){
            transaction.commit( options, true );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { added, removed } = this;

            for( let record of added ){
                trigger3( object, 'add', record, object, options );
            }

            for( let record of removed ){
                trigger3( object, 'remove', record, object, options );
            }

            for( let transaction of nested ){
                trigger2( object, 'change', transaction.object, options );
            }

            if( this.sorted ){
                trigger2( object, 'sort', object, options );
            }

            if( added.length || removed.length ){
                trigger2( object, 'update', object, options );
            }
        }

        this.isRoot && commit( object, options, isNested );
    }
}