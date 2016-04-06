/**
 * Core model transactions
 *
 * `model.changed` serves as _changeToken.
 */

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


function _onNestedChange( object, key ){
    if( this._changing ){
        // inside of transaction it's enough, if it's guaranteed that there will be single callback per .set 
        this._changes.push( key );
        this._pending = true;
    }
    else{
        // make transaction, touch single attribute
    }
}


