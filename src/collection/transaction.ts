import { Class, ClassDefinition } from '../class.ts'
import { begin, commit, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record } from '../record/index.ts'

export class Collection extends Class implements Transactional {
    /***********************************
     * Core Members
     */
    // Previous attributes
    models : Record[]
    _byId : Index

    model : typeof Record

    get length() : number { return this.models.length; }

    // Transactional control
    _transaction : boolean
    _isDirty : boolean

    _notifyChange( options : TransactionOptions ){
        // TODO: send 'changes' event
    }

    _notifyChangeItem( event : 'add' | 'remove' | 'change', record : Record, options : TransactionOptions ){
        // TODO : send item change event 
    }

    _notifyBulkChange( event : 'update' | 'reset' | 'sort', options : TransactionOptions ){
        //TBD
    }

    /**
     * Ownerhsip API
     */
    // Reference to owner
    _owner : Owner

    // Owner's attribute name, if it's Record 
    _ownerKey : string

    // Deeply clone collection, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.models, { clone : true }, owner );
    }

    toJSON() : Object[] {
        return this.models.map( model => model.toJSON() );
    }

    parse( data : any ) : Object[] { return data; }

    // Execute given function in the scope of ad-hoc transaction.
    transaction( fun : ( self : this ) => void, options? : TransactionOptions ) : void {

    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( elements : ( {} | Model )[], options? : TransactionOptions ) : this {
        // Handle reset option here - no way it will be populated from the top as nested transaction. 
        return ( options.reset ? this.reset( elements, options ) : 
                                 this.createTransaction( elements, options ).commit( options ) );
    }

    reset( elements : ( {} | Model )[], options : TransactionOptions = {} ) : this {
        const previousModels = dispose( this );
        emptySet( this, elements, options );

        return previousModels;
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    createTransaction( elements : Elements, options : TransactionOptions = {} ) : CollectionTransaction {
        if( this.models.length ){
            const { remove } = options;
            return remove === void 0 || remove ? setTransaction( this, elements, options ) : addTransaction( this, elements, options );
        }
        else{
            return emptySetTransaction( this, elements, options );
        }
    }

}

