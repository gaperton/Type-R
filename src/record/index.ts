import { Record, RecordDefinition, AttributeDescriptorMap } from './transaction'
import { Mixable, ClassDefinition, tools } from '../object-plus'
import { compile, AttributesSpec } from './define'
import { ChainableAttributeSpec } from './typespec'

import { TransactionalType } from './nestedTypes'
import './basicTypes'

export * from './attribute'
export { Record, ChainableAttributeSpec, TransactionalType }

const { assign, defaults, omit, getBaseClass } = tools;

Record.define = function( protoProps : RecordDefinition = {}, staticProps ){
    const BaseConstructor : typeof Record = getBaseClass( this ),
          baseProto : Record = BaseConstructor.prototype,
          // Extract record definition from static members, if any.
          staticsDefinition : RecordDefinition = tools.getChangedStatics( this, 'attributes', 'collection' ),
          // Definition can be made either through statics or define argument.
          // Merge them together, so we won't care about it below. 
          definition = assign( staticsDefinition, protoProps );

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
    defineCollection.call( this, definition.collection );

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
    const BaseCollection = getBaseClass( this ).Collection;

    let CollectionConstructor;

    // If collection constructor is specified, just take it. 
    if( typeof collection === 'function' ) {
        CollectionConstructor = collection;
    } 
    // Same when Collection is specified as static class member.  
    else{
        CollectionConstructor = this.Collection;
        if( collection ) (<any>CollectionConstructor).define( collection );
    }

    // Link collection with the record
    CollectionConstructor.prototype.model = this;
    this.Collection = CollectionConstructor;
}