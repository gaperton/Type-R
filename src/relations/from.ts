import { AnyType, AttributeDescriptor } from '../record'
import { parseReference, CollectionReference } from './commons'
import { Collection } from '../collection'
import { Record } from '../record'

import { ChainableAttributeSpec } from '../record'

/********
 * Reference to model by id.
 * 
 * Untyped attribute. Holds model id, when unresolved. When resolved, is substituted
 * with a real model.
 * 
 * No model changes are detected and counted as owner's change. That's intentional.
 */

class UnresolvedReference {
    constructor( public id : string ){}
}

const UnresolvedRefProto = UnresolvedReference.prototype;

/** @private */
type RecordRefValue = Record | UnresolvedReference;

/** @private */
class RecordRefType extends AnyType {
    // It is always serialized as an id, whenever it's resolved or not. 
    toJSON( value : RecordRefValue ){
        return value && value.id;
    }

    convert( id ){
        return id && typeof id !== 'object' ? new UnresolvedReference( id ) : id;
    }

    // Do not clone it.
    clone( value : RecordRefValue ){
        return value;
    }

    // Model refs by id are equal when their ids are equal.
    isChanged( a : RecordRefValue, b : RecordRefValue){
        return ( a && a.id ) !== ( b && b.id );
    }

    // Refs are always valid.
    validate( model, value, name ){}
}

Record.from = function from( masterCollection : CollectionReference ) : ChainableAttributeSpec {
    const getMasterCollection = parseReference( masterCollection );

    const typeSpec = new ChainableAttributeSpec({
        value : null,
        _attribute : RecordRefType
    });
    
    return typeSpec
        .get( function( objOrId : RecordRefValue, name : string ) : Record {
            if( objOrId && Object.getPrototypeOf( objOrId ) === UnresolvedRefProto ){
                // So, we're dealing with an id reference. Get the master collection.
                const collection = getMasterCollection( this );
                let   record : Record = null;

                // If master collection exists and is not empty, resolve the reference.
                if( collection && collection.length ){
                    // Silently update attribute with record from this collection.
                    record = collection.get( objOrId ) || null;
                    this.attributes[ name ] = record;

                    // Subscribe for events manually. delegateEvents won't be invoked.
                    record && this._attributes[ name ].handleChange( record, null, this );

                    return record;
                }
            }

            return <Record>objOrId;
        });
};