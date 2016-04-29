/**
 * Everything related to record's transactional updates
 */

interface ITransactional {
    _changing : boolean
    Attributes : new ( values : {} ) => {}
    _previousAttributes : {}
    attributes : {}
    _attributes : {}
    forEachAttr : ( values : {}, iterator : ( value, key : string ) => void ) => void
    _pending : boolean
    _owner : any
}

export class TransactionalMixin {
    _changing : boolean
    Attributes : new ( values : {} ) => {}
    _previousAttributes : {}
    attributes : {}
    _attributes : {}
    forEachAttr : ( values : {}, iterator : ( value, key : string ) => void ) => void
    _pending : boolean
    _owner : any
    
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
function begin( model : ITransactional ) : boolean {
    const isRoot = !model._changing;

    if( isRoot ){
        model._changing           = true;
        model._previousAttributes = new model.Attributes( model.attributes );
    }

    return isRoot;
}

function commit( model : ITransactional, options ){
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

export class Transaction {
    isRoot : boolean
    changes : string[]
    nested : Transaction[]
    
    // open transaction
    constructor( public model : ITransactional, values : {}, public options = {} ){
        this.isRoot  = begin( model );
        
        const { attributes, _attributes } = model;
        const changes = this.changes = [],
              nested = this.nested  = [];

        model.forEachAttr( values, ( value, key ) => {
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
    }

    // commit transaction
    commit(){
        const { nested, model, options } = this;

        // Commit all nested transactions...
        for( let i = 0; i < nested.length; i++ ){
            nested[ i ].commit();
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
