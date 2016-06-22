/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */

import { Attribute, IAttributeOptions } from './attribute.ts'
import { assign } from '../tools.ts'
import { IRecord, EventsHash } from '../types.ts'

type GetHook = ( value : any, key : string ) => any;
type Transform = ( next : any, options : {}, prev : any, model : IRecord ) => any;
type ChangeHandler = ( next : any, prev : any, model : IRecord ) => void;

type ChangeAttrHandler = ( ( value : any, attr : string ) => void ) | string;

class TypeSpec {
    options : IAttributeOptions;
    
    constructor( options = {} ) {
        this.options = { getHooks : [], transforms : [], changeHandlers : []};
        assign( this.options, options );
    }

    get( fun ) {
        this.options.getHooks.push( fun );
    }

    set( fun ) {
        this.options.transforms.push( function( next, options, prev, model ) {
            if( this.isChanged( next, prev ) ) {
                var changed = fun.call( model, next, name );
                return changed === void 0 ? prev : changed;
            }

            return prev;
        } );
    }

    // Event listeners
    events( map : EventsHash ){
        this.options.changeHandlers.push( function( next, prev, record : IRecord ){
            prev && record.stopListening( prev );

            next && record.listenTo( next, map );
        });
    }

    onChange( handler : ChangeAttrHandler ){
        this.options.onChange = handler;
        // TODO: assemble message map in Record.define, listenTo after Record.initialize
        // Or directly call in Record._notifyOnAttrChange
        /*
            const handler = this._onChange[ name ];
            handler && handler.call( this, value, name )
         */
    }

    get has() { return this; }

    get isRequired() {
        this.options.isRequired = true;
        return this;
    }

    value( x ) { this.options.value = x; }

    createAttribute( name ) {
        const { type } = this.options,
              AttributeCtor = type ? type._attribute : Attribute;

        return new AttributeCtor( name, this.options );
    }
}

interface Function{
    _attribute? : typeof Attribute
    value? : ( x : any ) => TypeSpec
    isRequired? : TypeSpec
}

Function.prototype[ 'value' ] = function( x ) {
    return new TypeSpec( { type : this, value : x } );
};

Function.prototype[ 'isRequired' ] = function( x ) {
    return new TypeSpec( { type : this, isRequired : true } );
};

Object.defineProperty( Function.prototype, 'has', {
    get : function() {
        // workaround for sinon.js and other libraries overriding 'has'
        return this._has || new TypeSpec( { type : this } );
    },
    set : function( value ) { this._has = value; }
} );

export function createAttribute( name, spec ) {
    let typeSpec;

    if( spec && spec instanceof TypeSpec ) {
        typeSpec = spec;
    }
    else if( typeof spec === 'function' ) {
        typeSpec = new TypeSpec({ type : spec });
    }
    else {
        typeSpec = new TypeSpec({
            type : inferType( spec ),
            value : spec
        });
    }

    return typeSpec.createAttribute( name );
}

function inferType( value : any ) : Function {
    switch( typeof value ) {
        case 'number' :
            return Number;
        case 'string' :
            return String;
        case 'boolean' :
            return Boolean;
        case 'object' :
            return value ? value.constructor : Object;
    }
}