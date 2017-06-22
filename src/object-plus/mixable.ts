/**
 * Mixins and @define metaprogramming class extensions
 *
 * Vlad Balin & Volicon, (c) 2016
 */
import { log, assign, omit, getPropertyDescriptor, getBaseClass, defaults, transform, getChangedStatics } from './tools'
import { Mixin, MixableConstructor, getDefinitions, MixinMergeRules, staticMixins, applyInheritanceRules, applyMixin, staticMixinRules } from './mixins'
/**
 * Class definition recognized by [[Mixable.define]]
 */

export interface MixableDefinition {
    properties? : PropertyMap | boolean
}

export interface ClassDefinition extends MixableDefinition {
    mixins? : Mixin[]
    mixinRules? : MixinMergeRules
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
    static _mixinRules : MixinMergeRules = { properties : 'merge' };

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
    static mixins = staticMixins;

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
    static mixinRules = staticMixinRules;

    /**
     * Main metaprogramming method. May be overriden in subclasses to customize the behavior.
     * - Merge definition to the class prototype.
     * - Add native properties with descriptors from `definition.properties` to the prototype.
     * - Prevents inheritance of 'create' factory method.
     * - Assign mixinRules static property, and merge it with parent.
     * - Adds mixins.
     */

    /** 
     *  Must be called after inheritance and before 'define'.
     */
    static predefine(){
        const BaseClass : typeof Mixable = getBaseClass( this ),
            { onExtend } = this;

        // Build the hook chain.
        if( BaseClass.onExtend !== onExtend ){
            this.onExtend = function( BaseClass ){
                BaseClass.onExtend.call( this, BaseClass );
                onExtend.call( this, BaseClass );
            }
        }

        // Call the hook chain.
        this.onExtend( BaseClass );
    }

    static onExtend( BaseClass ) : void {
        // Make sure we don't inherit class factories.
        if( BaseClass.create === this.create ) {
            this.create = Mixable.create;
        }

        this.__super__ = BaseClass.prototype;
    }

    static define( protoProps : ClassDefinition = {}, staticProps? : {} ) : typeof Mixable {
        const BaseClass : typeof Mixable = getBaseClass( this );

        // Apply legacy mixins...
        const { mixins, mixinRules, ...definition } = protoProps;
        mixinRules && staticMixinRules.call( this, mixinRules );
        mixins && staticMixins.call( this, mixins );

        // Assign statics.
        staticProps && assign( this, staticProps );

        // Extract static definitions and merge them to the local definition...
        transform( definition, this._mixinRules, ( rule, name ) =>{
            if( typeof rule === 'string' && BaseClass[ name ] !== this[ name ]){
                return this[ name ];
            }
        });

        // Unshift definition to applied mixins.
        const definitions = getDefinitions( this );
        applyMixin( this.prototype, definitions, definition, this._mixinRules, true );

        // Build the hook chain.
        const { onDefine } = this;

        // Build the hook chain.
        if( BaseClass.onDefine && BaseClass.onDefine !== onDefine ){
            this.onDefine = function( spec, BaseClass ){
                const transformedSpec = onDefine.call( this, spec, BaseClass );
                return (BaseClass as typeof Mixable).onDefine.call( this, transformedSpec, BaseClass );
            }
        }

        if( this.onDefine ){
            const { properties } = this.onDefine( definitions, BaseClass );

            if( properties ){
                Object.defineProperties( this.prototype, transform( {}, <PropertyMap>properties, toPropertyDescriptor ) );
            }
        }
        

        // Apply merge rules to overriden prototype members.
        // For each merge rule defined, if there is something in prototype it must be merged with the base class
        // according to the rules.
        applyInheritanceRules( this );

        return this;
    }

    // Define properties
    static onDefine : ( definition : object, BaseClass : Function ) => object;

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
            Subclass = class Subclass extends this {};
        }

        Subclass.predefine();
        spec && Subclass.define( spec, statics );

        return Subclass;
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
export function predefine( Constructor : typeof Mixable ) : void {
    Constructor.predefine();
}

/** @decorator `@define` for metaprogramming magic. Can be used with [[Mixable]] classes only.
 *  Forwards the call to [[Mixable.define]].
 */
export function define( spec : ClassDefinition ) : ClassDecorator;
export function define( spec : typeof Mixable ) : void;
export function define( ClassOrDefinition : ClassDefinition | typeof Mixable ){
    // @define class
    if( typeof ClassOrDefinition === 'function' ){
        ClassOrDefinition.predefine();
        ClassOrDefinition.define({});
    }
    // @define({ prop : val, ... }) class
    else{
        return function( Ctor : typeof Mixable ){
            Ctor.predefine();
            Ctor.define( ClassOrDefinition );
        }
    }
}

/**
 * Helpers
 */

