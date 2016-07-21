import { define, log, assign, Class, ClassDefinition, defaults, trigger2 } from '../objectplus/index.ts'
import { begin, commit, markAsDirty, Transactional, Transaction, TransactionOptions, Owner } from '../transactions.ts'
import { Record, TransactionalType } from '../record/index.ts'

import { IdIndex, sortElements, dispose, Elements, CollectionCore, addIndex, removeIndex, Comparator, CollectionTransaction } from './commons.ts'
import { addTransaction } from './add.ts'
import { setTransaction, emptySetTransaction } from './set.ts'
import { removeOne, removeMany } from './remove.ts'

let _count = 0;

const silentOptions = { silent : true };

export type GenericComparator = string | ( ( x : Record ) => number ) | ( ( a : Record, b : Record ) => number ); 


interface CollectionOptions extends TransactionOptions {
    comparator? : GenericComparator
    model? : typeof Record
}

@define({
    // Default client id prefix 
    cidPrefix : 'c',
    model : Record,
    _changeEventName : 'changes' 
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

    set comparator( x : GenericComparator ){
        let compare;

        switch( typeof x ){
            case 'string' :
                this._comparator = ( a, b ) => {
                    const aa = a[ <string>x ], bb = b[ <string>x ];
                    if( aa === bb ) return 0;
                    return aa < bb ? -1 : + 1;
                } 
                break;
            case 'function' :
                if( x.length === 1 ){
                    this._comparator = ( a, b ) => {
                        const aa = (<any>x).call( this, a ), bb = (<any>x).call( this, b );
                        if( aa === bb ) return 0;
                        return aa < bb ? -1 : + 1;
                    }
                }
                else{
                    this._comparator = ( a, b ) => (<any>x).call( this, a, b );
                }
                break;
                
            default :
                this._comparator = null;
        }
    }
    
    get comparator(){ return this._comparator; }
    _comparator : ( a : Record, b : Record ) => number

    _onChildrenChange( record : Record, options : TransactionOptions = {} ){
        const isRoot = begin( this ),
              { idAttribute } = this;

        if( record.hasChanged( idAttribute ) ){
            const { _byId } = this;
            delete _byId[ record.previous( idAttribute ) ];

            const { id } = record;
            id == null || ( _byId[ id ] = record );
        }

        if( markAsDirty( this, options ) ){
            // Forward change event from the record.
            trigger2( this, 'change', record, options )
        }

        isRoot && commit( this );
    }

    get( objOrId : string | Record | Object ) : Record {
        if( objOrId == null ) return;

        if( typeof objOrId === 'object' ){
            const id = objOrId[ this.idAttribute ];
            return ( id !== void 0 && this._byId[ id ] ) || this._byId[ (<Record>objOrId).cid ];
        }
        else{
            return this._byId[ objOrId ];
        }        
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


    constructor( records? : ( Record | {} )[], options : CollectionOptions = {} ){
        super( _count++ );
        this.models = [];
        this._byId = {};
        this.model      = options.model || this.model;
        this.idAttribute = this.model.prototype.idAttribute;
        if( options.comparator !== void 0 ){
            this.comparator = options.comparator;
        }
        else{
            // Make sure this property is initialized, to keep the same hidden class.
            this._comparator = this._comparator;
        }

        if( records ){
            const elements = toElements( this, records, options );
            emptySetTransaction( this, elements, options, true );
        }

        this.initialize.apply( this, arguments );
    }

    initialize(){}

    get length() : number { return this.models.length; }
    first() : Record { return this.models[ 0 ]; }
    last() : Record { return this.models[ this.models.length - 1 ]; }
    at( a_index : number ) : Record {
        const index = a_index < 0 ? a_index + this.models.length : a_index;    
        return this.models[ index ];
    }

    // Deeply clone collection, optionally setting new owner.
    clone( owner? : any ) : this {
        var models = this.map( model => model.clone() );
        return new (<any>this.constructor)( models, { model : this.model, comparator : this.comparator }, owner );
    }

    toJSON() : Object[] {
        return this.models.map( model => model.toJSON() );
    }

    // Apply bulk in-place object update in scope of ad-hoc transaction 
    set( elements : ElementsArg = [], options : TransactionOptions = {} ) : this {
        if( (<any>options).add !== void 0 ){
            log.error("Collection.set doesn't support 'add' option, behaving as if options.add === true.");
        }

        // Handle reset option here - no way it will be populated from the top as nested transaction.
        if( options.reset ){
            this.reset( elements, options )
        }
        else{
            const transaction = this._createTransaction( elements, options );
            transaction && transaction.commit();
        } 

        return this;    
    }

    reset( a_elements : ElementsArg, options : TransactionOptions = {} ) : Record[] {
        const previousModels = dispose( this );

        // Make all changes required, but be silent.
        if( a_elements ){            
            emptySetTransaction( this, toElements( this, a_elements, options ), options, true );
        }

        options.silent || trigger2( this, 'reset', this, defaults( { previousModels : previousModels }, options ) );

        return this.models;
    }

    // Add elements to collection.
    add( a_elements : ElementsArg , options : TransactionOptions = {} ){
        const elements = toElements( this, a_elements, options ),
              transaction = this.models.length ?
                    addTransaction( this, elements, options ) :
                    emptySetTransaction( this, elements, options );

        if( transaction ){
            transaction.commit();
            return transaction.added;
        } 
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
    _createTransaction( a_elements : ElementsArg, options : TransactionOptions = {} ) : CollectionTransaction {
        const elements = toElements( this, a_elements, options );

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

    /***********************************
     * Collection manipulation methods
     */

    pluck( key : string ) : any[] {
        return this.models.map( model => model[ key ] );
    }

    sort( options : TransactionOptions = {} ) : this {
        if( sortElements( this, options ) ){
            const isRoot = begin( this );
            
            if( markAsDirty( this, options ) ){
                trigger2( this, 'sort', this, options );
            }

            isRoot && commit( this );
        }

        return this;
    }

    // Add a model to the end of the collection.
    push(model, options) {
      return this.add(model, assign({at: this.length}, options));
    }

    // Remove a model from the end of the collection.
    pop(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    }

    // Add a model to the beginning of the collection.
    unshift(model, options) {
      return this.add(model, assign({at: 0}, options));
    }

    // Remove a model from the beginning of the collection.
    shift( options? : CollectionOptions ) : Record {
      var model = this.at(0);
      this.remove( model, options );
      return model;
    }

    // Slice out a sub-array of models from the collection.
    slice() : Record[] {
      return slice.apply(this.models, arguments);
    }

    indexOf( modelOrId : any ) : number {
        const record = this.get( modelOrId );
        return this.models.indexOf( record );
    }

    modelId( attrs : {} ) : any {
        return attrs[ this.model.prototype.idAttribute ];
    }
}

type ElementsArg = Object | Record | Object[] | Record[];

function toElements( collection : Collection, elements : ElementsArg, options : CollectionOptions ) : Elements {
    const parsed = options.parse ? collection.parse( elements ) : elements; 
    return Array.isArray( parsed ) ? parsed : [ parsed ];
}

const slice = Array.prototype.slice;

Record.Collection = <any>Collection;