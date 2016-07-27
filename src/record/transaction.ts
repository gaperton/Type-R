/**
 * Record core implementing transactional updates.
 * The root of all definitions. 
 */

import { assign, isEmpty, Mixable, ClassDefinition, Constructor, log, define } from '../objectplus'

import { begin as _begin, markAsDirty as _markAsDirty, commit, Transactional, Transaction, TransactionOptions, Owner } from '../transactions'
import { ChildrenErrors } from '../validation'

const { trigger3 } = Transactional;

/***************************************************************
 * Record Definition as accepted by Record.define( definition )
 */

export interface RecordDefinition extends ClassDefinition {
    attributes? : AttributeDescriptorMap
    defaults? : AttributeDescriptorMap | ( () => AttributeDescriptorMap )
    collection? : typeof Transactional | {}
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
    id? : string | number 
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
    cidPrefix : 'm',

    // Default id attribute name
    idAttribute : 'id',
    _keys : [ 'id' ]
})
export class Record extends Transactional implements Owner {
    // Implemented at the index.ts to avoid circular dependency. Here we have just proper singature.
    static define( protoProps : RecordDefinition, staticProps? ) : typeof Record {
        return <any>Transactional.define( protoProps, staticProps );
    }

    static predefine : () => typeof Record
    static Collection : typeof Transactional

    static from : ( collectionReference : any ) => any;
    
    static defaults( attrs : AttributeDescriptorMap ){
        return this.extend({ attributes : attrs });
    }
    
    /***********************************
     * Core Members
     */
    // Previous attributes
    _previousAttributes : {}

    previousAttributes(){ return new this.Attributes( this._previousAttributes ); } 

    // Current attributes    
    attributes : AttributesValues

    // Lazily evaluated changed attributes hash
    _changedAttributes : AttributesValues

    get changed(){
        let changed = this._changedAttributes;

        if( !changed ){
            const prev = this._previousAttributes;
            changed = {};

            const { _attributes, attributes } = this;

            for( let key of this._keys ){
                const value = attributes[ key ];

                if( _attributes[ key ].isChanged( value, prev[ key ] ) ){
                    changed[ key ] = value;
                }
            }

            this._changedAttributes = changed;
        }

        return changed;    
    }

    changedAttributes( diff? : {} ) : boolean | {} {
        if( !diff ) return this.hasChanged() ? assign( {}, this.changed ) : false;

        var val, changed : {} | boolean = false,
            old          = this._transaction ? this._previousAttributes : this.attributes,
            attrSpecs    = this._attributes;

        for( var attr in diff ){
            if( !attrSpecs[ attr ].isChanged( old[ attr ], ( val = diff[ attr ] ) ) ) continue;
            (changed || (changed = {}))[ attr ] = val;
        }

        return changed;        
    }

    hasChanged( key? : string ) : boolean {
        const { _previousAttributes } = this;
        if( !_previousAttributes ) return false;

        return key ?
                this._attributes[ key ].isChanged( this.attributes[ key ], _previousAttributes[ key ] ) :
                !isEmpty( this.changed );
    }

    previous( key : string ) : any {
        if( key ){
            const { _previousAttributes } = this;
            if( _previousAttributes ) return _previousAttributes[ key ];
        }
        
        return null;
    }

    isNew() : boolean {
        return this.id === void 0;
    }

    has( key : string ) : boolean {
        return this[ key ] != void 0;
    }

    unset( key, options? ) {
        this.set( key, void 0, options );
        return this; 
    }

    clear( options ){
        this.transaction( () =>{
            this.forEachAttr( this.attributes, ( value, key ) => this[ key ] = void 0 );
        }, options );
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

    // Attribute keys
    _keys : string[]
    
    // Attributes object copy constructor
//    Attributes : CloneAttributesCtor
    Attributes( x : AttributesValues ) : void { this.id = x.id; }

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

        // TODO: try this versus object traversal.
        /*
        const { _attributes, _keys } = this;
        
        for( let name of _keys ){
            const spec = _attributes[ name ],
                  value = attrs[ name ];

            value && iteratee( value, name, spec );
        }*/
    }

