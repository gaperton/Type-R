"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
var type_r_1 = require("type-r");
var M = {
    num: 1,
    nul: null,
    undef: void 0,
    obj: { hi: 'there' },
    fun: function () { },
    arr: [],
    fwd: function (arr) { arr.push("M"); },
    bck: function (arr) { arr.push("M"); }
};
var C = (function () {
    function C() {
    }
    C.prototype.b = function () { };
    C.prototype.fwd = function (arr) { arr.push("C"); };
    C.prototype.bck = function (arr) { arr.push("C"); };
    C.a = 1;
    return C;
}());
describe("Forward declarations", function () {
    it('@predefine calls onExtend hook', function () {
        var called = 0;
        var X = (function () {
            function X() {
            }
            X.onExtend = function (BaseClass) {
                chai_1.expect(BaseClass).to.eql(Object);
                called++;
            };
            X = tslib_1.__decorate([
                type_r_1.predefine
            ], X);
            return X;
        }());
        chai_1.expect(called).to.eql(1);
    });
});
describe("@define decorator", function () {
    it('@define makes plain class mixable', function () {
        var X = (function () {
            function X() {
            }
            X = tslib_1.__decorate([
                type_r_1.define
            ], X);
            return X;
        }());
        chai_1.expect(X.define).to.exist;
    });
    it('@define calls onDefine hook', function () {
        var called = 0;
        var X = (function () {
            function X() {
            }
            X.onDefine = function (spec, BaseClass) {
                called++;
                chai_1.expect(spec).to.eql({});
                chai_1.expect(BaseClass).to.eql(Object);
            };
            X = tslib_1.__decorate([
                type_r_1.define({ a: 1 })
            ], X);
            return X;
        }());
        chai_1.expect(X.define).to.exist;
        chai_1.expect(called).to.eql(1);
    });
    it('@define does nothing when extend mixable', function () {
        var X = (function (_super) {
            tslib_1.__extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = tslib_1.__decorate([
                type_r_1.define
            ], X);
            return X;
        }(type_r_1.Mixable));
        chai_1.expect(X.__super__).to.eql(type_r_1.Mixable.prototype);
    });
    it('@define( props ) assign members to class proto', function () {
        var X = (function () {
            function X() {
            }
            X.prototype.a = function () { };
            X = tslib_1.__decorate([
                type_r_1.define({
                    a: 1,
                    b: 2
                })
            ], X);
            return X;
        }());
        chai_1.expect(X.prototype.b).to.eql(2);
        chai_1.expect(X.prototype.a).to.eql(1);
    });
    it('Mixable.extend creates the subclass', function () {
        var X = type_r_1.Mixable.extend({ a: 5 });
        var x = new X();
        chai_1.expect(x.a).to.eql(5);
        chai_1.expect(x).to.be.instanceof(type_r_1.Mixable);
    });
    it('allows toString() and valueOf() override', function () {
        var Base = (function (_super) {
            tslib_1.__extends(Base, _super);
            function Base() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Base.prototype.toString = function () { return "base"; };
            Base.prototype.valueOf = function () { return 'base'; };
            Base = tslib_1.__decorate([
                type_r_1.define
            ], Base);
            return Base;
        }(type_r_1.Mixable));
        var Sub = (function (_super) {
            tslib_1.__extends(Sub, _super);
            function Sub() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Sub.prototype.toString = function () { return "sub"; };
            Sub.prototype.valueOf = function () { return 'sub'; };
            Sub = tslib_1.__decorate([
                type_r_1.define
            ], Sub);
            return Sub;
        }(Base));
        var base = new Base(), sub = new Sub();
        chai_1.expect(base.toString()).to.eql('base');
        chai_1.expect(base.valueOf()).to.eql('base');
        chai_1.expect(sub.toString()).to.eql('sub');
        chai_1.expect(sub.valueOf()).to.eql('sub');
    });
    it('allows toString() and valueOf() override with .extend()', function () {
        var Base = type_r_1.Mixable.extend({
            toString: function () { return "base"; },
            valueOf: function () { return 'base'; }
        });
        var Sub = Base.extend({
            toString: function () { return "sub"; },
            valueOf: function () { return 'sub'; }
        });
        var base = new Base(), sub = new Sub();
        chai_1.expect(base.toString()).to.eql('base');
        chai_1.expect(base.valueOf()).to.eql('base');
        chai_1.expect(sub.toString()).to.eql('sub');
        chai_1.expect(sub.valueOf()).to.eql('sub');
    });
    it("gives priority to the class definition", function () {
        var X = (function (_super) {
            tslib_1.__extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X.prototype.nul = function () { };
            X = tslib_1.__decorate([
                type_r_1.define({
                    undef: 1
                }),
                type_r_1.mixins(M)
            ], X);
            return X;
        }(type_r_1.Mixable));
        chai_1.expect(X.prototype.nul).to.be.instanceof(Function);
        chai_1.expect(X.prototype.undef).to.be.eql(1);
    });
});
describe('@mixins', function () {
    it("merges in the plain objects", function () {
        var X = (function (_super) {
            tslib_1.__extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = tslib_1.__decorate([
                type_r_1.define,
                type_r_1.mixins(M)
            ], X);
            return X;
        }(type_r_1.Mixable));
        chai_1.expect(X.prototype).to.contain(M);
    });
    it("don't merge same mixin twice", function () {
        var X = (function (_super) {
            tslib_1.__extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = tslib_1.__decorate([
                type_r_1.define,
                type_r_1.mixins(M, M)
            ], X);
            return X;
        }(type_r_1.Mixable));
        chai_1.expect(X.mixins.appliedMixins.length).to.equal(1);
        var Y = (function (_super) {
            tslib_1.__extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y = tslib_1.__decorate([
                type_r_1.define, type_r_1.mixins(M)
            ], Y);
            return Y;
        }(X));
        chai_1.expect(Y.mixins.appliedMixins.length).to.equal(1);
    });
    it("mix in classes", function () {
        var X = (function () {
            function X() {
            }
            X = tslib_1.__decorate([
                type_r_1.define, type_r_1.mixins(C)
            ], X);
            return X;
        }());
        var x = new X();
        chai_1.expect(X.a).to.eql(1);
        chai_1.expect(x.b).to.be.instanceof(Function);
    });
    it("mix in sequence", function () {
        var A = { a: 1, b: 1 }, B = { a: 2 };
        var X = (function () {
            function X() {
            }
            X = tslib_1.__decorate([
                type_r_1.define, type_r_1.mixins(B, A)
            ], X);
            return X;
        }());
        var x = new X();
        chai_1.expect(x.a).to.eql(2);
        chai_1.expect(x.b).to.eql(1);
    });
    it('merge methods from mixin if they are not locally defined', function () {
        var Base = (function () {
            function Base() {
            }
            Base.prototype.first = function () { };
            Base = tslib_1.__decorate([
                type_r_1.define
            ], Base);
            return Base;
        }());
        var Mix = {
            first: function () { },
            second: function () { }
        };
        var Y = (function (_super) {
            tslib_1.__extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y.prototype.second = function () { };
            Y = tslib_1.__decorate([
                type_r_1.define, type_r_1.mixins(Mix)
            ], Y);
            return Y;
        }(Base));
        chai_1.expect(Y.prototype.second).to.not.eql(Mix.second);
        chai_1.expect(Y.prototype.first).to.eql(Mix.first);
    });
});
describe('mixin rules', function () {
    var X = (function () {
        function X() {
        }
        X = tslib_1.__decorate([
            type_r_1.define,
            type_r_1.mixins(M, C),
            type_r_1.mixinRules({
                fwd: type_r_1.mixinRules.classFirst,
                bck: type_r_1.mixinRules.classLast
            })
        ], X);
        return X;
    }());
    it('chains functions when merge rules are defined', function () {
        var x = new X();
        var fwda = [], bcka = [];
        x.fwd(fwda);
        chai_1.expect(fwda).to.have.ordered.members(["M", "C"]);
        x.bck(bcka);
        chai_1.expect(bcka).to.have.ordered.members(["C", "M"]);
    });
    it('chains function on inheritance', function () {
        var Y = (function (_super) {
            tslib_1.__extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y.prototype.fwd = function (arr) { arr.push('Y'); };
            Y.prototype.bck = function (arr) { arr.push('Y'); };
            Y = tslib_1.__decorate([
                type_r_1.define,
                type_r_1.mixins({
                    fwd: function (arr) { arr.push('Z'); },
                    bck: function (arr) { arr.push('Z'); }
                })
            ], Y);
            return Y;
        }(X));
        var y = new Y();
        var fwda = [], bcka = [];
        y.fwd(fwda);
        chai_1.expect(fwda).to.have.ordered.members(["Y", "Z", "M", "C"]);
        y.bck(bcka);
        chai_1.expect(bcka).to.have.ordered.members(["C", "M", "Z", "Y"]);
    });
});
describe('@definitions', function () {
    it('extract definitions from statics', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1.expect(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y.a = 'a';
            Y.b = { a: 1 };
            Y = tslib_1.__decorate([
                type_r_1.define,
                type_r_1.definitions({
                    a: type_r_1.mixinRules.value,
                    b: type_r_1.mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
    it('extract definitions from @define parameter', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1.expect(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y = tslib_1.__decorate([
                type_r_1.define({
                    a: 'a',
                    b: { a: 1 }
                }),
                type_r_1.definitions({
                    a: type_r_1.mixinRules.value,
                    b: type_r_1.mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
    it('extract definitions from mixins', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1.expect(spec).to.deep.equal({ a: 'a', b: { a: 1, b: 1, c: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y.b = { c: 1 };
            Y = tslib_1.__decorate([
                type_r_1.define({
                    a: 'a',
                    b: { a: 1 }
                }),
                type_r_1.mixins({
                    a: 'no',
                    b: { b: 1, a: 2 }
                }),
                type_r_1.definitions({
                    a: type_r_1.mixinRules.value,
                    b: type_r_1.mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
});
//# sourceMappingURL=mixins.test.js.map