import { Transactional, Transaction, TransactionOptions, Owner, transactionApi } from "../../transactions"
const { begin : _begin, markAsDirty : _markAsDirty, commit } = transactionApi;

import { eventsApi } from '../../object-plus'
const { trigger3 } = eventsApi;

export interface AttributesContainer extends Transactional, Owner {
    getClassName() : string
    Attributes : CloneAttributesCtor
    _attributes : AttributesDescriptors
    attributes : AttributesValues
    _previousAttributes : AttributesValues
    _changedAttributes : AttributesValues
    forEachAttr( attrs : object, iteratee : ( value : any, key? : string, spec? : AttributeUpdatePipeline ) => void ) : void
}

export type CloneAttributesCtor = new ( x : AttributesValues ) => AttributesValues

export interface AttributesValues {
    [ name : string ] : any
}

export interface AttributesDescriptors {
    [ name : string ] : AttributeUpdatePipeline
}

export interface AttributeUpdatePipeline{
    canBeUpdated( prev : any, next : any, options : TransactionOptions ) : any
    transform : Transform
    isChanged( a : any, b : any ) : boolean
    handleChange : ChangeHandler
    propagateChanges : boolean
}

export type Transform = ( next : any, options : TransactionOptions, prev : any, record : AttributesContainer ) => any;
export type ChangeHandler = ( next : any, prev : any, record : AttributesContainer ) => void;

 // Optimized single attribute transactional update. To be called from attributes setters
 // options.silent === false, parse === false. 
export function setAttribute( record : AttributesContainer, name : string, value : any ) : void {
    const isRoot  = begin( record ),
          options = {},
        { attributes } = record,
          spec = record._attributes[ name ],
          prev = attributes[ name ];

    // handle deep update...
    const update = spec.canBeUpdated( prev, value, options );

    if( update ) {
        //TODO: Why not just forward the transaction, without telling that it's nested?
        const nestedTransaction = ( prev as Transactional )._createTransaction( update, options );
        if( nestedTransaction ){
            nestedTransaction.commit( record ); // <- null here, and no need to handle changes. Work with shared and aggregated.

            if( spec.propagateChanges ){
                markAsDirty( record, options );
                trigger3( record, 'change:' + name, record, prev, options );
            }
        }
    }
    else {
        // cast and hook...
        const next = spec.transform( value, options, prev, record );

        attributes[ name ] = next;

        if( spec.isChanged( next, prev ) ) {
            // Do the rest of the job after assignment
            spec.handleChange( next, prev, record );

            markAsDirty( record, options );
            trigger3( record, 'change:' + name, record, next, options );
        }
    }

    isRoot && commit( record );
}

export function setAttribute1( record : AttributesContainer, name : string, value : any ) : void {
    const isRoot  = begin( record ),
          options = {},
        { attributes } = record,
          spec = record._attributes[ name ],
          prev = attributes[ name ];

    if( spec.update() ){
        markAsDirty( record, options );
        trigger3( record, 'change:' + name, record, prev, options );
    }

    isRoot && commit( record );
}

function begin( record : AttributesContainer ){
    if( _begin( record ) ){
        record._previousAttributes = new record.Attributes( record.attributes );
        record._changedAttributes = null;
        return true;
    }
    
    return false;
}

function markAsDirty( record : AttributesContainer, options : TransactionOptions ){
    // Need to recalculate changed attributes, when we have nested set in change:attr handler
    if( record._changedAttributes ){
        record._changedAttributes = null;
    }

    return _markAsDirty( record, options );
}

/**
 * TODO: There's an opportunity to create an optimized pipeline for primitive types and Date, which makes the majority
 * of attributes. It might create the major speedup.
 * 
 * Create the dedicated pipeline for owned and shared attributes as well.
 * 
 * Three elements of the pipeline:
 * - from constructor
 * - from assignment
 * - from `set`
 */

