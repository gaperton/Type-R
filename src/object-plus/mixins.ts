/***********************
 * Mixins helpers
 */

import { assign, defaults, getBaseClass } from './tools'

// Mixin rule is the reducer function which is applied to the mixins chain starting from the class prototype. 
export type MixinMergeRule = ( a : any, b : any ) => any;

export interface MixinMergeRules {
    [ propertyName : string ] : MixinMergeRules | MixinMergeRule
}

/** @hidden */
export function mergeObjects( dest : object, source : object, rules : MixinMergeRules = {}) : object {
    for( let name of Object.keys( source ) ) {
        if( name !== 'constructor' ){
            const sourceProp = Object.getOwnPropertyDescriptor( source, name ),
                destProp   = Object.getOwnPropertyDescriptor( dest, name ),
                destValue = destProp && destProp.value;

            if( destValue == null ) {
                // Just copy the prop over if the destination prop is not defined.
                Object.defineProperty( dest, name, sourceProp );
            }
            else {
                // Destination prop is defined, thus merge rules must be applied.
                const rule  = rules[ name ];

                // Proceed with merge only if there is the rule for the prop defined.
                if( rule ) {
                    dest[ name ] = mergeProp( destValue, sourceProp.value, rule );
                }
            }
        }
    }

    return dest;
}

export function mergeProp( destVal, sourceVal, rule : MixinMergeRule | MixinMergeRules ){
    if( typeof rule === 'function' ){
        return rule( destVal, sourceVal ); 
    }
    else{
        return mergeObjects( assign( {}, destVal ), sourceVal, rule );
    }
}

export type Constructor<T extends object> = {
    new ( ...args : any[] ) : T
    prototype : T
}

export type Mixin = object | Constructor< any >

export interface MixableConstrictor<T extends object> extends Constructor<T>{
    _mixinRules? : MixinMergeRules
    _appliedMixins? : Mixin[]
}

/** @decorator `@mixinRules({ ... })`. Has the same effect as [[Mixable.mixinRules]]. Can be used with any ES6 class.
 *  See [[MixinRules]] for rules specification.
 */
export function mixinRules( rules : MixinMergeRules ) {
    return function<T extends object>( Class : Constructor<T>){
        defineMixinRules.call( Class, rules );
    }
}

/** @decorator `@mixins( A, B, C... )`.
 * Has the same effect as [[Mixable.mixins]]. Can be used with any ES6 class.
 */
export function mixins( ...list : {}[] ) {
    return function<T extends object>( Class : Constructor<T>){
        applyMixins.apply( Class, list );
    }
}

export function defineMixinRules<T extends object, X extends MixableConstrictor< T >>( this : X, mixinRules : MixinMergeRules ) : X {
    const Base = Object.getPrototypeOf( this.prototype ).constructor;

    if( Base._mixinRules ) {
        mergeObjects( mixinRules, Base._mixinRules );
    }

    this._mixinRules = mixinRules;
    return this;
}

// Apply mixins merge rules on inheritance
export function applyInheritance<T extends object, X extends MixableConstrictor< T >>( this : X ){
    const { _mixinRules } = this;

    if( _mixinRules ){
        const proto = this.prototype,
            baseProto = getBaseClass( this ).prototype;

        for( let name of Object.keys( proto ) ){
            if( name !== 'constructor' && _mixinRules.hasOwnProperty( name ) && name in baseProto ){
                proto[ name ] = mergeProp( proto[ name ], baseProto[ name ], _mixinRules[ name ] );
            }
        }
    }
}

export function applyMixins<T extends object, X extends MixableConstrictor< T >>( this : X, ...mixins : ( Mixin | Mixin[] )[] ) : X {
    const proto      = this.prototype,
            mergeRules : MixinMergeRules = this._mixinRules || {},
            _appliedMixins = this._appliedMixins = ( this._appliedMixins || [] ).slice();

    // Apply mixins in sequence...
    for( let mixin of mixins ) {
        // Mixins array should be flattened.
        if( mixin instanceof Array ) {
            return applyMixins.apply( this, mixin );
        }

        // Don't apply mixins twice.
        if( _appliedMixins.indexOf( mixin ) < 0 ){
            _appliedMixins.push( mixin );

            // For constructors, merge _both_ static and prototype members.
            if( typeof mixin === 'function' ){
                // Statics are merged by simple substitution.
                defaults( this, mixin );

                // Prototypes are merged according with a rules.
                mergeObjects( proto, (<Constructor<any>>mixin).prototype, mergeRules );
            }
            // Handle plain object mixins.
            else {
                mergeObjects( proto, mixin, mergeRules );
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
