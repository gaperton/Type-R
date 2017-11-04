import { IOEndpoint, IOPromise, createIOPromise } from '../io-tools'
import FakeEndpoint from './fakeEndpoint'

export type Index = number[];

export default function memoryIO( delay = 1000 ){
    return new MemoryIOEndpoint( delay );
}

export class MemoryIOEndpoint extends FakeEndpoint implements IOEndpoint {
    constructor( delay : number ){
        super( delay );
    }

    index = [ 0 ];
    items = {};

    generateId(){
        return this.index[ 0 ]++;
    }

    create( json, options ) {
        const id = json.id = this.generateId();
        this.index.push( id );
        this.items[ id ] = json;
        return this.resolve({ id });
    }

    update( id, json, options ) {
        const existing = this.items[ id ];
        if( existing ){
            this.items[ id ] = json;
            return this.resolve( {} );
        }
        else{
            return this.reject( "Not found");
        }
    }

    read( id, options ){
        const existing = this.items[ id ];
        return existing ?
            this.resolve( existing ) : 
            this.reject( "Not found" );
    }

    destroy( id, options ){
        const existing = this.items[ id ];
        if( existing ){
            delete this.items[ id ];
            this.index = this.index.filter( x => x !== id );
            return this.resolve( {} );
        }
        else{
            return this.reject( "Not found" );
        }
    }

    list( options? : object ) {
        return this.resolve( this.index );
    }

    subscribe( events ) : any {}
    unsubscribe( events) : any {}
}