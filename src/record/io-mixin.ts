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
                endpoint.create( json, options, this ) :
                endpoint.update( this.id, json, options, this ),
            options,

            update => {
                this.set( update, { parse : true, ...options } );
            }
        );
    },

    fetch( options = {} ){
        return startIO(
            this,
            this.getEndpoint().read( this.id, options, this ),
            options,

            json => this.set( json, { parse : true, ...options } )
        );
    },

    destroy( options = {} ){  
        return startIO(
            this,
            this.getEndpoint().destroy( this.id, options, this ),
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