export const UpdateRecordMixin = {
// Need to override it here, since begin/end transaction brackets are overriden. 
    transaction( this : AttributesContainer, fun : ( self : AttributesContainer ) => void, options : TransactionOptions = {} ) : void{
        const isRoot = begin( this );
        fun.call( this, this );
        isRoot && commit( this );
    },
            
    // Handle nested changes. TODO: propagateChanges == false, same in transaction.
    _onChildrenChange( child : Transactional, options : TransactionOptions ) : void {
        const { _ownerKey } = child,
              attribute = this._attributes[ _ownerKey ];

        if( !attribute /* TODO: Must be an opposite, likely the bug */ || attribute.propagateChanges ) this.forceAttributeChange( _ownerKey, options );
    },

    // Simulate attribute change 
    forceAttributeChange( key : string, options : TransactionOptions = {} ){
        // Touch an attribute in bounds of transaction
        const isRoot = begin( this );

        if( markAsDirty( this, options ) ){
            trigger3( this, 'change:' + key, this, this.attributes[ key ], options );
        }
        
        isRoot && commit( this );
    },

    _createTransaction( this : AttributesContainer, a_values : {}, options : TransactionOptions = {} ) : Transaction {
        const isRoot = begin( this ),
                changes : string[] = [],
                nested : RecordTransaction[]= [],
                { attributes } = this,
                values = options.parse ? this.parse( a_values, options ) : a_values;

        guardedEachAttr( this, values, ( value, key, attr ) => {
            const prev = attributes[ key ];
            let update;

            // handle deep update...
            if( update = attr.canBeUpdated( prev, value, options ) ) { // todo - skip empty updates.
                const nestedTransaction = prev._createTransaction( update, options );
                if( nestedTransaction ){
                    nested.push( nestedTransaction );
                    
                    if( attr.propagateChanges ) changes.push( key );
                }

                return;
            }

            // cast and hook...
            const next = attr.transform( value, options, prev, this );
            attributes[ key ] = next;

            if( attr.isChanged( next, prev ) ) {
                changes.push( key );

                // Do the rest of the job after assignment
                attr.handleChange( next, prev, this );
            }
        } );

        if( changes.length && markAsDirty( this, options ) ){
            return new RecordTransaction( this, isRoot, nested, changes );
        }
        
        // No changes, but there might be silent attributes with open transactions.
        for( let pendingTransaction of nested ){
            pendingTransaction.commit( this );
        }

        isRoot && commit( this );
    },

    _createTransaction1( this : AttributesContainer, a_values : {}, options : TransactionOptions = {} ) : Transaction {
        const isRoot = begin( this ),
                changes : string[] = [],
                nested : RecordTransaction[]= [],
                { attributes, _attributes } = this,
                values = options.parse ? this.parse( a_values, options ) : a_values;

        let unknown;

        if( shouldBeAnObject( this, values ) ){
            for( let name in values ){
                const spec = _attributes[ name ];

                if( spec ){
                    if( spec.processUpdate( this, values[ name ], options, nested ) ){
                        changes.push( name );
                    }
                }
                else{
                    unknown || ( unknown = [] );
                    unknown.push( `'${ name }'` );
                }
            }

            if( unknown ){
                this._log( 'warn', `Undefined attributes ${ unknown.join(', ')} are ignored!`, values );
            }
        }
        
        if( changes.length && markAsDirty( this, options ) ){
            return new RecordTransaction( this, isRoot, nested, changes );
        }
        
        // No changes, but there might be silent attributes with open transactions.
        for( let pendingTransaction of nested ){
            pendingTransaction.commit( this );
        }

        isRoot && commit( this );
    }
};

export function shouldBeAnObject( record : AttributesContainer, values : object ){
    if( values && values.constructor === Object ) return true;

    record._log( 'warn', 'update with non-object is ignored!', values );
    return false;
}

function guardedEachAttr( record : AttributesContainer, attrs : {}, iteratee : ( value : any, key? : string, spec? : AttributeUpdatePipeline ) => void ) : void {
    const { _attributes } = record;
    let unknown : string[];

    if( shouldBeAnObject( record, attrs ) ){
        for( let name in attrs ){
            const spec = _attributes[ name ];

            if( spec ){
                iteratee( attrs[ name ], name, spec );
            }
            else{
                unknown || ( unknown = [] );
                unknown.push( `'${ name }'` );
            }
        }

        if( unknown ){
            record._log( 'warn', `Undefined attributes ${ unknown.join(', ')} are ignored!`, attrs );
        }
    }
}
// Transaction class. Implements two-phase transactions on object's tree. 
// Transaction must be created if there are actual changes and when markIsDirty returns true. 
class RecordTransaction implements Transaction {
    // open transaction
    constructor( public object : AttributesContainer,
                 public isRoot : boolean,
                 public nested : Transaction[],
                 public changes : string[] ){}

    // commit transaction
    commit( initiator? : AttributesContainer ) : void {
        const { nested, object, changes } = this;

        // Commit all pending nested transactions...
        for( let transaction of nested ){ 
            transaction.commit( object );
        }

        // Notify listeners on attribute changes...
        // Transaction is never created when silent option is set, so just send events out.
        const { attributes, _isDirty } = object;
        for( let key of changes ){
            trigger3( object, 'change:' + key, object, attributes[ key ], _isDirty );
        }

        this.isRoot && commit( object, initiator );
    }
}