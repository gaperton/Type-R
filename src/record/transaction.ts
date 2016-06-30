/**
 * Record core implementing transactional updates.
 * The root of all definitions. 
 */

import { log } from '../tools.ts'
import { Class, ClassDefinition } from '../class.ts'

// TODO: Move these definitions here.
import { Constructor, Transactional, Transaction, TransactionOptions, Owner } from '../types.ts'

/***************************************************************
 * Record Definition as accepted by Record.define( definition )
 */

export interface RecordDefinition extends ClassDefinition {
    attributes? : AttributeDescriptorMap
}

export interface AttributeDescriptorMap {
    [ name : string ] : AttributeDescriptor
}

export interface AttributeDescriptor {
    type? : Constructor
    value? : any

    parse? : AttributeParse
    toJSON? : AttributeToJSON
   
    getHooks? : GetHook[]
    transforms? : Transform[]
    changeHandlers? : ChangeHandler[]
}

export type GetHook = ( value : any, key : string ) => any;

export type ChangeAttrHandler = ( ( value : any, attr : string ) => void ) | string;
export type Transform = ( next : any, options : TransactionOptions, prev : any, record : Record ) => any;
export type ChangeHandler = ( next : any, prev : any, record : Record ) => void;

export type AttributeToJSON = ( value : any, key : string ) => any
export type AttributeParse = ( value : any, key : string ) => any

/*************************************
 * Attribute definitions
 */
export interface AttributesValues {
    [ key : string ] : any
}

export type CloneAttributesCtor = new ( x : AttributesValues ) => AttributesValues

export interface AttributesSpec {
    [ key : string ] : Attribute
}

export interface Attribute extends AttributeUpdatePipeline, AttributeSerialization {
    clone( value : any ) : any
    create() : any
}

export interface AttributeUpdatePipeline{
    canBeUpdated( prev : any, next : any ) : boolean
    transform : Transform
    isChanged( a : any, b : any ) : boolean
    handleChange : ChangeHandler
}

export interface AttributeSerialization {
    toJSON : AttributeToJSON
    parse : AttributeParse
}

/*******************************************************
 * Record core implementation
 */

interface ConstructorOptions extends TransactionOptions{
    clone? : boolean
}

// Client unique id counter
let _cidCounter : number = 0;

export class Record extends Class implements Owner, Transactional {
    // Implemented at the index.ts to avoid circular dependency. Here we have just proper singature.
    static define( protoProps : RecordDefinition, staticProps ) : typeof Record { return this; }

    /***********************************
     * Core Members
     */
    // Previous attributes
    _previousAttributes : {}

    // Current attributes    
    attributes : AttributesValues

    // Transactional control
    _changing : boolean
    _pending : boolean


    /**
     * Ownerhsip API
     */
    // Reference to owner
    _owner : Owner

    // Owner's attribute name, if it's Record 
    _ownerKey : string;

    // Returns Record owner skipping collections. TODO: Move out
    getOwner() : Owner {
        const { _owner } = this;
        // If there are no key, owner must be transactional object, and it's the collection.
        // We don't expect that collection can be the member of collection, so we're skipping just one level up. An optimization.
        return this._ownerKey ? _owner : _owner && ( <any>_owner )._owner;
    }

    /***********************************
     * Notification API
     */ 
    // Record is changed
    _notifyChange( options : TransactionOptions ) : void {}

    // Record's attribute is changed
    _notifyChangeAttr( key : string, options : TransactionOptions ) : void {}

    /***********************************
     * Identity managements
     */

    // Client unique id 
    cid : string;

    // Client id prefix
    cidPrefix : string;

    // Id attribute name ('id' by default)
    idAttribute : string;

    // Fixed 'id' property pointing to id attribute
    get id() : string | number { return this.attributes[ this.idAttribute ]; }
    set id( x : string | number ){ setAttribute( this, this.idAttribute, x ); }

    /***********************************
     * Dynamically compiled stuff
     */

    // Attributes specifications 
    _attributes : AttributesSpec
    
    // Attributes object copy constructor
    Attributes : CloneAttributesCtor

