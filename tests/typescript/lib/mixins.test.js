import * as tslib_1 from "tslib";
import { Mixable, define, predefine, mixins, mixinRules, definitions } from 'type-r';
import { expect } from 'chai';
const M = {
    num: 1,
    nul: null,
    undef: void 0,
    obj: { hi: 'there' },
    fun() { },
    arr: [],
    fwd(arr) { arr.push("M"); },
    bck(arr) { arr.push("M"); }
};
class C {
    b() { }
    fwd(arr) { arr.push("C"); }
    bck(arr) { arr.push("C"); }
}
C.a = 1;
describe("Forward declarations", () => {
    it('@predefine calls onExtend hook', () => {
        let called = 0;
        let X = class X {
            static onExtend(BaseClass) {
                expect(BaseClass).to.eql(Object);
                called++;
            }
        };
        X = tslib_1.__decorate([
            predefine
        ], X);
        expect(called).to.eql(1);
    });
});
describe("@define decorator", () => {
    it('@define makes plain class mixable', () => {
        let X = class X {
        };
        X = tslib_1.__decorate([
            define
        ], X);
        expect(X.define).to.exist;
    });
    it('@define calls onDefine hook', () => {
        let called = 0;
        let X = class X {
            static onDefine(spec, BaseClass) {
                called++;
                expect(spec).to.eql({});
                expect(BaseClass).to.eql(Object);
            }
        };
        X = tslib_1.__decorate([
            define({ a: 1 })
        ], X);
        expect(X.define).to.exist;
        expect(called).to.eql(1);
    });
    it('@define does nothing when extend mixable', () => {
        let X = class X extends Mixable {
        };
        X = tslib_1.__decorate([
            define
        ], X);
        expect(X.__super__).to.eql(Mixable.prototype);
    });
    it('@define( props ) assign members to class proto', () => {
        let X = class X {
            a() { }
        };
        X = tslib_1.__decorate([
            define({
                a: 1,
                b: 2
            })
        ], X);
        expect(X.prototype.b).to.eql(2);
        expect(X.prototype.a).to.eql(1);
    });
    it('Mixable.extend creates the subclass', () => {
        const X = Mixable.extend({ a: 5 });
        const x = new X();
        expect(x.a).to.eql(5);
        expect(x).to.be.instanceof(Mixable);
    });
    it('allows toString() and valueOf() override', () => {
        let Base = class Base extends Mixable {
            toString() { return "base"; }
            valueOf() { return 'base'; }
        };
        Base = tslib_1.__decorate([
            define
        ], Base);
        let Sub = class Sub extends Base {
            toString() { return "sub"; }
            valueOf() { return 'sub'; }
        };
        Sub = tslib_1.__decorate([
            define
        ], Sub);
        const base = new Base(), sub = new Sub();
        expect(base.toString()).to.eql('base');
        expect(base.valueOf()).to.eql('base');
        expect(sub.toString()).to.eql('sub');
        expect(sub.valueOf()).to.eql('sub');
    });
    it('allows toString() and valueOf() override with .extend()', () => {
        const Base = Mixable.extend({
            toString() { return "base"; },
            valueOf() { return 'base'; }
        });
        const Sub = Base.extend({
            toString() { return "sub"; },
            valueOf() { return 'sub'; }
        });
        const base = new Base(), sub = new Sub();
        expect(base.toString()).to.eql('base');
        expect(base.valueOf()).to.eql('base');
        expect(sub.toString()).to.eql('sub');
        expect(sub.valueOf()).to.eql('sub');
    });
    it("gives priority to the class definition", () => {
        let X = class X extends Mixable {
            nul() { }
        };
        X = tslib_1.__decorate([
            define({
                undef: 1
            }),
            mixins(M)
        ], X);
        expect(X.prototype.nul).to.be.instanceof(Function);
        expect(X.prototype.undef).to.be.eql(1);
    });
});
describe('@mixins', () => {
    it("merges in the plain objects", () => {
        let X = class X extends Mixable {
        };
        X = tslib_1.__decorate([
            define,
            mixins(M)
        ], X);
        expect(X.prototype).to.contain(M);
    });
    it("don't merge same mixin twice", () => {
        let X = class X extends Mixable {
        };
        X = tslib_1.__decorate([
            define,
            mixins(M, M)
        ], X);
        expect(X.mixins.appliedMixins.length).to.equal(1);
        let Y = class Y extends X {
        };
        Y = tslib_1.__decorate([
            define, mixins(M)
        ], Y);
        expect(Y.mixins.appliedMixins.length).to.equal(1);
    });
    it("mix in classes", () => {
        let X = class X {
        };
        X = tslib_1.__decorate([
            define, mixins(C)
        ], X);
        const x = new X();
        expect(X.a).to.eql(1);
        expect(x.b).to.be.instanceof(Function);
    });
    it("mix in sequence", () => {
        const A = { a: 1, b: 1 }, B = { a: 2 };
        let X = class X {
        };
        X = tslib_1.__decorate([
            define, mixins(B, A)
        ], X);
        const x = new X();
        expect(x.a).to.eql(2);
        expect(x.b).to.eql(1);
    });
    it('merge methods from mixin if they are not locally defined', () => {
        let Base = class Base {
            first() { }
        };
        Base = tslib_1.__decorate([
            define
        ], Base);
        const Mix = {
            first() { },
            second() { }
        };
        let Y = class Y extends Base {
            second() { }
        };
        Y = tslib_1.__decorate([
            define, mixins(Mix)
        ], Y);
        expect(Y.prototype.second).to.not.eql(Mix.second);
        expect(Y.prototype.first).to.eql(Mix.first);
    });
});
describe('mixin rules', () => {
    let X = class X {
    };
    X = tslib_1.__decorate([
        define,
        mixins(M, C),
        mixinRules({
            fwd: mixinRules.classFirst,
            bck: mixinRules.classLast
        })
    ], X);
    it('chains functions when merge rules are defined', () => {
        const x = new X();
        const fwda = [], bcka = [];
        x.fwd(fwda);
        expect(fwda).to.have.ordered.members(["M", "C"]);
        x.bck(bcka);
        expect(bcka).to.have.ordered.members(["C", "M"]);
    });
    it('chains function on inheritance', () => {
        let Y = class Y extends X {
            fwd(arr) { arr.push('Y'); }
            bck(arr) { arr.push('Y'); }
        };
        Y = tslib_1.__decorate([
            define,
            mixins({
                fwd(arr) { arr.push('Z'); },
                bck(arr) { arr.push('Z'); }
            })
        ], Y);
        const y = new Y();
        const fwda = [], bcka = [];
        y.fwd(fwda);
        expect(fwda).to.have.ordered.members(["Y", "Z", "M", "C"]);
        y.bck(bcka);
        expect(bcka).to.have.ordered.members(["C", "M", "Z", "Y"]);
    });
});
describe('@definitions', () => {
    it('extract definitions from statics', () => {
        let Y = class Y {
            static onDefine(spec) {
                expect(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            }
        };
        Y.a = 'a';
        Y.b = { a: 1 };
        Y = tslib_1.__decorate([
            define,
            definitions({
                a: mixinRules.value,
                b: mixinRules.merge
            })
        ], Y);
    });
    it('extract definitions from @define parameter', () => {
        let Y = class Y {
            static onDefine(spec) {
                expect(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            }
        };
        Y = tslib_1.__decorate([
            define({
                a: 'a',
                b: { a: 1 }
            }),
            definitions({
                a: mixinRules.value,
                b: mixinRules.merge
            })
        ], Y);
    });
    it('extract definitions from mixins', () => {
        let Y = class Y {
            static onDefine(spec) {
                expect(spec).to.deep.equal({ a: 'a', b: { a: 1, b: 1, c: 1 } });
                this.prototype.zzz = 'Hurrah!';
            }
        };
        Y.b = { c: 1 };
        Y = tslib_1.__decorate([
            define({
                a: 'a',
                b: { a: 1 }
            }),
            mixins({
                a: 'no',
                b: { b: 1, a: 2 }
            }),
            definitions({
                a: mixinRules.value,
                b: mixinRules.merge
            })
        ], Y);
    });
});
//# sourceMappingURL=mixins.test.js.map