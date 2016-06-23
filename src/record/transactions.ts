import { log } from '../tools.ts'

/**
 * Everything related to record's transactional updates
 */
export interface IUpdatePipeline{
    canBeUpdated( prev : any, next : any ) : boolean
    transform( value : any, options : Options, prev : any, model : TransactionalRecord ) : any
    isChanged( a : any, b : any ) : boolean
    handleChange( next : any, prev : any, model : TransactionalRecord ) : void
    clone( value : any ) : any
}

interface Options {
    silent? : boolean
    parse? : boolean
    clone? : boolean
}

interface IAttributes {
    [ key : string ] : any
}

interface IAttrSpecs {
    [ key : string ] : IUpdatePipeline
}

interface IOwned {
    _owner : IOwner
    _ownerKey? : string
    getOwner() : IOwner
}

interface IOwner extends IOwned {
    _onChildrenChange( child : IOwned, options : Options ) : void
}

// Client unique id counter
let _cidCounter : number = 0;

export class TransactionalRecord implements IOwner {
    /***********************************
     * Core Members
     */
    // Previous attributes
    _previousAttributes : {}

    // Current attributes    
    attributes : IAttributes

    // Transactional control
    _changing : boolean
    _pending : boolean


    /**
     * Ownerhsip API
     */

    // Reference to owner
    _owner : IOwner

    // Owner's attribute name, if it's Record 
    _ownerKey : string;

    // Returns owner without the key (usually it's collection)
    get collection() : IOwner {
        return this._ownerKey ? null : this._owner;
    }

    // Returns Record owner skipping collections.
    getOwner() : IOwner {
        const { _owner } = this;
        return this._ownerKey ? _owner : ( _owner && _owner._owner );
    }

    /***********************************
     * Notification API
     */ 
    // Record is changed
    _notifyChange( options : Options ) : void {}

    // Record's attribute is changed
    _notifyChangeAttr( key : string, options : Options ) : void {}

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
    _attributes : IAttrSpecs
    
    // Attributes object copy constructor
    Attributes : new ( attrs : {} ) => IAttributes

    // Optimized forEach function for traversing through attributes, with pretective default implementation
    // TODO: Refactor the code to use spec
    forEachAttr( attrs : {}, iteratee : ( value : any, key? : string, spec? : IUpdatePipeline ) => void ){
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

    /**
     * Record construction
     */

    // Create record, optionally setting owner
    constructor( a_values? : {}, a_options? : Options, owner? : IOwner ){
        const options = a_options || {},
              values = ( options.parse ? this.parse( a_values ) :  a_values ) || {};

        this._changing = this._pending = false;
        this._owner = owner;
        this.cid = this.cidPrefix + _cidCounter++;

        // TODO: type error for wrong object.

        const attributes = options.clone ? cloneAttributes( this, values ) : this.defaults( values ),
             { _attributes } = this; 

        this.forEachAttr( attributes, ( value, key : string ) => {
            const attr = _attributes[ key ],
                  next = values[ key ] = attr.transform( value, options, void 0, this );
                  attr.handleChange( next, void 0, this );
        });

        this.attributes = this._previousAttributes = attributes;

        this.initialize( a_values, a_options );
    }

    // Initialization callback, to be overriden by the subclasses 
    initialize( values?, options? ){}

    // Deeply clone record, optionally setting new owner.
    clone( owner? : any ) : TransactionalRecord {
        return new (<any>this.constructor)( this.attributes, { clone : true }, owner );
    }

    /**
     * Serialization control
     */

    // Default record-level serializer, to be overriden by subclasses 
    toJSON(){ return this._toJSON(); }
    
    // Default record-level parser, to be overriden by subclasses
    parse( data ){ return this._parse( data ); }
    

    /**
     * Transactional control
     */

     // Object sync API
     set( values : {}, options? : Options ) : this {
        if( values ){
            this.createTransaction( values, options ).commit( options );
        } 

        return this;
    }
    
    // Create transaction
    createTransaction( a_values : {}, options : Options = {} ) : Transaction {
        const transaction = new Transaction( this ),
              { changes, nested } = transaction,
              { attributes, _attributes } = this,
              values = options.parse ? this.parse( a_values ) : a_values;  

        if( Object.getPrototypeOf( values ) === Object.prototype ){
            this.forEachAttr( values, ( value, key : string ) => {
                const attr = _attributes[ key ],
                    prev = attributes[ key ];

                // handle deep update...
                if( attr.canBeUpdated( prev, value ) ) {
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
    transaction( fun : ( self : this ) => void, options : Options = {} ) {
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    // Handle nested changes
    _onChildrenChange( child : IOwned, options : Options ) : void {        
        this.forceAttributeChange( child._ownerKey, options );
    }

    forceAttributeChange( key, options : Options = {} ){
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

const recordProto = TransactionalRecord.prototype;

// Default client id prefix 
recordProto.cid = 'c';

// Default id attribute name
recordProto.idAttribute = 'id';

/***********************************************
 * Helper functions
 */

// Deeply clone record attributes
function cloneAttributes( model : TransactionalRecord, a_attributes : IAttributes ) : IAttributes {
    const attributes = new model.Attributes( a_attributes ),
          attrSpecs  = model._attributes;

    model.forEachAttr( attributes, function( value, name ){
        attributes[ name ] = attrSpecs[ name ].clone( value ); //TODO: Add owner?
    } );

    return attributes;
}

 // Optimized single attribute transactional update. To be called from attributes setters
export function setAttribute( model : TransactionalRecord, name : string, value : any ) : void {
    const isRoot  = begin( model ),
          options = {};

    const { attributes } = model,
          spec = model._attributes[ name ],
          prev = attributes[ name ];

    // handle deep update...
    if( spec.canBeUpdated( prev, value ) ) {
        prev.createTransaction( value, options ).commit( options );
    }
    else {
        // cast and hook...
        const next = spec.transform( value, options, prev, model );

        if( spec.isChanged( next, prev ) ) {
            attributes[ name ] = next;

            // Do the rest of the job after assignment
            if( spec.handleChange ) {
                spec.handleChange( next, prev, this );
            }

            model._pending = true;
            model._notifyChangeAttr( name, options );
        }
    }

    isRoot && commit( model, options );
}

/**
 * Transactional brackets
 *  begin( model ) => true | false;
 *  commit( model, options ) => void 0
 */

// Start transaction on the record. Return true if it's opening transaction.
function begin( model : TransactionalRecord ) : boolean {
    const isRoot = !model._changing;

    if( isRoot ){
        // If it's opening transaction, copy attributes
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

// Commit transaction. Send out change event and notify owner.
function commit( model : TransactionalRecord, options : Options ){
    if( !options.silent ){
        while( model._pending ){
            model._pending = false;
            model._notifyChange( options );
        }
    }

    model._pending  = false;
    model._changing = false;

    // TODO: should it be in the transaction scope?
    // So, upper-level change:attr handlers will work in the scope of current
    // transaction. Short answer: no. Leave it like this.
    const { _owner } = model;
    if( _owner ){
        _owner._onChildrenChange( model, options );
    }
}

// Transaction class. Implements two-phase transactions on object's tree. 
class Transaction {
    isRoot : boolean
    changes : string[]
    nested : Transaction[]

    // open transaction
    constructor( public model : TransactionalRecord ){
        this.isRoot  = begin( model );
        this.model   = model;
        this.changes = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options : Options = {} ){
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
