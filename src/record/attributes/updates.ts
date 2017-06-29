import { Transactional, TransactionOptions, Owner, transactionApi } from "../../transactions"
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

export function begin( record : AttributesContainer ){
    if( _begin( record ) ){
        record._previousAttributes = new record.Attributes( record.attributes );
        record._changedAttributes = null;
        return true;
    }
    
    return false;
}

export function markAsDirty( record : AttributesContainer, options : TransactionOptions ){
    // Need to recalculate changed attributes, when we have nested set in change:attr handler
    if( record._changedAttributes ){
        record._changedAttributes = null;
    }

    return _markAsDirty( record, options );
}
