// Dummy polyfill to prevent exception in IE.
if( typeof Symbol === 'undefined' ){
    Object.defineProperty( window, 'Symbol', { value : { iterator : 'Symbol.iterator' }, configurable : true  });
}

import { Events, Mixable as Class } from './object-plus/';
// Define synonims for NestedTypes backward compatibility.
import { Record as Model } from './record';

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