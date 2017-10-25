import * as tslib_1 from "tslib";
import "reflect-metadata";
import { define, attr, Record } from '../../../lib';
import { expect } from 'chai';
describe('Bugs from Volicon Observer', function () {
    describe('Attribute change watcher', function () {
        it('works in base class and subclass', function () {
            var calls = [];
            var Base = (function (_super) {
                tslib_1.__extends(Base, _super);
                function Base() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    attr(String.has.watcher(function (x) { return calls.push('inherited'); })),
                    tslib_1.__metadata("design:type", String)
                ], Base.prototype, "inherited", void 0);
                tslib_1.__decorate([
                    attr(String.has.watcher(function (x) { return calls.push('base'); })),
                    tslib_1.__metadata("design:type", String)
                ], Base.prototype, "overriden", void 0);
                Base = tslib_1.__decorate([
                    define
                ], Base);
                return Base;
            }(Record));
            var Subclass = (function (_super) {
                tslib_1.__extends(Subclass, _super);
                function Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                tslib_1.__decorate([
                    attr(String.has.watcher(function (x) { return calls.push('added'); })),
                    tslib_1.__metadata("design:type", String)
                ], Subclass.prototype, "added", void 0);
                tslib_1.__decorate([
                    attr(String.has.watcher(function (x) { return calls.push('subclass'); })),
                    tslib_1.__metadata("design:type", String)
                ], Subclass.prototype, "overriden", void 0);
                Subclass = tslib_1.__decorate([
                    define
                ], Subclass);
                return Subclass;
            }(Base));
            var subclass = new Subclass();
            subclass.inherited = "a";
            subclass.added = "b";
            subclass.overriden = "b";
            expect(calls).to.eql(['inherited', 'added', 'subclass', 'base']);
        });
    });
});
//# sourceMappingURL=reported-bugs.js.map