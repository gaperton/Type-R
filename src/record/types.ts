/*************************************************************
 * Transactional object API
 * 
 Transactional object is an object which can be a part of distributed transaction
 * when it resides in Record attributes. Transactions follows simple two-phase commit procedure.
 * 
 * Being 'transactional' means that object:
 * - is serializable to JSON
 * - is a member of ownership tree
 * - can be updated in place
 * - notifies owner about changes
 */

export interface TransactionalConstructor {
    new ( values? : {}, options? : TransactionOptions, owner? : Owner) : Transactional
    create( values? : {}, options? : TransactionOptions, owner? : Owner) : Transactional
    prototype : Transactional
}

// Transactional object interface
export interface Transactional {
    // Backreference set by owner (Record, Collection, or other object)
    _owner : Owner

    // Key supplied by owner. Used by record to distinguish change events from different children.
    // Collections does not set the key. 
    _ownerKey : string

    // Returns nearest owner skipping collections.
    getOwner() : Owner

    // Deeply clone ownership subtree, optionally setting the new owner
    // (TODO: Do we really need it? Record must ignore events with empty keys) 
    clone( owner? ) : this
    
    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options? : TransactionOptions ) : void

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( values : {}, options? : TransactionOptions ) : this

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    createTransaction( values : {}, options? : TransactionOptions ) : Transaction
    
    // Parse function applied when 'parse' option is set for transaction.
    parse( data : any ) : any

    // Convert object to the serializable JSON structure
    toJSON() : any
}

// Owner must accept children update events. It's an only way children communicates with an owner.
export interface Owner {
    _onChildrenChange( child : Transactional, options : TransactionOptions );
}

// Transaction object used for two-phase commit protocol.
export interface Transaction {
    // Send out change events, process update triggers, and close transaction.  
    commit( options? : TransactionOptions )
}

// Options for distributed transaction  
export interface TransactionOptions {
    // Invoke parsing 
    parse? : boolean

    // Suppress change notifications and update triggers
    silent? : boolean
}


/****************************************************
 * 
 * 
 * 
 */

// Constructor type
export interface Constructor {
    new ( ...args : any[] ) : any
}

export interface AttributeType extends Constructor {
    _attribute : Constructor
}

export interface AttributeOptions {
    getHooks : GetHook[]
    transforms : Transform[]
    changeHandlers : ChangeHandler[]
    isRequired? : boolean
    value? : any
    onChange? : ChangeAttrHandler
    type? : Constructor

    parse? : ( data : any, key : string ) => any
    toJSON? : ( key : string ) => any
}

type GetHook = ( value : any, key : string ) => any;
export type ChangeAttrHandler = ( ( value : any, attr : string ) => void ) | string;