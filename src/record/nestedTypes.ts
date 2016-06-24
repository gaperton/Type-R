import { Attribute } from './attribute.ts'
import { Owner, Transactional, TransactionalConstructor, TransactionOptions } from './types.ts' 

export class TransactionalType extends Attribute {
    type : TransactionalConstructor;

    canBeUpdated( prev, next ) : boolean {
        return prev && next && !( next instanceof this.type );
    }

    convert( value : any, options : TransactionOptions, record : Owner & Transactional ){
        // Invoke class factory to handle abstract classes
        return value == null || value instanceof this.type ? value : this.type.create( value, options, record );
    }

    create() : Transactional {
        return new this.type();
    }

    handleChange( next : any, prev : any, record : Owner & Transactional ){
        // Remove reference to self
        if( prev && prev._owner === record ){
            prev._onwerKey = prev._owner = null;
        } 

        // Take ownership if possible
        if( next && !next._owner ){
            next._owner = record;
            next._ownerKey = this.name;
        }
    }
}