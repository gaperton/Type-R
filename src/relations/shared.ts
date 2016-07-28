import { Record, ChainableAttributeSpec } from '../record'
import { Collection } from '../collection'
import { GenericAttribute } from '../record/attribute'
import { Owner, free, aquire, Transactional, TransactionOptions, TransactionalConstructor } from '../transactions' 
import { log } from '../object-plus'

/************************
 * Model.shared and Collection.shared
 */

/** @private */
export class SharedType extends GenericAttribute {
    type : TransactionalConstructor

    // Shared object can never be updated in place.
    canBeUpdated( prev : Transactional, next : any ) : boolean {
        return false;
    }

    // Shared object can never be type casted.
    convert( value : any, options : TransactionOptions, record : Record ) : Transactional {
        if( value == null || value instanceof this.type ) return value;

        log.error( `[Shared Attribute] Cannot assign value of incompatible type.`, value, record );
        
        return null;
    }

    // They are validated, though.
    validate( record : Record, value : Transactional ){
        var error = value && value.validationError;
        if( error ) return error;
    }

    // They are always created as null.
    create() : Transactional {
        return null;
    }

    // Listening to the change events
    _handleChange( next : Transactional, prev : Transactional, record : Record ){
        prev && Transactional.off( prev, prev._changeEventName, record._onChildrenChange, record );
        next && Transactional.on( next, next._changeEventName, record._onChildrenChange, record );
    }

    initialize( options ){
        // Shared attributes are not serialized.
        this.toJSON = null;
        options.changeHandlers.unshift( this._handleChange );
    }
}

/** @private */
const createSharedTypeSpec = {
    get(){
        return new ChainableAttributeSpec({
            value : null,
            type : this,
            _attribute : SharedType
        });
    }
};

Object.defineProperty( Record, 'shared', createSharedTypeSpec );
Object.defineProperty( Collection, 'shared', createSharedTypeSpec );