/**
 * Mixins and @define metaprogramming class extensions
 *
 * Vlad Balin & Volicon, (c) 2016
 */
import { log, assign, omit, getPropertyDescriptor, getBaseClass, defaults, transform, getChangedStatics } from './tools'
import { Mixin, MixinMergeRules, MixinsState } from './mixins'
/**
 * Class definition recognized by [[Mixable.define]]
 */

export interface PropertyMap {
    [ name : string ] : Property
}

export type Property = PropertyDescriptor | ( () => any )


/**
 * Property merge rule. Defines what will happen if the same member is defined in multiple mixins and the class.
 * - *merge* - assume property to be an object, which members taken from mixins must be merged.
 * - *pipe* - property is the function `( x : T ) => T` transforming the value. Multiple functions joined in pipe.
 * - *sequence* - property is the function. Multiple functions will be called in sequence.
 * - *reverse* - same as *sequence*, but functions called in reverse sequence.
 * - *every* - property is the function `( ...args : any[] ) => boolean`. Resulting method will return true if every single function returns true.
 * - *some* - same as previous, but method will return true when at least one function returns true.
 */

/** @hidden */
declare function __extends( a, b )

/**
 * Generic interface to reference constructor function type for any given T.
 * @hidden
 */
export interface Constructor< T >{
    new ( ...args : any[] ) : T
}

/**
 * Base class, holding metaprogramming class extensions.
 * Supports mixins and Class.define metaprogramming method.
 *
 * It's required to use `@define` decorator on inheritace.
 *
 *      @define({ a : 1 }) // add 'a' property to A.prototype
 *      class A extends Mixable {}
 *
 * or
 *      @define
 *      class A extends Mixable {}
 */

export class Mixable {
    static onExtend : ( BaseClass : Function ) => void;
    static onDefine : ( definition : object, BaseClass : Function ) => object;    
    static __super__ : object
    static mixins : MixinsState;

    /** 
     *  Must be called after inheritance and before 'define'.
     */
    static define( protoProps : object = {}, staticProps? : {} ) : typeof Mixable {
        const BaseClass : typeof Mixable = getBaseClass( this );

        // Assign statics.
        staticProps && assign( this, staticProps );

        this.mixins.mergeStaticDefinitions();
        this.mixins.mergeDefine( protoProps );

        this.onDefine && this.onDefine( this.mixins.definitions, BaseClass );
        
        this.mixins.mergeInheritance();

        return this;
    }

    /** Backbone-compatible extend method to be used in ES5 and for backward compatibility */
    static extend(spec? : object, statics? : {} ) : typeof Mixable {
        let Subclass : typeof Mixable;

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

        predefine( Subclass );
        spec && Subclass.define( spec, statics );

        return Subclass;
    }
}

/** @decorator `@predefine` for forward definitions. Can be used with [[Mixable]] classes only.
 * Forwards the call to the [[Mixable.predefine]];
 */
export function predefine( Constructor : typeof Mixable ) : void {
    const BaseClass : typeof Mixable = getBaseClass( Constructor );

    // Legacy systems support
    Constructor.__super__ = BaseClass.prototype;
    
    // Initialize mixins structures...
    Constructor.define || Mixable.mixins.populate( Constructor );

    // Make sure Ctor.mixins are ready before the callback...
    MixinsState.get( Constructor );

    // Call extend hook.
    Constructor.onExtend && Constructor.onExtend( BaseClass );
}

/** @decorator `@define` for metaprogramming magic. Can be used with [[Mixable]] classes only.
 *  Forwards the call to [[Mixable.define]].
 */
export function define( spec : object ) : ClassDecorator;
export function define( spec : typeof Mixable ) : void;
export function define( ClassOrDefinition : object | typeof Mixable ){
    // @define class
    if( typeof ClassOrDefinition === 'function' ){
        predefine( ClassOrDefinition );
        ClassOrDefinition.define();
    }
    // @define({ prop : val, ... }) class
    else{
        return function( Ctor : typeof Mixable ){
            predefine( Ctor );
            Ctor.define( ClassOrDefinition );
        }
    }
}

// @mixins( A, B, ... ) decorator.
export function mixins( ...list : Mixin[] ){
    return ( Class : Function ) => MixinsState.get( Class ).merge( list );
}

// @mixinRules({ name : rule, ... }) decorator.
export function mixinRules( rules : MixinMergeRules ){
    return ( Class : Function ) => {
        const mixins = MixinsState.get( Class );
        mixins.mergeRules = defaults( rules, mixins.mergeRules );
    }
}

export function definitions( rules : MixinMergeRules ){
    return ( Class : Function ) => {
        const mixins = MixinsState.get( Class );
        mixins.definitionRules = defaults( rules, mixins.definitionRules );
    }
}
/**
 * Helpers
 */

const M = {
    onDefine({ properties }){
        if( properties ){
            Object.defineProperties( this.prototype, transform( {}, <PropertyMap>properties, toPropertyDescriptor ) );
        }
    },

    onExtend( BaseClass ) : void {
        // Make sure we don't inherit class factories.
        if( BaseClass.create === this.create ) {
            this.create = Mixable.create;
        }
    },
        /** Generic class factory. May be overridden for abstract classes. Not inherited. */
    create( a : any, b? : any ) : Mixable {
        return new (<any>this)( a, b );
    }
}

function toPropertyDescriptor( x : Property ) : PropertyDescriptor {
    if( x ){
        return typeof x === 'function' ? { get : < () => any >x } : <PropertyDescriptor> x;
    }
}