/***********************
 * Mixins helpers
 */

import { assign, transform, defaults, getBaseClass } from './tools'

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

    constructor( public Class : Function ){
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
            if( mixin instanceof Array ) {
                this.merge.apply( this, mixin );
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
        for( let name of Object.keys( dest ) ) {
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

// Pre-defined mixin merge rules
export const MergeRules = {
    // Recursively merge members
    merge( a : object, b : object ){
        return defaults( {}, a, b );
    },

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
    classFirst( a : Function, b : Function ){
        return function() : void {
            a.apply( this, arguments );
            b.apply( this, arguments );
        }
    },

    // Execute methods in sequence ending with the class method.
    classLast( a : Function, b : Function ){
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

function assignProperty( dest, name, sourceProp, rule ){
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