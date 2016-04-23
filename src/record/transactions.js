/**
 * Everything related to record's transactional updates
 */

export const RecordMixin = {
    createTransaction( values, options = {} ) {
        const transaction = new Transaction( this ),
              { changes, nested } = transaction,
              { attributes, _attributes } = this;

        this.forEachAttr( values, ( value, key ) => {
            const attr = _attributes[ key ],
                  prev = attributes[ key ];

            // handle deep update...
            if( attr.canBeUpdated ) {
                if( prev && attr.canBeUpdated( value ) ) {
                    nested.push( prev.createTransaction( value, options ) );
                    return;
                }
            }

            // cast and hook...
            const next = attr.transform( value, options, prev, this );

            if( attr.isChanged( next, prev ) ) {
                attributes[ key ] = next;
                changes.push( key );

                // Do the rest of the job after assignment
                attr.handleChange( next, prev );
            }
        } );

        return transaction;
    },

    transaction( fun, options ) {
        const isRoot = begin( this );
        fun( this );
        isRoot && commit( this, options );
    },

    /**
     * Change event handlers and triggers
     */
    _onChildrenChange( child, options ) {
        // Touch attribute in bounds of transaction
        const isRoot = begin( this );

        if( !options.silent ) {
            this._pending = options;
            this._notifyChangeAttr( child._ownerAttr, options );
        }

        isRoot && commit( this, options );
    }
};

 // fast-path set attribute transactional function
export function setAttribute( model, name, value ) {
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
                spec.handleChange( next, prev );
            }

            model._pending = options;
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
function begin( model ){
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

function commit( model, options ){
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
    // open transaction
    constructor( model ){
        this.isRoot  = begin( model );
        this.model   = model;
        this.changed = [];
        this.nested  = [];
    }

    // commit transaction
    commit( options = {} ){
        const { nested, model } = this;

        // Commit all nested transactions...
        for( let i = 0; i < nested.length; i++ ){
            nested[ i ].commit( options );
        }

        // Notify listeners on attribute changes...
        if( !options.silent ){
            const { changed } = this;

            if( changed.length ){
                model._pending = options;
            }

            for( let i = 0; i < changed.length; i++ ){
                model._notifyChangeAttr( changed[ i ], options )
            }
        }

        this.isRoot && commit( model, options );
    }
}
