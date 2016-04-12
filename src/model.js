class Attribute {
    constructor(){
        this.deepUpdate = false;
    }

    isCompatible( value ){ return true; }

    // cast and set hook...
    convert( next, prev, options ) { return next; }

    isChanged( next, prev ){ return !_.isEqual( next, prev ); }

    // event management, ownership, hooks, if any...
    handleChange( next, prev ) {}
}

class Model {
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

    get collection(){ return ( this._ownerKey && this._owner ) || null; }
}

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

    const { _owner } = model;
    if( _owner ){
        _owner._onChildrenChange( model, options );
    }
}