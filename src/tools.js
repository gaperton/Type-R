"use strict";
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
    for (var name_1 in attrSpecs) {
        statements.push('(v=a.' + name_1 + ')' + '===void 0||f(v,"' + name_1 + '");');
    }
    return new Function('a', 'f', statements.join(''));
}
exports.createForEach = createForEach;
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name_2 in attrSpecs) {
        statements.push("this." + name_2 + "=x." + name_2 + ";");
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
exports.createCloneCtor = createCloneCtor;
function createTransformCtor(attrSpecs) {
    var statements = ['var v;'];
    for (var name_3 in attrSpecs) {
        statements.push('this.' + name_3 + '=(v=a.' + name_3 + ')' + '===void 0?void 0 :f(v,"' + name_3 + '");');
    }
    var TransformCtor = new Function("a", 'f', statements.join(''));
    TransformCtor.prototype = Object.prototype;
    return TransformCtor;
}
exports.createTransformCtor = createTransformCtor;
var ArrayProto = Array.prototype, DateProto = Date.prototype, ObjectProto = Object.prototype;
function notEqual(a, b) {
    if (a === b)
        return false;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        var protoA = Object.getPrototypeOf(a);
        if (protoA !== Object.getPrototypeOf(b))
            return true;
        switch (protoA) {
            case DateProto: return +a !== +b;
            case ArrayProto: return arraysNotEqual(a, b);
            case ObjectProto:
            case null:
                return objectsNotEqual(a, b);
        }
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
//# sourceMappingURL=tools.js.map