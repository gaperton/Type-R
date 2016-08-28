import { Record } from '../transaction' 
import { GenericAttribute } from './generic'
import { Owner, transactionApi, Transactional, TransactionOptions, TransactionalConstructor } from '../../transactions'
import { tools } from '../../object-plus' 

const { free, aquire } = transactionApi;

export class TransactionalType extends GenericAttribute {
    type : TransactionalConstructor

    canBeUpdated( prev : Transactional, next : any, options : TransactionOptions ) : any {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        if( prev && next != null ){
            if( next instanceof this.type ){
                // In case if merge option explicitly specified, force merge.
                if( options.merge ) return next._state;
            }
            else{
                return next;
            }
        }
    }

    convert( value : any, options : TransactionOptions, prev : any, record : Record ) : Transactional {
        // Invoke class factory to handle abstract classes
        if( value == null ) return value;
        
        if( value instanceof this.type ){
            if( value._shared === 1 ){
                tools.log.warn( `[Record] Aggregated attribute "${ this.name } : ${ (<any>this.type).name || 'Collection' }" is assigned with shared collection type.`, value, record._attributes );
            }

            return value;
        }

        return <any>this.type.create( value, options );
    }

    validate( record : Record, value : Transactional ){
        var error = value && value.validationError;
        if( error ) return error;
    }

    create() : Transactional {
        return new (<any>this.type)(); // this the subclass of Transactional here.
    }

    initialize( options ){
        options.changeHandlers.unshift( this._handleChange );
    }

    _handleChange( next : Transactional, prev : Transactional, record : Record ){
        prev && free( record, prev );
        
        if( next && !aquire( record, next, this.name ) ){
            tools.log.warn( `[Record] aggregated '${this.name}' attribute value already has an owner.`, next, record._attributes );
        }
    }
}

Record._attribute = TransactionalType;