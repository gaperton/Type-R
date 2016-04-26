(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Class = (function () {
        function Class() {
        }
        Class.create = function (attrs, options) {
            return new this(attrs, options);
        };
        Class.mixins = function () {
            var mixins = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                mixins[_i - 0] = arguments[_i];
            }
            var proto = this.prototype, mergeRules = this.mixinRules || {};
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
        };
        Class.prototype.bindAll = function () {
            for (var i = 0; i < arguments.length; i++) {
                var name_1 = arguments[i];
                this[name_1] = this[name_1].bind(this);
            }
        };
        Class.define = function (spec) {
            if (spec === void 0) { spec = {}; }
            this.define || classExtensions(this);
            var proto = this.prototype, Base = Object.getPrototypeOf(proto).constructor;
            if (Base.create !== Class.create && Base.create === this.create) {
                this.create = Class.create;
            }
            var _a = spec.properties, properties = _a === void 0 ? {} : _a, mixins = spec.mixins, mixinRules = spec.mixinRules, specProps = spec.specProps;
            Object.assign(proto, specProps);
            Object.defineProperties(proto, properties);
            mixinRules && this.mixinRules(mixinRules);
            mixins && this.mixins(mixins);
        };
        return Class;
    }());
    exports.Class = Class;
    Class._mixinRules = { properties: 'merge' };
    function createDecorator(name, spec) {
        return function (Ctor) {
            if (Ctor[name]) {
                Ctor[name](spec);
            }
            else {
                Class[name].call(Ctor, spec);
            }
        };
    }
    function mixinRules(rules) {
        return createDecorator('mixinRules', rules);
    }
    exports.mixinRules = mixinRules;
    function defineDecorator(spec) {
        return typeof spec === 'function' ?
            spec.define() :
            createDecorator('define', spec);
    }
    exports.define = defineDecorator;
    function mixins() {
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i - 0] = arguments[_i];
        }
        return createDecorator('mixins', list);
    }
    exports.mixins = mixins;
    function classExtensions() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            var Ctor = args[i];
            exports.assign(Ctor);
            Ctor.create = Class.create;
            Ctor.define = Class.define;
            Ctor.mixins = Class.mixins;
            Ctor.mixinRules = Class.mixinRules;
            Ctor._mixinRules = Class._mixinRules;
            Ctor.prototype.bindAll = Class.prototype.bindAll;
        }
    }
    exports.classExtensions = classExtensions;
    exports.log = {
        level: 2,
        error: function () {
            console.error.apply(this, arguments);
        },
        warning: function () {
            if (this.level > 0)
                console.warning.apply(this, arguments);
        },
        info: function () {
            if (this.level > 1)
                console.warning.apply(this, arguments);
        },
        debug: function () {
            if (this.level > 2)
                console.log.apply(this, arguments);
        }
    };
    function mapObject(dest, source, fun) {
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                var value = fun(source[name], name);
                value === void 0 || (dest[name] = value);
            }
        }
        return dest;
    }
    exports.mapObject = mapObject;
    function fastAssign(dest, source) {
        for (var name in source) {
            dest[name] = source[name];
        }
    }
    exports.fastAssign = fastAssign;
    function fastDefaults(dest, source) {
        for (var name in source) {
            dest[name] === void 0 || (dest[name] = source[name]);
        }
    }
    exports.fastDefaults = fastDefaults;
    function forAllArgs(fun) {
        return function (dest) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                source && fun(dest, source);
            }
            return dest;
        };
    }
    exports.assign = forAllArgs(function (dest, source) {
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                dest[name] = source[name];
            }
        }
    });
    Object.assign || (Object.assign = exports.assign);
    exports.defaults = forAllArgs(function (dest, source) {
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                dest[name] === void 0 || (dest[name] = source[name]);
            }
        }
    });
    function createForEach(attrSpecs) {
        var statements = ['var v;'];
        for (var name_2 in attrSpecs) {
            statements.push('(v=a.' + name_2 + ')' + '===void 0||f(v,"' + name_2 + '");');
        }
        return new Function('a', 'f', statements.join(''));
    }
    exports.createForEach = createForEach;
    function createCloneCtor(attrSpecs) {
        var statements = [];
        for (var name_3 in attrSpecs) {
            statements.push("this." + name_3 + "=x." + name_3 + ";");
        }
        var CloneCtor = new Function("x", statements.join(''));
        CloneCtor.prototype = Object.prototype;
        return CloneCtor;
    }
    exports.createCloneCtor = createCloneCtor;
    function createTransformCtor(attrSpecs) {
        var statements = ['var v;'];
        for (var name_4 in attrSpecs) {
            statements.push('this.' + name_4 + '=(v=a.' + name_4 + ')' + '===void 0?void 0 :f(v,"' + name_4 + '");');
        }
        var TransformCtor = new Function("a", 'f', statements.join(''));
        TransformCtor.prototype = Object.prototype;
        return TransformCtor;
    }
    exports.createTransformCtor = createTransformCtor;
    var ArrayProto = Array.prototype;
    function notEqual(a, b) {
        if (a === b)
            return false;
        if (a && b && typeof a == 'object' && typeof b == 'object') {
            var protoA = Object.getPrototypeOf(a);
            if (protoA !== Object.getPrototypeOf(b))
                return true;
            return protoA === ArrayProto ?
                arraysNotEqual(a, b) :
                objectsNotEqual(a, b);
        }
        return true;
    }
    exports.notEqual = notEqual;
    function objectsNotEqual(a, b) {
        var keysA = Object.keys(a);
        if (keysA.length !== Object.keys(b).length)
            return true;
        for (var i = 0; i < keysA.length; i++) {
            var key = keysA[i];
            if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
                return true;
            }
        }
        return false;
    }
    function arraysNotEqual(a, b) {
        if (a.length !== b.length)
            return true;
        for (var i = 0; i < a.length; i++) {
            if (notEqual(a[i], b[i]))
                return true;
        }
        return false;
    }
    var mergeRules = {
        merge: function (a, b, rules) {
            return mergeProps.apply(void 0, [{}].concat(a));
        }, b: b, rules:  };
    pipe(a, b);
    {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    }
    sequence(a, b);
    {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    }
    reverse(a, b);
    {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    }
    every(a, b);
    {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    }
    some(a, b);
    {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
    ;
    function getPropertyDescriptor(obj, prop) {
        for (var desc; !desc && obj; obj = Object.getPrototypeOf(obj)) {
            desc = Object.getOwnPropertyDescriptor(obj, prop);
        }
        return desc;
    }
    exports.getPropertyDescriptor = getPropertyDescriptor;
    function mergeProps(target, source, rules) {
        if (rules === void 0) { rules = {}; }
        var sourceProps = Object.getOwnPropertyNames(source);
        for (var i = 0; i < sourceProps.length; i++) {
            var name_5 = sourceProps[i], sourceProp = Object.getOwnPropertyDescriptor(source, name_5), destProp = getPropertyDescriptor(target, name_5);
            if (destProp) {
                var rule = rules[name_5], value = destProp.value;
                if (rule && value) {
                    target[name_5] = typeof rule === 'object' ?
                        mergeRules.merge(value, sourceProp.value, rule) :
                        mergeRules[rule](value, sourceProp.value);
                }
            }
            else {
                Object.defineProperty(target, name_5, sourceProp);
            }
        }
        return target;
    }
});
//# sourceMappingURL=tools.js.map