/**
 * Built-in JSON types attributes: Object, Array, Number, String, Boolean, and immutable class.
 * 
 * Adds type assertions, default validation, and optimized update pipeline.
 */

import { AnyType } from './any'
import { tools } from '../../object-plus'

/**
 * Custom class must be immutable class which implements toJSON() method
 * with a constructor taking json.
 */
class ImmutableClassType extends AnyType {
    type : new ( value : any ) => {}

    convert( value : any ) : any {
        return value == null || value instanceof this.type ? value : new this.type( value );
    }

    toJSON( value ){
        return value && value.toJSON ? value.toJSON() : value;
    }

    clone( value ) {
        return new this.type( this.toJSON( value ) );
    }

    isChanged( a, b ){
        return a !== b;
    }
}

Function.prototype._attribute = ImmutableClassType;

/**
 * Optimized attribute of primitive type.
 * 
 * Primitives has specialized simplified pipeline.
 */
export class PrimitiveType extends AnyType {
    type : NumberConstructor | StringConstructor | BooleanConstructor

    dispose(){}
    create() { return this.type(); }

    toJSON( value ) { return value; }

    convert( value ) { return value == null ? value : this.type( value ); }

    isChanged( a, b ) { return a !== b; }

    clone( value ) { return value; }

    doInit( record : AttributesContainer, value, options : TransactionOptions ){
        return this.transform( value === void 0 ? this.value : value, options, void 0, record );
    }

    doUpdate( record, value, options, nested ){
        const   { name } = this,
                { attributes } = record,
                prev = attributes[ name ];
        
        return prev !== ( attributes[ name ] = this.transform( value, options, prev, record ) );
    }

    initialize(){
        if( this.value === void 0 ){
            this.value = this.type();
        }
    }
}

Boolean._attribute = String._attribute = PrimitiveType;

// Number type with special validation algothim.
/** @private */ 
export class NumericType extends PrimitiveType {
    type : NumberConstructor

    create(){
        return 0;
    }

    convert( value, a?, b?, record? ) {
        const num = value == null ? value : Number( value );

        if( num !== num ){
            this._log( 'warn', 'assigned with Invalid Number', value, record );
        }
        
        return num;
    }

    validate( model, value, name ) {
        // Whatever is not symmetrically serializable to JSON, is not valid by default.
        if( value != null && !isFinite( value ) ) {
            return name + ' is not valid number';
        }
    }
}

Number._attribute = NumericType;

/**
 * Compatibility wrapper for Array type.
 * @private
 */ 
export class ArrayType extends AnyType {
    toJSON( value ) { return value; }
    dispose(){}
    create(){ return []; }

    convert( value, a?, b?, record? ) {
        // Fix incompatible constructor behaviour of Array...
        if( value == null || Array.isArray( value ) ) return value;

        this._log( 'warn', 'non-array assignment is ignored', value, record );

        return [];
    }

    clone( value ){
        return value && value.slice();
    }
}

Array._attribute = ArrayType;

export class ObjectType extends AnyType {
    toJSON( value ) { return value; }
    dispose(){}
    create(){ return {}; }

    convert( value, a?, b?, record? ) {
        if( value == null || value.constructor === Object ) return value;

        this._log( 'warn', 'non-object assignment is ignored', value, record );

        return {};
    }

    clone( value ){
        return value && tools.assign( {}, value );
    }
}

Object._attribute = ObjectType;

export function doNothing(){}

export class FunctionType extends AnyType {
    // Functions are not serialized.
    toJSON( value ) { return void 0; }
    create(){ return doNothing; }

    convert( value, a?, b?, record? ) {
        // Fix incompatible constructor behaviour of Array...
        if( value == null || typeof value === 'function' ) return value;

        this._log( 'warn', 'assigned with non-function', value, record );

        return doNothing;
    }

    // Functions are not cloned.
    clone( value ){ return value; }
}

Function._attribute = FunctionType;