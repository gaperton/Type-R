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
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var tools = __webpack_require__(1);
	exports.tools = tools;
	var index_ts_1 = __webpack_require__(2);
	var index_ts_2 = __webpack_require__(2);
	exports.Model = index_ts_2.Record;
	var events_ts_1 = __webpack_require__(6);
	exports.on = events_ts_1.Events.on, exports.off = events_ts_1.Events.off, exports.trigger = events_ts_1.Events.trigger, exports.once = events_ts_1.Events.once, exports.listenTo = events_ts_1.Events.listenTo, exports.stopListening = events_ts_1.Events.stopListening, exports.listenToOnce = events_ts_1.Events.listenToOnce;
	var index_ts_3 = __webpack_require__(15);
	exports.Collection = index_ts_3.Collection;
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	function value(x) {
	    return new index_ts_1.ChainableAttributeSpec({ value: x });
	}
	exports.value = value;
	function transaction(method) {
	    return function () {
	        var _this = this;
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        var result;
	        this.transaction(function () {
	            result = method.apply(_this, args);
	        });
	        return result;
	    };
	}
	exports.transaction = transaction;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Log = (function () {
	    function Log() {
	        this.level = 2;
	    }
	    Log.prototype.error = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        console.error.apply(console, args);
	    };
	    Log.prototype.warn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 0)
	            console.warn.apply(console, args);
	    };
	    Log.prototype.info = function () {
	        if (this.level > 1)
	            console.info.apply(console, arguments);
	    };
	    Log.prototype.debug = function () {
	        if (this.level > 2)
	            console.log.apply(console, arguments);
	    };
	    return Log;
	}());
	exports.log = new Log();
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
	function getBaseClass(Class) {
	    return Object.getPrototypeOf(Class.prototype).constructor;
	}
	exports.getBaseClass = getBaseClass;
	function isEmpty(obj) {
	    if (obj) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                return false;
	            }
	        }
	    }
	    return true;
	}
	exports.isEmpty = isEmpty;
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
	        if (dest[name] === void 0) {
	            dest[name] = source[name];
	        }
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
	        if (source.hasOwnProperty(name) && dest[name] === void 0) {
	            dest[name] = source[name];
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(3);
	exports.Record = transaction_ts_1.Record;
	var index_ts_1 = __webpack_require__(4);
	var define_ts_1 = __webpack_require__(10);
	var typespec_ts_1 = __webpack_require__(12);
	exports.ChainableAttributeSpec = typespec_ts_1.ChainableAttributeSpec;
	var nestedTypes_ts_1 = __webpack_require__(13);
	exports.TransactionalType = nestedTypes_ts_1.TransactionalType;
	__webpack_require__(14);
	transaction_ts_1.Record.define = function (protoProps, staticProps) {
	    var BaseConstructor = index_ts_1.getBaseClass(this), baseProto = BaseConstructor.prototype;
	    if (protoProps) {
	        var definition = define_ts_1.compile(getAttributes(protoProps), baseProto._attributes);
	        if (protoProps.properties === false) {
	            definition.properties = {};
	        }
	        index_ts_1.assign(definition.properties, protoProps.properties || {});
	        index_ts_1.defaults(definition, index_ts_1.omit(protoProps, 'attributes', 'collection'));
	        index_ts_1.Class.define.call(this, definition, staticProps);
	        defineCollection.call(this, protoProps && protoProps.collection);
	    }
	    return this;
	};
	transaction_ts_1.Record.predefine = function () {
	    index_ts_1.Class.predefine.call(this);
	    this.Collection = index_ts_1.getBaseClass(this).Collection.extend();
	    this.Collection.prototype.model = this;
	    return this;
	};
	transaction_ts_1.Record._attribute = nestedTypes_ts_1.TransactionalType;
	function getAttributes(_a) {
	    var defaults = _a.defaults, attributes = _a.attributes;
	    return typeof defaults === 'function' ? defaults() : attributes || defaults;
	}
	function defineCollection(collection) {
	    var BaseCollection = index_ts_1.getBaseClass(this).Collection;
	    var CollectionConstructor;
	    if (typeof collection === 'function') {
	        CollectionConstructor = collection;
	    }
	    else if (this.Collection !== BaseCollection) {
	        CollectionConstructor = this.Collection;
	        if (collection)
	            CollectionConstructor.mixins(collection);
	    }
	    else {
	        CollectionConstructor = BaseCollection.extend(collection);
	    }
	    CollectionConstructor.prototype.model = this;
	    this.Collection = CollectionConstructor;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var index_ts_1 = __webpack_require__(4);
	var transactions_ts_1 = __webpack_require__(7);
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
	        if (this._listenToSelf)
	            this.listenTo(this, this._listenToSelf);
	    }
	    Record.define = function (protoProps, staticProps) { return transactions_ts_1.Transactional.define(protoProps, staticProps); };
	    Record.defaults = function (attrs) {
	        return this.extend({ attributes: attrs });
	    };
	    Record.prototype.previousAttributes = function () { return new this.Attributes(this._previousAttributes); };
	    Object.defineProperty(Record.prototype, "changed", {
	        get: function () {
	            var changed = this._changedAttributes;
	            if (!changed) {
	                var prev = this._previousAttributes;
	                changed = {};
	                var _a = this, _attributes = _a._attributes, attributes = _a.attributes;
	                for (var _i = 0, _b = this._keys; _i < _b.length; _i++) {
	                    var key = _b[_i];
	                    var value = attributes[key];
	                    if (_attributes[key].isChanged(value, prev[key])) {
	                        changed[key] = value;
	                    }
	                }
	                this._changedAttributes = changed;
	            }
	            return changed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Record.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? index_ts_1.assign({}, this.changed) : false;
	        var val, changed = false, old = this._transaction ? this._previousAttributes : this.attributes, attrSpecs = this._attributes;
	        for (var attr in diff) {
	            if (!attrSpecs[attr].isChanged(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    Record.prototype.hasChanged = function (key) {
	        var _previousAttributes = this._previousAttributes;
	        if (!_previousAttributes)
	            return false;
	        return key ?
	            this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) :
	            !index_ts_1.isEmpty(this.changed);
	    };
	    Record.prototype.previous = function (key) {
	        if (key) {
	            var _previousAttributes = this._previousAttributes;
	            if (_previousAttributes)
	                return _previousAttributes[key];
	        }
	        return null;
	    };
	    Record.prototype.isNew = function () {
	        return this.id === void 0;
	    };
	    Record.prototype.has = function (key) {
	        return this[key] != void 0;
	    };
	    Record.prototype.unset = function (key, options) {
	        this.set(key, void 0, options);
	        return this;
	    };
	    Record.prototype.clear = function (options) {
	        var _this = this;
	        this.transaction(function () {
	            _this.forEachAttr(_this.attributes, function (value, key) { return _this[key] = void 0; });
	        }, options);
	    };
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
	    Record.prototype.Attributes = function (x) { this.id = x.id; };
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
	        var fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, _a = this, attributes = _a.attributes, _keys = _a._keys;
	        for (var _i = 0, _keys_1 = _keys; _i < _keys_1.length; _i++) {
	            var key = _keys_1[_i];
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
	    Record.prototype.set = function (a, b, c) {
	        if (typeof a === 'string') {
	            if (c) {
	                return _super.prototype.set.call(this, (_a = {}, _a[a] = b, _a), c);
	            }
	            else {
	                setAttribute(this, a, b);
	                return this;
	            }
	        }
	        else {
	            return _super.prototype.set.call(this, a, b);
	        }
	        var _a;
	    };
	    Record.prototype.transaction = function (fun, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        fun.call(this, this);
	        isRoot && transactions_ts_1.commit(this);
	    };
	    Record.prototype._createTransaction = function (a_values, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this), changes = [], nested = [], attributes = this.attributes, values = options.parse ? this.parse(a_values) : a_values, merge = !options.reset;
	        if (Object.getPrototypeOf(values) === Object.prototype) {
	            this.forEachAttr(values, function (value, key, attr) {
	                var prev = attributes[key];
	                if (merge && attr.canBeUpdated(prev, value)) {
	                    var nestedTransaction = prev._createTransaction(value, options);
	                    if (nestedTransaction) {
	                        nested.push(nestedTransaction);
	                        changes.push(key);
	                    }
	                    return;
	                }
	                var next = attr.transform(value, options, prev, _this);
	                attributes[key] = next;
	                if (attr.isChanged(next, prev)) {
	                    changes.push(key);
	                    attr.handleChange(next, prev, _this);
	                }
	            });
	        }
	        else {
	            index_ts_1.log.error('[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.');
	        }
	        if ((nested.length || changes.length) && markAsDirty(this, options)) {
	            return new RecordTransaction(this, isRoot, nested, changes);
	        }
	        isRoot && transactions_ts_1.commit(this);
	    };
	    Record.prototype._onChildrenChange = function (child, options) {
	        this.forceAttributeChange(child._ownerKey, options);
	    };
	    Record.prototype.forceAttributeChange = function (key, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        if (markAsDirty(this, options)) {
	            index_ts_1.trigger3(this, 'change:' + key, this, this.attributes[key], options);
	        }
	        isRoot && transactions_ts_1.commit(this);
	    };
	    Object.defineProperty(Record.prototype, "collection", {
	        get: function () {
	            return this._ownerKey ? null : this._owner;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Record.prototype.dispose = function () {
	        var _this = this;
	        this.forEachAttr(this.attributes, function (value, key) {
	            if (value && _this === value._owner) {
	                value.dispose();
	            }
	        });
	        _super.prototype.dispose.call(this);
	    };
	    Record = __decorate([
	        index_ts_1.define({
	            cidPrefix: 'm',
	            idAttribute: 'id'
	        })
	    ], Record);
	    return Record;
	}(transactions_ts_1.Transactional));
	exports.Record = Record;
	;
	function begin(record) {
	    if (transactions_ts_1.begin(record)) {
	        record._previousAttributes = new record.Attributes(record.attributes);
	        record._changedAttributes = null;
	        return true;
	    }
	    return false;
	}
	function markAsDirty(record, options) {
	    if (record._changedAttributes) {
	        record._changedAttributes = null;
	    }
	    return transactions_ts_1.markAsDirty(record, options);
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
	            nestedTransaction.commit(true);
	            markAsDirty(record, options);
	            index_ts_1.trigger3(record, 'change:' + name, record, prev, options);
	        }
	    }
	    else {
	        var next = spec.transform(value, options, prev, record);
	        attributes[name] = next;
	        if (spec.isChanged(next, prev)) {
	            spec.handleChange(next, prev, record);
	            markAsDirty(record, options);
	            index_ts_1.trigger3(record, 'change:' + name, record, next, options);
	        }
	    }
	    isRoot && transactions_ts_1.commit(record);
	}
	exports.setAttribute = setAttribute;
	var RecordTransaction = (function () {
	    function RecordTransaction(object, isRoot, nested, changes) {
	        this.object = object;
	        this.isRoot = isRoot;
	        this.nested = nested;
	        this.changes = changes;
	    }
	    RecordTransaction.prototype.commit = function (isNested) {
	        var _a = this, nested = _a.nested, object = _a.object, changes = _a.changes;
	        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
	            var transaction = nested_1[_i];
	            transaction.commit(true);
	        }
	        var attributes = object.attributes, _isDirty = object._isDirty;
	        for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
	            var key = changes_1[_b];
	            index_ts_1.trigger3(object, 'change:' + key, object, attributes[key], _isDirty);
	        }
	        this.isRoot && transactions_ts_1.commit(object, isNested);
	    };
	    return RecordTransaction;
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tools_ts_1 = __webpack_require__(1);
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
	            else if (typeof mixin === 'function') {
	                tools_ts_1.defaults(this, mixin);
	                mergeProps(proto, mixin.prototype, mergeRules);
	            }
	            else {
	                mergeProps(proto, mixin, mergeRules);
	            }
	        }
	        return this;
	    };
	    Class.mixTo = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	            var Ctor = args_1[_a];
	            Class.mixins.call(Ctor, this);
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
	    Class.define = function (definition, staticProps) {
	        if (definition === void 0) { definition = {}; }
	        if (!this.define) {
	            tools_ts_1.log.error("[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
	            return this;
	        }
	        this.predefine();
	        var proto = this.prototype;
	        var protoProps = tools_ts_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
	        tools_ts_1.assign(proto, protoProps);
	        tools_ts_1.assign(this, staticProps);
	        properties && Object.defineProperties(proto, tools_ts_1.transform({}, properties, toPropertyDescriptor));
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
	        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
	    };
	    Class.predefine = function () {
	        var BaseClass = tools_ts_1.getBaseClass(this);
	        if (BaseClass.create === this.create) {
	            this.create = Class.create;
	        }
	        return this;
	    };
	    Class._mixinRules = { properties: 'merge' };
	    return Class;
	}());
	exports.Class = Class;
	function toPropertyDescriptor(x) {
	    if (x) {
	        return typeof x === 'function' ? { get: x } : x;
	    }
	}
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
	    Class.mixTo(Type);
	}
	exports.extendable = extendable;
	function predefine(Constructor) {
	    Constructor.predefine();
	}
	exports.predefine = predefine;
	function define(spec) {
	    return createDecorator('define', spec);
	}
	exports.define = define;
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
	    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var tools_ts_1 = __webpack_require__(1);
	var mixins_ts_1 = __webpack_require__(5);
	function trigger0(self, name) {
	    var _events = self._events;
	    if (_events) {
	        var all = _events.all;
	        _fireEvent0(_events[name]);
	        _fireEvent1(all, name);
	    }
	}
	exports.trigger0 = trigger0;
	;
	function trigger1(self, name, a) {
	    var _events = self._events;
	    if (_events) {
	        var all = _events.all;
	        _fireEvent1(_events[name], a);
	        _fireEvent2(all, name, a);
	    }
	}
	exports.trigger1 = trigger1;
	;
	function trigger2(self, name, a, b) {
	    var _events = self._events;
	    if (_events) {
	        var all = _events.all;
	        _fireEvent2(_events[name], a, b);
	        _fireEvent3(all, name, a, b);
	    }
	}
	exports.trigger2 = trigger2;
	;
	function trigger3(self, name, a, b, c) {
	    var _events = self._events;
	    if (_events) {
	        var all = _events.all;
	        _fireEvent3(_events[name], a, b, c);
	        _fireEvent4(all, name, a, b, c);
	    }
	}
	exports.trigger3 = trigger3;
	;
	var eventSplitter = /\s+/;
	var eventsApi = function (iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	        if (callback !== void 0 && 'context' in opts && opts.context === void 0)
	            opts.context = callback;
	        for (names = keys(name); i < names.length; i++) {
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
	        var ids = obj ? [obj.cid] : keys(listeningTo);
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
	    Messenger.prototype.trigger = function (name, a, b, c) {
	        switch (arguments.length) {
	            case 1:
	                trigger0(this, name);
	                break;
	            case 2:
	                trigger1(this, name, a);
	                break;
	            case 3:
	                trigger2(this, name, a, b);
	                break;
	            case 4:
	                trigger3(this, name, a, b, c);
	                break;
	            default:
	                var allArgs = Array(arguments.length);
	                for (var i = 0; i < allArgs.length; i++) {
	                    allArgs[i] = arguments[i];
	                }
	                var _events = this._events;
	                if (_events) {
	                    _fireEventAll(_events[name], allArgs.splice(0, 1));
	                    _fireEventAll(_events.all, allArgs);
	                }
	        }
	        return this;
	    };
	    Messenger.prototype.dispose = function () {
	        this.stopListening();
	        this.off();
	    };
	    Messenger = __decorate([
	        mixins_ts_1.define({
	            cidPrefix: 'l'
	        }),
	        mixins_ts_1.extendable
	    ], Messenger);
	    return Messenger;
	}());
	exports.Messenger = Messenger;
	var slice = Array.prototype.slice;
	exports.Events = Messenger.prototype;
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
	        var handlers = events[name], toAdd = [options.clone(callback)];
	        events[name] = handlers ? handlers.concat(toAdd) : toAdd;
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
	function keys(o) {
	    return o ? Object.keys(o) : [];
	}
	var offApi = function (events, name, callback, options) {
	    if (!events)
	        return;
	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;
	    if (!name && !callback && !context) {
	        var ids = keys(listeners);
	        for (; i < ids.length; i++) {
	            listening = listeners[ids[i]];
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	        }
	        return;
	    }
	    var names = name ? [name] : keys(events);
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
	        var _once = map[name] = tools_ts_1.once(function () {
	            offer(name, _once);
	            callback.apply(this, arguments);
	        });
	        _once._callback = callback;
	    }
	    return map;
	};
	function _fireEvent0(events) {
	    if (events)
	        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
	            var ev = events_1[_i];
	            ev.callback.call(ev.ctx);
	        }
	}
	function _fireEvent1(events, a) {
	    if (events)
	        for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
	            var ev = events_2[_i];
	            ev.callback.call(ev.ctx, a);
	        }
	}
	function _fireEvent2(events, a, b) {
	    if (events)
	        for (var _i = 0, events_3 = events; _i < events_3.length; _i++) {
	            var ev = events_3[_i];
	            ev.callback.call(ev.ctx, a, b);
	        }
	}
	function _fireEvent3(events, a, b, c) {
	    if (events)
	        for (var _i = 0, events_4 = events; _i < events_4.length; _i++) {
	            var ev = events_4[_i];
	            ev.callback.call(ev.ctx, a, b, c);
	        }
	}
	function _fireEvent4(events, a, b, c, d) {
	    if (events)
	        for (var _i = 0, events_5 = events; _i < events_5.length; _i++) {
	            var ev = events_5[_i];
	            ev.callback.call(ev.ctx, a, b, c, d);
	        }
	}
	function _fireEventAll(events, args) {
	    if (events)
	        for (var _i = 0, events_6 = events; _i < events_6.length; _i++) {
	            var ev = events_6[_i];
	            ev.callback.apply(ev.ctx, args);
	        }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var index_ts_1 = __webpack_require__(4);
	var validation_ts_1 = __webpack_require__(8);
	var references_ts_1 = __webpack_require__(9);
	var Transactional = (function (_super) {
	    __extends(Transactional, _super);
	    function Transactional(cid, owner, ownerKey) {
	        _super.call(this, cid);
	        this._changeToken = {};
	        this._transaction = false;
	        this._isDirty = null;
	        this._validationError = void 0;
	        this._owner = owner;
	        this._ownerKey = ownerKey;
	    }
	    Transactional.prototype.transaction = function (fun, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = begin(this);
	        fun.call(this, this);
	        isRoot && commit(this);
	    };
	    Transactional.prototype.updateEach = function (iteratee, options) {
	        var isRoot = begin(this);
	        this.each(iteratee);
	        isRoot && commit(this);
	    };
	    Transactional.prototype.set = function (values, options) {
	        if (values) {
	            var transaction = this._createTransaction(values, options);
	            transaction && transaction.commit();
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
	            var error = this._validationError || (this._validationError = new validation_ts_1.ValidationError(this));
	            return error.length ? error : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Transactional.prototype._invalidate = function (options) {
	        var error;
	        if (options.validate && (error = this.validationError)) {
	            this.trigger('invalid', this, error, index_ts_1.assign({ validationError: error }, options));
	            return true;
	        }
	    };
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
	    Transactional = __decorate([
	        index_ts_1.define({
	            _changeEventName: 'change'
	        })
	    ], Transactional);
	    return Transactional;
	}(index_ts_1.Messenger));
	exports.Transactional = Transactional;
	function begin(object) {
	    return object._transaction ? false : (object._transaction = true);
	}
	exports.begin = begin;
	function markAsDirty(object, options) {
	    var dirty = !options.silent;
	    if (dirty)
	        object._isDirty = options;
	    object._changeToken = {};
	    object._validationError = void 0;
	    return dirty;
	}
	exports.markAsDirty = markAsDirty;
	function commit(object, isNested) {
	    var originalOptions = object._isDirty;
	    if (originalOptions) {
	        while (object._isDirty) {
	            var options = object._isDirty;
	            object._isDirty = null;
	            index_ts_1.trigger2(object, object._changeEventName, object, options);
	        }
	        object._transaction = false;
	        var _owner = object._owner;
	        if (_owner && !isNested) {
	            _owner._onChildrenChange(object, originalOptions);
	        }
	    }
	    else {
	        object._isDirty = null;
	        object._transaction = false;
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
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var referenceMask = /\~|\^|([^.]+)/g;
	var CompiledReference = (function () {
	    function CompiledReference(reference, splitTail) {
	        if (splitTail === void 0) { splitTail = false; }
	        var path = reference
	            .match(referenceMask)
	            .map(function (key) { return key === '~' ? 'getStore()' : (key === '^' ? 'getOwner()' : key); });
	        this.tail = splitTail && path.pop();
	        this.local = !path.length;
	        path.unshift('self');
	        this.resolve = new Function('self', "return " + path + ";");
	    }
	    return CompiledReference;
	}());
	exports.CompiledReference = CompiledReference;
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var attribute_ts_1 = __webpack_require__(11);
	var index_ts_1 = __webpack_require__(4);
	var typespec_ts_1 = __webpack_require__(12);
	var references_ts_1 = __webpack_require__(9);
	function compile(rawSpecs, baseAttributes) {
	    var myAttributes = index_ts_1.transform({}, rawSpecs, createAttribute), allAttributes = index_ts_1.defaults({}, myAttributes, baseAttributes), Attributes = createCloneCtor(allAttributes), mixin = {
	        Attributes: Attributes,
	        _attributes: new Attributes(allAttributes),
	        properties: index_ts_1.transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }),
	        defaults: createDefaults(allAttributes),
	        _toJSON: createToJSON(allAttributes),
	        _listenToSelf: createEventMap(allAttributes),
	        _keys: Object.keys(allAttributes)
	    };
	    var _parse = createParse(myAttributes, allAttributes);
	    if (_parse) {
	        mixin._parse = _parse;
	    }
	    if (!index_ts_1.log.level) {
	        mixin.forEachAttr = createForEach(allAttributes);
	    }
	    return mixin;
	}
	exports.compile = compile;
	function createAttribute(spec, name) {
	    return attribute_ts_1.GenericAttribute.create(typespec_ts_1.toAttributeDescriptor(spec), name);
	}
	function createEventMap(attrSpecs) {
	    var events = null;
	    for (var key in attrSpecs) {
	        var attribute = attrSpecs[key], _onChange = attribute.options._onChange;
	        if (_onChange) {
	            events || (events = {});
	            events['change:' + key] =
	                typeof _onChange === 'string' ?
	                    createWatcherFromRef(_onChange, key) :
	                    wrapWatcher(_onChange, key);
	        }
	    }
	    return events;
	}
	function wrapWatcher(watcher, key) {
	    return function (record, value) {
	        watcher.call(record, value, key);
	    };
	}
	function createWatcherFromRef(ref, key) {
	    var _a = new references_ts_1.CompiledReference(ref, true), local = _a.local, resolve = _a.resolve, tail = _a.tail;
	    return local ?
	        function (record, value) {
	            record[tail](value, key);
	        } :
	        function (record, value) {
	            resolve(record)[tail](value, key);
	        };
	}
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
	            if (index_ts_1.isValidJSON(value)) {
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transaction_ts_1 = __webpack_require__(3);
	var index_ts_1 = __webpack_require__(4);
	var GenericAttribute = (function () {
	    function GenericAttribute(name, options) {
	        this.name = name;
	        this.options = options;
	        this.getHook = null;
	        var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, _a = options.getHooks, getHooks = _a === void 0 ? [] : _a, _b = options.transforms, transforms = _b === void 0 ? [] : _b, _c = options.changeHandlers, changeHandlers = _c === void 0 ? [] : _c;
	        this.value = value;
	        this.type = type;
	        this.parse = parse;
	        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
	        transforms.unshift(this.convert);
	        if (this.get)
	            getHooks.unshift(this.get);
	        this.initialize.apply(this, arguments);
	        if (getHooks.length) {
	            this.getHook = getHooks.reduce(chainGetHooks);
	        }
	        if (transforms.length) {
	            this.transform = transforms.reduce(chainTransforms);
	        }
	        if (changeHandlers.length) {
	            this.handleChange = changeHandlers.reduce(chainChangeHandlers);
	        }
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
	        return index_ts_1.notEqual(a, b);
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
	    return GenericAttribute;
	}());
	exports.GenericAttribute = GenericAttribute;
	transaction_ts_1.Record.prototype._attributes = { id: GenericAttribute.create({ value: void 0 }, 'id') };
	transaction_ts_1.Record.prototype.defaults = function (attrs) {
	    if (attrs === void 0) { attrs = {}; }
	    return { id: attrs.id };
	};
	function chainChangeHandlers(prevHandler, nextHandler) {
	    return function (next, prev, model) {
	        prevHandler.call(this, next, prev, model);
	        nextHandler.call(this, next, prev, model);
	    };
	}
	function chainGetHooks(prevHook, nextHook) {
	    return function (value, name) {
	        return nextHook.call(prevHook.call(value, name), name);
	    };
	}
	function chainTransforms(prevTransform, nextTransform) {
	    return function (value, options, prev, model) {
	        return nextTransform.call(this, prevTransform.call(this, value, options, prev, model), options, prev, model);
	    };
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_ts_1 = __webpack_require__(4);
	var ChainableAttributeSpec = (function () {
	    function ChainableAttributeSpec(options) {
	        if (options === void 0) { options = {}; }
	        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
	        index_ts_1.assign(this.options, options);
	    }
	    ChainableAttributeSpec.prototype.triggerWhenChanged = function (events) {
	        return this;
	    };
	    ChainableAttributeSpec.prototype.watcher = function (ref) {
	        this.options._onChange = ref;
	        return this;
	    };
	    ChainableAttributeSpec.prototype.parse = function (fun) {
	        this.options.parse = fun;
	        return this;
	    };
	    ChainableAttributeSpec.prototype.toJSON = function (fun) {
	        this.options.toJSON = fun;
	        return this;
	    };
	    ChainableAttributeSpec.prototype.get = function (fun) {
	        this.options.getHooks.push(fun);
	        return this;
	    };
	    ChainableAttributeSpec.prototype.set = function (fun) {
	        this.options.transforms.push(function (next, options, prev, model) {
	            if (this.isChanged(next, prev)) {
	                var changed = fun.call(model, next, name);
	                return changed === void 0 ? prev : changed;
	            }
	            return prev;
	        });
	        return this;
	    };
	    ChainableAttributeSpec.prototype.events = function (map) {
	        this.options.changeHandlers.push(function (next, prev, record) {
	            prev && record.stopListening(prev);
	            next && record.listenTo(next, map);
	        });
	        return this;
	    };
	    Object.defineProperty(ChainableAttributeSpec.prototype, "has", {
	        get: function () { return this; },
	        enumerable: true,
	        configurable: true
	    });
	    ChainableAttributeSpec.prototype.value = function (x) {
	        this.options.value = x;
	        return this;
	    };
	    return ChainableAttributeSpec;
	}());
	exports.ChainableAttributeSpec = ChainableAttributeSpec;
	Function.prototype.value = function (x) {
	    return new ChainableAttributeSpec({ type: this, value: x });
	};
	Object.defineProperty(Function.prototype, 'has', {
	    get: function () {
	        return this._has || new ChainableAttributeSpec({ type: this });
	    },
	    set: function (value) { this._has = value; }
	});
	function toAttributeDescriptor(spec) {
	    if (typeof spec === 'function') {
	        return { type: spec };
	    }
	    if (spec && spec instanceof ChainableAttributeSpec) {
	        return spec.options;
	    }
	    return {
	        type: inferType(spec),
	        value: spec
	    };
	}
	exports.toAttributeDescriptor = toAttributeDescriptor;
	function inferType(value) {
	    switch (typeof value) {
	        case 'number':
	            return Number;
	        case 'string':
	            return String;
	        case 'boolean':
	            return Boolean;
	        case 'undefined':
	            return void 0;
	        case 'object':
	            return value ? value.constructor : Object;
	    }
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var transaction_ts_1 = __webpack_require__(3);
	var attribute_ts_1 = __webpack_require__(11);
	var transactions_ts_1 = __webpack_require__(7);
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
	        prev && transactions_ts_1.free(record, prev);
	        next && transactions_ts_1.aquire(record, next, this.name);
	    };
	    return TransactionalType;
	}(attribute_ts_1.GenericAttribute));
	exports.TransactionalType = TransactionalType;
	transaction_ts_1.Record._attribute = TransactionalType;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var attribute_ts_1 = __webpack_require__(11);
	var index_ts_1 = __webpack_require__(4);
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
	}(attribute_ts_1.GenericAttribute));
	Function.prototype._attribute = ConstructorType;
	var DateType = (function (_super) {
	    __extends(DateType, _super);
	    function DateType() {
	        _super.apply(this, arguments);
	    }
	    DateType.prototype.convert = function (value) {
	        return value == null || value instanceof Date ? value :
	            new Date(typeof value === 'string' ? index_ts_1.parseDate(value) : value);
	    };
	    DateType.prototype.validate = function (model, value, name) {
	        if (isNaN(+value))
	            return name + ' is Invalid Date';
	    };
	    DateType.prototype.toJSON = function (value) { return value && value.toJSON(); };
	    DateType.prototype.isChanged = function (a, b) { return (a && +a) !== (b && +b); };
	    DateType.prototype.clone = function (value) { return value && new Date(+value); };
	    return DateType;
	}(attribute_ts_1.GenericAttribute));
	Date._attribute = DateType;
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
	}(attribute_ts_1.GenericAttribute));
	exports.PrimitiveType = PrimitiveType;
	Boolean._attribute = String._attribute = PrimitiveType;
	var NumericType = (function (_super) {
	    __extends(NumericType, _super);
	    function NumericType() {
	        _super.apply(this, arguments);
	    }
	    NumericType.prototype.validate = function (model, value, name) {
	        if (!isFinite(value)) {
	            return name + ' is not valid number';
	        }
	    };
	    return NumericType;
	}(PrimitiveType));
	exports.NumericType = NumericType;
	Number._attribute = NumericType;
	if (window) {
	    window.Integer = function (x) { return x ? Math.round(x) : 0; };
	    window.Integer._attribute = NumericType;
	}
	var ArrayType = (function (_super) {
	    __extends(ArrayType, _super);
	    function ArrayType() {
	        _super.apply(this, arguments);
	    }
	    ArrayType.prototype.toJSON = function (value) { return value; };
	    ArrayType.prototype.convert = function (value) {
	        if (value == null || Array.isArray(value))
	            return value;
	        return [];
	    };
	    return ArrayType;
	}(attribute_ts_1.GenericAttribute));
	exports.ArrayType = ArrayType;
	Array._attribute = ArrayType;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var index_ts_1 = __webpack_require__(4);
	var transactions_ts_1 = __webpack_require__(7);
	var index_ts_2 = __webpack_require__(2);
	var commons_ts_1 = __webpack_require__(16);
	var add_ts_1 = __webpack_require__(17);
	var set_ts_1 = __webpack_require__(18);
	var remove_ts_1 = __webpack_require__(19);
	var _count = 0;
	var silentOptions = { silent: true };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(records, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, _count++);
	        this.models = [];
	        this._byId = {};
	        this.model = options.model || this.model;
	        this.idAttribute = this.model.prototype.idAttribute;
	        if (options.comparator) {
	            this.comparator = options.comparator;
	        }
	        else {
	            this._comparator = this._comparator;
	        }
	        if (records) {
	            var elements = options.parse ? this.parse(records) : records, transaction = set_ts_1.emptySetTransaction(this, elements, options, true);
	        }
	        this.initialize.apply(this, arguments);
	    }
	    Collection.predefine = function () { return this; };
	    Object.defineProperty(Collection.prototype, "comparator", {
	        get: function () { return this._comparator; },
	        set: function (x) {
	            var _this = this;
	            var compare;
	            switch (typeof x) {
	                case 'string':
	                    this._comparator = function (a, b) {
	                        var aa = a[x], bb = b[x];
	                        if (aa === bb)
	                            return 0;
	                        return aa < bb ? -1 : +1;
	                    };
	                    break;
	                case 'function':
	                    if (x.length === 1) {
	                        this._comparator = function (a, b) {
	                            var aa = x.call(_this, a), bb = x.call(_this, b);
	                            if (aa === bb)
	                                return 0;
	                            return aa < bb ? -1 : +1;
	                        };
	                    }
	                    else {
	                        this._comparator = function (a, b) { return x.call(_this, a, b); };
	                    }
	                    break;
	                default:
	                    this._comparator = null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype._onChildrenChange = function (record, options) {
	        if (options === void 0) { options = {}; }
	        var isRoot = transactions_ts_1.begin(this), idAttribute = this.idAttribute;
	        if (record.hasChanged(idAttribute)) {
	            var _byId = this._byId;
	            delete _byId[record.previous(idAttribute)];
	            _byId[record[idAttribute]] = record;
	        }
	        if (transactions_ts_1.markAsDirty(this, options)) {
	            index_ts_1.trigger2(this, 'change', record, options);
	        }
	        isRoot && transactions_ts_1.commit(this);
	    };
	    Collection.prototype.get = function (objOrId) {
	        if (objOrId == null)
	            return null;
	        if (typeof objOrId === 'object') {
	            var id = objOrId[this.idAttribute];
	            return (id !== void 0 && this._byId[id]) || this._byId[objOrId.cid];
	        }
	        else {
	            return this._byId[objOrId];
	        }
	    };
	    Collection.prototype.each = function (iteratee, context) {
	        var fun = arguments.length === 2 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, models = this.models;
	        for (var i = 0; i < models.length; i++) {
	            fun(models[i], i);
	        }
	    };
	    Collection.prototype._validateNested = function (errors) {
	        var count = 0;
	        this.each(function (record) {
	            var error = record.validationError;
	            if (error) {
	                errors[record.cid] = error;
	                count++;
	            }
	        });
	        return count;
	    };
	    Collection.prototype.initialize = function () { };
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function () { return this.models.length; },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.first = function () { return this.models[0]; };
	    Collection.prototype.last = function () { return this.models[this.models.length - 1]; };
	    Collection.prototype.at = function (a_index) {
	        var index = a_index < 0 ? a_index + this.models.length : a_index;
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (owner) {
	        var models = this.map(function (model) { return model.clone(); });
	        return new this.constructor(models, { model: this.model, comparator: this.comparator }, owner);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (model) { return model.toJSON(); });
	    };
	    Collection.prototype.set = function (a_elements, options) {
	        if (a_elements === void 0) { a_elements = []; }
	        if (options === void 0) { options = {}; }
	        var elements = Array.isArray(a_elements) ? a_elements : [a_elements];
	        if (options.reset) {
	            this.reset(elements, options);
	        }
	        else {
	            var transaction = this._createTransaction(elements, options);
	            transaction && transaction.commit();
	        }
	        return this;
	    };
	    Collection.prototype.reset = function (a_elements, options) {
	        if (options === void 0) { options = {}; }
	        var previousModels = commons_ts_1.dispose(this);
	        if (a_elements) {
	            var elements = Array.isArray(a_elements) ? a_elements : [a_elements];
	            if (options.parse)
	                elements = this.parse(elements);
	            set_ts_1.emptySetTransaction(this, elements, options, true);
	        }
	        options.silent || index_ts_1.trigger2(this, 'reset', this, index_ts_1.defaults({ previousModels: previousModels }, options));
	        return this.models;
	    };
	    Collection.prototype.add = function (something, options) {
	        if (options === void 0) { options = {}; }
	        var parsed = options.parse ? this.parse(something) : something, elements = Array.isArray(parsed) ? parsed : [parsed], transaction = this.models.length ?
	            add_ts_1.addTransaction(this, elements, options) :
	            set_ts_1.emptySetTransaction(this, elements, options);
	        if (transaction) {
	            transaction.commit();
	            return transaction.added;
	        }
	        return [];
	    };
	    Collection.prototype.remove = function (recordsOrIds, options) {
	        if (options === void 0) { options = {}; }
	        if (recordsOrIds) {
	            return Array.isArray(recordsOrIds) ?
	                remove_ts_1.removeMany(this, recordsOrIds, options) :
	                remove_ts_1.removeOne(this, recordsOrIds, options);
	        }
	        return [];
	    };
	    Collection.prototype._createTransaction = function (a_elements, options) {
	        if (options === void 0) { options = {}; }
	        var elements = options.parse ? this.parse(a_elements) : a_elements;
	        if (this.models.length) {
	            return options.remove === false ?
	                add_ts_1.addTransaction(this, elements, options) :
	                set_ts_1.setTransaction(this, elements, options);
	        }
	        else {
	            return set_ts_1.emptySetTransaction(this, elements, options);
	        }
	    };
	    Collection.prototype.pluck = function (key) {
	        return this.models.map(function (model) { return model[key]; });
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) { options = {}; }
	        if (commons_ts_1.sortElements(this, options)) {
	            var isRoot = transactions_ts_1.begin(this);
	            if (transactions_ts_1.markAsDirty(this, options)) {
	                index_ts_1.trigger2(this, 'sort', this, options);
	            }
	            isRoot && transactions_ts_1.commit(this);
	        }
	        return this;
	    };
	    Collection.prototype.push = function (model, options) {
	        return this.add(model, index_ts_1.assign({ at: this.length }, options));
	    };
	    Collection.prototype.pop = function (options) {
	        var model = this.at(this.length - 1);
	        this.remove(model, options);
	        return model;
	    };
	    Collection.prototype.unshift = function (model, options) {
	        return this.add(model, index_ts_1.assign({ at: 0 }, options));
	    };
	    Collection.prototype.shift = function (options) {
	        var model = this.at(0);
	        this.remove(model, options);
	        return model;
	    };
	    Collection.prototype.slice = function () {
	        return slice.apply(this.models, arguments);
	    };
	    Collection.prototype.indexOf = function (modelOrId) {
	        var record = this.get(modelOrId);
	        return this.models.indexOf(record);
	    };
	    Collection._attribute = index_ts_2.TransactionalType;
	    Collection = __decorate([
	        index_ts_1.define({
	            cidPrefix: 'c',
	            model: index_ts_2.Record,
	            _changeEventName: 'changes'
	        })
	    ], Collection);
	    return Collection;
	}(transactions_ts_1.Transactional));
	exports.Collection = Collection;
	var slice = Array.prototype.slice;
	index_ts_2.Record.Collection = Collection;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transactions_ts_1 = __webpack_require__(7);
	var index_ts_1 = __webpack_require__(4);
	function dispose(collection) {
	    var models = collection.models;
	    collection.models = [];
	    collection._byId = {};
	    freeAll(collection, models);
	    return models;
	}
	exports.dispose = dispose;
	function aquire(owner, child) {
	    transactions_ts_1.aquire(owner, child);
	    if (owner.bubbleEvents) {
	        for (var _i = 0, _a = owner.bubbleEvents; _i < _a.length; _i++) {
	            var event_1 = _a[_i];
	            owner.listenTo(child, event_1, bounceEvent(event_1));
	        }
	    }
	}
	exports.aquire = aquire;
	function free(owner, child) {
	    transactions_ts_1.free(owner, child);
	    owner.bubbleEvents && owner.stopListening(child);
	}
	exports.free = free;
	function bounceEvent(name) {
	    return function () {
	        var args = [name];
	        for (var i = 0; i < arguments.length; i++) {
	            args.push(arguments[i]);
	        }
	        this.trigger.apply(this, args);
	    };
	}
	function freeAll(collection, children) {
	    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
	        var child = children_1[_i];
	        free(collection, child);
	    }
	    return children;
	}
	exports.freeAll = freeAll;
	function sortElements(collection, options) {
	    var _comparator = collection._comparator;
	    if (_comparator && options.sort !== false) {
	        collection.models.sort(_comparator);
	        return true;
	    }
	    return false;
	}
	exports.sortElements = sortElements;
	function addIndex(index, model) {
	    index[model.cid] = model;
	    var id = model.id;
	    if (id != null) {
	        index[id] = model;
	    }
	}
	exports.addIndex = addIndex;
	function removeIndex(index, model) {
	    delete index[model.cid];
	    var id = model.id;
	    if (id != null) {
	        delete index[id];
	    }
	}
	exports.removeIndex = removeIndex;
	function toModel(collection, attrs, options) {
	    var model = collection.model;
	    return attrs instanceof model ? attrs : model.create(attrs, options, collection);
	}
	exports.toModel = toModel;
	function convertAndAquire(collection, attrs, options) {
	    var model = collection.model, record = attrs instanceof model ? attrs : model.create(attrs, options, collection);
	    aquire(collection, record);
	    return record;
	}
	exports.convertAndAquire = convertAndAquire;
	var CollectionTransaction = (function () {
	    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
	        this.object = object;
	        this.isRoot = isRoot;
	        this.added = added;
	        this.removed = removed;
	        this.nested = nested;
	        this.sorted = sorted;
	    }
	    CollectionTransaction.prototype.commit = function (isNested) {
	        var _a = this, nested = _a.nested, object = _a.object;
	        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
	            var transaction = nested_1[_i];
	            transaction.commit(true);
	        }
	        var _b = this, added = _b.added, removed = _b.removed, _isDirty = object._isDirty;
	        for (var _c = 0, added_1 = added; _c < added_1.length; _c++) {
	            var record = added_1[_c];
	            index_ts_1.trigger3(object, 'add', record, object, _isDirty);
	        }
	        for (var _d = 0, removed_1 = removed; _d < removed_1.length; _d++) {
	            var record = removed_1[_d];
	            index_ts_1.trigger3(object, 'remove', record, object, _isDirty);
	        }
	        for (var _e = 0, nested_2 = nested; _e < nested_2.length; _e++) {
	            var transaction = nested_2[_e];
	            index_ts_1.trigger2(object, 'change', transaction.object, _isDirty);
	        }
	        if (this.sorted) {
	            index_ts_1.trigger2(object, 'sort', object, _isDirty);
	        }
	        if (added.length || removed.length) {
	            index_ts_1.trigger2(object, 'update', object, _isDirty);
	        }
	        this.isRoot && transactions_ts_1.commit(object, isNested);
	    };
	    return CollectionTransaction;
	}());
	exports.CollectionTransaction = CollectionTransaction;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transactions_ts_1 = __webpack_require__(7);
	var commons_ts_1 = __webpack_require__(16);
	function addTransaction(collection, items, options) {
	    var isRoot = transactions_ts_1.begin(collection), nested = [];
	    var added = appendElements(collection, items, nested, options);
	    if (added.length || nested.length) {
	        var needSort = sortOrMoveElements(collection, added, options);
	        if (transactions_ts_1.markAsDirty(collection, options)) {
	            return new commons_ts_1.CollectionTransaction(collection, isRoot, added, [], nested, needSort);
	        }
	    }
	    isRoot && transactions_ts_1.commit(collection);
	}
	exports.addTransaction = addTransaction;
	;
	function sortOrMoveElements(collection, added, options) {
	    var at = options.at;
	    if (at != null) {
	        var length_1 = collection.models.length;
	        at = +at;
	        if (at < 0)
	            at += length_1 + 1;
	        if (at < 0)
	            at = 0;
	        if (at > length_1)
	            at = length_1;
	        moveElements(collection.models, at, added);
	        return false;
	    }
	    return commons_ts_1.sortElements(collection, options);
	}
	function moveElements(source, at, added) {
	    for (var j = source.length - 1, i = j - added.length; i >= at; i--, j--) {
	        source[j] = source[i];
	    }
	    for (i = 0, j = at; i < added.length; i++, j++) {
	        source[j] = added[i];
	    }
	}
	function appendElements(collection, a_items, nested, a_options) {
	    var models = collection.models, _byId = collection._byId, merge = a_options.merge, parse = a_options.parse, idAttribute = collection.model.prototype.idAttribute, prevLength = models.length;
	    for (var _i = 0, a_items_1 = a_items; _i < a_items_1.length; _i++) {
	        var item = a_items_1[_i];
	        var model = item ? _byId[item[idAttribute]] || _byId[item.cid] : null;
	        if (model) {
	            if (merge && item !== model) {
	                var attrs = item.attributes || item;
	                var transaction = model._createTransaction(attrs, a_options);
	                transaction && nested.push(transaction);
	            }
	        }
	        else {
	            model = commons_ts_1.toModel(collection, item, a_options);
	            models.push(model);
	            commons_ts_1.aquire(collection, model);
	            commons_ts_1.addIndex(_byId, model);
	        }
	    }
	    return models.slice(prevLength);
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transactions_ts_1 = __webpack_require__(7);
	var commons_ts_1 = __webpack_require__(16);
	var silentOptions = { silent: true };
	function emptySetTransaction(collection, items, options, silent) {
	    var isRoot = transactions_ts_1.begin(collection);
	    var added = _reallocateEmpty(collection, items, options);
	    if (added.length) {
	        var needSort = commons_ts_1.sortElements(collection, options);
	        if (transactions_ts_1.markAsDirty(collection, silent ? silentOptions : options)) {
	            return new commons_ts_1.CollectionTransaction(collection, isRoot, added, [], [], needSort);
	        }
	    }
	    isRoot && transactions_ts_1.commit(collection);
	}
	exports.emptySetTransaction = emptySetTransaction;
	;
	function setTransaction(collection, items, options) {
	    var isRoot = transactions_ts_1.begin(collection), nested = [];
	    var previous = collection.models, added = _reallocate(collection, items, nested, options);
	    var reusedCount = collection.models.length - added.length, removed = reusedCount < previous.length ? (reusedCount ? _garbageCollect(collection, previous) :
	        commons_ts_1.freeAll(collection, previous)) : [];
	    var addedOrChanged = nested.length || added.length, needSort = addedOrChanged && commons_ts_1.sortElements(collection, options);
	    if (addedOrChanged || removed.length) {
	        if (transactions_ts_1.markAsDirty(collection, options)) {
	            return new commons_ts_1.CollectionTransaction(collection, isRoot, added, removed, nested, needSort);
	        }
	    }
	    isRoot && transactions_ts_1.commit(collection);
	}
	exports.setTransaction = setTransaction;
	;
	function _garbageCollect(collection, previous) {
	    var _byId = collection._byId, removed = [];
	    for (var _i = 0, previous_1 = previous; _i < previous_1.length; _i++) {
	        var record = previous_1[_i];
	        if (!_byId[record.cid]) {
	            removed.push(record);
	            commons_ts_1.free(collection, record);
	        }
	    }
	    return removed;
	}
	function _reallocate(collection, source, nested, options) {
	    var models = Array(source.length), _byId = {}, merge = options.merge == null ? true : options.merge, _prevById = collection._byId, idAttribute = collection.model.prototype.idAttribute, toAdd = [];
	    for (var i = 0, j = 0; i < source.length; i++) {
	        var item = source[i], model = null;
	        if (item) {
	            var id = item[idAttribute], cid = item.cid;
	            if (_byId[id] || _byId[cid])
	                continue;
	            model = _prevById[id] || _prevById[cid];
	        }
	        if (model) {
	            if (merge && item !== model) {
	                var attrs = item.attributes || item;
	                var transaction = model._createTransaction(attrs, options);
	                transaction && nested.push(transaction);
	            }
	        }
	        else {
	            model = commons_ts_1.toModel(collection, item, options);
	            commons_ts_1.aquire(collection, model);
	            toAdd.push(model);
	        }
	        models[j++] = model;
	        commons_ts_1.addIndex(_byId, model);
	    }
	    models.length = j;
	    collection.models = models;
	    collection._byId = _byId;
	    return toAdd;
	}
	function _reallocateEmpty(self, source, options) {
	    var len = source ? source.length : 0, models = Array(len), _byId = {}, idAttribute = self.model.prototype.idAttribute;
	    for (var i = 0, j = 0; i < len; i++) {
	        var src = source[i];
	        if (src && (_byId[src[idAttribute]] || _byId[src.cid])) {
	            continue;
	        }
	        var model = commons_ts_1.toModel(self, src, options);
	        commons_ts_1.aquire(self, model);
	        models[j++] = model;
	        commons_ts_1.addIndex(_byId, model);
	    }
	    models.length = j;
	    self._byId = _byId;
	    return self.models = models;
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var commons_ts_1 = __webpack_require__(16);
	var index_ts_1 = __webpack_require__(4);
	var transactions_ts_1 = __webpack_require__(7);
	function removeOne(collection, el, options) {
	    var model = collection.get(el);
	    if (model) {
	        var isRoot = transactions_ts_1.begin(collection), models = collection.models;
	        models.splice(models.indexOf(model), 1);
	        commons_ts_1.removeIndex(collection._byId, model);
	        var notify = transactions_ts_1.markAsDirty(collection, options);
	        if (notify) {
	            index_ts_1.trigger3(collection, 'remove', model, collection, options);
	        }
	        commons_ts_1.free(collection, model);
	        notify && index_ts_1.trigger2(collection, 'update', collection, options);
	        isRoot && transactions_ts_1.commit(collection);
	        return model;
	    }
	}
	exports.removeOne = removeOne;
	;
	function removeMany(collection, toRemove, options) {
	    var removed = _removeFromIndex(collection, toRemove);
	    if (removed.length) {
	        var isRoot = transactions_ts_1.begin(collection);
	        _reallocate(collection, removed.length);
	        if (transactions_ts_1.markAsDirty(collection, options)) {
	            var transaction = new commons_ts_1.CollectionTransaction(collection, isRoot, [], removed, [], false);
	            transaction.commit();
	        }
	        else {
	            isRoot && transactions_ts_1.commit(collection);
	        }
	    }
	    return removed;
	}
	exports.removeMany = removeMany;
	;
	function _removeFromIndex(collection, toRemove) {
	    var removed = Array(toRemove.length), _byId = collection._byId;
	    for (var i = 0, j = 0; i < toRemove.length; i++) {
	        var model = collection.get(toRemove[i]);
	        if (model) {
	            removed[j++] = model;
	            commons_ts_1.removeIndex(_byId, model);
	            commons_ts_1.free(collection, model);
	        }
	    }
	    removed.length = j;
	    return removed;
	}
	function _reallocate(collection, removed) {
	    var prev = collection.models, models = collection.models = Array(prev.length - removed), _byId = collection._byId;
	    for (var i = 0, j = 0; i < prev.length; i++) {
	        var model = prev[i];
	        if (_byId[model.cid]) {
	            models[j++] = model;
	        }
	    }
	    models.length = j;
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map