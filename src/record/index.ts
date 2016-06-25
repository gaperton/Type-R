import { Record } from './transaction'
import { assign, defaults, omit } from '../tools'
import { Class, ClassDefinition, Extendable } from '../class'
import { compile, AttributeDefinitions, AttrSpecs } from './define'

import { TransactionalType } from './nestedTypes'

export interface RecordDefinition extends ClassDefinition {
    attributes? : AttributeDefinitions
}

export interface RecordConstructor extends Extendable {
    new ( attrs? : {}, options? : {} ) : Record;
    define( spec? : RecordDefinition, statics? : {} )
}

Record.define = function( protoProps : RecordDefinition, staticProps ){
    const baseProto : Record = Object.getPrototypeOf( this.prototype ),
            BaseConstructor = < typeof Record >baseProto.constructor;

    if( protoProps ) {
        // Compile attributes spec, creating definition mixin.
        const definition = compile( protoProps.attributes, <AttrSpecs> baseProto._attributes );

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