    // forEach function for traversing through attributes, with protective default implementation
    // Overriden by dynamically compiled loop unrolled function in define.ts
    forEachAttr( attrs : {}, iteratee : ( value : any, key? : string, spec? : Attribute ) => void ) : void {
        const { _attributes } = this;

        for( let name in attrs ){
            const spec = _attributes[ name ];

            if( spec ){
                iteratee( attrs[ name ], name, spec );
            }
            else{
                log.warn( '[Unknown Attribute]', this, 'Unknown record attribute "' + name + '" is ignored:', attrs );
            }
        }
    }

    // Attributes-level serialization
    _toJSON(){ return {}; }

    // Attributes-level parse
    _parse( data ){ return data; }

    // Create record default values, optionally augmenting given values 
    defaults( values? : {} ){ return {}; }

    /***************************************************
     * Record construction
     */
    // Create record, optionally setting an owner
    constructor( a_values? : {}, a_options? : ConstructorOptions, owner? : Owner ){
        super();

        const options = a_options || {},
              values = ( options.parse ? this.parse( a_values ) :  a_values ) || {};

        this._changing = this._pending = false;
        this._owner = owner;
        this.cid = this.cidPrefix + _cidCounter++;

        // TODO: type error for wrong object.

        const attributes = options.clone ? cloneAttributes( this, values ) : this.defaults( values ); 

        this.forEachAttr( attributes, ( value : any, key : string, attr : AttributeUpdatePipeline ) => {
            const next = attributes[ key ] = attr.transform( value, options, void 0, this );
                  attr.handleChange( next, void 0, this );
        });

        this.attributes = this._previousAttributes = attributes;

        this.initialize( a_values, a_options );
    }

    // Initialization callback, to be overriden by the subclasses 
    initialize( values?, options? ){}

    // Deeply clone record, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.attributes, { clone : true }, owner );
    }

    /**
     * Serialization control
     */

    // Default record-level serializer, to be overriden by subclasses 
    toJSON() : Object {
        const json = {};

        this.forEachAttr( this.attributes, ( value, key : string, { toJSON } : AttributeSerialization ) =>{
            // If attribute serialization is not disabled, and its value is not undefined...
            if( toJSON && value !== void 0 ){
                // ...serialize it according with its spec.
                json[ key ] = toJSON.call( this, value, key );
            }
        });

        return json;
    }
    
    // Default record-level parser, to be overriden by the subclasses.
    parse( data ){
        // Call dynamically compiled loop-unrolled attribute-level parse function.
        return this._parse( data );
    }

    /**
     * Transactional control
     */

     // Object sync API
     set( values : {}, options? : TransactionOptions ) : this {
        if( values ){
            this.createTransaction( values, options ).commit( options );
        } 

        return this;
    }
    
    // Create transaction. TODO: Move to transaction constructor
    createTransaction( a_values : {}, options : TransactionOptions = {} ) : Transaction {
        const transaction = new RecordTransaction( this ),
              { changes, nested } = transaction,
              { attributes } = this,
              values = options.parse ? this.parse( a_values ) : a_values,
              merge = !options.reset;

        if( Object.getPrototypeOf( values ) === Object.prototype ){
            this.forEachAttr( values, ( value, key : string, attr : AttributeUpdatePipeline ) => {
                const prev = attributes[ key ];

                // handle deep update...
                if( merge && attr.canBeUpdated( prev, value ) ) {
                    nested.push( prev.createTransaction( value, options ) );
                    return;
                }

                // cast and hook...
                const next = attr.transform( value, options, prev, this );

                if( attr.isChanged( next, prev ) ) {
                    attributes[ key ] = next;
                    changes.push( key );

                    // Do the rest of the job after assignment
                    attr.handleChange( next, prev, this );
                }
            } );
        }
        else{
            log.error( '[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.' );
        }

        return transaction;
    }

    // Execute given function in the scope of ad-hoc transaction
    transaction( fun : ( self : this ) => void, options : TransactionOptions = {} ) {
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    // Handle nested changes
    _onChildrenChange( child : Transactional, options : TransactionOptions ) : void {        
        this.forceAttributeChange( child._ownerKey, options );
    }

    forceAttributeChange( key, options : TransactionOptions = {} ){
        // Touch an attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ){
            this._pending = true;
            key && this._notifyChangeAttr( key, options );
        }

        isRoot && commit( this, options );
    }
};

/**************************************************
 * Initialize Record prototype elements
 */

const recordProto = Record.prototype;

// Default client id prefix 
recordProto.cid = 'c';

