/**
 * Dependency-free tools, used across 'nested' libs.
 * Vlad Balin, (c) 2016
 */
import { assign, omit, getPropertyDescriptor } from './tools'

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
     */
    static create : ( a : any, b : any ) => Class;

    static _mixinRules : MixinRules = { properties : 'merge' };

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

    static extend( spec? : {}, statics? : {} ){
        let subclass;

        if( spec.constructor ){
            subclass = spec.constructor;
            __extends( subclass, this );
        }
        else{
            subclass = class extends this {};
        }

        subclass.define( spec, statics );
    }
}

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