import { Class, ClassDefinition } from '../class.ts'
import { begin, commit, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record } from '../record/index.ts'

import { IdIndex } from './commons.ts'

let _count = 0;

export class Collection extends Transactional {
    /***********************************
     * Core Members
     */
    // Array of the records
    models : Record[]

    // Index by id and cid
    _byId : IdIndex

    get( objOrId : string | Record | Object ) : Record {
        return objOrId ? (
            this._byId[ typeof objOrId === 'object' ? ( <Record> objOrId ).cid || objOrId[ this.idAttribute ] : objOrId ]
        ) : null;
    }

    each( iteratee : ( val : Record, key : number ) => void, context? : any ){
        const fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee,
            { models } = this;

        for( let i = 0; i < models.length; i++ ){
            fun( models[ i ], i ); 
        }
    }

    _validateNested( errors : {} ) : number {
        let count = 0;

        this.each( record => {
            const error = record.validationError;
            if( error ){
                errors[ record.cid ] = error;
                count++;
            }
        });

        return count;
    }

    model : typeof Record

    // idAttribute extracted from the model type.
    idAttribute : string

    constructor( records? : ( Record | {} )[], options? : TransactionOptions ){
        super( _count++ );
        this.models = [];
        this._byId = {};
        this.idAttribute = this.model.prototype.idAttribute;
    }

    get length() : number { return this.models.length; }

    _notifyChange( options : TransactionOptions ){
        // TODO: send 'changes' event
    }

    _notifyChangeItem( event : 'add' | 'remove' | 'change', record : Record, options : TransactionOptions ){
        // TODO : send item change event 
    }

    _notifyBulkChange( event : 'update' | 'reset' | 'sort', options : TransactionOptions ){
        //TBD
    }

    // Deeply clone collection, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.models, { clone : true }, owner );
    }

    toJSON() : Object[] {
        return this.models.map( model => model.toJSON() );
    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( elements : ( {} | Record )[], options? : TransactionOptions ) : this {
        // Handle reset option here - no way it will be populated from the top as nested transaction. 
        return ( options.reset ? this.reset( elements, options ) : 
                                 this._createTransaction( elements, options ).commit( options ) );
    }

    reset( elements : ( {} | Record )[], options : TransactionOptions = {} ) : this {
        const previousModels = dispose( this );
        emptySet( this, elements, options );

        return previousModels;
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    _createTransaction( elements : Elements, options : TransactionOptions = {} ) : CollectionTransaction {
        if( this.models.length ){
            const { remove } = options;
            return remove === void 0 || remove ? setTransaction( this, elements, options ) : addTransaction( this, elements, options );
        }
        else{
            return emptySetTransaction( this, elements, options );
        }
    }

}

