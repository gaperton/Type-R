/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */

import { assign } from './class+'

class TypeSpec {
    constructor( options = {} ){
        this.options = options;
    }

    get has(){ return this; }

    get isRequired(){
        this.options.isRequired = true;
        return this;
    }

    value( x ){ this.options.value = x; }

    create(){ return this.options; }
}

Function.prototype.value = function( x ){
    return new TypeSpec({ type : this, value : x });
};

Function.prototype.isRequired = function( x ){
    return new TypeSpec({ type : this, isRequired: true });
};

Object.defineProperty( Function.prototype, 'has', {
    get : function(){
        // workaround for sinon.js and other libraries overriding 'has'
        return this._has || new TypeSpec({ type : this });
    },
    set : function( value ){ this._has = value; }
} );

export function createSpec( spec, name ){
    let options = {};

    if( spec && spec instanceof TypeSpec ){
        options = spec.create();
    }
    else if( typeof spec === 'function' ){
        options.type = spec;
    }
    else{
        options.type = inferType( spec );
        options.value = spec;
    }

    options.name = name;
    return options;
}

function inferType( value ){
    switch( typeof value ){
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