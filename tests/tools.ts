import { Class, define } from '../tools'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe( 'Mixins', () => {
    it( 'merges objects to the prototype, if they are not defined', () => {

    } );

    it( 'works on a plain class', () => {

    } );

    describe( 'mixin rules', () => {
        it( 'merges object properties' );
        it( 'merges rules on inheritance' );
        it( 'works on the plain class' );

        describe( 'methods composition', () => {
            it( 'execute methods sequentially' );
            it( 'execute methods in reverse order' );
            it( 'pipeline methods passing the first argument through' );
        } );

        describe( 'boolean methods composition', () => {
            it( 'joins checks by "and"' );
            it( 'joins checks by "or"' );
        } );
    } );
} );

describe( 'Class#define', () => {
    it( 'adds members to the prototype', ()=> {
        @define( {
                     a : 'a'
                 } )
        class C extends Class {
        }

        expect( C.prototype.a ).equal( 'a' );

    } );

    it( 'defines properties passed in "properties" spec', () => {
        @define( {
                     properties : {
                         p : {
                             get(){ return "Hey"; }
                         }
                     }
                 } )
        class C extends Class {
            p;
        }

        const c = new C();
        expect( c.p ).to.equal( 'Hey' );
    } );

    it( 'clear up "create" factory method on inheritance', ()=> {
        @define
        class A extends Class {
            static create() { return "Hello"; }
        }

        @define
        class B extends A {
        }

        expect( B.create() ).to.be.instanceOf( B );
    } );

    it( 'merges mixin rules on inheritance', () => {
        @define( {
             mixinRules : {
                 a : 'merge'
             }
         } )
        class A extends Class {
            static create() { return "Hello"; }
        }

        expect( A._mixinRules.a ).to.eql( 'merge' );

        @define({
            mixinRules : {
                b : 'merge'
            }
        })
        class B extends A {}

        expect( B._mixinRules.a ).to.eql( 'merge' );
        expect( B._mixinRules.b ).to.eql( 'merge' );

    } );
} );