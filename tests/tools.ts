import { Class, define } from '../tools'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe('Mixins', () => {
    it('merges objects to the prototype, if they are not defined', () => {

    });

    it('works on a plain class', () => {

    });

    describe('mixin rules', () => {
        it('merges object properties');
        it('merges rules on inheritance');
        it('works on the plain class');

        describe('methods composition', () => {
            it('execute methods sequentially');
            it('execute methods in reverse order');
            it('pipeline methods passing the first argument through');
        });

        describe('boolean methods composition', () => {
            it('joins checks by "and"');
            it('joins checks by "or"');
        });
    });
});

describe('Class#define', () => {
    it('adds members to the prototype', () => {
        class C extends Class { }

        C.define({
            a: 'a'
        });

        expect(C.prototype.a).equal('a');
    });

    it('defines properties passed in "properties" spec', () => {
        class C extends Class { }

        C.define({
            properties: {
                p: {
                    get() { return "Hey"; }
                }
            }
        });

        const c = new C();
        expect( c.p ).to.equal('Hey');
    });

    it('clear up "create" factory method on inheritance', () => {
        class A extends Class {
            static create() { return "Hello"; }
        }
        A.define();

        class B extends A {}
        B.define();

        expect(B.create()).to.be.instanceOf(B);
    });

    it('merges mixin rules on inheritance', () => {
        @define({
            mixinRules: {
                a: 'merge'
            }
        })
        class A extends Class {
            static create() { return "Hello"; }
        }

        expect(A._mixinRules.a).to.eql('merge');

        @define({
            mixinRules: {
                b: 'merge'
            }
        })
        class B extends A { }

        expect(B._mixinRules.a).to.eql('merge');
        expect(B._mixinRules.b).to.eql('merge');

    });
});