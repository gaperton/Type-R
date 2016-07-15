/**
 * Record core implementing transactional updates.
 * The root of all definitions. 
 */

import { EventHandlers, Class, ClassDefinition, Constructor, trigger3, log, define } from '../objectplus/index.ts'

import { begin as _begin, markAsDirty as _markAsDirty, commit, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { ChildrenErrors } from '../validation.ts'

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
    type? : Constructor< any >
    value? : any

    parse? : AttributeParse
    toJSON? : AttributeToJSON
   
    getHooks? : GetHook[]
    transforms? : Transform[]
    changeHandlers? : ChangeHandler[]

    _onChange? : ChangeAttrHandler
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
    validate( record : Record, value : any, key : string )
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

@define({
    // Default client id prefix 
    cidPrefix : 'c',

    // Default id attribute name
    idAttribute : 'id'
})
export class Record extends Transactional implements Owner {
    // Implemented at the index.ts to avoid circular dependency. Here we have just proper singature.
    static define( protoProps : RecordDefinition, staticProps ) : typeof Record { return this; }

    /***********************************
     * Core Members
     */
    // Previous attributes
    _previousAttributes : {}

    // Current attributes    
    attributes : AttributesValues

    // Lazily evaluated changed attributes hash
    _changedAttributes : AttributesValues

    get changed(){
        let changed = this._changedAttributes;

        if( !changed ){
            const prev = this._previousAttributes;
            changed = {};

            this.forEachAttr( this.attributes, ( value, key, attribute ) => { 
                if( attribute.isChanged( value, prev[ key ] ) ){
                    changed[ key ] = value;
                }
            } );

            this._changedAttributes = changed;
        }

        return changed;    
    } 

    // Returns Record owner skipping collections. TODO: Move out
    getOwner() : Owner {
        const owner : any = this._owner;

        // If there are no key, owner must be transactional object, and it's the collection.
        // We don't expect that collection can be the member of collection, so we're skipping just one level up. An optimization.
        return this._ownerKey ? owner : owner && owner._owner;
    }

    /***********************************
     * Identity managements
     */

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

    each( iteratee : ( value? : any, key? : string ) => void, context? : any ){
        const fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee,
            { attributes } = this;

        for( const key in attributes ){
            const value = attributes[ key ];
            if( value !== void 0 ) fun( value, key );
        }
    }

    // Attributes-level serialization
    _toJSON(){ return {}; }

    // Attributes-level parse
    _parse( data ){ return data; }

    // Create record default values, optionally augmenting given values.
    defaults( values? : {} ){ return {}; }

    // Event map for change:attribute events. 
    _listenToSelf : EventHandlers

    /***************************************************
     * Record construction
     */
    // Create record, optionally setting an owner
    constructor( a_values? : {}, a_options? : ConstructorOptions, owner? : Owner ){
        super( _cidCounter++, owner );

        const options = a_options || {},
              values = ( options.parse ? this.parse( a_values ) :  a_values ) || {};

        // TODO: type error for wrong object.

        const attributes = options.clone ? cloneAttributes( this, values ) : this.defaults( values ); 

        this.forEachAttr( attributes, ( value : any, key : string, attr : AttributeUpdatePipeline ) => {
            const next = attributes[ key ] = attr.transform( value, options, void 0, this );
                  attr.handleChange( next, void 0, this );
        });

        this.attributes = this._previousAttributes = attributes;

        this.initialize( a_values, a_options );

        if( this._listenToSelf ) this.listenTo( this, this._listenToSelf );
    }

    // Initialization callback, to be overriden by the subclasses 
    initialize( values?, options? ){}

    // Deeply clone record, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.attributes, { clone : true }, owner );
    }

    // Validate attributes.
    _validateNested( errors : ChildrenErrors ) : number {
        var length    = 0;

        this.forEachAttr( this.attributes, ( value, name, attribute ) => {
            const error = attribute.validate( this, value, name );

            if( error ){
                errors[ name ] = error;
                length++;
            }
        } );

        return length;
    }

    // Get attribute by key
    get( key : string ) : any {
        return this[ key ];
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
    
    // Create transaction. TODO: Move to transaction constructor
    _createTransaction( a_values : {}, options : TransactionOptions = {} ) : Transaction {
        const isRoot = begin( this ),
              changes : string[] = [],
              nested : RecordTransaction[]= [],
              { attributes } = this,
              values = options.parse ? this.parse( a_values ) : a_values,
              merge = !options.reset;

        if( Object.getPrototypeOf( values ) === Object.prototype ){
            this.forEachAttr( values, ( value, key : string, attr : AttributeUpdatePipeline ) => {
                const prev = attributes[ key ];

                // handle deep update...
                if( merge && attr.canBeUpdated( prev, value ) ) { // todo - skip empty updates.
                    const nestedTransaction = prev.createTransaction( value, options );
                    if( nestedTransaction ){
                        nested.push( nestedTransaction );
                        changes.push( key );
                    }

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

        if( nested.length || changes.length ){
            return new RecordTransaction( this, isRoot, nested, changes );
        }
        
        // No changes
        isRoot && commit( this, options );
    }

    // Handle nested changes
    _onChildrenChange( child : Transactional, options : TransactionOptions ) : void {        
        this.forceAttributeChange( child._ownerKey, options );
    }

    // Simulate attribute change 
    forceAttributeChange( key : string, options : TransactionOptions = {} ){
        // Touch an attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ){
            markAsDirty( this );
            trigger3( this, 'change:' + key, this.attributes[ key ], this, options );
        }

        isRoot && commit( this, options );
    }

    // Dispose object and all childrens
    dispose(){
        this.forEachAttr( this.attributes, ( value, key ) => {
            if( value && this === value._owner ){
                value.dispose();
            }
        });

        super.dispose();
    }
};

/***********************************************
 * Helper functions
 */

function begin( record : Record ){
    if( _begin( record ) ){
        record._previousAttributes = new record.Attributes( record.attributes );
        return true;
    }
    
    return false;
}

function markAsDirty( record ){
    _markAsDirty( record );
    record._changedAttributes = null;
}

// Deeply clone record attributes
function cloneAttributes( record : Record, a_attributes : AttributesValues ) : AttributesValues {
    const attributes = new record.Attributes( a_attributes );

    record.forEachAttr( attributes, function( value, name, attr : Attribute ){
        attributes[ name ] = attr.clone( value ); //TODO: Add owner?
    } );

    return attributes;
}

 // Optimized single attribute transactional update. To be called from attributes setters
 // options.silent === false, parse === false. 
export function setAttribute( record : Record, name : string, value : any ) : void {
    const isRoot  = begin( record ),
          options = {},
        { attributes } = record,
          spec = record._attributes[ name ],
          prev = attributes[ name ];

    // handle deep update...
    if( spec.canBeUpdated( prev, value ) ) {
        const nestedTransaction = ( <Transactional> prev )._createTransaction( value, options );
        if( nestedTransaction ){
            nestedTransaction.commit( options, true );
            markAsDirty( record );
            trigger3( record, 'change:' + name, prev, record, options );
        }
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

            markAsDirty( record );
            trigger3( record, 'change:' + name, next, record, options );

        }
    }

    isRoot && commit( record, options );
}

// Transaction class. Implements two-phase transactions on object's tree. 
class RecordTransaction implements Transaction {
    // open transaction
    constructor( public object : Record, public isRoot : boolean, public nested : Transaction[], public changes : string[] ){
        markAsDirty( object );
    }

    // commit transaction
    commit( options : TransactionOptions = {}, isNested? : boolean ) : void {
        const { nested, object, changes } = this;

        // Commit all pending nested transactions...
        for( let transaction of nested ){ 
            transaction.commit( options, true );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { attributes } = object;
            for( let key of changes ){
                trigger3( object, 'change:' + key, attributes[ key ], object, options );
            }
        }

        this.isRoot && commit( object, options, isNested ); // Do not tell parent to update.
    }
}