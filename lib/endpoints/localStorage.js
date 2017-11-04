import * as tslib_1 from "tslib";
import FakeEndpoint from './fakeEndpoint';
export default function localStorageIO(key, delay) {
    if (delay === void 0) { delay = 1000; }
    return new LocalStorageIOEndpoint(key, delay);
}
var LocalStorageIOEndpoint = (function (_super) {
    tslib_1.__extends(LocalStorageIOEndpoint, _super);
    function LocalStorageIOEndpoint(key, delay) {
        var _this = _super.call(this, delay) || this;
        _this.key = key;
        return _this;
    }
    LocalStorageIOEndpoint.prototype.create = function (json, options) {
        var index = this.index;
        index.push(json.id = index[0]++);
        this.index = index;
        this.set(json);
        return this.resolve({ id: json.id });
    };
    LocalStorageIOEndpoint.prototype.set = function (json) {
        localStorage.setItem(this.key + '#' + json.id, JSON.stringify(json));
    };
    LocalStorageIOEndpoint.prototype.get = function (id) {
        return JSON.parse(localStorage.getItem(this.key + '#' + id));
    };
    LocalStorageIOEndpoint.prototype.update = function (id, json, options) {
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
    LocalStorageIOEndpoint.prototype.read = function (id, options) {
        var existing = this.get(id);
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    LocalStorageIOEndpoint.prototype.destroy = function (id, options) {
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
    Object.defineProperty(LocalStorageIOEndpoint.prototype, "index", {
        get: function () {
            return JSON.parse(localStorage.getItem(this.key)) || [0];
        },
        set: function (x) {
            localStorage.setItem(this.key, JSON.stringify(x));
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageIOEndpoint.prototype.list = function (options) {
        var _this = this;
        var index = this.index;
        return this.resolve(this.index.map(function (id) { return _this.get(id); }));
    };
    LocalStorageIOEndpoint.prototype.subscribe = function (events) { };
    LocalStorageIOEndpoint.prototype.unsubscribe = function (events) { };
    return LocalStorageIOEndpoint;
}(FakeEndpoint));
export { LocalStorageIOEndpoint };
//# sourceMappingURL=localStorage.js.map