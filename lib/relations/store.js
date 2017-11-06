import * as tslib_1 from "tslib";
import { Record } from '../record';
import { Transactional } from '../transactions';
import { startIO } from '../io-tools';
var _store = null;
var Store = (function (_super) {
    tslib_1.__extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Store.prototype.getStore = function () { return this; };
    Store.prototype.get = function (name) {
        var local = this[name];
        if (local || this === this._defaultStore)
            return local;
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };
    Object.defineProperty(Store, "global", {
        get: function () { return _store; },
        set: function (store) {
            if (_store) {
                _store.dispose();
            }
            Transactional.prototype._defaultStore = _store = store;
        },
        enumerable: true,
        configurable: true
    });
    return Store;
}(Record));
export { Store };
Store.global = new Store();
var IOGroupStore = (function (_super) {
    tslib_1.__extends(IOGroupStore, _super);
    function IOGroupStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IOGroupStore.prototype.fetch = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var names = this.keys().filter(function (name) { return _this[name].fetch; }), promises = names.map(function (name) { return _this[name].fetch(options); }), promise = Promise.all(promises);
        promise.abort = function () {
            promises.forEach(function (x) { return x.abort && x.abort(); });
        };
        return startIO(this, promise, options, function (x) { return x; });
    };
    return IOGroupStore;
}(Store));
export { IOGroupStore };
IOGroupStore.prototype.save = function () {
    throw new ReferenceError('GroupStore does not support save() method');
};
IOGroupStore.prototype.destroy = function () {
    throw new ReferenceError('GroupStore does not support destroy() method');
};
//# sourceMappingURL=store.js.map