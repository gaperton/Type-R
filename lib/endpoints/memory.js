import * as tslib_1 from "tslib";
import FakeEndpoint from './fakeEndpoint';
export default function memoryIO(delay) {
    if (delay === void 0) { delay = 1000; }
    return new MemoryIOEndpoint(delay);
}
var MemoryIOEndpoint = (function (_super) {
    tslib_1.__extends(MemoryIOEndpoint, _super);
    function MemoryIOEndpoint(delay) {
        var _this = _super.call(this, delay) || this;
        _this.index = [0];
        _this.items = {};
        return _this;
    }
    MemoryIOEndpoint.prototype.generateId = function () {
        return this.index[0]++;
    };
    MemoryIOEndpoint.prototype.create = function (json, options) {
        var id = json.id = this.generateId();
        this.index.push(id);
        this.items[id] = json;
        return this.resolve({ id: id });
    };
    MemoryIOEndpoint.prototype.update = function (id, json, options) {
        var existing = this.items[id];
        if (existing) {
            this.items[id] = json;
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    MemoryIOEndpoint.prototype.read = function (id, options) {
        var existing = this.items[id];
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    MemoryIOEndpoint.prototype.destroy = function (id, options) {
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
    MemoryIOEndpoint.prototype.list = function (options) {
        return this.resolve(this.index);
    };
    MemoryIOEndpoint.prototype.subscribe = function (events) { };
    MemoryIOEndpoint.prototype.unsubscribe = function (events) { };
    return MemoryIOEndpoint;
}(FakeEndpoint));
export { MemoryIOEndpoint };
//# sourceMappingURL=memory.js.map