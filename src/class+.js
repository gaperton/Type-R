const mergeRules = {
    merge( a, b, rules ){
        return mergeProps( { ...a }, b, rules );
    },

    pipe( a, b ){
        return function( x ){
            return a.call( this, b.call( this, x ) );
        }
    },

    sequence( a, b ){
        return function(){
            a.apply( this, arguments );
            b.apply( this, arguments );
        }
    },

    reverse( a, b ){
        return function(){
            b.apply( this, arguments );
            a.apply( this, arguments );
        }
    },

    every( a, b ){
        return function(){
            return a.apply( this, arguments ) && b.apply( this, arguments );
        }
    },

    some( a, b ){
        return function(){
            return a.apply( this, arguments ) || b.apply( this, arguments );
        }
    }
};

export function getPropertyDescriptor( obj, prop ){
    for( var desc; !desc && obj; obj = Object.getPrototypeOf( obj ) ){
        desc = Object.getOwnPropertyDescriptor( obj, prop );
    }

    return desc;
}

function mergeProps( target, source, rules = {} ){
    const sourceProps = Object.getOwnPropertyNames( source );
    for( var i = 0; i < sourceProps.length; i++ ){
        const name       = sourceProps[ i ],
              sourceProp = Object.getOwnPropertyDescriptor( source, name ),
              destProp   = getPropertyDescriptor( target, name ); // Shouldn't be own

        if( destProp ){
            const rule  = rules[ name ],
                  value = destProp.value;

            if( rule && value ){
                target[ name ] = typeof rule === 'object' ?
                                 mergeRules.merge( value, sourceProp.value, rule ) :
                                 mergeRules[ rule ]( value, sourceProp.value );
            }
        }
        else{
            Object.defineProperty( target, name, sourceProp );
        }
    }

    return target;
}

export class Class {
    static create( attrs, options ){
        return new this( attrs, options );
    }

    static mixins( mixins = [] ){
        const proto      = this.prototype,
              mergeRules = this.mixinRules || {};

        for( var i = mixins.length - 1; i >= 0; i-- ){
            const mixin = mixins[ i ];
            mergeProps( proto, mixin, mergeRules );
        }

        return this;
    }

    static define( spec = {} ){
        const proto = this.prototype,
              Base  = Object.getPrototypeOf( proto ).constructor;

        // Remove abstract class factory on inheritance
        if( Base.create !== Class.create && Base.create === this.create ){
            this.create = Class.create;
        }

        const { properties = {}, mixins, ...specProps } = spec;

        Object.assign( proto, specProps );
        Object.defineProperties( proto, properties );

        if( Base.mixinRules && Base.mixinRules !== this.mixinRules ){
            mergeProps( this.mixinRules, Base.mixinRules );
        }

        this.mixins( mixins );
    }
}

export function define( spec ){
    return typeof spec === 'function' ?
               spec.define() :
               function( Class ){
                   Class.define( spec );
               }
}

export function mixins(){
    const arr = Array.prototype.slice.call( arguments );

    return function( Ctor ){
        if( Ctor.mixins ){
            Ctor.mixins( arr );
        }
        else{
            Class.mixins.call( Ctor, arr );
        }
    }
}

export function attach( Ctor ){
    Ctor.create = Class.create;
    Ctor.define = Class.define;
    Ctor.mixins = Class.mixins;
}

/**
 * Simple overridable logging stubs
 *
 */

export let log = {
    level : 2,

    error(){
        console.error.apply( this, arguments );
    },

    warning(){
        if( this.level > 0 ) console.warning.apply( this, arguments );
    },

    info(){
        if( this.level > 1 ) console.warning.apply( this, arguments );
    },

    debug(){
        if( this.level > 2 ) console.log.apply( this, arguments );
    }
};

export function transform( dest, source, fun ){
    for( var name in source ){
        if( source.hasOwnProperty( name ) ){
            var value = fun( source[ name ], name );
            typeof value === 'undefined' || ( dest[ name ] = value );
        }
    }

    return dest;
}

export function assign( dest ){
    for( let i = 1; i < arguments.length; i++ ){
        let source = arguments[ i ];
        if( source.hasOwnProperty( name ) ){
            dest[ name ] = source[ name ];
        }
    }

    return dest;
}

export function defaults( dest ){
    for( let i = 1; i < arguments.length; i++ ){
        let source = arguments[ i ];
        if( source.hasOwnProperty( name ) && !( name in dest ) ){
            dest[ name ] = source[ name ];
        }
    }

    return dest;
}

export function createForEach( attrSpecs ){
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ){
        statements.push( '(v=a.' + name + ')' + '===void 0||f(v,"' + name + '");' );
    }

    return new Function( 'a', 'f', statements.join( '' ) );
}

export function createCloneCtor( attrSpecs ){
    var statements = [];

    for( let name in attrSpecs ){
        statements.push( "this." + name + "=x." + name + ";" );
    }

    var CloneCtor = new Function( "x", statements.join( '' ) );
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}

export function createTransformCtor( attrSpecs ){
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ){
        statements.push( 'this.' + name + '=(v=a.' + name + ')' + '===void 0?void 0 :f(v,"' + name + '");' );
    }

    var TransformCtor = new Function( "a", 'f', statements.join( '' ) );
    TransformCtor.prototype = Object.prototype;
    return TransformCtor;
}