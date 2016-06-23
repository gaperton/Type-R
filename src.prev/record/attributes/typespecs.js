/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */

import { assign } from './class+'

class TypeSpec {
    constructor( { getHooks = [], transforms = [], changeHandlers = [], ...options } = {} ) {
        this.options = { getHooks, transforms, changeHandlers, ...options };
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

    // Backbone event listeners
    events( map ){
        this.options.changeHandlers.push( function( next, prev, model ){
            prev && prev.trigger && model.stopListening( prev );

            next && next.trigger && model.listenTo( next, map );
        });
    }

    onChange( fun ){
        this.options.changeHandlers.push( function( next, prev, model ){
            fun.call( model, next, )
            // TODO: problem - can't do changes from here. Need to wait until `commit` phase
            // (?) Introduce 'commit' pipeline?
        });
    }

    get has() { return this; }

    get isRequired() {
        this.options.isRequired = true;
        return this;
    }

    value( x ) { this.options.value = x; }

    createAttribute( name ) {
        return this.type ?
                   new this.type._attribute( name, this.options ) :
                   new Attribute( name, this.options );
    }
}

Function.prototype.value = function( x ) {
    return new TypeSpec( { type : this, value : x } );
};

Function.prototype.isRequired = function( x ) {
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

function inferType( value ) {
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