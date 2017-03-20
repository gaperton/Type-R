import { Record } from '../transaction'
import { AnyType } from './generic'
import { ItemsBehavior, Owner, transactionApi, Transactional, TransactionOptions, TransactionalConstructor } from '../../transactions' 
import { tools, eventsApi } from '../../object-plus'

const { on, off } = eventsApi,
    { free, aquire } = transactionApi;

/************************
 * Shared attribute definition.
 * - Not serialized.
 * - Listening to the changes.
 * - Doesn't take ownership when assigned with object of proper type.
 * - Takes ownership on objects which are converted.
 */

const shareAndListen = ItemsBehavior.listen | ItemsBehavior.share;

/** @private */
export class SharedType extends AnyType {
    type : TransactionalConstructor

    clone( value : Transactional, record : Record ) : Transactional {
        // References are not cloned.
        if( !value || value._owner !== record ) return value;

        // Implicitly created objects are cloned.
        const clone = value.clone();
        aquire( record, clone, this.name );
        return clone;
    }

    // Do not serialize by default.
    toJSON(){}

    canBeUpdated( prev : Transactional, next : any, options : TransactionOptions ) : any {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        if( prev && next != null ){
            if( next instanceof this.type ){
                // In case if merge option explicitly specified, force merge.
                if( options.merge ) return next.__inner_state__;
            }
            else{
                return next;
            }
        }
    }

    convert( value : any, options : TransactionOptions, prev : any, record : Record ) : Transactional {
        if( value == null || value instanceof this.type ) return value;

        // Convert type using implicitly created rtransactional object.
        const implicitObject = new this.type( value, options, shareAndListen );

        // To prevent a leak, we need to take an ownership on it.
        aquire( record, implicitObject, this.name );

        return implicitObject;
    }

    // Refs are always valid.
    validate( model, value, name ){}

    // They are always created as null.
    create() : Transactional {
        return null;
    }

    // Listening to the change events
    _handleChange( next : Transactional, prev : Transactional, record : Record ){
        if( prev ){
            // If there was an implicitly created object, remove an ownership.
            if( prev._owner === record ){
                free( record, prev );
            }
            else{
                off( prev, prev._changeEventName, this._onChange, record );
            }
        }  
 
        if( next ){
            // No need to take an ownership for an implicit object - already done in convert or clone.
            if( next._owner !== record ){
                on( next, next._changeEventName, this._onChange, record );
            }
        } 
    }

    dispose( record : Record, value : Transactional ){
        if( value ){
            // If the object was implicitly created, dispose it.
            if( value._owner === record ){
                free( record, value );
                value.dispose();
            }
            else{
                off( value, value._changeEventName, this._onChange, record );
            }
        }
    }

    _onChange : ( child : Transactional, options : TransactionOptions, initiator : Transactional ) => void 

    initialize( options ){
        // Create change event handler which knows current attribute name. 
        const attribute = this;
        this._onChange = this.propagateChanges ? function( child, options, initiator ){
            this === initiator || this.forceAttributeChange( attribute.name, options );
        } : ignore;

        options.changeHandlers.unshift( this._handleChange );
    }
}

function ignore(){}