import { Attribute } from './attribute.ts'
import { RecordConstructor } from '../types.ts'

class RecordType extends Attribute {
    type : RecordConstructor;

    canBeUpdated( prev, next ) : boolean {
        return prev && next && !( next instanceof this.type );
    }

    convert( value, options, record ){
        return value && !( value instanceof this.type ) ? this.type.create( value, options, record ) : value;
    }

    create(){
        return new this.type();
    }

    handleChange( next, prev, record ){
        // Remove reference to self
        if( prev && prev._owner === record ){
            prev._onwerKey = prev._owner = null;
        } 

        // Take ownership if possible
        if( next && !next._owner ){
            next._owner = record;
            next._ownerKey = this.name;
        }
    }
}