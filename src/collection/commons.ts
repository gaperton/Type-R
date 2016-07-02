/**
 * Helper functions
 */

export function dispose( collection ){
    var models = collection.models;

    collection.models = [];
    collection._byId  = {};

    for( var i = 0; i < models.length; i++ ){
        collection.removeReference( models[ i ] );
    }

    return models;
}

// Index management
export function addIndex( _byId, model ){
    _byId[ model.cid ] = model;
    var id             = model.id;
    
    if( id != null ){
        _byId[ id ] = model;
    }
}

export function removeIndex( _byId, model ){
    delete _byId[ model.cid ];
    var id = model.id;
    if( id != null ){
        delete _byId[ id ];
    }
}

// convert argument to model. Return false if fails.
export function toModel( collection, attrs, options ){
    const { Record } = collection;
    return attrs instanceof Record ? attrs : Record.create( attrs, options, collection );
}

export function convertAndRef( collection, attrs, options ){
    const { Record } = collection,
    	  record = attrs instanceof Record ? attrs : Record.create( attrs, options, collection );

    record._owner || ( record._owner = collection );
    return record;
}