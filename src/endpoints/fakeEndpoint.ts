import { createIOPromise, IOPromise } from '../io-tools'

export default abstract class FakeEndpoint {
    constructor( public delay : number ){}

    resolve( value ){
        return createIOPromise( ( resolve, reject ) => {
            setTimeout( () => resolve( value ), this.delay );
        });
    }
    
    reject( value ){
        return createIOPromise( ( resolve, reject ) => {
            setTimeout( () => reject( value ), this.delay );
        });
    }
}