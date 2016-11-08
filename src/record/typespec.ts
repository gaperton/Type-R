/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */
import { Transactional } from '../transactions'
import { ChangeAttrHandler, AttributeDescriptor } from './attributes'
import { Record } from './transaction'
import { EventMap, EventsDefinition, Constructor, tools } from '../object-plus'

const { assign } = tools;

export interface AttributeCheck {
    ( value : any, key : string ) : boolean
    error? : any
}

export class ChainableAttributeSpec {
    options : AttributeDescriptor;

    constructor( options : AttributeDescriptor = {} ) {
        this.options = assign( {}, options );

        const { getHooks = [], transforms = [], changeHandlers = [] } = options;
        this.options.getHooks = getHooks.slice();
        this.options.transforms = transforms.slice();
        this.options.changeHandlers = changeHandlers.slice();
    }

    check( check : AttributeCheck, error : any ) : this {
        function validate( model, value, name ){
            if( !check.call( model, value, name ) ){
                const msg = error || check.error || name + ' is not valid';
                return typeof msg === 'function' ? msg.call( model, name ) : msg;
            }
        }

        const prev = this.options.validate;

        this.options.validate = prev ? (
            function( model, value, name ){
                return prev( model, value, name ) || validate( model, value, name );
            }
        ) : validate;

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
        this.options.toJSON = fun || null;
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
                var changed = fun.call( model, next, this.name );
                return changed === void 0 ? prev : this.convert( changed, options, prev, model );
            }

            return prev;
        } );

        return this;
    }

    changeEvents( events : boolean ){
        this.options.changeEvents = events;

        return this;
    }

    // Subsribe to events from an attribute.
    events( map : EventsDefinition ) : this {
        const eventMap = new EventMap( map );

        this.options.changeHandlers.push( function( next, prev, record : Record ){
                prev && prev.trigger && eventMap.unsubscribe( record, prev );

                next && next.trigger && eventMap.subscribe( record, next );
            });

        return this;
    }

    // Creates a copy of the spec.
    get has() : ChainableAttributeSpec {
        return new ChainableAttributeSpec( this.options );
    }

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
    let attrSpec : ChainableAttributeSpec;

    if( typeof spec === 'function' ) {
        attrSpec = new ChainableAttributeSpec({ type : spec, value : spec._attribute.defaultValue });
    }
    else if( spec && spec instanceof ChainableAttributeSpec ) {
        attrSpec = spec;
    }
    else{
        // Infer type from value.
        const type = inferType( spec );

        // Transactional types inferred from values must have shared type. 
        if( type && type.prototype instanceof Transactional ){
            attrSpec = (<any>type).shared.value( spec );
        }
        // All others will be created in regular way.
        else{
            attrSpec = new ChainableAttributeSpec({ type : type, value : spec });
        }
    }
 
    return attrSpec.options;
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
            return value ? <any> value.constructor : void 0;
    }
}
