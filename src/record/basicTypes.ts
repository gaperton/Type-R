import { Attribute } from './attribute'
import { parseDate } from '../tools'

class ConstructorType extends Attribute {
    type : new ( value : any ) => {}

    convert( value ) {
        return value == null || value instanceof this.type ? value : new this.type( value );
    }

    clone( value, options ) {
        // delegate to clone function or deep clone through serialization
        return value.clone ? value.clone( value, options ) : this.convert( JSON.parse( JSON.stringify( value ) ) );
    }
}

interface Function{
    _attribute? : FunctionConstructor
}

Function.prototype[ '_attribute' ] = ConstructorType;

// Date Attribute
// ----------------------
class DateType extends Attribute {
    convert( value ) {
        return value == null || value instanceof Date ? value :
               new Date( typeof value === 'string' ? parseDate( value ) : value );
    }

    validate( model, value, name ) {
        if( isNaN( +value ) ) return name + ' is Invalid Date';
    }

    toJSON( value ) { return value && value.toJSON(); }

    isChanged( a, b ) { return ( a && +a ) !== ( b && +b ); }

    clone( value ) { return value && new Date( +value ); }
}

Date[ '_attribute' ] = DateType;

// Primitive Types
// ----------------
// Global Mock for missing Integer data type...
// -------------------------------------
declare var Integer : any;
Integer = function( x ) { return x ? Math.round( x ) : 0; };

class PrimitiveType extends Attribute {
    create() { return this.type(); }

    toJSON( value ) { return value; }

    convert( value ) { return value == null ? value : this.type( value ); }

    isChanged( a, b ) { return a !== b; }

    clone( value ) { return value; }
}

Boolean[ '_attribute' ] = String[ '_attribute' ] = PrimitiveType;

class NumericType extends PrimitiveType {
    validate( model, value, name ) {
        if( !isFinite( value ) ) {
            return name + ' is invalid number';
        }
    }
}

Integer[ '_attribute' ] = Number[ '_attribute' ] = NumericType;

// Array Type
// ---------------
class ArrayType extends Attribute {
    toJSON( value ) { return value; }

    convert( value ) {
        // Fix incompatible constructor behaviour of Array...
        if( value == null || value instanceof Array ) return value;

        // todo: log an error.
        return [];
    }
}

Array[ '_attribute' ] = ArrayType;

