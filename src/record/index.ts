import { Record, RecordDefinition, AttributeDescriptorMap } from './transaction.ts'
import { assign, defaults, omit, Class, ClassDefinition } from '../objectplus/index.ts'
import { compile, AttributesSpec } from './define.ts'

import { TransactionalType } from './nestedTypes.ts'
import './basicTypes.ts'

Record.define = function( protoProps : RecordDefinition, staticProps ){
    const baseProto : Record = Object.getPrototypeOf( this.prototype ),
            BaseConstructor = < typeof Record >baseProto.constructor;

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
    }

    return this;
}

Record._attribute = TransactionalType;

function getAttributes({ defaults, attributes } : RecordDefinition ) : AttributeDescriptorMap {
    return typeof defaults === 'function' ? (<any>defaults)() : attributes || defaults;
}

export { Record }