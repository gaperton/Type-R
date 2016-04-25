(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Transactional"] = factory();
	else
		root["Transactional"] = factory();
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _tools = __webpack_require__(1);
	
	var _record = __webpack_require__(3);
	
	_record.Record.Collection = function () {};
	
	exports.Class = _tools.Class;
	exports.Record = _record.Record;
	exports.define = _tools.define;

/***/ },

/***/ 1:
/***/ function(module, exports) {

	/**
	 * Dependency-free tools, used across 'nested' libs.
	 *
	 * @module
	 */
	
	/**
	 * Base class, holding class extensions
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports.mixinRules = mixinRules;
	exports.mixins = mixins;
	exports.classExtensions = classExtensions;
	exports.mapObject = mapObject;
	exports.fastAssign = fastAssign;
	exports.fastDefaults = fastDefaults;
	exports.createForEach = createForEach;
	exports.createCloneCtor = createCloneCtor;
	exports.createTransformCtor = createTransformCtor;
	exports.notEqual = notEqual;
	exports.getPropertyDescriptor = getPropertyDescriptor;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Class = (function () {
	    function Class() {
	        _classCallCheck(this, Class);
	    }
	
	    _createClass(Class, [{
	        key: 'bindAll',
	
	        /**
	         * Autobinding helper to be used from constructors
	         */
	        value: function bindAll() {
	            for (var i = 0; i < arguments.length; i++) {
	                var _name = arguments[i];
	
	                this[_name] = this[_name].bind(this);
	            }
	        }
	
	        /**
	         * Merge spec properties to the prototype.
	         * Add native properties with descriptors from spec.properties to the prototype.
	         * Prevents inheritance of create factory method.
	         * Assign mixinRules static property, and merge it with parent.
	         * Add mixins
	         *
	         * @param spec
	         */
	    }], [{
	        key: 'create',
	
	        /**
	         * Abstract class factory. Should be overridden for abstract classes.
	         * Passes two arguments to class constructor.
	         *
	         * Cleared up on inheritance when defined for some abstract class.
	         *
	         * @param attrs
	         * @param options
	         * @returns {Class}
	         */
	        value: function create(attrs, options) {
	            return new this(attrs, options);
	        }
	
	        /**
	         * Attach mixins to class prototype.
	         * Members merging policy is controlled by MyClass.mixinRules property.
	         * mixinRules is merged on inheritance.
	         *
	         * @param mixins - array of mixin objects.
	         * @returns {Class}
	         */
	    }, {
	        key: 'mixins',
	        value: function mixins() {
	            var proto = this.prototype,
	                mergeRules = this.mixinRules || {};
	
	            for (var _len = arguments.length, _mixins = Array(_len), _key = 0; _key < _len; _key++) {
	                _mixins[_key] = arguments[_key];
	            }
	
	            for (var i = _mixins.length - 1; i >= 0; i--) {
	                var mixin = _mixins[i];
	                if (mixin instanceof Array) {
	                    Class.mixins.apply(this, mixin);
	                } else {
	                    mergeProps(proto, mixin, mergeRules);
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'mixinRules',
	        value: function mixinRules(_mixinRules) {
	            var Base = Object.getPrototypeOf(Class.prototype).constructor;
	
	            if (Base.mixinRules) {
	                mergeProps(_mixinRules, Base.mixinRules);
	            }
	
	            this._mixinRules = _mixinRules;
	        }
	    }, {
	        key: 'define',
	        value: function define() {
	            var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            // Attach class extensions, if it's not done...
	            this.define || classExtensions(this);
	
	            var proto = this.prototype,
	                Base = Object.getPrototypeOf(proto).constructor;
	
	            // Remove abstract class factory on inheritance
	            if (Base.create !== Class.create && Base.create === this.create) {
	                this.create = Class.create;
	            }
	
	            // Process spec...
	            var _spec$properties = spec.properties;
	            var properties = _spec$properties === undefined ? {} : _spec$properties;
	            var mixins = spec.mixins;
	            var mixinRules = spec.mixinRules;
	
	            var specProps = _objectWithoutProperties(spec, ['properties', 'mixins', 'mixinRules']);
	
	            // assign spec members to prototype
	            Object.assign(proto, specProps);
	
	            // define properties
	            Object.defineProperties(proto, properties);
	
	            // apply mixins and mixin rules
	            mixinRules && this.mixinRules(mixinRules);
	            mixins && this.mixins(mixins);
	        }
	    }]);
	
	    return Class;
	})();
	
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
	        } else {
	            Class[name].call(Ctor, spec);
	        }
	    };
	}
	
	function mixinRules(rules) {
	    return createDecorator('mixinRules', rules);
	}
	
	function defineDecorator(spec) {
	    return typeof spec === 'function' ? spec.define() : createDecorator('define', spec);
	}
	
	exports.define = defineDecorator;
	
	function mixins() {
	    for (var _len2 = arguments.length, list = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        list[_key2] = arguments[_key2];
	    }
	
	    return createDecorator('mixins', list);
	}
	
	function classExtensions() {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	    }
	
	    for (var i = 0; i < args.length; i++) {
	        var Ctor = args[i];
	        assign(Ctor);
	        Ctor.create = Class.create;
	        Ctor.define = Class.define;
	        Ctor.mixins = Class.mixins;
	        Ctor.mixinRules = Class.mixinRules;
	        Ctor._mixinRules = Class._mixinRules;
	        Ctor.prototype.bindAll = Class.prototype.bindAll;
	    }
	}
	
	/**
	 * Simple overridable logging stubs
	 *
	 */
	
	var log = {
	    level: 2,
	
	    error: function error() {
	        console.error.apply(this, arguments);
	    },
	
	    warning: function warning() {
	        if (this.level > 0) console.warning.apply(this, arguments);
	    },
	
	    info: function info() {
	        if (this.level > 1) console.warning.apply(this, arguments);
	    },
	
	    debug: function debug() {
	        if (this.level > 2) console.log.apply(this, arguments);
	    }
	};
	
	exports.log = log;
	/**
	 * Object manipulation helpers...
	 */
	
	function mapObject(dest, source, fun) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            var value = fun(source[name], name);
	            value === void 0 || (dest[name] = value);
	        }
	    }
	
	    return dest;
	}
	
	function fastAssign(dest, source) {
	    for (var name in source) {
	        dest[name] = source[name];
	    }
	}
	
	function fastDefaults(dest, source) {
	    for (var name in source) {
	        dest[name] === void 0 || (dest[name] = source[name]);
	    }
	}
	
	function forAllArgs(fun) {
	    return function (dest) {
	        for (var i = 1; i < arguments.length; i++) {
	            var _source = arguments[i];
	            _source && fun(dest, _source);
	        }
	
	        return dest;
	    };
	}
	
	var assign = forAllArgs(function (dest, source) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            dest[name] = source[name];
	        }
	    }
	});
	
	exports.assign = assign;
	// Object.assign polyfill...
	Object.assign || (Object.assign = assign);
	
	var defaults = forAllArgs(function (dest, source) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            dest[name] === void 0 || (dest[name] = source[name]);
	        }
	    }
	});
	
	exports.defaults = defaults;
	
	function createForEach(attrSpecs) {
	    var statements = ['var v;'];
	
	    for (var _name2 in attrSpecs) {
	        statements.push('(v=a.' + _name2 + ')' + '===void 0||f(v,"' + _name2 + '");');
	    }
	
	    return new Function('a', 'f', statements.join(''));
	}
	
	function createCloneCtor(attrSpecs) {
	    var statements = [];
	
	    for (var _name3 in attrSpecs) {
	        statements.push("this." + _name3 + "=x." + _name3 + ";");
	    }
	
	    var CloneCtor = new Function("x", statements.join(''));
	    CloneCtor.prototype = Object.prototype;
	    return CloneCtor;
	}
	
	function createTransformCtor(attrSpecs) {
	    var statements = ['var v;'];
	
	    for (var _name4 in attrSpecs) {
	        statements.push('this.' + _name4 + '=(v=a.' + _name4 + ')' + '===void 0?void 0 :f(v,"' + _name4 + '");');
	    }
	
	    var TransformCtor = new Function("a", 'f', statements.join(''));
	    TransformCtor.prototype = Object.prototype;
	    return TransformCtor;
	}
	
	/**
	 * notEqual( a, b ) function, for deep objects comparison
	 * Optimized for primitive types
	 */
	
	var ArrayProto = Array.prototype;
	
	function notEqual(a, b) {
	    if (a === b) return false;
	
	    if (a && b && typeof a == 'object' && typeof b == 'object') {
	        var protoA = Object.getPrototypeOf(a);
	
	        if (protoA !== Object.getPrototypeOf(b)) return true;
	
	        return protoA === ArrayProto ? arraysNotEqual(a, b) : objectsNotEqual(a, b);
	    }
	
	    return true;
	}
	
	function objectsNotEqual(a, b) {
	    var keysA = Object.keys(a);
	
	    if (keysA.length !== Object.keys(b).length) return true;
	
	    for (var i = 0; i < keysA.length; i++) {
	        var key = keysA[i];
	
	        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
	            return true;
	        }
	    }
	
	    return false;
	}
	
	function arraysNotEqual(a, b) {
	    if (a.length !== b.length) return true;
	
	    for (var i = 0; i < a.length; i++) {
	        if (notEqual(a[i], b[i])) return true;
	    }
	
	    return false;
	}
	
	/***********************
	 * Mixins helpers
	 */
	var mergeRules = {
	    merge: function merge(a, b, rules) {
	        return mergeProps(_extends({}, a), b, rules);
	    },
	
	    pipe: function pipe(a, b) {
	        return function (x) {
	            return a.call(this, b.call(this, x));
	        };
	    },
	
	    sequence: function sequence(a, b) {
	        return function () {
	            a.apply(this, arguments);
	            b.apply(this, arguments);
	        };
	    },
	
	    reverse: function reverse(a, b) {
	        return function () {
	            b.apply(this, arguments);
	            a.apply(this, arguments);
	        };
	    },
	
	    every: function every(a, b) {
	        return function () {
	            return a.apply(this, arguments) && b.apply(this, arguments);
	        };
	    },
	
	    some: function some(a, b) {
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
	
	function mergeProps(target, source) {
	    var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var sourceProps = Object.getOwnPropertyNames(source);
	    for (var i = 0; i < sourceProps.length; i++) {
	        var _name5 = sourceProps[i],
	            sourceProp = Object.getOwnPropertyDescriptor(source, _name5),
	            destProp = getPropertyDescriptor(target, _name5); // Shouldn't be own
	
	        if (destProp) {
	            var rule = rules[_name5],
	                value = destProp.value;
	
	            if (rule && value) {
	                target[_name5] = typeof rule === 'object' ? mergeRules.merge(value, sourceProp.value, rule) : mergeRules[rule](value, sourceProp.value);
	            }
	        } else {
	            Object.defineProperty(target, _name5, sourceProp);
	        }
	    }
	
	    return target;
	}

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _transactions = __webpack_require__(4);
	
	var _compile = __webpack_require__(21);
	
	var _compile2 = _interopRequireDefault(_compile);
	
	var _tools = __webpack_require__(1);
	
	var _cidCount = 0;
	
	var Record = (function (_Class) {
	    _inherits(Record, _Class);
	
	    _createClass(Record, null, [{
	        key: 'Collection',
	        value: function Collection() {}
	    }, {
	        key: 'define',
	        value: function define(spec) {
	            var BaseModel = Object.getPrototypeOf(this.prototype).constructor;
	
	            // Create collection
	            if (this.Collection === BaseModel.Collection) {
	                this.Collection = (function (_BaseModel$Collection) {
	                    _inherits(_class, _BaseModel$Collection);
	
	                    function _class() {
	                        _classCallCheck(this, _class);
	
	                        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
	                    }
	
	                    return _class;
	                })(BaseModel.Collection);
	                this.Collection.prototype.Record = this;
	            }
	
	            if (spec) {
	                // define stuff
	                _get(Object.getPrototypeOf(Record), 'define', this).call(this, (0, _compile2['default'])(spec, BaseModel.prototype));
	
	                var collection = spec.collection;
	
	                if (collection) {
	                    if (typeof collection === 'function') {
	                        // Link model to collection
	                        this.Collection = collection;
	                        this.Collection.prototype.Record = this;
	                    } else {
	                        // Configure our local Collection
	                        this.Collection.define(collection);
	                    }
	                }
	            }
	        }
	
	        /**
	         * Construction and cloning
	         */
	    }]);
	
	    function Record(attributes, opts) {
	        var _this = this;
	
	        _classCallCheck(this, Record);
	
	        _get(Object.getPrototypeOf(Record.prototype), 'constructor', this).call(this);
	        var attrs = this.__attributes,
	            values = attributes || {},
	            options = opts || {};
	
	        this.__duringSet = 0;
	        this._changing = this._pending = false;
	        this._changeToken = {};
	        this.attributes = {};
	        this.cid = this.cidPrefix + _cidCount++;
	
	        //  Make owner accessible in initialize
	        if (this._owner = options.owner) {
	            // do not pass it to nested objects.
	            // No side effect here, options copied at the upper level in this case
	            options.owner = null;
	        }
	
	        if (options.parse) {
	            values = this.parse(values, options) || {};
	        }
	
	        if (values && Object.getPrototypeOf(values) !== Object.prototype) {
	            error.argumentIsNotAnObject(this, values);
	            values = {};
	        }
	
	        values = options.deep ? deepCloneAttrs(this, values) : this.defaults(values);
	
	        // Execute attributes transform function instead of this.set
	        this.forEachAttr(values, function (key, value) {
	            var attr = attrs[key];
	
	            if (attr) {
	                var next = values[key] = attr.transform(value, options, _this, key);
	                attr.handleChange(next);
	            } else {
	                error.unknownAttribute(model, key, value);
	            }
	        });
	
	        this._previousAttributes = this.attributes = values;
	        this.initialize.apply(this, arguments);
	    }
	
	    _createClass(Record, [{
	        key: 'initialize',
	        value: function initialize() {}
	    }, {
	        key: 'defaults',
	        value: function defaults(attrs, options) {
	            return new this.Attributes(attrs);
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? { deep: true } : arguments[0];
	
	            return new this.constructor(this.attributes, options);
	        }
	
	        /**
	         * Attributes handling and ownership
	         */
	    }, {
	        key: 'Attributes',
	        value: function Attributes(attrs) {}
	    }, {
	        key: 'forEachAttr',
	        value: function forEachAttr(obj, fun) {}
	    }, {
	        key: 'get',
	        value: function get(name) {
	            return this[name];
	        }
	    }, {
	        key: 'getOwner',
	        value: function getOwner() {
	            var _owner = this._owner;
	
	            return this._ownerKey ? _owner : _owner && _owner._owner;
	        }
	
	        /**
	         * Object sync API
	         * set( { attrs }, options )
	         */
	
	    }, {
	        key: 'set',
	        value: function set(values, options) {
	            if (values) {
	                if (Object.getPrototypeOf(values) === Object.prototype) {
	                    this.createTransaction(values, options).commit(options);
	                } else {
	                    // TODO: log.error('Model.set argument must be string or object');
	                }
	            }
	
	            return this;
	        }
	
	        /**
	         * Transactional API stubs (provided by separate mixin)
	         */
	    }, {
	        key: 'createTransaction',
	        value: function createTransaction(values, options) {}
	    }, {
	        key: 'transaction',
	        value: function transaction(fun, options) {}
	    }, {
	        key: '_onChildrenChange',
	        value: function _onChildrenChange(child) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            this.forceChange(child._ownerAttr, options);
	        }
	    }, {
	        key: 'forceChange',
	        value: function forceChange(key) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            var isRoot = begin(this);
	
	            if (!options.silent) {
	                this._pending = options;
	                key && this._notifyChangeAttr(key, options);
	            }
	
	            isRoot && commit(this, options);
	        }
	
	        /**
	         * Events system stubs
	         */
	    }, {
	        key: '_notifyChange',
	        value: function _notifyChange(options) {
	            this._changeToken = {};
	            this.trigger('change', this, options);
	        }
	    }, {
	        key: '_notifyChangeAttr',
	        value: function _notifyChangeAttr(name, options) {
	            this.trigger('change:' + name, this.attributes[name], this, options);
	        }
	
	        /**
	         * Serialization API
	         * toJSON(), parse( data )
	         */
	
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var self = this,
	                res = {},
	                attrSpecs = this.__attributes;
	
	            this.forEachAttr(this.attributes, function (value, key) {
	                var attrSpec = attrSpecs[key],
	                    toJSON = attrSpec && attrSpec.toJSON;
	
	                if (toJSON) {
	                    res[key] = toJSON.call(self, value, key);
	                }
	            });
	
	            return res;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(resp) {
	            return this._parse(resp);
	        }
	    }, {
	        key: '_parse',
	        value: function _parse(resp) {
	            return resp;
	        }
	
	        /**
	         * Changes tracking API
	         * hasChanges( attr ), changedAttributes( diff ), previousAttributes()
	         */
	    }, {
	        key: 'hasChanged',
	        value: function hasChanged(attr) {
	            if (attr == null) {
	                return !_.isEmpty(this.changed); //TODO: remove underscore.
	            }
	
	            return this._attributes[attr].isChanged(this.attributes[attr], this._previousAttributes[attr]);
	        }
	    }, {
	        key: 'changedAttributes',
	        value: function changedAttributes(diff) {
	            if (!diff) {
	                return this.hasChanged() ? _.clone(this.changed) : false;
	            }
	
	            var val,
	                changed = false,
	                old = this._changing ? this._previousAttributes : this.attributes,
	                attrSpecs = this._attributes;
	
	            for (var attr in diff) {
	                if (!attrSpecs[attr].isChanged(old[attr], val = diff[attr])) {
	                    continue;
	                }
	                (changed || (changed = {}))[attr] = val;
	            }
	
	            return changed;
	        }
	    }, {
	        key: 'previousAttributes',
	        value: function previousAttributes() {
	            return new this.Attributes(this._previousAttributes);
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            // (!) No get hooks on id attribute.
	            var idAttribute = this.idAttribute;
	
	            return idAttribute && this.attributes[idAttribute];
	        },
	        set: function set(value) {
	            var idAttribute = this.idAttribute;
	
	            idAttribute && (0, _transactions.setAttribute)(this, idAttribute, value);
	        }
	    }, {
	        key: 'collection',
	        get: function get() {
	            return !this._ownerKey && this._owner || null;
	        }
	    }, {
	        key: 'changed',
	        get: function get() {
	            var _this2 = this;
	
	            var changed = this._changed;
	
	            if (!changed) {
	                (function () {
	                    changed = _this2._changed = {};
	
	                    var attributes = _this2.attributes;
	                    var _previousAttributes = _this2._previousAttributes;
	
	                    _this2.forEachAttr(_this2._attributes, function (attr, key) {
	                        var curr = attributes[key],
	                            prev = _previousAttributes[key];
	
	                        if (attr.isChanged(curr, prev)) {
	                            changed[key] = curr;
	                        }
	                    });
	                })();
	            }
	
	            return changed;
	        }
	    }]);
	
	    return Record;
	})(_tools.Class);
	
	exports.Record = Record;
	
	(0, _tools.assign)(Record.prototype, _transactions.RecordMixin);
	
	var s = {
	    // extend Model and its Collection
	    extend: function extend(protoProps, staticProps) {
	        var Child;
	
	        if (typeof protoProps === 'function') {
	            Child = protoProps;
	            protoProps = null;
	        } else if (protoProps && protoProps.hasOwnProperty('constructor')) {
	            Child = protoProps.constructor;
	        } else {
	            var Parent = this;
	            Child = function Model(attrs, options) {
	                return Parent.call(this, attrs, options);
	            };
	        }
	
	        var This = Object.extend.call(this, Child);
	        This.Collection = this.Collection.extend();
	        return protoProps ? This.define(protoProps, staticProps) : This;
	    },
	
	    // define Model and its Collection. All the magic starts here.
	    define: function define(protoProps, staticProps) {
	        var Base = Object.getPrototypeOf(this.prototype).constructor,
	            spec = createDefinition(protoProps, Base),
	            This = this;
	
	        Object.extend.Class.define.call(This, spec, staticProps);
	        attachMixins(This);
	
	        // define Collection
	        var collectionSpec = { model: This };
	        spec.urlRoot && (collectionSpec.url = spec.urlRoot);
	        This.Collection.define(_.defaults(protoProps.collection || {}, collectionSpec));
	
	        return This;
	    }
	};

