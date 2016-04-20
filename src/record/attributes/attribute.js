
class Attribute {
    convert( value ){ return value; }

    // create empty object passing backbone options to constructor...
    create( options ){ return new this.type(); }

    // optimized general purpose isEqual function for typeless attributes
    // must be overriden in subclass
    isChanged( a, b ){
        return !( a === b || ( a && b && typeof a == 'object' && typeof b == 'object' && _.isEqual( a, b ) ) );
    }

    // generic clone function for typeless attributes
    // Must be overriden in sublass
    clone( value, options ){
        if( value && typeof value === 'object' ){
            var proto = Object.getPrototypeOf( value );

            if( proto.clone ){
                // delegate to object's clone if it exist
                return value.clone( options );
            }

            if( options && options.deep && proto === Object.prototype || proto === Array.prototype ){
                // attempt to deep copy raw objects, assuming they are JSON
                return JSON.parse( JSON.stringify( value ) );
            }
        }

        return value;
    }

    validate( model, value, name ){}

    toJSON( value, key ){
        return value && value.toJSON ? value.toJSON() : value;
    }

    createPropertySpec(){
        const { name, get } = this;

        return {
            // call to optimized set function for single argument.
            set( value ){ setAttribute( this, name, value ); },

            // attach get hook to the getter function, if present
            get : get ? function(){ return get.call( this, this.attributes[ name ], name ); } :
                        function(){ return this.attributes[ name ]; }
        }
    }

    // automatically generated optimized transform function
    // do not touch.
    transform( value ){ return value; }
    handleChange( next, prev, model ){}

    // delegate user and system events on attribute transform
    delegateEvents( next, prev, model ){
        prev && prev.trigger && model.stopListening( prev );

        if( next && next.trigger ){
            if( this.events ){
                model.listenTo( next, this.events );
            }
        }

        //??? Need different way of handling it
        trigger3( model, 'replace:' + name, model, next, prev );
    }

    constructor : function( name, spec ){
    this.name = name;

    Object.transform( this, spec, function( value, name ){
        if( name === 'events' && this.events ){
            return Object.assign( this.events, value );
        }

        if( name === 'get' ){
            if( this.get ){
                value.unshift( this.get );
            }
            return chainHooks( value );
        }

        if( name === 'set' ){
            if( this.set ){
                value.push( this.set );
            }
            return chainHooks( value );
        }

        return value;
    }, this );

    this.initialize( spec );

    // assemble optimized transform function...
    if( this.cast ){
        this.transform = this._transform = this.cast;
    }
    if( this.set ){
        this.transform = this._transform = this.cast ? transform.hookAndCast : transform.hook;
    }
    if( this.events || this.__events ){
        this.transform =
            this._transform ? transform.delegateAndMore : this.delegateEvents;
    }
}
}



class Attribute {
    constructor( name, options ){
        this.name = name;
        this.deepUpdate = false;
    }

    // Pipeline functions (dynamically constructed)
    transform( next, prev, options ){}
    handleChange( next, prev ){}

    // Convert value type
    convert( next, prev, options ){
        return next == null ? next : new this.type( next, options );
    }

    isChanged( next, prev ){ return !_.isEqual( next, prev ); }

    //canBeUpdated( value ) <- overriden for nested things
    
    createPropertySpec(){
        const { get, name } = this,
              getter = get ? // attach get pipeline
                       function(){
                           return get.call( this, this.attributes[ name ], name );
                       } :
                       function(){ // fast path for common case
                           return this.attributes[ name ];
                       };

        return {
            get : getter,
            set( value ){
                // fast path `set` for plain assignment
                setAttribute( this, name, value );
            }
        }
    }
}

