import { GenericAttribute } from './generic'
import { tools } from '../../object-plus'

// Default attribute type for all constructor functions...
/** @private */
class ConstructorType extends GenericAttribute {
    type : new ( value : any ) => {}

    convert( value ) {
        return value == null || value instanceof this.type ? value : new this.type( value );
    }

    clone( value ) {
        // delegate to clone function or deep clone through serialization
        return value.clone ? value.clone() : this.convert( JSON.parse( JSON.stringify( value ) ) );
    }
}

Function.prototype._attribute = ConstructorType;

// Primitive Types.
/** @private */
export class PrimitiveType extends GenericAttribute {
    type : NumberConstructor | StringConstructor | BooleanConstructor

    create() { return this.type(); }

    toJSON( value ) { return value; }

    convert( value ) { return value == null ? value : this.type( value ); }

    isChanged( a, b ) { return a !== b; }

    clone( value ) { return value; }
}

Boolean._attribute = String._attribute = PrimitiveType;

// Number type with special validation algothim.
/** @private */ 
export class NumericType extends PrimitiveType {
    type : NumberConstructor

    convert( value ) {
        const num = value == null ? value : this.type( value );        

        if( num !== num ) logInvalidNumber( this, value, arguments[ 3 ] );
        
        return num;
    }

    validate( model, value, name ) {
        // Whatever is not symmetrically serializable to JSON, is not valid by default.
        if( value != null && !isFinite( value ) ) {
            return name + ' is not valid number';
        }
    }
}

function logInvalidNumber( attribute, value, record ){
    tools.log.warn(`[Invalid Number] in ${ record.constructor.name || 'Model' }.${ attribute.name } attribute.`, value, record );
}

Number._attribute = NumericType;

/**
 * Compatibility wrapper for Array type.
 * @private
 */ 
export class ArrayType extends GenericAttribute {
    toJSON( value ) { return value; }

    convert( value ) {
        // Fix incompatible constructor behaviour of Array...
        if( value == null || Array.isArray( value ) ) return value;

        // todo: log an error.
        return [];
    }
}

Array._attribute = ArrayType;