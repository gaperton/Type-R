"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tools_1 = require('./tools');
var Class = (function () {
    function Class() {
    }
    Class.mixins = function () {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i - 0] = arguments[_i];
        }
        var proto = this.prototype, mergeRules = this._mixinRules || {};
        for (var i = mixins.length - 1; i >= 0; i--) {
            var mixin = mixins[i];
            if (mixin instanceof Array) {
                Class.mixins.apply(this, mixin);
            }
            else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };
    Class.mixinRules = function (mixinRules) {
        var Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(mixinRules, Base._mixinRules);
        }
        this._mixinRules = mixinRules;
        return this;
    };
    Class.prototype.bindAll = function () {
        for (var i = 0; i < arguments.length; i++) {
            var name_1 = arguments[i];
            this[name_1] = this[name_1].bind(this);
        }
    };
    Class.attach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var Ctor = args_1[_a];
            Ctor.create = this.create;
            Ctor.define = this.define;
            Ctor.mixins = this.mixins;
            Ctor.mixinRules = this.mixinRules;
            Ctor._mixinRules = this._mixinRules;
            Ctor.prototype.bindAll = this.prototype.bindAll;
        }
    };
    Class.define = function (spec, statics) {
        if (spec === void 0) { spec = {}; }
        this.define || Class.attach(this);
        var proto = this.prototype, Base = Object.getPrototypeOf(proto).constructor;
        if (Base.create !== Class.create && Base.create === this.create) {
            this.create = Class.create;
        }
        var specProps = tools_1.omit(spec, 'properties', 'mixins', 'mixinRules'), _a = spec.properties, properties = _a === void 0 ? {} : _a, mixins = spec.mixins, mixinRules = spec.mixinRules;
        tools_1.assign(proto, specProps);
        tools_1.assign(this, statics);
        Object.defineProperties(proto, properties);
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };
    Class.extend = function (spec, statics) {
        var subclass;
        if (spec.constructor) {
            subclass = spec.constructor;
            __extends(subclass, this);
        }
        else {
            subclass = (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    _super.apply(this, arguments);
                }
                return class_1;
            }(this));
        }
        return subclass.define(spec, statics);
    };
    Class._mixinRules = { properties: 'merge' };
    return Class;
}());
exports.Class = Class;
function mixinRules(rules) {
    return createDecorator('mixinRules', rules);
}
exports.mixinRules = mixinRules;
function mixins() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i - 0] = arguments[_i];
    }
    return createDecorator('mixins', list);
}
exports.mixins = mixins;
function defineDecorator(spec) {
    return typeof spec === 'function' ?
        spec.define() :
        createDecorator('define', spec);
}
exports.define = defineDecorator;
function createDecorator(name, spec) {
    return function (Ctor) {
        if (Ctor[name]) {
            Ctor[name](spec);
        }
        else {
            Class[name].call(Ctor, spec);
        }
        return Ctor;
    };
}
function mergeObjects(a, b, rules) {
    var x = tools_1.assign({}, a);
    return mergeProps(x, b, rules);
}
var mergeFunctions = {
    pipe: function (a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    },
    sequence: function (a, b) {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    },
    reverse: function (a, b) {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    },
    every: function (a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some: function (a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
function mergeProps(target, source, rules) {
    if (rules === void 0) { rules = {}; }
    for (var _i = 0, _a = Object.getOwnPropertyNames(source); _i < _a.length; _i++) {
        var name_2 = _a[_i];
        var sourceProp = Object.getOwnPropertyDescriptor(source, name_2), destProp = tools_1.getPropertyDescriptor(target, name_2);
        if (destProp) {
            var rule = rules[name_2], value = destProp.value;
            if (rule && value) {
                target[name_2] = typeof rule === 'object' ?
                    mergeObjects(value, sourceProp.value, rule) : (rule === 'merge' ?
                    mergeObjects(value, sourceProp.value) :
                    mergeFunctions[rule](value, sourceProp.value));
            }
        }
        else {
            Object.defineProperty(target, name_2, sourceProp);
        }
    }
    return target;
}
//# sourceMappingURL=class.js.map