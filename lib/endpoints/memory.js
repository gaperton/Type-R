import { createIOPromise } from '../io-tools';
export function create(delay) {
    if (delay === void 0) { delay = 1000; }
    return new MemoryEndpoint(delay);
}
export { create as memoryIO };
var MemoryEndpoint = (function () {
    function MemoryEndpoint(delay) {
        this.delay = delay;
        this.index = [0];
        this.items = {};
    }
    MemoryEndpoint.create = function (delay) {
        if (delay === void 0) { delay = 1000; }
        return new this(delay);
    };
    MemoryEndpoint.prototype.resolve = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return resolve(value); }, _this.delay);
        });
    };
    MemoryEndpoint.prototype.reject = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, _this.delay);
        });
    };
    MemoryEndpoint.prototype.generateId = function () {
        return this.index[0]++;
    };
    MemoryEndpoint.prototype.create = function (json, options) {
        var id = json.id = this.generateId();
        this.index.push(id);
        this.items[id] = json;
        return this.resolve({ id: id });
    };
    MemoryEndpoint.prototype.update = function (id, json, options) {
        var existing = this.items[id];
        if (existing) {
            this.items[id] = json;
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    MemoryEndpoint.prototype.read = function (id, options) {
        var existing = this.items[id];
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    MemoryEndpoint.prototype.destroy = function (id, options) {
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
    MemoryEndpoint.prototype.list = function (options) {
        return this.resolve(this.index);
    };
    MemoryEndpoint.prototype.subscribe = function (events) { };
    MemoryEndpoint.prototype.unsubscribe = function (events) { };
    return MemoryEndpoint;
}());
export { MemoryEndpoint };
//# sourceMappingURL=memory.js.map