import { Record, RecordDefinition, AttributeDescriptorMap } from './transaction'
import { Mixable, tools, predefine, define } from '../object-plus'
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

    @predefine class DefaultCollection extends BaseClass.Collection {
        static model = Class;
    }

    this.DefaultCollection = DefaultCollection;

    // If there are no collection defined in statics, use the default collection.
    // It will appear in onDefine's definition, overriding all other settings.
    if( Class.Collection === BaseClass.Collection ){
        this.Collection = DefaultCollection;
    }

    // Create Class.shared modifier
    createSharedTypeSpec( this, SharedType );
}

Record.onDefine = function( definition : RecordDefinition, BaseClass : typeof Record ){
    const baseProto : Record = BaseClass.prototype;

    // Compile attributes spec, creating definition mixin.
    const { properties, ...dynamicMixin } = compile( this.attributes = getAttributes( definition ), <AttributesSpec> baseProto._attributes );
    assign( this.prototype, dynamicMixin );
    definition.properties = defaults( definition.properties || {}, properties );
    
    tools.assignToClassProto( this, definition, 'idAttribute' );
    
    Transactional.onDefine.call( this, definition, BaseClass );

    // Finalize the definition of the default collection.
    this.DefaultCollection.define( definition.collection || {} );

    // assign collection from the definition.
    this.Collection = definition.Collection;
    this.Collection.prototype.model = this;
}

Record._attribute = AggregatedType;
createSharedTypeSpec( Record, SharedType );

function getAttributes({ defaults, attributes, idAttribute } : RecordDefinition ) : AttributeDescriptorMap {
    const definition = attributes || defaults || {};
    
    // If there is an undeclared idAttribute, add its definition as untyped generic attribute.
    if( idAttribute && !( idAttribute in definition ) ){
        definition[ idAttribute ] = void 0;
    }

    return definition;
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