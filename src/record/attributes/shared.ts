import { Record } from '../transaction'
import { GenericAttribute } from './generic'
import { Owner, transactionApi, Transactional, TransactionOptions, TransactionalConstructor } from '../../transactions' 
import { tools, eventsApi } from '../../object-plus'

const { on, off } = eventsApi,
    { free, aquire } = transactionApi;

/************************
 * Shared attribute definition.
 * - Not serialized.
 * - Listening to the changes.
 * - Doesn't take ownership.
 */

/** @private */
export class SharedRecordType extends GenericAttribute {
    type : TransactionalConstructor

    clone( value : Transactional ){
        return value;
    }

    // Shared object can never be updated in place.
    canBeUpdated( prev : Transactional, next : any ) : any {}

    // Shared object can never be type casted.
    convert( value : any, options : TransactionOptions, prev : any, record : Record ) : Transactional {
        return value == null || value instanceof this.type ? value : this.type.create( value, options );
    }

    // Refs are always valid.
    validate( model, value, name ){}

    // They are always created as null.
    create() : Transactional {
        return null;
    }

    // Listening to the change events
    _handleChange( next : Transactional, prev : Transactional, record : Record ){
        prev && off( prev, prev._changeEventName, record._onChildrenChange, record );
        next && on( next, next._changeEventName, record._onChildrenChange, record );
    }

    initialize( options ){
        // Shared attributes are not serialized.
        this.toJSON = null;
        this.propagateChanges && options.changeHandlers.unshift( this._handleChange );
    }
}