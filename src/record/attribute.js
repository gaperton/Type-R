"use strict";
var transactions_1 = require('./transactions');
var tools_1 = require('../tools');
var Attribute = (function () {
    function Attribute(name, options) {
        var _this = this;
        this.name = name;
        this.options = options;
        var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, _a = options.getHooks, getHooks = _a === void 0 ? [] : _a, _b = options.transforms, transforms = _b === void 0 ? [] : _b, _c = options.changeHandlers, changeHandlers = _c === void 0 ? [] : _c;
        this.value = value;
        this.type = type;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.transform = this.convert;
        this.handleChange = null;
        this.getHook = this.get || null;
        this.initialize.apply(this, arguments);
        getHooks.forEach(function (gh) { return _this.addGetHook(gh); });
        transforms.forEach(function (t) { return _this.addTransform(t); });
        changeHandlers.forEach(function (ch) { return _this.addChangeHandler(ch); });
    }
    Attribute.prototype.canBeUpdated = function (value) {
        return false;
    };
    Attribute.prototype.transform = function (value, options, prev, model) { return value; };
    Attribute.prototype.convert = function (value, options, model) { return value; };
    Attribute.prototype.isChanged = function (a, b) {
        return tools_1.notEqual(a, b);
    };
    Attribute.prototype.handleChange = function (next, prev, model) { };
    Attribute.prototype.create = function (options) { return new this.type(); };
    Attribute.prototype.clone = function (value, options) {
        if (options === void 0) { options = {}; }
        if (value && typeof value === 'object') {
            if (value.clone) {
                return value.clone(options);
            }
            if (options.deep) {
                var proto = Object.getPrototypeOf(value);
                if (proto === Object.prototype || proto === Array.prototype) {
                    return JSON.parse(JSON.stringify(value));
                }
            }
        }
        return value;
    };
    Attribute.prototype.validate = function (model, value, name) { };
    Attribute.prototype.toJSON = function (value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    Attribute.prototype.createPropertyDescriptor = function () {
        var _a = this, name = _a.name, getHook = _a.getHook;
        if (name !== 'id') {
            return {
                set: function (value) {
                    transactions_1.setAttribute(this, name, value);
                },
                get: getHook ?
                    function () {
                        return getHook.call(this, this.attributes[name], name);
                    } :
                    function () {
                        return this.attributes[name];
                    }
            };
        }
    };
    Attribute.prototype.initialize = function (name, options) { };
    Attribute.prototype.addGetHook = function (next) {
        var prev = this.getHook;
        this.getHook = prev ?
            function (value, name) {
                var next = prev.call(value, name);
                return next.call(next, name);
            } : next;
    };
    Attribute.prototype.addTransform = function (next) {
        var prev = this.transform;
        this.transform = function (value, options, prev, model) {
            var next = prev.call(this, value, options, prev, model);
            return next.call(this, next, options, prev, model);
        };
    };
    Attribute.prototype.addChangeHandler = function (next) {
        var prev = this.handleChange;
        this.handleChange = prev ?
            function (next, prev, model) {
                prev.call(this, next, prev, model);
                next.call(this, next, prev, model);
            } : next;
    };
    return Attribute;
}());
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map