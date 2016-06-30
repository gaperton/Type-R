import { Record, RecordDefinition } from './transaction.ts'
import { assign, defaults, omit } from '../tools.ts'
import { Class, ClassDefinition, Extendable } from '../class.ts'
import { compile, AttributesSpec } from './define.ts'

import { TransactionalType } from './nestedTypes.ts'

export interface RecordConstructor extends Extendable {
    new ( attrs? : {}, options? : {} ) : Record;
    define( spec? : RecordDefinition, statics? : {} )
}

Record.define = function( protoProps : RecordDefinition, staticProps ){
    const baseProto : Record = Object.getPrototypeOf( this.prototype ),
            BaseConstructor = < typeof Record >baseProto.constructor;

    if( protoProps ) {
        // Compile attributes spec, creating definition mixin.
        const definition = compile( protoProps.attributes, <AttributesSpec> baseProto._attributes );

        // Explicit 'properties' declaration overrides auto-generated attribute properties.
        assign( definition.properties, protoProps.properties || {} );

        // Merge in definition.
        defaults( definition, omit( protoProps, 'attributes', 'collection' ) );            
        Class.define.call( this, definition, staticProps );
    }

    return this;
}

Record._attribute = TransactionalType


export { Record }