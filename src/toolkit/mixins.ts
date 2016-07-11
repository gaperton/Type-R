/**
 * Mixins and @define metaprogramming class extensions
 * 
 * Vlad Balin & Volicon, (c) 2016
 */
import { log, assign, omit, getPropertyDescriptor, getBaseClass, defaults } from './tools.ts'

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

export type Extendable = typeof Class;

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
    static mixins( ...mixins : ( Function | {} )[] ) : typeof Class {
        const proto      = this.prototype,
              mergeRules : IMixinRules = this._mixinRules || {};

        for( var i = mixins.length - 1; i >= 0; i-- ) {
            const mixin = mixins[ i ];
            if( mixin instanceof Array ) {
                Class.mixins.apply( this, mixin );
            }
            else if( typeof mixin === 'function' ){
                defaults( mixin, this );
                mergeProps( proto, (<Function>mixin).prototype, mergeRules );
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

    // Inversion of control version of Class.mixin.
    static mixTo( ...args : Function[] ) : Extendable {
        for( let Ctor of args ) {
            Class.mixins.call( Ctor, this );
        }

        return this;
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
        const proto = this.prototype;

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

        // 1. Create the subclass (ES5 compatibility shim).
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

        // 2. Apply definitions
        return Subclass.define( spec, statics );
    }

    // Do the magic necessary for forward declarations.
    // Must be written in the way that it's safe to call twice.
    static predefine(){
        const BaseClass : Extendable = getBaseClass( this );

        // Make sure we don't inherit class factories.
        if( BaseClass.create === this.create ) {
            this.create = Class.create;
        }

        return this;
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
export function extendable< C extends Function >( Type : C ) : C {
    Class.mixTo( Type );
    return Type;
}

// @predefine decorator for forward definitions. 
export function predefine( Constructor : Extendable ){
    return Constructor.predefine();
}

// @define decorator for metaprogramming magic.
export function define( spec : ClassDefinition ){
    return createDecorator( 'define', spec );
} 

// create ES7 decorator function for the static class members
function createDecorator( name : string, spec : {} ){
    return function< C >( Ctor : C ) : void {
        if( Ctor[ name ] ) {
            Ctor[ name ]( spec );
        }
        else {
            Class[ name ].call( Ctor, spec );
        }
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