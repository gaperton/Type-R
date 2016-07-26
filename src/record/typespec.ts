/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */

import { ChangeAttrHandler, AttributeDescriptor } from './attribute.ts'
import { Record } from './transaction.ts'
import { assign, EventMap, EventsDefinition, Constructor } from '../objectplus/index.ts'

export class ChainableAttributeSpec {
    options : AttributeDescriptor;

    constructor( options : AttributeDescriptor = {} ) {
        this.options = { getHooks : [], transforms : [], changeHandlers : []};
        assign( this.options, options );
    }

    triggerWhenChanged( events ) : this {
        // TODO: not clear
        return this;
    }

    watcher( ref : string | ( ( value : any, key : string ) => void ) ) : this {
        this.options._onChange = ref;
        return this;
    }

    parse( fun ) : this {
        this.options.parse = fun;
        return this;
    }

    toJSON( fun ) : this{
        this.options.toJSON = fun;
        return this;
    }

    // Attribute get hook.
    get( fun ) : this {
        this.options.getHooks.push( fun );

        return this;
    }

    // Attribute set hook.
    set( fun ) : this {
        this.options.transforms.push( function( next, options, prev, model ) {
            if( this.isChanged( next, prev ) ) {
                var changed = fun.call( model, next, name );
                return changed === void 0 ? prev : changed;
            }

            return prev;
        } );

        return this;
    }

    // Subsribe to events from an attribute.
    events( map : EventsDefinition ) : this {
        const eventMap = new EventMap( map );

        this.options.changeHandlers.push( function( next, prev, record : Record ){
                prev && eventMap.unsubscribe( record, prev );

                next && eventMap.subscribe( record, next );
            });

        return this;
    }

    get has() : this { return this; }

    /*
    get isRequired() {
        this.options.isRequired = true;
        return this;
    }*/

    value( x ) : this {
        this.options.value = x;
        return this;
    }
}

declare global {
    interface Function{
        value : ( x : any ) => ChainableAttributeSpec;
        isRequired : ChainableAttributeSpec;
        has : ChainableAttributeSpec;
    }
}

Function.prototype.value = function( x ) {
    return new ChainableAttributeSpec( { type : this, value : x } );
};

/*
Object.defineProperty( Function.prototype, 'isRequired', {
    get() {
        return new ChainableAttributeSpec( { type : this, isRequired : true } );
    } 
});*/

Object.defineProperty( Function.prototype, 'has', {
    get() {
        // workaround for sinon.js and other libraries overriding 'has'
        return this._has || new ChainableAttributeSpec( { type : this } );
    },

    set( value ) { this._has = value; }
} );

export function toAttributeDescriptor( spec : any ) : AttributeDescriptor {
    if( typeof spec === 'function' ) {
        return { type : <any> spec };
    }

    if( spec && spec instanceof ChainableAttributeSpec ) {
        return spec.options;
    }
 
    return {
        type : inferType( spec ),
        value : spec
    }
}

function inferType( value : {} ) : Constructor<any> {
    switch( typeof value ) {
        case 'number' :
            return Number;
        case 'string' :
            return String;
        case 'boolean' :
            return Boolean;
        case 'undefined' :
            return void 0;
        case 'object' :
            return value ? <any> value.constructor : Object;
    }
}
