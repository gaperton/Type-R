import { getOwnerEndpoint, startIO, IOEndpoint, IOPromise, IONode } from '../io-tools'

export interface IORecord extends IONode {
    getEndpoint() : IOEndpoint
    save( options? : object ) : IOPromise<any>
    fetch( options? : object ) : IOPromise<any>
    destroy( options? ) : IOPromise<any>
    toJSON() : any
    isNew() : boolean
    id : string | number
    set( json : object, options : object )
}

export const IORecordMixin = {
    getEndpoint( this : IORecord ) : IOEndpoint {
        return getOwnerEndpoint( this ) || this._endpoint;
    },

    save( this : IORecord, options : object = {} ){
        const endpoint = this.getEndpoint(),
              json = this.toJSON();

        return startIO(
            this,
            this.isNew() ?
                endpoint.create( json, options ) :
                endpoint.update( this.id, json, options ),
            options,

            update => {
                this.set( update, { parse : true, ...options } );
            }
        );
    },

    fetch( options = {} ){
        return startIO(
            this,
            this.getEndpoint().read( this.id, options ),
            options,

            json => this.set( json, { parse : true, ...options } )
        );
    },

    fetchAttributes( options = {} ){
        // Select list of attributes with fetch...
        const names = this.keys().filter( name => this[ name ] && this[ name ].fetch ),
              promises = names.map( name => this[ name ].fetch( options ) ),
              promise = Promise.all( promises );

        promise.abort = function(){
            promises.forEach( x => x.abort && x.abort() );
        }

        return startIO( this, promise, options, x => x );
    },

    destroy( options = {} ){  
        return startIO(
            this,
            this.getEndpoint().destroy( this.id, options ),
            options,

            () => {
                const { collection } = this;
                if( collection ){
                    collection.remove( this, options );
                }
                else{
                    this.dispose();
                }
            }
        )
    }
}

declare var Promise;