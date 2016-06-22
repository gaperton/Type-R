import { Attribute } from './attribute'

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

Function.prototype._attribute = ConstructorType;

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

Date._attribute = DateType;

// Primitive Types
// ----------------
// Global Mock for missing Integer data type...
// -------------------------------------
Integer = function( x ) { return x ? Math.round( x ) : 0; };

class PrimitiveType extends Attribute {
    create() { return this.type(); }

    toJSON( value ) { return value; }

    convert( value ) { return value == null ? value : this.type( value ); }

    isChanged( a, b ) { return a !== b; }

    clone( value ) { return value; }
}

Boolean._attribute = String._attribute = PrimitiveType;

class NumericType extends PrimitiveType {
    validate( model, value, name ) {
        if( !isFinite( value ) ) {
            return name + ' is invalid number';
        }
    }
}

Integer._attribute = Number._attribute = NumericType;

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

Array._attribute = ArrayType;

var numericKeys    = [ 1, 4, 5, 6, 7, 10, 11 ],
    msDatePattern  = /\/Date\(([0-9]+)\)\//,
    isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

function parseDate( date ) {
    var msDate, timestamp, struct, minutesOffset = 0;

    if( msDate = msDatePattern.exec( date ) ) {
        timestamp = Number( msDate[ 1 ] );
    }
    else if( ( struct = isoDatePattern.exec( date )) ) {
        // avoid NaN timestamps caused by undefined values being passed to Date.UTC
        for( var i = 0, k; ( k = numericKeys[ i ] ); ++i ) {
            struct[ k ] = +struct[ k ] || 0;
        }

        // allow undefined days and months
        struct[ 2 ] = (+struct[ 2 ] || 1) - 1;
        struct[ 3 ] = +struct[ 3 ] || 1;

        if( struct[ 8 ] !== 'Z' && struct[ 9 ] !== undefined ) {
            minutesOffset = struct[ 10 ] * 60 + struct[ 11 ];

            if( struct[ 9 ] === '+' ) {
                minutesOffset = 0 - minutesOffset;
            }
        }

        timestamp =
            Date.UTC( struct[ 1 ], struct[ 2 ], struct[ 3 ], struct[ 4 ], struct[ 5 ] + minutesOffset, struct[ 6 ],
                      struct[ 7 ] );
    }
    else {
        timestamp = Date.parse( date );
    }

    return timestamp;
}
