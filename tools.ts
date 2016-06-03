/**
 * Dependency-free tools, used across 'nested' libs.
 *
 * @module
 */
type MixinRules = { [ propertyName : string ] : string }

interface Specification {
    properties? : PropertyDescriptorMap
    mixins? : Array< Object >
    mixinRules? : MixinRules
    [ name : string ] : any
}

declare function __extends( a, b )

/**
 * Base class, holding class extensions
 */
export class Class {
    /**
     * Abstract class factory. Should be overridden for abstract classes.
     * Passes two arguments to class constructor.
     *
     * Cleared up on inheritance when defined for some abstract class.
     *
     * @param attrs
     * @param options
     * @returns {Class}
     */
    static create : ( a : any, b : any ) => Class;

    static _mixinRules : Object;

    /**
     * Attach mixins to class prototype.
     * Members merging policy is controlled by MyClass.mixinRules property.
     * mixinRules is merged on inheritance.
     *
     * @param mixins - array of mixin objects.
     * @returns {Class}
     */
    static mixins( ...mixins ) {
        const proto      = this.prototype,
              mergeRules = this.mixinRules || {};

        for( var i = mixins.length - 1; i >= 0; i-- ) {
            const mixin = mixins[ i ];
            if( mixin instanceof Array ) {
                Class.mixins.apply( this, mixin );
            }
            else {
                mergeProps( proto, mixin, mergeRules );
            }
        }

        return this;
    }

    static mixinRules( mixinRules ) {
        const Base = Object.getPrototypeOf( this.prototype ).constructor;

        if( Base._mixinRules ) {
            mergeProps( mixinRules, Base._mixinRules );
        }

        this._mixinRules = mixinRules;
    }

    /**
     * Autobinding helper to be used from constructors
     */
    bindAll( ...names : string [] )
    bindAll() {
        for( var i = 0; i < arguments.length; i++ ) {
            const name = arguments[ i ];

            this[ name ] = this[ name ].bind( this );
        }
    }

    /**
     * Merge spec properties to the prototype.
     * Add native properties with descriptors from spec.properties to the prototype.
     * Prevents inheritance of create factory method.
     * Assign mixinRules static property, and merge it with parent.
     * Add mixins
     */
    static define( spec : Specification = {}, statics? : {} ) {
        // Attach class extensions, if it's not done...
        this.define || classExtensions( this );

        const proto = this.prototype,
              Base  = Object.getPrototypeOf( proto ).constructor;

        // Remove abstract class factory on inheritance
        if( Base.create !== Class.create && Base.create === this.create ) {
            this.create = Class.create;
        }

        // Process spec...
        const specProps = omit( spec, 'properties', 'mixins', 'mixinRules' ),
            { properties = <PropertyDescriptorMap> {}, mixins, mixinRules } = spec;

        // assign spec members to prototype
        assign( proto, specProps );
        assign( this, statics );

        // define properties
        Object.defineProperties( proto, properties );

        // apply mixins and mixin rules
        mixinRules && this.mixinRules( mixinRules );
        mixins && this.mixins( mixins );
    }

    static extend( spec, statics ){
        const subclass = spec.constructor ? __extends( spec.constructor, this ) : class extends this {};
        subclass.define( spec, statics );
    }
}

Class._mixinRules = { properties : 'merge' };

/**
 * Merge mixin rules class decorator
 * @param rules
 * @returns {Function}
 */

function createDecorator( name, spec ) {
    return function( Ctor ) {
        if( Ctor[ name ] ) {
            Ctor[ name ]( spec );
        }
        else {
            Class[ name ].call( Ctor, spec );
        }
    }
}

export function mixinRules( rules ) {
    return createDecorator( 'mixinRules', rules );
}

function defineDecorator( spec ) {
    return typeof spec === 'function' ?
                   spec.define() :
                   createDecorator( 'define', spec );
}

export { defineDecorator as define };

export function mixins( ...list ) {
    return createDecorator( 'mixins', list );
}

export function classExtensions( ...args ) {
    for( let Ctor of args ) {
        Ctor.create            = Class.create;
        Ctor.define            = Class.define;
        Ctor.mixins            = Class.mixins;
        Ctor.mixinRules        = Class.mixinRules;
        Ctor._mixinRules        = Class._mixinRules;
        Ctor.prototype.bindAll = Class.prototype.bindAll;
    }
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

    warn(){
        if( this.level > 0 ) console.warn.apply( this, arguments );
    },

    info(){
        if( this.level > 1 ) console.info.apply( this, arguments );
    },

    debug(){
        if( this.level > 2 ) console.log.apply( this, arguments );
    }
};

/**
 * Object manipulation helpers...
 */

export function omit( source : {}, ...rest : string[] ) : {}
export function omit( source ) : {} {
    const dest = {}, discard = {};

    for( let i = 1; i < arguments.length; i ++ ){
        discard[ arguments[ i ] ] = true;
    }

    for( var name in source ) {
        if( !discard[ name ] && source.hasOwnProperty( name ) ) {
            dest[ name ] = source[ name ];
        }
    }

    return dest;
}

