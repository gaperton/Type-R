/**
 * Main module
 */

import * as tools from './object-plus'
import { ChainableAttributeSpec } from './record'
import { Record as Model } from './record' 

import { Events } from './object-plus/events'
export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = Events;

import { Collection } from './collection'

export * from './object-plus/mixins'
export * from './object-plus/events'

import { Mixable as Class } from './object-plus/mixins'

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