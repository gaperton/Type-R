"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
require("reflect-metadata");
var type_r_1 = require("type-r");
var common_1 = require("./common");
require("../../../globals");
describe('Bugs from Volicon Observer', function () {
    describe('Attribute serialization', function () {
        it('should call has.parse() when null attribute value is passed', function () {
            var Test = (function (_super) {
                tslib_1.__extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.type(String)
                        .parse(function (x) { return 'bla-bla'; })
                        .as,
                    tslib_1.__metadata("design:type", String)
                ], Test.prototype, "a", void 0);
                Test = tslib_1.__decorate([
                    type_r_1.define
                ], Test);
                return Test;
            }(type_r_1.Record));
            var t = new Test({ a: null }, { parse: true });
            chai_1.expect(t.a).to.eql('bla-bla');
        });
    });
    describe('Attribute definitions', function () {
        it('@attr( value ) must work as expected', function () {
            var Test = (function (_super) {
                tslib_1.__extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr(5),
                    tslib_1.__metadata("design:type", Number)
                ], Test.prototype, "num", void 0);
                tslib_1.__decorate([
                    type_r_1.attr("5"),
                    tslib_1.__metadata("design:type", String)
                ], Test.prototype, "str", void 0);
                Test = tslib_1.__decorate([
                    type_r_1.define
                ], Test);
                return Test;
            }(type_r_1.Record));
            var t = new Test();
            chai_1.expect(t.num).to.eql(5);
            chai_1.expect(t.str).to.eql("5");
            t.str = 6;
            chai_1.expect(t.str).to.eql("6");
        });
    });
    describe('Attribute change watcher', function () {
        it('works in base class and subclass', function () {
            var calls = [];
            var Base = (function (_super) {
                tslib_1.__extends(Base, _super);
                function Base() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.type(String).watcher(function (x) { return calls.push('inherited'); }).as,
                    tslib_1.__metadata("design:type", String)
                ], Base.prototype, "inherited", void 0);
                tslib_1.__decorate([
                    type_r_1.type(String).watcher('onNamedWatcher').as,
                    tslib_1.__metadata("design:type", String)
                ], Base.prototype, "namedWatcher", void 0);
                tslib_1.__decorate([
                    type_r_1.type(String).watcher(function (x) { return calls.push('base'); }).as,
                    tslib_1.__metadata("design:type", String)
                ], Base.prototype, "overriden", void 0);
                Base = tslib_1.__decorate([
                    type_r_1.define
                ], Base);
                return Base;
            }(type_r_1.Record));
            var Subclass = (function (_super) {
                tslib_1.__extends(Subclass, _super);
                function Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Subclass.prototype.onNamedWatcher = function () {
                    calls.push('named');
                };
                tslib_1.__decorate([
                    type_r_1.attr(String.has.watcher(function (x) { return calls.push('added'); })),
                    tslib_1.__metadata("design:type", String)
                ], Subclass.prototype, "added", void 0);
                tslib_1.__decorate([
                    type_r_1.attr(String.has.watcher(function (x) { return calls.push('subclass'); })),
                    tslib_1.__metadata("design:type", String)
                ], Subclass.prototype, "overriden", void 0);
                Subclass = tslib_1.__decorate([
                    type_r_1.define
                ], Subclass);
                return Subclass;
            }(Base));
            var subclass = new Subclass();
            subclass.inherited = "a";
            subclass.added = "b";
            subclass.overriden = "b";
            subclass.namedWatcher = "t";
            chai_1.expect(calls).to.eql(['inherited', 'added', 'subclass', 'base', 'named']);
        });
    });
    describe('Validation', function () {
        it('performs validation if collection item is changed', function () {
            var BitrateModel = type_r_1.Record.extend({
                defaults: {
                    bitrate: Number.value(512)
                },
                properties: {
                    bitrates: function () {
                        var available_bitrate = [128, 256, 384, 450, 512, 768, 896, 1000, 1500, 2000, 2500, 3000, 4500, 6000, 6500, 9000, 12000, 15000];
                        if (available_bitrate.indexOf(this.bitrate) === -1) {
                            available_bitrate.push(this.bitrate);
                        }
                        return available_bitrate.sort(function (a, b) {
                            return a - b;
                        });
                    }
                },
                initialize: function (options) {
                    type_r_1.Record.prototype.initialize.apply(this, arguments);
                },
                parse: function (data) {
                    return { bitrate: data / 1000 };
                },
                toJSON: function () {
                    var json = type_r_1.Record.prototype.toJSON.apply(this, arguments), bitrate = json.bitrate * 1000;
                    return bitrate;
                }
            });
            var SubEncoder = type_r_1.Record.extend({
                defaults: {
                    Bitrate: BitrateModel,
                    HistoryDepth: type_r_1.type(common_1.MinutesInterval).value(43800),
                    BitrateAsString: null,
                    ResolutionHeight: Number,
                    ResolutionWidth: Number,
                    resolution: String.has.toJSON(false)
                },
                collection: {
                    get: function (a) {
                        return type_r_1.Collection.prototype.get.apply(this, arguments) || this.models[a];
                    },
                    comparator: function (model1, model2) {
                        if (model1.Bitrate.bitrate > model2.Bitrate.bitrate) {
                            return 1;
                        }
                        else if (model1.Bitrate.bitrate < model2.Bitrate.bitrate) {
                            return -1;
                        }
                        else {
                            if (model1.ResolutionWidth > model2.ResolutionWidth) {
                                return 1;
                            }
                            else if (model1.ResolutionWidth < model2.ResolutionWidth) {
                                return -1;
                            }
                            else {
                                if (model1.ResolutionHeight > model2.ResolutionHeight) {
                                    return 1;
                                }
                                else if (model1.ResolutionHeight < model2.ResolutionHeight) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            }
                        }
                    },
                    localEvents: {
                        change: function () {
                            this.sort();
                        }
                    }
                }
            });
            var Placeholder = type_r_1.Record.extend({
                attributes: {
                    subEncoders: SubEncoder.Collection.has.check(function (x) {
                        return x.length > 0;
                    }, 'ccccc')
                }
            });
            var p = new Placeholder(), subEncoders = p.subEncoders;
            chai_1.expect(p.isValid()).to.be.false;
            chai_1.expect(subEncoders.isValid()).to.be.true;
            subEncoders.add({});
            chai_1.expect(p._validationError).to.be.undefined;
            chai_1.expect(p.isValid()).to.be.true;
            subEncoders.first().HistoryDepth.value = 2;
            chai_1.expect(p._validationError).to.be.undefined;
            chai_1.expect(p.isValid()).to.be.true;
            chai_1.expect(subEncoders.isValid()).to.be.true;
            chai_1.expect(p._validationError).not.to.be.undefined;
        });
    });
    describe('assignFrom', function () {
        it('copy the value if the target is null', function () {
            var Inner = (function (_super) {
                tslib_1.__extends(Inner, _super);
                function Inner() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", String)
                ], Inner.prototype, "name", void 0);
                Inner = tslib_1.__decorate([
                    type_r_1.define
                ], Inner);
                return Inner;
            }(type_r_1.Record));
            var Test = (function (_super) {
                tslib_1.__extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr(Inner.value(null)),
                    tslib_1.__metadata("design:type", Inner)
                ], Test.prototype, "inner", void 0);
                Test = tslib_1.__decorate([
                    type_r_1.define
                ], Test);
                return Test;
            }(type_r_1.Record));
            var target = new Test(), source = new Test({ inner: { name: "ron" } });
            chai_1.expect(target.inner).to.be.null;
            target.assignFrom(source);
            chai_1.expect(target.inner !== source.inner).to.be.true;
        });
        it('assign object of similar shape', function () {
            var A = (function (_super) {
                tslib_1.__extends(A, _super);
                function A() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", String)
                ], A.prototype, "a", void 0);
                A = tslib_1.__decorate([
                    type_r_1.define
                ], A);
                return A;
            }(type_r_1.Record));
            var B = (function (_super) {
                tslib_1.__extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", String)
                ], B.prototype, "b", void 0);
                B = tslib_1.__decorate([
                    type_r_1.define
                ], B);
                return B;
            }(A));
            var b = new B({ b: "b" }), a = new A({ a: "a" });
            b.assignFrom(a);
        });
    });
    describe('Mixins', function () {
        it('can work with overriden atribute', function () {
            var Source = (function (_super) {
                tslib_1.__extends(Source, _super);
                function Source() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(Source.prototype, "hi", {
                    get: function () {
                        return 'hi';
                    },
                    enumerable: true,
                    configurable: true
                });
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", String)
                ], Source.prototype, "name", void 0);
                Source = tslib_1.__decorate([
                    type_r_1.define
                ], Source);
                return Source;
            }(type_r_1.Record));
            var Target = (function (_super) {
                tslib_1.__extends(Target, _super);
                function Target() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    type_r_1.attr,
                    tslib_1.__metadata("design:type", Number)
                ], Target.prototype, "name", void 0);
                Target = tslib_1.__decorate([
                    type_r_1.define,
                    type_r_1.mixins(Source)
                ], Target);
                return Target;
            }(type_r_1.Record));
            var t = new Target();
            t.name = "1";
            chai_1.expect(t.name).to.eql(1);
            chai_1.expect(t.hi).to.eql('hi');
        });
    });
});
//# sourceMappingURL=reported-bugs.js.map