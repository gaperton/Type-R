import { getOwnerEndpoint, startIO, IOOptions, IOEndpoint, IOPromise, IONode } from '../io-tools'

export interface IORecord extends IONode {
    getEndpoint() : IOEndpoint
    save( options? : IOOptions ) : IOPromise<any>
    fetch( options? : IOOptions ) : IOPromise<any>
    destroy( options? : IOOptions ) : IOPromise<any>
    toJSON() : any
    isNew() : boolean
    id : string | number
    set( json : object, options : object )
}

export const IORecordMixin = {
    save( this : IORecord, options : IOOptions = {} ){
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

    savePatch( this : IORecord, patch : object, options : IOOptions = {} ){
        // Apply patch to the record...
        ( this as any ).set( patch );

        const endpoint = this.getEndpoint();

        // Perform full save for the new models or if patch method is not supported...
        if( this.isNew() || !endpoint.patch ) return this.save();

        const json = this.toJSON();

        return startIO(
            this,
            endpoint.patch( this.id, patchToJson( patch, json ), options, this ),
            options,

            update => {
                this.set( update, { parse : true, ...options } );
            }
        );        
    },

    fetch( options : IOOptions = {} ){
        return startIO(
            this,
            this.getEndpoint().read( this.id, options, this ),
            options,

            json => this.set( json, { parse : true, ...options } )
        );
    },

    destroy( options : IOOptions = {} ){  
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

function patchToJson( patch, json ){
    const res = {};

    for( let name in patch ){
        const patchValue = patch[ name ];

        if( patchValue && Object.getPrototypeOf( patchValue ) === Object.prototype ){
            res[ name ] = patchToJson( patchValue, json[ name ] );
        }
        else{
            res[ name ] = json[ name ];
        }
    }

    return res;
}