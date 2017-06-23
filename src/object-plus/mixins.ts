/*****************************************************************
 * Mixins engine and @define metaprogramming class extensions
 *
 * Vlad Balin & Volicon, (c) 2016-2017
 */
import { log, assign, omit, getPropertyDescriptor, getBaseClass, defaults, transform, getChangedStatics } from './tools'

/** @hidden */
declare function __extends( a, b )

export interface MixableConstructor extends Function{
    __super__? : object;
    mixins? : MixinsState;
    onExtend? : ( BaseClass : Function ) => void;
    onDefine? : ( definition : object, BaseClass : Function ) => void;
    define? : ( definition? : object, statics? : object ) => MixableConstructor;
    extend? : ( definition? : object, statics? : object ) => MixableConstructor;
}

/**
 * Base class, holding metaprogramming class extensions.
 * Supports mixins and Class.define metaprogramming method.
 */
export class Mixable {
    static onExtend : ( BaseClass : Function ) => void;
    static onDefine : ( definition : object, BaseClass : Function ) => object;    
    static __super__ : object
    static mixins : MixinsState;

    /** 
     *  Must be called after inheritance and before 'define'.
     */
    static define( protoProps : object = {}, staticProps? : {} ) : MixableConstructor {
        const BaseClass : MixableConstructor = getBaseClass( this );

        // Assign statics.
        staticProps && assign( this, staticProps );

        this.mixins.mergeStaticDefinitions();
        this.mixins.mergeDefine( protoProps );

        this.onDefine && this.onDefine( this.mixins.definitions, BaseClass );
        
        this.mixins.mergeInheritance();

        return this;
    }

