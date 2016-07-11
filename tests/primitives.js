"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var class_1 = require('../src/class');
var _1 = require('../src/record/');
var chai_1 = require('chai');
describe('Record', function () {
    it("can be instantiated", function () {
        new _1.Record();
    });
    describe('Subclass', function () {
        it("attaches properties to prototype", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define({
                        a: 'a'
                    })
                ], M);
                return M;
            }(_1.Record));
            chai_1.expect(M.prototype.a).to.eql('a');
        });
    });
    describe("Attribute spec", function () {
        describe('...as constructors', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define({
                        attributes: {
                            s: String,
                            n: Number,
                            b: Boolean,
                            o: Object,
                            a: Array,
                            d: Date
                        }
                    })
                ], M);
                return M;
            }(_1.Record));
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
                chai_1.expect(m.o).to.eql({});
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
                chai_1.expect(m.o).to.eql({});
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
                chai_1.expect(m.o).to.eql({});
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
        });
        describe('...as default values', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define({
                        attributes: {
                            s: 'b',
                            n: 1,
                            b: true,
                            o: {},
                            a: [],
                            d: new Date()
                        }
                    })
                ], M);
                return M;
            }(_1.Record));
            it("accepts values as type spec", function () {
                var m = new M();
                chai_1.expect(m.s).to.equal('b');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.not.equal({});
                chai_1.expect(m.o).to.eql({});
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
                    __extends(M, _super);
                    function M() {
                        _super.apply(this, arguments);
                    }
                    M = __decorate([
                        class_1.define({
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
                }(_1.Record));
                var m = new M();
                chai_1.expect(m.s).to.equal('55');
                chai_1.expect(m.n).to.equal(1);
                chai_1.expect(m.b).to.equal(true);
                chai_1.expect(m.o).to.eql({});
                chai_1.expect(m.a).to.eql([]);
                chai_1.expect(m.d).to.be.instanceof(Date);
            });
            it("accepts null as default value", function () {
                var M = (function (_super) {
                    __extends(M, _super);
                    function M() {
                        _super.apply(this, arguments);
                    }
                    M = __decorate([
                        class_1.define({
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
                }(_1.Record));
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
            chai_1.expect(_1.Record.Collection).to.be.a('function');
            chai_1.expect(_1.Record.Collection.prototype.Record).to.eql(_1.Record);
        });
        it("is created on Record's extension", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define
                ], M);
                return M;
            }(_1.Record));
            var prototype = M.Collection.prototype;
            chai_1.expect(prototype).to.be.instanceof(_1.Record.Collection);
            chai_1.expect(prototype.Record).to.eql(M);
        });
        it("takes properties from .collection", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define({
                        collection: {
                            a: 'a'
                        }
                    })
                ], M);
                return M;
            }(_1.Record));
            chai_1.expect(M.Collection.prototype.a).to.eql('a');
        });
        it("can be defined separately", function () {
            var C = (function (_super) {
                __extends(C, _super);
                function C() {
                    _super.apply(this, arguments);
                }
                C = __decorate([
                    class_1.define({
                        a: 'a'
                    })
                ], C);
                return C;
            }(Collection));
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define({
                        collection: C
                    })
                ], M);
                return M;
            }(_1.Record));
            chai_1.expect(M.Collection).to.eql(C);
            var prototype = M.Collection.prototype;
            chai_1.expect(prototype).to.be.instanceof(_1.Record.Collection);
            chai_1.expect(prototype.a).to.eql('a');
            chai_1.expect(prototype.Record).to.eql(M);
        });
    });
    describe('Record pre-definition', function () {
        var M1 = (function (_super) {
            __extends(M1, _super);
            function M1() {
                _super.apply(this, arguments);
            }
            M1 = __decorate([
                class_1.define
            ], M1);
            return M1;
        }(_1.Record));
        var M2 = (function (_super) {
            __extends(M2, _super);
            function M2() {
                _super.apply(this, arguments);
            }
            return M2;
        }(_1.Record));
        M2.define();
        it('predefine collection types', function () {
            chai_1.expect(M1.Collection).to.be.func;
            chai_1.expect(M2.Collection).to.be.func;
        });
        it("can't be instantiated", function () {
            new M1();
        });
        it('support forward declaration', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    _super.apply(this, arguments);
                }
                M = __decorate([
                    class_1.define
                ], M);
                return M;
            }(_1.Record));
            chai_1.expect(M.Collection).to.be.a('function');
            chai_1.expect(M.Collection.prototype.Record).to.eql(M);
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