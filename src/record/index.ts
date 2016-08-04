import { Record, RecordDefinition, AttributeDescriptorMap } from './transaction'
import { Mixable, ClassDefinition, tools } from '../object-plus'
import { compile, AttributesSpec } from './define'
import { ChainableAttributeSpec } from './typespec'

import { TransactionalType, MSDateType, TimestampType, NumericType } from './attributes'

export * from './attributes'
export { Record, ChainableAttributeSpec }

const { assign, defaults, omit, getBaseClass } = tools;

Record.define = function( protoProps : RecordDefinition = {}, staticProps ){
    const BaseConstructor : typeof Record = getBaseClass( this ),
          baseProto : Record = BaseConstructor.prototype,
          // Extract record definition from static members, if any.
          staticsDefinition : RecordDefinition = tools.getChangedStatics( this, 'attributes', 'collection', 'Collection' ),
          // Definition can be made either through statics or define argument.
          // Merge them together, so we won't care about it below. 
          definition = assign( staticsDefinition, protoProps );

    if( 'Collection' in definition && definition.Collection === void 0 ){
        tools.log.error( `[Model.define] Model.Collection is undefined. It must be defined _before_ the model.`, definition );
    }

    // Compile attributes spec, creating definition mixin.
    const dynamicMixin = compile( getAttributes( definition ), <AttributesSpec> baseProto._attributes );

    // Explicit 'properties' declaration overrides auto-generated attribute properties.
    if( definition.properties === false ){
        dynamicMixin.properties = {};
    }

    assign( dynamicMixin.properties, protoProps.properties || {} );

    // Merge in definition.
    defaults( dynamicMixin, omit( definition, 'attributes', 'collection' ) );            
    Mixable.define.call( this, dynamicMixin, staticProps );
    defineCollection.call( this, definition.collection || definition.Collection );

    return this;
}

Record.predefine = function(){
    Mixable.predefine.call( this );

    this.Collection = getBaseClass( this ).Collection.extend();
    this.Collection.prototype.model = this;

    return this;
}

Record._attribute = TransactionalType;

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