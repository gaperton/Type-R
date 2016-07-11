/**
 * 1. Need to be optimized for set
 * 2. Set needs an option to 
 */
import { Collection } from './transaction.ts'


export class TCollection {
    set( elements, options = {} ){
        if( options.remove === false ){

        }
        else if( this.models)
    }

    // Ownership and events subscription
    _addReference( model ){
        model._owner || ( model._owner = this );
        return model;
    }

    _removeReference( model ){
        if( this === model._owner ){
            model._owner = void 0;
        }
    }
}