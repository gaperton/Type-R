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

let _cidCounter : number = 0;

export class TransactionalRecord implements IParent {
    /***********************************
     * Core Members
     */
    // Reference to owner
    _owner : IParent

    // Previous attributes
    _previousAttributes : {}

    // Current attributes    
    attributes : IAttributes

    // Transactional control
    _changing : boolean
    _pending : boolean

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

    // Optimized forEach function for traversing through attributes
    forEachAttr( attrs : {}, iteratee : ( value : any, key : string ) => void ){}

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
    constructor( a_values? : {}, a_options? : Options, owner? : IParent ){
        const options = a_options || {},
              values = ( options.parse ? this.parse( a_values ) :  a_values ) || {};

        this._changing = this._pending = false;
        this._owner = owner;
        this.cid = this.cidPrefix + _cidCounter++;

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
    
    // Create transaction
    createTransaction( a_values : {}, options : Options = {} ) : Transaction {
        const transaction = new Transaction( this ),
              { changes, nested } = transaction,
              { attributes, _attributes } = this,
              values = options.parse ? this.parse( a_values ) : a_values;  

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

        return transaction;
    }

    // Execute given function in the scope of transaction
    transaction( fun : ( self : this ) => void, options : Options = {} ) {
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    // Handle nested changes
    _onChildrenChange( child, options : Options ) : void {
        // Touch attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ) {
            this._pending = true;
            this._notifyChangeAttr( child._ownerAttr, options );
        }

        isRoot && commit( this, options );
    }
};

function cloneAttributes( model : TransactionalRecord, a_attributes : IAttributes ){
    const attributes = new model.Attributes( a_attributes ),
          attrSpecs  = model._attributes;

    model.forEachAttr( attributes, function( value, name ){
        attributes[ name ] = attrSpecs[ name ].clone( value ); //TODO: Add owner?
    } );

    return attributes;
}

 // fast-path set attribute transactional function
export function setAttribute( model : TransactionalRecord, name : string, value ) {
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
interface IParent {
    _onChildrenChange( child, options : Options ) : void
}

function begin( model : TransactionalRecord ){
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

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