/***/ },

/***/ 4:
/***/ function(module, exports) {

	/**
	 * Everything related to record's transactional updates
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports.setAttribute = setAttribute;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RecordMixin = {
	    createTransaction: function createTransaction(values) {
	        var _this = this;
	
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var transaction = new Transaction(this);
	        var changes = transaction.changes;
	        var nested = transaction.nested;
	        var attributes = this.attributes;
	        var _attributes = this._attributes;
	
	        this.forEachAttr(values, function (value, key) {
	            var attr = _attributes[key],
	                prev = attributes[key];
	
	            // handle deep update...
	            if (attr.canBeUpdated) {
	                if (prev && attr.canBeUpdated(value)) {
	                    nested.push(prev.createTransaction(value, options));
	                    return;
	                }
	            }
	
	            // cast and hook...
	            var next = attr.transform(value, options, prev, _this);
	
	            if (attr.isChanged(next, prev)) {
	                attributes[key] = next;
	                changes.push(key);
	
	                // Do the rest of the job after assignment
	                attr.handleChange(next, prev);
	            }
	        });
	
	        return transaction;
	    },
	
	    transaction: function transaction(fun, options) {
	        var isRoot = begin(this);
	        fun(this);
	        isRoot && _commit(this, options);
	    },
	
	    /**
	     * Change event handlers and triggers
	     */
	    _onChildrenChange: function _onChildrenChange(child, options) {
	        // Touch attribute in bounds of transaction
	        var isRoot = begin(this);
	
	        if (!options.silent) {
	            this._pending = options;
	            this._notifyChangeAttr(child._ownerAttr, options);
	        }
	
	        isRoot && _commit(this, options);
	    }
	};
	
	exports.RecordMixin = RecordMixin;
	// fast-path set attribute transactional function
	
	function setAttribute(model, name, value) {
	    var isRoot = begin(model),
	        options = {};
	
	    var attributes = model.attributes;
	    var spec = model._attributes[name];
	    var prev = attributes[name];
	
	    // handle deep update...
	    if (spec.canBeUpdated && prev && spec.canBeUpdated(value)) {
	        prev.createTransaction(value, options).commit(options);
	    } else {
	        // cast and hook...
	        var next = spec.transform(value, options, prev, model);
	
	        if (spec.isChanged(next, prev)) {
	            attributes[name] = next;
	
	            // Do the rest of the job after assignment
	            if (spec.handleChange) {
	                spec.handleChange(next, prev);
	            }
	
	            model._pending = options;
	            model._notifyChangeAttr(name, options);
	        }
	    }
	
	    isRoot && _commit(model, options);
	}
	
	/**
	 * Transactional brackets
	 *  begin( model ) => true | false;
	 *  commit( model, options ) => void 0
	 */
	function begin(model) {
	    var isRoot = !model._changing;
	
	    if (isRoot) {
	        model._changing = true;
	        model._previousAttributes = new model.Attributes(model.attributes);
	    }
	
	    return isRoot;
	}
	
	function _commit(model, options) {
	    if (!options.silent) {
	        while (model._pending) {
	            model._pending = false;
	            model._notifyChange(options);
	        }
	    }
	
	    model._pending = false;
	    model._changing = false;
	
	    // TODO: should it be in the transaction scope?
	    // So, upper-level change:attr handlers will work in the scope of current
	    // transaction. Short answer: no. Leave it like this.
	    var _owner = model._owner;
	
	    if (_owner) {
	        _owner._onChildrenChange(model, options);
	    }
	}
	
	var Transaction = (function () {
	    // open transaction
	
	    function Transaction(model) {
	        _classCallCheck(this, Transaction);
	
	        this.isRoot = begin(model);
	        this.model = model;
	        this.changed = [];
	        this.nested = [];
	    }
	
	    // commit transaction
	
	    _createClass(Transaction, [{
	        key: "commit",
	        value: function commit() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var nested = this.nested;
	            var model = this.model;
	
	            // Commit all nested transactions...
	            for (var i = 0; i < nested.length; i++) {
	                nested[i].commit(options);
	            }
	
	            // Notify listeners on attribute changes...
	            if (!options.silent) {
	                var changed = this.changed;
	
	                if (changed.length) {
	                    model._pending = options;
	                }
	
	                for (var i = 0; i < changed.length; i++) {
	                    model._notifyChangeAttr(changed[i], options);
	                }
	            }
	
	            this.isRoot && _commit(model, options);
	        }
	    }]);
	
	    return Transaction;
	})();

/***/ },

/***/ 21:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = Compile;
	
	function Compile() {}
	
	module.exports = exports["default"];

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.js.map