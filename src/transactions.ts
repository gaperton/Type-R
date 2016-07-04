import { Messenger, trigger2, trigger3, assign } from './toolkit/index.ts'

/***
 * Two-phase transactions on ownership tree.
 * 1. createTransaction() - apply changes to an object tree, and if there are some events to send, transaction object is created.
 * 2. transaction.commit() - send and process all change events, and close transaction.
 */

// Transactional object interface
export abstract class Transactional extends Messenger {
    // Unique version token replaced on change
    _changeToken : {} = {}

    // true while inside of the transaction
    _transaction : boolean = false;

    // true, when in the middle of transaction and there're changes but is an unsent change event
    _isDirty  : boolean = false;

    // Backreference set by owner (Record, Collection, or other object)
    _owner : Owner

    // Key supplied by owner. Used by record to identify attribute key.
    // Only collections doesn't set the key, which is used to distinguish collections.  
    _ownerKey : string

    // Name of the change event
    _changeEventName : string

    constructor( cid : string | number, owner? : Owner, ownerKey? : string ){
        super( cid );
        this._owner = owner;
        this._ownerKey = ownerKey;
    }

    // Returns nearest owner skipping collections.
    //getOwner() : Owner

    // Deeply clone ownership subtree, optionally setting the new owner
    // (TODO: Do we really need it? Record must ignore events with empty keys) 
    abstract clone( owner? ) : this
    
    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options? : TransactionOptions ) : void{
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( values : any, options? : TransactionOptions ) : this {
        if( values ){
            const transaction = this.createTransaction( values, options );
            transaction && transaction.commit( options, true );
        } 

        return this;
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.
    // Returns null if there are no any changes.  
    abstract createTransaction( values : any, options? : TransactionOptions ) : Transaction
    
    // Parse function applied when 'parse' option is set for transaction.
    parse( data : any ) : any { return data }

    // Convert object to the serializable JSON structure
    abstract toJSON() : {}

    /***
     * Validation API
     */

    // Lazily evaluated validation error
    _validationError : ValidationError = void 0

    get validationError(){
        return this._validationError || ( this._validationError = new ValidationError( this ) );
    }

    // Validate nested members. Returns errors count.
    abstract _validateNested( errors : ChildrenErrors ) : number;

    // Object-level validator.
    // Anything it returns except undefined is an error
    validate( obj : Transactional ) : any {}

    // Return validation error (or undefined) for nested object with the given key. 
    getValidationError( key : string ) : any {
        var error = this.validationError;
        return ( key ? error && error.nested[ key ] : error ) || null;
    }

    // Check whenever member with a given key is valid. 
    isValid( key : string ) : boolean {
        return !this.getValidationError( key );
    }
}

Transactional.prototype._changeEventName = 'change';

interface ChildrenErrors {
    [ key : string ] : ValidationError | any
} 

// Validation error object.
export class ValidationError {
    // Invalid nested object keys 
    nested : ChildrenErrors 
    length : number

    // Local error
    error : any

    constructor( obj : Transactional ){
        this.length = obj._validateNested( this.nested = {} );

        if( this.error = obj.validate( obj ) ){
            this.length++;
        }
    }
}

// Owner must accept children update events. It's an only way children communicates with an owner.
export interface Owner {
    _onChildrenChange( child : Transactional, options : TransactionOptions );
}

// Transaction object used for two-phase commit protocol.
// Must be implemented by subclasses.
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

    validate? : boolean
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

// Start transaction. Return true if it's the root one.
export function begin( object : Transactional ) : boolean {
    return object._transaction ? false : ( object._transaction = true );  
}

// Mark transactional object as dirty, so change event will be sent on commit.
export function markAsDirty( object : Transactional ){
    object._isDirty  = true;
    object._changeToken = {};
    object._validationError = void 0;
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
            trigger2( object, object._changeEventName, object, options );
        }
    }
    
    object._transaction = false;

    // Don't notify owner for the case of nested transaction, it already knows if there were changes  
    if( !isNested && wasDirty && object._owner ){
        object._owner._onChildrenChange( object, options );
    }
}

/************************************
 * Ownership management
 */

// Add reference to the record.
export function aquire( owner : Owner, child : Transactional, key? : string ) : void {
    if( !child._owner ){
        child._owner = owner;
        child._ownerKey = key;
    }
}

// Remove reference to the record.
export function free( owner : Owner, child : Transactional ) : void {
    if( owner === child._owner ){
        child._owner = void 0;
        child._ownerKey = void 0;
    }
}

// TODO: move to commons
export function freeAll( collection : Owner, children : Transactional[] ) : void{
    for( let child of children ){
        free( collection, child );
    }
}