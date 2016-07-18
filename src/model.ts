import { Record, RecordDefinition, AttributeDescriptorMap } from './record/transaction.ts'
import { assign, defaults, omit, Class, ClassDefinition, getBaseClass } from './objectplus/index.ts'
import { compile, AttributesSpec } from './record/define.ts'
import { ChainableAttributeSpec } from './record/typespec.ts'

import { TransactionalType } from './record/nestedTypes.ts'
import './record/basicTypes.ts'

import { Collection } from './collection/index.ts'

Record.define = function( protoProps : RecordDefinition, staticProps ){
    const BaseConstructor : typeof Record = getBaseClass( this ),
          baseProto : Record = BaseConstructor.prototype;

    if( protoProps ) {
        // Compile attributes spec, creating definition mixin.
        const definition = compile( getAttributes( protoProps ), <AttributesSpec> baseProto._attributes );

        // Explicit 'properties' declaration overrides auto-generated attribute properties.
        if( protoProps.properties === false ){
            definition.properties = {};
        }

        assign( definition.properties, protoProps.properties || {} );

        // Merge in definition.
        defaults( definition, omit( protoProps, 'attributes', 'collection' ) );            
        Class.define.call( this, definition, staticProps );
        defineCollection.call( this, protoProps && protoProps.collection );
    }

    return this;
}

Record.predefine = function(){
    Class.predefine.call( this );

    this.Collection = getBaseClass( this ).Collection.extend();
    this.Collection.prototype.model = this;

    return this;
}

Collection._attribute = Record._attribute = TransactionalType;
Record.Collection = <any>Collection;

function getAttributes({ defaults, attributes } : RecordDefinition ) : AttributeDescriptorMap {
    return typeof defaults === 'function' ? (<any>defaults)() : attributes || defaults;
}

export { Record, ChainableAttributeSpec }

function defineCollection( collection : {} ){
    const BaseCollection : typeof Collection = getBaseClass( this ).Collection;

    let CollectionConstructor : typeof Collection;

    // If collection constructor is specified, just take it. 
    if( typeof collection === 'function' ) {
        CollectionConstructor = <typeof Collection> collection;
    } 
    // Same when Collection is specified as static class member.  
    else if( this.Collection !== BaseCollection ){
        CollectionConstructor = this.Collection;
        if( collection ) (<any>CollectionConstructor).mixins( collection );
    } 
    // Otherwise we need to create new Collection type...
    else{
        // ...which must extend Collection of our base Record.
        CollectionConstructor = <any> BaseCollection.extend( collection );
    }

    // Link collection with the record
    CollectionConstructor.prototype.model = this;
    this.Collection = CollectionConstructor;
}