    /** Backbone-compatible extend method to be used in ES5 and for backward compatibility */
    static extend(spec? : object, statics? : {} ) : MixableConstructor {
        let Subclass : MixableConstructor;

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
export function predefine( Constructor : MixableConstructor ) : void {
    const BaseClass : MixableConstructor = getBaseClass( Constructor );

    // Legacy systems support
    Constructor.__super__ = BaseClass.prototype;
    
    // Initialize mixins structures...
    Constructor.define || MixinsState.get( Mixable ).populate( Constructor );

    // Make sure Ctor.mixins are ready before the callback...
    MixinsState.get( Constructor );

    // Call extend hook.
    Constructor.onExtend && Constructor.onExtend( BaseClass );
}

/** @decorator `@define` for metaprogramming magic. Can be used with [[Mixable]] classes only.
 *  Forwards the call to [[Mixable.define]].
 */
export function define( ClassOrDefinition : MixableConstructor ) : void;
export function define( ClassOrDefinition : object ) : ClassDecorator;
export function define( ClassOrDefinition : object | MixableConstructor ){
    // @define class
    if( typeof ClassOrDefinition === 'function' ){
        predefine( ClassOrDefinition );
        ClassOrDefinition.define();
    }
    // @define({ prop : val, ... }) class
    else{
        return function( Ctor : MixableConstructor ){
            predefine( Ctor );
            Ctor.define( ClassOrDefinition );
        }
    }
}

export function definitions( rules : MixinMergeRules ) : ClassDecorator {
    return ( Class : Function ) => {
        const mixins = MixinsState.get( Class );
        mixins.definitionRules = defaults( rules, mixins.definitionRules );
    }
}

export class MixinsState {
    mergeRules : MixinMergeRules;
    definitionRules : MixinMergeRules;
    definitions : object;
    appliedMixins : Mixin[];

    // Return mixins state for the class. Initialize if it's not exist.
    static get( Class ) : MixinsState {
        const { mixins } = Class;
    
        return mixins && Class === mixins.Class ? mixins :
             Class.mixins = new MixinsState( Class );
    }

    constructor( public Class : MixableConstructor ){
        const { mixins } = getBaseClass( Class );

        this.mergeRules = ( mixins && mixins.mergeRules ) || {};
        this.definitionRules = ( mixins && mixins.definitionRules ) || {};
        this.appliedMixins = ( mixins && mixins.appliedMixins ) || [];
    }

    mergeStaticDefinitions(){
        const definitions = {},
            { Class } = this,
            BaseClass = getBaseClass( Class );

        transform( definitions, this.definitionRules, ( rule, name ) =>{
            if( BaseClass[ name ] !== Class[ name ]){
                return Class[ name ];
            }
        });

        this.mergeObject( null, definitions );
    }

    mergeDefine( protoProps ){
        const { mixins, ...defineMixin } = protoProps
        this.mergeObject( this.Class.prototype, defineMixin );
        mixins && this.merge( mixins );

        return this.definitions;
    }

    merge( mixins : Mixin[] ){
        const proto      = this.Class.prototype,
            { mergeRules } = this;

        // Copy applied mixins array as it's going to be updated.
        const appliedMixins = this.appliedMixins = this.appliedMixins.slice();

        // Apply mixins in sequence...
        for( let mixin of mixins ) {
            // Mixins array should be flattened.
            if( Array.isArray( mixin ) ) {
                this.merge( mixin );
            }
            // Don't apply mixins twice.
            else if( appliedMixins.indexOf( mixin ) < 0 ){
                appliedMixins.push( mixin );

                // For constructors, merge _both_ static and prototype members.
                if( typeof mixin === 'function' ){
                    if( getBaseClass( mixin ) !== Object ){
                        //TODO log error
                        console.log( 'Mixin error' );
                    }

                    // Merge static members
                    this.mergeObject( this.Class, mixin );

                    // merge definitionRules and mergeRules
                    const sourceMixins = this.Class.mixins;
                    if( sourceMixins ){
                        defaults( {}, this.mergeRules, sourceMixins.mergeRules );
                        defaults( {}, this.definitionRules, sourceMixins.definitionRules );
                        this.appliedMixins = this.appliedMixins.concat( sourceMixins.appliedMixins );
                    }

                    // Prototypes are merged according with rules.
                    this.mergeObject( proto, mixin.prototype );
                }
                // Handle plain object mixins.
                else {
                    this.mergeObject( proto, mixin );
                }
            }
        }
    }

    populate( ...ctors : Function[] ){
        for( let Ctor of ctors ) {
            MixinsState.get( Ctor ).merge([ this ]);
        }
    }

    mergeObject( dest : object, source : object ) {
        for( let name of Object.keys( source ) ) {
            if( name !== 'constructor' ){
                const sourceProp = Object.getOwnPropertyDescriptor( source, name ),
                    rule = this.definitionRules[ name ];

                if( rule  ){
                    assignProperty( this.definitions, name, sourceProp, rule );
                }
                else{
                    assignProperty( dest, name, sourceProp, this.mergeRules[ name ] );
                }
            }
        }
    }

    mergeInheritance(){
        const { mergeRules, Class } = this;

        if( mergeRules ){
            const proto = Class.prototype,
                baseProto = getBaseClass( Class ).prototype;

            for( let name of Object.keys( proto ) ) {
                const rule = mergeRules[ name ];

                if( rule && name in baseProto ){
                    proto[ name ] = resolveRule( proto[ name ], baseProto[ name ], rule );
                }
            }
        }
    }
}

export interface MixinMergeRules {
    [ name : string ] : MixinMergeRule
}

export type MixinMergeRule = ( a : any, b : any ) => any
export type Mixin = object | Function

// @mixins( A, B, ... ) decorator.
export interface MixinRulesDecorator extends ClassDecorator {
    value : null
    merge( a : object, b : object ) : object;
    pipe( a: Function, b : Function ) : Function;
    defaults( a: Function, b : Function ) : Function;
    classFirst( a: Function, b : Function ) : Function;
    classLast( a: Function, b : Function ) : Function;
    every( a: Function, b : Function ) : Function;
    some( a: Function, b : Function ) : Function;
}

export const mixins = ( ...list : Mixin[] ) => (
    ( Class : Function ) => MixinsState.get( Class ).merge( list )
);

// @mixinRules({ name : rule, ... }) decorator.
export const mixinRules = ( ( rules : MixinMergeRules ) => (
    ( Class : Function ) => {
        const mixins = MixinsState.get( Class );
        mixins.mergeRules = defaults( rules, mixins.mergeRules );
    }
) ) as MixinRulesDecorator;

// Pre-defined mixin merge rules

mixinRules.value = null;

// Recursively merge members
mixinRules.merge = ( a, b ) => defaults( {}, a, b );

    // Execute methods in pipe, with the class method executed last.
mixinRules.pipe = ( a, b ) => (
    function( x : any ) : any {
        return a.call( this, b.call( this, x ) );
    }
);

    // Assume methods return an object, and merge results with defaults (class method executed first)
mixinRules.defaults = ( a : Function, b : Function ) => (
    function() : object {
        return defaults( a.apply( this, arguments ), b.apply( this, arguments ) );
    }
);

// Execute methods in sequence staring with the class method.
mixinRules.classFirst = ( a : Function, b : Function ) => (
    function() : void {
        a.apply( this, arguments );
        b.apply( this, arguments );
    }
);

    // Execute methods in sequence ending with the class method.
mixinRules.classLast = ( a : Function, b : Function ) => (
    function() : void {
        b.apply( this, arguments );
        a.apply( this, arguments );
    }
)

    // Execute methods in sequence returning the first falsy result.
mixinRules.every = ( a : Function, b : Function ) =>(
    function() : any {
        return a.apply( this, arguments ) && b.apply( this, arguments );
    }
);
    // Execute methods in sequence returning the first truthy result.
mixinRules.some = ( a : Function, b : Function ) =>(
    function() : any {
        return a.apply( this, arguments ) || b.apply( this, arguments );
    }
);

/**
 * Helpers
 */

function assignProperty( dest : object, name : string, sourceProp : PropertyDescriptor, rule : MixinMergeRule ){
    // Destination prop is defined, thus the merge rules must be applied.
    if( dest.hasOwnProperty( name ) ){
        dest[ name ] = resolveRule( sourceProp.value, dest[ name ], rule );
    }
    // If destination is empty, just copy the prop over.
    else{
        Object.defineProperty( dest, name, sourceProp );
    }
}

function resolveRule( dest, source, rule : MixinMergeRule ){
    // When destination is empty, take the source.
    if( dest === void 0 ) return source;

    // In these cases we take non-empty destination:
    if( !rule || source === void 0 ) return dest;

    // In other cases we must merge values.
    return rule( dest, source );
}