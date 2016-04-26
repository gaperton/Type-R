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
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../tools', 'chai', 'mocha'], factory);
    }
})(function (require, exports) {
    "use strict";
    var tools_1 = require('../tools');
    var chai_1 = require('chai');
    var mocha_1 = require('mocha');
    mocha_1.describe('Mixins', function () {
        mocha_1.it('merges objects to the prototype, if they are not defined', function () {
        });
        mocha_1.it('works on a plain class', function () {
        });
        mocha_1.describe('mixin rules', function () {
            mocha_1.it('merges object properties');
            mocha_1.it('merges rules on inheritance');
            mocha_1.it('works on the plain class');
            mocha_1.describe('methods composition', function () {
                mocha_1.it('execute methods sequentially');
                mocha_1.it('execute methods in reverse order');
                mocha_1.it('pipeline methods passing the first argument through');
            });
            mocha_1.describe('boolean methods composition', function () {
                mocha_1.it('joins checks by "and"');
                mocha_1.it('joins checks by "or"');
            });
        });
    });
    mocha_1.describe('Class#define', function () {
        mocha_1.it('adds members to the prototype', function () {
            var C = (function (_super) {
                __extends(C, _super);
                function C() {
                    _super.apply(this, arguments);
                }
                C = __decorate([
                    tools_1.define({
                        a: 'a'
                    })
                ], C);
                return C;
            }(tools_1.Class));
            chai_1.expect(C.prototype.a).equal('a');
        });
        mocha_1.it('defines properties passed in "properties" spec', function () {
            var C = (function (_super) {
                __extends(C, _super);
                function C() {
                    _super.apply(this, arguments);
                }
                C = __decorate([
                    tools_1.define({
                        properties: {
                            p: {
                                get: function () { return "Hey"; }
                            }
                        }
                    })
                ], C);
                return C;
            }(tools_1.Class));
            var c = new C();
            chai_1.expect(c.p).to.equal('Hey');
        });
        mocha_1.it('clear up "create" factory method on inheritance', function () {
            var A = (function (_super) {
                __extends(A, _super);
                function A() {
                    _super.apply(this, arguments);
                }
                A.create = function () { return "Hello"; };
                A = __decorate([
                    tools_1.define
                ], A);
                return A;
            }(tools_1.Class));
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    _super.apply(this, arguments);
                }
                B = __decorate([
                    tools_1.define
                ], B);
                return B;
            }(A));
            chai_1.expect(B.create()).to.be.instanceOf(B);
        });
        mocha_1.it('merges mixin rules on inheritance', function () {
            var A = (function (_super) {
                __extends(A, _super);
                function A() {
                    _super.apply(this, arguments);
                }
                A.create = function () { return "Hello"; };
                A = __decorate([
                    tools_1.define({
                        mixinRules: {
                            a: 'merge'
                        }
                    })
                ], A);
                return A;
            }(tools_1.Class));
            chai_1.expect(A._mixinRules.a).to.eql('merge');
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    _super.apply(this, arguments);
                }
                B = __decorate([
                    tools_1.define({
                        mixinRules: {
                            b: 'merge'
                        }
                    })
                ], B);
                return B;
            }(A));
            chai_1.expect(B._mixinRules.a).to.eql('merge');
            chai_1.expect(B._mixinRules.b).to.eql('merge');
        });
    });
});
//# sourceMappingURL=tools.js.map