// Default id attribute name
recordProto.idAttribute = 'id';

/***********************************************
 * Helper functions
 */

// Deeply clone record attributes
function cloneAttributes( record : Record, a_attributes : AttributesValues ) : AttributesValues {
    const attributes = new record.Attributes( a_attributes );

    record.forEachAttr( attributes, function( value, name, attr : Attribute ){
        attributes[ name ] = attr.clone( value ); //TODO: Add owner?
    } );

    return attributes;
}

 // Optimized single attribute transactional update. To be called from attributes setters
export function setAttribute( record : Record, name : string, value : any ) : void {
    const isRoot  = begin( record ),
          options = {};

    const { attributes } = record,
          spec = record._attributes[ name ],
          prev = attributes[ name ];

    // handle deep update...
    if( spec.canBeUpdated( prev, value ) ) {
        prev.createTransaction( value, options ).commit( options );
    }
    else {
        // cast and hook...
        const next = spec.transform( value, options, prev, record );

        if( spec.isChanged( next, prev ) ) {
            attributes[ name ] = next;

            // Do the rest of the job after assignment
            if( spec.handleChange ) {
                spec.handleChange( next, prev, this );
            }

            record._pending = true;
            record._notifyChangeAttr( name, options );
        }
    }

    isRoot && commit( record, options );
}

/**
 * Transactional brackets
 *  begin( model ) => true | false;
 *  commit( model, options ) => void 0
 */

// Start transaction on the record. Return true if it's opening transaction.
function begin( record : Record ) : boolean {
    const isRoot = !record._changing;

    if( isRoot ){
        // If it's opening transaction, copy attributes
        record._changing           = true;
        record._previousAttributes = new record.Attributes( record.attributes );
    }

    return isRoot;
}

// Commit transaction. Send out change event and notify owner.
function commit( record : Record, options : TransactionOptions ){
    if( !options.silent ){
        while( record._pending ){
            record._pending = false;
            record._notifyChange( options );
        }
    }

    record._pending  = false;
    record._changing = false;

    // TODO: should it be in the transaction scope?
    // So, upper-level change:attr handlers will work in the scope of current
    // transaction. Short answer: no. Leave it like this.
    const { _owner } = record;
    if( _owner ){
        _owner._onChildrenChange( record, options );
    }
}

class EmptyTransaction {
    constructor( public object : Record, public options : TransactionOptions = {} ){
        if( !object._transaction ){
            object._transaction = this;
            object._previousAttributes = new object.Attributes( object.attributes );
        }
    }

    commit() : boolean {
        const { object, options } = this;
        let changed = object._isDirty;

        if( this === object._transaction && !options.silent ){
            // Wondering why here's the loop? Read below.
            while( object._isDirty ){
                object._isDirty = false;

                // If this object will be modified inside of this event handler,
                // we need another change event. But we're in the middle of the root transaction,
                // so we won't be there. That's why we need _dirty flag and while loop.
                object._notifyChange( options );
            }

            object._transaction  = null;
        }
        
        return changed;
    }
}

// Transaction class. Implements two-phase transactions on object's tree. 
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

class AttributeTransaction extends EmptyTransaction {
    changes : string
    nested : Transaction

    // open transaction
    constructor( record : Record, key : string, value : any ){
        const options = {};
        super( record, options );
        this.changes = null;

        const { attributes } = record,
            spec = record._attributes[ key ],
            prev = attributes[ key ];

        // handle deep update...
        if( spec.canBeUpdated( prev, value ) ) {
            this.nested = prev.createTransaction( value, options );
        }
        else {
            // cast and hook...
            const next = spec.transform( value, options, prev, record );

            if( spec.isChanged( next, prev ) ) {
                attributes[ key ] = next;

                // Do the rest of the job after assignment
                if( spec.handleChange ) {
                    spec.handleChange( next, prev, record );
                }

                this.changes = key;
            }
        }
    }

    // commit transaction
    commit(){
        const { nested, object } = this;
        let { changes } = this;

        // Commit all nested transactions...
        if( nested && nested.commit() ){
            changes = nested.object._ownerKey;
        }

        // Notify listeners on attribute changes...
        if( changes ){
            object._isDirty = true;
            object._notifyChangeAttr( changes, this.options );
        }

        return super.commit();
    }
}
