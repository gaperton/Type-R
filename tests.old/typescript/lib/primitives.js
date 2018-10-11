"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
require("reflect-metadata");
var type_r_1 = require("type-r");
require("../../../globals");
describe('Record', function () {
    it("can be instantiated", function () {
        new type_r_1.Record();
    });
    describe('Subclass', function () {
        it("attaches properties to prototype", function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = tslib_1.__decorate([
                    type_r_1.define({
                        a: 'a'
                    })
                ], M);
                return M;
            }(type_r_1.Record));
            chai_1.expect(M.prototype.a).to.eql('a');
        });
    });
    describe("Attribute spec", function () {
        describe('...as constructors', function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr(String),
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "s", void 0);
                tslib_1.__decorate([
                    type_r_1.attr(Number),
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "n", void 0);
                tslib_1.__decorate([
                    type_r_1.attr(Boolean),
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "b", void 0);
                tslib_1.__decorate([
                    type_r_1.attr(Object),
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "o", void 0);
                tslib_1.__decorate([
                    type_r_1.attr(Array),
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "a", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Date)
                ], M.prototype, "d", void 0);
                M = tslib_1.__decorate([
                    type_r_1.define
                ], M);
                return M;
            }(type_r_1.Record));
            it("invokes constructor to create defaults", function () {
                var m = new M();
                chai_1.expect(m.s).to.equal('');
                chai_1.expect(m.n).to.equal(0);
                chai_1.expect(m.b).to.equal(false);
                chai_1.expect(m.o).to.eql({});
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined type in 'new'", function () {
                var m = new M({
                    s: 55,
                    n: "1",
                    b: 'not bool',
                    o: "not an object",
                    a: "not an array",
                    d: 678678678
                });
                chai_1.expect(m.s).to.equal('55');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.be.an.instanceOf(Object);
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined types on assignment", function () {
                var m = new M();
                m.s = 55;
                m.n = "1";
                m.b = 'not bool';
                m.o = "not an object";
                m.a = "not an array";
                m.d = 678678678;
                chai_1.expect(m.s).to.equal('55');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.be.an.instanceOf(Object);
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined types on set", function () {
                var m = new M();
                m.set({
                    s: 55,
                    n: "1",
                    b: 'not bool',
                    o: "not an object",
                    a: "not an array",
                    d: 678678678
                });
                chai_1.expect(m.s).to.equal('55');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.be.an.instanceOf(Object);
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
        });
        describe('...as default values', function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.s = 'b';
                    _this.n = 1;
                    _this.b = true;
                    _this.o = {};
                    _this.a = [];
                    return _this;
                }
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", String)
                ], M.prototype, "s", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Number)
                ], M.prototype, "n", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Boolean)
                ], M.prototype, "b", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Object)
                ], M.prototype, "o", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Array)
                ], M.prototype, "a", void 0);
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Date)
                ], M.prototype, "d", void 0);
                M = tslib_1.__decorate([
                    type_r_1.define
                ], M);
                return M;
            }(type_r_1.Record));
            it("accepts values as type spec", function () {
                var m = new M();
                chai_1.expect(m.s).to.equal('b');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.not.equal({});
                chai_1.expect(m.o).to.be.an.instanceOf(Object);
                chai_1.expect(m.a).to.not.equal([]);
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("infers types from values", function () {
                var m = new M(), _attributes = m._attributes;
                chai_1.expect(_attributes.s.type).to.equal(String);
                chai_1.expect(_attributes.n.type).to.equal(Number);
                chai_1.expect(_attributes.b.type).to.equal(Boolean);
                chai_1.expect(_attributes.o.type).to.equal(Object);
                chai_1.expect(_attributes.a.type).to.equal(Array);
                chai_1.expect(_attributes.d.type).to.equal(Date);
            });
        });
        describe('...as constructors with values', function () {
            it("converts default values to defined types", function () {
                var M = (function (_super) {
                    tslib_1.__extends(M, _super);
                    function M() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    M = tslib_1.__decorate([
                        type_r_1.define({
                            attributes: {
                                s: String.value(55),
                                n: Number.value("1"),
                                b: Boolean.value("some"),
                                o: Object.value("not an object"),
                                a: Array.value("not an array"),
                                d: Date.value(22222)
                            }
                        })
                    ], M);
                    return M;
                }(type_r_1.Record));
                var m = new M();
                chai_1.expect(m.s).to.equal('55');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.be.an.instanceOf(Object);
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("accepts null as default value", function () {
                var M = (function (_super) {
                    tslib_1.__extends(M, _super);
                    function M() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    M = tslib_1.__decorate([
                        type_r_1.define({
                            attributes: {
                                s: String.value(null),
                                n: Number.value(null),
                                b: Boolean.value(null),
                                o: Object.value(null),
                                a: Array.value(null),
                                d: Date.value(null)
                            }
                        })
                    ], M);
                    return M;
                }(type_r_1.Record));
                var m = new M();
                chai_1.expect(m.s).to.equal(null);
                chai_1.expect(m.n).to.equal(null);
                chai_1.expect(m.b).to.equal(null);
                chai_1.expect(m.o).to.eql(null);
                chai_1.expect(m.a).to.eql(null);
                chai_1.expect(m.d).to.eql(null);
            });
        });
    });
    describe("Record's collection", function () {
        it("is defined in the base Record", function () {
            chai_1.expect(type_r_1.Record.Collection).to.be.a('function');
            chai_1.expect(type_r_1.Record.Collection.prototype.model).to.eql(type_r_1.Record);
        });
        it("is created on Record's extension", function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = tslib_1.__decorate([
                    type_r_1.define
                ], M);
                return M;
            }(type_r_1.Record));
            var prototype = M.Collection.prototype;
            chai_1.expect(prototype).to.be.instanceof(type_r_1.Record.Collection);
            chai_1.expect(prototype.model).to.eql(M);
        });
        it("takes properties from .collection", function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = tslib_1.__decorate([
                    type_r_1.define({
                        collection: {
                            a: 'a'
                        }
                    })
                ], M);
                return M;
            }(type_r_1.Record));
            chai_1.expect(M.Collection.prototype.a).to.eql('a');
        });
        it("can be defined separately", function () {
            var C = (function (_super) {
                tslib_1.__extends(C, _super);
                function C() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                C = tslib_1.__decorate([
                    type_r_1.define({
                        a: 'a'
                    })
                ], C);
                return C;
            }(type_r_1.Collection));
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M.Collection = C;
                M = tslib_1.__decorate([
                    type_r_1.define
                ], M);
                return M;
            }(type_r_1.Record));
            chai_1.expect(M.Collection).to.equal(C);
            var prototype = M.Collection.prototype;
            chai_1.expect(prototype).to.be.instanceof(type_r_1.Record.Collection);
            chai_1.expect(prototype.a).to.eql('a');
            chai_1.expect(prototype.model).to.eql(M);
        });
    });
    describe('Attribute types', function () {
        var Test = (function (_super) {
            tslib_1.__extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            tslib_1.__decorate([
                type_r_1.attr(Function.value(null)),
                tslib_1.__metadata("design:type", Function)
            ], Test.prototype, "fun", void 0);
            Test = tslib_1.__decorate([
                type_r_1.define
            ], Test);
            return Test;
        }(type_r_1.Record));
        it('Supports function type', function () {
            var t = new Test();
            var t2 = t.clone();
            chai_1.expect(t.fun).to.eql(t2.fun);
        });
    });
    describe('Record pre-definition', function () {
        var M1 = (function (_super) {
            tslib_1.__extends(M1, _super);
            function M1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            M1 = tslib_1.__decorate([
                type_r_1.define
            ], M1);
            return M1;
        }(type_r_1.Record));
        var M2 = (function (_super) {
            tslib_1.__extends(M2, _super);
            function M2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            M2 = tslib_1.__decorate([
                type_r_1.predefine
            ], M2);
            return M2;
        }(type_r_1.Record));
        M2.define();
        it('predefine collection types', function () {
            chai_1.expect(M1.Collection).to.be.instanceOf(Function);
            chai_1.expect(M2.Collection).to.be.instanceOf(Function);
        });
        it("can't be instantiated", function () {
            new M1();
        });
        it('support forward declaration', function () {
            var M = (function (_super) {
                tslib_1.__extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = tslib_1.__decorate([
                    type_r_1.define
                ], M);
                return M;
            }(type_r_1.Record));
            chai_1.expect(M.Collection).to.be.a('function');
            chai_1.expect(M.Collection.prototype.model).to.eql(M);
            M.define({
                a: 'a'
            });
            chai_1.expect(M.prototype.a).to.eql('a');
        });
        it('can be defined', function () {
            M1.define({
                a: 'first',
                collection: {
                    b: 'second'
                }
            });
            M2.define({
                a: 'first'
            });
            M2.Collection.define({
                b: 'second'
            });
        });
    });
});
//# sourceMappingURL=primitives.js.map