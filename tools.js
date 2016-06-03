/**
 * Dependency-free tools, used across 'nested' libs.
 *
 * @module
 */
"use strict";
/**
 * Base class, holding class extensions
 */
var Class = (function () {
    function Class() {
    }
    /**
     * Attach mixins to class prototype.
     * Members merging policy is controlled by MyClass.mixinRules property.
     * mixinRules is merged on inheritance.
     *
     * @param mixins - array of mixin objects.
     * @returns {Class}
     */
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
    /**
     * Merge spec properties to the prototype.
     * Add native properties with descriptors from spec.properties to the prototype.
     * Prevents inheritance of create factory method.
     * Assign mixinRules static property, and merge it with parent.
     * Add mixins
     *
     * @param spec
     */
    Class.define = function (spec) {
        if (spec === void 0) { spec = {}; }
        // Attach class extensions, if it's not done...
        this.define || classExtensions(this);
        var proto = this.prototype, Base = Object.getPrototypeOf(proto).constructor;
        // Remove abstract class factory on inheritance
        if (Base.create !== Class.create && Base.create === this.create) {
            this.create = Class.create;
        }
        // Process spec...
        var specProps = omit(spec, 'properties', 'mixins', 'mixinRules'), _a = spec.properties, properties = _a === void 0 ? {} : _a, mixins = spec.mixins, mixinRules = spec.mixinRules;
        // assign spec members to prototype
        exports.assign(proto, specProps);
        // define properties
        Object.defineProperties(proto, properties);
        // apply mixins and mixin rules
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
    };
    return Class;
}());
exports.Class = Class;
Class._mixinRules = { properties: 'merge' };
/**
 * Merge mixin rules class decorator
 * @param rules
 * @returns {Function}
 */
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
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var Ctor = args_1[_a];
        Ctor.create = Class.create;
        Ctor.define = Class.define;
        Ctor.mixins = Class.mixins;
        Ctor.mixinRules = Class.mixinRules;
        Ctor._mixinRules = Class._mixinRules;
        Ctor.prototype.bindAll = Class.prototype.bindAll;
    }
}
exports.classExtensions = classExtensions;
/**
 * Simple overridable logging stubs
 *
 */
exports.log = {
    level: 2,
    error: function () {
        console.error.apply(this, arguments);
    },
    warn: function () {
        if (this.level > 0)
            console.warn.apply(this, arguments);
    },
    info: function () {
        if (this.level > 1)
            console.info.apply(this, arguments);
    },
    debug: function () {
        if (this.level > 2)
            console.log.apply(this, arguments);
    }
};
function omit(source) {
    var dest = {}, discard = {};
    for (var i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard[name] && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
exports.omit = omit;
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
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
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
/**
 * notEqual( a, b ) function, for deep objects comparison
 * Optimized for primitive types
 */
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
/***********************
 * Mixins helpers
 */
var mergeRules = {
    merge: function (a, b, rules) {
        var x = exports.assign({}, a);
        return mergeProps(x, b, rules);
    },
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
        var name_5 = sourceProps[i], sourceProp = Object.getOwnPropertyDescriptor(source, name_5), destProp = getPropertyDescriptor(target, name_5); // Shouldn't be own
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
//# sourceMappingURL=tools.js.map