import { Transaction, begin, commit, aquire, free } from '../transactions.ts'
import { CollectionTransaction, sortElements, CollectionOptions, toModel, addIndex, CollectionCore } from './commons.ts'
import { Record } from '../record/index.ts'

interface AddOptions extends CollectionOptions {
    at? : number 
}

export function addTransaction( collection : CollectionCore, items, options : AddOptions ){
    const isRoot = begin( collection ),
          nested = [];

    var added = appendElements( collection, items, nested, options );

    if( ( added.length || nested.length ) && !options.silent ){
        let needSort = sortOrMoveElements( collection, added, options );
        return new CollectionTransaction( collection, isRoot, added, [], nested, needSort );
    }

    // No changes...
    isRoot && commit( collection, options );
};

// Handle sort or insert at options for add operation. Reurns true if sort happened. 
function sortOrMoveElements( collection : CollectionCore, added : Record[], options : AddOptions ) : boolean {
    let at = options.at;
    if( at != null ){
        // if at is given, it overrides sorting option...
        const { length } = collection.models;
        at = +at;
        if( at < 0 ) at += length + 1;
        if( at < 0 ) at = 0;
        if( at > length ) at = length;

        moveElements( collection.models, at, added );
        return false;
    }

    return sortElements( collection, options );
}

function moveElements( source : any[], at : number, added : any[] ) : void {
    for( var j = source.length - 1, i = j - added.length; i >= at; i--, j-- ){
        source[ j ] = source[ i ];
    }

    for( i = 0, j = at; i < added.length; i++, j++ ){
        source[ j ] = added[ i ];
    }
}

// append data to model and index
function appendElements( collection : CollectionCore, a_items, nested : Transaction[], a_options ){
    var models      = collection.models,
        _byId       = collection._byId,
        merge       = a_options.merge,
        parse       = a_options.parse,
        idAttribute = collection.model.prototype.idAttribute,
        prevLength = models.length;

    for( const item of a_items.length ){
        let model = item ? _byId[ item[ idAttribute ] ] || _byId[ item.cid ] : null;

        if( model ){
            if( merge && item !== model ){
                var attrs = item.attributes || item;
                const transaction = model._createTransaction( attrs, a_options );
                transaction && nested.push( transaction );
            }
        }
        else{
            model = toModel( collection, item, a_options );

            models.push( model );
            aquire( collection, model );
            addIndex( _byId, model );
        }
    }

    return models.slice( prevLength );
}
