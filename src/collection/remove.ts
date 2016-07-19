/*************
 * Remove items from collections.
 * 
 * Cannot be a part of two-phase transaction on object tree.
 * Can be executed in the scope of ad-hoc transaction or from the trigger, though.
 *
 * Implemented with low-level API. 
 * Most frequent operation - single element remove. Thus, it have the fast-path.
 */

import { Record } from '../record/index.ts'
import { CollectionCore, CollectionTransaction, removeIndex } from './commons.ts'
import { trigger2, trigger3 } from '../objectplus/index.ts'
import { free, TransactionOptions, markAsDirty, begin, commit } from '../transactions.ts' 

export function removeOne( collection : CollectionCore, el : Record | {} | string, options : TransactionOptions ) : Record {
    var model : Record = collection.get( el );

    if( model ){
        const isRoot = begin( collection ),
              models = collection.models,
              silent = options.silent;

        // Remove model form the collection. 
        models.splice( models.indexOf( model ), 1 );
        removeIndex( collection._byId, model );
        
        // Mark transaction as dirty. 
        markAsDirty( collection );

        // Send out events.
        silent || trigger3( model, 'remove', model, collection, options );

        free( collection, model );

        silent || trigger2( collection, 'update', collection, options );

        // Commit transaction.
        isRoot && commit( collection, options );

        return model;
    }
};

/** Optimized for removing many elements
 * 1. Remove elements from the index, checking for duplicates
 * 2. Create new models array matching index
 * 3. Send notifications and remove references
 */
export function removeMany( collection : CollectionCore, toRemove : any[], options ){
    const removed = _removeFromIndex( collection, toRemove );
    if( removed.length ){
        const isRoot = begin( collection );

        _reallocate( collection, removed.length );

        const transaction = new CollectionTransaction( collection, isRoot, null, removed, null, false );
        transaction.commit( options );

        return removed;
    }
};

// remove models from the index...
function _removeFromIndex( collection, toRemove ){
    var removed = Array( toRemove.length ),
        _byId   = collection._byId;

    for( var i = 0, j = 0; i < toRemove.length; i++ ){
        var model = collection.get( toRemove[ i ] );
        if( model ){
            removed[ j++ ] = model;
            removeIndex( _byId, model );
            free( collection, model );
        }
    }

    removed.length = j;

    return removed;
}

// Allocate new models array removing models not present in the index.
function _reallocate( collection, removed ){
    var prev   = collection.models,
        models = collection.models = Array( prev.length - removed ),
        _byId = collection._byId;

    for( var i = 0, j = 0; i < prev.length; i++ ){
        var model = prev[ i ];

        if( _byId[ model.cid ] ){
            models[ j++ ] = model;
        }
    }

    models.length = j;
}