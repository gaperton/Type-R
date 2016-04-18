export class Record {
    get id(){
        var { idAttribute } = this;
        // (!) No get hooks on id attribute.
        return idAttribute && this.attributes[ idAttribute ];
    }

    set id( value ){
        var { idAttribute } = this;
        // todo: inline transaction for id attribute change
    }

    get changed(){
        let changed = this._changed;

        if( !changed ){
            changed = this._changed = {};

            const { attributes, _previousAttributes } = this;

            this.forEachAttr( this._attributes, ( attr, key ) => {
                const curr = attributes[ key ],
                      prev = _previousAttributes[ key ];

                if( attr.isChanged( curr, prev ) ){
                    changed[ key ] = curr;
                }
            } );
        }

        return changed;
    }

    get collection(){
        return ( !this._ownerKey && this._owner ) || null;
    }

    getOwner(){
        const { _owner } = this;
        return this._ownerKey ? _owner : _owner && _owner._owner;
    }

    Attributes( attrs ){}

    forEachAttr( obj, fun ){}

    defaults( attrs, options ){ return new this.Attributes( attrs ); }

    transaction( fun, options ){}

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged( attr ){
        if( attr == null ){
            return !_.isEmpty( this.changed ); //TODO: remove underscore.
        }

        return this._attributes[ attr ].isChanged( this.attributes[ attr ], this._previousAttributes[ attr ] );
    }

// Return an object containing all the attributes that have changed, or
// false if there are no changed attributes. Useful for determining what
// parts of a view need to be updated and/or what attributes need to be
// persisted to the server. Unset attributes will be set to undefined.
// You can also pass an attributes object to diff against the model,
// determining if there *would be* a change.
// TODO: Test it
    changedAttributes( diff ){
        if( !diff ){
            return this.hasChanged() ? _.clone( this.changed ) : false;
        }

        var val, changed = false,
            old          = this._changing ? this._previousAttributes : this.attributes,
            attrSpecs    = this._attributes;

        for( var attr in diff ){
            if( !attrSpecs[ attr ].isChanged( old[ attr ], ( val = diff[ attr ] ) ) ){
                continue;
            }
            (changed || (changed = {}))[ attr ] = val;
        }

        return changed;
    }

// Get all of the attributes of the model at the time of the previous
// `"change"` event.
    previousAttributes(){
        return new this.Attributes( this._previousAttributes );
    }

    set( a, b, c ){
        switch( typeof a ){
        case 'string' :
            var attrSpec = this.__attributes[ a ];

            if( attrSpec && !attrSpec.isBackboneType && !c ){
                return setSingleAttr( this, a, b, attrSpec );
            }

            var attrs = {};
            attrs[ a ] = b;
            return setAttrs( this, attrs, c );

        case 'object' :
            if( a && Object.getPrototypeOf( a ) === Object.prototype ){
                return setAttrs( this, a, b );
            }

        default :
            error.argumentIsNotAnObject( this, a );
        }
    }

    constructor( attributes, opts ){
        var attrs = this.__attributes,
            values     = attributes || {},
            options   = opts || {};

        this.__duringSet = 0;
        this._changing = this._pending = false;
        this._changeToken = {};
        this.attributes = {};
        this.cid = this.cidPrefix + _cidCount++;

        //  Make owner accessible in initialize
        if( this._owner = options.owner ){
            // do not pass it to nested objects.
            // No side effect here, options copied at the upper level in this case
            options.owner = null;
        }

        if( options.parse ){
            values = this.parse( values, options ) || {};
        }

        if( values && Object.getPrototypeOf( values ) !== Object.prototype ){
            error.argumentIsNotAnObject( this, values );
            values = {};
        }

        values = options.deep ? deepCloneAttrs( this, values ) : this.defaults( values );

        // Execute attributes transform function instead of this.set
        this.forEachAttr( values, ( key, value ) =>{
            const attr = attrs[ key ];

            if( attr ){
                const next = values[ key ] = attr.transform( value, options, this, key );
                attr.handleChange( next );
            }
            else{
                error.unknownAttribute( model, key, value );
            }
        } );

        this._previousAttributes = this.attributes = values;
        this.initialize.apply( this, arguments );
    }

// override get to invoke native getter...
    get( name ){ return this[ name ]; }

// override clone to pass options to constructor
    clone( options = { deep : true } ){
        return new this.constructor( this.attributes, options );
    }

// Support for nested models and objects.
// Apply toJSON recursively to produce correct JSON.
    toJSON(){
        var self      = this,
            res       = {},
            attrSpecs = this.__attributes;

        this.forEachAttr( this.attributes, function( value, key ){
            var attrSpec = attrSpecs[ key ],
                toJSON   = attrSpec && attrSpec.toJSON;

            if( toJSON ){
                res[ key ] = toJSON.call( self, value, key );
            }
        } );

        return res;
    }

    parse( resp ){ return this._parse( resp ); }

    _parse( resp ){ return resp; }
}

const s = {
    // extend Model and its Collection
    extend : function( protoProps, staticProps ){
        var Child;

        if( typeof protoProps === 'function' ){
            Child = protoProps;
            protoProps = null;
        }
        else if( protoProps && protoProps.hasOwnProperty( 'constructor' ) ){
            Child = protoProps.constructor;
        }
        else{
            var Parent = this;
            Child = function Model( attrs, options ){ return Parent.call( this, attrs, options ); };
        }

        var This = Object.extend.call( this, Child );
        This.Collection = this.Collection.extend();
        return protoProps ? This.define( protoProps, staticProps ) : This;
    }
    ,

    // define Model and its Collection. All the magic starts here.
    define : function( protoProps, staticProps ){
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