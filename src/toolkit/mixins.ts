/**
 * Mixins and @define metaprogramming class extensions
 * 
 * Vlad Balin & Volicon, (c) 2016
 */
import { log, assign, omit, getPropertyDescriptor } from './tools.ts'

type MergeRule = 'merge' | 'pipe' | 'sequence' | 'reverse' | 'every' | 'some'

interface IMixinRules {
    [ propertyName : string ] : MergeRule | IMixinRules
}

export interface ClassDefinition {
    properties? : PropertyDescriptorMap
    mixins? : Array< Object >
    mixinRules? : IMixinRules
    [ name : string ] : any
}

declare function __extends( a, b )

export interface Factory {
    create( ...args : any[] ) : {}
}

export interface Extendable extends Factory {
    define(spec? : ClassDefinition, statics? : {} ) : Extendable
    extend(spec? : ClassDefinition, statics? : {} ) : Extendable
    mixins( ...mixins : {}[] ) : Extendable
    mixinRules( mixinRules : IMixinRules ) : Extendable
}

// Base class, holding metaprogramming class extensions
// Supports mixins, and Class.define metaprogramming method.
export class Class {

    // Generic class factory. May be overridden for abstract classes. Not inherited.
    static create( a : any, b? : any, c? : any ) : Class {
        return new (<any>this)( a, b, c );
    }

    protected static _mixinRules : IMixinRules = { properties : 'merge' };

    /**
     * Attach mixins to class prototype.
     */
    static mixins( ...mixins : {}[] ) : Extendable {
        const proto      = this.prototype,
              mergeRules : IMixinRules = this._mixinRules || {};

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

    // Members merging policy is controlled by MyClass.mixinRules property.
    // mixinRules are properly inherited and merged.
    static mixinRules( mixinRules : IMixinRules ) : Extendable {
        const Base = Object.getPrototypeOf( this.prototype ).constructor;

        if( Base._mixinRules ) {
            mergeProps( mixinRules, Base._mixinRules );
        }

        this._mixinRules = mixinRules;
        return this;
    }

    // Autobinding helper to be used from constructors
    bindAll( ...names : string [] ) : void
    bindAll() {
        for( var i = 0; i < arguments.length; i++ ) {
            const name = arguments[ i ];

            this[ name ] = this[ name ].bind( this );
        }
    }

    // Attach Class methods to existing constructors
    static attach( ...args : any[] ) : void {
        for (let Ctor of args) {
            Ctor.create            = this.create;
            Ctor.define            = this.define;
            Ctor.mixins            = this.mixins;
            Ctor.mixinRules        = this.mixinRules;
            Ctor._mixinRules       = this._mixinRules;
            Ctor.prototype.bindAll = this.prototype.bindAll;
        }
    }

    /**
     * Main metaprogramming method. May be overriden in subclasses to customize the behavior.   
     * - Merge definition to the prototype.
     * - Add native properties with descriptors from spec.properties to the prototype.
     * - Prevents inheritance of 'create' factory method.
     * - Assign mixinRules static property, and merge it with parent.
     * - Adds mixins.
     */
    static define( definition : ClassDefinition = {}, staticProps? : {} ) : Extendable {
        // That actually might happen when we're using @define decorator... 
        if( !this.define ){
            log.error( "[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition );
            return this;
        }

        // Obtain references to prototype and base class.
        const proto = this.prototype,
              BaseClass : Extendable = Object.getPrototypeOf( proto ).constructor;

        // Make sure we don't inherit class factories.
        if( BaseClass.create === this.create ) {
            this.create = Class.create;
        }

        // Extract prototype properties from the definition.
        const protoProps = omit( definition, 'properties', 'mixins', 'mixinRules' ),
            { properties = <PropertyDescriptorMap> {}, mixins, mixinRules } = definition;

        // Update prototype and statics.
        assign( proto, protoProps );
        assign( this, staticProps );

        // Define native properties.
        properties && Object.defineProperties( proto, properties );

        // Apply mixins and mixin rules.
        mixinRules && this.mixinRules( mixinRules );
        mixins && this.mixins( mixins );

        return this;
    }

    // Backbone-compatible extend method to be used in ES5 and for backward compatibility
    static extend(spec? : ClassDefinition, statics? : {} ) : Extendable {
        let Subclass : Extendable;

        // If constructor function is given...
        if( spec && spec.hasOwnProperty( 'constructor' ) ){
            // ...we need to manually call internal TypeScript __extend function. Hack! Hack!
            Subclass = <any>spec.constructor; 
            __extends( Subclass, this );
        }
        // Otherwise, create the subclall in usual way.
        else{
            Subclass = class Subclass extends this {};
        }

        // And apply definitions
        return Subclass.define( spec, statics );
    }
}

// @mixinRules({ ... }) decorator
export function mixinRules( rules : IMixinRules ) {
    return createDecorator( 'mixinRules', rules );
}

// @mixins( A, B, C ) decorator
export function mixins( ...list : {}[] ) {
    return createDecorator( 'mixins', list );
}

// @extendable decorator
export function extendable( Type : Function ) : Function{
    Class.attach( Type );
    return Type;
}

function defineDecorator( spec : {} | Extendable ) {
    return typeof spec === 'function' ?
                   (<Extendable>spec).define() :
                   createDecorator( 'define', spec );
}

export { defineDecorator as define };

// create ES7 decorator function for the static class members
function createDecorator( name : string, spec : {} ) : ( Ctor : Extendable ) => Extendable {
    return function( Ctor : Extendable ) : Extendable {
        if( Ctor[ name ] ) {
            Ctor[ name ]( spec );
        }
        else {
            Class[ name ].call( Ctor, spec );
        }

        return Ctor;
    }
}

/***********************
 * Mixins helpers
 */
function mergeObjects( a : {}, b : {}, rules? : IMixinRules ) : {} {
    const x = assign( {}, a );
    return mergeProps( x , b, rules );
}

interface IMergeFunctions {
    [ name : string ] : ( a : Function, b : Function ) => Function
}

const mergeFunctions : IMergeFunctions = {
    pipe< A, B, C >( a: ( x : B ) => C, b : ( x : A ) => B ) : ( x : A ) => C {
        return function( x : A ) : C {
            return a.call( this, b.call( this, x ) );
        }
    },

    sequence( a : Function, b : Function ){
        return function() : void {
            a.apply( this, arguments );
            b.apply( this, arguments );
        }
    },

    reverse( a : Function, b : Function ){
        return function() : void {
            b.apply( this, arguments );
            a.apply( this, arguments );
        }
    },

    every( a : Function, b : Function ){
        return function() {
            return a.apply( this, arguments ) && b.apply( this, arguments );
        }
    },

    some( a : Function, b : Function ){
        return function() {
            return a.apply( this, arguments ) || b.apply( this, arguments );
        }
    }
};

function mergeProps< T extends {} >( target : T, source : {}, rules : IMixinRules = {}) : T {
    for( let name of Object.getOwnPropertyNames( source ) ) {
        const sourceProp = Object.getOwnPropertyDescriptor( source, name ),
              destProp   = getPropertyDescriptor( target, name ); // Shouldn't be own

        if( destProp ) {
            const rule  = rules[ name ],
                  value = destProp.value;

            if( rule && value ) {
                target[ name ] = typeof rule === 'object' ?
                    mergeObjects( value, sourceProp.value, rule ) :(
                        rule === 'merge' ?
                            mergeObjects( value, sourceProp.value ) :
                            mergeFunctions[ rule ]( value, sourceProp.value )
                    );
            }
        }
        else {
            Object.defineProperty( target, name, sourceProp );
        }
    }

    return target;
}
