/***********************
 * Mixins helpers
 */

import { assign, defaults, getBaseClass } from './tools'

/**
 * Public mixins API
 */
// Mixin rule is the reducer function which is applied to the mixins chain starting from the class prototype.
// Pre-defined string mixin rules are for definitions which must be extracted from mixins.

// @mixinRules({ name : rule, ... }) decorator.
export function mixinRules( rules : MixinMergeRules ){
    return ( Class : Function ) => staticMixinRules.call( Class, rules );
}

export interface MixinMergeRules {
    [ name : string ] : MixinMergeRule
}

export type DefinitionMergeRule = 'merge' | 'assign';
export type MethodMergeRule = ( a : any, b : any ) => any
export type MixinMergeRule = MethodMergeRule | DefinitionMergeRule;

// @mixins( A, B, ... ) decorator.
export function mixins( ...list : Mixin[] ){
    return ( Class : Function ) => staticMixins.apply( Class, list )
}

export type Mixin = object | Function

/**
 * Main mixin function. Mix the stuff in according with the rules, and separate definitions out.
 * @param dest - target object which will be updated.
 * @param definition - target definitions object which will be updated.
 * @param source - source object with the mix of definitions and regular members.
 * @param rules - mixin merge rules
 * @param unshift - when true, merge rules are applied as if the source would be the target.
 */
export function applyMixin( dest : object, definition : object, source : object, rules : MixinMergeRules, unshift = false ) : object {
    forEachOwnProp( source, rules, ( sourceProp, name, rule ) =>{
        // Filter out definitions.
        if( typeof rule === 'string' ){
            assignProperty( definition, name, sourceProp, rule, unshift );
        }
        // Everything else must go to the dest.
        else{
            assignProperty( dest, name, sourceProp, rule, unshift );
        }
    });

    return dest;
}

// Apply mixins merge rules on inheritance
export function applyInheritanceRules( Class : MixableConstructor ){
    const { _mixinRules } = Class;

    if( _mixinRules ){
        const proto = Class.prototype,
            baseProto = getBaseClass( Class ).prototype;

        forEachOwnProp( proto, _mixinRules, ( prop, name, rule ) =>{
            if( typeof rule === 'function' && name in baseProto ){
                proto[ name ] = resolveRule( prop.value, baseProto[ name ], rule );
            }
        });
    }
}

export interface MixableConstructor extends Function {
    _mixinRules? : MixinMergeRules
    _appliedMixins? : Mixin[]
    _definition? : object
}

export function staticMixinRules( this : MixableConstructor, mixinRules : MixinMergeRules ) {
    const Base = getBaseClass( this );

    if( Base._mixinRules ) {
        defaults( mixinRules, Base._mixinRules );
    }

    this._mixinRules = mixinRules;
}

export function getDefinitions( Class : MixableConstructor ){
    // _definition might be inherited from the parent. If it's the case, fix it.
    if( Class._definition === getBaseClass( Class )._definition ){
        Class._definition = {};
    }

    return Class._definition;
}

export function staticMixins( this : MixableConstructor, ...mixins : ( Mixin | Mixin[] )[] ){
    const proto      = this.prototype,
          _mixinRules = this._mixinRules || {},
          _appliedMixins = this._appliedMixins = ( this._appliedMixins || [] ).slice(),
          definition = getDefinitions( this );

    // Apply mixins in sequence...
    for( let mixin of mixins ) {
        // Mixins array should be flattened.
        if( mixin instanceof Array ) {
            staticMixins.apply( this, mixin );
        }
        // Don't apply mixins twice.
        else if( _appliedMixins.indexOf( mixin ) < 0 ){
            _appliedMixins.push( mixin );

            // For constructors, merge _both_ static and prototype members.
            if( typeof mixin === 'function' ){
                // Statics are merged by simple substitution.
                // TODO: must check for definitions in rules.
                defaults( this, mixin );

                // Prototypes are merged according with rules.
                applyMixin( proto, definition, mixin.prototype, _mixinRules );
            }
            // Handle plain object mixins.
            else {
                applyMixin( proto, definition, mixin, _mixinRules );
            }
        }
    }

    return this;
}

// Pre-defined mixin merge rules
export const mixinMergeRules = {
    // Recursively merge members
    merge : {},

    // Execute methods in pipe, with the class method executed last.
    pipe< A, B, C >( a: ( x : B ) => C, b : ( x : A ) => B ) : ( x : A ) => C {
        return function( x : A ) : C {
            return a.call( this, b.call( this, x ) );
        }
    },

    // Assume methods return an object, and merge results with defaults (class method executed first)
    defaults( a : Function, b : Function ) : Function {
        return function() : Object {
            return defaults( a.apply( this, arguments ), b.apply( this, arguments ) );
        }
    },

    // Execute methods in sequence staring with the class method.
    bottomFirst( a : Function, b : Function ){
        return function() : void {
            a.apply( this, arguments );
            b.apply( this, arguments );
        }
    },

    // Execute methods in sequence ending with the class method.
    topFirst( a : Function, b : Function ){
        return function() : void {
            b.apply( this, arguments );
            a.apply( this, arguments );
        }
    },

    // Execute methods in sequence returning the first falsy result.
    every( a : Function, b : Function ){
        return function() {
            return a.apply( this, arguments ) && b.apply( this, arguments );
        }
    },

    // Execute methods in sequence returning the first truthy result.
    some( a : Function, b : Function ){
        return function() {
            return a.apply( this, arguments ) || b.apply( this, arguments );
        }
    }
};

/**
 * Helpers
 */

type PropertyIteratee = ( prop : PropertyDescriptor, name : string, rule : MixinMergeRule ) => void;

function forEachOwnProp( obj : object, rules : MixinMergeRules, fun : PropertyIteratee ){
    for( let name of Object.keys( obj ) ) {
        if( name !== 'constructor' ){
            fun( Object.getOwnPropertyDescriptor( obj, name ), name, rules[ name ] );
        }
    }

    return obj;
}

function assignProperty( dest, name, sourceProp, rule, unshift ){
    // Destination prop is defined, thus the merge rules must be applied.
    if( dest.hasOwnProperty( name ) ){
        let first, last;
        
        if( unshift ){
            first = dest[ name ];
            last = sourceProp.value;
        }
        else{
            last = dest[ name ];
            first = sourceProp.value;
        }

        dest[ name ] = resolveRule( first, last, rule );
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
    if( rule === void 0 || source === void 0 || rule === 'assign' ) return dest;

    // In other cases we must merge values.
    return rule === 'merge' ? defaults( {}, dest, source ) : rule( dest, source );
}