import { AnyType } from './any'
import { Owner, transactionApi, Transactional, ItemsBehavior, TransactionOptions } from '../../transactions'
import { tools } from '../../object-plus'
import { AttributesContainer, ConstructorOptions } from './updates'
import { ValidationError } from '../../validation'

const { free, aquire } = transactionApi;

export class AggregatedType extends AnyType {
    type : typeof Transactional

    clone( value : Transactional ) : Transactional {
        return value ? value.clone() : value;
    }

    toJSON( x ){ return x && x.toJSON(); }

    doInit( record : AttributesContainer, value, options : ConstructorOptions ){
        const v = options.clone ? this.clone( value ) : (
            value === void 0 ? this.defaultValue() : value
        );

        const x = this.transform( v, options, void 0, record );
        this.handleChange( x, void 0, record );
        return x;
    }

    doUpdate( record, value, options, nested : any[] ){ // Last to things can be wrapped to an object, either transaction or ad-hoc
        const key = this.name, { attributes } = record; 
        const prev = attributes[ key ];
        let update;

        // This can be moved to transactional attribute. And chained with the rest.
        if( update = this.canBeUpdated( prev, value, options ) ) { // todo - skip empty updates.
            const nestedTransaction = prev._createTransaction( update, options );
            if( nestedTransaction ){
                if( nested ){
                    nested.push( nestedTransaction );
                }
                else{
                    nestedTransaction.commit( record );
                }

                if( this.propagateChanges ) return true;
            }

            return false;
        }

        const next = this.transform( value, options, prev, record );
        attributes[ key ] = next;

        if( this.isChanged( next, prev ) ) { // Primitives and nested comparison can be inlined.
            // Do the rest of the job after assignment
            this.handleChange( next, prev, record );

            return true;
        }

        return false;
    }

    canBeUpdated( prev : Transactional, next : any, options : TransactionOptions ) : any {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        if( prev && next != null ){
            if( next instanceof this.type ){
                // In case if merge option explicitly specified, force merge.
                if( options.merge ) return next.__inner_state__;
            }
            else{
                return next;
            }
        }
    }

    convert( value : any, options : TransactionOptions, prev : any, record : AttributesContainer ) : Transactional {
        // Invoke class factory to handle abstract classes
        if( value == null ) return value;
        
        if( value instanceof this.type ){
            if( value._shared && !( value._shared & ItemsBehavior.persistent ) ) { // TODO: think more about shared types assignment compatibility. 
                this._log( 'error', 'aggregated collection attribute is assigned with shared collection', value, record );
            }

            // With explicit 'merge' option we need to clone an object if its previous value was 'null'.
            // This is an only case we could be here when merge === true.
            return options.merge ? value.clone() : value;
        }

        return <any>this.type.create( value, options );
    }

    dispose ( record : AttributesContainer, value : Transactional ){
        if( value ){
            // WTF????! Must it be disposed as the part of the handleChange?
            this.handleChange( void 0, value, record );
            value.dispose();
        }
    }

    validate( record : AttributesContainer, value : Transactional ) : ValidationError {
        var error = value && value.validationError;
        if( error ) return error;
    }

    create() : Transactional {
        return (<any>this.type).create(); // this the subclass of Transactional here.
    }

    initialize( options ){
        options.changeHandlers.unshift( this._handleChange );
    }

    _handleChange( next : Transactional, prev : Transactional, record : AttributesContainer ){
        prev && free( record, prev );
        
        if( next && !aquire( record, next, this.name ) ){
            this._log( 'error', 'aggregated attribute assigned with object already having an owner', next, record );
        }
    }
}