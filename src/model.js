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

export class Model extends Class {
    static define( spec ){
        // Create collection
        if( this.Collection === BaseModel.Collection ){
            this.Collection = class extends BaseModel.Collection {};
        }

        if( spec ){
            // define stuff
            super.define( compile( spec ) );

            const collectionSpec = defaults( {}, spec.collection || {}, {
                model : this
            } );

            this.Collection.define( collectionSpec );
        }
    }

    constructor( attrs, options ){

    }

    /**
     * Clone model
     * @param options - { deep : false } makes shallow copy
     */
    clone( options = { deep : true } ){
        return new this.constructor( this.attributes, options );
    }

    /**
     * Create attribute values for subsequent `set`
     * @param attrs
     */
    defaults( attrs ){}

    /**
     * Model sync function
     * Uses transaction
     * Returns whenever there are any changes
     * Doesn't notify owner on change
     * @param attrs
     * @param options
     */
    setState( attrs, options, partOf ){

    }

    set( attrs, globalOptions, localOptions ){
        switch( typeof attrs ){
            case 'string' : return setSingleAttr( this, attrs, globalOptions, localOptions );
            case 'object' : return setState( this, attrs, globalOptions, localOptions );
        }

        if( this.setState( attrs, options ) && this._owner ){
            this._owner._onNestedChange( this, this._ownerKey );
        }

        return true;
    }

    transaction( fun, options ){
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    /**
     * transaction traversal API
     * @param attr
     */
    hasChanged( attr ){
        // todo: must be evaluated taken nested changes into account.
        // => need to build `changed` hash strictly
        // Consider structure: null || { attr : Boolean }
    }

    changedAttributes( diff ){}

    previous( attr ){
        const attributes = this._previousAttributes;
        return attributes && attributes[ attr ]; // todo: execute `get` hook.
    }

    previousAttributes(){
        return new this.Attributes( this._previousAttributes || {} );
    }

    get changed(){
        // todo: create and cache changed hash.
    }

    // ====================

    _onNestedChange( object, key ){
        if( this._changing ){
            let _changed = this._changed || ( this._changed = new this.Attributes({}) );
            _changed[ key ] = true;

            // inside of transaction it's enough, if it's guaranteed that there will be single callback per .set
            this._changes.push( key );
            this._pending = true;
        }
        else{
            // make transaction, touch single attribute
        }
    }
}

Model.mixinRules = { collection : 'merge' };

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



function assign( value, options, model, key ){
///================
    const compatibleType = value == null || value instanceof this.type,
          existing       = model.attributes[ key ];

    if( existing && !compatibleType ){
        return existing.setState( value, options );
    }

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
