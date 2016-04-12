/**
 * Transaction object for bulk operations.
 * Encapsulate transaction logic, generalized on the case of the tree.
 * Implements two-phase commit:
 * 1) Make all changes
 * 2) Send change events
 *
 * Not clear what to do with owner change event. We already know that node is changed here.
 * (!) We could delay that until children will tell us about the change during its commit, so we can make `touch`.
 * (!) Which will work just fine.
 */

class Transaction {
    // open transaction
    constructor( model ){
        this.changing = begin( model );
        this.model = model;
        this.changed = [];
        this.nested = [];
    }

    // add nested transaction
    add( attr, transaction ){
        this.nested.push( transaction );

        /* Don't need it - children will `touch` an attribute when transaction will be commited.
        if( transaction.changed.length ){
            this.changed.push( attr );
        }*/
    }

    // commit transaction
    commit( options ){
        const { changes, nested, model } = this,
              { attributes } = model;

        if( changes.length ) model._pending = true;

        for( let i of nested ){
            nested[ i ].commit( options );
        }

        for( let i of changes ){
            const attr = changes[ i ];
            model.trigger( 'change:' + attr, attributes[ attr ], model, options );
        }

        commit( model );
    }
}


function set( attrs, options ){
    this.createTransaction( attrs, options ).commit( options );
}

function createTransaction( model, attrs, options ){
    const transaction = new Transaction( this ),
          { changes } = transaction;

    model.forEachAttr( attrs, function( value, name, spec ){
        // handle deep update...
        if( spec.deepUpdate ){
            if( prev && !spec.isCompatible( value ) ){
                transaction.add( name, prev.createTransaction( value, options ) );
                return;
            }
        }

        // cast and hook...
        const next = spec.convert( value, prev, options );

        if( spec.isChanged( next, prev ) ){
            attributes[ name ] = next;
            changes.push( name );

            // Do the rest of the job after assignment
            if( spec.handleChange ){
                spec.handleChange( nex t, prev );
            }
        }
    } );

    return transaction;
}