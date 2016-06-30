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
	var model_ts_1 = __webpack_require__(3);
	exports.Model = model_ts_1.Model;
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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_ts_1 = __webpack_require__(4);
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(Model.prototype, "collection", {
	        get: function () {
	            return this._ownerKey ? null : this._owner;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.define = function (protoProps, staticProps) {
	        index_ts_1.Record.define(protoProps, staticProps);
	        var BaseCollection = Object.getPrototypeOf(this.prototype).constructor.Collection;
	        var collection = protoProps && protoProps.collection;
	        var CollectionConstructor;
	        if (typeof collection === 'function') {
	            CollectionConstructor = collection;
	        }
	        else if (this.Collection !== BaseCollection) {
	            CollectionConstructor = this.Collection;
	        }
	        else {
	            CollectionConstructor = (function (_super) {
	                __extends(Collection, _super);
	                function Collection() {
	                    _super.apply(this, arguments);
	                }
	                return Collection;
	            }(BaseCollection));
	            CollectionConstructor.define(collection);
	        }
	        CollectionConstructor.prototype.Record = this;
	        this.Collection = CollectionConstructor;
	        return this;
	    };
	    return Model;
	}(index_ts_1.Record));
	exports.Model = Model;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(5);
	exports.Record = transaction_ts_1.Record;
	var tools_ts_1 = __webpack_require__(2);
	var class_ts_1 = __webpack_require__(1);
	var define_ts_1 = __webpack_require__(6);
	var nestedTypes_ts_1 = __webpack_require__(8);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tools_ts_1 = __webpack_require__(2);
	var class_ts_1 = __webpack_require__(1);
	var _cidCounter = 0;
	var Record = (function (_super) {
	    __extends(Record, _super);
	    function Record(a_values, a_options, owner) {
	        var _this = this;
	        _super.call(this);
	        var options = a_options || {}, values = (options.parse ? this.parse(a_values) : a_values) || {};
	        this._changing = this._pending = false;
	        this._owner = owner;
	        this.cid = this.cidPrefix + _cidCounter++;
	        var attributes = options.clone ? cloneAttributes(this, values) : this.defaults(values);
	        this.forEachAttr(attributes, function (value, key, attr) {
	            var next = attributes[key] = attr.transform(value, options, void 0, _this);
	            attr.handleChange(next, void 0, _this);
	        });
	        this.attributes = this._previousAttributes = attributes;
	        this.initialize(a_values, a_options);
	    }
	    Record.define = function (protoProps, staticProps) { return this; };
	    Record.prototype.getOwner = function () {
	        var _owner = this._owner;
	        return this._ownerKey ? _owner : _owner && _owner._owner;
	    };
	    Record.prototype._notifyChange = function (options) { };
	    Record.prototype._notifyChangeAttr = function (key, options) { };
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
	                tools_ts_1.log.warn('[Unknown Attribute]', this, 'Unknown record attribute "' + name_1 + '" is ignored:', attrs);
	            }
	        }
	    };
	    Record.prototype._toJSON = function () { return {}; };
	    Record.prototype._parse = function (data) { return data; };
	    Record.prototype.defaults = function (values) { return {}; };
	    Record.prototype.initialize = function (values, options) { };
	    Record.prototype.clone = function (owner) {
	        return new this.constructor(this.attributes, { clone: true }, owner);
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
	    };
	    Record.prototype.parse = function (data) {
	        return this._parse(data);
	    };
	    Record.prototype.set = function (values, options) {
	        if (values) {
	            this.createTransaction(values, options).commit(options);
	        }
	        return this;
	    };
	    Record.prototype.createTransaction = function (a_values, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var transaction = new RecordTransaction(this), changes = transaction.changes, nested = transaction.nested, attributes = this.attributes, values = options.parse ? this.parse(a_values) : a_values, merge = options.merge === void 0 || options.merge;
	        if (Object.getPrototypeOf(values) === Object.prototype) {
	            this.forEachAttr(values, function (value, key, attr) {
	                var prev = attributes[key];
	                if (merge && attr.canBeUpdated(prev, value)) {
	                    nested.push(prev.createTransaction(value, options));
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
	            tools_ts_1.log.error('[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.');
	        }
	        return transaction;
	    };
	    Record.prototype.transaction = function (fun, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        fun(this);
	        isRoot && commit(this, options);
	    };
	    Record.prototype._onChildrenChange = function (child, options) {
	        this.forceAttributeChange(child._ownerKey, options);
	    };
	    Record.prototype.forceAttributeChange = function (key, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        if (!options.silent) {
	            this._pending = true;
	            key && this._notifyChangeAttr(key, options);
	        }
	        isRoot && commit(this, options);
	    };
	    return Record;
	}(class_ts_1.Class));
	exports.Record = Record;
	;
	var recordProto = Record.prototype;
	recordProto.cid = 'c';
	recordProto.idAttribute = 'id';
	function cloneAttributes(record, a_attributes) {
	    var attributes = new record.Attributes(a_attributes);
	    record.forEachAttr(attributes, function (value, name, attr) {
	        attributes[name] = attr.clone(value);
	    });
	    return attributes;
	}
	function setAttribute(record, name, value) {
	    var isRoot = begin(record), options = {};
	    var attributes = record.attributes, spec = record._attributes[name], prev = attributes[name];
	    if (spec.canBeUpdated(prev, value)) {
	        prev.createTransaction(value, options).commit(options);
	    }
	    else {
	        var next = spec.transform(value, options, prev, record);
	        if (spec.isChanged(next, prev)) {
	            attributes[name] = next;
	            if (spec.handleChange) {
	                spec.handleChange(next, prev, this);
	            }
	            record._pending = true;
	            record._notifyChangeAttr(name, options);
	        }
	    }
	    isRoot && commit(record, options);
	}
	exports.setAttribute = setAttribute;
	function begin(record) {
	    var isRoot = !record._changing;
	    if (isRoot) {
	        record._changing = true;
	        record._previousAttributes = new record.Attributes(record.attributes);
	    }
	    return isRoot;
	}
	function commit(record, options) {
	    if (!options.silent) {
	        while (record._pending) {
	            record._pending = false;
	            record._notifyChange(options);
	        }
	    }
	    record._pending = false;
	    record._changing = false;
	    var _owner = record._owner;
	    if (_owner) {
	        _owner._onChildrenChange(record, options);
	    }
	}
	var RecordTransaction = (function () {
	    function RecordTransaction(model) {
	        this.model = model;
	        this.isRoot = begin(model);
	        this.model = model;
	        this.changes = [];
	        this.nested = [];
	    }
	    RecordTransaction.prototype.commit = function (options) {
	        if (options === void 0) { options = {}; }
	        var _a = this, nested = _a.nested, model = _a.model;
	        for (var i = 0; i < nested.length; i++) {
	            nested[i].commit(options);
	        }
	        if (!options.silent) {
	            var changes = this.changes;
	            if (changes.length) {
	                model._pending = true;
	            }
	            for (var i = 0; i < changes.length; i++) {
	                model._notifyChangeAttr(changes[i], options);
	            }
	        }
	        this.isRoot && commit(model, options);
	    };
	    return RecordTransaction;
	}());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var attribute_ts_1 = __webpack_require__(7);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(5);
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
	    GenericAttribute.prototype.validate = function (model, value, name) { };
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var attribute_ts_1 = __webpack_require__(7);
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map