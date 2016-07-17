import { define, Class, ClassDefinition, trigger2 } from '../objectplus/index.ts'
import { begin, commit, markAsDirty, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record } from '../record/index.ts'

import { IdIndex, Elements, CollectionCore, addIndex, removeIndex, Comparator, CollectionTransaction } from './commons.ts'
import { addTransaction } from './add.ts'
import { setTransaction, emptySetTransaction } from './set.ts'

let _count = 0;

@define({
    // Default client id prefix 
    cidPrefix : 'c'
})
export class Collection extends Transactional implements CollectionCore {
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

    _onChildrenChange( record, options? ){
        const isRoot = begin( this ),
              { idAttribute } = this;

        if( record.hasChanged( idAttribute ) ){
            const { _byId } = this;
            removeIndex( _byId, record.previous( idAttribute ) );
            addIndex( _byId, record[ idAttribute ] );
        }

        if( !options.silent ){
            markAsDirty( this );
            trigger2( this, 'change', record, options );
        }

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

    constructor( records? : ( Record | {} )[], options? : TransactionOptions ){
        super( _count++ );
        this.models = [];
        this._byId = {};
        this.idAttribute = this.model.prototype.idAttribute;
    }

    get length() : number { return this.models.length; }

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
        if( options.reset ){
            this.reset( elements, options )
        }
        else{
            this._createTransaction( elements, options ).commit( options );
        } 

        return this;    
    }

    reset( elements : ( {} | Record )[], options : TransactionOptions = {} ) : this {
        throw new ReferenceError( 'TBD' );
        /*const previousModels = dispose( this );
        emptySet( this, elements, options );

        return previousModels;*/
    }

    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.   
    _createTransaction( elements : Elements, options : TransactionOptions = {} ) : CollectionTransaction {
        if( this.models.length ){
            return options.remove === false ?
                        addTransaction( this, elements, options ) :
                        setTransaction( this, elements, options );
        }
        else{
            return emptySetTransaction( this, elements, options );
        }
    }
}

