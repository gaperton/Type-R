var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AnyType } from './any';
import { transactionApi, ItemsBehavior } from '../../transactions';
var free = transactionApi.free, aquire = transactionApi.aquire;
var AggregatedType = (function (_super) {
    __extends(AggregatedType, _super);
    function AggregatedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregatedType.prototype.clone = function (value) {
        return value ? value.clone() : value;
    };
    AggregatedType.prototype.toJSON = function (x) { return x && x.toJSON(); };
    AggregatedType.prototype.doInit = function (record, value, options) {
        var v = options.clone ? this.clone(value) : (value === void 0 ? this.defaultValue() : value);
        var x = this.transform(v, options, void 0, record);
        this.handleChange(x, void 0, record);
        return x;
    };
    AggregatedType.prototype.doUpdate = function (record, value, options, nested) {
        var key = this.name, attributes = record.attributes;
        var prev = attributes[key];
        var update;
        if (update = this.canBeUpdated(prev, value, options)) {
            var nestedTransaction = prev._createTransaction(update, options);
            if (nestedTransaction) {
                if (nested) {
                    nested.push(nestedTransaction);
                }
                else {
                    nestedTransaction.commit(record);
                }
                if (this.propagateChanges)
                    return true;
            }
            return false;
        }
        var next = this.transform(value, options, prev, record);
        attributes[key] = next;
        if (this.isChanged(next, prev)) {
            this.handleChange(next, prev, record);
            return true;
        }
        return false;
    };
    AggregatedType.prototype.canBeUpdated = function (prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge)
                    return next.__inner_state__;
            }
            else {
                return next;
            }
        }
    };
    AggregatedType.prototype.convert = function (value, options, prev, record) {
        if (value == null)
            return value;
        if (value instanceof this.type) {
            if (value._shared && !(value._shared & ItemsBehavior.persistent)) {
                this._log('error', 'aggregated collection attribute is assigned with shared collection', value, record);
            }
            return options.merge ? value.clone() : value;
        }
        return this.type.create(value, options);
    };
    AggregatedType.prototype.dispose = function (record, value) {
        if (value) {
            this.handleChange(void 0, value, record);
        }
    };
    AggregatedType.prototype.validate = function (record, value) {
        var error = value && value.validationError;
        if (error)
            return error;
    };
    AggregatedType.prototype.create = function () {
        return this.type.create();
    };
    AggregatedType.prototype.initialize = function (options) {
        options.changeHandlers.unshift(this._handleChange);
    };
    AggregatedType.prototype._handleChange = function (next, prev, record) {
        if (prev) {
            free(record, prev);
            prev.dispose();
        }
        if (next && !aquire(record, next, this.name)) {
            this._log('error', 'aggregated attribute assigned with object already having an owner', next, record);
        }
    };
    return AggregatedType;
}(AnyType));
export { AggregatedType };
//# sourceMappingURL=owned.js.map