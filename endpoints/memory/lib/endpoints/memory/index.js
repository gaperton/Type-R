import { createIOPromise } from '../../src/io-tools';
export function create(delay) {
    if (delay === void 0) { delay = 1000; }
    return new Endpoint(delay);
}
var Endpoint = (function () {
    function Endpoint(delay) {
        this.delay = delay;
        this.index = [0];
        this.items = {};
    }
    Endpoint.create = function (delay) {
        if (delay === void 0) { delay = 1000; }
        return new this(delay);
    };
    Endpoint.prototype.resolve = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return resolve(value); }, _this.delay);
        });
    };
    Endpoint.prototype.reject = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, _this.delay);
        });
    };
    Endpoint.prototype.generateId = function () {
        return this.index[0]++;
    };
    Endpoint.prototype.create = function (json, options) {
        var id = json.id = this.generateId();
        this.index.push(id);
        this.items[id] = json;
        return this.resolve({ id: id });
    };
    Endpoint.prototype.update = function (id, json, options) {
        var existing = this.items[id];
        if (existing) {
            this.items[id] = json;
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    Endpoint.prototype.read = function (id, options) {
        var existing = this.items[id];
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    Endpoint.prototype.destroy = function (id, options) {
        var existing = this.items[id];
        if (existing) {
            delete this.items[id];
            this.index = this.index.filter(function (x) { return x !== id; });
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    Endpoint.prototype.list = function (options) {
        return this.resolve(this.index);
    };
    Endpoint.prototype.subscribe = function (events) { };
    Endpoint.prototype.unsubscribe = function (events) { };
    return Endpoint;
}());
export { Endpoint };
//# sourceMappingURL=index.js.map