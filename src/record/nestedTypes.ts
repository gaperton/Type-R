import { GenericAttribute } from './attribute.ts'
import { Owner, Transactional, TransactionalConstructor, TransactionOptions } from './types.ts' 

export class TransactionalType extends GenericAttribute {
    type : TransactionalConstructor;

    canBeUpdated( prev : Transactional, next : any ) : boolean {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        return prev && next && !( next instanceof this.type );
    }

    convert( value : any, options : TransactionOptions, record : Owner & Transactional ){
        // Invoke class factory to handle abstract classes
        return value == null || value instanceof this.type ? value : this.type.create( value, options, record );
    }

    create() : Transactional {
        return new this.type();
    }

    handleChange( next : Transactional, prev : Transactional, record : Owner & Transactional ){
        // Remove reference to self
        if( prev && prev._owner === record ){
            prev._ownerKey = prev._owner = null;
        } 

        // Take ownership if possible
        if( next && !next._owner ){
            next._owner = record;
            next._ownerKey = this.name;
        }
    }
}