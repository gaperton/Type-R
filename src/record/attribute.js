"use strict";
var transactions_1 = require('./transactions');
var class_1 = require('../class');
var Attribute = (function () {
    function Attribute(name, options) {
        var _this = this;
        var _a = this.options = options, value = _a.value, type = _a.type, parse = _a.parse, toJSON = _a.toJSON, _b = _a.getHooks, getHooks = _b === void 0 ? [] : _b, _c = _a.transforms, transforms = _c === void 0 ? [] : _c, _d = _a.changeHandlers, changeHandlers = _d === void 0 ? [] : _d;
        this.name = name;
        this.value = value;
        this.type = type;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.addTransform(this.convert);
        this.changeHandler = null;
        this.getHook = this.get || null;
        this.initialize.apply(this, arguments);
        getHooks.forEach(function (gh) { return _this.addGetHook(gh); });
        transforms.forEach(function (t) { return _this.addTransform(t); });
        changeHandlers.forEach(function (ch) { return _this.addChangeHandler(ch); });
    }
    Attribute.prototype.transform = function (value) { return value; };
    Attribute.prototype.convert = function (value, options) { return value; };
    Attribute.prototype.convertAndSet = function (value, options, prev, model) {
        var next = this.convert(value, options, model);
        if (this.isChanged(next, prev)) {
            var value_1 = this.set.call(model, next, this.name);
            return value_1 === void 0 ? prev : this.convert(value_1, options);
        }
    };
    Attribute.prototype.isChanged = function (a, b) {
        return class_1.notEqual(a, b);
    };
    Attribute.prototype.handleChange = function (next, prev, model) { };
    Attribute.prototype.delegateEvents = function (next, prev, model) {
        prev && prev.trigger && model.stopListening(prev);
        if (next && next.trigger) {
            model.listenTo(next, this.events);
        }
    };
    Attribute.prototype.onAttrChange = function (next, prev, model) {
        this.onChange.call(model, next, this.name);
    };
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
    };
    Attribute.prototype.addGetHook = function (next) {
        var prev = this.prev;
        this.getHook = prev ?
            function (value, name) {
                var next = prev.call(value, name);
                return next.call(next, name);
            } : next;
    };
    Attribute.prototype.addTransform = function (next) {
        var prev = this.prev;
        this.transform = prev ?
            function (value, options, prev, model) {
                var next = prev.call(this, value, options, prev, model);
                return next.call(this, next, options, prev, model);
            } : next;
    };
    Attribute.prototype.addChangeHandler = function (next) {
        var prev = this.prev;
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