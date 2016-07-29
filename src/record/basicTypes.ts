import { GenericAttribute } from './attribute'
import { tools } from '../object-plus'

const { parseDate } = tools;  

// Default attribute type for all constructor functions...
/** @private */
class ConstructorType extends GenericAttribute {
    type : new ( value : any ) => {}

    convert( value ) {
        return value == null || value instanceof this.type ? value : new this.type( value );
    }

    clone( value, options ) {
        // delegate to clone function or deep clone through serialization
        return value.clone ? value.clone( value, options ) : this.convert( JSON.parse( JSON.stringify( value ) ) );
    }
}

Function.prototype._attribute = ConstructorType;

const DateProto = Date.prototype;

// Date Attribute
/** @private */
class DateType extends GenericAttribute {
    convert( value ) {
        return typeof value === 'string' ? new Date( parseDate( value ) ) : (
            value == null || value instanceof Date ? value : new Date( value )
        );
    }

    validate( model, value, name ) {
        if( isNaN( +value ) ) return name + ' is Invalid Date';
    }

    toJSON( value ) { return value && value.toJSON(); }

    isChanged( a, b ) { return ( a && +a ) !== ( b && +b ); }

    clone( value ) { return value && new Date( +value ); }
}

Date._attribute = DateType;

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

    validate( model, value, name ) {
        // Whatever is not symmetrically serializable to JSON, is not valid by default.
        if( !isFinite( value ) ) {
            return name + ' is not valid number';
        }
    }
}

Number._attribute = NumericType;

// Add global Integer data type
declare global {
    interface Window {
        Integer : Function
    }
}

if( window ){
    window.Integer = function( x ){ return x ? Math.round( x ) : 0; }
    window.Integer._attribute = NumericType;
}

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