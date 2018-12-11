// Dummy polyfill to prevent exception in IE.
if( typeof Symbol === 'undefined' ){
    Object.defineProperty( window, 'Symbol', { value : { iterator : 'Symbol.iterator' }, configurable : true  });
}

import { define, Events, Mixable as Class, MixableConstructor } from './object-plus/';
// Define synonims for NestedTypes backward compatibility.
import { ChainableAttributeSpec, Record as Model, type } from './record';

/**
 * Export everything 
 */
export * from './collection';
export * from './io-tools';
export * from './object-plus';
export * from './record';
export * from './relations';
export * from './transactions';
export { Model, Class };


export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = <any>Events;

export interface RecordConstructor<A> extends MixableConstructor {
    new ( attrs? : Partial<A>, options? : object ) : Model & A
    prototype : Model
}

export type AttrTypes<A> = { [key in keyof A]: A[key] extends ( ...args ) => any ? ReturnType<A[key]> : InstanceType<A[key] extends new ( ...args ) => any ? A[key] : A[key] extends ChainableAttributeSpec<any> ? A[key]['options']['type'] : new () => A[key] >};


export function attributes<D>( attrDefs : D ) : RecordConstructor<AttrTypes<D>> {
    @define class DefaultRecord extends Model {
        static attributes = attrDefs;
    }

    return DefaultRecord as any;
}

<<<<<<< HEAD
/** Typeless attribute declaration with default value. */ 
export function value( x : any ) : ChainableAttributeSpec<any> {
    return new ChainableAttributeSpec({ value : x });
}

=======
>>>>>>> develop
/** Wrap model or collection method in transaction. */
export function transaction< F extends Function >( method : F ) : F {
    return <any>function( ...args ){
        let result;
        
        this.transaction( () => {
            result = method.apply( this, args );
        });
        
        return result;
    }
}