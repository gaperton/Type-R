/**
 * Dependency-free tools, used across 'nested' libs.
 * Vlad Balin, (c) 2016
 */
import { assign, omit, getPropertyDescriptor } from './tools'

type MergeRule = 'merge' | 'pipe' | 'sequence' | 'reverse' | 'every' | 'some'

interface IMixinRules {
    [ propertyName : string ] : MergeRule | IMixinRules
}

export interface IClassSpec {
    properties? : PropertyDescriptorMap
    mixins? : Array< Object >
    mixinRules? : IMixinRules
    [ name : string ] : any
}

declare function __extends( a, b )

export interface IExtendable {
    new ( ...args : any[] ) : {}
    define(spec? : IClassSpec, statics? : {} ) : IExtendable
    extend(spec? : IClassSpec, statics? : {} ) : IExtendable
    create?( ...args : any[] ) : {}

    mixins( ...mixins : {}[] ) : IExtendable
    mixinRules( mixinRules : IMixinRules ) : IExtendable
}

// Base class, holding class extensions
export class Class {
    /**
     * Abstract class factory. Should be overridden for abstract classes.
     * Passes two arguments to class constructor.
     *
     * Cleared up on inheritance when defined for some abstract class.
     */
    static create : ( ( ...args : any[] ) => {} ) = void 0;

    protected static _mixinRules : IMixinRules = { properties : 'merge' };

    /**
     * Attach mixins to class prototype.
     * Members merging policy is controlled by MyClass.mixinRules property.
     * mixinRules is merged on inheritance.
     */
    static mixins( ...mixins : {}[] ) : IExtendable {
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

    static mixinRules( mixinRules : IMixinRules ) : IExtendable {
        const Base = Object.getPrototypeOf( this.prototype ).constructor;

        if( Base._mixinRules ) {
            mergeProps( mixinRules, Base._mixinRules );
        }

        this._mixinRules = mixinRules;
        return this;
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

    static attach( ...args ) {
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
     * Merge spec properties to the prototype.
     * Add native properties with descriptors from spec.properties to the prototype.
     * Prevents inheritance of create factory method.
     * Assign mixinRules static property, and merge it with parent.
     * Add mixins
     */
    static define(spec : IClassSpec = {}, statics? : {} ) : IExtendable {
        // Attach class extensions, if it's not done...
        this.define || Class.attach( this );

        const proto = this.prototype,
              Base : IExtendable = Object.getPrototypeOf( proto ).constructor;

        // Remove abstract class factory on inheritance
        if( Base.create === this.create ) {
            this.create = void 0;
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

        return this;
    }

    static extend(spec? : IClassSpec, statics? : {} ) : IExtendable {
        let subclass;

        if( spec.constructor ){
            subclass = spec.constructor;
            __extends( subclass, this );
        }
        else{
            subclass = class extends this {};
        }

        return subclass.define( spec, statics );
    }
}

// export decorator functions...
export function mixinRules( rules : IMixinRules ) {
    return createDecorator( 'mixinRules', rules );
}

export function mixins( ...list : {}[] ) {
    return createDecorator( 'mixins', list );
}

function defineDecorator( spec : {} | IExtendable ) {
    return typeof spec === 'function' ?
                   (<IExtendable>spec).define() :
                   createDecorator( 'define', spec );
}

export { defineDecorator as define };

// create ES7 decorator function for the static class members
function createDecorator( name : string, spec : {} ) : ( Ctor : IExtendable ) => IExtendable {
    return function( Ctor : IExtendable ) : IExtendable {
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