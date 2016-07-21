import { Record } from './transaction.ts' 
import { GenericAttribute } from './attribute.ts'
import { Owner, free, aquire, Transactional, TransactionOptions, TransactionalConstructor } from '../transactions.ts' 

export class TransactionalType extends GenericAttribute {
    type : TransactionalConstructor

    canBeUpdated( prev : Transactional, next : any ) : boolean {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        return prev && next && !( next instanceof this.type );
    }

    convert( value : any, options : TransactionOptions, record : Record ) : Transactional {
        // Invoke class factory to handle abstract classes
        return value == null || value instanceof this.type ? value : this.type.create( value, options, record );
    }

    create() : Transactional {
        return new (<any>this.type)(); // this the subclass of Transactional here.
    }

    handleChange( next : Transactional, prev : Transactional, record : Record ){
        prev && free( record, prev );
        next && aquire( record, next );
    }
}

Record._attribute = TransactionalType;