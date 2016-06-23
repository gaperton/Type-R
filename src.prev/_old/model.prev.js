import {Class, defaults} from './class+'
/*
 Core model API.

 1)
 @define({
 attributes : {
 ...
 }
 })
 class MyModel extends Model {}

 2)

 class MyModel extends Model {}
 MyModel.define({
 attributes : {
 ...
 }
 })

 3)

 class MyModel extends Model {}
 MyModel.Collection = class extends Model.Collection {}

 MyModel.define({
 attributes : {
 ...
 }
 })


 */


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

function commit( model, isRoot, options ){
    // Trigger all relevant attribute changes.
    if( !options.silent ){
        let changes = model._changes;
        if( changes.length ) this._pending = true;

        for( var i = 0; i < changes.length; i++ ){
            this.trigger( 'change:' + changes[ i ], this, current[ changes[ i ] ], options );
        }
    }

    if( isRoot && !options.silent ){
        while( model._pending ){
            model._pending = false;
            model.trigger( 'change', model, options );
        }
    }

    model._changing = false;
}

function attrHasChanges( model, key, value ){
    model._pending       = true;
    model.changed[ key ] = model.attributes[ key ] = value;
    model.trigger( 'change:' + key, model, value, this.options );
}

function touchAttr( model, key ){
    const isRoot = begin( model );
    attrHasChanges( model, key, model.attributes[ key ] );
    isRoot && commit( model );
}


function _onNestedChange( object, key ){
    // if the part of object sync...
    if( this._changed ){
        this._changes.push( key );
        this._pending = true;
    }
    else if( this._changing ){
        // inside of transaction it's enough, if it's guaranteed that there will be single callback per .set 

    }
    else{
        // make transaction, touch single attribute
    }
}


var isChanged = attrSpec.assign( value, options, model, key );



function assign( value, options, model, key ){ //<- todo: too many params. Introduce transaction context? model + options + attrs...
///================
    const compatibleType = value == null || value instanceof this.type,
          existing       = model.attributes[ key ];

    if( existing && !compatibleType ){
        return existing.setState( value, options );
    } // <- is not the part of regular pipeline. It's not cast which can be exected after hook.
    // todo: move this out of the pipeline.

    return this.pipeline( compatibleType ? value : this.create( value, options ), existing, model, key );
}

// Guaranteed that here's compatible type
function pipeline( next, prev, model, key ){
////================

    // hook... Optional pipeline stage

///========================================
    // Check for changes...
    if( this.isChanged( next ) ){

        // Ownership... Optional pipeline stage

        // Events... Optional pipeline stage

        // Assignment
        model.attributes[ key ] = next;
        return true;
    }

    return true;
}

/**
 primitive type assign

 */
function assign( value, options, model, key ){
///================
    const compatibleType = value == null || primitives[ typeof value ];

    return this.pipeline( compatibleType ? value : this.create( value ), existing, model, key );
}
