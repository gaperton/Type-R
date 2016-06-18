import { RecordMixin, setAttribute } from './transactions.ts'
import compile from './compile.ts'
import { Class } from '../class.ts'
import { assign } from '../tools.ts'

import {CollectionCtor, RecordItf, RecordCtor} from '../types.ts'

let _cidCount = 0;

class Attributes {}


export class Record extends Class implements RecordItf {
    static Collection : CollectionCtor

    static define( spec ) {
        const BaseModel : RecordCtor = Object.getPrototypeOf( this.prototype ).constructor;
        
        // Create collection
        if( this.Collection === BaseModel.Collection ) {
            this.Collection                 = class extends BaseModel.Collection {};
            this.Collection.prototype.Record = this;
        }

        if( spec ) {
            // define stuff
            super.define( compile( spec, BaseModel.prototype ) );

            const { collection } = spec;
            if( collection ) {
                if( typeof collection === 'function' ) {
                    // Link model to collection
                    this.Collection                  = collection;
                    this.Collection.prototype.Record = this;
                }
                else {
                    // Configure our local Collection
                    this.Collection.define( collection );
                }
            }
        }
    }


    attributes : {}
    /**
     * Construction and cloning
     */
    constructor( attributes, opts ) {
        super();
        var attrs   = this.__attributes,
            values  = attributes || {},
            options = opts || {};

        this.__duringSet = 0;
        this._changing   = this._pending = false;
        this._changeToken = {};
        this.attributes   = {};
        this.cid          = this.cidPrefix + _cidCount++;

        //  Make owner accessible in initialize
        if( this._owner = options.owner ) {
            // do not pass it to nested objects.
            // No side effect here, options copied at the upper level in this case
            options.owner = null;
        }

        if( options.parse ) {
            values = this.parse( values, options ) || {};
        }

        if( values && Object.getPrototypeOf( values ) !== Object.prototype ) {
            error.argumentIsNotAnObject( this, values );
            values = {};
        }

        values = options.deep ? deepCloneAttrs( this, values ) : this.defaults( values );

        // Execute attributes transform function instead of this.set
        this.forEachAttr( values, ( key, value ) => {
            const attr = attrs[ key ];

            if( attr ) {
                const next = values[ key ] = attr.transform( value, options, this, key );
                attr.handleChange( next );
            }
            else {
                error.unknownAttribute( model, key, value );
            }
        } );

        this._previousAttributes = this.attributes = values;
        this.initialize.apply( this, arguments );
    }

    initialize(){}
    
    defaults( attrs, options ) {
        return new this.Attributes( attrs );
    }
    
    clone( options = { deep : true } ) : this {
        return new (this.constructor)( this.attributes, options );
    }

    /**
     * Attributes handling and ownership
     */
    Attributes : new ( attrs : {} ) => {};

    forEachAttr( obj, fun ) {
    }

    get id() {
        // (!) No get hooks on id attribute.
        const { idAttribute } = this;
        return idAttribute && this.attributes[ idAttribute ];
    }

    set id( value ) {
        const { idAttribute } = this;
        idAttribute && setAttribute( this, idAttribute, value );
    }

    get collection() {
        return ( !this._ownerKey && this._owner ) || null;
    }

    getOwner() {
        const { _owner } = this;
        return this._ownerKey ? _owner : ( _owner && _owner._owner );
    }

    /**
     * Object sync API
     * set( { attrs }, options )
     */

    set( values, options ) {
        if( values ) {
            if( Object.getPrototypeOf( values ) === Object.prototype ) {
                this.createTransaction( values, options ).commit( options );
            }
            else {
                // TODO: log.error('Model.set argument must be string or object');
            }
        }

        return this;
    }

    /**
     * Transactional API stubs (provided by separate mixin)
     */
    createTransaction( values, options ) {}

    transaction( fun, options ) {}

    _onChildrenChange( child, options = {} ) {
        this.forceChange( child._ownerAttr, options );
    }

    forceChange( key, options = {} ){
        const isRoot = begin( this );

        if( !options.silent ){
            this._pending = options;
            key && this._notifyChangeAttr( key, options );
        }

        isRoot && commit( this, options );
    }

    /**
     * Events system stubs
     */
    _notifyChange( options ) {
        this._changeToken = {};
        this.trigger( 'change', this, options );
    }

    _notifyChangeAttr( name, options ) {
        this.trigger( 'change:' + name, this.attributes[ name ], this, options );
    }

    /**
     * Serialization API
     * toJSON(), parse( data )
     */

    toJSON() {
        var self      = this,
            res       = {},
            attrSpecs = this.__attributes;

        this.forEachAttr( this.attributes, function( value, key ) {
            var attrSpec = attrSpecs[ key ],
                toJSON   = attrSpec && attrSpec.toJSON;

            if( toJSON ) {
                res[ key ] = toJSON.call( self, value, key );
            }
        } );

        return res;
    }

    parse( resp ) {
        return this._parse( resp );
    }

    _parse( resp ) {
        return resp;
    }

    /**
     * Changes tracking API
     * hasChanges( attr ), changedAttributes( diff ), previousAttributes()
     */
    get changed() {
        let changed = this._changed;

        if( !changed ) {
            changed = this._changed = {};

            const { attributes, _previousAttributes } = this;

            this.forEachAttr( this._attributes, ( attr, key ) => {
                const curr = attributes[ key ],
                      prev = _previousAttributes[ key ];

                if( attr.isChanged( curr, prev ) ) {
                    changed[ key ] = curr;
                }
            } );
        }

        return changed;
    }

    hasChanged( attr ) {
        if( attr == null ) {
            return !_.isEmpty( this.changed ); //TODO: remove underscore.
        }

        return this._attributes[ attr ].isChanged( this.attributes[ attr ], this._previousAttributes[ attr ] );
    }

    changedAttributes( diff ) {
        if( !diff ) {
            return this.hasChanged() ? _.clone( this.changed ) : false;
        }

        var val, changed = false,
            old          = this._changing ? this._previousAttributes : this.attributes,
            attrSpecs    = this._attributes;

        for( var attr in diff ) {
            if( !attrSpecs[ attr ].isChanged( old[ attr ], ( val = diff[ attr ] ) ) ) {
                continue;
            }
            (changed || (changed = {}))[ attr ] = val;
        }

        return changed;
    }

    previousAttributes() {
        return new this.Attributes( this._previousAttributes );
    }
}

assign( Record.prototype, RecordMixin );

const s = {
    // extend Model and its Collection
    extend : function( protoProps, staticProps ) {
        var Child;

        if( typeof protoProps === 'function' ) {
            Child      = protoProps;
            protoProps = null;
        }
        else if( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
            Child = protoProps.constructor;
        }
        else {
            var Parent = this;
            Child      = function Model( attrs, options ) {
                return Parent.call( this, attrs, options );
            };
        }

        var This        = Object.extend.call( this, Child );
        This.Collection = this.Collection.extend();
        return protoProps ? This.define( protoProps, staticProps ) : This;
    }
    ,

    // define Model and its Collection. All the magic starts here.
    define : function( protoProps, staticProps ) {
        var Base = Object.getPrototypeOf( this.prototype ).constructor,
            spec = createDefinition( protoProps, Base ),
            This = this;

        Object.extend.Class.define.call( This, spec, staticProps );
        attachMixins( This );

        // define Collection
        var collectionSpec = { model : This };
        spec.urlRoot && ( collectionSpec.url = spec.urlRoot );
        This.Collection.define( _.defaults( protoProps.collection || {}, collectionSpec ) );

        return This;
    }
};