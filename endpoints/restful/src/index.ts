import { IOEndpoint, IOOptions, IOPromise, createIOPromise } from 'type-r'

export type Index = number[];

export function create( key : string ){
    return new RestfulEndpoint( key );
}

export { create as restfulIO }

export interface RestfulIOOptions extends IOOptions {
    params? : object,
    options? : RequestInit
}

export class RestfulEndpoint implements IOEndpoint {
    constructor( public root : string ){
    }

    create( json, options : RestfulIOOptions ) {
        return jsonRequest( 'POST', this.collectionUrl( options ), options );
    }

    update( id, json, options : RestfulIOOptions ) {
        return jsonRequest( 'PUT', this.objectUrl( id, options ), options );
    }

    read( id, options : IOOptions ){
        return jsonRequest( 'GET', this.objectUrl( id, options ), options );
    }

    protected objectUrl( id, options ){
        return appendParams( this.root + "/" + id, options.params );
    }

    protected collectionUrl( options ){
        return appendParams( this.root, options.params );
    }

    destroy( id, options : RestfulIOOptions ){
        return jsonRequest( 'DELETE', this.objectUrl( id, options ), options );
    }

    list( options? : RestfulIOOptions ) {
        return jsonRequest( 'GET', this.collectionUrl( options ), options );
    }

    subscribe( events ) : any {}
    unsubscribe( events) : any {}
}

function appendParams( url, params? ){
    var esc = encodeURIComponent;
    return params ? url + '?' + Object.keys(params)
                    .map(k => esc(k) + '=' + esc(params[k]))
                    .join('&') :
                url;
}


function jsonRequest( method, url, { options } : RestfulIOOptions, body? ){
    const { headers, ...rest } = options as any,
        oo = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            ...rest
        };

    if( body ) oo.body = JSON.stringify( body );

    return fetch( url, oo ).then( response => response.json() );
}