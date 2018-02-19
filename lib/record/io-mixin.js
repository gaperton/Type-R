import * as tslib_1 from "tslib";
import { startIO } from '../io-tools';
export var IORecordMixin = {
    save: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var endpoint = this.getEndpoint(), json = this.toJSON();
        return startIO(this, this.isNew() ?
            endpoint.create(json, options, this) :
            endpoint.update(this.id, json, options, this), options, function (update) {
            _this.set(update, tslib_1.__assign({ parse: true }, options));
        });
    },
    savePatch: function (patch, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.set(patch);
        var endpoint = this.getEndpoint();
        if (this.isNew() || !endpoint.patch)
            return this.save();
        var json = this.toJSON();
        return startIO(this, endpoint.patch(this.id, patchToJson(patch, json), options, this), options, function (update) {
            _this.set(update, tslib_1.__assign({ parse: true }, options));
        });
    },
    fetch: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().read(this.id, options, this), options, function (json) { return _this.set(json, tslib_1.__assign({ parse: true }, options)); });
    },
    destroy: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().destroy(this.id, options, this), options, function () {
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
function patchToJson(patch, json) {
    var res = {};
    for (var name_1 in patch) {
        var patchValue = patch[name_1];
        if (patchValue && Object.getPrototypeOf(patchValue) === Object.prototype) {
            res[name_1] = patchToJson(patchValue, json[name_1]);
        }
        else {
            res[name_1] = json[name_1];
        }
    }
    return res;
}
//# sourceMappingURL=io-mixin.js.map