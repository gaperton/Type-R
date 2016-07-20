import { Messenger, trigger2, trigger3, assign, define, Constructor, ExtendableConstructor } from './objectplus/index.ts'
import { ValidationError, Validatable, ChildrenErrors } from './validation.ts'
import { Traversable, resolveReference } from './references.ts'
/***
 * Abstract class implementing ownership tree, tho-phase transactions, and validation. 
 * 1. createTransaction() - apply changes to an object tree, and if there are some events to send, transaction object is created.
 * 2. transaction.commit() - send and process all change events, and close transaction.
 */

export type TransactionalConstructor = ExtendableConstructor< Transactional >;

// Transactional object interface
@define({
    _changeEventName : 'change'
})
export abstract class Transactional extends Messenger implements Validatable, Traversable {
    // Unique version token replaced on change
    _changeToken : {} = {}

    // true while inside of the transaction
    _transaction : boolean = false;

    // Holds current transaction's options, when in the middle of transaction and there're changes but is an unsent change event
    _isDirty  : TransactionOptions = null;

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

    // Deeply clone ownership subtree, optionally setting the new owner
    // (TODO: Do we really need it? Record must ignore events with empty keys)
    // 'Pin store' shall assign this._defaultStore = this.getStore();
    abstract clone( options? : { owner? : Owner, key? : string, pinStore? : boolean }) : this
    
    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options : TransactionOptions = {} ) : void{
        const isRoot = begin( this );
        fun.call( this, this );
        isRoot && commit( this );
    }

    // Loop through the members in the scope of transaction.
    // Transactional version of each()
    updateEach( iteratee : ( val : any, key : string ) => void, options? : TransactionOptions ){
        const isRoot = begin( this );
        this.each( iteratee );
        isRoot && commit( this );
    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( values : any, options? : TransactionOptions ) : this {
        if( values ){ 
            const transaction = this._createTransaction( values, options );
            transaction && transaction.commit();
        } 

        return this;
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.
    // Returns null if there are no any changes.  
    abstract _createTransaction( values : any, options? : TransactionOptions ) : Transaction
    
    // Parse function applied when 'parse' option is set for transaction.
    parse( data : any ) : any { return data }

    // Convert object to the serializable JSON structure
    abstract toJSON() : {}

    /*******************
     * Traversals and member access
     */
    
    // Get object member by its key.
    abstract get( key : string ) : any

    // Get object member by symbolic reference.
    deepGet( reference : string ) : any {
        return resolveReference( this, reference, ( object, key ) => object.get( key ) );
    }

    //_isCollection : boolean

    // Return owner skipping collections.
    getOwner() : Owner {
        return this._owner;
    }

    // Store used when owner chain store lookup failed. Static value in the prototype. 
    _defaultStore : Transactional

    // Locate the closest store. Store object stops traversal by overriding this method. 
    getStore() : Transactional {
        const { _owner } = this;
        return _owner ? <Transactional> _owner.getStore() : this._defaultStore;
    }


    /***************************************************
     * Iteration API
     */

    // Loop through the members. Must be efficiently implemented in container class.
    abstract each( iteratee : ( val : any, key : string | number ) => void, context? : any )

    // Map members to an array
    map<T>( iteratee : ( val : any, key : string ) => T, context? : any ) : T[]{
        const arr : T[] = [],
              fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee;
        
        this.each( ( val, key ) => {
            const result = fun( val, key );
            if( result !== void 0 ) arr.push( result );
        } );

        return arr;
    }

    // Map members to an object
    mapObject<T>( iteratee : ( val : any, key : string | number ) => T, context? : any ) : { [ key : string ] : T }{
        const obj : { [ key : string ] : T } = {},
            fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee;
        
        this.each( ( val, key ) => {
            const result = iteratee( val, key );
            if( result !== void 0 ) obj[ key ] = result;
        } );

        return obj;
    }

    // Get array of attribute keys (Record) or record ids (Collection) 
    keys() : string[] {
        return this.map( ( value, key ) => {
            if( value !== void 0 ) return key;
        });
    }

    // Get array of attribute values (Record) or records (Collection)
    values() : any[] {
        return this.map( value => value );
    }
    
    /*********************************
     * Validation API
     */

    // Lazily evaluated validation error
    _validationError : ValidationError = void 0

    // Validate ownership tree and return valudation error 
    get validationError() : ValidationError {
        const error = this._validationError || ( this._validationError = new ValidationError( this ) );
        return error.length ? error : null; 
    }

    _invalidate( options : { validate? : boolean } ) : boolean {
        var error;
        if( options.validate && ( error = this.validationError ) ){
            this.trigger( 'invalid', this, error, assign( { validationError : error }, options ) );
            return true;
        }
    }

    // Validate nested members. Returns errors count.
    abstract _validateNested( errors : ChildrenErrors ) : number

    // Object-level validator. Returns validation error.
    validate( obj? : Transactional ) : any {}

    // Return validation error (or undefined) for nested object with the given key. 
    getValidationError( key : string ) : any {
        var error = this.validationError;
        return ( key ? error && error.nested[ key ] : error ) || null;
    }

    // Get validation error for the given symbolic reference.
    deepValidationError( reference : string ) : any {
        return resolveReference( this, reference, ( object, key ) => object.getValidationError( key ) );
    }

    // Iterate through all validation errors across the ownership tree.
    eachValidationError( iteratee : ( error : any, key : string, object : Transactional ) => void ) : void {
        const { validationError } = this;
        validationError && validationError.eachError( iteratee, this );
    }

    // Check whenever member with a given key is valid. 
    isValid( key : string ) : boolean {
        return !this.getValidationError( key );
    }
}

// Owner must accept children update events. It's an only way children communicates with an owner.
export interface Owner extends Traversable {
    _onChildrenChange( child : Transactional, options : TransactionOptions ) : void;
    getOwner() : Owner
    getStore() : Transactional
}

// Transaction object used for two-phase commit protocol.
// Must be implemented by subclasses.
// Transaction must be created if there are actual changes and when markIsDirty returns true. 
export interface Transaction {
    // Object transaction is being made on.
    object : Transactional

    // Send out change events, process update triggers, and close transaction.
    // Nested transactions must be marked with isNested flag (it suppress owner notification).
    commit( isNested? : boolean )
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

// Mark object having changes inside of the current transaction.
// Returns true whenever there notifications are required.
export function markAsDirty( object : Transactional, options : TransactionOptions ) : boolean {
    // If silent option is in effect, don't set isDirty flag.
    const dirty = !options.silent;
    if( dirty ) object._isDirty = options;
    
    // Reset version token.
    object._changeToken = {};

    // Object is changed, so validation must happen again. Clear the cache.
    object._validationError = void 0;

    return dirty;
}

// Commit transaction. Send out change event and notify owner. Returns true if there were changes.
// Must be executed for the root transaction only.
export function commit( object : Transactional, isNested? : boolean ){
    let originalOptions = object._isDirty;

    if( originalOptions ){
        // Send the sequence of change events, handling chained handlers.
        while( object._isDirty ){
            const options = object._isDirty;
            object._isDirty = null; 
            trigger2( object, object._changeEventName, object, options );
        }
        
        // Mark transaction as closed.
        object._transaction = false;

        // Notify owner on changes out of transaction scope.
        const { _owner } = object;  
        if( _owner && !isNested ){ // If it's the nested transaction, owner is already aware there are some changes.
            _owner._onChildrenChange( object, originalOptions );
        }
    }
    else{
        // No changes. Silently close transaction.
        object._isDirty = null;
        object._transaction = false;
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