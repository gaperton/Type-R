import { Class, ClassDefinition } from '../class.ts'
import { Transactional, Transaction, TransactionOptions, Owner } from '../types.ts'
import { Record } from '../record/index.ts'

export class Collection< Model extends Record > extends Class implements Transactional {
    /***********************************
     * Core Members
     */
    // Previous attributes
    models : Model[]
    _byId : Index< Model >

    model : typeof Record

    get length() : number { return this.models.length; }

    // Transactional control
    _changing : boolean
    _pending : boolean

    /**
     * Ownerhsip API
     */
    // Reference to owner
    _owner : Owner

    // Owner's attribute name, if it's Record 
    _ownerKey : string

    // Deeply clone collection, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.models, { clone : true }, owner );
    }

    toJSON() : Object[] {
        return this.models.map( model => model.toJSON() );
    }

    parse( data : any ) : Object[] { return data; }

    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options? : TransactionOptions ) : void {

    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( elements : ( {} | Model )[], options? : TransactionOptions ) : this {
        // Handle reset option here - no way it will be populated from the top as nested transaction. 
        return ( options.reset ? this.reset( elements, options ) : 
                                 this.createTransaction( elements, options ).commit( options ) );
    }

    reset( elements : ( {} | Model )[], options : TransactionOptions = {} ) : this {
        const previousModels = dispose( this );
        emptySet( this, elements, options );

        return previousModels;
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    createTransaction( elements : ( {} | Model )[], options : TransactionOptions = {} ) : CollectionTransaction {
        if( this.models.length ){
            const { remove } = options;
            return remove === void 0 || remove ? setTransaction( this, elements, options ) : addTransaction( this, elements, options );
        }
        else{
            return emptySetTransaction( this, elements, options );
        }
    }

}

interface Index {
    [ id : string ] : Record
}


exports.emptySet = function emptySet( collection, items, a_options, silent ){
    var options = new MergeOptions( a_options, collection );

    if( silent ){
        options.silent = silent;
    }

    var added = _reallocateEmpty( collection, items, options );

    collection._changed || ( collection._changed = added.length );

    var needSort = options.sort && added.length;
    if( needSort ) collection.sort( silence );

    options.silent || options.notify( collection, added, needSort );

    return added;
};


/***
 */


// Transaction class. Implements two-phase transactions on object's tree. 
class CollectionTransaction implements Transaction {
    isRoot : boolean
    changed : Record[]
    added : Record[]
    removed : Record[]
    nested : Transaction[]

    // open transaction
    constructor( public collection : Collection ){
        this.isRoot  = begin( model );
        this.added = [];
        this.removed = [];
        this.changed  = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options : TransactionOptions = {} ){
        const { nested, model } = this;

        // Commit all nested transactions...
        for( let i = 0; i < nested.length; i++ ){
            nested[ i ].commit( options );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { changes } = this;

            if( changes.length ){
                model._pending = true;
            }

            for( let i = 0; i < changes.length; i++ ){
                model._notifyChangeAttr( changes[ i ], options )
            }
        }

        this.isRoot && commit( model, options );
    }
}

class RecordTransaction implements Transaction {
    isRoot : boolean
    changes : string[]
    nested : Transaction[]

    // open transaction
    constructor( public object : Record ){
        this.isRoot  = begin( object );
        this.changes = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options : TransactionOptions = {} ){
        const { nested, object, changes } = this;

        // Commit all nested transactions...
        //TODO
        /***
         * Consider returning changed flag from commit. In this way, we may avoid expensive bubbling.
         * And keep right notifications semantic. Parent needs to be notified from the set or transaction method. Only root transaction notifies the parent.
         * Problem arize when different subtree is modified from the trigger. Thus, these parazite updates must be handled as separate transaction.
         */
        for( let transaction of nested ){ 
            if( transaction.commit( options ) ){
                changes.push( transaction.object._ownerKey );
            }
        }

        // Notify listeners on attribute changes...
        const { length } = changes;

        if( !options.silent ){
            if( length ){
                object._pending = true;
            }

            for( let i = 0; i < length; i++ ){
                object._notifyChangeAttr( changes[ i ], options )
            }
        }

        this.isRoot && commit( object, options );

        return length;
    }
}