export function mapObject( dest, source, fun ) {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            var value = fun( source[ name ], name );
            value === void 0 || ( dest[ name ] = value );
        }
    }

    return dest;
}

export function fastAssign( dest, source ) {
    for( var name in source ) {
        dest[ name ] = source[ name ];
    }
}

export function fastDefaults( dest, source ) {
    for( var name in source ) {
        dest[ name ] === void 0 || ( dest[ name ] = source[ name ] );
    }
}

function forAllArgs( fun ) {
    return function( dest, ...sources ) {
        for( var i = 0; i < sources.length; i++ ) {
            const source = sources[ i ];
            source && fun( dest, source );
        }

        return dest;
    }
}

export const assign = forAllArgs( ( dest, source ) => {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            dest[ name ] = source[ name ];
        }
    }
} );

export const defaults = forAllArgs( ( dest, source ) => {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            dest[ name ] === void 0 || ( dest[ name ] = source[ name ] );
        }
    }
} );

export function createForEach( attrSpecs ) {
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ) {
        statements.push( '(v=a.' + name + ')' + '===void 0||f(v,"' + name + '");' );
    }

    return new Function( 'a', 'f', statements.join( '' ) );
}

export function createCloneCtor( attrSpecs ) {
    var statements = [];

    for( let name in attrSpecs ) {
        statements.push( "this." + name + "=x." + name + ";" );
    }

    var CloneCtor       = new Function( "x", statements.join( '' ) );
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}

export function createTransformCtor( attrSpecs ) {
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ) {
        statements.push( 'this.' + name + '=(v=a.' + name + ')' + '===void 0?void 0 :f(v,"' + name + '");' );
    }

    var TransformCtor       = new Function( "a", 'f', statements.join( '' ) );
    TransformCtor.prototype = Object.prototype;
    return TransformCtor;
}

/**
 * notEqual( a, b ) function, for deep objects comparison
 * Optimized for primitive types
 */

const ArrayProto = Array.prototype;

export function notEqual( a, b ) {
    if( a === b ) return false;

    if( a && b && typeof a == 'object' && typeof b == 'object' ) {
        const protoA = Object.getPrototypeOf( a );

        if( protoA !== Object.getPrototypeOf( b ) ) return true;

        return protoA === ArrayProto ?
               arraysNotEqual( a, b ) :
               objectsNotEqual( a, b );
    }

    return true;
}

function objectsNotEqual( a, b ) {
    const keysA = Object.keys( a );

    if( keysA.length !== Object.keys( b ).length ) return true;

    for( let i = 0; i < keysA.length; i++ ) {
        const key = keysA[ i ];

        if( !b.hasOwnProperty( key ) || notEqual( a[ key ], b[ key ] ) ) {
            return true;
        }
    }

    return false;
}

function arraysNotEqual( a, b ) {
    if( a.length !== b.length ) return true;

    for( let i = 0; i < a.length; i++ ) {
        if( notEqual( a[ i ], b[ i ] ) ) return true;
    }

    return false;
}

/***********************
 * Mixins helpers
 */
const mergeRules = {
    merge( a, b, rules ){
        const x = assign( {}, a );
        return mergeProps( x , b, rules );
    },

    pipe( a, b ){
        return function( x ) {
            return a.call( this, b.call( this, x ) );
        }
    },

    sequence( a, b ){
        return function() {
            a.apply( this, arguments );
            b.apply( this, arguments );
        }
    },

    reverse( a, b ){
        return function() {
            b.apply( this, arguments );
            a.apply( this, arguments );
        }
    },

    every( a, b ){
        return function() {
            return a.apply( this, arguments ) && b.apply( this, arguments );
        }
    },

    some( a, b ){
        return function() {
            return a.apply( this, arguments ) || b.apply( this, arguments );
        }
    }
};

export function getPropertyDescriptor( obj, prop ) {
    for( var desc; !desc && obj; obj = Object.getPrototypeOf( obj ) ) {
        desc = Object.getOwnPropertyDescriptor( obj, prop );
    }

    return desc;
}

function mergeProps( target, source, rules = {} ) {
    const sourceProps = Object.getOwnPropertyNames( source );
    for( var i = 0; i < sourceProps.length; i++ ) {
        const name       = sourceProps[ i ],
              sourceProp = Object.getOwnPropertyDescriptor( source, name ),
              destProp   = getPropertyDescriptor( target, name ); // Shouldn't be own

        if( destProp ) {
            const rule  = rules[ name ],
                  value = destProp.value;

            if( rule && value ) {
                target[ name ] = typeof rule === 'object' ?
                                 mergeRules.merge( value, sourceProp.value, rule ) :
                                 mergeRules[ rule ]( value, sourceProp.value );
            }
        }
        else {
            Object.defineProperty( target, name, sourceProp );
        }
    }

    return target;
}