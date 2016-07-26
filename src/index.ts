/**
 * Main module
 */

import * as tools from './objectplus/index.ts'
import { ChainableAttributeSpec } from './record/index.ts'
import { Record as Model } from './record/index.ts' 

import { Events } from './objectplus/events.ts'
export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = Events;

import { Collection } from './collection/index.ts'

export * from './objectplus/mixins.ts'
export * from './objectplus/events.ts'

import { Mixable as Class } from './objectplus/mixins.ts'

export { Store } from './relations/index.ts'

export {
    tools,
    Model,
    Collection,
    Class,
    transaction,
    value
}; 

function value( x ){
    return new ChainableAttributeSpec({ value : x });
}

function transaction( method ){
    return function( ...args ){
        let result;
        
        this.transaction( () => {
            result = method.apply( this, args );
        });
        
        return result;
    }
}