import { Mixable, define, mixins } from './index';
import { expect } from 'chai'

const M = {
    num : 1,
    nul : null,
    undef : void 0,
    obj : { hi : 'there' },
    fun(){},
    arr : []
}

describe( "Mixins", () =>{
    it( "merges in the plain objects", () =>{
        @define 
        @mixins( M )
        class X extends Mixable {
        }

        expect( X.prototype ).to.contain( M );
    });
});