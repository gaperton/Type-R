import { Record } from '../record/index.ts'
import { Transactional } from '../transactions.ts'

let _store : Store = null;

export class Store extends Record {
    getStore() : Store { return this; }
 
    // delegate item lookup to owner, and to the global store if undefined
    get( name : string ) : any {
        // Lookup for resource in the current store. 
        let local = this[ name ];

        // If something is found or it's the global store, return result.
        if( local || this === _store ) return local;

        // Forward failed lookup to owner or global store.
        return this._owner ? this._owner.get( name ) : _store[ name ]; 
    }

    static get global(){ return _store; }
    static set global( store : Store ){
        if( _store ){
          _store.dispose();
        }

        Transactional.prototype._defaultStore = _store = store;
    }
}

Store.global = new Store();