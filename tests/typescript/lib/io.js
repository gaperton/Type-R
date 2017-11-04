import * as tslib_1 from "tslib";
import "reflect-metadata";
import { define, attr, Record } from '../../../lib';
import { expect } from 'chai';
import { memoryIO } from '../../../lib/endpoints/memory';
describe('IO', function () {
    var User = (function (_super) {
        tslib_1.__extends(User, _super);
        function User() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        User.endpoint = memoryIO(10);
        tslib_1.__decorate([
            attr,
            tslib_1.__metadata("design:type", String)
        ], User.prototype, "name", void 0);
        User = tslib_1.__decorate([
            define
        ], User);
        return User;
    }(Record));
    it('create', function (done) {
        var x = new User({ name: "test" });
        x.save().then(function () {
            expect(x.id).to.eql("0");
            done();
        });
    });
    it('read', function (done) {
        var x = new User({ id: "0" });
        x.fetch().then(function () {
            expect(x.name).to.eql("test");
            done();
        });
    });
    it('update', function (done) {
        var x = new User({ id: "0" });
        x.fetch()
            .then(function () {
            x.name = "Mike";
            return x.save();
        })
            .then(function () {
            var y = new User({ id: "0" });
            return y.fetch();
        })
            .then(function (y) {
            expect(y.name).to.eql('Mike');
            done();
        });
    });
    it('list', function (done) {
        var users = new User.Collection();
        users.fetch()
            .then(function () {
            expect(users.length).to.eql(1);
            expect(users.first().name).to.eql("Mike");
            done();
        });
    });
    it("destroy", function (done) {
        var x = new User({ id: "0" });
        x.destroy()
            .then(function () {
            var users = new User.Collection();
            return users.fetch();
        })
            .then(function (users) {
            expect(users.length).to.eql(0);
            done();
        });
    });
});
//# sourceMappingURL=io.js.map