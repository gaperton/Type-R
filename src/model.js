/**
 * Core model transactions
 *
 * Generic Ownerwhip
 * Deep changes
 *
 * Scenarios:
 * Implicit transactions:
 *  - model.x = 5;
 *  - model.nested = { some: 'thing };
 *  - model.set({ some : 'thing' });
 *
 *  Things to consider:
 *  - listeners to 'change:attr', chained change including deep.
 *  - listeners to 'change', chained chane including deep
 *  All listeners must be executed inside of current transaction.
 *  Must be optimized for object sync (full updates).
 *  Major use case - I/O transactions.
 *
 * Explicit transactions:
 * model.transaction
 *  - model.x = 5;
 *  - model.nested = { some: 'thing };
 *  - model.set({ some : 'thing' });
 *  - nested transaction statement.
 * Things to consider:
 * - change:attr must happen instantly in this case.
 * Major use case - data manipulations.
 *
 * (!) Note: Object sync
 *  - normally will touch all subtree, so it's okay to traverse complete subtree.
 *
 * (!) In transactional mode, change:attr must be immediate.
 *
 * Methods:
 * set( { attrs } )
 * transaction
 *
 * @attributes({
 *
 * })
 * class
 *
 *
 *
 */

function setOwner( owner, object, key ){
    object._owner = owner;
    object._ownerKey = key;
}

function notifyOwnerOnChange( object ){
    const { _owner } = object;
    if( _owner ){
        _owner._onNestedChange( object );
    }
}


function setSingleAttr( model, key, value ){
    const isRoot = begin( model );

    var options   = {},
        prevValue = current[ key ],
        val       = attrSpec.transform( value, options, model, key );

    current[ key ] = val;

    if( attrSpec.isChanged( prevValue, val ) ){
        model._pending = options;
        trigger3( model, 'change:' + key, model, val, options );
    }

    isRoot && commit( model, {} );
}

class Model {
    constructor( attrs, options ){
        this.attributes = this.defaults();
    }

    get collection(){
        return this._ownerKey ? this._owner : null;
    }

    _onNestedChange( object ){
        if( this._changing ){
            // inside of transaction it's enough, if it's guaranteed that there will be single callback per .set
            this._changes.push( key );
            this._pending = true;
        }
        else{
            // make transaction, touch single attribute
        }
    }
}

function begin( model ){
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing = true;
        model._pending  = false;

        model._previousAttributes = new model.Attributes( model.attributes );
        model.changed             = new model.Attributes( {} );
    }

    return isRoot;
}

function commit( model, options ){
    if( !options.silent ){
        while( model._pending ){
            model._pending = false;
            model.trigger( 'change', model, options );
        }
    }

    model._changing = false;
}

function attrHasChanges( model, key, value ){
    model._pending = true;
    model.changed[ key ] = model.attributes[ key ] = value;
    model.trigger( 'change:' + key, model, value, this.options );
}

function touchAttr( model, key ){
    const isRoot = begin( model );
    attrHasChanges( model, key, model.attributes[ key ] );
    isRoot && commit( model );
}

function transaction( model, fun, options = {} ){
    const isRoot = begin( model );

    fun( model );

    isRoot && commit( model, options );
}




