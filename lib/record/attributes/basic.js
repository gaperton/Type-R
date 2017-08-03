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
import { tools } from '../../object-plus';
var ImmutableClassType = (function (_super) {
    __extends(ImmutableClassType, _super);
    function ImmutableClassType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImmutableClassType.prototype.convert = function (value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };
    ImmutableClassType.prototype.toJSON = function (value) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    ImmutableClassType.prototype.clone = function (value) {
        return new this.type(this.toJSON(value));
    };
    ImmutableClassType.prototype.isChanged = function (a, b) {
        return a !== b;
    };
    return ImmutableClassType;
}(AnyType));
Function.prototype._attribute = ImmutableClassType;
var PrimitiveType = (function (_super) {
    __extends(PrimitiveType, _super);
    function PrimitiveType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimitiveType.prototype.dispose = function () { };
    PrimitiveType.prototype.create = function () { return this.type(); };
    PrimitiveType.prototype.toJSON = function (value) { return value; };
    PrimitiveType.prototype.convert = function (value) { return value == null ? value : this.type(value); };
    PrimitiveType.prototype.isChanged = function (a, b) { return a !== b; };
    PrimitiveType.prototype.clone = function (value) { return value; };
    PrimitiveType.prototype.doInit = function (record, value, options) {
        return this.transform(value === void 0 ? this.value : value, options, void 0, record);
    };
    PrimitiveType.prototype.doUpdate = function (record, value, options, nested) {
        var name = this.name, attributes = record.attributes, prev = attributes[name];
        return prev !== (attributes[name] = this.transform(value, options, prev, record));
    };
    PrimitiveType.prototype.initialize = function () {
        if (this.value === void 0) {
            this.value = this.type();
        }
    };
    return PrimitiveType;
}(AnyType));
export { PrimitiveType };
Boolean._attribute = String._attribute = PrimitiveType;
var NumericType = (function (_super) {
    __extends(NumericType, _super);
    function NumericType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericType.prototype.create = function () {
        return 0;
    };
    NumericType.prototype.convert = function (value, a, b, record) {
        var num = value == null ? value : Number(value);
        if (num !== num) {
            this._log('warn', 'assigned with Invalid Number', value, record);
        }
        return num;
    };
    NumericType.prototype.validate = function (model, value, name) {
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };
    return NumericType;
}(PrimitiveType));
export { NumericType };
Number._attribute = NumericType;
Number.integer = function (x) { return x ? Math.round(x) : 0; };
Number.integer._attribute = NumericType;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayType.prototype.toJSON = function (value) { return value; };
    ArrayType.prototype.dispose = function () { };
    ArrayType.prototype.create = function () { return []; };
    ArrayType.prototype.convert = function (value, a, b, record) {
        if (value == null || Array.isArray(value))
            return value;
        this._log('warn', 'non-array assignment is ignored', value, record);
        return [];
    };
    ArrayType.prototype.clone = function (value) {
        return value && value.slice();
    };
    return ArrayType;
}(AnyType));
export { ArrayType };
Array._attribute = ArrayType;
var ObjectType = (function (_super) {
    __extends(ObjectType, _super);
    function ObjectType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectType.prototype.toJSON = function (value) { return value; };
    ObjectType.prototype.dispose = function () { };
    ObjectType.prototype.create = function () { return {}; };
    ObjectType.prototype.convert = function (value, a, b, record) {
        if (value == null || value.constructor === Object)
            return value;
        this._log('warn', 'non-object assignment is ignored', value, record);
        return {};
    };
    ObjectType.prototype.clone = function (value) {
        return value && tools.assign({}, value);
    };
    return ObjectType;
}(AnyType));
export { ObjectType };
Object._attribute = ObjectType;
export function doNothing() { }
var FunctionType = (function (_super) {
    __extends(FunctionType, _super);
    function FunctionType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionType.prototype.toJSON = function (value) { return void 0; };
    FunctionType.prototype.create = function () { return doNothing; };
    FunctionType.prototype.convert = function (value, a, b, record) {
        if (value == null || typeof value === 'function')
            return value;
        this._log('warn', 'assigned with non-function', value, record);
        return doNothing;
    };
    FunctionType.prototype.clone = function (value) { return value; };
    return FunctionType;
}(AnyType));
export { FunctionType };
Function._attribute = FunctionType;
//# sourceMappingURL=basic.js.map