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
    it( '@define makes plain class mixable', () =>{
        @define class X {}

        expect( (X as any).define ).to.exist;
    });

    it( '@define( props ) assign members to class proto', () =>{
        @define({ a : 1, b : 2 }) class X {
            a(){}
        }

        expect( (X as any).prototype.b ).to.equal( 2 );
        expect( (X as any).prototype.a ).to.equal( 1 );
    });

    it( '@define does nothing when extend mixable', () =>{
        @define class X extends Mixable {}

        expect( (X as any).define ).to.exist;
    });

    it( "merges in the plain objects", () =>{
        @define 
        @mixins( M )
        class X extends Mixable {
        }

        expect( X.prototype ).to.contain( M );
    });
});