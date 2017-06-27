import { Record, RecordDefinition, AttributeDescriptorMap } from './transaction'
import { Mixable, tools, define } from '../object-plus'
import { compile, AttributesSpec } from './define'
import { ChainableAttributeSpec } from './typespec'
import { Transactional } from '../transactions'

import { AggregatedType, MSDateType, TimestampType, NumericType, SharedType } from './attributes'

export * from './attributes'
export { Record, ChainableAttributeSpec }

const { assign, defaults, omit, getBaseClass } = tools;

Record.onExtend = function( this : typeof Record, BaseClass : typeof Record ){
    Transactional.onExtend.call( this, BaseClass );

    // Create the default collection
    const Class = this;

    if( Class.Collection === BaseClass.Collection ){
        @define class DefaultCollection extends BaseClass.Collection {
            static model = Class;
        }

        this.Collection = DefaultCollection;
    }

    // Create Class.shared modifier
    createSharedTypeSpec( this, SharedType );
}

Record.onDefine = function( definition : RecordDefinition, BaseClass : typeof Record ){
    const baseProto : Record = BaseClass.prototype;

    // Compile attributes spec, creating definition mixin.
    const dynamicMixin = compile( this.attributes = getAttributes( definition ), <AttributesSpec> baseProto._attributes );

    defaults( definition.properties || ( definition.properties = {} ), dynamicMixin.properties );
    
    Transactional.onDefine.call( this, definition, BaseClass );

    const { Collection } = definition;
        
    if( definition.collection ){
        Collection.mixins.merge([ definition.collection ]);
    }

    defineCollection.call( this, definition.collection || definition.Collection );
}

Record._attribute = AggregatedType;
createSharedTypeSpec( Record, SharedType );

function getAttributes({ defaults, attributes, idAttribute } : RecordDefinition ) : AttributeDescriptorMap {
    const definition = typeof defaults === 'function' ? (<any>defaults)() : attributes || defaults || {};
    
    // If there is an undeclared idAttribute, add its definition as untyped generic attribute.
    if( idAttribute && !( idAttribute in definition ) ){
        definition[ idAttribute ] = void 0;
    }

    return definition;
}

function defineCollection( collection : {} ){
    // If collection constructor is specified, take it as it is. 
    if( typeof collection === 'function' ) {
        this.Collection = collection;
        
        // Link collection with the record
        this.Collection.prototype.model = this;
    } 
    // Otherwise, define implicitly created Collection.
    else{
        this.Collection.define( collection || {} );
    }
}

// Add extended Date attribute types.
declare global {
    interface DateConstructor {
        microsoft
        timestamp
    }
}

Object.defineProperties( Date, {
    microsoft : {
        get(){
            return new ChainableAttributeSpec({
                type : Date,
                _attribute : MSDateType
            })
        }
    },

    timestamp : {
        get(){
            return new ChainableAttributeSpec({
                type : Date,
                _attribute : TimestampType
            })
        }
    }
});

// Add Number.integer attrubute type
declare global {
    interface NumberConstructor {
        integer : Function
    }

    interface Window {
        Integer : Function;
    }
}

Number.integer = function( x ){ return x ? Math.round( x ) : 0; }
Number.integer._attribute = NumericType;

if( typeof window !== 'undefined' ){
    window.Integer = Number.integer;
}

/** @private */
export function createSharedTypeSpec( Constructor, Attribute ){
    Constructor.hasOwnProperty( 'shared' ) ||
        Object.defineProperty( Constructor, 'shared', {
            get(){
                return new ChainableAttributeSpec({
                    value : null,
                    type : Constructor,
                    _attribute : Attribute
                });
            }
        });
}