/***
 * Two-phase transactions on ownership tree.
 * 1. createTransaction() - apply changes to an object tree, and if there are some events to send, transaction object is created.
 * 2. transaction.commit() - send and process all change events, and close transaction.
 */

// Transactional object interface
export interface Transactional {
    // true while inside of the transaction
    _transaction : boolean

    // true, when in the middle of transaction and there're changes but is an unsent change event
    _isDirty  : boolean

    // Backreference set by owner (Record, Collection, or other object)
    _owner : Owner

    // Key supplied by owner. Used by record to identify attribute key.
    // Only collections doesn't set the key, which is used to distinguish collections.  
    _ownerKey : string

    // Returns nearest owner skipping collections.
    //getOwner() : Owner

    // Deeply clone ownership subtree, optionally setting the new owner
    // (TODO: Do we really need it? Record must ignore events with empty keys) 
    clone( owner? ) : this
    
    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options? : TransactionOptions ) : void

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( values : {}, options? : TransactionOptions ) : this

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.
    // Returns null if there are no any changes.  
    createTransaction( values : any, options? : TransactionOptions ) : Transaction
    
    // Parse function applied when 'parse' option is set for transaction.
    parse( data : any ) : any

    // Convert object to the serializable JSON structure
    toJSON() : {}

    // Notify on changes 
    _notifyChange( options : TransactionOptions )
}

// Owner must accept children update events. It's an only way children communicates with an owner.
export interface Owner {
    _onChildrenChange( child : Transactional, options : TransactionOptions );
}

// Transaction object used for two-phase commit protocol.
export interface Transaction {
    // Object transaction is being made on.
    object : Transactional

    // Send out change events, process update triggers, and close transaction.
    // Nested transactions must be marked with isNested flag (it suppress owner notification).
    commit( options? : TransactionOptions, isNested? : boolean )
}

// Options for distributed transaction  
export interface TransactionOptions {
    // Invoke parsing 
    parse? : boolean

    // Suppress change notifications and update triggers
    silent? : boolean

    // Update existing transactional members in place, or skip the update (ignored by models)
    merge? : boolean // =true

    // Should collections remove elements in set (ignored by models)  
    remove? : boolean // =true

    // Always replace enclosed objects with new instances
    reset? : boolean // = false
}

/**
 * Low-level transactions API. Must be used like this:
 * const isRoot = begin( record );
 * ...
 * isRoot && commit( record, options );
 * 
 * When committing nested transaction, the flag must be set to true. 
 * commit( object, options, isNested ) 
 */

// Start transaction. Return true if it's opening transaction.
export function begin( object : Transactional ) : boolean {
    return object._transaction ? false : ( object._transaction = true );  
}

// Commit transaction. Send out change event and notify owner. Returns true if there were changes.
// Should be executed for the root transaction only.
export function commit( object : Transactional, options : TransactionOptions, isNested? : boolean ){
    const wasDirty = object._isDirty;

    if( options.silent ){
        object._isDirty  = false;
    }
    else{
        while( object._isDirty ){
            object._isDirty = false;
            object._notifyChange( options );
        }
    }
    
    object._transaction = false;

    // Don't notify owner for the case of nested transaction, it already knows if there were changes  
    if( !isNested && wasDirty && object._owner ){
        object._owner._onChildrenChange( object, options );
    }
}

/************************************
 * Reference management
 */

// Add reference to the record.
export function aquire( owner : Owner, child : Transactional ) : void {
    child._owner || ( child._owner = owner );
}

// Remove reference to the record.
export function free( owner : Owner, child : Transactional ) : void {
    if( owner === child._owner ){
        child._owner = void 0;
    }
}

export function freeAll< T extends Transactional >( collection : Owner, children : T[] ) : T[]{
    for( let child of children ){
        free( collection, child );
    }

    return children;
}