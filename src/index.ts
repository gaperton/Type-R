/**
 * Main module
 */

import * as tools from './objectplus'
import { ChainableAttributeSpec } from './record'
import { Record as Model } from './record' 

import { Events } from './objectplus/events'
export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = Events;

import { Collection } from './collection'

export * from './objectplus/mixins'
export * from './objectplus/events'

import { Mixable as Class } from './objectplus/mixins'

export { Store } from './relations'

export {
    tools,
    Model,
    Collection,
    Class
}; 

export function value( x ){
    return new ChainableAttributeSpec({ value : x });
}

export function transaction( method ){
    return function( ...args ){
        let result;
        
        this.transaction( () => {
            result = method.apply( this, args );
        });
        
        return result;
    }
}