import { createIOPromise } from '../io-tools';
export function create(key, delay) {
    if (delay === void 0) { delay = 1000; }
    return new LocalStorageEndpoint(key, delay);
}
export { create as localStorageIO };
var LocalStorageEndpoint = (function () {
    function LocalStorageEndpoint(key, delay) {
        this.key = key;
        this.delay = delay;
    }
    LocalStorageEndpoint.prototype.resolve = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return resolve(value); }, _this.delay);
        });
    };
    LocalStorageEndpoint.prototype.reject = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, _this.delay);
        });
    };
    LocalStorageEndpoint.prototype.create = function (json, options) {
        var index = this.index;
        index.push(json.id = index[0]++);
        this.index = index;
        this.set(json);
        return this.resolve({ id: json.id });
    };
    LocalStorageEndpoint.prototype.set = function (json) {
        localStorage.setItem(this.key + '#' + json.id, JSON.stringify(json));
    };
    LocalStorageEndpoint.prototype.get = function (id) {
        return JSON.parse(localStorage.getItem(this.key + '#' + id));
    };
    LocalStorageEndpoint.prototype.update = function (id, json, options) {
        var existing = this.get(id);
        if (existing) {
            json.id = id;
            this.set(json);
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    LocalStorageEndpoint.prototype.read = function (id, options) {
        var existing = this.get(id);
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    LocalStorageEndpoint.prototype.destroy = function (id, options) {
        var existing = this.get(id);
        if (existing) {
            localStorage.removeItem(id);
            this.index = this.index.filter(function (x) { return x !== id; });
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    Object.defineProperty(LocalStorageEndpoint.prototype, "index", {
        get: function () {
            return JSON.parse(localStorage.getItem(this.key)) || [0];
        },
        set: function (x) {
            localStorage.setItem(this.key, JSON.stringify(x));
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageEndpoint.prototype.list = function (options) {
        var _this = this;
        var index = this.index;
        return this.resolve(this.index.map(function (id) { return _this.get(id); }));
    };
    LocalStorageEndpoint.prototype.subscribe = function (events) { };
    LocalStorageEndpoint.prototype.unsubscribe = function (events) { };
    return LocalStorageEndpoint;
}());
export { LocalStorageEndpoint };
//# sourceMappingURL=localStorage.js.map