import { define, Class, ClassDefinition, defaults, trigger2 } from '../objectplus/index.ts'
import { begin, commit, markAsDirty, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record, TransactionalType } from '../record/index.ts'

import { IdIndex, dispose, Elements, CollectionCore, addIndex, removeIndex, Comparator, CollectionTransaction } from './commons.ts'
import { addTransaction } from './add.ts'
import { setTransaction, emptySetTransaction } from './set.ts'
import { removeOne, removeMany } from './remove.ts'

let _count = 0;

const silentOptions = { silent : true };

@define({
    // Default client id prefix 
    cidPrefix : 'c',
    model : Record
})
export class Collection extends Transactional implements CollectionCore {
    static predefine() : typeof Collection { return this; }
    /***********************************
     * Core Members
     */
    // Array of the records
    models : Record[]

    // Index by id and cid
    _byId : IdIndex

    set comparator( x : any ){
        let compare;

        switch( typeof x ){
            case 'string' :
                this._comparator = ( a, b ) => {
                    const aa = a[ x ], bb = b[ x ];
                    if( aa === bb ) return 0;
                    return aa < bb ? -1 : + 1;
                } 
                break;
            case 'function' :
                if( x.length === 1 ){
                    this._comparator = ( a, b ) => {
                        const aa = x( a ), bb = x( b );
                        if( aa === bb ) return 0;
                        return aa < bb ? -1 : + 1;
                    }
                }
                else{
                    this._comparator = x;
                }
        }

        // TBD: sort?
    }
    get comparator(){ return this._comparator; }
    _comparator : ( a : Record, b : Record ) => number

    _onChildrenChange( record : Record, options? ){
        const isRoot = begin( this ),
              { idAttribute } = this;

        if( record.hasChanged( idAttribute ) ){
            const { _byId } = this;
            removeIndex( _byId, record.previous( idAttribute ) );
            addIndex( _byId, record[ idAttribute ] );
        }

        markAsDirty( this );

        options.silent || trigger2( this, 'change', record, options );

        isRoot && commit( this, options );
    }

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

    constructor( records? : ( Record | {} )[], options : TransactionOptions = {} ){
        super( _count++ );
        this.models = [];
        this._byId = {};
        this.idAttribute = this.model.prototype.idAttribute;

        if( records ){
            const elements : Elements = options.parse ? this.parse( records ) : records,
                  transaction = emptySetTransaction( this, records, options );

            transaction && transaction.commit( silentOptions );
        }

        this.initialize.apply( this, arguments );
    }

    initialize(){}

    get length() : number { return this.models.length; }
    first() : Record { return this.models[ 0 ]; }

    // Deeply clone collection, optionally setting new owner.
    clone( owner? : any ) : this {
        return new (<any>this.constructor)( this.models, { clone : true }, owner );
    }

    toJSON() : Object[] {
        return this.models.map( model => model.toJSON() );
    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( elements : ( {} | Record )[], options : TransactionOptions = {} ) : this {
        // Handle reset option here - no way it will be populated from the top as nested transaction. 
        if( options.reset ){
            this.reset( elements, options )
        }
        else{
            const transaction = this._createTransaction( elements, options );
            transaction && transaction.commit( options );
        } 

        return this;    
    }

    reset( a_elements : ( {} | Record )[], options : TransactionOptions = {} ) : Record[] {
        const previousModels = dispose( this );

        // Make all changes required, but be silent.
        if( a_elements ){
            const elements : Elements = options.parse ? this.parse( a_elements ) : a_elements;
            emptySetTransaction( this, elements, options ).commit( silentOptions );
        }

        options.silent || trigger2( this, 'reset', this, defaults( { previousModels : previousModels }, options ) );

        return this.models;
    }

    // Add elements to collection.
    add( something : Elements | {} | Record , options : TransactionOptions = {} ){
        const parsed : Elements = options.parse ? this.parse( something ) : something,
              elements : Elements = Array.isArray( parsed ) ? parsed : [ parsed ],
              transaction = this.models.length ?
                    addTransaction( this, elements, options ) :
                    emptySetTransaction( this, elements, options );

        if( transaction ){
            transaction.commit( options );
            return transaction.added;
        }

        return []; 
    }

    // Remove elements. 
    remove( recordsOrIds : any, options : TransactionOptions = {} ) : Record[] | Record {
        if( recordsOrIds ){
            return Array.isArray( recordsOrIds ) ?
                        removeMany( this, recordsOrIds, options ) :
                        removeOne( this, recordsOrIds, options );
        }

        return [];
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    _createTransaction( a_elements : Elements, options : TransactionOptions = {} ) : CollectionTransaction {
        const elements = options.parse ? this.parse( a_elements ) : a_elements;

        if( this.models.length ){
            return options.remove === false ?
                        addTransaction( this, elements, options ) :
                        setTransaction( this, elements, options );
        }
        else{
            return emptySetTransaction( this, elements, options );
        }
    }

    static _attribute = TransactionalType;
}

Record.Collection = <any>Collection;