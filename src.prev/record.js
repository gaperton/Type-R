import { Attribute } from './attributes'

class Model {
    static define( spec ){
        // Create collection
        if( this.Collection === BaseModel.Collection ){
            this.Collection = class extends BaseModel.Collection {};
            this.Collection.prototype.model = this;
        }

        if( spec ){
            // define stuff
            super.define( compile( spec ) );

            const { collection } = spec;
            if( collection ){
                if( typeof collection === 'function' ){
                    // Link model to collection
                    this.Collection = collection;
                    this.Collection.prototype.model = this;
                }
                else{
                    // Configure our local Collection
                    this.Collection.define( collection );
                }
            }
        }
    }

    /**
     *
     * @param attrs
     * @param options - { parse : true, deepCopy : true }
     */
    constructor( attrs, options ){
        const parsedAttrs = options.parse ? this.parse( attrs ) : attrs,
              attributes = this.defaults( parsedAttrs ),
              { _attributes } = this;

        this.forEachAttr( attributes, ( value, name ) => {
            const spec = _attributes[ name ],
                  next = spec.transform( value, void 0, options );

            attributes[ name ] = next;

            if( spec.handleChange ){
                spec.handleChange( next );
            }
        } );

        //todo: init the rest of the stuff
        this.attributes = attributes;
        this._previousAttributes = {};
    }

    clone( options = { deep : true } ){
        return new this.constructor( this.attributes, options );
    }

    transaction( fun, options ){
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    set( a, b, c ){
        if( a && Object.getPrototypeOf( a ) === Object.prototype ){
            this._set( a, b ).commit( b );
        }
        else{
            if( typeof a === 'string' ){
                if( c ){
                    this._set( { [ a ] : b }, c ).commit( c );
                }
                else{
                    setAttribute( this, a, b );
                }
            }
            else{
                log.error( 'Model.set argument must be string or object' );
            }
        }

        return this;
    }

    _set( attrs, options = {} ){
        const transaction = new Transaction( this ),
              { changes, nested } = transaction,
              { attributes, __attributes } = this;

        this.forEachAttr( attrs, function( value, name ){
            const spec = __attributes[ name ],
                  prev = attributes[ name ];

            // handle deep update...
            if( spec.deepUpdate ){
                if( prev && !spec.isCompatible( value ) ){
                    nested.push( prev._set( value, options ) );
                    return;
                }
            }

            // cast and hook...
            const next = spec.convert( value, prev, options );

            if( spec.isChanged( next, prev ) ){
                attributes[ name ] = next;
                changes.push( name );

                // Do the rest of the job after assignment
                if( spec.handleChange ){
                    spec.handleChange( next, prev );
                }
            }
        } );

        return transaction;
    }

    _onChildrenChange( model, options ){
        // Touch attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ){
            this._pending = options;
            this._onChangeAttr( model._ownerAttr, options );
        }

        isRoot && commit( this, options );
    }

    _onChange( options ){
        this._changeToken = {};
        this.trigger( 'change', this, options );
    }

    _onChangeAttr( name, options ){
        this.trigger( 'change:' + name, this.attributes[ name ], this, options );
    }

    get collection(){ return ( !this._ownerKey && this._owner ) || null; }

/** --------------------------------
 * TODO: Core Changes API
 */

    hasChanged( attr ){
        // todo: must be evaluated taken nested changes into account (?).
        // => need to build `changed` hash strictly
        // Consider structure: null || { attr : Boolean }
    }

    changedAttributes( diff ){}

    previous( attr ){
        const attributes = this._previousAttributes;
        return attributes && attributes[ attr ]; // todo: execute `get` hook.
    }

    previousAttributes(){
        return new this.Attributes( this._previousAttributes || {} );
    }

    get changed(){
        // todo: create and cache changed hash.
    }
}

Model.mixinRules = { collection : 'merge' };

class Transaction {
    // open transaction
    constructor( model ){
        this.isRoot  = begin( model );
        this.model   = model;
        this.changed = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options = {} ){
        const { nested, model } = this;

        // Commit all nested transactions...
        for( let i = 0; i < nested.length; i++ ){
            nested[ i ].commit( options );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { changed } = this;

            if( changed.length ){
                model._pending = options;
            }

            for( let i = 0; i < changed.length; i++ ){
                model._onChangeAttr( changed[ i ], options )
            }
        }

        this.isRoot && commit( model, options );
    }
}

// fast-path set attribute transactional function
function setAttribute( model, name, value ){
    const isRoot = begin( model ),
          options = {};

    const { attributes } = model,
            spec = model._attributes[ name ],
            prev = attributes[ name ];

    // handle deep update...
    // TODO: deepUpdate( value )
    if( spec.deepUpdate && prev && !spec.isCompatible( value ) ){
        prev._set( value, options ).commit( options );
    }
    else{
        // cast and hook...
        const next = spec.convert( value, prev, options );

        if( spec.isChanged( next, prev ) ){
            attributes[ name ] = next;

            // Do the rest of the job after assignment
            if( spec.handleChange ){
                spec.handleChange( next, prev );
            }

            model._pending = options;
            model._onChangeAttr( name, options );
        }
    }

    isRoot && commit( model, options );
}

/**
 * Transactional brackets
 *  begin( model ) => true | false;
 *  commit( model, options ) => void 0
 */
function begin( model ){
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

function commit( model, options ){
    if( !options.silent ){
        while( model._pending ){
            model._pending = false;
            model._onChange( options );
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

// Version 2
function update( value, key ){
    const spec = _attributes[ key ],
        prev = attributes[ key ];

    // handle deep update...
    if( spec.shouldUpdate ){
        if( prev && spec.shouldUpdate( value ) ){
            nested.push( prev._set( value, options ) );
            return;
        }
    }

    // cast and hook...
    const next = spec.transform( value, prev, options );

    if( spec.isChanged( next, prev ) ){
        attributes[ key ] = next;
        changes.push( key );

        // Do the rest of the job after assignment
        if( spec.handleChange ){
            spec.handleChange( next, prev );
        }
    }
}