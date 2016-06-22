/**
 * Everything related to record's transactional updates
 */
import { Attribute } from './attribute.ts'

interface Options {
    silent? : boolean
}

interface IAttributes {
    [ key : string ] : any
}

interface IAttrSpecs {
    [ key : string ] : Attribute
}

export class TransactionalRecord implements IParent {
    _changing : boolean
    _pending : boolean
    _owner : IParent
    _previousAttributes : {}
    Attributes : new ( attrs : {} ) => IAttributes
    attributes : IAttributes
    _attributes : IAttrSpecs

    _notifyChange( options : Options ) : void {}
    _notifyChangeAttr( key : string, options : Options ) : void {}

    forEachAttr( attrs : {}, iteratee : ( value : any, key : string ) => void ){}

    createTransaction( values : {}, options : Options = {} ) : Transaction {
        const transaction = new Transaction( this ),
              { changes, nested } = transaction,
              { attributes, _attributes } = this;

        this.forEachAttr( values, ( value, key : string ) => {
            const attr = _attributes[ key ],
                  prev = attributes[ key ];

                // handle deep update...
                if( prev && attr.canBeUpdated( value ) ) {
                    nested.push( prev.createTransaction( value, options ) );
                    return;
                }

            // cast and hook...
            const next = attr.transform( value, options, prev, this );

            if( attr.isChanged( next, prev ) ) {
                attributes[ key ] = next;
                changes.push( key );

                // Do the rest of the job after assignment
                attr.handleChange( next, prev, this );
            }
        } );

        return transaction;
    }

    transaction( fun : ( self : this ) => void, options : Options = {} ) {
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    }

    /**
     * Change event handlers and triggers
     */
    _onChildrenChange( child, options : Options ) : void {
        // Touch attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ) {
            this._pending = true;
            this._notifyChangeAttr( child._ownerAttr, options );
        }

        isRoot && commit( this, options );
    }
};

 // fast-path set attribute transactional function
export function setAttribute( model : TransactionalRecord, name : string, value ) {
    const isRoot  = begin( model ),
          options = {};

    const { attributes } = model,
          spec = model._attributes[ name ],
          prev = attributes[ name ];

    // handle deep update...
    if( spec.canBeUpdated && prev && spec.canBeUpdated( value ) ) {
        prev.createTransaction( value, options ).commit( options );
    }
    else {
        // cast and hook...
        const next = spec.transform( value, options, prev, model );

        if( spec.isChanged( next, prev ) ) {
            attributes[ name ] = next;

            // Do the rest of the job after assignment
            if( spec.handleChange ) {
                spec.handleChange( next, prev, this );
            }

            model._pending = true;
            model._notifyChangeAttr( name, options );
        }
    }

    isRoot && commit( model, options );
}

/**
 * Transactional brackets
 *  begin( model ) => true | false;
 *  commit( model, options ) => void 0
 */
interface IParent {
    _onChildrenChange( child, options : Options ) : void
}

function begin( model : TransactionalRecord ){
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

function commit( model : TransactionalRecord, options : Options ){
    if( !options.silent ){
        while( model._pending ){
            model._pending = false;
            model._notifyChange( options );
        }
    }

    model._pending  = false;
    model._changing = false;

    // TODO: should it be in the transaction scope?
    // So, upper-level change:attr handlers will work in the scope of current
    // transaction. Short answer: no. Leave it like this.
    const { _owner } = model;
    if( _owner ){
        _owner._onChildrenChange( model, options );
    }
}

class Transaction {
    isRoot : boolean
    changes : string[]
    nested : Transaction[]

    // open transaction
    constructor( public model : TransactionalRecord ){
        this.isRoot  = begin( model );
        this.model   = model;
        this.changes = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options : Options = {} ){
        const { nested, model } = this;

        // Commit all nested transactions...
        for( let i = 0; i < nested.length; i++ ){
            nested[ i ].commit( options );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { changes } = this;

            if( changes.length ){
                model._pending = true;
            }

            for( let i = 0; i < changes.length; i++ ){
                model._notifyChangeAttr( changes[ i ], options )
            }
        }

        this.isRoot && commit( model, options );
    }
}
