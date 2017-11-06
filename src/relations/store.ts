import { Record } from '../record'
import { Transactional } from '../transactions'
import { startIO, IOPromise } from '../io-tools'

let _store : Store = null;

export class Store extends Record {
    getStore() : Store { return this; }
 
    // delegate item lookup to owner, and to the global store if undefined
    get( name : string ) : any {
        // Lookup for resource in the current store. 
        let local = this[ name ];

        // If something is found or it's the global store, return result.
        if( local || this === this._defaultStore ) return local;

        // Forward failed lookup to owner or global store.
        return this._owner ? this._owner.get( name ) : this._defaultStore.get( name ); 
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

declare var Promise;

export class IOGroupStore extends Store {
    /**
     * Fetch from all or specified endpoints
     */ 
    fetch( options = {} ){
        // Select list of attributes with fetch...
        const names = this.keys().filter( name => this[ name ].fetch ),
              promises = names.map( name => this[ name ].fetch( options ) ),
              promise = Promise.all( promises );

        promise.abort = function(){
            promises.forEach( x => x.abort && x.abort() );
        }

        return startIO( this, promise, options, x => x );
    }
}

IOGroupStore.prototype.save = () => {
    throw new ReferenceError( 'GroupStore does not support save() method' );
}

IOGroupStore.prototype.destroy = () => {
    throw new ReferenceError( 'GroupStore does not support destroy() method' );
}