    each( iteratee : ( value? : any, key? : string ) => void, context? : any ){
        const fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee,
            { attributes, _keys } = this;

        for( const key of _keys ){
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

        if( this._localEvents ) this._localEvents.subscribe( this, this );
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

    // Polimorphic set method.
    set( key : string, value : any, options? : TransactionOptions ) : this
    set( attrs : {}, options? : TransactionOptions ) : this
    set( a, b?, c? ) : this {
        if( typeof a === 'string' ){
            if( c ){
                return <this> super.set({ [ a ] : b }, c );
            }
            else{
                setAttribute( this, a, b );
                return this;
            } 
        }
        else{
            return <this> super.set( a, b );
        }
    }

    // Need to override it here, since begin/end transaction brackets are overriden. 
    transaction( fun : ( self : this ) => void, options : TransactionOptions = {} ) : void{
        const isRoot = begin( this );
        fun.call( this, this );
        isRoot && commit( this );
    }
    
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
                    const nestedTransaction = prev._createTransaction( value, options );
                    if( nestedTransaction ){
                        nested.push( nestedTransaction );
                        changes.push( key );
                    }

                    return;
                }

                // cast and hook...
                const next = attr.transform( value, options, prev, this );
                attributes[ key ] = next;

                if( attr.isChanged( next, prev ) ) {    
                    changes.push( key );

                    // Do the rest of the job after assignment
                    attr.handleChange( next, prev, this );
                }
            } );
        }
        else{
            log.error( '[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.' );
        }

        if( ( nested.length || changes.length ) && markAsDirty( this, options ) ){
            return new RecordTransaction( this, isRoot, nested, changes );
        }
        
        // No changes
        isRoot && commit( this );
    }

    // Handle nested changes
    _onChildrenChange( child : Transactional, options : TransactionOptions ) : void {        
        this.forceAttributeChange( child._ownerKey, options );
    }

    // Simulate attribute change 
    forceAttributeChange( key : string, options : TransactionOptions = {} ){
        // Touch an attribute in bounds of transaction
        const isRoot = begin( this );

        if( markAsDirty( this, options ) ){
            trigger3( this, 'change:' + key, this, this.attributes[ key ], options );
        }
        
        isRoot && commit( this );
    }

    // Returns owner without the key (usually it's collection)
    get collection() : any {
        return this._ownerKey ? null : this._owner;
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
        record._changedAttributes = null;
        return true;
    }
    
    return false;
}

function markAsDirty( record : Record, options : TransactionOptions ){
    // Need to recalculate changed attributes, when we have nested set in change:attr handler
    if( record._changedAttributes ){
        record._changedAttributes = null;
    }

    return _markAsDirty( record, options );
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
            nestedTransaction.commit( true );
            markAsDirty( record, options );
            trigger3( record, 'change:' + name, record, prev, options );
        }
    }
    else {
        // cast and hook...
        const next = spec.transform( value, options, prev, record );

        attributes[ name ] = next;

        if( spec.isChanged( next, prev ) ) {
            // Do the rest of the job after assignment
            spec.handleChange( next, prev, record );

            markAsDirty( record, options );
            trigger3( record, 'change:' + name, record, next, options );
        }
    }

    isRoot && commit( record );
}

// Transaction class. Implements two-phase transactions on object's tree. 
// Transaction must be created if there are actual changes and when markIsDirty returns true. 
class RecordTransaction implements Transaction {
    // open transaction
    constructor( public object : Record,
                 public isRoot : boolean,
                 public nested : Transaction[],
                 public changes : string[] ){}

    // commit transaction
    commit( isNested? : boolean ) : void {
        const { nested, object, changes } = this;

        // Commit all pending nested transactions...
        for( let transaction of nested ){ 
            transaction.commit( true );
        }

        // Notify listeners on attribute changes...
        // Transaction is never created when silent option is set, so just send events out.
        const { attributes, _isDirty } = object;
        for( let key of changes ){
            trigger3( object, 'change:' + key, object, attributes[ key ], _isDirty );
        }

        this.isRoot && commit( object, isNested );
    }
}