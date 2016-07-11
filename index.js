(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Nested"] = factory();
	else
		root["Nested"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var class_ts_1 = __webpack_require__(1);
	exports.Class = class_ts_1.Class;
	exports.mixins = class_ts_1.mixins;
	exports.define = class_ts_1.define;
	exports.mixinRules = class_ts_1.mixinRules;
	exports.extendable = class_ts_1.extendable;
	var index_ts_1 = __webpack_require__(3);
	exports.Record = index_ts_1.Record;
	var tools = __webpack_require__(2);
	exports.tools = tools;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tools_ts_1 = __webpack_require__(2);
	var Class = (function () {
	    function Class() {
	    }
	    Class.create = function (a, b, c) {
	        return new this(a, b, c);
	    };
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
	    Class.define = function (definition, staticProps) {
	        if (definition === void 0) { definition = {}; }
	        if (!this.define) {
	            tools_ts_1.log.error("[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
	            return this;
	        }
	        var proto = this.prototype, BaseClass = Object.getPrototypeOf(proto).constructor;
	        if (BaseClass.create === this.create) {
	            this.create = Class.create;
	        }
	        var protoProps = tools_ts_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
	        tools_ts_1.assign(proto, protoProps);
	        tools_ts_1.assign(this, staticProps);
	        properties && Object.defineProperties(proto, properties);
	        mixinRules && this.mixinRules(mixinRules);
	        mixins && this.mixins(mixins);
	        return this;
	    };
	    Class.extend = function (spec, statics) {
	        var Subclass;
	        if (spec.constructor) {
	            Subclass = spec.constructor;
	            __extends(Subclass, this);
	        }
	        else {
	            Subclass = (function (_super) {
	                __extends(Subclass, _super);
	                function Subclass() {
	                    _super.apply(this, arguments);
	                }
	                return Subclass;
	            }(this));
	        }
	        return Subclass.define(spec, statics);
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
	function extendable(Type) {
	    Class.attach(Type);
	    return Type;
	}
	exports.extendable = extendable;
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
	    var x = tools_ts_1.assign({}, a);
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
	        var sourceProp = Object.getOwnPropertyDescriptor(source, name_2), destProp = tools_ts_1.getPropertyDescriptor(target, name_2);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	exports.log = {
	    level: 2,
	    error: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        console.error.apply(this, args);
	    },
	    warn: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 0)
	            console.warn.apply(this, args);
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
	function isValidJSON(value) {
	    if (value === null) {
	        return true;
	    }
	    switch (typeof value) {
	        case 'number':
	        case 'string':
	        case 'boolean':
	            return true;
	        case 'object':
	            var proto = Object.getPrototypeOf(value);
	            if (proto === Object.prototype || proto === Array.prototype) {
	                return every(value, isValidJSON);
	            }
	    }
	    return false;
	}
	exports.isValidJSON = isValidJSON;
	function someArray(arr, fun) {
	    var result;
	    for (var i = 0; i < arr.length; i++) {
	        if (result = fun(arr[i], i)) {
	            return result;
	        }
	    }
	}
	function someObject(obj, fun) {
	    var result;
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            if (result = fun(obj[key], key)) {
	                return result;
	            }
	        }
	    }
	}
	function some(obj, fun) {
	    if (Object.getPrototypeOf(obj) === ArrayProto) {
	        return someArray(obj, fun);
	    }
	    else {
	        return someObject(obj, fun);
	    }
	}
	exports.some = some;
	function every(obj, predicate) {
	    return !some(obj, function (x) { return !predicate(x); });
	}
	exports.every = every;
	function getPropertyDescriptor(obj, prop) {
	    var desc;
	    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
	        desc = Object.getOwnPropertyDescriptor(obj, prop);
	    }
	    return desc;
	}
	exports.getPropertyDescriptor = getPropertyDescriptor;
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
	function transform(dest, source, fun) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            var value = fun(source[name], name);
	            value === void 0 || (dest[name] = value);
	        }
	    }
	    return dest;
	}
	exports.transform = transform;
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
	exports.parseDate = parseDate;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(4);
	exports.Record = transaction_ts_1.Record;
	var tools_ts_1 = __webpack_require__(2);
	var class_ts_1 = __webpack_require__(1);
	var define_ts_1 = __webpack_require__(12);
	var nestedTypes_ts_1 = __webpack_require__(14);
	transaction_ts_1.Record.define = function (protoProps, staticProps) {
	    var baseProto = Object.getPrototypeOf(this.prototype), BaseConstructor = baseProto.constructor;
	    if (protoProps) {
	        var definition = define_ts_1.compile(protoProps.attributes, baseProto._attributes);
	        tools_ts_1.assign(definition.properties, protoProps.properties || {});
	        tools_ts_1.defaults(definition, tools_ts_1.omit(protoProps, 'attributes', 'collection'));
	        class_ts_1.Class.define.call(this, definition, staticProps);
	    }
	    return this;
	};
	transaction_ts_1.Record._attribute = nestedTypes_ts_1.TransactionalType;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_ts_1 = __webpack_require__(5);
	var transactions_ts_1 = __webpack_require__(9);
	var _cidCounter = 0;
	var Record = (function (_super) {
	    __extends(Record, _super);
	    function Record(a_values, a_options, owner) {
	        var _this = this;
	        _super.call(this, _cidCounter++, owner);
	        var options = a_options || {}, values = (options.parse ? this.parse(a_values) : a_values) || {};
	        var attributes = options.clone ? cloneAttributes(this, values) : this.defaults(values);
	        this.forEachAttr(attributes, function (value, key, attr) {
	            var next = attributes[key] = attr.transform(value, options, void 0, _this);
	            attr.handleChange(next, void 0, _this);
	        });
	        this.attributes = this._previousAttributes = attributes;
	        this.initialize(a_values, a_options);
	    }
	    Record.define = function (protoProps, staticProps) { return this; };
	    Object.defineProperty(Record.prototype, "changed", {
	        get: function () {
	            var changed = this._changedAttributes;
	            if (!changed) {
	                var prev_1 = this._previousAttributes;
	                changed = {};
	                this.forEachAttr(this.attributes, function (value, key, attribute) {
	                    if (attribute.isChanged(value, prev_1[key])) {
	                        changed[key] = value;
	                    }
	                });
	                this._changedAttributes = changed;
	            }
	            return changed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Record.prototype.getOwner = function () {
	        var owner = this._owner;
	        return this._ownerKey ? owner : owner && owner._owner;
	    };
	    Object.defineProperty(Record.prototype, "id", {
	        get: function () { return this.attributes[this.idAttribute]; },
	        set: function (x) { setAttribute(this, this.idAttribute, x); },
	        enumerable: true,
	        configurable: true
	    });
	    Record.prototype.forEachAttr = function (attrs, iteratee) {
	        var _attributes = this._attributes;
	        for (var name_1 in attrs) {
	            var spec = _attributes[name_1];
	            if (spec) {
	                iteratee(attrs[name_1], name_1, spec);
	            }
	            else {
	                index_ts_1.log.warn('[Unknown Attribute]', this, 'Unknown record attribute "' + name_1 + '" is ignored:', attrs);
	            }
	        }
	    };
	    Record.prototype.each = function (iteratee, context) {
	        var fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, attributes = this.attributes;
	        for (var key in attributes) {
	            var value = attributes[key];
	            if (value !== void 0)
	                fun(value, key);
	        }
	    };
	    Record.prototype._toJSON = function () { return {}; };
	    Record.prototype._parse = function (data) { return data; };
	    Record.prototype.defaults = function (values) { return {}; };
	    Record.prototype.initialize = function (values, options) { };
	    Record.prototype.clone = function (owner) {
	        return new this.constructor(this.attributes, { clone: true }, owner);
	    };
	    Record.prototype._validateNested = function (errors) {
	        var _this = this;
	        var length = 0;
	        this.forEachAttr(this.attributes, function (value, name, attribute) {
	            var error = attribute.validate(_this, value, name);
	            if (error) {
	                errors[name] = error;
	                length++;
	            }
	        });
	        return length;
	    };
	    Record.prototype.get = function (key) {
	        return this[key];
	    };
	    Record.prototype.toJSON = function () {
	        var _this = this;
	        var json = {};
	        this.forEachAttr(this.attributes, function (value, key, _a) {
	            var toJSON = _a.toJSON;
	            if (toJSON && value !== void 0) {
	                json[key] = toJSON.call(_this, value, key);
	            }
	        });
	        return json;
	    };
	    Record.prototype.parse = function (data) {
	        return this._parse(data);
	    };
	    Record.prototype._createTransaction = function (a_values, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this), changes = [], nested = [], attributes = this.attributes, values = options.parse ? this.parse(a_values) : a_values, merge = !options.reset;
	        if (Object.getPrototypeOf(values) === Object.prototype) {
	            this.forEachAttr(values, function (value, key, attr) {
	                var prev = attributes[key];
	                if (merge && attr.canBeUpdated(prev, value)) {
	                    var nestedTransaction = prev.createTransaction(value, options);
	                    if (nestedTransaction) {
	                        nested.push(nestedTransaction);
	                        changes.push(key);
	                    }
	                    return;
	                }
	                var next = attr.transform(value, options, prev, _this);
	                if (attr.isChanged(next, prev)) {
	                    attributes[key] = next;
	                    changes.push(key);
	                    attr.handleChange(next, prev, _this);
	                }
	            });
	        }
	        else {
	            index_ts_1.log.error('[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.');
	        }
	        if (nested.length || changes.length) {
	            return new RecordTransaction(this, isRoot, nested, changes);
	        }
	        isRoot && transactions_ts_1.commit(this, options);
	    };
	    Record.prototype._onChildrenChange = function (child, options) {
	        this.forceAttributeChange(child._ownerKey, options);
	    };
	    Record.prototype.forceAttributeChange = function (key, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        if (!options.silent) {
	            markAsDirty(this);
	            index_ts_1.trigger3(this, 'change:' + key, this.attributes[key], this, options);
	        }
	        isRoot && transactions_ts_1.commit(this, options);
	    };
	    Record.prototype.dispose = function () {
	        var _this = this;
	        this.forEachAttr(this.attributes, function (value, key) {
	            if (value && _this === value._owner) {
	                value.dispose();
	            }
	        });
	        _super.prototype.dispose.call(this);
	    };
	    return Record;
	}(transactions_ts_1.Transactional));
	exports.Record = Record;
	;
	var recordProto = Record.prototype;
	recordProto.cid = 'c';
	recordProto.idAttribute = 'id';
	function begin(record) {
	    if (transactions_ts_1.begin(record)) {
	        record._previousAttributes = new record.Attributes(record.attributes);
	        return true;
	    }
	    return false;
	}
	function markAsDirty(record) {
	    transactions_ts_1.markAsDirty(record);
	    record._changedAttributes = null;
	}
	function cloneAttributes(record, a_attributes) {
	    var attributes = new record.Attributes(a_attributes);
	    record.forEachAttr(attributes, function (value, name, attr) {
	        attributes[name] = attr.clone(value);
	    });
	    return attributes;
	}
	function setAttribute(record, name, value) {
	    var isRoot = begin(record), options = {}, attributes = record.attributes, spec = record._attributes[name], prev = attributes[name];
	    if (spec.canBeUpdated(prev, value)) {
	        var nestedTransaction = prev._createTransaction(value, options);
	        if (nestedTransaction) {
	            nestedTransaction.commit(options, true);
	            markAsDirty(record);
	            index_ts_1.trigger3(record, 'change:' + name, prev, record, options);
	        }
	    }
	    else {
	        var next = spec.transform(value, options, prev, record);
	        if (spec.isChanged(next, prev)) {
	            attributes[name] = next;
	            if (spec.handleChange) {
	                spec.handleChange(next, prev, this);
	            }
	            markAsDirty(record);
	            index_ts_1.trigger3(record, 'change:' + name, next, record, options);
	        }
	    }
	    isRoot && transactions_ts_1.commit(record, options);
	}
	exports.setAttribute = setAttribute;
	var RecordTransaction = (function () {
	    function RecordTransaction(object, isRoot, nested, changes) {
	        this.object = object;
	        this.isRoot = isRoot;
	        this.nested = nested;
	        this.changes = changes;
	        markAsDirty(object);
	    }
	    RecordTransaction.prototype.commit = function (options, isNested) {
	        if (options === void 0) { options = {}; }
	        var _a = this, nested = _a.nested, object = _a.object, changes = _a.changes;
	        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
	            var transaction = nested_1[_i];
	            transaction.commit(options, true);
	        }
	        if (!options.silent) {
	            var attributes = object.attributes;
	            for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
	                var key = changes_1[_b];
	                index_ts_1.trigger3(object, 'change:' + key, attributes[key], object, options);
	            }
	        }
	        this.isRoot && transactions_ts_1.commit(object, options, isNested);
	    };
	    return RecordTransaction;
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.log = {
	    level: 2,
	    error: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        console.error.apply(this, args);
	    },
	    warn: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 0)
	            console.warn.apply(this, args);
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
	function isValidJSON(value) {
	    if (value === null) {
	        return true;
	    }
	    switch (typeof value) {
	        case 'number':
	        case 'string':
	        case 'boolean':
	            return true;
	        case 'object':
	            var proto = Object.getPrototypeOf(value);
	            if (proto === Object.prototype || proto === Array.prototype) {
	                return every(value, isValidJSON);
	            }
	    }
	    return false;
	}
	exports.isValidJSON = isValidJSON;
	function someArray(arr, fun) {
	    var result;
	    for (var i = 0; i < arr.length; i++) {
	        if (result = fun(arr[i], i)) {
	            return result;
	        }
	    }
	}
	function someObject(obj, fun) {
	    var result;
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            if (result = fun(obj[key], key)) {
	                return result;
	            }
	        }
	    }
	}
	function some(obj, fun) {
	    if (Object.getPrototypeOf(obj) === ArrayProto) {
	        return someArray(obj, fun);
	    }
	    else {
	        return someObject(obj, fun);
	    }
	}
	exports.some = some;
	function every(obj, predicate) {
	    return !some(obj, function (x) { return !predicate(x); });
	}
	exports.every = every;
	function getPropertyDescriptor(obj, prop) {
	    var desc;
	    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
	        desc = Object.getOwnPropertyDescriptor(obj, prop);
	    }
	    return desc;
	}
	exports.getPropertyDescriptor = getPropertyDescriptor;
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
	function transform(dest, source, fun) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            var value = fun(source[name], name);
	            value === void 0 || (dest[name] = value);
	        }
	    }
	    return dest;
	}
	exports.transform = transform;
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
	function once(func) {
	    var memo, first = true;
	    return function () {
	        if (first) {
	            first = false;
	            memo = func.apply(this, arguments);
	            func = null;
	        }
	        return memo;
	    };
	}
	exports.once = once;
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
	exports.parseDate = parseDate;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tools_ts_1 = __webpack_require__(6);
	var Class = (function () {
	    function Class() {
	    }
	    Class.create = function (a, b, c) {
	        return new this(a, b, c);
	    };
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
	    Class.define = function (definition, staticProps) {
	        if (definition === void 0) { definition = {}; }
	        if (!this.define) {
	            tools_ts_1.log.error("[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
	            return this;
	        }
	        var proto = this.prototype, BaseClass = Object.getPrototypeOf(proto).constructor;
	        if (BaseClass.create === this.create) {
	            this.create = Class.create;
	        }
	        var protoProps = tools_ts_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
	        tools_ts_1.assign(proto, protoProps);
	        tools_ts_1.assign(this, staticProps);
	        properties && Object.defineProperties(proto, properties);
	        mixinRules && this.mixinRules(mixinRules);
	        mixins && this.mixins(mixins);
	        return this;
	    };
	    Class.extend = function (spec, statics) {
	        var Subclass;
	        if (spec && spec.hasOwnProperty('constructor')) {
	            Subclass = spec.constructor;
	            __extends(Subclass, this);
	        }
	        else {
	            Subclass = (function (_super) {
	                __extends(Subclass, _super);
	                function Subclass() {
	                    _super.apply(this, arguments);
	                }
	                return Subclass;
	            }(this));
	        }
	        return Subclass.define(spec, statics);
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
	function extendable(Type) {
	    Class.attach(Type);
	    return Type;
	}
	exports.extendable = extendable;
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
	    var x = tools_ts_1.assign({}, a);
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
	        var sourceProp = Object.getOwnPropertyDescriptor(source, name_2), destProp = tools_ts_1.getPropertyDescriptor(target, name_2);
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mixins_ts_1 = __webpack_require__(7);
	function trigger1(self, name, a) {
	    var _events = self._events;
	    if (_events) {
	        _fireEvent1(_events[name], a);
	        _fireEvent2(_events.all, name, a);
	    }
	}
	exports.trigger1 = trigger1;
	;
	function trigger2(self, name, a, b) {
	    var _events = self._events;
	    if (_events) {
	        _fireEvent2(_events[name], a, b);
	        _fireEvent3(_events.all, name, a, b);
	    }
	}
	exports.trigger2 = trigger2;
	;
	function trigger3(self, name, a, b, c) {
	    var _events = self._events;
	    if (_events) {
	        _fireEvent3(_events[name], a, b, c);
	        _fireEvent4(_events.all, name, a, b, c);
	    }
	}
	exports.trigger3 = trigger3;
	;
	function _fireEvent1(events, a) {
	    if (events)
	        for (var i = 0, l = events.length, ev; i < l; i++)
	            (ev = events[i]).callback.call(ev.ctx, a);
	}
	function _fireEvent2(events, a, b) {
	    if (events)
	        for (var i = 0, l = events.length, ev; i < l; i++)
	            (ev = events[i]).callback.call(ev.ctx, a, b);
	}
	function _fireEvent3(events, a, b, c) {
	    if (events)
	        for (var i = 0, l = events.length, ev; i < l; i++)
	            (ev = events[i]).callback.call(ev.ctx, a, b, c);
	}
	function _fireEvent4(events, a, b, c, d) {
	    if (events)
	        for (var i = 0, l = events.length, ev; i < l; i++)
	            (ev = events[i]).callback.call(ev.ctx, a, b, c, d);
	}
	var eventSplitter = /\s+/;
	var eventsApi = function (iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	        if (callback !== void 0 && 'context' in opts && opts.context === void 0)
	            opts.context = callback;
	        for (names = Object.keys(name); i < names.length; i++) {
	            events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	        }
	    }
	    else if (name && eventSplitter.test(name)) {
	        for (names = name.split(eventSplitter); i < names.length; i++) {
	            events = iteratee(events, names[i], callback, opts);
	        }
	    }
	    else {
	        events = iteratee(events, name, callback, opts);
	    }
	    return events;
	};
	function isEmpty(obj) {
	    for (var i in obj) {
	        return false;
	    }
	    return true;
	}
	var _idCount = 0;
	function uniqueId() {
	    return 'l' + _idCount++;
	}
	var ListeningTo = (function () {
	    function ListeningTo(obj, objId, id, listeningTo) {
	        this.obj = obj;
	        this.objId = objId;
	        this.id = id;
	        this.listeningTo = listeningTo;
	        this.count = 0;
	    }
	    return ListeningTo;
	}());
	var Messenger = (function () {
	    function Messenger(cid) {
	        this._events = void 0;
	        this._listeners = void 0;
	        this._listeningTo = void 0;
	        this.cid = this.cidPrefix + cid;
	    }
	    Messenger.prototype.on = function (name, callback, context) {
	        return internalOn(this, name, callback, context);
	    };
	    Messenger.prototype.off = function (name, callback, context) {
	        if (!this._events)
	            return this;
	        this._events = eventsApi(offApi, this._events, name, callback, new OffOptions(context, this._listeners));
	        return this;
	    };
	    Messenger.prototype.stopListening = function (obj, name, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var ids = obj ? [obj.cid] : Object.keys(listeningTo);
	        for (var i = 0; i < ids.length; i++) {
	            var listening = listeningTo[ids[i]];
	            if (!listening)
	                break;
	            listening.obj.off(name, callback, this);
	        }
	        if (isEmpty(listeningTo))
	            this._listeningTo = void 0;
	        return this;
	    };
	    Messenger.prototype.listenTo = function (obj, name, callback) {
	        if (!obj)
	            return this;
	        var id = obj.cid || (obj.cid = uniqueId());
	        var listeningTo = this._listeningTo || (this._listeningTo = {});
	        var listening = listeningTo[id];
	        if (!listening) {
	            var thisId = this.cid || (this.cid = uniqueId());
	            listening = listeningTo[id] = new ListeningTo(obj, id, thisId, listeningTo);
	        }
	        internalOn(obj, name, callback, this, listening);
	        return this;
	    };
	    Messenger.prototype.once = function (name, callback, context) {
	        var events = eventsApi(onceMap, {}, name, callback, this.off.bind(this));
	        return this.on(events, void 0, context);
	    };
	    Messenger.prototype.listenToOnce = function (obj, name, callback) {
	        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind(this, obj));
	        return this.listenTo(obj, events);
	    };
	    Messenger.prototype.trigger = function (name) {
	        if (!this._events)
	            return this;
	        var length = Math.max(0, arguments.length - 1);
	        var args = Array(length);
	        for (var i = 0; i < length; i++)
	            args[i] = arguments[i + 1];
	        eventsApi(triggerApi, this._events, name, void 0, args);
	        return this;
	    };
	    Messenger.prototype.dispose = function () {
	        this.stopListening();
	        this.off();
	    };
	    return Messenger;
	}());
	exports.Messenger = Messenger;
	Messenger.prototype.cidPrefix = 'l';
	exports.Events = Messenger.prototype;
	mixins_ts_1.Class.attach(Messenger);
	var internalOn = function (obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, new Handler(context, obj, listening));
	    if (listening) {
	        var listeners = obj._listeners || (obj._listeners = {});
	        listeners[listening.id] = listening;
	    }
	    return obj;
	};
	var Handler = (function () {
	    function Handler(context, ctx, listening, callback) {
	        this.context = context;
	        this.ctx = ctx;
	        this.listening = listening;
	        this.callback = callback;
	    }
	    Handler.prototype.clone = function (callback) {
	        var _a = this, context = _a.context, listening = _a.listening;
	        if (listening)
	            listening.count++;
	        return new Handler(context, context || this.ctx, listening, callback);
	    };
	    return Handler;
	}());
	var onApi = function (events, name, callback, options) {
	    if (callback) {
	        var handlers = events[name] || (events[name] = []);
	        handlers.push(options.clone(callback));
	    }
	    return events;
	};
	var OffOptions = (function () {
	    function OffOptions(context, listeners) {
	        this.context = context;
	        this.listeners = listeners;
	    }
	    return OffOptions;
	}());
	var offApi = function (events, name, callback, options) {
	    if (!events)
	        return;
	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;
	    if (!name && !callback && !context) {
	        var ids = Object.keys(listeners);
	        for (; i < ids.length; i++) {
	            listening = listeners[ids[i]];
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	        }
	        return;
	    }
	    var names = name ? [name] : Object.keys(events);
	    for (; i < names.length; i++) {
	        name = names[i];
	        var handlers = events[name];
	        if (!handlers)
	            break;
	        var remaining = [];
	        for (var j = 0; j < handlers.length; j++) {
	            var handler = handlers[j];
	            if (callback && callback !== handler.callback &&
	                callback !== handler.callback._callback ||
	                context && context !== handler.context) {
	                remaining.push(handler);
	            }
	            else {
	                listening = handler.listening;
	                if (listening && --listening.count === 0) {
	                    delete listeners[listening.id];
	                    delete listening.listeningTo[listening.objId];
	                }
	            }
	        }
	        if (remaining.length) {
	            events[name] = remaining;
	        }
	        else {
	            delete events[name];
	        }
	    }
	    if (!isEmpty(events))
	        return events;
	};
	var onceMap = function (map, name, callback, offer) {
	    if (callback) {
	        var once = map[name] = once(function () {
	            offer(name, once);
	            callback.apply(this, arguments);
	        });
	        once._callback = callback;
	    }
	    return map;
	};
	var triggerApi = function (objEvents, name, cb, args) {
	    if (objEvents) {
	        var events = objEvents[name];
	        var allEvents = objEvents.all;
	        if (events && allEvents)
	            allEvents = allEvents.slice();
	        if (events)
	            triggerEvents(events, args);
	        if (allEvents)
	            triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	};
	var triggerEvents = function (events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	        case 0:
	            while (++i < l)
	                (ev = events[i]).callback.call(ev.ctx);
	            return;
	        case 1:
	            while (++i < l)
	                (ev = events[i]).callback.call(ev.ctx, a1);
	            return;
	        case 2:
	            while (++i < l)
	                (ev = events[i]).callback.call(ev.ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l)
	                (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	            return;
	        default:
	            while (++i < l)
	                (ev = events[i]).callback.apply(ev.ctx, args);
	            return;
	    }
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_ts_1 = __webpack_require__(5);
	var validation_ts_1 = __webpack_require__(10);
	var references_ts_1 = __webpack_require__(11);
	var Transactional = (function (_super) {
	    __extends(Transactional, _super);
	    function Transactional(cid, owner, ownerKey) {
	        _super.call(this, cid);
	        this._changeToken = {};
	        this._transaction = false;
	        this._isDirty = false;
	        this._validationError = void 0;
	        this._owner = owner;
	        this._ownerKey = ownerKey;
	    }
	    Transactional.prototype.transaction = function (fun, options) {
	        var isRoot = begin(this);
	        fun(this);
	        isRoot && commit(this, options);
	    };
	    Transactional.prototype.updateEach = function (iteratee, options) {
	        var isRoot = begin(this);
	        this.each(iteratee);
	        isRoot && commit(this, options);
	    };
	    Transactional.prototype.set = function (values, options) {
	        if (values) {
	            var transaction = this._createTransaction(values, options);
	            transaction && transaction.commit(options, true);
	        }
	        return this;
	    };
	    Transactional.prototype.parse = function (data) { return data; };
	    Transactional.prototype.deepGet = function (reference) {
	        return references_ts_1.resolveReference(this, reference, function (object, key) { return object.get(key); });
	    };
	    Transactional.prototype.getOwner = function () {
	        return this._owner;
	    };
	    Transactional.prototype.getStore = function () {
	        var _owner = this._owner;
	        return _owner ? _owner.getStore() : this._defaultStore;
	    };
	    Transactional.prototype.map = function (iteratee, context) {
	        var arr = [], fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee;
	        this.each(function (val, key) {
	            var result = fun(val, key);
	            if (result !== void 0)
	                arr.push(result);
	        });
	        return arr;
	    };
	    Transactional.prototype.mapObject = function (iteratee, context) {
	        var obj = {}, fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee;
	        this.each(function (val, key) {
	            var result = iteratee(val, key);
	            if (result !== void 0)
	                obj[key] = result;
	        });
	        return obj;
	    };
	    Transactional.prototype.keys = function () {
	        return this.map(function (value, key) {
	            if (value !== void 0)
	                return key;
	        });
	    };
	    Transactional.prototype.values = function () {
	        return this.map(function (value) { return value; });
	    };
	    Object.defineProperty(Transactional.prototype, "validationError", {
	        get: function () {
	            return this._validationError || (this._validationError = new validation_ts_1.ValidationError(this));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Transactional.prototype.validate = function (obj) { };
	    Transactional.prototype.getValidationError = function (key) {
	        var error = this.validationError;
	        return (key ? error && error.nested[key] : error) || null;
	    };
	    Transactional.prototype.deepValidationError = function (reference) {
	        return references_ts_1.resolveReference(this, reference, function (object, key) { return object.getValidationError(key); });
	    };
	    Transactional.prototype.eachValidationError = function (iteratee) {
	        var validationError = this.validationError;
	        validationError && validationError.eachError(iteratee, this);
	    };
	    Transactional.prototype.isValid = function (key) {
	        return !this.getValidationError(key);
	    };
	    return Transactional;
	}(index_ts_1.Messenger));
	exports.Transactional = Transactional;
	Transactional.prototype._changeEventName = 'change';
	function begin(object) {
	    return object._transaction ? false : (object._transaction = true);
	}
	exports.begin = begin;
	function markAsDirty(object) {
	    object._isDirty = true;
	    object._changeToken = {};
	    object._validationError = void 0;
	}
	exports.markAsDirty = markAsDirty;
	function commit(object, options, isNested) {
	    var wasDirty = object._isDirty;
	    if (options.silent) {
	        object._isDirty = false;
	    }
	    else {
	        while (object._isDirty) {
	            object._isDirty = false;
	            index_ts_1.trigger2(object, object._changeEventName, object, options);
	        }
	    }
	    object._transaction = false;
	    if (!isNested && wasDirty && object._owner) {
	        object._owner._onChildrenChange(object, options);
	    }
	}
	exports.commit = commit;
	function aquire(owner, child, key) {
	    if (!child._owner) {
	        child._owner = owner;
	        child._ownerKey = key;
	    }
	}
	exports.aquire = aquire;
	function free(owner, child) {
	    if (owner === child._owner) {
	        child._owner = void 0;
	        child._ownerKey = void 0;
	    }
	}
	exports.free = free;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var ValidationError = (function () {
	    function ValidationError(obj) {
	        this.length = obj._validateNested(this.nested = {});
	        if (this.error = obj.validate(obj)) {
	            this.length++;
	        }
	    }
	    ValidationError.prototype.each = function (iteratee) {
	        var _a = this, error = _a.error, nested = _a.nested;
	        if (error)
	            iteratee(error, null);
	        for (var key in nested) {
	            iteratee(nested[key], key);
	        }
	    };
	    ValidationError.prototype.eachError = function (iteratee, object) {
	        this.each(function (value, key) {
	            if (value instanceof ValidationError) {
	                value._traverse(iteratee, object.get(key));
	            }
	            else {
	                iteratee(value, key, object);
	            }
	        });
	    };
	    return ValidationError;
	}());
	exports.ValidationError = ValidationError;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var referenceMask = /\~|\^|([^.]+)/g;
	function compileReference(reference) {
	    var path = reference
	        .match(referenceMask)
	        .map(function (key) { return key === '~' ? 'getStrore()' : (key === '^' ? 'getOwner()' : key); })
	        .join('.');
	    return new Function('self', "return self." + path + ";");
	}
	exports.compileReference = compileReference;
	function resolveReference(root, reference, action) {
	    var path = reference.match(referenceMask), skip = path.length - 1;
	    var self = root;
	    for (var i = 0; i < skip; i++) {
	        var key = path[i];
	        switch (key) {
	            case '~':
	                self = self.getStore();
	                break;
	            case '^':
	                self = self.getOwner();
	                break;
	            default: self = self.get(key);
	        }
	        if (!self)
	            return;
	    }
	    action(self, path[skip]);
	    return self;
	}
	exports.resolveReference = resolveReference;
	function referenceToObject(reference, value) {
	    var path = reference.split('.'), root = {}, last = path.length - 1;
	    var current = root;
	    for (var i = 0; i < last; i++) {
	        current = current[path[i]] = {};
	    }
	    current[path[last]] = value;
	    return root;
	}
	exports.referenceToObject = referenceToObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var attribute_ts_1 = __webpack_require__(13);
	var tools_ts_1 = __webpack_require__(2);
	var tools_ts_2 = __webpack_require__(2);
	function compile(rawSpecs, baseAttributes) {
	    var myAttributes = tools_ts_1.transform({}, rawSpecs, attribute_ts_1.GenericAttribute.create), allAttributes = tools_ts_1.defaults({}, myAttributes, baseAttributes), Attributes = createCloneCtor(allAttributes), mixin = {
	        Attributes: Attributes,
	        _attributes: new Attributes(allAttributes),
	        properties: tools_ts_1.transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }),
	        defaults: createDefaults(allAttributes),
	        _toJSON: createToJSON(allAttributes),
	        _parse: createParse(myAttributes, allAttributes)
	    };
	    if (tools_ts_2.log.level > 0) {
	        mixin.forEach = createForEach(allAttributes);
	    }
	    return mixin;
	}
	exports.compile = compile;
	function createForEach(attrSpecs) {
	    var statements = ['var v, _a=this._attributes;'];
	    for (var name_1 in attrSpecs) {
	        statements.push("( v = a." + name_1 + " ) === void 0 || f( v, \"" + name_1 + "\", _a." + name_1 + " );");
	    }
	    return new Function('a', 'f', statements.join(''));
	}
	exports.createForEach = createForEach;
	function createCloneCtor(attrSpecs) {
	    var statements = [];
	    for (var name_2 in attrSpecs) {
	        statements.push("this." + name_2 + " = x." + name_2 + ";");
	    }
	    var CloneCtor = new Function("x", statements.join(''));
	    CloneCtor.prototype = Object.prototype;
	    return CloneCtor;
	}
	exports.createCloneCtor = createCloneCtor;
	function createDefaults(attrSpecs) {
	    var assign_f = ['var v;'], create_f = [];
	    function appendExpr(name, expr) {
	        assign_f.push("this." + name + " = ( v = a." + name + " ) === void 0 ? " + expr + " : v;");
	        create_f.push("this." + name + " = " + expr + ";");
	    }
	    for (var name_3 in attrSpecs) {
	        var attrSpec = attrSpecs[name_3], value = attrSpec.value, type = attrSpec.type;
	        if (value === void 0 && type) {
	            appendExpr(name_3, "i." + name_3 + ".create()");
	        }
	        else {
	            if (tools_ts_1.isValidJSON(value)) {
	                appendExpr(name_3, JSON.stringify(value));
	            }
	            else if (value === void 0) {
	                appendExpr(name_3, 'void 0');
	            }
	            else {
	                appendExpr(name_3, "i." + name_3 + ".value");
	            }
	        }
	    }
	    var CreateDefaults = new Function('i', create_f.join('')), AssignDefaults = new Function('a', 'i', assign_f.join(''));
	    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
	    return function (attrs) {
	        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
	    };
	}
	function createParse(allAttrSpecs, attrSpecs) {
	    var statements = ['var a=this._attributes;'], create = false;
	    for (var name_4 in allAttrSpecs) {
	        var local = attrSpecs[name_4];
	        if (local && local.parse)
	            create = true;
	        if (allAttrSpecs[name_4].parse) {
	            var s = "r." + name_4 + " === void 0 ||( r." + name_4 + " = a." + name_4 + ".parse.call( this, r." + name_4 + ", \"" + name_4 + "\") );";
	            statements.push(s);
	        }
	    }
	    if (create) {
	        statements.push('return r;');
	        return new Function('r', statements.join(''));
	    }
	}
	function createToJSON(attrSpecs) {
	    var statements = ["var json = {},v=this.attributes,a=this._attributes;"];
	    for (var key in attrSpecs) {
	        var toJSON = attrSpecs[key].toJSON;
	        if (toJSON) {
	            statements.push("json." + key + " = a." + key + ".toJSON.call( this, v." + key + ", '" + key + "' );");
	        }
	    }
	    statements.push("return json;");
	    return new Function(statements.join(''));
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(4);
	var tools_ts_1 = __webpack_require__(2);
	var GenericAttribute = (function () {
	    function GenericAttribute(name, options) {
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
	    GenericAttribute.create = function (options, name) {
	        var type = options.type, AttributeCtor = type ? type._attribute : GenericAttribute;
	        return new AttributeCtor(name, options);
	    };
	    GenericAttribute.prototype.canBeUpdated = function (prev, next) {
	        return false;
	    };
	    GenericAttribute.prototype.transform = function (value, options, prev, model) { return value; };
	    GenericAttribute.prototype.convert = function (value, options, model) { return value; };
	    GenericAttribute.prototype.isChanged = function (a, b) {
	        return tools_ts_1.notEqual(a, b);
	    };
	    GenericAttribute.prototype.handleChange = function (next, prev, model) { };
	    GenericAttribute.prototype.create = function () { return new this.type(); };
	    GenericAttribute.prototype.clone = function (value, options) {
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
	    GenericAttribute.prototype.validate = function (record, value, key) { };
	    GenericAttribute.prototype.toJSON = function (value, key) {
	        return value && value.toJSON ? value.toJSON() : value;
	    };
	    GenericAttribute.prototype.createPropertyDescriptor = function () {
	        var _a = this, name = _a.name, getHook = _a.getHook;
	        if (name !== 'id') {
	            return {
	                set: function (value) {
	                    transaction_ts_1.setAttribute(this, name, value);
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
	    GenericAttribute.prototype.initialize = function (name, options) { };
	    GenericAttribute.prototype.addGetHook = function (next) {
	        var prev = this.getHook;
	        this.getHook = prev ?
	            function (value, name) {
	                var next = prev.call(value, name);
	                return next.call(next, name);
	            } : next;
	    };
	    GenericAttribute.prototype.addTransform = function (next) {
	        var prev = this.transform;
	        this.transform = function (value, options, prev, model) {
	            var next = prev.call(this, value, options, prev, model);
	            return next.call(this, next, options, prev, model);
	        };
	    };
	    GenericAttribute.prototype.addChangeHandler = function (next) {
	        var prev = this.handleChange;
	        this.handleChange = prev ?
	            function (next, prev, model) {
	                prev.call(this, next, prev, model);
	                next.call(this, next, prev, model);
	            } : next;
	    };
	    return GenericAttribute;
	}());
	exports.GenericAttribute = GenericAttribute;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var transaction_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./transaction\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var attribute_ts_1 = __webpack_require__(13);
	var TransactionalType = (function (_super) {
	    __extends(TransactionalType, _super);
	    function TransactionalType() {
	        _super.apply(this, arguments);
	    }
	    TransactionalType.prototype.canBeUpdated = function (prev, next) {
	        return prev && next && !(next instanceof this.type);
	    };
	    TransactionalType.prototype.convert = function (value, options, record) {
	        return value == null || value instanceof this.type ? value : this.type.create(value, options, record);
	    };
	    TransactionalType.prototype.create = function () {
	        return new this.type();
	    };
	    TransactionalType.prototype.handleChange = function (next, prev, record) {
	        if (prev && prev._owner === record) {
	            prev._ownerKey = prev._owner = null;
	        }
	        if (next && !next._owner) {
	            next._owner = record;
	            next._ownerKey = this.name;
	        }
	    };
	    return TransactionalType;
	}(attribute_ts_1.GenericAttribute));
	exports.TransactionalType = TransactionalType;
	transaction_1.Record._attribute = TransactionalType;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map