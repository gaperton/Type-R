import { createIOPromise } from '../io-tools';
var FakeEndpoint = (function () {
    function FakeEndpoint(delay) {
        this.delay = delay;
    }
    FakeEndpoint.prototype.resolve = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return resolve(value); }, _this.delay);
        });
    };
    FakeEndpoint.prototype.reject = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, _this.delay);
        });
    };
    return FakeEndpoint;
}());
export default FakeEndpoint;
//# sourceMappingURL=fakeEndpoint.js.map