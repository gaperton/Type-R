import * as tslib_1 from "tslib";
import { getOwnerEndpoint, startIO } from '../io-tools';
export var IORecordMixin = {
    getEndpoint: function () {
        return getOwnerEndpoint(this) || this._endpoint;
    },
    save: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var endpoint = this.getEndpoint(), json = this.toJSON();
        return startIO(this, this.isNew() ?
            endpoint.create(json, options) :
            endpoint.update(this.id, json, options), options, function (update) {
            _this.set(update, tslib_1.__assign({ parse: true }, options));
        });
    },
    fetch: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().read(this.id, options), options, function (json) { return _this.set(json, tslib_1.__assign({ parse: true }, options)); });
    },
    destroy: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().destroy(this.id, options), options, function () {
            var collection = _this.collection;
            if (collection) {
                collection.remove(_this, options);
            }
            else {
                _this.dispose();
            }
        });
    }
};
//# sourceMappingURL=io-mixin.js.map