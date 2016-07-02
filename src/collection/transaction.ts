import { Class, ClassDefinition } from '../class.ts'
import { begin, commit, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record } from '../record/index.ts'

export class Collection extends Class implements Transactional {
    /***********************************
     * Core Members
     */
    // Previous attributes
    models : Record[]
    _byId : Index

    model : typeof Record

    get length() : number { return this.models.length; }

    // Transactional control
    _transaction : boolean
    _isDirty : boolean

    _notifyChange( options : TransactionOptions ){
        // TODO: send 'changes' event
    }

    _notifyChangeItem( event : 'add' | 'remove' | 'change', record : Record, options : TransactionOptions ){
        // TODO : send item change event 
    }

    _notifyBulkChange( event : 'update' | 'reset' | 'sort', options : TransactionOptions ){
        //TBD
    }

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
    createTransaction( elements : Elements, options : TransactionOptions = {} ) : CollectionTransaction {
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


type Elements = ( Object | Record )[];
const silence = { silent : true };

interface CollectionOptions extends TransactionOptions {
    sort? : boolean
}

function emptySetTransaction( collection : Collection, items : Elements, options : CollectionOptions, silent? : boolean ){
    const isRoot = begin( collection );

    const added = _reallocateEmpty( collection, items, options );

    if( added.length ){
        const needSort = makeSorted( collection, options );
        return new CollectionTransaction( collection, isRoot, added, [], [], needSort );
    }

    // No changes...
    isRoot && commit( collection, options );
};

interface AddOptions extends CollectionOptions {
    at? : number 
}

function addTransaction( collection, items, options : AddOptions ){
    const isRoot = begin( collection ),
          nested = [];

    var added = _append( collection, items, nested, options );

    if( added.length || nested.length ){
        let needSort = makeSortedOrInsert( collection, added, options );
        return new CollectionTransaction( collection, isRoot, added, [], nested, needSort );
    }

    // No changes...
    isRoot && commit( collection, options );
};

function setTransaction( collection, items, options ){
    const isRoot = begin( collection ),
          nested = [];

    var previous = collection.models,
        added    = _reallocate( collection, items, nested, options );

    const reusedCount = collection.models.length - added.length,
          removed = reusedCount < previous.length ? (
                        reusedCount ? _garbageCollect( collection, previous ) :
                                        _disposeAll( collection, previous )
                    ) : [];                    
    
    const addedOrChanged = nested.length || added.length,
          needSort = addedOrChanged && makeSorted( collection, options );

    if( addedOrChanged || removed.length ){
        return new CollectionTransaction( collection, isRoot, added, removed, nested, needSort );
    }

    isRoot && commit( collection, options );
};


// Remove references to all previous elements, which are not present in collection.
// Returns an array with removed elements.
function _garbageCollect( collection : Collection, previous : Record[] ) : Record[]{
    const { _byId }  = collection,
          removed = [];

    // Filter out removed models and remove them from the index...
    for( let record of previous ){
        if( !_byId[ record.cid ] ){
            removed.push( record );
            removeReference( collection, record );
        }
    }

    return removed;
}

// Remove all references to previous elements, and return them.
function _disposeAll( collection : Collection, previous : Record[] ) : Record[]{
    // Filter out removed models and remove them from the index...
    for( let record of previous ){
        removeReference( collection, record );
    }

    return previous;
}

// reallocate model and index
function _reallocate( collection : Collection, source, nested : Transaction[], options ){
    var models      = Array( source.length ),
        _byId : Index = {},
        merge       = options.merge == null ? true : options.merge,
        _prevById   = collection._byId,
        idAttribute = collection.model.prototype.idAttribute,
        toAdd       = [];

    // for each item in source set...
    for( var i = 0, j = 0; i < source.length; i++ ){
        var item  = source[ i ],
            model = null;

        if( item ){
            var id  = item[ idAttribute ],
                cid = item.cid;

            if( _byId[ id ] || _byId[ cid ] ) continue;

            model = _prevById[ id ] || _prevById[ cid ];
        }

        if( model ){
            if( merge && item !== model ){
                var attrs = item.attributes || item;
                const transaction = model.createTransaction( attrs, options );
                transaction && nested.push( transaction );
            }
        }
        else{
            model = convertAndRef( collection, item, options );
            toAdd.push( model );
        }

        models[ j++ ] = model;
        addIndex( _byId, model );
    }

    models.length = j;
    collection.models   = models;
    collection._byId    = _byId;

    return toAdd;
}

// Add reference to the record.
function addReference( collection : Collection, model : Record ) : void {
    model._owner || ( model._owner = collection );
}

// Remove reference to the record.
function removeReference( collection : Collection, model : Record ) : void {
    if( collection === model._owner ){
        model._owner = void 0;
    }
}

// Silently sort collection, if its required. Returns true if sort happened.  
function makeSorted( collection : Collection, options : CollectionOptions ) : boolean {
    if( collection.comparator && options.sort !== false ){
        collection.sort({ silence : true });
        return true;
    }

    return false;
}

// Handle sort or insert at options for add operation. Reurns true if sort happened. 
function makeSortedOrInsert( collection : Collection, added : Record[], options : AddOptions ) : boolean {
        let at = options.at;
        if( at != null ){
            // if at is given, it overrides sorting option...
            at = +at;
            if( at < 0 ) at += collection.length + 1;
            if( at < 0 ) at = 0;
            if( at > collection.length ) at = collection.length;

            _move( collection.models, at, added );
            return false;
        }

        return makeSorted( collection, options );
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
class CollectionTransaction implements Transaction {
    // open transaction
    constructor(    public object : Collection,
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