/**
 * Mixins and @define metaprogramming class extensions
 *
 * Vlad Balin & Volicon, (c) 2016
 */
import { log, assign, omit, getPropertyDescriptor, getBaseClass, defaults, transform } from './tools'

/**
 * Class definition recognized by [[Mixable.define]]
 */
export interface ClassDefinition {
    properties? : PropertyMap | boolean
    mixins? : Mixin[]
    mixinRules? : MixinRules
    [ name : string ] : any
}

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
 * Generic interface to reference constructor function of any Mixable type T.
 * @hidden
 */
export interface MixableConstructor< T > extends Constructor< T >{
    prototype : T
    create( a : any, b? : any ) : T
    mixins( ...mixins : ( Constructor<any> | {} )[] ) : MixableConstructor< T >
    mixinRules( mixinRules : MixinRules ) : MixableConstructor< T >
    mixTo( ...args : Constructor<any>[] ) : MixableConstructor< T >
    define( definition : ClassDefinition, staticProps? : {} ) : MixableConstructor< T >
    extend(spec? : ClassDefinition, statics? : {} ) : MixableConstructor< T >
    predefine() : MixableConstructor< T >
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
    constructor(){ this.initialize.apply( this, arguments ); }
    initialize() : void {}

    /** Generic class factory. May be overridden for abstract classes. Not inherited. */
    static create( a : any, b? : any ) : Mixable {
        return new (<any>this)( a, b );
    }

    /** @hidden */
    protected static _mixinRules : MixinRules = { properties : 'merge' };

    /** @hidden */
    static _appliedMixins : any[]

    /**
     * Attach the sequence of mixins to the class prototype.
     *
     * ```javascript
     *    MyMixableClass.mixins( plainObjMixin, OtherConstructor, ... );
     *    MyOtherClass.mixins([ plainObjMixin, OtherConstructor, ... ]);
     * ```
     *
     * @param mixins The list of class constructors or plain objects. Both static and prototype properties are mixed in for constructors.
     */
    static mixins = applyMixins;

    /** Inversion of control version of [[Mixable.mixin]].
     * `Class.mixTo( A, B, ... )` will mix static and prototype `Class` members to the given list of classes.
     * `Mixable.mixTo( A, B, ... )` can be used to convert any classes to mixable.
    */
    static mixTo< T >( ...args : Function[] ) : typeof Mixable {
        for( let Ctor of args ) {
            Mixable.mixins.call( Ctor, this );
        }

        return this;
    }

    /** Define specific rules for mixin some particular class members.
     *  mixinRules of the base class are properly merged on inheritance.
     */
    static mixinRules = defineMixinRules;

    /**
     * Main metaprogramming method. May be overriden in subclasses to customize the behavior.
     * - Merge definition to the class prototype.
     * - Add native properties with descriptors from `definition.properties` to the prototype.
     * - Prevents inheritance of 'create' factory method.
     * - Assign mixinRules static property, and merge it with parent.
     * - Adds mixins.
     */
    static define( definition : ClassDefinition = {}, staticProps? : {} ) : typeof Mixable {
        // That actually might happen when we're using @define decorator...
        if( !this.define ){
            log.error( "[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition );
            return this;
        }

        this.predefine();

        // Obtain references to prototype and base class.
        const proto = this.prototype;

        // Extract prototype properties from the definition.
        const { properties = <PropertyMap> {}, mixins, mixinRules, ...protoProps } = definition;

        // Update prototype and statics.
        assign( proto, protoProps );
        assign( this, staticProps );

        // Define native properties.
        properties && Object.defineProperties( proto, transform( {}, <PropertyMap>properties, toPropertyDescriptor ) );

        // Apply mixin rules.
        mixinRules && this.mixinRules( mixinRules );

        // Apply mixins.
        mixins && this.mixins( mixins );

        // Apply merge rules to overriden prototype members.
        // For each merge rule defined, if there is something in prototype it must be merged with the base class
        // according to the rules.
        if( this._mixinRules ){
            const baseProto = getBaseClass( this ).prototype;

            for( let name of Object.keys( proto ) ){
                if( name !== 'constructor' && this._mixinRules.hasOwnProperty( name ) && name in baseProto ){
                    proto[ name ] = mergeProp( proto[ name ], baseProto[ name ], this._mixinRules[ name ] );
                }
            }
        }

        return this;
    }

    /** Backbone-compatible extend method to be used in ES5 and for backward compatibility */
    static extend(spec? : ClassDefinition, statics? : {} ) : typeof Mixable {
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
            Subclass = class _Subclass extends this {};
        }

        // 2. Apply definitions
        return spec ? Subclass.define( spec, statics ) : Subclass.predefine();
    }

    /** Do the magic necessary for forward declarations.
     *  Can be overriden by subclasses.
     *  Must be written in the way that it's safe to call twice.
     */
    static predefine() : typeof Mixable {
        const BaseClass : typeof Mixable = getBaseClass( this );

        // Make sure we don't inherit class factories.
        if( BaseClass.create === this.create ) {
            this.create = Mixable.create;
        }

        this.__super__ = BaseClass.prototype;

        return this;
    }

    /** @hidden */
    static __super__ : {}
}

/** @hidden */
function toPropertyDescriptor( x : Property ) : PropertyDescriptor {
    if( x ){
        return typeof x === 'function' ? { get : < () => any >x } : <PropertyDescriptor> x;
    }
}

/** @decorator `@extendable`. Convert ES6 class to be [[Mixable]] one. */
export function extendable( Type : Function ) : void {
    Mixable.mixTo( Type );
}

/** @decorator `@predefine` for forward definitions. Can be used with [[Mixable]] classes only.
 * Forwards the call to the [[Mixable.predefine]];
 */
export function predefine( Constructor : MixableConstructor< any > ) : void {
    Constructor.predefine();
}

/** @decorator `@define` for metaprogramming magic. Can be used with [[Mixable]] classes only.
 *  Forwards the call to [[Mixable.define]].
 */
export function define( spec : ClassDefinition ) : ClassDecorator;
export function define( spec : MixableConstructor< any > ) : void;
export function define( spec : ClassDefinition | MixableConstructor< any > ){
    // TODO: extract statics

    // Handle the case when `@define` used without arguments.
    if( typeof spec === 'function' ){
        spec.define({});
    }
    // Normal usage.
    else{
        return function( Ctor : typeof Mixable ){
            Ctor.define( spec );
        }
    }
}