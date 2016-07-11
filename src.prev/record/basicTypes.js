"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var attribute_1 = require('./attribute');
var ConstructorType = (function (_super) {
    __extends(ConstructorType, _super);
    function ConstructorType() {
        _super.apply(this, arguments);
    }
    ConstructorType.prototype.convert = function (value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };
    ConstructorType.prototype.clone = function (value, options) {
        return value.clone ? value.clone(value, options) : this.convert(JSON.parse(JSON.stringify(value)));
    };
    return ConstructorType;
}(attribute_1.Attribute));
Function.prototype._attribute = ConstructorType;
var DateType = (function (_super) {
    __extends(DateType, _super);
    function DateType() {
        _super.apply(this, arguments);
    }
    DateType.prototype.convert = function (value) {
        return value == null || value instanceof Date ? value :
            new Date(typeof value === 'string' ? parseDate(value) : value);
    };
    DateType.prototype.validate = function (model, value, name) {
        if (isNaN(+value))
            return name + ' is Invalid Date';
    };
    DateType.prototype.toJSON = function (value) { return value && value.toJSON(); };
    DateType.prototype.isChanged = function (a, b) { return (a && +a) !== (b && +b); };
    DateType.prototype.clone = function (value) { return value && new Date(+value); };
    return DateType;
}(attribute_1.Attribute));
Date._attribute = DateType;
Integer = function (x) { return x ? Math.round(x) : 0; };
var PrimitiveType = (function (_super) {
    __extends(PrimitiveType, _super);
    function PrimitiveType() {
        _super.apply(this, arguments);
    }
    PrimitiveType.prototype.create = function () { return this.type(); };
    PrimitiveType.prototype.toJSON = function (value) { return value; };
    PrimitiveType.prototype.convert = function (value) { return value == null ? value : this.type(value); };
    PrimitiveType.prototype.isChanged = function (a, b) { return a !== b; };
    PrimitiveType.prototype.clone = function (value) { return value; };
    return PrimitiveType;
}(attribute_1.Attribute));
Boolean._attribute = String._attribute = PrimitiveType;
var NumericType = (function (_super) {
    __extends(NumericType, _super);
    function NumericType() {
        _super.apply(this, arguments);
    }
    NumericType.prototype.validate = function (model, value, name) {
        if (!isFinite(value)) {
            return name + ' is invalid number';
        }
    };
    return NumericType;
}(PrimitiveType));
Integer._attribute = Number._attribute = NumericType;
var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType() {
        _super.apply(this, arguments);
    }
    ArrayType.prototype.toJSON = function (value) { return value; };
    ArrayType.prototype.convert = function (value) {
        if (value == null || value instanceof Array)
            return value;
        return [];
    };
    return ArrayType;
}(attribute_1.Attribute));
Array._attribute = ArrayType;
var numericKeys = [1, 4, 5, 6, 7, 10, 11], msDatePattern = /\/Date\(([0-9]+)\)\//, isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
function parseDate(date) {
    var msDate, timestamp, struct, minutesOffset = 0;
    if (msDate = msDatePattern.exec(date)) {
        timestamp = Number(msDate[1]);
    }
    else if ((struct = isoDatePattern.exec(date))) {
        for (var i = 0, k; (k = numericKeys[i]); ++i) {
            struct[k] = +struct[k] || 0;
        }
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;
        if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];
            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }
        timestamp =
            Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
    else {
        timestamp = Date.parse(date);
    }
    return timestamp;
}
//# sourceMappingURL=basicTypes.js.map