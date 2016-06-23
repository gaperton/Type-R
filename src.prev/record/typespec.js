"use strict";
var attribute_ts_1 = require('./attribute.ts');
var tools_ts_1 = require('../tools.ts');
var TypeSpec = (function () {
    function TypeSpec(options) {
        if (options === void 0) { options = {}; }
        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        tools_ts_1.assign(this.options, options);
    }
    TypeSpec.prototype.get = function (fun) {
        this.options.getHooks.push(fun);
    };
    TypeSpec.prototype.set = function (fun) {
        this.options.transforms.push(function (next, options, prev, model) {
            if (this.isChanged(next, prev)) {
                var changed = fun.call(model, next, name);
                return changed === void 0 ? prev : changed;
            }
            return prev;
        });
    };
    TypeSpec.prototype.events = function (map) {
        this.options.changeHandlers.push(function (next, prev, record) {
            prev && record.stopListening(prev);
            next && record.listenTo(next, map);
        });
    };
    TypeSpec.prototype.onChange = function (handler) {
        this.options.onChange = handler;
    };
    Object.defineProperty(TypeSpec.prototype, "has", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeSpec.prototype, "isRequired", {
        get: function () {
            this.options.isRequired = true;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    TypeSpec.prototype.value = function (x) { this.options.value = x; };
    TypeSpec.prototype.createAttribute = function (name) {
        var type = this.options.type, AttributeCtor = type ? type._attribute : attribute_ts_1.Attribute;
        return new AttributeCtor(name, this.options);
    };
    return TypeSpec;
}());
Function.prototype['value'] = function (x) {
    return new TypeSpec({ type: this, value: x });
};
Function.prototype['isRequired'] = function (x) {
    return new TypeSpec({ type: this, isRequired: true });
};
Object.defineProperty(Function.prototype, 'has', {
    get: function () {
        return this._has || new TypeSpec({ type: this });
    },
    set: function (value) { this._has = value; }
});
function createAttribute(spec, name) {
    var typeSpec;
    if (spec && spec instanceof TypeSpec) {
        typeSpec = spec;
    }
    else if (typeof spec === 'function') {
        typeSpec = new TypeSpec({ type: spec });
    }
    else {
        typeSpec = new TypeSpec({
            type: inferType(spec),
            value: spec
        });
    }
    return typeSpec.createAttribute(name);
}
exports.createAttribute = createAttribute;
function inferType(value) {
    switch (typeof value) {
        case 'number':
            return Number;
        case 'string':
            return String;
        case 'boolean':
            return Boolean;
        case 'object':
            return value ? value.constructor : Object;
    }
}
//# sourceMappingURL=typespec.js.map