import { Record } from '../record/index.ts'
import { Owner, aquire, free, Transaction, 
        TransactionOptions, Transactional, commit } from '../transactions.ts'

export interface CollectionCore extends Transactional, Owner {
    _byId : IdIndex
    models : Record[]
    model : typeof Record
    comparator : Comparator    
    sortBy( c : Comparator ) : Record[]

    _notifyChange( options : TransactionOptions ) : void
    _notifyChangeItem( event : 'add' | 'remove' | 'change', record : Record, options : TransactionOptions )
    _notifyBulkChange( event : 'update' | 'reset' | 'sort', options : TransactionOptions )
}

export interface CollectionOptions extends TransactionOptions {
    sort? : boolean
}

export type Comparator = string |
            ( ( a : Record ) => number ) |
            ( ( a : Record, b : Record ) => number );  

export function dispose( collection : CollectionCore ) : Record[]{
    const models = collection.models;

    collection.models = [];
    collection._byId  = {};

    freeAll( collection, models );
    return models;
}

export function freeAll( collection : CollectionCore, children : Transactional[] ) : void {
    for( let child of children ){
        free( collection, child );
    }
}

// Silently sort collection, if its required. Returns true if sort happened.  
export function sortElements( collection : CollectionCore, options : CollectionOptions ) : boolean {
    let { comparator } = collection;
    if( comparator && options.sort !== false ){
        collection.models = typeof comparator === 'functon' ? (
            comparator.length === 1 ?
                    collection.sortBy( x => comparator.call( collection, x ) ) :
                    collection.models.sort( ( a, b ) => comparator.call( collection, a, b ) )
        ) : collection.sortBy( comparator );
        
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
        object._isDirty = true;
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
                object._notifyChangeItem( 'add', record, options );
            }

            for( let record of removed ){
                object._notifyChangeItem( 'remove', record, options );
            }

            for( let transaction of nested ){
                object._notifyChangeItem( 'change', <Record> transaction.object, options );
            }

            if( this.sorted ){
                object._notifyBulkChange( 'sort', options );
            }

            if( added.length || removed.length ){
                object._notifyBulkChange( 'update', options );
            }
        }

        this.isRoot && commit( object, options, isNested );
    }
}