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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (factory) {
	    if (typeof module === 'object' && typeof module.exports === 'object') {
	        var v = factory(__webpack_require__(47), exports);if (v !== undefined) module.exports = v;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (require, exports) {
	    "use strict";
	    require('./tools');
	    require('./primitives');
	});
	//# sourceMappingURL=index.js.map

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	(function (factory) {
	    if (typeof module === 'object' && typeof module.exports === 'object') {
	        var v = factory(__webpack_require__(47), exports);if (v !== undefined) module.exports = v;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, !(function webpackMissingModule() { var e = new Error("Cannot find module \"../tools\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__(7), __webpack_require__(52)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (require, exports) {
	    "use strict";
	    var tools_1 = require('../tools');
	    var chai_1 = require('chai');
	    var mocha_1 = require('mocha');
	    mocha_1.describe('Mixins', function () {
	        mocha_1.it('merges objects to the prototype, if they are not defined', function () {});
	        mocha_1.it('works on a plain class', function () {});
	        mocha_1.describe('mixin rules', function () {
	            mocha_1.it('merges object properties');
	            mocha_1.it('merges rules on inheritance');
	            mocha_1.it('works on the plain class');
	            mocha_1.describe('methods composition', function () {
	                mocha_1.it('execute methods sequentially');
	                mocha_1.it('execute methods in reverse order');
	                mocha_1.it('pipeline methods passing the first argument through');
	            });
	            mocha_1.describe('boolean methods composition', function () {
	                mocha_1.it('joins checks by "and"');
	                mocha_1.it('joins checks by "or"');
	            });
	        });
	    });
	    mocha_1.describe('Class#define', function () {
	        mocha_1.it('adds members to the prototype', function () {
	            var C = (function (_super) {
	                __extends(C, _super);
	                function C() {
	                    _super.apply(this, arguments);
	                }
	                C = __decorate([tools_1.define({
	                    a: 'a'
	                })], C);
	                return C;
	            })(tools_1.Class);
	            chai_1.expect(C.prototype.a).equal('a');
	        });
	        mocha_1.it('defines properties passed in "properties" spec', function () {
	            var C = (function (_super) {
	                __extends(C, _super);
	                function C() {
	                    _super.apply(this, arguments);
	                }
	                C = __decorate([tools_1.define({
	                    properties: {
	                        p: {
	                            get: function get() {
	                                return "Hey";
	                            }
	                        }
	                    }
	                })], C);
	                return C;
	            })(tools_1.Class);
	            var c = new C();
	            chai_1.expect(c.p).to.equal('Hey');
	        });
	        mocha_1.it('clear up "create" factory method on inheritance', function () {
	            var A = (function (_super) {
	                __extends(A, _super);
	                function A() {
	                    _super.apply(this, arguments);
	                }
	                A.create = function () {
	                    return "Hello";
	                };
	                A = __decorate([tools_1.define], A);
	                return A;
	            })(tools_1.Class);
	            var B = (function (_super) {
	                __extends(B, _super);
	                function B() {
	                    _super.apply(this, arguments);
	                }
	                B = __decorate([tools_1.define], B);
	                return B;
	            })(A);
	            chai_1.expect(B.create()).to.be.instanceOf(B);
	        });
	        mocha_1.it('merges mixin rules on inheritance', function () {
	            var A = (function (_super) {
	                __extends(A, _super);
	                function A() {
	                    _super.apply(this, arguments);
	                }
	                A.create = function () {
	                    return "Hello";
	                };
	                A = __decorate([tools_1.define({
	                    mixinRules: {
	                        a: 'merge'
	                    }
	                })], A);
	                return A;
	            })(tools_1.Class);
	            chai_1.expect(A._mixinRules.a).to.eql('merge');
	            var B = (function (_super) {
	                __extends(B, _super);
	                function B() {
	                    _super.apply(this, arguments);
	                }
	                B = __decorate([tools_1.define({
	                    mixinRules: {
	                        b: 'merge'
	                    }
	                })], B);
	                return B;
	            })(A);
	            chai_1.expect(B._mixinRules.a).to.eql('merge');
	            chai_1.expect(B._mixinRules.b).to.eql('merge');
	        });
	    });
	});
	//# sourceMappingURL=tools.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	(function (factory) {
	    if (typeof module === 'object' && typeof module.exports === 'object') {
	        var v = factory(__webpack_require__(47), exports);if (v !== undefined) module.exports = v;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, !(function webpackMissingModule() { var e = new Error("Cannot find module \"../tools\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"../src/record/\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (require, exports) {
	    "use strict";
	    var tools_1 = require('../tools');
	    var _1 = require('../src/record/');
	    var chai_1 = require('chai');
	    describe('Record', function () {
	        it("can be instantiated", function () {
	            new _1.Record();
	        });
	        describe('Subclass', function () {
	            it("attaches properties to prototype", function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define({
	                        a: 'a'
	                    })], M);
	                    return M;
	                })(_1.Record);
	                chai_1.expect(M.prototype.a).to.eql('a');
	            });
	        });
	        describe("Attribute spec", function () {
	            describe('...as constructors', function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define({
	                        attributes: {
	                            s: String,
	                            n: Number,
	                            b: Boolean,
	                            o: Object,
	                            a: Array,
	                            d: Date
	                        }
	                    })], M);
	                    return M;
	                })(_1.Record);
	                it("invokes constructor to create defaults", function () {
	                    var m = new M();
	                    chai_1.expect(m.s).to.equal('');
	                    chai_1.expect(m.n).to.equal(0);
	                    chai_1.expect(m.b).to.equal(false);
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	                it("convert values to defined type in 'new'", function () {
	                    var m = new M({
	                        s: 55,
	                        n: "1",
	                        b: 'not bool',
	                        o: "not an object",
	                        a: "not an array",
	                        d: 678678678
	                    });
	                    chai_1.expect(m.s).to.equal('55');
	                    chai_1.expect(m.n).to.equal(1);
	                    chai_1.expect(m.b).to.equal(true);
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	                it("convert values to defined types on assignment", function () {
	                    var m = new M();
	                    m.s = 55;
	                    m.n = "1";
	                    m.b = 'not bool';
	                    m.o = "not an object";
	                    m.a = "not an array";
	                    m.d = 678678678;
	                    chai_1.expect(m.s).to.equal('55');
	                    chai_1.expect(m.n).to.equal(1);
	                    chai_1.expect(m.b).to.equal(true);
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	                it("convert values to defined types on set", function () {
	                    var m = new M();
	                    m.set({
	                        s: 55,
	                        n: "1",
	                        b: 'not bool',
	                        o: "not an object",
	                        a: "not an array",
	                        d: 678678678
	                    });
	                    chai_1.expect(m.s).to.equal('55');
	                    chai_1.expect(m.n).to.equal(1);
	                    chai_1.expect(m.b).to.equal(true);
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	            });
	            describe('...as default values', function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define({
	                        attributes: {
	                            s: 'b',
	                            n: 1,
	                            b: true,
	                            o: {},
	                            a: [],
	                            d: new Date()
	                        }
	                    })], M);
	                    return M;
	                })(_1.Record);
	                it("accepts values as type spec", function () {
	                    var m = new M();
	                    chai_1.expect(m.s).to.equal('b');
	                    chai_1.expect(m.n).to.equal(1);
	                    chai_1.expect(m.b).to.equal(true);
	                    chai_1.expect(m.o).to.not.equal({});
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.not.equal([]);
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	                it("infers types from values", function () {
	                    var m = new M(),
	                        _attributes = m._attributes;
	                    chai_1.expect(_attributes.s.type).to.equal(String);
	                    chai_1.expect(_attributes.n.type).to.equal(Number);
	                    chai_1.expect(_attributes.b.type).to.equal(Boolean);
	                    chai_1.expect(_attributes.o.type).to.equal(Object);
	                    chai_1.expect(_attributes.a.type).to.equal(Array);
	                    chai_1.expect(_attributes.d.type).to.equal(Date);
	                });
	            });
	            describe('...as constructors with values', function () {
	                it("converts default values to defined types", function () {
	                    var M = (function (_super) {
	                        __extends(M, _super);
	                        function M() {
	                            _super.apply(this, arguments);
	                        }
	                        M = __decorate([tools_1.define({
	                            attributes: {
	                                s: String.value(55),
	                                n: Number.value("1"),
	                                b: Boolean.value("some"),
	                                o: Object.value("not an object"),
	                                a: Array.value("not an array"),
	                                d: Date.value(22222)
	                            }
	                        })], M);
	                        return M;
	                    })(_1.Record);
	                    var m = new M();
	                    chai_1.expect(m.s).to.equal('55');
	                    chai_1.expect(m.n).to.equal(1);
	                    chai_1.expect(m.b).to.equal(true);
	                    chai_1.expect(m.o).to.eql({});
	                    chai_1.expect(m.a).to.eql([]);
	                    chai_1.expect(m.d).to.be["instanceof"](Date);
	                });
	                it("accepts null as default value", function () {
	                    var M = (function (_super) {
	                        __extends(M, _super);
	                        function M() {
	                            _super.apply(this, arguments);
	                        }
	                        M = __decorate([tools_1.define({
	                            attributes: {
	                                s: String.value(null),
	                                n: Number.value(null),
	                                b: Boolean.value(null),
	                                o: Object.value(null),
	                                a: Array.value(null),
	                                d: Date.value(null)
	                            }
	                        })], M);
	                        return M;
	                    })(_1.Record);
	                    var m = new M();
	                    chai_1.expect(m.s).to.equal(null);
	                    chai_1.expect(m.n).to.equal(null);
	                    chai_1.expect(m.b).to.equal(null);
	                    chai_1.expect(m.o).to.eql(null);
	                    chai_1.expect(m.a).to.eql(null);
	                    chai_1.expect(m.d).to.eql(null);
	                });
	            });
	        });
	        describe("Record's collection", function () {
	            it("is defined in the base Record", function () {
	                chai_1.expect(_1.Record.Collection).to.be.a('function');
	                chai_1.expect(_1.Record.Collection.prototype.Record).to.eql(_1.Record);
	            });
	            it("is created on Record's extension", function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define], M);
	                    return M;
	                })(_1.Record);
	                var prototype = M.Collection.prototype;
	                chai_1.expect(prototype).to.be["instanceof"](_1.Record.Collection);
	                chai_1.expect(prototype.Record).to.eql(M);
	            });
	            it("takes properties from .collection", function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define({
	                        collection: {
	                            a: 'a'
	                        }
	                    })], M);
	                    return M;
	                })(_1.Record);
	                chai_1.expect(M.Collection.prototype.a).to.eql('a');
	            });
	            it("can be defined separately", function () {
	                var C = (function (_super) {
	                    __extends(C, _super);
	                    function C() {
	                        _super.apply(this, arguments);
	                    }
	                    C = __decorate([tools_1.define({
	                        a: 'a'
	                    })], C);
	                    return C;
	                })(Collection);
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define({
	                        collection: C
	                    })], M);
	                    return M;
	                })(_1.Record);
	                chai_1.expect(M.Collection).to.eql(C);
	                var prototype = M.Collection.prototype;
	                chai_1.expect(prototype).to.be["instanceof"](_1.Record.Collection);
	                chai_1.expect(prototype.a).to.eql('a');
	                chai_1.expect(prototype.Record).to.eql(M);
	            });
	        });
	        describe('Record pre-definition', function () {
	            var M1 = (function (_super) {
	                __extends(M1, _super);
	                function M1() {
	                    _super.apply(this, arguments);
	                }
	                M1 = __decorate([tools_1.define], M1);
	                return M1;
	            })(_1.Record);
	            var M2 = (function (_super) {
	                __extends(M2, _super);
	                function M2() {
	                    _super.apply(this, arguments);
	                }
	                return M2;
	            })(_1.Record);
	            M2.define();
	            it('predefine collection types', function () {
	                chai_1.expect(M1.Collection).to.be.func;
	                chai_1.expect(M2.Collection).to.be.func;
	            });
	            it("can't be instantiated", function () {
	                new M1();
	            });
	            it('support forward declaration', function () {
	                var M = (function (_super) {
	                    __extends(M, _super);
	                    function M() {
	                        _super.apply(this, arguments);
	                    }
	                    M = __decorate([tools_1.define], M);
	                    return M;
	                })(_1.Record);
	                chai_1.expect(M.Collection).to.be.a('function');
	                chai_1.expect(M.Collection.prototype.Record).to.eql(M);
	                M.define({
	                    a: 'a'
	                });
	                chai_1.expect(M.prototype.a).to.eql('a');
	            });
	            it('can be defined', function () {
	                M1.define({
	                    a: 'first',
	                    collection: {
	                        b: 'second'
	                    }
	                });
	                M2.define({
	                    a: 'first'
	                });
	                M2.Collection.define({
	                    b: 'second'
	                });
	            });
	        });
	    });
	});
	//# sourceMappingURL=primitives.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var used = []
	  , exports = module.exports = {};
	
	/*!
	 * Chai version
	 */
	
	exports.version = '3.5.0';
	
	/*!
	 * Assertion Error
	 */
	
	exports.AssertionError = __webpack_require__(9);
	
	/*!
	 * Utils for plugins (not exported)
	 */
	
	var util = __webpack_require__(10);
	
	/**
	 * # .use(function)
	 *
	 * Provides a way to extend the internals of Chai
	 *
	 * @param {Function}
	 * @returns {this} for chaining
	 * @api public
	 */
	
	exports.use = function (fn) {
	  if (!~used.indexOf(fn)) {
	    fn(this, util);
	    used.push(fn);
	  }
	
	  return this;
	};
	
	/*!
	 * Utility Functions
	 */
	
	exports.util = util;
	
	/*!
	 * Configuration
	 */
	
	var config = __webpack_require__(23);
	exports.config = config;
	
	/*!
	 * Primary `Assertion` prototype
	 */
	
	var assertion = __webpack_require__(42);
	exports.use(assertion);
	
	/*!
	 * Core Assertions
	 */
	
	var core = __webpack_require__(43);
	exports.use(core);
	
	/*!
	 * Expect interface
	 */
	
	var expect = __webpack_require__(44);
	exports.use(expect);
	
	/*!
	 * Should interface
	 */
	
	var should = __webpack_require__(45);
	exports.use(should);
	
	/*!
	 * Assert interface
	 */
	
	var assert = __webpack_require__(46);
	exports.use(assert);


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * assertion-error
	 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Return a function that will copy properties from
	 * one object to another excluding any originally
	 * listed. Returned function will create a new `{}`.
	 *
	 * @param {String} excluded properties ...
	 * @return {Function}
	 */
	
	function exclude () {
	  var excludes = [].slice.call(arguments);
	
	  function excludeProps (res, obj) {
	    Object.keys(obj).forEach(function (key) {
	      if (!~excludes.indexOf(key)) res[key] = obj[key];
	    });
	  }
	
	  return function extendExclude () {
	    var args = [].slice.call(arguments)
	      , i = 0
	      , res = {};
	
	    for (; i < args.length; i++) {
	      excludeProps(res, args[i]);
	    }
	
	    return res;
	  };
	};
	
	/*!
	 * Primary Exports
	 */
	
	module.exports = AssertionError;
	
	/**
	 * ### AssertionError
	 *
	 * An extension of the JavaScript `Error` constructor for
	 * assertion and validation scenarios.
	 *
	 * @param {String} message
	 * @param {Object} properties to include (optional)
	 * @param {callee} start stack function (optional)
	 */
	
	function AssertionError (message, _props, ssf) {
	  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
	    , props = extend(_props || {});
	
	  // default values
	  this.message = message || 'Unspecified AssertionError';
	  this.showDiff = false;
	
	  // copy from properties
	  for (var key in props) {
	    this[key] = props[key];
	  }
	
	  // capture stack trace
	  ssf = ssf || arguments.callee;
	  if (ssf && Error.captureStackTrace) {
	    Error.captureStackTrace(this, ssf);
	  } else {
	    this.stack = new Error().stack;
	  }
	}
	
	/*!
	 * Inherit from Error.prototype
	 */
	
	AssertionError.prototype = Object.create(Error.prototype);
	
	/*!
	 * Statically set name
	 */
	
	AssertionError.prototype.name = 'AssertionError';
	
	/*!
	 * Ensure correct constructor
	 */
	
	AssertionError.prototype.constructor = AssertionError;
	
	/**
	 * Allow errors to be converted to JSON for static transfer.
	 *
	 * @param {Boolean} include stack (default: `true`)
	 * @return {Object} object that can be `JSON.stringify`
	 */
	
	AssertionError.prototype.toJSON = function (stack) {
	  var extend = exclude('constructor', 'toJSON', 'stack')
	    , props = extend({ name: this.name }, this);
	
	  // include stack if exists and not turned off
	  if (false !== stack && this.stack) {
	    props.stack = this.stack;
	  }
	
	  return props;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Main exports
	 */
	
	var exports = module.exports = {};
	
	/*!
	 * test utility
	 */
	
	exports.test = __webpack_require__(11);
	
	/*!
	 * type utility
	 */
	
	exports.type = __webpack_require__(13);
	
	/*!
	 * expectTypes utility
	 */
	exports.expectTypes = __webpack_require__(15);
	
	/*!
	 * message utility
	 */
	
	exports.getMessage = __webpack_require__(16);
	
	/*!
	 * actual utility
	 */
	
	exports.getActual = __webpack_require__(17);
	
	/*!
	 * Inspect util
	 */
	
	exports.inspect = __webpack_require__(18);
	
	/*!
	 * Object Display util
	 */
	
	exports.objDisplay = __webpack_require__(22);
	
	/*!
	 * Flag utility
	 */
	
	exports.flag = __webpack_require__(12);
	
	/*!
	 * Flag transferring utility
	 */
	
	exports.transferFlags = __webpack_require__(24);
	
	/*!
	 * Deep equal utility
	 */
	
	exports.eql = __webpack_require__(25);
	
	/*!
	 * Deep path value
	 */
	
	exports.getPathValue = __webpack_require__(33);
	
	/*!
	 * Deep path info
	 */
	
	exports.getPathInfo = __webpack_require__(34);
	
	/*!
	 * Check if a property exists
	 */
	
	exports.hasProperty = __webpack_require__(35);
	
	/*!
	 * Function name
	 */
	
	exports.getName = __webpack_require__(19);
	
	/*!
	 * add Property
	 */
	
	exports.addProperty = __webpack_require__(36);
	
	/*!
	 * add Method
	 */
	
	exports.addMethod = __webpack_require__(37);
	
	/*!
	 * overwrite Property
	 */
	
	exports.overwriteProperty = __webpack_require__(38);
	
	/*!
	 * overwrite Method
	 */
	
	exports.overwriteMethod = __webpack_require__(39);
	
	/*!
	 * Add a chainable method
	 */
	
	exports.addChainableMethod = __webpack_require__(40);
	
	/*!
	 * Overwrite chainable method
	 */
	
	exports.overwriteChainableMethod = __webpack_require__(41);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - test utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var flag = __webpack_require__(12);
	
	/**
	 * # test(object, expression)
	 *
	 * Test and object for expression.
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name test
	 */
	
	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , expr = args[0];
	  return negate ? !expr : expr;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### flag(object, key, [value])
	 *
	 * Get or set a flag value on an object. If a
	 * value is provided it will be set, else it will
	 * return the currently set value or `undefined` if
	 * the value is not set.
	 *
	 *     utils.flag(this, 'foo', 'bar'); // setter
	 *     utils.flag(this, 'foo'); // getter, returns `bar`
	 *
	 * @param {Object} object constructed Assertion
	 * @param {String} key
	 * @param {Mixed} value (optional)
	 * @namespace Utils
	 * @name flag
	 * @api private
	 */
	
	module.exports = function (obj, key, value) {
	  var flags = obj.__flags || (obj.__flags = Object.create(null));
	  if (arguments.length === 3) {
	    flags[key] = value;
	  } else {
	    return flags[key];
	  }
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Primary Exports
	 */
	
	var exports = module.exports = getType;
	
	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	var objectTypeRegexp = /^\[object (.*)\]$/;
	
	function getType(obj) {
	  var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
	  // Let "new String('')" return 'object'
	  if (typeof Promise === 'function' && obj instanceof Promise) return 'promise';
	  // PhantomJS has type "DOMWindow" for null
	  if (obj === null) return 'null';
	  // PhantomJS has type "DOMWindow" for undefined
	  if (obj === undefined) return 'undefined';
	  return type;
	}
	
	exports.Library = Library;
	
	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */
	
	function Library() {
	  if (!(this instanceof Library)) return new Library();
	  this.tests = {};
	}
	
	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */
	
	Library.prototype.of = getType;
	
	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */
	
	Library.prototype.define = function(type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};
	
	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */
	
	Library.prototype.test = function(obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];
	
	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - expectTypes utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### expectTypes(obj, types)
	 *
	 * Ensures that the object being tested against is of a valid type.
	 *
	 *     utils.expectTypes(this, ['array', 'object', 'string']);
	 *
	 * @param {Mixed} obj constructed Assertion
	 * @param {Array} type A list of allowed types for this assertion
	 * @namespace Utils
	 * @name expectTypes
	 * @api public
	 */
	
	var AssertionError = __webpack_require__(9);
	var flag = __webpack_require__(12);
	var type = __webpack_require__(13);
	
	module.exports = function (obj, types) {
	  var obj = flag(obj, 'object');
	  types = types.map(function (t) { return t.toLowerCase(); });
	  types.sort();
	
	  // Transforms ['lorem', 'ipsum'] into 'a lirum, or an ipsum'
	  var str = types.map(function (t, index) {
	    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
	    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
	    return or + art + ' ' + t;
	  }).join(', ');
	
	  if (!types.some(function (expected) { return type(obj) === expected; })) {
	    throw new AssertionError(
	      'object tested must be ' + str + ', but ' + type(obj) + ' given'
	    );
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - message composition utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var flag = __webpack_require__(12)
	  , getActual = __webpack_require__(17)
	  , inspect = __webpack_require__(18)
	  , objDisplay = __webpack_require__(22);
	
	/**
	 * ### .getMessage(object, message, negateMessage)
	 *
	 * Construct the error message based on flags
	 * and template tags. Template tags will return
	 * a stringified inspection of the object referenced.
	 *
	 * Message template tags:
	 * - `#{this}` current asserted object
	 * - `#{act}` actual value
	 * - `#{exp}` expected value
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getMessage
	 * @api public
	 */
	
	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , val = flag(obj, 'object')
	    , expected = args[3]
	    , actual = getActual(obj, args)
	    , msg = negate ? args[2] : args[1]
	    , flagMsg = flag(obj, 'message');
	
	  if(typeof msg === "function") msg = msg();
	  msg = msg || '';
	  msg = msg
	    .replace(/#\{this\}/g, function () { return objDisplay(val); })
	    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
	    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });
	
	  return flagMsg ? flagMsg + ': ' + msg : msg;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * Chai - getActual utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * # getActual(object, [actual])
	 *
	 * Returns the `actual` value for an Assertion
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getActual
	 */
	
	module.exports = function (obj, args) {
	  return args.length > 4 ? args[4] : obj._obj;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// This is (almost) directly from Node.js utils
	// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js
	
	var getName = __webpack_require__(19);
	var getProperties = __webpack_require__(20);
	var getEnumerableProperties = __webpack_require__(21);
	
	module.exports = inspect;
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
	 *    properties of objects.
	 * @param {Number} depth Depth in which to descend in object. Default is 2.
	 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
	 *    output. Default is false (no coloring).
	 * @namespace Utils
	 * @name inspect
	 */
	function inspect(obj, showHidden, depth, colors) {
	  var ctx = {
	    showHidden: showHidden,
	    seen: [],
	    stylize: function (str) { return str; }
	  };
	  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
	}
	
	// Returns true if object is a DOM element.
	var isDOMElement = function (object) {
	  if (typeof HTMLElement === 'object') {
	    return object instanceof HTMLElement;
	  } else {
	    return object &&
	      typeof object === 'object' &&
	      object.nodeType === 1 &&
	      typeof object.nodeName === 'string';
	  }
	};
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (value && typeof value.inspect === 'function' &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes);
	    if (typeof ret !== 'string') {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // If this is a DOM element, try to get the outer HTML.
	  if (isDOMElement(value)) {
	    if ('outerHTML' in value) {
	      return value.outerHTML;
	      // This value does not have an outerHTML attribute,
	      //   it could still be an XML element
	    } else {
	      // Attempt to serialize it
	      try {
	        if (document.xmlVersion) {
	          var xmlSerializer = new XMLSerializer();
	          return xmlSerializer.serializeToString(value);
	        } else {
	          // Firefox 11- do not support outerHTML
	          //   It does, however, support innerHTML
	          //   Use the following to render the element
	          var ns = "http://www.w3.org/1999/xhtml";
	          var container = document.createElementNS(ns, '_');
	
	          container.appendChild(value.cloneNode(false));
	          html = container.innerHTML
	            .replace('><', '>' + value.innerHTML + '<');
	          container.innerHTML = '';
	          return html;
	        }
	      } catch (err) {
	        // This could be a non-native DOM implementation,
	        //   continue with the normal flow:
	        //   printing the element as if it is an object.
	      }
	    }
	  }
	
	  // Look up the keys of the object.
	  var visibleKeys = getEnumerableProperties(value);
	  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
	
	  // Some type of object without properties can be shortcutted.
	  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
	  // a `stack` plus `description` property; ignore those for consistency.
	  if (keys.length === 0 || (isError(value) && (
	      (keys.length === 1 && keys[0] === 'stack') ||
	      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
	     ))) {
	    if (typeof value === 'function') {
	      var name = getName(value);
	      var nameSuffix = name ? ': ' + name : '';
	      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (typeof value === 'function') {
	    var name = getName(value);
	    var nameSuffix = name ? ': ' + name : '';
	    base = ' [Function' + nameSuffix + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    return formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  switch (typeof value) {
	    case 'undefined':
	      return ctx.stylize('undefined', 'undefined');
	
	    case 'string':
	      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                               .replace(/'/g, "\\'")
	                                               .replace(/\\"/g, '"') + '\'';
	      return ctx.stylize(simple, 'string');
	
	    case 'number':
	      if (value === 0 && (1/value) === -Infinity) {
	        return ctx.stylize('-0', 'number');
	      }
	      return ctx.stylize('' + value, 'number');
	
	    case 'boolean':
	      return ctx.stylize('' + value, 'boolean');
	  }
	  // For some reason typeof null is "object", so special case here.
	  if (value === null) {
	    return ctx.stylize('null', 'null');
	  }
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str;
	  if (value.__lookupGetter__) {
	    if (value.__lookupGetter__(key)) {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Getter/Setter]', 'special');
	      } else {
	        str = ctx.stylize('[Getter]', 'special');
	      }
	    } else {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Setter]', 'special');
	      }
	    }
	  }
	  if (visibleKeys.indexOf(key) < 0) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(value[key]) < 0) {
	      if (recurseTimes === null) {
	        str = formatValue(ctx, value[key], null);
	      } else {
	        str = formatValue(ctx, value[key], recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (typeof name === 'undefined') {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	function isArray(ar) {
	  return Array.isArray(ar) ||
	         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
	}
	
	function isRegExp(re) {
	  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
	}
	
	function isDate(d) {
	  return typeof d === 'object' && objectToString(d) === '[object Date]';
	}
	
	function isError(e) {
	  return typeof e === 'object' && objectToString(e) === '[object Error]';
	}
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * Chai - getName utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * # getName(func)
	 *
	 * Gets the name of a function, in a cross-browser way.
	 *
	 * @param {Function} a function (usually a constructor)
	 * @namespace Utils
	 * @name getName
	 */
	
	module.exports = function (func) {
	  if (func.name) return func.name;
	
	  var match = /^\s?function ([^(]*)\(/.exec(func);
	  return match && match[1] ? match[1] : "";
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*!
	 * Chai - getProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### .getProperties(object)
	 *
	 * This allows the retrieval of property names of an object, enumerable or not,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getProperties
	 * @api public
	 */
	
	module.exports = function getProperties(object) {
	  var result = Object.getOwnPropertyNames(object);
	
	  function addProperty(property) {
	    if (result.indexOf(property) === -1) {
	      result.push(property);
	    }
	  }
	
	  var proto = Object.getPrototypeOf(object);
	  while (proto !== null) {
	    Object.getOwnPropertyNames(proto).forEach(addProperty);
	    proto = Object.getPrototypeOf(proto);
	  }
	
	  return result;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*!
	 * Chai - getEnumerableProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### .getEnumerableProperties(object)
	 *
	 * This allows the retrieval of enumerable property names of an object,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getEnumerableProperties
	 * @api public
	 */
	
	module.exports = function getEnumerableProperties(object) {
	  var result = [];
	  for (var name in object) {
	    result.push(name);
	  }
	  return result;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var inspect = __webpack_require__(18);
	var config = __webpack_require__(23);
	
	/**
	 * ### .objDisplay (object)
	 *
	 * Determines if an object or an array matches
	 * criteria to be inspected in-line for error
	 * messages or should be truncated.
	 *
	 * @param {Mixed} javascript object to inspect
	 * @name objDisplay
	 * @namespace Utils
	 * @api public
	 */
	
	module.exports = function (obj) {
	  var str = inspect(obj)
	    , type = Object.prototype.toString.call(obj);
	
	  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
	    if (type === '[object Function]') {
	      return !obj.name || obj.name === ''
	        ? '[Function]'
	        : '[Function: ' + obj.name + ']';
	    } else if (type === '[object Array]') {
	      return '[ Array(' + obj.length + ') ]';
	    } else if (type === '[object Object]') {
	      var keys = Object.keys(obj)
	        , kstr = keys.length > 2
	          ? keys.splice(0, 2).join(', ') + ', ...'
	          : keys.join(', ');
	      return '{ Object (' + kstr + ') }';
	    } else {
	      return str;
	    }
	  } else {
	    return str;
	  }
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {
	
	  /**
	   * ### config.includeStack
	   *
	   * User configurable property, influences whether stack trace
	   * is included in Assertion error message. Default of false
	   * suppresses stack trace in the error message.
	   *
	   *     chai.config.includeStack = true;  // enable stack on error
	   *
	   * @param {Boolean}
	   * @api public
	   */
	
	   includeStack: false,
	
	  /**
	   * ### config.showDiff
	   *
	   * User configurable property, influences whether or not
	   * the `showDiff` flag should be included in the thrown
	   * AssertionErrors. `false` will always be `false`; `true`
	   * will be true when the assertion has requested a diff
	   * be shown.
	   *
	   * @param {Boolean}
	   * @api public
	   */
	
	  showDiff: true,
	
	  /**
	   * ### config.truncateThreshold
	   *
	   * User configurable property, sets length threshold for actual and
	   * expected values in assertion errors. If this threshold is exceeded, for
	   * example for large data structures, the value is replaced with something
	   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
	   *
	   * Set it to zero if you want to disable truncating altogether.
	   *
	   * This is especially userful when doing assertions on arrays: having this
	   * set to a reasonable large value makes the failure messages readily
	   * inspectable.
	   *
	   *     chai.config.truncateThreshold = 0;  // disable truncating
	   *
	   * @param {Number}
	   * @api public
	   */
	
	  truncateThreshold: 40
	
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*!
	 * Chai - transferFlags utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### transferFlags(assertion, object, includeAll = true)
	 *
	 * Transfer all the flags for `assertion` to `object`. If
	 * `includeAll` is set to `false`, then the base Chai
	 * assertion flags (namely `object`, `ssfi`, and `message`)
	 * will not be transferred.
	 *
	 *
	 *     var newAssertion = new Assertion();
	 *     utils.transferFlags(assertion, newAssertion);
	 *
	 *     var anotherAsseriton = new Assertion(myObj);
	 *     utils.transferFlags(assertion, anotherAssertion, false);
	 *
	 * @param {Assertion} assertion the assertion to transfer the flags from
	 * @param {Object} object the object to transfer the flags to; usually a new assertion
	 * @param {Boolean} includeAll
	 * @namespace Utils
	 * @name transferFlags
	 * @api private
	 */
	
	module.exports = function (assertion, object, includeAll) {
	  var flags = assertion.__flags || (assertion.__flags = Object.create(null));
	
	  if (!object.__flags) {
	    object.__flags = Object.create(null);
	  }
	
	  includeAll = arguments.length === 3 ? includeAll : true;
	
	  for (var flag in flags) {
	    if (includeAll ||
	        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
	      object.__flags[flag] = flags[flag];
	    }
	  }
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependencies
	 */
	
	var type = __webpack_require__(27);
	
	/*!
	 * Buffer.isBuffer browser shim
	 */
	
	var Buffer;
	try { Buffer = __webpack_require__(29).Buffer; }
	catch(ex) {
	  Buffer = {};
	  Buffer.isBuffer = function() { return false; }
	}
	
	/*!
	 * Primary Export
	 */
	
	module.exports = deepEqual;
	
	/**
	 * Assert super-strict (egal) equality between
	 * two objects of any type.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @param {Array} memoised (optional)
	 * @return {Boolean} equal match
	 */
	
	function deepEqual(a, b, m) {
	  if (sameValue(a, b)) {
	    return true;
	  } else if ('date' === type(a)) {
	    return dateEqual(a, b);
	  } else if ('regexp' === type(a)) {
	    return regexpEqual(a, b);
	  } else if (Buffer.isBuffer(a)) {
	    return bufferEqual(a, b);
	  } else if ('arguments' === type(a)) {
	    return argumentsEqual(a, b, m);
	  } else if (!typeEqual(a, b)) {
	    return false;
	  } else if (('object' !== type(a) && 'object' !== type(b))
	  && ('array' !== type(a) && 'array' !== type(b))) {
	    return sameValue(a, b);
	  } else {
	    return objectEqual(a, b, m);
	  }
	}
	
	/*!
	 * Strict (egal) equality test. Ensures that NaN always
	 * equals NaN and `-0` does not equal `+0`.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} equal match
	 */
	
	function sameValue(a, b) {
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  return a !== a && b !== b;
	}
	
	/*!
	 * Compare the types of two given objects and
	 * return if they are equal. Note that an Array
	 * has a type of `array` (not `object`) and arguments
	 * have a type of `arguments` (not `array`/`object`).
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function typeEqual(a, b) {
	  return type(a) === type(b);
	}
	
	/*!
	 * Compare two Date objects by asserting that
	 * the time values are equal using `saveValue`.
	 *
	 * @param {Date} a
	 * @param {Date} b
	 * @return {Boolean} result
	 */
	
	function dateEqual(a, b) {
	  if ('date' !== type(b)) return false;
	  return sameValue(a.getTime(), b.getTime());
	}
	
	/*!
	 * Compare two regular expressions by converting them
	 * to string and checking for `sameValue`.
	 *
	 * @param {RegExp} a
	 * @param {RegExp} b
	 * @return {Boolean} result
	 */
	
	function regexpEqual(a, b) {
	  if ('regexp' !== type(b)) return false;
	  return sameValue(a.toString(), b.toString());
	}
	
	/*!
	 * Assert deep equality of two `arguments` objects.
	 * Unfortunately, these must be sliced to arrays
	 * prior to test to ensure no bad behavior.
	 *
	 * @param {Arguments} a
	 * @param {Arguments} b
	 * @param {Array} memoize (optional)
	 * @return {Boolean} result
	 */
	
	function argumentsEqual(a, b, m) {
	  if ('arguments' !== type(b)) return false;
	  a = [].slice.call(a);
	  b = [].slice.call(b);
	  return deepEqual(a, b, m);
	}
	
	/*!
	 * Get enumerable properties of a given object.
	 *
	 * @param {Object} a
	 * @return {Array} property names
	 */
	
	function enumerable(a) {
	  var res = [];
	  for (var key in a) res.push(key);
	  return res;
	}
	
	/*!
	 * Simple equality for flat iterable objects
	 * such as Arrays or Node.js buffers.
	 *
	 * @param {Iterable} a
	 * @param {Iterable} b
	 * @return {Boolean} result
	 */
	
	function iterableEqual(a, b) {
	  if (a.length !==  b.length) return false;
	
	  var i = 0;
	  var match = true;
	
	  for (; i < a.length; i++) {
	    if (a[i] !== b[i]) {
	      match = false;
	      break;
	    }
	  }
	
	  return match;
	}
	
	/*!
	 * Extension to `iterableEqual` specifically
	 * for Node.js Buffers.
	 *
	 * @param {Buffer} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function bufferEqual(a, b) {
	  if (!Buffer.isBuffer(b)) return false;
	  return iterableEqual(a, b);
	}
	
	/*!
	 * Block for `objectEqual` ensuring non-existing
	 * values don't get in.
	 *
	 * @param {Mixed} object
	 * @return {Boolean} result
	 */
	
	function isValue(a) {
	  return a !== null && a !== undefined;
	}
	
	/*!
	 * Recursively check the equality of two objects.
	 * Once basic sameness has been established it will
	 * defer to `deepEqual` for each enumerable key
	 * in the object.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function objectEqual(a, b, m) {
	  if (!isValue(a) || !isValue(b)) {
	    return false;
	  }
	
	  if (a.prototype !== b.prototype) {
	    return false;
	  }
	
	  var i;
	  if (m) {
	    for (i = 0; i < m.length; i++) {
	      if ((m[i][0] === a && m[i][1] === b)
	      ||  (m[i][0] === b && m[i][1] === a)) {
	        return true;
	      }
	    }
	  } else {
	    m = [];
	  }
	
	  try {
	    var ka = enumerable(a);
	    var kb = enumerable(b);
	  } catch (ex) {
	    return false;
	  }
	
	  ka.sort();
	  kb.sort();
	
	  if (!iterableEqual(ka, kb)) {
	    return false;
	  }
	
	  m.push([ a, b ]);
	
	  var key;
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], m)) {
	      return false;
	    }
	  }
	
	  return true;
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Primary Exports
	 */
	
	var exports = module.exports = getType;
	
	/*!
	 * Detectable javascript natives
	 */
	
	var natives = {
	    '[object Array]': 'array'
	  , '[object RegExp]': 'regexp'
	  , '[object Function]': 'function'
	  , '[object Arguments]': 'arguments'
	  , '[object Date]': 'date'
	};
	
	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	
	function getType (obj) {
	  var str = Object.prototype.toString.call(obj);
	  if (natives[str]) return natives[str];
	  if (obj === null) return 'null';
	  if (obj === undefined) return 'undefined';
	  if (obj === Object(obj)) return 'object';
	  return typeof obj;
	}
	
	exports.Library = Library;
	
	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */
	
	function Library () {
	  this.tests = {};
	}
	
	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */
	
	Library.prototype.of = getType;
	
	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */
	
	Library.prototype.define = function (type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};
	
	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */
	
	Library.prototype.test = function (obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];
	
	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(30)
	var ieee754 = __webpack_require__(31)
	var isArray = __webpack_require__(32)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).Buffer, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 31 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 32 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathValue utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * @see https://github.com/logicalparadox/filtr
	 * MIT Licensed
	 */
	
	var getPathInfo = __webpack_require__(34);
	
	/**
	 * ### .getPathValue(path, object)
	 *
	 * This allows the retrieval of values in an
	 * object given a string path.
	 *
	 *     var obj = {
	 *         prop1: {
	 *             arr: ['a', 'b', 'c']
	 *           , str: 'Hello'
	 *         }
	 *       , prop2: {
	 *             arr: [ { nested: 'Universe' } ]
	 *           , str: 'Hello again!'
	 *         }
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     getPathValue('prop1.str', obj); // Hello
	 *     getPathValue('prop1.att[2]', obj); // b
	 *     getPathValue('prop2.arr[0].nested', obj); // Universe
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} value or `undefined`
	 * @namespace Utils
	 * @name getPathValue
	 * @api public
	 */
	module.exports = function(path, obj) {
	  var info = getPathInfo(path, obj);
	  return info.value;
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathInfo utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var hasProperty = __webpack_require__(35);
	
	/**
	 * ### .getPathInfo(path, object)
	 *
	 * This allows the retrieval of property info in an
	 * object given a string path.
	 *
	 * The path info consists of an object with the
	 * following properties:
	 *
	 * * parent - The parent object of the property referenced by `path`
	 * * name - The name of the final property, a number if it was an array indexer
	 * * value - The value of the property, if it exists, otherwise `undefined`
	 * * exists - Whether the property exists or not
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} info
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */
	
	module.exports = function getPathInfo(path, obj) {
	  var parsed = parsePath(path),
	      last = parsed[parsed.length - 1];
	
	  var info = {
	    parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
	    name: last.p || last.i,
	    value: _getPathValue(parsed, obj)
	  };
	  info.exists = hasProperty(info.name, info.parent);
	
	  return info;
	};
	
	
	/*!
	 * ## parsePath(path)
	 *
	 * Helper function used to parse string object
	 * paths. Use in conjunction with `_getPathValue`.
	 *
	 *      var parsed = parsePath('myobject.property.subprop');
	 *
	 * ### Paths:
	 *
	 * * Can be as near infinitely deep and nested
	 * * Arrays are also valid using the formal `myobject.document[3].property`.
	 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
	 *
	 * @param {String} path
	 * @returns {Object} parsed
	 * @api private
	 */
	
	function parsePath (path) {
	  var str = path.replace(/([^\\])\[/g, '$1.[')
	    , parts = str.match(/(\\\.|[^.]+?)+/g);
	  return parts.map(function (value) {
	    var re = /^\[(\d+)\]$/
	      , mArr = re.exec(value);
	    if (mArr) return { i: parseFloat(mArr[1]) };
	    else return { p: value.replace(/\\([.\[\]])/g, '$1') };
	  });
	}
	
	
	/*!
	 * ## _getPathValue(parsed, obj)
	 *
	 * Helper companion function for `.parsePath` that returns
	 * the value located at the parsed address.
	 *
	 *      var value = getPathValue(parsed, obj);
	 *
	 * @param {Object} parsed definition from `parsePath`.
	 * @param {Object} object to search against
	 * @param {Number} object to search against
	 * @returns {Object|Undefined} value
	 * @api private
	 */
	
	function _getPathValue (parsed, obj, index) {
	  var tmp = obj
	    , res;
	
	  index = (index === undefined ? parsed.length : index);
	
	  for (var i = 0, l = index; i < l; i++) {
	    var part = parsed[i];
	    if (tmp) {
	      if ('undefined' !== typeof part.p)
	        tmp = tmp[part.p];
	      else if ('undefined' !== typeof part.i)
	        tmp = tmp[part.i];
	      if (i == (l - 1)) res = tmp;
	    } else {
	      res = undefined;
	    }
	  }
	  return res;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - hasProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var type = __webpack_require__(13);
	
	/**
	 * ### .hasProperty(object, name)
	 *
	 * This allows checking whether an object has
	 * named property or numeric array index.
	 *
	 * Basically does the same thing as the `in`
	 * operator but works properly with natives
	 * and null/undefined values.
	 *
	 *     var obj = {
	 *         arr: ['a', 'b', 'c']
	 *       , str: 'Hello'
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     hasProperty('str', obj);  // true
	 *     hasProperty('constructor', obj);  // true
	 *     hasProperty('bar', obj);  // false
	 *
	 *     hasProperty('length', obj.str); // true
	 *     hasProperty(1, obj.str);  // true
	 *     hasProperty(5, obj.str);  // false
	 *
	 *     hasProperty('length', obj.arr);  // true
	 *     hasProperty(2, obj.arr);  // true
	 *     hasProperty(3, obj.arr);  // false
	 *
	 * @param {Objuect} object
	 * @param {String|Number} name
	 * @returns {Boolean} whether it exists
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */
	
	var literals = {
	    'number': Number
	  , 'string': String
	};
	
	module.exports = function hasProperty(name, obj) {
	  var ot = type(obj);
	
	  // Bad Object, obviously no props at all
	  if(ot === 'null' || ot === 'undefined')
	    return false;
	
	  // The `in` operator does not work with certain literals
	  // box these before the check
	  if(literals[ot] && typeof obj !== 'object')
	    obj = new literals[ot](obj);
	
	  return name in obj;
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(23);
	var flag = __webpack_require__(12);
	
	/**
	 * ### addProperty (ctx, name, getter)
	 *
	 * Adds a property to the prototype of an object.
	 *
	 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.instanceof(Foo);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.foo;
	 *
	 * @param {Object} ctx object to which the property is added
	 * @param {String} name of property to add
	 * @param {Function} getter function to be used for name
	 * @namespace Utils
	 * @name addProperty
	 * @api public
	 */
	
	module.exports = function (ctx, name, getter) {
	  Object.defineProperty(ctx, name,
	    { get: function addProperty() {
	        var old_ssfi = flag(this, 'ssfi');
	        if (old_ssfi && config.includeStack === false)
	          flag(this, 'ssfi', addProperty);
	
	        var result = getter.call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(23);
	
	/**
	 * ### .addMethod (ctx, name, method)
	 *
	 * Adds a method to the prototype of an object.
	 *
	 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for name
	 * @namespace Utils
	 * @name addMethod
	 * @api public
	 */
	var flag = __webpack_require__(12);
	
	module.exports = function (ctx, name, method) {
	  ctx[name] = function () {
	    var old_ssfi = flag(this, 'ssfi');
	    if (old_ssfi && config.includeStack === false)
	      flag(this, 'ssfi', ctx[name]);
	    var result = method.apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteProperty (ctx, name, fn)
	 *
	 * Overwites an already existing property getter and provides
	 * access to previous value. Must return function to use as getter.
	 *
	 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
	 *       return function () {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.name).to.equal('bar');
	 *         } else {
	 *           _super.call(this);
	 *         }
	 *       }
	 *     });
	 *
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.ok;
	 *
	 * @param {Object} ctx object whose property is to be overwritten
	 * @param {String} name of property to overwrite
	 * @param {Function} getter function that returns a getter function to be used for name
	 * @namespace Utils
	 * @name overwriteProperty
	 * @api public
	 */
	
	module.exports = function (ctx, name, getter) {
	  var _get = Object.getOwnPropertyDescriptor(ctx, name)
	    , _super = function () {};
	
	  if (_get && 'function' === typeof _get.get)
	    _super = _get.get
	
	  Object.defineProperty(ctx, name,
	    { get: function () {
	        var result = getter(_super).call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteMethod (ctx, name, fn)
	 *
	 * Overwites an already existing method and provides
	 * access to previous function. Must return function
	 * to be used for name.
	 *
	 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
	 *       return function (str) {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.value).to.equal(str);
	 *         } else {
	 *           _super.apply(this, arguments);
	 *         }
	 *       }
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.equal('bar');
	 *
	 * @param {Object} ctx object whose method is to be overwritten
	 * @param {String} name of method to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @namespace Utils
	 * @name overwriteMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method) {
	  var _method = ctx[name]
	    , _super = function () { return this; };
	
	  if (_method && 'function' === typeof _method)
	    _super = _method;
	
	  ctx[name] = function () {
	    var result = method(_super).apply(this, arguments);
	    return result === undefined ? this : result;
	  }
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addChainingMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependencies
	 */
	
	var transferFlags = __webpack_require__(24);
	var flag = __webpack_require__(12);
	var config = __webpack_require__(23);
	
	/*!
	 * Module variables
	 */
	
	// Check whether `__proto__` is supported
	var hasProtoSupport = '__proto__' in Object;
	
	// Without `__proto__` support, this module will need to add properties to a function.
	// However, some Function.prototype methods cannot be overwritten,
	// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
	var excludeNames = /^(?:length|name|arguments|caller)$/;
	
	// Cache `Function` properties
	var call  = Function.prototype.call,
	    apply = Function.prototype.apply;
	
	/**
	 * ### addChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Adds a method to an object, such that the method can also be chained.
	 *
	 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
	 *
	 * The result can then be used as both a method assertion, executing both `method` and
	 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *     expect(fooStr).to.be.foo.equal('foo');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for `name`, when called
	 * @param {Function} chainingBehavior function to be called every time the property is accessed
	 * @namespace Utils
	 * @name addChainableMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method, chainingBehavior) {
	  if (typeof chainingBehavior !== 'function') {
	    chainingBehavior = function () { };
	  }
	
	  var chainableBehavior = {
	      method: method
	    , chainingBehavior: chainingBehavior
	  };
	
	  // save the methods so we can overwrite them later, if we need to.
	  if (!ctx.__methods) {
	    ctx.__methods = {};
	  }
	  ctx.__methods[name] = chainableBehavior;
	
	  Object.defineProperty(ctx, name,
	    { get: function () {
	        chainableBehavior.chainingBehavior.call(this);
	
	        var assert = function assert() {
	          var old_ssfi = flag(this, 'ssfi');
	          if (old_ssfi && config.includeStack === false)
	            flag(this, 'ssfi', assert);
	          var result = chainableBehavior.method.apply(this, arguments);
	          return result === undefined ? this : result;
	        };
	
	        // Use `__proto__` if available
	        if (hasProtoSupport) {
	          // Inherit all properties from the object by replacing the `Function` prototype
	          var prototype = assert.__proto__ = Object.create(this);
	          // Restore the `call` and `apply` methods from `Function`
	          prototype.call = call;
	          prototype.apply = apply;
	        }
	        // Otherwise, redefine all properties (slow!)
	        else {
	          var asserterNames = Object.getOwnPropertyNames(ctx);
	          asserterNames.forEach(function (asserterName) {
	            if (!excludeNames.test(asserterName)) {
	              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
	              Object.defineProperty(assert, asserterName, pd);
	            }
	          });
	        }
	
	        transferFlags(this, assert);
	        return assert;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteChainableMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Overwites an already existing chainable method
	 * and provides access to the previous function or
	 * property.  Must return functions to be used for
	 * name.
	 *
	 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
	 *       function (_super) {
	 *       }
	 *     , function (_super) {
	 *       }
	 *     );
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.have.length(3);
	 *     expect(myFoo).to.have.length.above(3);
	 *
	 * @param {Object} ctx object whose method / property is to be overwritten
	 * @param {String} name of method / property to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @param {Function} chainingBehavior function that returns a function to be used for property
	 * @namespace Utils
	 * @name overwriteChainableMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method, chainingBehavior) {
	  var chainableBehavior = ctx.__methods[name];
	
	  var _chainingBehavior = chainableBehavior.chainingBehavior;
	  chainableBehavior.chainingBehavior = function () {
	    var result = chainingBehavior(_chainingBehavior).call(this);
	    return result === undefined ? this : result;
	  };
	
	  var _method = chainableBehavior.method;
	  chainableBehavior.method = function () {
	    var result = method(_method).apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(23);
	
	module.exports = function (_chai, util) {
	  /*!
	   * Module dependencies.
	   */
	
	  var AssertionError = _chai.AssertionError
	    , flag = util.flag;
	
	  /*!
	   * Module export.
	   */
	
	  _chai.Assertion = Assertion;
	
	  /*!
	   * Assertion Constructor
	   *
	   * Creates object for chaining.
	   *
	   * @api private
	   */
	
	  function Assertion (obj, msg, stack) {
	    flag(this, 'ssfi', stack || arguments.callee);
	    flag(this, 'object', obj);
	    flag(this, 'message', msg);
	  }
	
	  Object.defineProperty(Assertion, 'includeStack', {
	    get: function() {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      return config.includeStack;
	    },
	    set: function(value) {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      config.includeStack = value;
	    }
	  });
	
	  Object.defineProperty(Assertion, 'showDiff', {
	    get: function() {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      return config.showDiff;
	    },
	    set: function(value) {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      config.showDiff = value;
	    }
	  });
	
	  Assertion.addProperty = function (name, fn) {
	    util.addProperty(this.prototype, name, fn);
	  };
	
	  Assertion.addMethod = function (name, fn) {
	    util.addMethod(this.prototype, name, fn);
	  };
	
	  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
	    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };
	
	  Assertion.overwriteProperty = function (name, fn) {
	    util.overwriteProperty(this.prototype, name, fn);
	  };
	
	  Assertion.overwriteMethod = function (name, fn) {
	    util.overwriteMethod(this.prototype, name, fn);
	  };
	
	  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
	    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };
	
	  /**
	   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
	   *
	   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
	   *
	   * @name assert
	   * @param {Philosophical} expression to be tested
	   * @param {String|Function} message or function that returns message to display if expression fails
	   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
	   * @param {Mixed} expected value (remember to check for negation)
	   * @param {Mixed} actual (optional) will default to `this.obj`
	   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
	   * @api private
	   */
	
	  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
	    var ok = util.test(this, arguments);
	    if (true !== showDiff) showDiff = false;
	    if (true !== config.showDiff) showDiff = false;
	
	    if (!ok) {
	      var msg = util.getMessage(this, arguments)
	        , actual = util.getActual(this, arguments);
	      throw new AssertionError(msg, {
	          actual: actual
	        , expected: expected
	        , showDiff: showDiff
	      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
	    }
	  };
	
	  /*!
	   * ### ._obj
	   *
	   * Quick reference to stored `actual` value for plugin developers.
	   *
	   * @api private
	   */
	
	  Object.defineProperty(Assertion.prototype, '_obj',
	    { get: function () {
	        return flag(this, 'object');
	      }
	    , set: function (val) {
	        flag(this, 'object', val);
	      }
	  });
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, _) {
	  var Assertion = chai.Assertion
	    , toString = Object.prototype.toString
	    , flag = _.flag;
	
	  /**
	   * ### Language Chains
	   *
	   * The following are provided as chainable getters to
	   * improve the readability of your assertions. They
	   * do not provide testing capabilities unless they
	   * have been overwritten by a plugin.
	   *
	   * **Chains**
	   *
	   * - to
	   * - be
	   * - been
	   * - is
	   * - that
	   * - which
	   * - and
	   * - has
	   * - have
	   * - with
	   * - at
	   * - of
	   * - same
	   *
	   * @name language chains
	   * @namespace BDD
	   * @api public
	   */
	
	  [ 'to', 'be', 'been'
	  , 'is', 'and', 'has', 'have'
	  , 'with', 'that', 'which', 'at'
	  , 'of', 'same' ].forEach(function (chain) {
	    Assertion.addProperty(chain, function () {
	      return this;
	    });
	  });
	
	  /**
	   * ### .not
	   *
	   * Negates any of assertions following in the chain.
	   *
	   *     expect(foo).to.not.equal('bar');
	   *     expect(goodFn).to.not.throw(Error);
	   *     expect({ foo: 'baz' }).to.have.property('foo')
	   *       .and.not.equal('bar');
	   *
	   * @name not
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('not', function () {
	    flag(this, 'negate', true);
	  });
	
	  /**
	   * ### .deep
	   *
	   * Sets the `deep` flag, later used by the `equal` and
	   * `property` assertions.
	   *
	   *     expect(foo).to.deep.equal({ bar: 'baz' });
	   *     expect({ foo: { bar: { baz: 'quux' } } })
	   *       .to.have.deep.property('foo.bar.baz', 'quux');
	   *
	   * `.deep.property` special characters can be escaped
	   * by adding two slashes before the `.` or `[]`.
	   *
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name deep
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('deep', function () {
	    flag(this, 'deep', true);
	  });
	
	  /**
	   * ### .any
	   *
	   * Sets the `any` flag, (opposite of the `all` flag)
	   * later used in the `keys` assertion.
	   *
	   *     expect(foo).to.have.any.keys('bar', 'baz');
	   *
	   * @name any
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('any', function () {
	    flag(this, 'any', true);
	    flag(this, 'all', false)
	  });
	
	
	  /**
	   * ### .all
	   *
	   * Sets the `all` flag (opposite of the `any` flag)
	   * later used by the `keys` assertion.
	   *
	   *     expect(foo).to.have.all.keys('bar', 'baz');
	   *
	   * @name all
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('all', function () {
	    flag(this, 'all', true);
	    flag(this, 'any', false);
	  });
	
	  /**
	   * ### .a(type)
	   *
	   * The `a` and `an` assertions are aliases that can be
	   * used either as language chains or to assert a value's
	   * type.
	   *
	   *     // typeof
	   *     expect('test').to.be.a('string');
	   *     expect({ foo: 'bar' }).to.be.an('object');
	   *     expect(null).to.be.a('null');
	   *     expect(undefined).to.be.an('undefined');
	   *     expect(new Error).to.be.an('error');
	   *     expect(new Promise).to.be.a('promise');
	   *     expect(new Float32Array()).to.be.a('float32array');
	   *     expect(Symbol()).to.be.a('symbol');
	   *
	   *     // es6 overrides
	   *     expect({[Symbol.toStringTag]:()=>'foo'}).to.be.a('foo');
	   *
	   *     // language chain
	   *     expect(foo).to.be.an.instanceof(Foo);
	   *
	   * @name a
	   * @alias an
	   * @param {String} type
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function an (type, msg) {
	    if (msg) flag(this, 'message', msg);
	    type = type.toLowerCase();
	    var obj = flag(this, 'object')
	      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';
	
	    this.assert(
	        type === _.type(obj)
	      , 'expected #{this} to be ' + article + type
	      , 'expected #{this} not to be ' + article + type
	    );
	  }
	
	  Assertion.addChainableMethod('an', an);
	  Assertion.addChainableMethod('a', an);
	
	  /**
	   * ### .include(value)
	   *
	   * The `include` and `contain` assertions can be used as either property
	   * based language chains or as methods to assert the inclusion of an object
	   * in an array or a substring in a string. When used as language chains,
	   * they toggle the `contains` flag for the `keys` assertion.
	   *
	   *     expect([1,2,3]).to.include(2);
	   *     expect('foobar').to.contain('foo');
	   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
	   *
	   * @name include
	   * @alias contain
	   * @alias includes
	   * @alias contains
	   * @param {Object|String|Number} obj
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function includeChainingBehavior () {
	    flag(this, 'contains', true);
	  }
	
	  function include (val, msg) {
	    _.expectTypes(this, ['array', 'object', 'string']);
	
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var expected = false;
	
	    if (_.type(obj) === 'array' && _.type(val) === 'object') {
	      for (var i in obj) {
	        if (_.eql(obj[i], val)) {
	          expected = true;
	          break;
	        }
	      }
	    } else if (_.type(val) === 'object') {
	      if (!flag(this, 'negate')) {
	        for (var k in val) new Assertion(obj).property(k, val[k]);
	        return;
	      }
	      var subset = {};
	      for (var k in val) subset[k] = obj[k];
	      expected = _.eql(subset, val);
	    } else {
	      expected = (obj != undefined) && ~obj.indexOf(val);
	    }
	    this.assert(
	        expected
	      , 'expected #{this} to include ' + _.inspect(val)
	      , 'expected #{this} to not include ' + _.inspect(val));
	  }
	
	  Assertion.addChainableMethod('include', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
	  Assertion.addChainableMethod('includes', include, includeChainingBehavior);
	
	  /**
	   * ### .ok
	   *
	   * Asserts that the target is truthy.
	   *
	   *     expect('everything').to.be.ok;
	   *     expect(1).to.be.ok;
	   *     expect(false).to.not.be.ok;
	   *     expect(undefined).to.not.be.ok;
	   *     expect(null).to.not.be.ok;
	   *
	   * @name ok
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('ok', function () {
	    this.assert(
	        flag(this, 'object')
	      , 'expected #{this} to be truthy'
	      , 'expected #{this} to be falsy');
	  });
	
	  /**
	   * ### .true
	   *
	   * Asserts that the target is `true`.
	   *
	   *     expect(true).to.be.true;
	   *     expect(1).to.not.be.true;
	   *
	   * @name true
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('true', function () {
	    this.assert(
	        true === flag(this, 'object')
	      , 'expected #{this} to be true'
	      , 'expected #{this} to be false'
	      , this.negate ? false : true
	    );
	  });
	
	  /**
	   * ### .false
	   *
	   * Asserts that the target is `false`.
	   *
	   *     expect(false).to.be.false;
	   *     expect(0).to.not.be.false;
	   *
	   * @name false
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('false', function () {
	    this.assert(
	        false === flag(this, 'object')
	      , 'expected #{this} to be false'
	      , 'expected #{this} to be true'
	      , this.negate ? true : false
	    );
	  });
	
	  /**
	   * ### .null
	   *
	   * Asserts that the target is `null`.
	   *
	   *     expect(null).to.be.null;
	   *     expect(undefined).to.not.be.null;
	   *
	   * @name null
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('null', function () {
	    this.assert(
	        null === flag(this, 'object')
	      , 'expected #{this} to be null'
	      , 'expected #{this} not to be null'
	    );
	  });
	
	  /**
	   * ### .undefined
	   *
	   * Asserts that the target is `undefined`.
	   *
	   *     expect(undefined).to.be.undefined;
	   *     expect(null).to.not.be.undefined;
	   *
	   * @name undefined
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('undefined', function () {
	    this.assert(
	        undefined === flag(this, 'object')
	      , 'expected #{this} to be undefined'
	      , 'expected #{this} not to be undefined'
	    );
	  });
	
	  /**
	   * ### .NaN
	   * Asserts that the target is `NaN`.
	   *
	   *     expect('foo').to.be.NaN;
	   *     expect(4).not.to.be.NaN;
	   *
	   * @name NaN
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('NaN', function () {
	    this.assert(
	        isNaN(flag(this, 'object'))
	        , 'expected #{this} to be NaN'
	        , 'expected #{this} not to be NaN'
	    );
	  });
	
	  /**
	   * ### .exist
	   *
	   * Asserts that the target is neither `null` nor `undefined`.
	   *
	   *     var foo = 'hi'
	   *       , bar = null
	   *       , baz;
	   *
	   *     expect(foo).to.exist;
	   *     expect(bar).to.not.exist;
	   *     expect(baz).to.not.exist;
	   *
	   * @name exist
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('exist', function () {
	    this.assert(
	        null != flag(this, 'object')
	      , 'expected #{this} to exist'
	      , 'expected #{this} to not exist'
	    );
	  });
	
	
	  /**
	   * ### .empty
	   *
	   * Asserts that the target's length is `0`. For arrays and strings, it checks
	   * the `length` property. For objects, it gets the count of
	   * enumerable keys.
	   *
	   *     expect([]).to.be.empty;
	   *     expect('').to.be.empty;
	   *     expect({}).to.be.empty;
	   *
	   * @name empty
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('empty', function () {
	    var obj = flag(this, 'object')
	      , expected = obj;
	
	    if (Array.isArray(obj) || 'string' === typeof object) {
	      expected = obj.length;
	    } else if (typeof obj === 'object') {
	      expected = Object.keys(obj).length;
	    }
	
	    this.assert(
	        !expected
	      , 'expected #{this} to be empty'
	      , 'expected #{this} not to be empty'
	    );
	  });
	
	  /**
	   * ### .arguments
	   *
	   * Asserts that the target is an arguments object.
	   *
	   *     function test () {
	   *       expect(arguments).to.be.arguments;
	   *     }
	   *
	   * @name arguments
	   * @alias Arguments
	   * @namespace BDD
	   * @api public
	   */
	
	  function checkArguments () {
	    var obj = flag(this, 'object')
	      , type = Object.prototype.toString.call(obj);
	    this.assert(
	        '[object Arguments]' === type
	      , 'expected #{this} to be arguments but got ' + type
	      , 'expected #{this} to not be arguments'
	    );
	  }
	
	  Assertion.addProperty('arguments', checkArguments);
	  Assertion.addProperty('Arguments', checkArguments);
	
	  /**
	   * ### .equal(value)
	   *
	   * Asserts that the target is strictly equal (`===`) to `value`.
	   * Alternately, if the `deep` flag is set, asserts that
	   * the target is deeply equal to `value`.
	   *
	   *     expect('hello').to.equal('hello');
	   *     expect(42).to.equal(42);
	   *     expect(1).to.not.equal(true);
	   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
	   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
	   *
	   * @name equal
	   * @alias equals
	   * @alias eq
	   * @alias deep.equal
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertEqual (val, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'deep')) {
	      return this.eql(val);
	    } else {
	      this.assert(
	          val === obj
	        , 'expected #{this} to equal #{exp}'
	        , 'expected #{this} to not equal #{exp}'
	        , val
	        , this._obj
	        , true
	      );
	    }
	  }
	
	  Assertion.addMethod('equal', assertEqual);
	  Assertion.addMethod('equals', assertEqual);
	  Assertion.addMethod('eq', assertEqual);
	
	  /**
	   * ### .eql(value)
	   *
	   * Asserts that the target is deeply equal to `value`.
	   *
	   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
	   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
	   *
	   * @name eql
	   * @alias eqls
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertEql(obj, msg) {
	    if (msg) flag(this, 'message', msg);
	    this.assert(
	        _.eql(obj, flag(this, 'object'))
	      , 'expected #{this} to deeply equal #{exp}'
	      , 'expected #{this} to not deeply equal #{exp}'
	      , obj
	      , this._obj
	      , true
	    );
	  }
	
	  Assertion.addMethod('eql', assertEql);
	  Assertion.addMethod('eqls', assertEql);
	
	  /**
	   * ### .above(value)
	   *
	   * Asserts that the target is greater than `value`.
	   *
	   *     expect(10).to.be.above(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *
	   * @name above
	   * @alias gt
	   * @alias greaterThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertAbove (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len > n
	        , 'expected #{this} to have a length above #{exp} but got #{act}'
	        , 'expected #{this} to not have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj > n
	        , 'expected #{this} to be above ' + n
	        , 'expected #{this} to be at most ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('above', assertAbove);
	  Assertion.addMethod('gt', assertAbove);
	  Assertion.addMethod('greaterThan', assertAbove);
	
	  /**
	   * ### .least(value)
	   *
	   * Asserts that the target is greater than or equal to `value`.
	   *
	   *     expect(10).to.be.at.least(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.least(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
	   *
	   * @name least
	   * @alias gte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertLeast (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= n
	        , 'expected #{this} to have a length at least #{exp} but got #{act}'
	        , 'expected #{this} to have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj >= n
	        , 'expected #{this} to be at least ' + n
	        , 'expected #{this} to be below ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('least', assertLeast);
	  Assertion.addMethod('gte', assertLeast);
	
	  /**
	   * ### .below(value)
	   *
	   * Asserts that the target is less than `value`.
	   *
	   *     expect(5).to.be.below(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *
	   * @name below
	   * @alias lt
	   * @alias lessThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertBelow (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len < n
	        , 'expected #{this} to have a length below #{exp} but got #{act}'
	        , 'expected #{this} to not have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj < n
	        , 'expected #{this} to be below ' + n
	        , 'expected #{this} to be at least ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('below', assertBelow);
	  Assertion.addMethod('lt', assertBelow);
	  Assertion.addMethod('lessThan', assertBelow);
	
	  /**
	   * ### .most(value)
	   *
	   * Asserts that the target is less than or equal to `value`.
	   *
	   *     expect(5).to.be.at.most(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.most(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
	   *
	   * @name most
	   * @alias lte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertMost (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len <= n
	        , 'expected #{this} to have a length at most #{exp} but got #{act}'
	        , 'expected #{this} to have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj <= n
	        , 'expected #{this} to be at most ' + n
	        , 'expected #{this} to be above ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('most', assertMost);
	  Assertion.addMethod('lte', assertMost);
	
	  /**
	   * ### .within(start, finish)
	   *
	   * Asserts that the target is within a range.
	   *
	   *     expect(7).to.be.within(5,10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a length range. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * @name within
	   * @param {Number} start lowerbound inclusive
	   * @param {Number} finish upperbound inclusive
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('within', function (start, finish, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , range = start + '..' + finish;
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= start && len <= finish
	        , 'expected #{this} to have a length within ' + range
	        , 'expected #{this} to not have a length within ' + range
	      );
	    } else {
	      this.assert(
	          obj >= start && obj <= finish
	        , 'expected #{this} to be within ' + range
	        , 'expected #{this} to not be within ' + range
	      );
	    }
	  });
	
	  /**
	   * ### .instanceof(constructor)
	   *
	   * Asserts that the target is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , Chai = new Tea('chai');
	   *
	   *     expect(Chai).to.be.an.instanceof(Tea);
	   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
	   *
	   * @name instanceof
	   * @param {Constructor} constructor
	   * @param {String} message _optional_
	   * @alias instanceOf
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertInstanceOf (constructor, msg) {
	    if (msg) flag(this, 'message', msg);
	    var name = _.getName(constructor);
	    this.assert(
	        flag(this, 'object') instanceof constructor
	      , 'expected #{this} to be an instance of ' + name
	      , 'expected #{this} to not be an instance of ' + name
	    );
	  };
	
	  Assertion.addMethod('instanceof', assertInstanceOf);
	  Assertion.addMethod('instanceOf', assertInstanceOf);
	
	  /**
	   * ### .property(name, [value])
	   *
	   * Asserts that the target has a property `name`, optionally asserting that
	   * the value of that property is strictly equal to  `value`.
	   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
	   * references into objects and arrays.
	   *
	   *     // simple referencing
	   *     var obj = { foo: 'bar' };
	   *     expect(obj).to.have.property('foo');
	   *     expect(obj).to.have.property('foo', 'bar');
	   *
	   *     // deep referencing
	   *     var deepObj = {
	   *         green: { tea: 'matcha' }
	   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
	   *     };
	   *
	   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
	   *
	   * You can also use an array as the starting point of a `deep.property`
	   * assertion, or traverse nested arrays.
	   *
	   *     var arr = [
	   *         [ 'chai', 'matcha', 'konacha' ]
	   *       , [ { tea: 'chai' }
	   *         , { tea: 'matcha' }
	   *         , { tea: 'konacha' } ]
	   *     ];
	   *
	   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
	   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
	   *
	   * Furthermore, `property` changes the subject of the assertion
	   * to be the value of that property from the original object. This
	   * permits for further chainable assertions on that property.
	   *
	   *     expect(obj).to.have.property('foo')
	   *       .that.is.a('string');
	   *     expect(deepObj).to.have.property('green')
	   *       .that.is.an('object')
	   *       .that.deep.equals({ tea: 'matcha' });
	   *     expect(deepObj).to.have.property('teas')
	   *       .that.is.an('array')
	   *       .with.deep.property('[2]')
	   *         .that.deep.equals({ tea: 'konacha' });
	   *
	   * Note that dots and bracket in `name` must be backslash-escaped when
	   * the `deep` flag is set, while they must NOT be escaped when the `deep`
	   * flag is not set.
	   *
	   *     // simple referencing
	   *     var css = { '.link[target]': 42 };
	   *     expect(css).to.have.property('.link[target]', 42);
	   *
	   *     // deep referencing
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name property
	   * @alias deep.property
	   * @param {String} name
	   * @param {Mixed} value (optional)
	   * @param {String} message _optional_
	   * @returns value of property for chaining
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('property', function (name, val, msg) {
	    if (msg) flag(this, 'message', msg);
	
	    var isDeep = !!flag(this, 'deep')
	      , descriptor = isDeep ? 'deep property ' : 'property '
	      , negate = flag(this, 'negate')
	      , obj = flag(this, 'object')
	      , pathInfo = isDeep ? _.getPathInfo(name, obj) : null
	      , hasProperty = isDeep
	        ? pathInfo.exists
	        : _.hasProperty(name, obj)
	      , value = isDeep
	        ? pathInfo.value
	        : obj[name];
	
	    if (negate && arguments.length > 1) {
	      if (undefined === value) {
	        msg = (msg != null) ? msg + ': ' : '';
	        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
	      }
	    } else {
	      this.assert(
	          hasProperty
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
	        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
	    }
	
	    if (arguments.length > 1) {
	      this.assert(
	          val === value
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
	        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
	        , val
	        , value
	      );
	    }
	
	    flag(this, 'object', value);
	  });
	
	
	  /**
	   * ### .ownProperty(name)
	   *
	   * Asserts that the target has an own property `name`.
	   *
	   *     expect('test').to.have.ownProperty('length');
	   *
	   * @name ownProperty
	   * @alias haveOwnProperty
	   * @param {String} name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertOwnProperty (name, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        obj.hasOwnProperty(name)
	      , 'expected #{this} to have own property ' + _.inspect(name)
	      , 'expected #{this} to not have own property ' + _.inspect(name)
	    );
	  }
	
	  Assertion.addMethod('ownProperty', assertOwnProperty);
	  Assertion.addMethod('haveOwnProperty', assertOwnProperty);
	
	  /**
	   * ### .ownPropertyDescriptor(name[, descriptor[, message]])
	   *
	   * Asserts that the target has an own property descriptor `name`, that optionally matches `descriptor`.
	   *
	   *     expect('test').to.have.ownPropertyDescriptor('length');
	   *     expect('test').to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 4 });
	   *     expect('test').not.to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 3 });
	   *     expect('test').ownPropertyDescriptor('length').to.have.property('enumerable', false);
	   *     expect('test').ownPropertyDescriptor('length').to.have.keys('value');
	   *
	   * @name ownPropertyDescriptor
	   * @alias haveOwnPropertyDescriptor
	   * @param {String} name
	   * @param {Object} descriptor _optional_
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertOwnPropertyDescriptor (name, descriptor, msg) {
	    if (typeof descriptor === 'string') {
	      msg = descriptor;
	      descriptor = null;
	    }
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
	    if (actualDescriptor && descriptor) {
	      this.assert(
	          _.eql(descriptor, actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
	        , descriptor
	        , actualDescriptor
	        , true
	      );
	    } else {
	      this.assert(
	          actualDescriptor
	        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
	        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
	      );
	    }
	    flag(this, 'object', actualDescriptor);
	  }
	
	  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
	  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);
	
	  /**
	   * ### .length
	   *
	   * Sets the `doLength` flag later used as a chain precursor to a value
	   * comparison for the `length` property.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * *Deprecation notice:* Using `length` as an assertion will be deprecated
	   * in version 2.4.0 and removed in 3.0.0. Code using the old style of
	   * asserting for `length` property value using `length(value)` should be
	   * switched to use `lengthOf(value)` instead.
	   *
	   * @name length
	   * @namespace BDD
	   * @api public
	   */
	
	  /**
	   * ### .lengthOf(value[, message])
	   *
	   * Asserts that the target's `length` property has
	   * the expected value.
	   *
	   *     expect([ 1, 2, 3]).to.have.lengthOf(3);
	   *     expect('foobar').to.have.lengthOf(6);
	   *
	   * @name lengthOf
	   * @param {Number} length
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertLengthChain () {
	    flag(this, 'doLength', true);
	  }
	
	  function assertLength (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).to.have.property('length');
	    var len = obj.length;
	
	    this.assert(
	        len == n
	      , 'expected #{this} to have a length of #{exp} but got #{act}'
	      , 'expected #{this} to not have a length of #{act}'
	      , n
	      , len
	    );
	  }
	
	  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
	  Assertion.addMethod('lengthOf', assertLength);
	
	  /**
	   * ### .match(regexp)
	   *
	   * Asserts that the target matches a regular expression.
	   *
	   *     expect('foobar').to.match(/^foo/);
	   *
	   * @name match
	   * @alias matches
	   * @param {RegExp} RegularExpression
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	  function assertMatch(re, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        re.exec(obj)
	      , 'expected #{this} to match ' + re
	      , 'expected #{this} not to match ' + re
	    );
	  }
	
	  Assertion.addMethod('match', assertMatch);
	  Assertion.addMethod('matches', assertMatch);
	
	  /**
	   * ### .string(string)
	   *
	   * Asserts that the string target contains another string.
	   *
	   *     expect('foobar').to.have.string('bar');
	   *
	   * @name string
	   * @param {String} string
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('string', function (str, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('string');
	
	    this.assert(
	        ~obj.indexOf(str)
	      , 'expected #{this} to contain ' + _.inspect(str)
	      , 'expected #{this} to not contain ' + _.inspect(str)
	    );
	  });
	
	
	  /**
	   * ### .keys(key1, [key2], [...])
	   *
	   * Asserts that the target contains any or all of the passed-in keys.
	   * Use in combination with `any`, `all`, `contains`, or `have` will affect
	   * what will pass.
	   *
	   * When used in conjunction with `any`, at least one key that is passed
	   * in must exist in the target object. This is regardless whether or not
	   * the `have` or `contain` qualifiers are used. Note, either `any` or `all`
	   * should be used in the assertion. If neither are used, the assertion is
	   * defaulted to `all`.
	   *
	   * When both `all` and `contain` are used, the target object must have at
	   * least all of the passed-in keys but may have more keys not listed.
	   *
	   * When both `all` and `have` are used, the target object must both contain
	   * all of the passed-in keys AND the number of keys in the target object must
	   * match the number of keys passed in (in other words, a target object must
	   * have all and only all of the passed-in keys).
	   *
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys('bar', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys(['foo']);
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys({'foo': 6});
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys({'bar': 6, 'foo': 7});
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys({'bar': 6});
	   *
	   *
	   * @name keys
	   * @alias key
	   * @param {...String|Array|Object} keys
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertKeys (keys) {
	    var obj = flag(this, 'object')
	      , str
	      , ok = true
	      , mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';
	
	    switch (_.type(keys)) {
	      case "array":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        break;
	      case "object":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        keys = Object.keys(keys);
	        break;
	      default:
	        keys = Array.prototype.slice.call(arguments);
	    }
	
	    if (!keys.length) throw new Error('keys required');
	
	    var actual = Object.keys(obj)
	      , expected = keys
	      , len = keys.length
	      , any = flag(this, 'any')
	      , all = flag(this, 'all');
	
	    if (!any && !all) {
	      all = true;
	    }
	
	    // Has any
	    if (any) {
	      var intersection = expected.filter(function(key) {
	        return ~actual.indexOf(key);
	      });
	      ok = intersection.length > 0;
	    }
	
	    // Has all
	    if (all) {
	      ok = keys.every(function(key){
	        return ~actual.indexOf(key);
	      });
	      if (!flag(this, 'negate') && !flag(this, 'contains')) {
	        ok = ok && keys.length == actual.length;
	      }
	    }
	
	    // Key string
	    if (len > 1) {
	      keys = keys.map(function(key){
	        return _.inspect(key);
	      });
	      var last = keys.pop();
	      if (all) {
	        str = keys.join(', ') + ', and ' + last;
	      }
	      if (any) {
	        str = keys.join(', ') + ', or ' + last;
	      }
	    } else {
	      str = _.inspect(keys[0]);
	    }
	
	    // Form
	    str = (len > 1 ? 'keys ' : 'key ') + str;
	
	    // Have / include
	    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
	
	    // Assertion
	    this.assert(
	        ok
	      , 'expected #{this} to ' + str
	      , 'expected #{this} to not ' + str
	      , expected.slice(0).sort()
	      , actual.sort()
	      , true
	    );
	  }
	
	  Assertion.addMethod('keys', assertKeys);
	  Assertion.addMethod('key', assertKeys);
	
	  /**
	   * ### .throw(constructor)
	   *
	   * Asserts that the function target will throw a specific error, or specific type of error
	   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
	   * for the error's message.
	   *
	   *     var err = new ReferenceError('This is a bad function.');
	   *     var fn = function () { throw err; }
	   *     expect(fn).to.throw(ReferenceError);
	   *     expect(fn).to.throw(Error);
	   *     expect(fn).to.throw(/bad function/);
	   *     expect(fn).to.not.throw('good function');
	   *     expect(fn).to.throw(ReferenceError, /bad function/);
	   *     expect(fn).to.throw(err);
	   *
	   * Please note that when a throw expectation is negated, it will check each
	   * parameter independently, starting with error constructor type. The appropriate way
	   * to check for the existence of a type of error but for a message that does not match
	   * is to use `and`.
	   *
	   *     expect(fn).to.throw(ReferenceError)
	   *        .and.not.throw(/good function/);
	   *
	   * @name throw
	   * @alias throws
	   * @alias Throw
	   * @param {ErrorConstructor} constructor
	   * @param {String|RegExp} expected error message
	   * @param {String} message _optional_
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @returns error for chaining (null if no error)
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertThrows (constructor, errMsg, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('function');
	
	    var thrown = false
	      , desiredError = null
	      , name = null
	      , thrownError = null;
	
	    if (arguments.length === 0) {
	      errMsg = null;
	      constructor = null;
	    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
	      errMsg = constructor;
	      constructor = null;
	    } else if (constructor && constructor instanceof Error) {
	      desiredError = constructor;
	      constructor = null;
	      errMsg = null;
	    } else if (typeof constructor === 'function') {
	      name = constructor.prototype.name;
	      if (!name || (name === 'Error' && constructor !== Error)) {
	        name = constructor.name || (new constructor()).name;
	      }
	    } else {
	      constructor = null;
	    }
	
	    try {
	      obj();
	    } catch (err) {
	      // first, check desired error
	      if (desiredError) {
	        this.assert(
	            err === desiredError
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp}'
	          , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	          , (err instanceof Error ? err.toString() : err)
	        );
	
	        flag(this, 'object', err);
	        return this;
	      }
	
	      // next, check constructor
	      if (constructor) {
	        this.assert(
	            err instanceof constructor
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
	          , name
	          , (err instanceof Error ? err.toString() : err)
	        );
	
	        if (!errMsg) {
	          flag(this, 'object', err);
	          return this;
	        }
	      }
	
	      // next, check message
	      var message = 'error' === _.type(err) && "message" in err
	        ? err.message
	        : '' + err;
	
	      if ((message != null) && errMsg && errMsg instanceof RegExp) {
	        this.assert(
	            errMsg.exec(message)
	          , 'expected #{this} to throw error matching #{exp} but got #{act}'
	          , 'expected #{this} to throw error not matching #{exp}'
	          , errMsg
	          , message
	        );
	
	        flag(this, 'object', err);
	        return this;
	      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
	        this.assert(
	            ~message.indexOf(errMsg)
	          , 'expected #{this} to throw error including #{exp} but got #{act}'
	          , 'expected #{this} to throw error not including #{act}'
	          , errMsg
	          , message
	        );
	
	        flag(this, 'object', err);
	        return this;
	      } else {
	        thrown = true;
	        thrownError = err;
	      }
	    }
	
	    var actuallyGot = ''
	      , expectedThrown = name !== null
	        ? name
	        : desiredError
	          ? '#{exp}' //_.inspect(desiredError)
	          : 'an error';
	
	    if (thrown) {
	      actuallyGot = ' but #{act} was thrown'
	    }
	
	    this.assert(
	        thrown === true
	      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
	      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
	      , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	      , (thrownError instanceof Error ? thrownError.toString() : thrownError)
	    );
	
	    flag(this, 'object', thrownError);
	  };
	
	  Assertion.addMethod('throw', assertThrows);
	  Assertion.addMethod('throws', assertThrows);
	  Assertion.addMethod('Throw', assertThrows);
	
	  /**
	   * ### .respondTo(method)
	   *
	   * Asserts that the object or class target will respond to a method.
	   *
	   *     Klass.prototype.bar = function(){};
	   *     expect(Klass).to.respondTo('bar');
	   *     expect(obj).to.respondTo('bar');
	   *
	   * To check if a constructor will respond to a static function,
	   * set the `itself` flag.
	   *
	   *     Klass.baz = function(){};
	   *     expect(Klass).itself.to.respondTo('baz');
	   *
	   * @name respondTo
	   * @alias respondsTo
	   * @param {String} method
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function respondTo (method, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , itself = flag(this, 'itself')
	      , context = ('function' === _.type(obj) && !itself)
	        ? obj.prototype[method]
	        : obj[method];
	
	    this.assert(
	        'function' === typeof context
	      , 'expected #{this} to respond to ' + _.inspect(method)
	      , 'expected #{this} to not respond to ' + _.inspect(method)
	    );
	  }
	
	  Assertion.addMethod('respondTo', respondTo);
	  Assertion.addMethod('respondsTo', respondTo);
	
	  /**
	   * ### .itself
	   *
	   * Sets the `itself` flag, later used by the `respondTo` assertion.
	   *
	   *     function Foo() {}
	   *     Foo.bar = function() {}
	   *     Foo.prototype.baz = function() {}
	   *
	   *     expect(Foo).itself.to.respondTo('bar');
	   *     expect(Foo).itself.not.to.respondTo('baz');
	   *
	   * @name itself
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('itself', function () {
	    flag(this, 'itself', true);
	  });
	
	  /**
	   * ### .satisfy(method)
	   *
	   * Asserts that the target passes a given truth test.
	   *
	   *     expect(1).to.satisfy(function(num) { return num > 0; });
	   *
	   * @name satisfy
	   * @alias satisfies
	   * @param {Function} matcher
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function satisfy (matcher, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var result = matcher(obj);
	    this.assert(
	        result
	      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
	      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
	      , this.negate ? false : true
	      , result
	    );
	  }
	
	  Assertion.addMethod('satisfy', satisfy);
	  Assertion.addMethod('satisfies', satisfy);
	
	  /**
	   * ### .closeTo(expected, delta)
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     expect(1.5).to.be.closeTo(1, 0.5);
	   *
	   * @name closeTo
	   * @alias approximately
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function closeTo(expected, delta, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	
	    new Assertion(obj, msg).is.a('number');
	    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
	      throw new Error('the arguments to closeTo or approximately must be numbers');
	    }
	
	    this.assert(
	        Math.abs(obj - expected) <= delta
	      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
	      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
	    );
	  }
	
	  Assertion.addMethod('closeTo', closeTo);
	  Assertion.addMethod('approximately', closeTo);
	
	  function isSubsetOf(subset, superset, cmp) {
	    return subset.every(function(elem) {
	      if (!cmp) return superset.indexOf(elem) !== -1;
	
	      return superset.some(function(elem2) {
	        return cmp(elem, elem2);
	      });
	    })
	  }
	
	  /**
	   * ### .members(set)
	   *
	   * Asserts that the target is a superset of `set`,
	   * or that the target and `set` have the same strictly-equal (===) members.
	   * Alternately, if the `deep` flag is set, set members are compared for deep
	   * equality.
	   *
	   *     expect([1, 2, 3]).to.include.members([3, 2]);
	   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
	   *
	   *     expect([4, 2]).to.have.members([2, 4]);
	   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
	   *
	   *     expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);
	   *
	   * @name members
	   * @param {Array} set
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('members', function (subset, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	
	    new Assertion(obj).to.be.an('array');
	    new Assertion(subset).to.be.an('array');
	
	    var cmp = flag(this, 'deep') ? _.eql : undefined;
	
	    if (flag(this, 'contains')) {
	      return this.assert(
	          isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to be a superset of #{act}'
	        , 'expected #{this} to not be a superset of #{act}'
	        , obj
	        , subset
	      );
	    }
	
	    this.assert(
	        isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to have the same members as #{act}'
	        , 'expected #{this} to not have the same members as #{act}'
	        , obj
	        , subset
	    );
	  });
	
	  /**
	   * ### .oneOf(list)
	   *
	   * Assert that a value appears somewhere in the top level of array `list`.
	   *
	   *     expect('a').to.be.oneOf(['a', 'b', 'c']);
	   *     expect(9).to.not.be.oneOf(['z']);
	   *     expect([3]).to.not.be.oneOf([1, 2, [3]]);
	   *
	   *     var three = [3];
	   *     // for object-types, contents are not compared
	   *     expect(three).to.not.be.oneOf([1, 2, [3]]);
	   *     // comparing references works
	   *     expect(three).to.be.oneOf([1, 2, three]);
	   *
	   * @name oneOf
	   * @param {Array<*>} list
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function oneOf (list, msg) {
	    if (msg) flag(this, 'message', msg);
	    var expected = flag(this, 'object');
	    new Assertion(list).to.be.an('array');
	
	    this.assert(
	        list.indexOf(expected) > -1
	      , 'expected #{this} to be one of #{exp}'
	      , 'expected #{this} to not be one of #{exp}'
	      , list
	      , expected
	    );
	  }
	
	  Assertion.addMethod('oneOf', oneOf);
	
	
	  /**
	   * ### .change(function)
	   *
	   * Asserts that a function changes an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val += 3 };
	   *     var noChangeFn = function() { return 'foo' + 'bar'; }
	   *     expect(fn).to.change(obj, 'val');
	   *     expect(noChangeFn).to.not.change(obj, 'val')
	   *
	   * @name change
	   * @alias changes
	   * @alias Change
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertChanges (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      initial !== object[prop]
	      , 'expected .' + prop + ' to change'
	      , 'expected .' + prop + ' to not change'
	    );
	  }
	
	  Assertion.addChainableMethod('change', assertChanges);
	  Assertion.addChainableMethod('changes', assertChanges);
	
	  /**
	   * ### .increase(function)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     expect(fn).to.increase(obj, 'val');
	   *
	   * @name increase
	   * @alias increases
	   * @alias Increase
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertIncreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      object[prop] - initial > 0
	      , 'expected .' + prop + ' to increase'
	      , 'expected .' + prop + ' to not increase'
	    );
	  }
	
	  Assertion.addChainableMethod('increase', assertIncreases);
	  Assertion.addChainableMethod('increases', assertIncreases);
	
	  /**
	   * ### .decrease(function)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     expect(fn).to.decrease(obj, 'val');
	   *
	   * @name decrease
	   * @alias decreases
	   * @alias Decrease
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertDecreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      object[prop] - initial < 0
	      , 'expected .' + prop + ' to decrease'
	      , 'expected .' + prop + ' to not decrease'
	    );
	  }
	
	  Assertion.addChainableMethod('decrease', assertDecreases);
	  Assertion.addChainableMethod('decreases', assertDecreases);
	
	  /**
	   * ### .extensible
	   *
	   * Asserts that the target is extensible (can have new properties added to
	   * it).
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect({}).to.be.extensible;
	   *     expect(nonExtensibleObject).to.not.be.extensible;
	   *     expect(sealedObject).to.not.be.extensible;
	   *     expect(frozenObject).to.not.be.extensible;
	   *
	   * @name extensible
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('extensible', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isExtensible;
	
	    try {
	      isExtensible = Object.isExtensible(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isExtensible = false;
	      else throw err;
	    }
	
	    this.assert(
	      isExtensible
	      , 'expected #{this} to be extensible'
	      , 'expected #{this} to not be extensible'
	    );
	  });
	
	  /**
	   * ### .sealed
	   *
	   * Asserts that the target is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(sealedObject).to.be.sealed;
	   *     expect(frozenObject).to.be.sealed;
	   *     expect({}).to.not.be.sealed;
	   *
	   * @name sealed
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('sealed', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isSealed;
	
	    try {
	      isSealed = Object.isSealed(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isSealed = true;
	      else throw err;
	    }
	
	    this.assert(
	      isSealed
	      , 'expected #{this} to be sealed'
	      , 'expected #{this} to not be sealed'
	    );
	  });
	
	  /**
	   * ### .frozen
	   *
	   * Asserts that the target is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(frozenObject).to.be.frozen;
	   *     expect({}).to.not.be.frozen;
	   *
	   * @name frozen
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('frozen', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isFrozen;
	
	    try {
	      isFrozen = Object.isFrozen(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isFrozen = true;
	      else throw err;
	    }
	
	    this.assert(
	      isFrozen
	      , 'expected #{this} to be frozen'
	      , 'expected #{this} to not be frozen'
	    );
	  });
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, util) {
	  chai.expect = function (val, message) {
	    return new chai.Assertion(val, message);
	  };
	
	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Expect
	   * @api public
	   */
	
	  chai.expect.fail = function (actual, expected, message, operator) {
	    message = message || 'expect.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, chai.expect.fail);
	  };
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, util) {
	  var Assertion = chai.Assertion;
	
	  function loadShould () {
	    // explicitly define this method as function as to have it's name to include as `ssfi`
	    function shouldGetter() {
	      if (this instanceof String || this instanceof Number || this instanceof Boolean ) {
	        return new Assertion(this.valueOf(), null, shouldGetter);
	      }
	      return new Assertion(this, null, shouldGetter);
	    }
	    function shouldSetter(value) {
	      // See https://github.com/chaijs/chai/issues/86: this makes
	      // `whatever.should = someValue` actually set `someValue`, which is
	      // especially useful for `global.should = require('chai').should()`.
	      //
	      // Note that we have to use [[DefineProperty]] instead of [[Put]]
	      // since otherwise we would trigger this very setter!
	      Object.defineProperty(this, 'should', {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    }
	    // modify Object.prototype to have `should`
	    Object.defineProperty(Object.prototype, 'should', {
	      set: shouldSetter
	      , get: shouldGetter
	      , configurable: true
	    });
	
	    var should = {};
	
	    /**
	     * ### .fail(actual, expected, [message], [operator])
	     *
	     * Throw a failure.
	     *
	     * @name fail
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @param {String} operator
	     * @namespace Should
	     * @api public
	     */
	
	    should.fail = function (actual, expected, message, operator) {
	      message = message || 'should.fail()';
	      throw new chai.AssertionError(message, {
	          actual: actual
	        , expected: expected
	        , operator: operator
	      }, should.fail);
	    };
	
	    /**
	     * ### .equal(actual, expected, [message])
	     *
	     * Asserts non-strict equality (`==`) of `actual` and `expected`.
	     *
	     *     should.equal(3, '3', '== coerces values to strings');
	     *
	     * @name equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */
	
	    should.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.equal(val2);
	    };
	
	    /**
	     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
	     *
	     * Asserts that `function` will throw an error that is an instance of
	     * `constructor`, or alternately that it will throw an error with message
	     * matching `regexp`.
	     *
	     *     should.throw(fn, 'function throws a reference error');
	     *     should.throw(fn, /function throws a reference error/);
	     *     should.throw(fn, ReferenceError);
	     *     should.throw(fn, ReferenceError, 'function throws a reference error');
	     *     should.throw(fn, ReferenceError, /function throws a reference error/);
	     *
	     * @name throw
	     * @alias Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */
	
	    should.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.Throw(errt, errs);
	    };
	
	    /**
	     * ### .exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var foo = 'hi';
	     *
	     *     should.exist(foo, 'foo exists');
	     *
	     * @name exist
	     * @namespace Should
	     * @api public
	     */
	
	    should.exist = function (val, msg) {
	      new Assertion(val, msg).to.exist;
	    }
	
	    // negation
	    should.not = {}
	
	    /**
	     * ### .not.equal(actual, expected, [message])
	     *
	     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	     *
	     *     should.not.equal(3, 4, 'these numbers are not equal');
	     *
	     * @name not.equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.not.equal(val2);
	    };
	
	    /**
	     * ### .throw(function, [constructor/regexp], [message])
	     *
	     * Asserts that `function` will _not_ throw an error that is an instance of
	     * `constructor`, or alternately that it will not throw an error with message
	     * matching `regexp`.
	     *
	     *     should.not.throw(fn, Error, 'function does not throw');
	     *
	     * @name not.throw
	     * @alias not.Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.not.Throw(errt, errs);
	    };
	
	    /**
	     * ### .not.exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var bar = null;
	     *
	     *     should.not.exist(bar, 'bar does not exist');
	     *
	     * @name not.exist
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.exist = function (val, msg) {
	      new Assertion(val, msg).to.not.exist;
	    }
	
	    should['throw'] = should['Throw'];
	    should.not['throw'] = should.not['Throw'];
	
	    return should;
	  };
	
	  chai.should = loadShould;
	  chai.Should = loadShould;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	
	module.exports = function (chai, util) {
	
	  /*!
	   * Chai dependencies.
	   */
	
	  var Assertion = chai.Assertion
	    , flag = util.flag;
	
	  /*!
	   * Module export.
	   */
	
	  /**
	   * ### assert(expression, message)
	   *
	   * Write your own test expressions.
	   *
	   *     assert('foo' !== 'bar', 'foo is not bar');
	   *     assert(Array.isArray([]), 'empty arrays are arrays');
	   *
	   * @param {Mixed} expression to test for truthiness
	   * @param {String} message to display on error
	   * @name assert
	   * @namespace Assert
	   * @api public
	   */
	
	  var assert = chai.assert = function (express, errmsg) {
	    var test = new Assertion(null, null, chai.assert);
	    test.assert(
	        express
	      , errmsg
	      , '[ negation message unavailable ]'
	    );
	  };
	
	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure. Node.js `assert` module-compatible.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.fail = function (actual, expected, message, operator) {
	    message = message || 'assert.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, assert.fail);
	  };
	
	  /**
	   * ### .isOk(object, [message])
	   *
	   * Asserts that `object` is truthy.
	   *
	   *     assert.isOk('everything', 'everything is ok');
	   *     assert.isOk(false, 'this will fail');
	   *
	   * @name isOk
	   * @alias ok
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isOk = function (val, msg) {
	    new Assertion(val, msg).is.ok;
	  };
	
	  /**
	   * ### .isNotOk(object, [message])
	   *
	   * Asserts that `object` is falsy.
	   *
	   *     assert.isNotOk('everything', 'this will fail');
	   *     assert.isNotOk(false, 'this will pass');
	   *
	   * @name isNotOk
	   * @alias notOk
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotOk = function (val, msg) {
	    new Assertion(val, msg).is.not.ok;
	  };
	
	  /**
	   * ### .equal(actual, expected, [message])
	   *
	   * Asserts non-strict equality (`==`) of `actual` and `expected`.
	   *
	   *     assert.equal(3, '3', '== coerces values to strings');
	   *
	   * @name equal
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.equal = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.equal);
	
	    test.assert(
	        exp == flag(test, 'object')
	      , 'expected #{this} to equal #{exp}'
	      , 'expected #{this} to not equal #{act}'
	      , exp
	      , act
	    );
	  };
	
	  /**
	   * ### .notEqual(actual, expected, [message])
	   *
	   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	   *
	   *     assert.notEqual(3, 4, 'these numbers are not equal');
	   *
	   * @name notEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notEqual = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.notEqual);
	
	    test.assert(
	        exp != flag(test, 'object')
	      , 'expected #{this} to not equal #{exp}'
	      , 'expected #{this} to equal #{act}'
	      , exp
	      , act
	    );
	  };
	
	  /**
	   * ### .strictEqual(actual, expected, [message])
	   *
	   * Asserts strict equality (`===`) of `actual` and `expected`.
	   *
	   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
	   *
	   * @name strictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.strictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.equal(exp);
	  };
	
	  /**
	   * ### .notStrictEqual(actual, expected, [message])
	   *
	   * Asserts strict inequality (`!==`) of `actual` and `expected`.
	   *
	   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
	   *
	   * @name notStrictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notStrictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.equal(exp);
	  };
	
	  /**
	   * ### .deepEqual(actual, expected, [message])
	   *
	   * Asserts that `actual` is deeply equal to `expected`.
	   *
	   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
	   *
	   * @name deepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.eql(exp);
	  };
	
	  /**
	   * ### .notDeepEqual(actual, expected, [message])
	   *
	   * Assert that `actual` is not deeply equal to `expected`.
	   *
	   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
	   *
	   * @name notDeepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notDeepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.eql(exp);
	  };
	
	   /**
	   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
	   *
	   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`
	   *
	   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
	   *
	   * @name isAbove
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAbove
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAbove = function (val, abv, msg) {
	    new Assertion(val, msg).to.be.above(abv);
	  };
	
	   /**
	   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
	   *
	   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`
	   *
	   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
	   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
	   *
	   * @name isAtLeast
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtLeast
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAtLeast = function (val, atlst, msg) {
	    new Assertion(val, msg).to.be.least(atlst);
	  };
	
	   /**
	   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
	   *
	   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`
	   *
	   *     assert.isBelow(3, 6, '3 is strictly less than 6');
	   *
	   * @name isBelow
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeBelow
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isBelow = function (val, blw, msg) {
	    new Assertion(val, msg).to.be.below(blw);
	  };
	
	   /**
	   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
	   *
	   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`
	   *
	   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
	   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
	   *
	   * @name isAtMost
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtMost
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAtMost = function (val, atmst, msg) {
	    new Assertion(val, msg).to.be.most(atmst);
	  };
	
	  /**
	   * ### .isTrue(value, [message])
	   *
	   * Asserts that `value` is true.
	   *
	   *     var teaServed = true;
	   *     assert.isTrue(teaServed, 'the tea has been served');
	   *
	   * @name isTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isTrue = function (val, msg) {
	    new Assertion(val, msg).is['true'];
	  };
	
	  /**
	   * ### .isNotTrue(value, [message])
	   *
	   * Asserts that `value` is not true.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotTrue(tea, 'great, time for tea!');
	   *
	   * @name isNotTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotTrue = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(true);
	  };
	
	  /**
	   * ### .isFalse(value, [message])
	   *
	   * Asserts that `value` is false.
	   *
	   *     var teaServed = false;
	   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
	   *
	   * @name isFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFalse = function (val, msg) {
	    new Assertion(val, msg).is['false'];
	  };
	
	  /**
	   * ### .isNotFalse(value, [message])
	   *
	   * Asserts that `value` is not false.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotFalse(tea, 'great, time for tea!');
	   *
	   * @name isNotFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFalse = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(false);
	  };
	
	  /**
	   * ### .isNull(value, [message])
	   *
	   * Asserts that `value` is null.
	   *
	   *     assert.isNull(err, 'there was no error');
	   *
	   * @name isNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNull = function (val, msg) {
	    new Assertion(val, msg).to.equal(null);
	  };
	
	  /**
	   * ### .isNotNull(value, [message])
	   *
	   * Asserts that `value` is not null.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotNull(tea, 'great, time for tea!');
	   *
	   * @name isNotNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotNull = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(null);
	  };
	
	  /**
	   * ### .isNaN
	   * Asserts that value is NaN
	   *
	   *    assert.isNaN('foo', 'foo is NaN');
	   *
	   * @name isNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNaN = function (val, msg) {
	    new Assertion(val, msg).to.be.NaN;
	  };
	
	  /**
	   * ### .isNotNaN
	   * Asserts that value is not NaN
	   *
	   *    assert.isNotNaN(4, '4 is not NaN');
	   *
	   * @name isNotNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	  assert.isNotNaN = function (val, msg) {
	    new Assertion(val, msg).not.to.be.NaN;
	  };
	
	  /**
	   * ### .isUndefined(value, [message])
	   *
	   * Asserts that `value` is `undefined`.
	   *
	   *     var tea;
	   *     assert.isUndefined(tea, 'no tea defined');
	   *
	   * @name isUndefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isUndefined = function (val, msg) {
	    new Assertion(val, msg).to.equal(undefined);
	  };
	
	  /**
	   * ### .isDefined(value, [message])
	   *
	   * Asserts that `value` is not `undefined`.
	   *
	   *     var tea = 'cup of chai';
	   *     assert.isDefined(tea, 'tea has been defined');
	   *
	   * @name isDefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isDefined = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(undefined);
	  };
	
	  /**
	   * ### .isFunction(value, [message])
	   *
	   * Asserts that `value` is a function.
	   *
	   *     function serveTea() { return 'cup of tea'; };
	   *     assert.isFunction(serveTea, 'great, we can have tea now');
	   *
	   * @name isFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFunction = function (val, msg) {
	    new Assertion(val, msg).to.be.a('function');
	  };
	
	  /**
	   * ### .isNotFunction(value, [message])
	   *
	   * Asserts that `value` is _not_ a function.
	   *
	   *     var serveTea = [ 'heat', 'pour', 'sip' ];
	   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
	   *
	   * @name isNotFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFunction = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('function');
	  };
	
	  /**
	   * ### .isObject(value, [message])
	   *
	   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   * _The assertion does not match subclassed objects._
	   *
	   *     var selection = { name: 'Chai', serve: 'with spices' };
	   *     assert.isObject(selection, 'tea selection is an object');
	   *
	   * @name isObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isObject = function (val, msg) {
	    new Assertion(val, msg).to.be.a('object');
	  };
	
	  /**
	   * ### .isNotObject(value, [message])
	   *
	   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   *
	   *     var selection = 'chai'
	   *     assert.isNotObject(selection, 'tea selection is not an object');
	   *     assert.isNotObject(null, 'null is not an object');
	   *
	   * @name isNotObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotObject = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('object');
	  };
	
	  /**
	   * ### .isArray(value, [message])
	   *
	   * Asserts that `value` is an array.
	   *
	   *     var menu = [ 'green', 'chai', 'oolong' ];
	   *     assert.isArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isArray = function (val, msg) {
	    new Assertion(val, msg).to.be.an('array');
	  };
	
	  /**
	   * ### .isNotArray(value, [message])
	   *
	   * Asserts that `value` is _not_ an array.
	   *
	   *     var menu = 'green|chai|oolong';
	   *     assert.isNotArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isNotArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotArray = function (val, msg) {
	    new Assertion(val, msg).to.not.be.an('array');
	  };
	
	  /**
	   * ### .isString(value, [message])
	   *
	   * Asserts that `value` is a string.
	   *
	   *     var teaOrder = 'chai';
	   *     assert.isString(teaOrder, 'order placed');
	   *
	   * @name isString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isString = function (val, msg) {
	    new Assertion(val, msg).to.be.a('string');
	  };
	
	  /**
	   * ### .isNotString(value, [message])
	   *
	   * Asserts that `value` is _not_ a string.
	   *
	   *     var teaOrder = 4;
	   *     assert.isNotString(teaOrder, 'order placed');
	   *
	   * @name isNotString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotString = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('string');
	  };
	
	  /**
	   * ### .isNumber(value, [message])
	   *
	   * Asserts that `value` is a number.
	   *
	   *     var cups = 2;
	   *     assert.isNumber(cups, 'how many cups');
	   *
	   * @name isNumber
	   * @param {Number} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNumber = function (val, msg) {
	    new Assertion(val, msg).to.be.a('number');
	  };
	
	  /**
	   * ### .isNotNumber(value, [message])
	   *
	   * Asserts that `value` is _not_ a number.
	   *
	   *     var cups = '2 cups please';
	   *     assert.isNotNumber(cups, 'how many cups');
	   *
	   * @name isNotNumber
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotNumber = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('number');
	  };
	
	  /**
	   * ### .isBoolean(value, [message])
	   *
	   * Asserts that `value` is a boolean.
	   *
	   *     var teaReady = true
	   *       , teaServed = false;
	   *
	   *     assert.isBoolean(teaReady, 'is the tea ready');
	   *     assert.isBoolean(teaServed, 'has tea been served');
	   *
	   * @name isBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isBoolean = function (val, msg) {
	    new Assertion(val, msg).to.be.a('boolean');
	  };
	
	  /**
	   * ### .isNotBoolean(value, [message])
	   *
	   * Asserts that `value` is _not_ a boolean.
	   *
	   *     var teaReady = 'yep'
	   *       , teaServed = 'nope';
	   *
	   *     assert.isNotBoolean(teaReady, 'is the tea ready');
	   *     assert.isNotBoolean(teaServed, 'has tea been served');
	   *
	   * @name isNotBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotBoolean = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('boolean');
	  };
	
	  /**
	   * ### .typeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
	   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
	   *     assert.typeOf('tea', 'string', 'we have a string');
	   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
	   *     assert.typeOf(null, 'null', 'we have a null');
	   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
	   *
	   * @name typeOf
	   * @param {Mixed} value
	   * @param {String} name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.typeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.a(type);
	  };
	
	  /**
	   * ### .notTypeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is _not_ `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
	   *
	   * @name notTypeOf
	   * @param {Mixed} value
	   * @param {String} typeof name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notTypeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.a(type);
	  };
	
	  /**
	   * ### .instanceOf(object, constructor, [message])
	   *
	   * Asserts that `value` is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new Tea('chai');
	   *
	   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
	   *
	   * @name instanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.instanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.instanceOf(type);
	  };
	
	  /**
	   * ### .notInstanceOf(object, constructor, [message])
	   *
	   * Asserts `value` is not an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new String('chai');
	   *
	   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
	   *
	   * @name notInstanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notInstanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.instanceOf(type);
	  };
	
	  /**
	   * ### .include(haystack, needle, [message])
	   *
	   * Asserts that `haystack` includes `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
	   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
	   *
	   * @name include
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.include = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.include).include(inc);
	  };
	
	  /**
	   * ### .notInclude(haystack, needle, [message])
	   *
	   * Asserts that `haystack` does not include `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.notInclude('foobar', 'baz', 'string not include substring');
	   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
	   *
	   * @name notInclude
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notInclude = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.notInclude).not.include(inc);
	  };
	
	  /**
	   * ### .match(value, regexp, [message])
	   *
	   * Asserts that `value` matches the regular expression `regexp`.
	   *
	   *     assert.match('foobar', /^foo/, 'regexp matches');
	   *
	   * @name match
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.match = function (exp, re, msg) {
	    new Assertion(exp, msg).to.match(re);
	  };
	
	  /**
	   * ### .notMatch(value, regexp, [message])
	   *
	   * Asserts that `value` does not match the regular expression `regexp`.
	   *
	   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
	   *
	   * @name notMatch
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notMatch = function (exp, re, msg) {
	    new Assertion(exp, msg).to.not.match(re);
	  };
	
	  /**
	   * ### .property(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`.
	   *
	   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
	   *
	   * @name property
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.property = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.property(prop);
	  };
	
	  /**
	   * ### .notProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`.
	   *
	   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
	   *
	   * @name notProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop);
	  };
	
	  /**
	   * ### .deepProperty(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`, which can be a
	   * string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
	   *
	   * @name deepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop);
	  };
	
	  /**
	   * ### .notDeepProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`, which
	   * can be a string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
	   *
	   * @name notDeepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notDeepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop);
	  };
	
	  /**
	   * ### .propertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`.
	   *
	   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
	   *
	   * @name propertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.propertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.property(prop, val);
	  };
	
	  /**
	   * ### .propertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`.
	   *
	   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
	   *
	   * @name propertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.propertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop, val);
	  };
	
	  /**
	   * ### .deepPropertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`. `property` can use dot- and bracket-notation for deep
	   * reference.
	   *
	   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
	   *
	   * @name deepPropertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepPropertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop, val);
	  };
	
	  /**
	   * ### .deepPropertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`. `property` can use dot- and
	   * bracket-notation for deep reference.
	   *
	   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
	   *
	   * @name deepPropertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
	  };
	
	  /**
	   * ### .lengthOf(object, length, [message])
	   *
	   * Asserts that `object` has a `length` property with the expected value.
	   *
	   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
	   *     assert.lengthOf('foobar', 6, 'string has length of 6');
	   *
	   * @name lengthOf
	   * @param {Mixed} object
	   * @param {Number} length
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.lengthOf = function (exp, len, msg) {
	    new Assertion(exp, msg).to.have.length(len);
	  };
	
	  /**
	   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
	   *
	   * Asserts that `function` will throw an error that is an instance of
	   * `constructor`, or alternately that it will throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.throws(fn, 'function throws a reference error');
	   *     assert.throws(fn, /function throws a reference error/);
	   *     assert.throws(fn, ReferenceError);
	   *     assert.throws(fn, ReferenceError, 'function throws a reference error');
	   *     assert.throws(fn, ReferenceError, /function throws a reference error/);
	   *
	   * @name throws
	   * @alias throw
	   * @alias Throw
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.throws = function (fn, errt, errs, msg) {
	    if ('string' === typeof errt || errt instanceof RegExp) {
	      errs = errt;
	      errt = null;
	    }
	
	    var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
	    return flag(assertErr, 'object');
	  };
	
	  /**
	   * ### .doesNotThrow(function, [constructor/regexp], [message])
	   *
	   * Asserts that `function` will _not_ throw an error that is an instance of
	   * `constructor`, or alternately that it will not throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.doesNotThrow(fn, Error, 'function does not throw');
	   *
	   * @name doesNotThrow
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotThrow = function (fn, type, msg) {
	    if ('string' === typeof type) {
	      msg = type;
	      type = null;
	    }
	
	    new Assertion(fn, msg).to.not.Throw(type);
	  };
	
	  /**
	   * ### .operator(val1, operator, val2, [message])
	   *
	   * Compares two values using `operator`.
	   *
	   *     assert.operator(1, '<', 2, 'everything is ok');
	   *     assert.operator(1, '>', 2, 'this will fail');
	   *
	   * @name operator
	   * @param {Mixed} val1
	   * @param {String} operator
	   * @param {Mixed} val2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.operator = function (val, operator, val2, msg) {
	    var ok;
	    switch(operator) {
	      case '==':
	        ok = val == val2;
	        break;
	      case '===':
	        ok = val === val2;
	        break;
	      case '>':
	        ok = val > val2;
	        break;
	      case '>=':
	        ok = val >= val2;
	        break;
	      case '<':
	        ok = val < val2;
	        break;
	      case '<=':
	        ok = val <= val2;
	        break;
	      case '!=':
	        ok = val != val2;
	        break;
	      case '!==':
	        ok = val !== val2;
	        break;
	      default:
	        throw new Error('Invalid operator "' + operator + '"');
	    }
	    var test = new Assertion(ok, msg);
	    test.assert(
	        true === flag(test, 'object')
	      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
	      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
	  };
	
	  /**
	   * ### .closeTo(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name closeTo
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.closeTo = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.closeTo(exp, delta);
	  };
	
	  /**
	   * ### .approximately(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name approximately
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.approximately = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.approximately(exp, delta);
	  };
	
	  /**
	   * ### .sameMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members.
	   * Order is not taken into account.
	   *
	   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
	   *
	   * @name sameMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.sameMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.members(set2);
	  }
	
	  /**
	   * ### .sameDeepMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members - using a deep equality checking.
	   * Order is not taken into account.
	   *
	   *     assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
	   *
	   * @name sameDeepMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.sameDeepMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.deep.members(set2);
	  }
	
	  /**
	   * ### .includeMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset`.
	   * Order is not taken into account.
	   *
	   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
	   *
	   * @name includeMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.includeMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.members(subset);
	  }
	
	  /**
	   * ### .includeDeepMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset` - using deep equality checking.
	   * Order is not taken into account.
	   * Duplicates are ignored.
	   *
	   *     assert.includeDeepMembers([ {a: 1}, {b: 2}, {c: 3} ], [ {b: 2}, {a: 1}, {b: 2} ], 'include deep members');
	   *
	   * @name includeDeepMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.includeDeepMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.deep.members(subset);
	  }
	
	  /**
	   * ### .oneOf(inList, list, [message])
	   *
	   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
	   *
	   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
	   *
	   * @name oneOf
	   * @param {*} inList
	   * @param {Array<*>} list
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.oneOf = function (inList, list, msg) {
	    new Assertion(inList, msg).to.be.oneOf(list);
	  }
	
	   /**
	   * ### .changes(function, object, property)
	   *
	   * Asserts that a function changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 22 };
	   *     assert.changes(fn, obj, 'val');
	   *
	   * @name changes
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.changes = function (fn, obj, prop) {
	    new Assertion(fn).to.change(obj, prop);
	  }
	
	   /**
	   * ### .doesNotChange(function, object, property)
	   *
	   * Asserts that a function does not changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { console.log('foo'); };
	   *     assert.doesNotChange(fn, obj, 'val');
	   *
	   * @name doesNotChange
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotChange = function (fn, obj, prop) {
	    new Assertion(fn).to.not.change(obj, prop);
	  }
	
	   /**
	   * ### .increases(function, object, property)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 13 };
	   *     assert.increases(fn, obj, 'val');
	   *
	   * @name increases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.increases = function (fn, obj, prop) {
	    new Assertion(fn).to.increase(obj, prop);
	  }
	
	   /**
	   * ### .doesNotIncrease(function, object, property)
	   *
	   * Asserts that a function does not increase object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 8 };
	   *     assert.doesNotIncrease(fn, obj, 'val');
	   *
	   * @name doesNotIncrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotIncrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.increase(obj, prop);
	  }
	
	   /**
	   * ### .decreases(function, object, property)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     assert.decreases(fn, obj, 'val');
	   *
	   * @name decreases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.decreases = function (fn, obj, prop) {
	    new Assertion(fn).to.decrease(obj, prop);
	  }
	
	   /**
	   * ### .doesNotDecrease(function, object, property)
	   *
	   * Asserts that a function does not decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     assert.doesNotDecrease(fn, obj, 'val');
	   *
	   * @name doesNotDecrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotDecrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.decrease(obj, prop);
	  }
	
	  /*!
	   * ### .ifError(object)
	   *
	   * Asserts if value is not a false value, and throws if it is a true value.
	   * This is added to allow for chai to be a drop-in replacement for Node's
	   * assert class.
	   *
	   *     var err = new Error('I am a custom error');
	   *     assert.ifError(err); // Rethrows err!
	   *
	   * @name ifError
	   * @param {Object} object
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.ifError = function (val) {
	    if (val) {
	      throw(val);
	    }
	  };
	
	  /**
	   * ### .isExtensible(object)
	   *
	   * Asserts that `object` is extensible (can have new properties added to it).
	   *
	   *     assert.isExtensible({});
	   *
	   * @name isExtensible
	   * @alias extensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.be.extensible;
	  };
	
	  /**
	   * ### .isNotExtensible(object)
	   *
	   * Asserts that `object` is _not_ extensible.
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freese({});
	   *
	   *     assert.isNotExtensible(nonExtensibleObject);
	   *     assert.isNotExtensible(sealedObject);
	   *     assert.isNotExtensible(frozenObject);
	   *
	   * @name isNotExtensible
	   * @alias notExtensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.extensible;
	  };
	
	  /**
	   * ### .isSealed(object)
	   *
	   * Asserts that `object` is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.seal({});
	   *
	   *     assert.isSealed(sealedObject);
	   *     assert.isSealed(frozenObject);
	   *
	   * @name isSealed
	   * @alias sealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.be.sealed;
	  };
	
	  /**
	   * ### .isNotSealed(object)
	   *
	   * Asserts that `object` is _not_ sealed.
	   *
	   *     assert.isNotSealed({});
	   *
	   * @name isNotSealed
	   * @alias notSealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.sealed;
	  };
	
	  /**
	   * ### .isFrozen(object)
	   *
	   * Asserts that `object` is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *     assert.frozen(frozenObject);
	   *
	   * @name isFrozen
	   * @alias frozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.be.frozen;
	  };
	
	  /**
	   * ### .isNotFrozen(object)
	   *
	   * Asserts that `object` is _not_ frozen.
	   *
	   *     assert.isNotFrozen({});
	   *
	   * @name isNotFrozen
	   * @alias notFrozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.frozen;
	  };
	
	  /*!
	   * Aliases.
	   */
	
	  (function alias(name, as){
	    assert[as] = assert[name];
	    return alias;
	  })
	  ('isOk', 'ok')
	  ('isNotOk', 'notOk')
	  ('throws', 'throw')
	  ('throws', 'Throw')
	  ('isExtensible', 'extensible')
	  ('isNotExtensible', 'notExtensible')
	  ('isSealed', 'sealed')
	  ('isNotSealed', 'notSealed')
	  ('isFrozen', 'frozen')
	  ('isNotFrozen', 'notFrozen');
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./index.ts": 49,
		"./primitives": 6,
		"./primitives.js": 6,
		"./tools": 5,
		"./tools.js": 5
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 47;


/***/ },
/* 48 */,
/* 49 */
/***/ function(module, exports) {

	import './tools'
	import './primitives'


/***/ },
/* 50 */,
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = process.env.COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/mocha\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(54);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 53 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module, __dirname, global) {/*!
	 * mocha
	 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var escapeRe = __webpack_require__(56);
	var path = __webpack_require__(57);
	var reporters = __webpack_require__(58);
	var utils = __webpack_require__(63);
	
	/**
	 * Expose `Mocha`.
	 */
	
	exports = module.exports = Mocha;
	
	/**
	 * To require local UIs and reporters when running in node.
	 */
	
	if (!process.browser) {
	  var cwd = process.cwd();
	  module.paths.push(cwd, path.join(cwd, 'node_modules'));
	}
	
	/**
	 * Expose internals.
	 */
	
	exports.utils = utils;
	exports.interfaces = __webpack_require__(130);
	exports.reporters = reporters;
	exports.Runnable = __webpack_require__(135);
	exports.Context = __webpack_require__(142);
	exports.Runner = __webpack_require__(143);
	exports.Suite = __webpack_require__(132);
	exports.Hook = __webpack_require__(134);
	exports.Test = __webpack_require__(137);
	
	/**
	 * Return image `name` path.
	 *
	 * @api private
	 * @param {string} name
	 * @return {string}
	 */
	function image(name) {
	  return path.join(__dirname, '../images', name + '.png');
	}
	
	/**
	 * Set up mocha with `options`.
	 *
	 * Options:
	 *
	 *   - `ui` name "bdd", "tdd", "exports" etc
	 *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`
	 *   - `globals` array of accepted globals
	 *   - `timeout` timeout in milliseconds
	 *   - `retries` number of times to retry failed tests
	 *   - `bail` bail on the first test failure
	 *   - `slow` milliseconds to wait before considering a test slow
	 *   - `ignoreLeaks` ignore global leaks
	 *   - `fullTrace` display the full stack-trace on failing
	 *   - `grep` string or regexp to filter tests with
	 *
	 * @param {Object} options
	 * @api public
	 */
	function Mocha(options) {
	  options = options || {};
	  this.files = [];
	  this.options = options;
	  if (options.grep) {
	    this.grep(new RegExp(options.grep));
	  }
	  if (options.fgrep) {
	    this.grep(options.fgrep);
	  }
	  this.suite = new exports.Suite('', new exports.Context());
	  this.ui(options.ui);
	  this.bail(options.bail);
	  this.reporter(options.reporter, options.reporterOptions);
	  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {
	    this.timeout(options.timeout);
	  }
	  if (typeof options.retries !== 'undefined' && options.retries !== null) {
	    this.retries(options.retries);
	  }
	  this.useColors(options.useColors);
	  if (options.enableTimeouts !== null) {
	    this.enableTimeouts(options.enableTimeouts);
	  }
	  if (options.slow) {
	    this.slow(options.slow);
	  }
	
	  this.suite.on('pre-require', function(context) {
	    exports.afterEach = context.afterEach || context.teardown;
	    exports.after = context.after || context.suiteTeardown;
	    exports.beforeEach = context.beforeEach || context.setup;
	    exports.before = context.before || context.suiteSetup;
	    exports.describe = context.describe || context.suite;
	    exports.it = context.it || context.test;
	    exports.setup = context.setup || context.beforeEach;
	    exports.suiteSetup = context.suiteSetup || context.before;
	    exports.suiteTeardown = context.suiteTeardown || context.after;
	    exports.suite = context.suite || context.describe;
	    exports.teardown = context.teardown || context.afterEach;
	    exports.test = context.test || context.it;
	    exports.run = context.run;
	  });
	}
	
	/**
	 * Enable or disable bailing on the first failure.
	 *
	 * @api public
	 * @param {boolean} [bail]
	 */
	Mocha.prototype.bail = function(bail) {
	  if (!arguments.length) {
	    bail = true;
	  }
	  this.suite.bail(bail);
	  return this;
	};
	
	/**
	 * Add test `file`.
	 *
	 * @api public
	 * @param {string} file
	 */
	Mocha.prototype.addFile = function(file) {
	  this.files.push(file);
	  return this;
	};
	
	/**
	 * Set reporter to `reporter`, defaults to "spec".
	 *
	 * @param {String|Function} reporter name or constructor
	 * @param {Object} reporterOptions optional options
	 * @api public
	 * @param {string|Function} reporter name or constructor
	 * @param {Object} reporterOptions optional options
	 */
	Mocha.prototype.reporter = function(reporter, reporterOptions) {
	  if (typeof reporter === 'function') {
	    this._reporter = reporter;
	  } else {
	    reporter = reporter || 'spec';
	    var _reporter;
	    // Try to load a built-in reporter.
	    if (reporters[reporter]) {
	      _reporter = reporters[reporter];
	    }
	    // Try to load reporters from process.cwd() and node_modules
	    if (!_reporter) {
	      try {
	        _reporter = __webpack_require__(144)(reporter);
	      } catch (err) {
	        err.message.indexOf('Cannot find module') !== -1
	          ? console.warn('"' + reporter + '" reporter not found')
	          : console.warn('"' + reporter + '" reporter blew up with error:\n' + err.stack);
	      }
	    }
	    if (!_reporter && reporter === 'teamcity') {
	      console.warn('The Teamcity reporter was moved to a package named '
	        + 'mocha-teamcity-reporter '
	        + '(https://npmjs.org/package/mocha-teamcity-reporter).');
	    }
	    if (!_reporter) {
	      throw new Error('invalid reporter "' + reporter + '"');
	    }
	    this._reporter = _reporter;
	  }
	  this.options.reporterOptions = reporterOptions;
	  return this;
	};
	
	/**
	 * Set test UI `name`, defaults to "bdd".
	 *
	 * @api public
	 * @param {string} bdd
	 */
	Mocha.prototype.ui = function(name) {
	  name = name || 'bdd';
	  this._ui = exports.interfaces[name];
	  if (!this._ui) {
	    try {
	      this._ui = __webpack_require__(144)(name);
	    } catch (err) {
	      throw new Error('invalid interface "' + name + '"');
	    }
	  }
	  this._ui = this._ui(this.suite);
	  return this;
	};
	
	/**
	 * Load registered files.
	 *
	 * @api private
	 */
	Mocha.prototype.loadFiles = function(fn) {
	  var self = this;
	  var suite = this.suite;
	  this.files.forEach(function(file) {
	    file = path.resolve(file);
	    suite.emit('pre-require', global, file, self);
	    suite.emit('require', __webpack_require__(144)(file), file, self);
	    suite.emit('post-require', global, file, self);
	  });
	  fn && fn();
	};
	
	/**
	 * Enable growl support.
	 *
	 * @api private
	 */
	Mocha.prototype._growl = function(runner, reporter) {
	  var notify = __webpack_require__(150);
	
	  runner.on('end', function() {
	    var stats = reporter.stats;
	    if (stats.failures) {
	      var msg = stats.failures + ' of ' + runner.total + ' tests failed';
	      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });
	    } else {
	      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {
	        name: 'mocha',
	        title: 'Passed',
	        image: image('ok')
	      });
	    }
	  });
	};
	
	/**
	 * Add regexp to grep, if `re` is a string it is escaped.
	 *
	 * @param {RegExp|String} re
	 * @return {Mocha}
	 * @api public
	 * @param {RegExp|string} re
	 * @return {Mocha}
	 */
	Mocha.prototype.grep = function(re) {
	  this.options.grep = typeof re === 'string' ? new RegExp(escapeRe(re)) : re;
	  return this;
	};
	
	/**
	 * Invert `.grep()` matches.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.invert = function() {
	  this.options.invert = true;
	  return this;
	};
	
	/**
	 * Ignore global leaks.
	 *
	 * @param {Boolean} ignore
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} ignore
	 * @return {Mocha}
	 */
	Mocha.prototype.ignoreLeaks = function(ignore) {
	  this.options.ignoreLeaks = Boolean(ignore);
	  return this;
	};
	
	/**
	 * Enable global leak checking.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.checkLeaks = function() {
	  this.options.ignoreLeaks = false;
	  return this;
	};
	
	/**
	 * Display long stack-trace on failing
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.fullTrace = function() {
	  this.options.fullStackTrace = true;
	  return this;
	};
	
	/**
	 * Enable growl support.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.growl = function() {
	  this.options.growl = true;
	  return this;
	};
	
	/**
	 * Ignore `globals` array or string.
	 *
	 * @param {Array|String} globals
	 * @return {Mocha}
	 * @api public
	 * @param {Array|string} globals
	 * @return {Mocha}
	 */
	Mocha.prototype.globals = function(globals) {
	  this.options.globals = (this.options.globals || []).concat(globals);
	  return this;
	};
	
	/**
	 * Emit color output.
	 *
	 * @param {Boolean} colors
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} colors
	 * @return {Mocha}
	 */
	Mocha.prototype.useColors = function(colors) {
	  if (colors !== undefined) {
	    this.options.useColors = colors;
	  }
	  return this;
	};
	
	/**
	 * Use inline diffs rather than +/-.
	 *
	 * @param {Boolean} inlineDiffs
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} inlineDiffs
	 * @return {Mocha}
	 */
	Mocha.prototype.useInlineDiffs = function(inlineDiffs) {
	  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;
	  return this;
	};
	
	/**
	 * Set the timeout in milliseconds.
	 *
	 * @param {Number} timeout
	 * @return {Mocha}
	 * @api public
	 * @param {number} timeout
	 * @return {Mocha}
	 */
	Mocha.prototype.timeout = function(timeout) {
	  this.suite.timeout(timeout);
	  return this;
	};
	
	/**
	 * Set the number of times to retry failed tests.
	 *
	 * @param {Number} retry times
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.retries = function(n) {
	  this.suite.retries(n);
	  return this;
	};
	
	/**
	 * Set slowness threshold in milliseconds.
	 *
	 * @param {Number} slow
	 * @return {Mocha}
	 * @api public
	 * @param {number} slow
	 * @return {Mocha}
	 */
	Mocha.prototype.slow = function(slow) {
	  this.suite.slow(slow);
	  return this;
	};
	
	/**
	 * Enable timeouts.
	 *
	 * @param {Boolean} enabled
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} enabled
	 * @return {Mocha}
	 */
	Mocha.prototype.enableTimeouts = function(enabled) {
	  this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);
	  return this;
	};
	
	/**
	 * Makes all tests async (accepting a callback)
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.asyncOnly = function() {
	  this.options.asyncOnly = true;
	  return this;
	};
	
	/**
	 * Disable syntax highlighting (in browser).
	 *
	 * @api public
	 */
	Mocha.prototype.noHighlighting = function() {
	  this.options.noHighlighting = true;
	  return this;
	};
	
	/**
	 * Enable uncaught errors to propagate (in browser).
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.allowUncaught = function() {
	  this.options.allowUncaught = true;
	  return this;
	};
	
	/**
	 * Delay root suite execution.
	 * @returns {Mocha}
	 */
	Mocha.prototype.delay = function delay() {
	  this.options.delay = true;
	  return this;
	};
	
	/**
	 * Run tests and invoke `fn()` when complete.
	 *
	 * @api public
	 * @param {Function} fn
	 * @return {Runner}
	 */
	Mocha.prototype.run = function(fn) {
	  if (this.files.length) {
	    this.loadFiles();
	  }
	  var suite = this.suite;
	  var options = this.options;
	  options.files = this.files;
	  var runner = new exports.Runner(suite, options.delay);
	  var reporter = new this._reporter(runner, options);
	  runner.ignoreLeaks = options.ignoreLeaks !== false;
	  runner.fullStackTrace = options.fullStackTrace;
	  runner.asyncOnly = options.asyncOnly;
	  runner.allowUncaught = options.allowUncaught;
	  if (options.grep) {
	    runner.grep(options.grep, options.invert);
	  }
	  if (options.globals) {
	    runner.globals(options.globals);
	  }
	  if (options.growl) {
	    this._growl(runner, reporter);
	  }
	  if (options.useColors !== undefined) {
	    exports.reporters.Base.useColors = options.useColors;
	  }
	  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;
	
	  function done(failures) {
	    if (reporter.done) {
	      reporter.done(failures, fn);
	    } else {
	      fn && fn(failures);
	    }
	  }
	
	  return runner.run(done);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53), __webpack_require__(55)(module), "/", (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	
	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		return str.replace(matchOperatorsRe,  '\\$&');
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// Alias exports to a their normalized format Mocha#reporter to prevent a need
	// for dynamic (try/catch) requires, which Browserify doesn't handle.
	exports.Base = exports.base = __webpack_require__(59);
	exports.Dot = exports.dot = __webpack_require__(86);
	exports.Doc = exports.doc = __webpack_require__(87);
	exports.TAP = exports.tap = __webpack_require__(88);
	exports.JSON = exports.json = __webpack_require__(89);
	exports.HTML = exports.html = __webpack_require__(90);
	exports.List = exports.list = __webpack_require__(92);
	exports.Min = exports.min = __webpack_require__(93);
	exports.Spec = exports.spec = __webpack_require__(94);
	exports.Nyan = exports.nyan = __webpack_require__(95);
	exports.XUnit = exports.xunit = __webpack_require__(96);
	exports.Markdown = exports.markdown = __webpack_require__(98);
	exports.Progress = exports.progress = __webpack_require__(99);
	exports.Landing = exports.landing = __webpack_require__(100);
	exports.JSONCov = exports['json-cov'] = __webpack_require__(101);
	exports.HTMLCov = exports['html-cov'] = __webpack_require__(102);
	exports.JSONStream = exports['json-stream'] = __webpack_require__(129);


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/**
	 * Module dependencies.
	 */
	
	var tty = __webpack_require__(60);
	var diff = __webpack_require__(61);
	var ms = __webpack_require__(62);
	var utils = __webpack_require__(63);
	var supportsColor = process.browser ? null : __webpack_require__(85);
	
	/**
	 * Expose `Base`.
	 */
	
	exports = module.exports = Base;
	
	/**
	 * Save timer references to avoid Sinon interfering.
	 * See: https://github.com/mochajs/mocha/issues/237
	 */
	
	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */
	
	/**
	 * Check if both stdio streams are associated with a tty.
	 */
	
	var isatty = tty.isatty(1) && tty.isatty(2);
	
	/**
	 * Enable coloring by default, except in the browser interface.
	 */
	
	exports.useColors = !process.browser && (supportsColor || (process.env.MOCHA_COLORS !== undefined));
	
	/**
	 * Inline diffs instead of +/-
	 */
	
	exports.inlineDiffs = false;
	
	/**
	 * Default color map.
	 */
	
	exports.colors = {
	  pass: 90,
	  fail: 31,
	  'bright pass': 92,
	  'bright fail': 91,
	  'bright yellow': 93,
	  pending: 36,
	  suite: 0,
	  'error title': 0,
	  'error message': 31,
	  'error stack': 90,
	  checkmark: 32,
	  fast: 90,
	  medium: 33,
	  slow: 31,
	  green: 32,
	  light: 90,
	  'diff gutter': 90,
	  'diff added': 32,
	  'diff removed': 31
	};
	
	/**
	 * Default symbol map.
	 */
	
	exports.symbols = {
	  ok: '✓',
	  err: '✖',
	  dot: '․'
	};
	
	// With node.js on Windows: use symbols available in terminal default fonts
	if (process.platform === 'win32') {
	  exports.symbols.ok = '\u221A';
	  exports.symbols.err = '\u00D7';
	  exports.symbols.dot = '.';
	}
	
	/**
	 * Color `str` with the given `type`,
	 * allowing colors to be disabled,
	 * as well as user-defined color
	 * schemes.
	 *
	 * @param {string} type
	 * @param {string} str
	 * @return {string}
	 * @api private
	 */
	var color = exports.color = function(type, str) {
	  if (!exports.useColors) {
	    return String(str);
	  }
	  return '\u001b[' + exports.colors[type] + 'm' + str + '\u001b[0m';
	};
	
	/**
	 * Expose term window size, with some defaults for when stderr is not a tty.
	 */
	
	exports.window = {
	  width: 75
	};
	
	if (isatty) {
	  exports.window.width = process.stdout.getWindowSize
	      ? process.stdout.getWindowSize(1)[0]
	      : tty.getWindowSize()[1];
	}
	
	/**
	 * Expose some basic cursor interactions that are common among reporters.
	 */
	
	exports.cursor = {
	  hide: function() {
	    isatty && process.stdout.write('\u001b[?25l');
	  },
	
	  show: function() {
	    isatty && process.stdout.write('\u001b[?25h');
	  },
	
	  deleteLine: function() {
	    isatty && process.stdout.write('\u001b[2K');
	  },
	
	  beginningOfLine: function() {
	    isatty && process.stdout.write('\u001b[0G');
	  },
	
	  CR: function() {
	    if (isatty) {
	      exports.cursor.deleteLine();
	      exports.cursor.beginningOfLine();
	    } else {
	      process.stdout.write('\r');
	    }
	  }
	};
	
	/**
	 * Outut the given `failures` as a list.
	 *
	 * @param {Array} failures
	 * @api public
	 */
	
	exports.list = function(failures) {
	  console.log();
	  failures.forEach(function(test, i) {
	    // format
	    var fmt = color('error title', '  %s) %s:\n')
	      + color('error message', '     %s')
	      + color('error stack', '\n%s\n');
	
	    // msg
	    var msg;
	    var err = test.err;
	    var message;
	    if (err.message) {
	      message = err.message;
	    } else if (typeof err.inspect === 'function') {
	      message = err.inspect() + '';
	    } else {
	      message = '';
	    }
	    var stack = err.stack || message;
	    var index = stack.indexOf(message);
	    var actual = err.actual;
	    var expected = err.expected;
	    var escape = true;
	
	    if (index === -1) {
	      msg = message;
	    } else {
	      index += message.length;
	      msg = stack.slice(0, index);
	      // remove msg from stack
	      stack = stack.slice(index + 1);
	    }
	
	    // uncaught
	    if (err.uncaught) {
	      msg = 'Uncaught ' + msg;
	    }
	    // explicitly show diff
	    if (err.showDiff !== false && sameType(actual, expected) && expected !== undefined) {
	      escape = false;
	      if (!(utils.isString(actual) && utils.isString(expected))) {
	        err.actual = actual = utils.stringify(actual);
	        err.expected = expected = utils.stringify(expected);
	      }
	
	      fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
	      var match = message.match(/^([^:]+): expected/);
	      msg = '\n      ' + color('error message', match ? match[1] : msg);
	
	      if (exports.inlineDiffs) {
	        msg += inlineDiff(err, escape);
	      } else {
	        msg += unifiedDiff(err, escape);
	      }
	    }
	
	    // indent stack trace
	    stack = stack.replace(/^/gm, '  ');
	
	    console.log(fmt, (i + 1), test.fullTitle(), msg, stack);
	  });
	};
	
	/**
	 * Initialize a new `Base` reporter.
	 *
	 * All other reporters generally
	 * inherit from this reporter, providing
	 * stats such as test duration, number
	 * of tests passed / failed etc.
	 *
	 * @param {Runner} runner
	 * @api public
	 */
	
	function Base(runner) {
	  var stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 };
	  var failures = this.failures = [];
	
	  if (!runner) {
	    return;
	  }
	  this.runner = runner;
	
	  runner.stats = stats;
	
	  runner.on('start', function() {
	    stats.start = new Date();
	  });
	
	  runner.on('suite', function(suite) {
	    stats.suites = stats.suites || 0;
	    suite.root || stats.suites++;
	  });
	
	  runner.on('test end', function() {
	    stats.tests = stats.tests || 0;
	    stats.tests++;
	  });
	
	  runner.on('pass', function(test) {
	    stats.passes = stats.passes || 0;
	
	    if (test.duration > test.slow()) {
	      test.speed = 'slow';
	    } else if (test.duration > test.slow() / 2) {
	      test.speed = 'medium';
	    } else {
	      test.speed = 'fast';
	    }
	
	    stats.passes++;
	  });
	
	  runner.on('fail', function(test, err) {
	    stats.failures = stats.failures || 0;
	    stats.failures++;
	    test.err = err;
	    failures.push(test);
	  });
	
	  runner.on('end', function() {
	    stats.end = new Date();
	    stats.duration = new Date() - stats.start;
	  });
	
	  runner.on('pending', function() {
	    stats.pending++;
	  });
	}
	
	/**
	 * Output common epilogue used by many of
	 * the bundled reporters.
	 *
	 * @api public
	 */
	Base.prototype.epilogue = function() {
	  var stats = this.stats;
	  var fmt;
	
	  console.log();
	
	  // passes
	  fmt = color('bright pass', ' ')
	    + color('green', ' %d passing')
	    + color('light', ' (%s)');
	
	  console.log(fmt,
	    stats.passes || 0,
	    ms(stats.duration));
	
	  // pending
	  if (stats.pending) {
	    fmt = color('pending', ' ')
	      + color('pending', ' %d pending');
	
	    console.log(fmt, stats.pending);
	  }
	
	  // failures
	  if (stats.failures) {
	    fmt = color('fail', '  %d failing');
	
	    console.log(fmt, stats.failures);
	
	    Base.list(this.failures);
	    console.log();
	  }
	
	  console.log();
	};
	
	/**
	 * Pad the given `str` to `len`.
	 *
	 * @api private
	 * @param {string} str
	 * @param {string} len
	 * @return {string}
	 */
	function pad(str, len) {
	  str = String(str);
	  return Array(len - str.length + 1).join(' ') + str;
	}
	
	/**
	 * Returns an inline diff between 2 strings with coloured ANSI output
	 *
	 * @api private
	 * @param {Error} err with actual/expected
	 * @param {boolean} escape
	 * @return {string} Diff
	 */
	function inlineDiff(err, escape) {
	  var msg = errorDiff(err, 'WordsWithSpace', escape);
	
	  // linenos
	  var lines = msg.split('\n');
	  if (lines.length > 4) {
	    var width = String(lines.length).length;
	    msg = lines.map(function(str, i) {
	      return pad(++i, width) + ' |' + ' ' + str;
	    }).join('\n');
	  }
	
	  // legend
	  msg = '\n'
	    + color('diff removed', 'actual')
	    + ' '
	    + color('diff added', 'expected')
	    + '\n\n'
	    + msg
	    + '\n';
	
	  // indent
	  msg = msg.replace(/^/gm, '      ');
	  return msg;
	}
	
	/**
	 * Returns a unified diff between two strings.
	 *
	 * @api private
	 * @param {Error} err with actual/expected
	 * @param {boolean} escape
	 * @return {string} The diff.
	 */
	function unifiedDiff(err, escape) {
	  var indent = '      ';
	  function cleanUp(line) {
	    if (escape) {
	      line = escapeInvisibles(line);
	    }
	    if (line[0] === '+') {
	      return indent + colorLines('diff added', line);
	    }
	    if (line[0] === '-') {
	      return indent + colorLines('diff removed', line);
	    }
	    if (line.match(/\@\@/)) {
	      return null;
	    }
	    if (line.match(/\\ No newline/)) {
	      return null;
	    }
	    return indent + line;
	  }
	  function notBlank(line) {
	    return typeof line !== 'undefined' && line !== null;
	  }
	  var msg = diff.createPatch('string', err.actual, err.expected);
	  var lines = msg.split('\n').splice(4);
	  return '\n      '
	    + colorLines('diff added', '+ expected') + ' '
	    + colorLines('diff removed', '- actual')
	    + '\n\n'
	    + lines.map(cleanUp).filter(notBlank).join('\n');
	}
	
	/**
	 * Return a character diff for `err`.
	 *
	 * @api private
	 * @param {Error} err
	 * @param {string} type
	 * @param {boolean} escape
	 * @return {string}
	 */
	function errorDiff(err, type, escape) {
	  var actual = escape ? escapeInvisibles(err.actual) : err.actual;
	  var expected = escape ? escapeInvisibles(err.expected) : err.expected;
	  return diff['diff' + type](actual, expected).map(function(str) {
	    if (str.added) {
	      return colorLines('diff added', str.value);
	    }
	    if (str.removed) {
	      return colorLines('diff removed', str.value);
	    }
	    return str.value;
	  }).join('');
	}
	
	/**
	 * Returns a string with all invisible characters in plain text
	 *
	 * @api private
	 * @param {string} line
	 * @return {string}
	 */
	function escapeInvisibles(line) {
	  return line.replace(/\t/g, '<tab>')
	    .replace(/\r/g, '<CR>')
	    .replace(/\n/g, '<LF>\n');
	}
	
	/**
	 * Color lines for `str`, using the color `name`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {string} str
	 * @return {string}
	 */
	function colorLines(name, str) {
	  return str.split('\n').map(function(str) {
	    return color(name, str);
	  }).join('\n');
	}
	
	/**
	 * Object#toString reference.
	 */
	var objToString = Object.prototype.toString;
	
	/**
	 * Check that a / b have the same type.
	 *
	 * @api private
	 * @param {Object} a
	 * @param {Object} b
	 * @return {boolean}
	 */
	function sameType(a, b) {
	  return objToString.call(a) === objToString.call(b);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53), (function() { return this; }())))

/***/ },
/* 60 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {exports.isatty = function isatty() {
	  return true;
	};
	
	exports.getWindowSize = function getWindowSize() {
	  if ('innerHeight' in global) {
	    return [global.innerHeight, global.innerWidth];
	  }
	  // In a Web Worker, the DOM Window is not available.
	  return [640, 480];
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* See LICENSE file for terms of use */
	
	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	(function(global, undefined) {
	  var objectPrototypeToString = Object.prototype.toString;
	
	  /*istanbul ignore next*/
	  function map(arr, mapper, that) {
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, mapper, that);
	    }
	
	    var other = new Array(arr.length);
	
	    for (var i = 0, n = arr.length; i < n; i++) {
	      other[i] = mapper.call(that, arr[i], i, arr);
	    }
	    return other;
	  }
	  function clonePath(path) {
	    return { newPos: path.newPos, components: path.components.slice(0) };
	  }
	  function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  }
	  function escapeHTML(s) {
	    var n = s;
	    n = n.replace(/&/g, '&amp;');
	    n = n.replace(/</g, '&lt;');
	    n = n.replace(/>/g, '&gt;');
	    n = n.replace(/"/g, '&quot;');
	
	    return n;
	  }
	
	  // This function handles the presence of circular references by bailing out when encountering an
	  // object that is already on the "stack" of items being processed.
	  function canonicalize(obj, stack, replacementStack) {
	    stack = stack || [];
	    replacementStack = replacementStack || [];
	
	    var i;
	
	    for (i = 0; i < stack.length; i += 1) {
	      if (stack[i] === obj) {
	        return replacementStack[i];
	      }
	    }
	
	    var canonicalizedObj;
	
	    if ('[object Array]' === objectPrototypeToString.call(obj)) {
	      stack.push(obj);
	      canonicalizedObj = new Array(obj.length);
	      replacementStack.push(canonicalizedObj);
	      for (i = 0; i < obj.length; i += 1) {
	        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else if (typeof obj === 'object' && obj !== null) {
	      stack.push(obj);
	      canonicalizedObj = {};
	      replacementStack.push(canonicalizedObj);
	      var sortedKeys = [],
	          key;
	      for (key in obj) {
	        sortedKeys.push(key);
	      }
	      sortedKeys.sort();
	      for (i = 0; i < sortedKeys.length; i += 1) {
	        key = sortedKeys[i];
	        canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else {
	      canonicalizedObj = obj;
	    }
	    return canonicalizedObj;
	  }
	
	  function buildValues(components, newString, oldString, useLongestToken) {
	    var componentPos = 0,
	        componentLen = components.length,
	        newPos = 0,
	        oldPos = 0;
	
	    for (; componentPos < componentLen; componentPos++) {
	      var component = components[componentPos];
	      if (!component.removed) {
	        if (!component.added && useLongestToken) {
	          var value = newString.slice(newPos, newPos + component.count);
	          value = map(value, function(value, i) {
	            var oldValue = oldString[oldPos + i];
	            return oldValue.length > value.length ? oldValue : value;
	          });
	
	          component.value = value.join('');
	        } else {
	          component.value = newString.slice(newPos, newPos + component.count).join('');
	        }
	        newPos += component.count;
	
	        // Common case
	        if (!component.added) {
	          oldPos += component.count;
	        }
	      } else {
	        component.value = oldString.slice(oldPos, oldPos + component.count).join('');
	        oldPos += component.count;
	
	        // Reverse add and remove so removes are output first to match common convention
	        // The diffing algorithm is tied to add then remove output and this is the simplest
	        // route to get the desired output with minimal overhead.
	        if (componentPos && components[componentPos - 1].added) {
	          var tmp = components[componentPos - 1];
	          components[componentPos - 1] = components[componentPos];
	          components[componentPos] = tmp;
	        }
	      }
	    }
	
	    return components;
	  }
	
	  function Diff(ignoreWhitespace) {
	    this.ignoreWhitespace = ignoreWhitespace;
	  }
	  Diff.prototype = {
	    diff: function(oldString, newString, callback) {
	      var self = this;
	
	      function done(value) {
	        if (callback) {
	          setTimeout(function() { callback(undefined, value); }, 0);
	          return true;
	        } else {
	          return value;
	        }
	      }
	
	      // Handle the identity case (this is due to unrolling editLength == 0
	      if (newString === oldString) {
	        return done([{ value: newString }]);
	      }
	      if (!newString) {
	        return done([{ value: oldString, removed: true }]);
	      }
	      if (!oldString) {
	        return done([{ value: newString, added: true }]);
	      }
	
	      newString = this.tokenize(newString);
	      oldString = this.tokenize(oldString);
	
	      var newLen = newString.length, oldLen = oldString.length;
	      var editLength = 1;
	      var maxEditLength = newLen + oldLen;
	      var bestPath = [{ newPos: -1, components: [] }];
	
	      // Seed editLength = 0, i.e. the content starts with the same values
	      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	        // Identity per the equality and tokenizer
	        return done([{value: newString.join('')}]);
	      }
	
	      // Main worker method. checks all permutations of a given edit length for acceptance.
	      function execEditLength() {
	        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	          var basePath;
	          var addPath = bestPath[diagonalPath - 1],
	              removePath = bestPath[diagonalPath + 1],
	              oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	          if (addPath) {
	            // No one else is going to attempt to use this value, clear it
	            bestPath[diagonalPath - 1] = undefined;
	          }
	
	          var canAdd = addPath && addPath.newPos + 1 < newLen,
	              canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
	          if (!canAdd && !canRemove) {
	            // If this path is a terminal then prune
	            bestPath[diagonalPath] = undefined;
	            continue;
	          }
	
	          // Select the diagonal that we want to branch from. We select the prior
	          // path whose position in the new string is the farthest from the origin
	          // and does not pass the bounds of the diff graph
	          if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
	            basePath = clonePath(removePath);
	            self.pushComponent(basePath.components, undefined, true);
	          } else {
	            basePath = addPath;   // No need to clone, we've pulled it from the list
	            basePath.newPos++;
	            self.pushComponent(basePath.components, true, undefined);
	          }
	
	          oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);
	
	          // If we have hit the end of both strings, then we are done
	          if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	            return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));
	          } else {
	            // Otherwise track this path as a potential candidate and continue.
	            bestPath[diagonalPath] = basePath;
	          }
	        }
	
	        editLength++;
	      }
	
	      // Performs the length of edit iteration. Is a bit fugly as this has to support the
	      // sync and async mode which is never fun. Loops over execEditLength until a value
	      // is produced.
	      if (callback) {
	        (function exec() {
	          setTimeout(function() {
	            // This should not happen, but we want to be safe.
	            /*istanbul ignore next */
	            if (editLength > maxEditLength) {
	              return callback();
	            }
	
	            if (!execEditLength()) {
	              exec();
	            }
	          }, 0);
	        }());
	      } else {
	        while (editLength <= maxEditLength) {
	          var ret = execEditLength();
	          if (ret) {
	            return ret;
	          }
	        }
	      }
	    },
	
	    pushComponent: function(components, added, removed) {
	      var last = components[components.length - 1];
	      if (last && last.added === added && last.removed === removed) {
	        // We need to clone here as the component clone operation is just
	        // as shallow array clone
	        components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };
	      } else {
	        components.push({count: 1, added: added, removed: removed });
	      }
	    },
	    extractCommon: function(basePath, newString, oldString, diagonalPath) {
	      var newLen = newString.length,
	          oldLen = oldString.length,
	          newPos = basePath.newPos,
	          oldPos = newPos - diagonalPath,
	
	          commonCount = 0;
	      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	        newPos++;
	        oldPos++;
	        commonCount++;
	      }
	
	      if (commonCount) {
	        basePath.components.push({count: commonCount});
	      }
	
	      basePath.newPos = newPos;
	      return oldPos;
	    },
	
	    equals: function(left, right) {
	      var reWhitespace = /\S/;
	      return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));
	    },
	    tokenize: function(value) {
	      return value.split('');
	    }
	  };
	
	  var CharDiff = new Diff();
	
	  var WordDiff = new Diff(true);
	  var WordWithSpaceDiff = new Diff();
	  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\s+|\b)/));
	  };
	
	  var CssDiff = new Diff(true);
	  CssDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/([{}:;,]|\s+)/));
	  };
	
	  var LineDiff = new Diff();
	
	  var TrimmedLineDiff = new Diff();
	  TrimmedLineDiff.ignoreTrim = true;
	
	  LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {
	    var retLines = [],
	        lines = value.split(/^/m);
	    for (var i = 0; i < lines.length; i++) {
	      var line = lines[i],
	          lastLine = lines[i - 1],
	          lastLineLastChar = lastLine && lastLine[lastLine.length - 1];
	
	      // Merge lines that may contain windows new lines
	      if (line === '\n' && lastLineLastChar === '\r') {
	          retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\r\n';
	      } else {
	        if (this.ignoreTrim) {
	          line = line.trim();
	          // add a newline unless this is the last line.
	          if (i < lines.length - 1) {
	            line += '\n';
	          }
	        }
	        retLines.push(line);
	      }
	    }
	
	    return retLines;
	  };
	
	  var PatchDiff = new Diff();
	  PatchDiff.tokenize = function(value) {
	    var ret = [],
	        linesAndNewlines = value.split(/(\n|\r\n)/);
	
	    // Ignore the final empty token that occurs if the string ends with a new line
	    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	      linesAndNewlines.pop();
	    }
	
	    // Merge the content and line separators into single tokens
	    for (var i = 0; i < linesAndNewlines.length; i++) {
	      var line = linesAndNewlines[i];
	
	      if (i % 2) {
	        ret[ret.length - 1] += line;
	      } else {
	        ret.push(line);
	      }
	    }
	    return ret;
	  };
	
	  var SentenceDiff = new Diff();
	  SentenceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\S.+?[.!?])(?=\s+|$)/));
	  };
	
	  var JsonDiff = new Diff();
	  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	  JsonDiff.useLongestToken = true;
	  JsonDiff.tokenize = LineDiff.tokenize;
	  JsonDiff.equals = function(left, right) {
	    return LineDiff.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
	  };
	
	  var JsDiff = {
	    Diff: Diff,
	
	    diffChars: function(oldStr, newStr, callback) { return CharDiff.diff(oldStr, newStr, callback); },
	    diffWords: function(oldStr, newStr, callback) { return WordDiff.diff(oldStr, newStr, callback); },
	    diffWordsWithSpace: function(oldStr, newStr, callback) { return WordWithSpaceDiff.diff(oldStr, newStr, callback); },
	    diffLines: function(oldStr, newStr, callback) { return LineDiff.diff(oldStr, newStr, callback); },
	    diffTrimmedLines: function(oldStr, newStr, callback) { return TrimmedLineDiff.diff(oldStr, newStr, callback); },
	
	    diffSentences: function(oldStr, newStr, callback) { return SentenceDiff.diff(oldStr, newStr, callback); },
	
	    diffCss: function(oldStr, newStr, callback) { return CssDiff.diff(oldStr, newStr, callback); },
	    diffJson: function(oldObj, newObj, callback) {
	      return JsonDiff.diff(
	        typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '),
	        typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '),
	        callback
	      );
	    },
	
	    createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {
	      var ret = [];
	
	      if (oldFileName == newFileName) {
	        ret.push('Index: ' + oldFileName);
	      }
	      ret.push('===================================================================');
	      ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
	      ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));
	
	      var diff = PatchDiff.diff(oldStr, newStr);
	      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier
	
	      // Formats a given set of lines for printing as context lines in a patch
	      function contextLines(lines) {
	        return map(lines, function(entry) { return ' ' + entry; });
	      }
	
	      // Outputs the no newline at end of file warning if needed
	      function eofNL(curRange, i, current) {
	        var last = diff[diff.length - 2],
	            isLast = i === diff.length - 2,
	            isLastOfType = i === diff.length - 3 && current.added !== last.added;
	
	        // Figure out if this is the last line for the given file and missing NL
	        if (!(/\n$/.test(current.value)) && (isLast || isLastOfType)) {
	          curRange.push('\\ No newline at end of file');
	        }
	      }
	
	      var oldRangeStart = 0, newRangeStart = 0, curRange = [],
	          oldLine = 1, newLine = 1;
	      for (var i = 0; i < diff.length; i++) {
	        var current = diff[i],
	            lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	        current.lines = lines;
	
	        if (current.added || current.removed) {
	          // If we have previous context, start with that
	          if (!oldRangeStart) {
	            var prev = diff[i - 1];
	            oldRangeStart = oldLine;
	            newRangeStart = newLine;
	
	            if (prev) {
	              curRange = contextLines(prev.lines.slice(-4));
	              oldRangeStart -= curRange.length;
	              newRangeStart -= curRange.length;
	            }
	          }
	
	          // Output our changes
	          curRange.push.apply(curRange, map(lines, function(entry) {
	            return (current.added ? '+' : '-') + entry;
	          }));
	          eofNL(curRange, i, current);
	
	          // Track the updated file position
	          if (current.added) {
	            newLine += lines.length;
	          } else {
	            oldLine += lines.length;
	          }
	        } else {
	          // Identical context lines. Track line changes
	          if (oldRangeStart) {
	            // Close out any changes that have been output (or join overlapping)
	            if (lines.length <= 8 && i < diff.length - 2) {
	              // Overlapping
	              curRange.push.apply(curRange, contextLines(lines));
	            } else {
	              // end the range and output
	              var contextSize = Math.min(lines.length, 4);
	              ret.push(
	                  '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize)
	                  + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize)
	                  + ' @@');
	              ret.push.apply(ret, curRange);
	              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
	              if (lines.length <= 4) {
	                eofNL(ret, i, current);
	              }
	
	              oldRangeStart = 0;
	              newRangeStart = 0;
	              curRange = [];
	            }
	          }
	          oldLine += lines.length;
	          newLine += lines.length;
	        }
	      }
	
	      return ret.join('\n') + '\n';
	    },
	
	    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
	      return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);
	    },
	
	    applyPatch: function(oldStr, uniDiff) {
	      var diffstr = uniDiff.split('\n'),
	          hunks = [],
	          i = 0,
	          remEOFNL = false,
	          addEOFNL = false;
	
	      // Skip to the first change hunk
	      while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {
	        i++;
	      }
	
	      // Parse the unified diff
	      for (; i < diffstr.length; i++) {
	        if (diffstr[i][0] === '@') {
	          var chnukHeader = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
	          hunks.unshift({
	            start: chnukHeader[3],
	            oldlength: +chnukHeader[2],
	            removed: [],
	            newlength: chnukHeader[4],
	            added: []
	          });
	        } else if (diffstr[i][0] === '+') {
	          hunks[0].added.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '-') {
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === ' ') {
	          hunks[0].added.push(diffstr[i].substr(1));
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '\\') {
	          if (diffstr[i - 1][0] === '+') {
	            remEOFNL = true;
	          } else if (diffstr[i - 1][0] === '-') {
	            addEOFNL = true;
	          }
	        }
	      }
	
	      // Apply the diff to the input
	      var lines = oldStr.split('\n');
	      for (i = hunks.length - 1; i >= 0; i--) {
	        var hunk = hunks[i];
	        // Sanity check the input string. Bail if we don't match.
	        for (var j = 0; j < hunk.oldlength; j++) {
	          if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {
	            return false;
	          }
	        }
	        Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));
	      }
	
	      // Handle EOFNL insertion/removal
	      if (remEOFNL) {
	        while (!lines[lines.length - 1]) {
	          lines.pop();
	        }
	      } else if (addEOFNL) {
	        lines.push('');
	      }
	      return lines.join('\n');
	    },
	
	    convertChangesToXML: function(changes) {
	      var ret = [];
	      for (var i = 0; i < changes.length; i++) {
	        var change = changes[i];
	        if (change.added) {
	          ret.push('<ins>');
	        } else if (change.removed) {
	          ret.push('<del>');
	        }
	
	        ret.push(escapeHTML(change.value));
	
	        if (change.added) {
	          ret.push('</ins>');
	        } else if (change.removed) {
	          ret.push('</del>');
	        }
	      }
	      return ret.join('');
	    },
	
	    // See: http://code.google.com/p/google-diff-match-patch/wiki/API
	    convertChangesToDMP: function(changes) {
	      var ret = [],
	          change,
	          operation;
	      for (var i = 0; i < changes.length; i++) {
	        change = changes[i];
	        if (change.added) {
	          operation = 1;
	        } else if (change.removed) {
	          operation = -1;
	        } else {
	          operation = 0;
	        }
	
	        ret.push([operation, change.value]);
	      }
	      return ret;
	    },
	
	    canonicalize: canonicalize
	  };
	
	  /*istanbul ignore next */
	  /*global module */
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = JsDiff;
	  } else if (true) {
	    /*global define */
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return JsDiff; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof global.JsDiff === 'undefined') {
	    global.JsDiff = JsDiff;
	  }
	}(this));


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @api public
	 * @param {string|number} val
	 * @param {Object} options
	 * @return {string|number}
	 */
	module.exports = function(val, options) {
	  options = options || {};
	  if (typeof val === 'string') {
	    return parse(val);
	  }
	  // https://github.com/mochajs/mocha/pull/1035
	  return options['long'] ? longFormat(val) : shortFormat(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @api private
	 * @param {string} str
	 * @return {number}
	 */
	function parse(str) {
	  var match = (/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i).exec(str);
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 's':
	      return n * s;
	    case 'ms':
	      return n;
	    default:
	      // No default case
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {string}
	 */
	function shortFormat(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {string}
	 */
	function longFormat(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 *
	 * @api private
	 * @param {number} ms
	 * @param {number} n
	 * @param {string} name
	 */
	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, process) {/* eslint-env browser */
	
	/**
	 * Module dependencies.
	 */
	
	var basename = __webpack_require__(57).basename;
	var debug = __webpack_require__(64)('mocha:watch');
	var exists = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).existsSync || __webpack_require__(57).existsSync;
	var glob = __webpack_require__(65);
	var join = __webpack_require__(57).join;
	var readdirSync = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readdirSync;
	var statSync = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).statSync;
	var watchFile = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).watchFile;
	
	/**
	 * Ignored directories.
	 */
	
	var ignore = ['node_modules', '.git'];
	
	exports.inherits = __webpack_require__(68).inherits;
	
	/**
	 * Escape special characters in the given string of html.
	 *
	 * @api private
	 * @param  {string} html
	 * @return {string}
	 */
	exports.escape = function(html) {
	  return String(html)
	    .replace(/&/g, '&amp;')
	    .replace(/"/g, '&quot;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;');
	};
	
	/**
	 * Array#forEach (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} scope
	 */
	exports.forEach = function(arr, fn, scope) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    fn.call(scope, arr[i], i);
	  }
	};
	
	/**
	 * Test if the given obj is type of string.
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {boolean}
	 */
	exports.isString = function(obj) {
	  return typeof obj === 'string';
	};
	
	/**
	 * Array#map (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} scope
	 * @return {Array}
	 */
	exports.map = function(arr, fn, scope) {
	  var result = [];
	  for (var i = 0, l = arr.length; i < l; i++) {
	    result.push(fn.call(scope, arr[i], i, arr));
	  }
	  return result;
	};
	
	/**
	 * Array#indexOf (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Object} obj to find index of
	 * @param {number} start
	 * @return {number}
	 */
	exports.indexOf = function(arr, obj, start) {
	  for (var i = start || 0, l = arr.length; i < l; i++) {
	    if (arr[i] === obj) {
	      return i;
	    }
	  }
	  return -1;
	};
	
	/**
	 * Array#reduce (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} val Initial value.
	 * @return {*}
	 */
	exports.reduce = function(arr, fn, val) {
	  var rval = val;
	
	  for (var i = 0, l = arr.length; i < l; i++) {
	    rval = fn(rval, arr[i], i, arr);
	  }
	
	  return rval;
	};
	
	/**
	 * Array#filter (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @return {Array}
	 */
	exports.filter = function(arr, fn) {
	  var ret = [];
	
	  for (var i = 0, l = arr.length; i < l; i++) {
	    var val = arr[i];
	    if (fn(val, i, arr)) {
	      ret.push(val);
	    }
	  }
	
	  return ret;
	};
	
	/**
	 * Object.keys (<=IE8)
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {Array} keys
	 */
	exports.keys = typeof Object.keys === 'function' ? Object.keys : function(obj) {
	  var keys = [];
	  var has = Object.prototype.hasOwnProperty; // for `window` on <=IE8
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      keys.push(key);
	    }
	  }
	
	  return keys;
	};
	
	/**
	 * Watch the given `files` for changes
	 * and invoke `fn(file)` on modification.
	 *
	 * @api private
	 * @param {Array} files
	 * @param {Function} fn
	 */
	exports.watch = function(files, fn) {
	  var options = { interval: 100 };
	  files.forEach(function(file) {
	    debug('file %s', file);
	    watchFile(file, options, function(curr, prev) {
	      if (prev.mtime < curr.mtime) {
	        fn(file);
	      }
	    });
	  });
	};
	
	/**
	 * Array.isArray (<=IE8)
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	};
	
	exports.isArray = isArray;
	
	/**
	 * Buffer.prototype.toJSON polyfill.
	 *
	 * @type {Function}
	 */
	if (typeof Buffer !== 'undefined' && Buffer.prototype) {
	  Buffer.prototype.toJSON = Buffer.prototype.toJSON || function() {
	    return Array.prototype.slice.call(this, 0);
	  };
	}
	
	/**
	 * Ignored files.
	 *
	 * @api private
	 * @param {string} path
	 * @return {boolean}
	 */
	function ignored(path) {
	  return !~ignore.indexOf(path);
	}
	
	/**
	 * Lookup files in the given `dir`.
	 *
	 * @api private
	 * @param {string} dir
	 * @param {string[]} [ext=['.js']]
	 * @param {Array} [ret=[]]
	 * @return {Array}
	 */
	exports.files = function(dir, ext, ret) {
	  ret = ret || [];
	  ext = ext || ['js'];
	
	  var re = new RegExp('\\.(' + ext.join('|') + ')$');
	
	  readdirSync(dir)
	    .filter(ignored)
	    .forEach(function(path) {
	      path = join(dir, path);
	      if (statSync(path).isDirectory()) {
	        exports.files(path, ext, ret);
	      } else if (path.match(re)) {
	        ret.push(path);
	      }
	    });
	
	  return ret;
	};
	
	/**
	 * Compute a slug from the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	exports.slug = function(str) {
	  return str
	    .toLowerCase()
	    .replace(/ +/g, '-')
	    .replace(/[^-\w]/g, '');
	};
	
	/**
	 * Strip the function definition from `str`, and re-indent for pre whitespace.
	 *
	 * @param {string} str
	 * @return {string}
	 */
	exports.clean = function(str) {
	  str = str
	    .replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '')
	    .replace(/^function *\(.*\)\s*\{|\(.*\) *=> *\{?/, '')
	    .replace(/\s+\}$/, '');
	
	  var spaces = str.match(/^\n?( *)/)[1].length;
	  var tabs = str.match(/^\n?(\t*)/)[1].length;
	  var re = new RegExp('^\n?' + (tabs ? '\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');
	
	  str = str.replace(re, '');
	
	  return exports.trim(str);
	};
	
	/**
	 * Trim the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	exports.trim = function(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};
	
	/**
	 * Parse the given `qs`.
	 *
	 * @api private
	 * @param {string} qs
	 * @return {Object}
	 */
	exports.parseQuery = function(qs) {
	  return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {
	    var i = pair.indexOf('=');
	    var key = pair.slice(0, i);
	    var val = pair.slice(++i);
	
	    obj[key] = decodeURIComponent(val);
	    return obj;
	  }, {});
	};
	
	/**
	 * Highlight the given string of `js`.
	 *
	 * @api private
	 * @param {string} js
	 * @return {string}
	 */
	function highlight(js) {
	  return js
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
	    .replace(/('.*?')/gm, '<span class="string">$1</span>')
	    .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
	    .replace(/(\d+)/gm, '<span class="number">$1</span>')
	    .replace(/\bnew[ \t]+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
	    .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
	}
	
	/**
	 * Highlight the contents of tag `name`.
	 *
	 * @api private
	 * @param {string} name
	 */
	exports.highlightTags = function(name) {
	  var code = document.getElementById('mocha').getElementsByTagName(name);
	  for (var i = 0, len = code.length; i < len; ++i) {
	    code[i].innerHTML = highlight(code[i].innerHTML);
	  }
	};
	
	/**
	 * If a value could have properties, and has none, this function is called,
	 * which returns a string representation of the empty value.
	 *
	 * Functions w/ no properties return `'[Function]'`
	 * Arrays w/ length === 0 return `'[]'`
	 * Objects w/ no properties return `'{}'`
	 * All else: return result of `value.toString()`
	 *
	 * @api private
	 * @param {*} value The value to inspect.
	 * @param {string} [type] The type of the value, if known.
	 * @returns {string}
	 */
	function emptyRepresentation(value, type) {
	  type = type || exports.type(value);
	
	  switch (type) {
	    case 'function':
	      return '[Function]';
	    case 'object':
	      return '{}';
	    case 'array':
	      return '[]';
	    default:
	      return value.toString();
	  }
	}
	
	/**
	 * Takes some variable and asks `Object.prototype.toString()` what it thinks it
	 * is.
	 *
	 * @api private
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	 * @param {*} value The value to test.
	 * @returns {string}
	 * @example
	 * type({}) // 'object'
	 * type([]) // 'array'
	 * type(1) // 'number'
	 * type(false) // 'boolean'
	 * type(Infinity) // 'number'
	 * type(null) // 'null'
	 * type(new Date()) // 'date'
	 * type(/foo/) // 'regexp'
	 * type('type') // 'string'
	 * type(global) // 'global'
	 */
	exports.type = function type(value) {
	  if (value === undefined) {
	    return 'undefined';
	  } else if (value === null) {
	    return 'null';
	  } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
	    return 'buffer';
	  }
	  return Object.prototype.toString.call(value)
	    .replace(/^\[.+\s(.+?)\]$/, '$1')
	    .toLowerCase();
	};
	
	/**
	 * Stringify `value`. Different behavior depending on type of value:
	 *
	 * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.
	 * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.
	 * - If `value` is an *empty* object, function, or array, return result of function
	 *   {@link emptyRepresentation}.
	 * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of
	 *   JSON.stringify().
	 *
	 * @api private
	 * @see exports.type
	 * @param {*} value
	 * @return {string}
	 */
	exports.stringify = function(value) {
	  var type = exports.type(value);
	
	  if (!~exports.indexOf(['object', 'array', 'function'], type)) {
	    if (type !== 'buffer') {
	      return jsonStringify(value);
	    }
	    var json = value.toJSON();
	    // Based on the toJSON result
	    return jsonStringify(json.data && json.type ? json.data : json, 2)
	      .replace(/,(\n|$)/g, '$1');
	  }
	
	  for (var prop in value) {
	    if (Object.prototype.hasOwnProperty.call(value, prop)) {
	      return jsonStringify(exports.canonicalize(value), 2).replace(/,(\n|$)/g, '$1');
	    }
	  }
	
	  return emptyRepresentation(value, type);
	};
	
	/**
	 * like JSON.stringify but more sense.
	 *
	 * @api private
	 * @param {Object}  object
	 * @param {number=} spaces
	 * @param {number=} depth
	 * @returns {*}
	 */
	function jsonStringify(object, spaces, depth) {
	  if (typeof spaces === 'undefined') {
	    // primitive types
	    return _stringify(object);
	  }
	
	  depth = depth || 1;
	  var space = spaces * depth;
	  var str = isArray(object) ? '[' : '{';
	  var end = isArray(object) ? ']' : '}';
	  var length = object.length || exports.keys(object).length;
	  // `.repeat()` polyfill
	  function repeat(s, n) {
	    return new Array(n).join(s);
	  }
	
	  function _stringify(val) {
	    switch (exports.type(val)) {
	      case 'null':
	      case 'undefined':
	        val = '[' + val + ']';
	        break;
	      case 'array':
	      case 'object':
	        val = jsonStringify(val, spaces, depth + 1);
	        break;
	      case 'boolean':
	      case 'regexp':
	      case 'number':
	        val = val === 0 && (1 / val) === -Infinity // `-0`
	          ? '-0'
	          : val.toString();
	        break;
	      case 'date':
	        var sDate = isNaN(val.getTime())        // Invalid date
	          ? val.toString()
	          : val.toISOString();
	        val = '[Date: ' + sDate + ']';
	        break;
	      case 'buffer':
	        var json = val.toJSON();
	        // Based on the toJSON result
	        json = json.data && json.type ? json.data : json;
	        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';
	        break;
	      default:
	        val = (val === '[Function]' || val === '[Circular]')
	          ? val
	          : JSON.stringify(val); // string
	    }
	    return val;
	  }
	
	  for (var i in object) {
	    if (!object.hasOwnProperty(i)) {
	      continue; // not my business
	    }
	    --length;
	    str += '\n ' + repeat(' ', space)
	      + (isArray(object) ? '' : '"' + i + '": ') // key
	      + _stringify(object[i])                     // value
	      + (length ? ',' : '');                     // comma
	  }
	
	  return str
	    // [], {}
	    + (str.length !== 1 ? '\n' + repeat(' ', --space) + end : end);
	}
	
	/**
	 * Test if a value is a buffer.
	 *
	 * @api private
	 * @param {*} value The value to test.
	 * @return {boolean} True if `value` is a buffer, otherwise false
	 */
	exports.isBuffer = function(value) {
	  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
	};
	
	/**
	 * Return a new Thing that has the keys in sorted order. Recursive.
	 *
	 * If the Thing...
	 * - has already been seen, return string `'[Circular]'`
	 * - is `undefined`, return string `'[undefined]'`
	 * - is `null`, return value `null`
	 * - is some other primitive, return the value
	 * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method
	 * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.
	 * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`
	 *
	 * @api private
	 * @see {@link exports.stringify}
	 * @param {*} value Thing to inspect.  May or may not have properties.
	 * @param {Array} [stack=[]] Stack of seen values
	 * @return {(Object|Array|Function|string|undefined)}
	 */
	exports.canonicalize = function(value, stack) {
	  var canonicalizedObj;
	  /* eslint-disable no-unused-vars */
	  var prop;
	  /* eslint-enable no-unused-vars */
	  var type = exports.type(value);
	  function withStack(value, fn) {
	    stack.push(value);
	    fn();
	    stack.pop();
	  }
	
	  stack = stack || [];
	
	  if (exports.indexOf(stack, value) !== -1) {
	    return '[Circular]';
	  }
	
	  switch (type) {
	    case 'undefined':
	    case 'buffer':
	    case 'null':
	      canonicalizedObj = value;
	      break;
	    case 'array':
	      withStack(value, function() {
	        canonicalizedObj = exports.map(value, function(item) {
	          return exports.canonicalize(item, stack);
	        });
	      });
	      break;
	    case 'function':
	      /* eslint-disable guard-for-in */
	      for (prop in value) {
	        canonicalizedObj = {};
	        break;
	      }
	      /* eslint-enable guard-for-in */
	      if (!canonicalizedObj) {
	        canonicalizedObj = emptyRepresentation(value, type);
	        break;
	      }
	    /* falls through */
	    case 'object':
	      canonicalizedObj = canonicalizedObj || {};
	      withStack(value, function() {
	        exports.forEach(exports.keys(value).sort(), function(key) {
	          canonicalizedObj[key] = exports.canonicalize(value[key], stack);
	        });
	      });
	      break;
	    case 'date':
	    case 'number':
	    case 'regexp':
	    case 'boolean':
	      canonicalizedObj = value;
	      break;
	    default:
	      canonicalizedObj = value + '';
	  }
	
	  return canonicalizedObj;
	};
	
	/**
	 * Lookup file names at the given `path`.
	 *
	 * @api public
	 * @param {string} path Base path to start searching from.
	 * @param {string[]} extensions File extensions to look for.
	 * @param {boolean} recursive Whether or not to recurse into subdirectories.
	 * @return {string[]} An array of paths.
	 */
	exports.lookupFiles = function lookupFiles(path, extensions, recursive) {
	  var files = [];
	  var re = new RegExp('\\.(' + extensions.join('|') + ')$');
	
	  if (!exists(path)) {
	    if (exists(path + '.js')) {
	      path += '.js';
	    } else {
	      files = glob.sync(path);
	      if (!files.length) {
	        throw new Error("cannot resolve path (or pattern) '" + path + "'");
	      }
	      return files;
	    }
	  }
	
	  try {
	    var stat = statSync(path);
	    if (stat.isFile()) {
	      return path;
	    }
	  } catch (err) {
	    // ignore error
	    return;
	  }
	
	  readdirSync(path).forEach(function(file) {
	    file = join(path, file);
	    try {
	      var stat = statSync(file);
	      if (stat.isDirectory()) {
	        if (recursive) {
	          files = files.concat(lookupFiles(file, extensions, recursive));
	        }
	        return;
	      }
	    } catch (err) {
	      // ignore error
	      return;
	    }
	    if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {
	      return;
	    }
	    files.push(file);
	  });
	
	  return files;
	};
	
	/**
	 * Generate an undefined error with a message warning the user.
	 *
	 * @return {Error}
	 */
	
	exports.undefinedError = function() {
	  return new Error('Caught undefined error, did you throw without specifying what?');
	};
	
	/**
	 * Generate an undefined error if `err` is not defined.
	 *
	 * @param {Error} err
	 * @return {Error}
	 */
	
	exports.getError = function(err) {
	  return err || exports.undefinedError();
	};
	
	/**
	 * @summary
	 * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)
	 * @description
	 * When invoking this function you get a filter function that get the Error.stack as an input,
	 * and return a prettify output.
	 * (i.e: strip Mocha and internal node functions from stack trace).
	 * @returns {Function}
	 */
	exports.stackTraceFilter = function() {
	  // TODO: Replace with `process.browser`
	  var slash = '/';
	  var is = typeof document === 'undefined' ? { node: true } : { browser: true };
	  var cwd = is.node
	      ? process.cwd() + slash
	      : (typeof location === 'undefined' ? window.location : location).href.replace(/\/[^\/]*$/, '/');
	
	  function isMochaInternal(line) {
	    return (~line.indexOf('node_modules' + slash + 'mocha' + slash))
	      || (~line.indexOf('components' + slash + 'mochajs' + slash))
	      || (~line.indexOf('components' + slash + 'mocha' + slash))
	      || (~line.indexOf(slash + 'mocha.js'));
	  }
	
	  function isNodeInternal(line) {
	    return (~line.indexOf('(timers.js:'))
	      || (~line.indexOf('(events.js:'))
	      || (~line.indexOf('(node.js:'))
	      || (~line.indexOf('(module.js:'))
	      || (~line.indexOf('GeneratorFunctionPrototype.next (native)'))
	      || false;
	  }
	
	  return function(stack) {
	    stack = stack.split('\n');
	
	    stack = exports.reduce(stack, function(list, line) {
	      if (isMochaInternal(line)) {
	        return list;
	      }
	
	      if (is.node && isNodeInternal(line)) {
	        return list;
	      }
	
	      // Clean up cwd(absolute)
	      list.push(line.replace(cwd, ''));
	      return list;
	    }, []);
	
	    return stack.join('\n');
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).Buffer, __webpack_require__(53)))

/***/ },
/* 64 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	module.exports = function(type) {
	  return function() {};
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	// readdir(PREFIX) as ENTRIES
	//   If fails, END
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $])
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $])
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.
	
	
	
	module.exports = glob
	
	var fs = __webpack_require__(66)
	, minimatch = __webpack_require__(73)
	, Minimatch = minimatch.Minimatch
	, inherits = __webpack_require__(83)
	, EE = __webpack_require__(84).EventEmitter
	, path = __webpack_require__(57)
	, isDir = {}
	, assert = __webpack_require__(67).ok
	
	function glob (pattern, options, cb) {
	  if (typeof options === "function") cb = options, options = {}
	  if (!options) options = {}
	
	  if (typeof options === "number") {
	    deprecated()
	    return
	  }
	
	  var g = new Glob(pattern, options, cb)
	  return g.sync ? g.found : g
	}
	
	glob.fnmatch = deprecated
	
	function deprecated () {
	  throw new Error("glob's interface has changed. Please see the docs.")
	}
	
	glob.sync = globSync
	function globSync (pattern, options) {
	  if (typeof options === "number") {
	    deprecated()
	    return
	  }
	
	  options = options || {}
	  options.sync = true
	  return glob(pattern, options)
	}
	
	
	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (!(this instanceof Glob)) {
	    return new Glob(pattern, options, cb)
	  }
	
	  if (typeof cb === "function") {
	    this.on("error", cb)
	    this.on("end", function (matches) {
	      cb(null, matches)
	    })
	  }
	
	  options = options || {}
	
	  this.EOF = {}
	  this._emitQueue = []
	
	  this.maxDepth = options.maxDepth || 1000
	  this.maxLength = options.maxLength || Infinity
	  this.cache = options.cache || {}
	  this.statCache = options.statCache || {}
	
	  this.changedCwd = false
	  var cwd = process.cwd()
	  if (!options.hasOwnProperty("cwd")) this.cwd = cwd
	  else {
	    this.cwd = options.cwd
	    this.changedCwd = path.resolve(options.cwd) !== cwd
	  }
	
	  this.root = options.root || path.resolve(this.cwd, "/")
	  this.root = path.resolve(this.root)
	  if (process.platform === "win32")
	    this.root = this.root.replace(/\\/g, "/")
	
	  this.nomount = !!options.nomount
	
	  if (!pattern) {
	    throw new Error("must provide pattern")
	  }
	
	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }
	
	  this.strict = options.strict !== false
	  this.dot = !!options.dot
	  this.mark = !!options.mark
	  this.sync = !!options.sync
	  this.nounique = !!options.nounique
	  this.nonull = !!options.nonull
	  this.nosort = !!options.nosort
	  this.nocase = !!options.nocase
	  this.stat = !!options.stat
	
	  this.debug = !!options.debug || !!options.globDebug
	  if (this.debug)
	    this.log = console.error
	
	  this.silent = !!options.silent
	
	  var mm = this.minimatch = new Minimatch(pattern, options)
	  this.options = mm.options
	  pattern = this.pattern = mm.pattern
	
	  this.error = null
	  this.aborted = false
	
	  // list of all the patterns that ** has resolved do, so
	  // we can avoid visiting multiple times.
	  this._globstars = {}
	
	  EE.call(this)
	
	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length
	
	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)
	
	  this.minimatch.set.forEach(iterator.bind(this))
	  function iterator (pattern, i, set) {
	    this._process(pattern, 0, i, function (er) {
	      if (er) this.emit("error", er)
	      if (-- n <= 0) this._finish()
	    })
	  }
	}
	
	Glob.prototype.log = function () {}
	
	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)
	
	  var nou = this.nounique
	  , all = nou ? [] : {}
	
	  for (var i = 0, l = this.matches.length; i < l; i ++) {
	    var matches = this.matches[i]
	    this.log("matches[%d] =", i, matches)
	    // do like the shell, and spit out the literal glob
	    if (!matches) {
	      if (this.nonull) {
	        var literal = this.minimatch.globSet[i]
	        if (nou) all.push(literal)
	        else all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou) all.push.apply(all, m)
	      else m.forEach(function (m) {
	        all[m] = true
	      })
	    }
	  }
	
	  if (!nou) all = Object.keys(all)
	
	  if (!this.nosort) {
	    all = all.sort(this.nocase ? alphasorti : alphasort)
	  }
	
	  if (this.mark) {
	    // at *some* point we statted all of these
	    all = all.map(function (m) {
	      var sc = this.cache[m]
	      if (!sc)
	        return m
	      var isDir = (Array.isArray(sc) || sc === 2)
	      if (isDir && m.slice(-1) !== "/") {
	        return m + "/"
	      }
	      if (!isDir && m.slice(-1) === "/") {
	        return m.replace(/\/+$/, "")
	      }
	      return m
	    }, this)
	  }
	
	  this.log("emitting end", all)
	
	  this.EOF = this.found = all
	  this.emitMatch(this.EOF)
	}
	
	function alphasorti (a, b) {
	  a = a.toLowerCase()
	  b = b.toLowerCase()
	  return alphasort(a, b)
	}
	
	function alphasort (a, b) {
	  return a > b ? 1 : a < b ? -1 : 0
	}
	
	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit("abort")
	}
	
	Glob.prototype.pause = function () {
	  if (this.paused) return
	  if (this.sync)
	    this.emit("error", new Error("Can't pause/resume sync glob"))
	  this.paused = true
	  this.emit("pause")
	}
	
	Glob.prototype.resume = function () {
	  if (!this.paused) return
	  if (this.sync)
	    this.emit("error", new Error("Can't pause/resume sync glob"))
	  this.paused = false
	  this.emit("resume")
	  this._processEmitQueue()
	  //process.nextTick(this.emit.bind(this, "resume"))
	}
	
	Glob.prototype.emitMatch = function (m) {
	  if (!this.stat || this.statCache[m] || m === this.EOF) {
	    this._emitQueue.push(m)
	    this._processEmitQueue()
	  } else {
	    this._stat(m, function(exists, isDir) {
	      if (exists) {
	        this._emitQueue.push(m)
	        this._processEmitQueue()
	      }
	    })
	  }
	}
	
	Glob.prototype._processEmitQueue = function (m) {
	  while (!this._processingEmitQueue &&
	         !this.paused) {
	    this._processingEmitQueue = true
	    var m = this._emitQueue.shift()
	    if (!m) {
	      this._processingEmitQueue = false
	      break
	    }
	
	    this.log('emit!', m === this.EOF ? "end" : "match")
	
	    this.emit(m === this.EOF ? "end" : "match", m)
	    this._processingEmitQueue = false
	  }
	}
	
	Glob.prototype._process = function (pattern, depth, index, cb_) {
	  assert(this instanceof Glob)
	
	  var cb = function cb (er, res) {
	    assert(this instanceof Glob)
	    if (this.paused) {
	      if (!this._processQueue) {
	        this._processQueue = []
	        this.once("resume", function () {
	          var q = this._processQueue
	          this._processQueue = null
	          q.forEach(function (cb) { cb() })
	        })
	      }
	      this._processQueue.push(cb_.bind(this, er, res))
	    } else {
	      cb_.call(this, er, res)
	    }
	  }.bind(this)
	
	  if (this.aborted) return cb()
	
	  if (depth > this.maxDepth) return cb()
	
	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === "string") {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.
	
	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      prefix = pattern.join("/")
	      this._stat(prefix, function (exists, isDir) {
	        // either it's there, or it isn't.
	        // nothing more to do, either way.
	        if (exists) {
	          if (prefix && isAbsolute(prefix) && !this.nomount) {
	            if (prefix.charAt(0) === "/") {
	              prefix = path.join(this.root, prefix)
	            } else {
	              prefix = path.resolve(this.root, prefix)
	            }
	          }
	
	          if (process.platform === "win32")
	            prefix = prefix.replace(/\\/g, "/")
	
	          this.matches[index] = this.matches[index] || {}
	          this.matches[index][prefix] = true
	          this.emitMatch(prefix)
	        }
	        return cb()
	      })
	      return
	
	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break
	
	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's "absolute" like /foo/bar,
	      // or "relative" like "../baz"
	      prefix = pattern.slice(0, n)
	      prefix = prefix.join("/")
	      break
	  }
	
	  // get the list of entries.
	  var read
	  if (prefix === null) read = "."
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
	    if (!prefix || !isAbsolute(prefix)) {
	      prefix = path.join("/", prefix)
	    }
	    read = prefix = path.resolve(prefix)
	
	    // if (process.platform === "win32")
	    //   read = prefix = prefix.replace(/^[a-zA-Z]:|\\/g, "/")
	
	    this.log('absolute: ', prefix, this.root, pattern, read)
	  } else {
	    read = prefix
	  }
	
	  this.log('readdir(%j)', read, this.cwd, this.root)
	
	  return this._readdir(read, function (er, entries) {
	    if (er) {
	      // not a directory!
	      // this means that, whatever else comes after this, it can never match
	      return cb()
	    }
	
	    // globstar is special
	    if (pattern[n] === minimatch.GLOBSTAR) {
	      // test without the globstar, and with every child both below
	      // and replacing the globstar.
	      var s = [ pattern.slice(0, n).concat(pattern.slice(n + 1)) ]
	      entries.forEach(function (e) {
	        if (e.charAt(0) === "." && !this.dot) return
	        // instead of the globstar
	        s.push(pattern.slice(0, n).concat(e).concat(pattern.slice(n + 1)))
	        // below the globstar
	        s.push(pattern.slice(0, n).concat(e).concat(pattern.slice(n)))
	      }, this)
	
	      s = s.filter(function (pattern) {
	        var key = gsKey(pattern)
	        var seen = !this._globstars[key]
	        this._globstars[key] = true
	        return seen
	      }, this)
	
	      if (!s.length)
	        return cb()
	
	      // now asyncForEach over this
	      var l = s.length
	      , errState = null
	      s.forEach(function (gsPattern) {
	        this._process(gsPattern, depth + 1, index, function (er) {
	          if (errState) return
	          if (er) return cb(errState = er)
	          if (--l <= 0) return cb()
	        })
	      }, this)
	
	      return
	    }
	
	    // not a globstar
	    // It will only match dot entries if it starts with a dot, or if
	    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	    var pn = pattern[n]
	    var rawGlob = pattern[n]._glob
	    , dotOk = this.dot || rawGlob.charAt(0) === "."
	
	    entries = entries.filter(function (e) {
	      return (e.charAt(0) !== "." || dotOk) &&
	             e.match(pattern[n])
	    })
	
	    // If n === pattern.length - 1, then there's no need for the extra stat
	    // *unless* the user has specified "mark" or "stat" explicitly.
	    // We know that they exist, since the readdir returned them.
	    if (n === pattern.length - 1 &&
	        !this.mark &&
	        !this.stat) {
	      entries.forEach(function (e) {
	        if (prefix) {
	          if (prefix !== "/") e = prefix + "/" + e
	          else e = prefix + e
	        }
	        if (e.charAt(0) === "/" && !this.nomount) {
	          e = path.join(this.root, e)
	        }
	
	        if (process.platform === "win32")
	          e = e.replace(/\\/g, "/")
	
	        this.matches[index] = this.matches[index] || {}
	        this.matches[index][e] = true
	        this.emitMatch(e)
	      }, this)
	      return cb.call(this)
	    }
	
	
	    // now test all the remaining entries as stand-ins for that part
	    // of the pattern.
	    var l = entries.length
	    , errState = null
	    if (l === 0) return cb() // no matches possible
	    entries.forEach(function (e) {
	      var p = pattern.slice(0, n).concat(e).concat(pattern.slice(n + 1))
	      this._process(p, depth + 1, index, function (er) {
	        if (errState) return
	        if (er) return cb(errState = er)
	        if (--l === 0) return cb.call(this)
	      })
	    }, this)
	  })
	
	}
	
	function gsKey (pattern) {
	  return '**' + pattern.map(function (p) {
	    return (p === minimatch.GLOBSTAR) ? '**' : (''+p)
	  }).join('/')
	}
	
	Glob.prototype._stat = function (f, cb) {
	  assert(this instanceof Glob)
	  var abs = f
	  if (f.charAt(0) === "/") {
	    abs = path.join(this.root, f)
	  } else if (this.changedCwd) {
	    abs = path.resolve(this.cwd, f)
	  }
	
	  if (f.length > this.maxLength) {
	    var er = new Error("Path name too long")
	    er.code = "ENAMETOOLONG"
	    er.path = f
	    return this._afterStat(f, abs, cb, er)
	  }
	
	  this.log('stat', [this.cwd, f, '=', abs])
	
	  if (!this.stat && this.cache.hasOwnProperty(f)) {
	    var exists = this.cache[f]
	    , isDir = exists && (Array.isArray(exists) || exists === 2)
	    if (this.sync) return cb.call(this, !!exists, isDir)
	    return process.nextTick(cb.bind(this, !!exists, isDir))
	  }
	
	  var stat = this.statCache[abs]
	  if (this.sync || stat) {
	    var er
	    try {
	      stat = fs.statSync(abs)
	    } catch (e) {
	      er = e
	    }
	    this._afterStat(f, abs, cb, er, stat)
	  } else {
	    fs.stat(abs, this._afterStat.bind(this, f, abs, cb))
	  }
	}
	
	Glob.prototype._afterStat = function (f, abs, cb, er, stat) {
	  var exists
	  assert(this instanceof Glob)
	
	  if (abs.slice(-1) === "/" && stat && !stat.isDirectory()) {
	    this.log("should be ENOTDIR, fake it")
	
	    er = new Error("ENOTDIR, not a directory '" + abs + "'")
	    er.path = abs
	    er.code = "ENOTDIR"
	    stat = null
	  }
	
	  var emit = !this.statCache[abs]
	  this.statCache[abs] = stat
	
	  if (er || !stat) {
	    exists = false
	  } else {
	    exists = stat.isDirectory() ? 2 : 1
	    if (emit)
	      this.emit('stat', f, stat)
	  }
	  this.cache[f] = this.cache[f] || exists
	  cb.call(this, !!exists, exists === 2)
	}
	
	Glob.prototype._readdir = function (f, cb) {
	  assert(this instanceof Glob)
	  var abs = f
	  if (f.charAt(0) === "/") {
	    abs = path.join(this.root, f)
	  } else if (isAbsolute(f)) {
	    abs = f
	  } else if (this.changedCwd) {
	    abs = path.resolve(this.cwd, f)
	  }
	
	  if (f.length > this.maxLength) {
	    var er = new Error("Path name too long")
	    er.code = "ENAMETOOLONG"
	    er.path = f
	    return this._afterReaddir(f, abs, cb, er)
	  }
	
	  this.log('readdir', [this.cwd, f, abs])
	  if (this.cache.hasOwnProperty(f)) {
	    var c = this.cache[f]
	    if (Array.isArray(c)) {
	      if (this.sync) return cb.call(this, null, c)
	      return process.nextTick(cb.bind(this, null, c))
	    }
	
	    if (!c || c === 1) {
	      // either ENOENT or ENOTDIR
	      var code = c ? "ENOTDIR" : "ENOENT"
	      , er = new Error((c ? "Not a directory" : "Not found") + ": " + f)
	      er.path = f
	      er.code = code
	      this.log(f, er)
	      if (this.sync) return cb.call(this, er)
	      return process.nextTick(cb.bind(this, er))
	    }
	
	    // at this point, c === 2, meaning it's a dir, but we haven't
	    // had to read it yet, or c === true, meaning it's *something*
	    // but we don't have any idea what.  Need to read it, either way.
	  }
	
	  if (this.sync) {
	    var er, entries
	    try {
	      entries = fs.readdirSync(abs)
	    } catch (e) {
	      er = e
	    }
	    return this._afterReaddir(f, abs, cb, er, entries)
	  }
	
	  fs.readdir(abs, this._afterReaddir.bind(this, f, abs, cb))
	}
	
	Glob.prototype._afterReaddir = function (f, abs, cb, er, entries) {
	  assert(this instanceof Glob)
	  if (entries && !er) {
	    this.cache[f] = entries
	    // if we haven't asked to stat everything for suresies, then just
	    // assume that everything in there exists, so we can avoid
	    // having to stat it a second time.  This also gets us one step
	    // further into ELOOP territory.
	    if (!this.mark && !this.stat) {
	      entries.forEach(function (e) {
	        if (f === "/") e = f + e
	        else e = f + "/" + e
	        this.cache[e] = true
	      }, this)
	    }
	
	    return cb.call(this, er, entries)
	  }
	
	  // now handle errors, and cache the information
	  if (er) switch (er.code) {
	    case "ENOTDIR": // totally normal. means it *does* exist.
	      this.cache[f] = 1
	      return cb.call(this, er)
	    case "ENOENT": // not terribly unusual
	    case "ELOOP":
	    case "ENAMETOOLONG":
	    case "UNKNOWN":
	      this.cache[f] = false
	      return cb.call(this, er)
	    default: // some unusual error.  Treat as failure.
	      this.cache[f] = false
	      if (this.strict) this.emit("error", er)
	      if (!this.silent) console.error("glob error", er)
	      return cb.call(this, er)
	  }
	}
	
	var isAbsolute = process.platform === "win32" ? absWin : absUnix
	
	function absWin (p) {
	  if (absUnix(p)) return true
	  // pull off the device/UNC bit from a windows path.
	  // from node's lib/path.js
	  var splitDeviceRe =
	      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/
	    , result = splitDeviceRe.exec(p)
	    , device = result[1] || ''
	    , isUnc = device && device.charAt(1) !== ':'
	    , isAbsolute = !!result[2] || isUnc // UNC paths are always absolute
	
	  return isAbsolute
	}
	
	function absUnix (p) {
	  return p.charAt(0) === "/" || p === ""
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Monkey-patching the fs module.
	// It's ugly, but there is simply no other way to do this.
	var fs = module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	var assert = __webpack_require__(67)
	
	// fix up some busted stuff, mostly on windows and old nodes
	__webpack_require__(71)
	
	// The EMFILE enqueuing stuff
	
	var util = __webpack_require__(68)
	
	function noop () {}
	
	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs')
	else if (/\bgfs\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS: ' + m.split(/\n/).join('\nGFS: ')
	    console.error(m)
	  }
	
	if (/\bgfs\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug('fds', fds)
	    debug(queue)
	    assert.equal(queue.length, 0)
	  })
	}
	
	
	var originalOpen = fs.open
	fs.open = open
	
	function open(path, flags, mode, cb) {
	  if (typeof mode === "function") cb = mode, mode = null
	  if (typeof cb !== "function") cb = noop
	  new OpenReq(path, flags, mode, cb)
	}
	
	function OpenReq(path, flags, mode, cb) {
	  this.path = path
	  this.flags = flags
	  this.mode = mode
	  this.cb = cb
	  Req.call(this)
	}
	
	util.inherits(OpenReq, Req)
	
	OpenReq.prototype.process = function() {
	  originalOpen.call(fs, this.path, this.flags, this.mode, this.done)
	}
	
	var fds = {}
	OpenReq.prototype.done = function(er, fd) {
	  debug('open done', er, fd)
	  if (fd)
	    fds['fd' + fd] = this.path
	  Req.prototype.done.call(this, er, fd)
	}
	
	
	var originalReaddir = fs.readdir
	fs.readdir = readdir
	
	function readdir(path, cb) {
	  if (typeof cb !== "function") cb = noop
	  new ReaddirReq(path, cb)
	}
	
	function ReaddirReq(path, cb) {
	  this.path = path
	  this.cb = cb
	  Req.call(this)
	}
	
	util.inherits(ReaddirReq, Req)
	
	ReaddirReq.prototype.process = function() {
	  originalReaddir.call(fs, this.path, this.done)
	}
	
	ReaddirReq.prototype.done = function(er, files) {
	  if (files && files.sort)
	    files = files.sort()
	  Req.prototype.done.call(this, er, files)
	  onclose()
	}
	
	
	var originalClose = fs.close
	fs.close = close
	
	function close (fd, cb) {
	  debug('close', fd)
	  if (typeof cb !== "function") cb = noop
	  delete fds['fd' + fd]
	  originalClose.call(fs, fd, function(er) {
	    onclose()
	    cb(er)
	  })
	}
	
	
	var originalCloseSync = fs.closeSync
	fs.closeSync = closeSync
	
	function closeSync (fd) {
	  try {
	    return originalCloseSync(fd)
	  } finally {
	    onclose()
	  }
	}
	
	
	// Req class
	function Req () {
	  // start processing
	  this.done = this.done.bind(this)
	  this.failures = 0
	  this.process()
	}
	
	Req.prototype.done = function (er, result) {
	  var tryAgain = false
	  if (er) {
	    var code = er.code
	    var tryAgain = code === "EMFILE"
	    if (process.platform === "win32")
	      tryAgain = tryAgain || code === "OK"
	  }
	
	  if (tryAgain) {
	    this.failures ++
	    enqueue(this)
	  } else {
	    var cb = this.cb
	    cb(er, result)
	  }
	}
	
	var queue = []
	
	function enqueue(req) {
	  queue.push(req)
	  debug('enqueue %d %s', queue.length, req.constructor.name, req)
	}
	
	function onclose() {
	  var req = queue.shift()
	  if (req) {
	    debug('process', req.constructor.name, req)
	    req.process()
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	var util = __webpack_require__(68);
	
	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  }
	  else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}
	
	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	
	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(JSON.stringify(self.expected, replacer), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;
	
	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }
	
	    return true;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!util.isObject(actual) && !util.isObject(expected)) {
	    return actual == expected;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }
	
	  return false;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }
	
	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};
	
	assert.ifError = function(err) { if (err) {throw err;}};
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(69);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(70);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(53)))

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 70 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var constants = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"constants\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	var origCwd = process.cwd
	var cwd = null
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}
	
	// (re-)implement some things that are known busted or missing.
	
	// lchmod, broken prior to 0.6.2
	// back-port the fix here.
	if (constants.hasOwnProperty('O_SYMLINK') &&
	    process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	  fs.lchmod = function (path, mode, callback) {
	    callback = callback || noop
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          callback(err || err2)
	        })
	      })
	    })
	  }
	
	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)
	
	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var err, err2
	    try {
	      var ret = fs.fchmodSync(fd, mode)
	    } catch (er) {
	      err = er
	    }
	    try {
	      fs.closeSync(fd)
	    } catch (er) {
	      err2 = er
	    }
	    if (err || err2) throw (err || err2)
	    return ret
	  }
	}
	
	
	// lutimes implementation, or no-op
	if (!fs.lutimes) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        cb = cb || noop
	        if (er) return cb(er)
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            return cb(er || er2)
	          })
	        })
	      })
	    }
	
	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	        , err
	        , err2
	        , ret
	
	      try {
	        var ret = fs.futimesSync(fd, at, mt)
	      } catch (er) {
	        err = er
	      }
	      try {
	        fs.closeSync(fd)
	      } catch (er) {
	        err2 = er
	      }
	      if (err || err2) throw (err || err2)
	      return ret
	    }
	
	  } else if (fs.utimensat && constants.hasOwnProperty("AT_SYMLINK_NOFOLLOW")) {
	    // maybe utimensat will be bound soonish?
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.utimensat(path, at, mt, constants.AT_SYMLINK_NOFOLLOW, cb)
	    }
	
	    fs.lutimesSync = function (path, at, mt) {
	      return fs.utimensatSync(path, at, mt, constants.AT_SYMLINK_NOFOLLOW)
	    }
	
	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}
	
	
	// https://github.com/isaacs/node-graceful-fs/issues/4
	// Chown should not fail on einval or eperm if non-root.
	
	fs.chown = chownFix(fs.chown)
	fs.fchown = chownFix(fs.fchown)
	fs.lchown = chownFix(fs.lchown)
	
	fs.chownSync = chownFixSync(fs.chownSync)
	fs.fchownSync = chownFixSync(fs.fchownSync)
	fs.lchownSync = chownFixSync(fs.lchownSync)
	
	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er, res) {
	      if (chownErOk(er)) er = null
	      cb(er, res)
	    })
	  }
	}
	
	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}
	
	function chownErOk (er) {
	  // if there's no getuid, or if getuid() is something other than 0,
	  // and the error is EINVAL or EPERM, then just ignore it.
	  // This specific case is a silent failure in cp, install, tar,
	  // and most other unix tools that manage permissions.
	  // When running as root, or if other types of errors are encountered,
	  // then it's strict.
	  if (!er || (!process.getuid || process.getuid() !== 0)
	      && (er.code === "EINVAL" || er.code === "EPERM")) return true
	}
	
	
	// if lchmod/lchown do not exist, then make them no-ops
	if (!fs.lchmod) {
	  fs.lchmod = function (path, mode, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchmodSync = function () {}
	}
	if (!fs.lchown) {
	  fs.lchown = function (path, uid, gid, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchownSync = function () {}
	}
	
	
	
	// on Windows, A/V software can lock the directory, causing this
	// to fail with an EACCES or EPERM if the directory contains newly
	// created files.  Try again on failure, for up to 1 second.
	if (process.platform === "win32") {
	  var rename_ = fs.rename
	  fs.rename = function rename (from, to, cb) {
	    var start = Date.now()
	    rename_(from, to, function CB (er) {
	      if (er
	          && (er.code === "EACCES" || er.code === "EPERM")
	          && Date.now() - start < 1000) {
	        return rename_(from, to, CB)
	      }
	      cb(er)
	    })
	  }
	}
	
	
	// if read() returns EAGAIN, then just try it again.
	var read = fs.read
	fs.read = function (fd, buffer, offset, length, position, callback_) {
	  var callback
	  if (callback_ && typeof callback_ === 'function') {
	    var eagCounter = 0
	    callback = function (er, _, __) {
	      if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        return read.call(fs, fd, buffer, offset, length, position, callback)
	      }
	      callback_.apply(this, arguments)
	    }
	  }
	  return read.call(fs, fd, buffer, offset, length, position, callback)
	}
	
	var readSync = fs.readSync
	fs.readSync = function (fd, buffer, offset, length, position) {
	  var eagCounter = 0
	  while (true) {
	    try {
	      return readSync.call(fs, fd, buffer, offset, length, position)
	    } catch (er) {
	      if (er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        continue
	      }
	      throw er
	    }
	  }
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 72 */,
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(module, process) {;(function (require, exports, module, platform) {
	
	if (module) module.exports = minimatch
	else exports.minimatch = minimatch
	
	if (!__webpack_require__(74)) {
	  require = function (id) {
	    switch (id) {
	      case "sigmund": return function sigmund (obj) {
	        return JSON.stringify(obj)
	      }
	      case "path": return { basename: function (f) {
	        f = f.split(/[\/\\]/)
	        var e = f.pop()
	        if (!e) e = f.pop()
	        return e
	      }}
	      case "lru-cache": return function LRUCache () {
	        // not quite an LRU, but still space-limited.
	        var cache = {}
	        var cnt = 0
	        this.set = function (k, v) {
	          cnt ++
	          if (cnt >= 100) cache = {}
	          cache[k] = v
	        }
	        this.get = function (k) { return cache[k] }
	      }
	    }
	  }
	}
	
	minimatch.Minimatch = Minimatch
	
	var LRU = require("lru-cache")
	  , cache = minimatch.cache = new LRU({max: 100})
	  , GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	  , sigmund = require("sigmund")
	
	var path = require("path")
	  // any single thing other than /
	  // don't need to escape / when using new RegExp()
	  , qmark = "[^/]"
	
	  // * => any number of characters
	  , star = qmark + "*?"
	
	  // ** when dots are allowed.  Anything goes, except .. and .
	  // not (^ or / followed by one or two dots followed by $ or /),
	  // followed by anything, any number of times.
	  , twoStarDot = "(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?"
	
	  // not a ^ or / followed by a dot,
	  // followed by anything, any number of times.
	  , twoStarNoDot = "(?:(?!(?:\\\/|^)\\.).)*?"
	
	  // characters that need to be escaped in RegExp.
	  , reSpecials = charSet("().*{}+?[]^$\\!")
	
	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split("").reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}
	
	// normalizes slashes.
	var slashSplit = /\/+/
	
	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}
	
	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}
	
	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch
	
	  var orig = minimatch
	
	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }
	
	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }
	
	  return m
	}
	
	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}
	
	
	function minimatch (p, pattern, options) {
	  if (typeof pattern !== "string") {
	    throw new TypeError("glob pattern string required")
	  }
	
	  if (!options) options = {}
	
	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === "#") {
	    return false
	  }
	
	  // "" only matches ""
	  if (pattern.trim() === "") return p === ""
	
	  return new Minimatch(pattern, options).match(p)
	}
	
	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options, cache)
	  }
	
	  if (typeof pattern !== "string") {
	    throw new TypeError("glob pattern string required")
	  }
	
	  if (!options) options = {}
	  pattern = pattern.trim()
	
	  // windows: need to use /, not \
	  // On other platforms, \ is a valid (albeit bad) filename char.
	  if (platform === "win32") {
	    pattern = pattern.split("\\").join("/")
	  }
	
	  // lru storage.
	  // these things aren't particularly big, but walking down the string
	  // and turning it into a regexp can get pretty costly.
	  var cacheKey = pattern + "\n" + sigmund(options)
	  var cached = minimatch.cache.get(cacheKey)
	  if (cached) return cached
	  minimatch.cache.set(cacheKey, this)
	
	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false
	
	  // make the set of regexps etc.
	  this.make()
	}
	
	Minimatch.prototype.debug = function() {}
	
	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return
	
	  var pattern = this.pattern
	  var options = this.options
	
	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === "#") {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }
	
	  // step 1: figure out negation, etc.
	  this.parseNegate()
	
	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()
	
	  if (options.debug) this.debug = console.error
	
	  this.debug(this.pattern, set)
	
	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })
	
	  this.debug(this.pattern, set)
	
	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)
	
	  this.debug(this.pattern, set)
	
	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return -1 === s.indexOf(false)
	  })
	
	  this.debug(this.pattern, set)
	
	  this.set = set
	}
	
	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	    , negate = false
	    , options = this.options
	    , negateOffset = 0
	
	  if (options.nonegate) return
	
	  for ( var i = 0, l = pattern.length
	      ; i < l && pattern.charAt(i) === "!"
	      ; i ++) {
	    negate = !negate
	    negateOffset ++
	  }
	
	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}
	
	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return new Minimatch(pattern, options).braceExpand()
	}
	
	Minimatch.prototype.braceExpand = braceExpand
	function braceExpand (pattern, options) {
	  options = options || this.options
	  pattern = typeof pattern === "undefined"
	    ? this.pattern : pattern
	
	  if (typeof pattern === "undefined") {
	    throw new Error("undefined pattern")
	  }
	
	  if (options.nobrace ||
	      !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }
	
	  var escaping = false
	
	  // examples and comments refer to this crazy pattern:
	  // a{b,c{d,e},{f,g}h}x{y,z}
	  // expected:
	  // abxy
	  // abxz
	  // acdxy
	  // acdxz
	  // acexy
	  // acexz
	  // afhxy
	  // afhxz
	  // aghxy
	  // aghxz
	
	  // everything before the first \{ is just a prefix.
	  // So, we pluck that off, and work with the rest,
	  // and then prepend it to everything we find.
	  if (pattern.charAt(0) !== "{") {
	    this.debug(pattern)
	    var prefix = null
	    for (var i = 0, l = pattern.length; i < l; i ++) {
	      var c = pattern.charAt(i)
	      this.debug(i, c)
	      if (c === "\\") {
	        escaping = !escaping
	      } else if (c === "{" && !escaping) {
	        prefix = pattern.substr(0, i)
	        break
	      }
	    }
	
	    // actually no sets, all { were escaped.
	    if (prefix === null) {
	      this.debug("no sets")
	      return [pattern]
	    }
	
	   var tail = braceExpand.call(this, pattern.substr(i), options)
	    return tail.map(function (t) {
	      return prefix + t
	    })
	  }
	
	  // now we have something like:
	  // {b,c{d,e},{f,g}h}x{y,z}
	  // walk through the set, expanding each part, until
	  // the set ends.  then, we'll expand the suffix.
	  // If the set only has a single member, then'll put the {} back
	
	  // first, handle numeric sets, since they're easier
	  var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/)
	  if (numset) {
	    this.debug("numset", numset[1], numset[2])
	    var suf = braceExpand.call(this, pattern.substr(numset[0].length), options)
	      , start = +numset[1]
	      , end = +numset[2]
	      , inc = start > end ? -1 : 1
	      , set = []
	    for (var i = start; i != (end + inc); i += inc) {
	      // append all the suffixes
	      for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
	        set.push(i + suf[ii])
	      }
	    }
	    return set
	  }
	
	  // ok, walk through the set
	  // We hope, somewhat optimistically, that there
	  // will be a } at the end.
	  // If the closing brace isn't found, then the pattern is
	  // interpreted as braceExpand("\\" + pattern) so that
	  // the leading \{ will be interpreted literally.
	  var i = 1 // skip the \{
	    , depth = 1
	    , set = []
	    , member = ""
	    , sawEnd = false
	    , escaping = false
	
	  function addMember () {
	    set.push(member)
	    member = ""
	  }
	
	  this.debug("Entering for")
	  FOR: for (i = 1, l = pattern.length; i < l; i ++) {
	    var c = pattern.charAt(i)
	    this.debug("", i, c)
	
	    if (escaping) {
	      escaping = false
	      member += "\\" + c
	    } else {
	      switch (c) {
	        case "\\":
	          escaping = true
	          continue
	
	        case "{":
	          depth ++
	          member += "{"
	          continue
	
	        case "}":
	          depth --
	          // if this closes the actual set, then we're done
	          if (depth === 0) {
	            addMember()
	            // pluck off the close-brace
	            i ++
	            break FOR
	          } else {
	            member += c
	            continue
	          }
	
	        case ",":
	          if (depth === 1) {
	            addMember()
	          } else {
	            member += c
	          }
	          continue
	
	        default:
	          member += c
	          continue
	      } // switch
	    } // else
	  } // for
	
	  // now we've either finished the set, and the suffix is
	  // pattern.substr(i), or we have *not* closed the set,
	  // and need to escape the leading brace
	  if (depth !== 0) {
	    this.debug("didn't close", pattern)
	    return braceExpand.call(this, "\\" + pattern, options)
	  }
	
	  // x{y,z} -> ["xy", "xz"]
	  this.debug("set", set)
	  this.debug("suffix", pattern.substr(i))
	  var suf = braceExpand.call(this, pattern.substr(i), options)
	  // ["b", "c{d,e}","{f,g}h"] ->
	  //   [["b"], ["cd", "ce"], ["fh", "gh"]]
	  var addBraces = set.length === 1
	  this.debug("set pre-expanded", set)
	  set = set.map(function (p) {
	    return braceExpand.call(this, p, options)
	  }, this)
	  this.debug("set expanded", set)
	
	
	  // [["b"], ["cd", "ce"], ["fh", "gh"]] ->
	  //   ["b", "cd", "ce", "fh", "gh"]
	  set = set.reduce(function (l, r) {
	    return l.concat(r)
	  })
	
	  if (addBraces) {
	    set = set.map(function (s) {
	      return "{" + s + "}"
	    })
	  }
	
	  // now attach the suffixes.
	  var ret = []
	  for (var i = 0, l = set.length; i < l; i ++) {
	    for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
	      ret.push(set[i] + suf[ii])
	    }
	  }
	  return ret
	}
	
	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  var options = this.options
	
	  // shortcuts
	  if (!options.noglobstar && pattern === "**") return GLOBSTAR
	  if (pattern === "") return ""
	
	  var re = ""
	    , hasMagic = !!options.nocase
	    , escaping = false
	    // ? => one single character
	    , patternListStack = []
	    , plType
	    , stateChar
	    , inClass = false
	    , reClassStart = -1
	    , classStart = -1
	    // . and .. never match anything that doesn't start with .,
	    // even when options.dot is set.
	    , patternStart = pattern.charAt(0) === "." ? "" // anything
	      // not (start or / followed by . or .. followed by / or end)
	      : options.dot ? "(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))"
	      : "(?!\\.)"
	    , self = this
	
	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case "*":
	          re += star
	          hasMagic = true
	          break
	        case "?":
	          re += qmark
	          hasMagic = true
	          break
	        default:
	          re += "\\"+stateChar
	          break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }
	
	  for ( var i = 0, len = pattern.length, c
	      ; (i < len) && (c = pattern.charAt(i))
	      ; i ++ ) {
	
	    this.debug("%s\t%s %s %j", pattern, i, re, c)
	
	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += "\\" + c
	      escaping = false
	      continue
	    }
	
	    SWITCH: switch (c) {
	      case "/":
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false
	
	      case "\\":
	        clearStateChar()
	        escaping = true
	        continue
	
	      // the various stateChar values
	      // for the "extglob" stuff.
	      case "?":
	      case "*":
	      case "+":
	      case "@":
	      case "!":
	        this.debug("%s\t%s %s %j <-- stateChar", pattern, i, re, c)
	
	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === "!" && i === classStart + 1) c = "^"
	          re += c
	          continue
	        }
	
	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	        continue
	
	      case "(":
	        if (inClass) {
	          re += "("
	          continue
	        }
	
	        if (!stateChar) {
	          re += "\\("
	          continue
	        }
	
	        plType = stateChar
	        patternListStack.push({ type: plType
	                              , start: i - 1
	                              , reStart: re.length })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === "!" ? "(?:(?!" : "(?:"
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	        continue
	
	      case ")":
	        if (inClass || !patternListStack.length) {
	          re += "\\)"
	          continue
	        }
	
	        clearStateChar()
	        hasMagic = true
	        re += ")"
	        plType = patternListStack.pop().type
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        switch (plType) {
	          case "!":
	            re += "[^/]*?)"
	            break
	          case "?":
	          case "+":
	          case "*": re += plType
	          case "@": break // the default anyway
	        }
	        continue
	
	      case "|":
	        if (inClass || !patternListStack.length || escaping) {
	          re += "\\|"
	          escaping = false
	          continue
	        }
	
	        clearStateChar()
	        re += "|"
	        continue
	
	      // these are mostly the same in regexp and glob
	      case "[":
	        // swallow any state-tracking char before the [
	        clearStateChar()
	
	        if (inClass) {
	          re += "\\" + c
	          continue
	        }
	
	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	        continue
	
	      case "]":
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += "\\" + c
	          escaping = false
	          continue
	        }
	
	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	        continue
	
	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()
	
	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	                   && !(c === "^" && inClass)) {
	          re += "\\"
	        }
	
	        re += c
	
	    } // switch
	  } // for
	
	
	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    var cs = pattern.substr(classStart + 1)
	      , sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + "\\[" + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }
	
	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  var pl
	  while (pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + 3)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = "\\"
	      }
	
	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + "|"
	    })
	
	    this.debug("tail=%j\n   %s", tail, tail)
	    var t = pl.type === "*" ? star
	          : pl.type === "?" ? qmark
	          : "\\" + pl.type
	
	    hasMagic = true
	    re = re.slice(0, pl.reStart)
	       + t + "\\("
	       + tail
	  }
	
	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += "\\\\"
	  }
	
	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case ".":
	    case "[":
	    case "(": addPatternStart = true
	  }
	
	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== "" && hasMagic) re = "(?=.)" + re
	
	  if (addPatternStart) re = patternStart + re
	
	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [ re, hasMagic ]
	  }
	
	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }
	
	  var flags = options.nocase ? "i" : ""
	    , regExp = new RegExp("^" + re + "$", flags)
	
	  regExp._glob = pattern
	  regExp._src = re
	
	  return regExp
	}
	
	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}
	
	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp
	
	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set
	
	  if (!set.length) return this.regexp = false
	  var options = this.options
	
	  var twoStar = options.noglobstar ? star
	      : options.dot ? twoStarDot
	      : twoStarNoDot
	    , flags = options.nocase ? "i" : ""
	
	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	           : (typeof p === "string") ? regExpEscape(p)
	           : p._src
	    }).join("\\\/")
	  }).join("|")
	
	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = "^(?:" + re + ")$"
	
	  // can match anything, as long as it's not this.
	  if (this.negate) re = "^(?!" + re + ").*$"
	
	  try {
	    return this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    return this.regexp = false
	  }
	}
	
	minimatch.match = function (list, pattern, options) {
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}
	
	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug("match", f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ""
	
	  if (f === "/" && partial) return true
	
	  var options = this.options
	
	  // windows: need to use /, not \
	  // On other platforms, \ is a valid (albeit bad) filename char.
	  if (platform === "win32") {
	    f = f.split("\\").join("/")
	  }
	
	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, "split", f)
	
	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.
	
	  var set = this.set
	  this.debug(this.pattern, "set", set)
	
	  var splitFile = path.basename(f.join("/")).split("/")
	
	  for (var i = 0, l = set.length; i < l; i ++) {
	    var pattern = set[i], file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = splitFile
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }
	
	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}
	
	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options
	
	  this.debug("matchOne",
	              { "this": this
	              , file: file
	              , pattern: pattern })
	
	  this.debug("matchOne", file.length, pattern.length)
	
	  for ( var fi = 0
	          , pi = 0
	          , fl = file.length
	          , pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi ++, pi ++ ) {
	
	    this.debug("matchOne loop")
	    var p = pattern[pi]
	      , f = file[fi]
	
	    this.debug(pattern, p, f)
	
	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false
	
	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])
	
	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	        , pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for ( ; fi < fl; fi ++) {
	          if (file[fi] === "." || file[fi] === ".." ||
	              (!options.dot && file[fi].charAt(0) === ".")) return false
	        }
	        return true
	      }
	
	      // ok, let's see if we can swallow whatever we can.
	      WHILE: while (fr < fl) {
	        var swallowee = file[fr]
	
	        this.debug('\nglobstar while',
	                    file, fr, pattern, pr, swallowee)
	
	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === "." || swallowee === ".." ||
	              (!options.dot && swallowee.charAt(0) === ".")) {
	            this.debug("dot detected!", file, fr, pattern, pr)
	            break WHILE
	          }
	
	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr ++
	        }
	      }
	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then 
	      if (partial) {
	        // ran out of file
	        this.debug("\n>>> no match, partial?", file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }
	
	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === "string") {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug("string match", p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug("pattern match", p, f, hit)
	    }
	
	    if (!hit) return false
	  }
	
	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*
	
	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === "")
	    return emptyFileEnd
	  }
	
	  // should be unreachable.
	  throw new Error("wtf?")
	}
	
	
	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, "$1")
	}
	
	
	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	}
	
	})( typeof require === "function" ? require : null,
	    this,
	     true ? module : null,
	    typeof process === "object" ? process.platform : "win32"
	  )
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module), __webpack_require__(53)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./minimatch": 73,
		"./minimatch.js": 73,
		"./test/basic": 78,
		"./test/basic.js": 78,
		"./test/brace-expand": 79,
		"./test/brace-expand.js": 79,
		"./test/caching": 80,
		"./test/caching.js": 80,
		"./test/defaults": 81,
		"./test/defaults.js": 81,
		"./test/extglob-ending-with-state-char": 82,
		"./test/extglob-ending-with-state-char.js": 82
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 74;


/***/ },
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test
	//
	// TODO: Some of these tests do very bad things with backslashes, and will
	// most likely fail badly on windows.  They should probably be skipped.
	
	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , globalBefore = Object.keys(global)
	  , mm = __webpack_require__(73)
	  , files = [ "a", "b", "c", "d", "abc"
	            , "abd", "abe", "bb", "bcd"
	            , "ca", "cb", "dd", "de"
	            , "bdir/", "bdir/cfile"]
	  , next = files.concat([ "a-b", "aXb"
	                        , ".x", ".y" ])
	
	
	var patterns =
	  [ "http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test"
	  , ["a*", ["a", "abc", "abd", "abe"]]
	  , ["X*", ["X*"], {nonull: true}]
	
	  // allow null glob expansion
	  , ["X*", []]
	
	  // isaacs: Slightly different than bash/sh/ksh
	  // \\* is not un-escaped to literal "*" in a failed match,
	  // but it does make it get treated as a literal star
	  , ["\\*", ["\\*"], {nonull: true}]
	  , ["\\**", ["\\**"], {nonull: true}]
	  , ["\\*\\*", ["\\*\\*"], {nonull: true}]
	
	  , ["b*/", ["bdir/"]]
	  , ["c*", ["c", "ca", "cb"]]
	  , ["**", files]
	
	  , ["\\.\\./*/", ["\\.\\./*/"], {nonull: true}]
	  , ["s/\\..*//", ["s/\\..*//"], {nonull: true}]
	
	  , "legendary larry crashes bashes"
	  , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"], {nonull: true}]
	  , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"], {nonull: true}]
	
	  , "character classes"
	  , ["[a-c]b*", ["abc", "abd", "abe", "bb", "cb"]]
	  , ["[a-y]*[^c]", ["abd", "abe", "bb", "bcd",
	     "bdir/", "ca", "cb", "dd", "de"]]
	  , ["a*[^c]", ["abd", "abe"]]
	  , function () { files.push("a-b", "aXb") }
	  , ["a[X-]b", ["a-b", "aXb"]]
	  , function () { files.push(".x", ".y") }
	  , ["[^a-c]*", ["d", "dd", "de"]]
	  , function () { files.push("a*b/", "a*b/ooo") }
	  , ["a\\*b/*", ["a*b/ooo"]]
	  , ["a\\*?/*", ["a*b/ooo"]]
	  , ["*\\\\!*", [], {null: true}, ["echo !7"]]
	  , ["*\\!*", ["echo !7"], null, ["echo !7"]]
	  , ["*.\\*", ["r.*"], null, ["r.*"]]
	  , ["a[b]c", ["abc"]]
	  , ["a[\\b]c", ["abc"]]
	  , ["a?c", ["abc"]]
	  , ["a\\*c", [], {null: true}, ["abc"]]
	  , ["", [""], { null: true }, [""]]
	
	  , "http://www.opensource.apple.com/source/bash/bash-23/" +
	    "bash/tests/glob-test"
	  , function () { files.push("man/", "man/man1/", "man/man1/bash.1") }
	  , ["*/man*/bash.*", ["man/man1/bash.1"]]
	  , ["man/man1/bash.1", ["man/man1/bash.1"]]
	  , ["a***c", ["abc"], null, ["abc"]]
	  , ["a*****?c", ["abc"], null, ["abc"]]
	  , ["?*****??", ["abc"], null, ["abc"]]
	  , ["*****??", ["abc"], null, ["abc"]]
	  , ["?*****?c", ["abc"], null, ["abc"]]
	  , ["?***?****c", ["abc"], null, ["abc"]]
	  , ["?***?****?", ["abc"], null, ["abc"]]
	  , ["?***?****", ["abc"], null, ["abc"]]
	  , ["*******c", ["abc"], null, ["abc"]]
	  , ["*******?", ["abc"], null, ["abc"]]
	  , ["a*cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??k***", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??***k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??***k**", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a****c**?**??*****", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["[-abc]", ["-"], null, ["-"]]
	  , ["[abc-]", ["-"], null, ["-"]]
	  , ["\\", ["\\"], null, ["\\"]]
	  , ["[\\\\]", ["\\"], null, ["\\"]]
	  , ["[[]", ["["], null, ["["]]
	  , ["[", ["["], null, ["["]]
	  , ["[*", ["[abc"], null, ["[abc"]]
	  , "a right bracket shall lose its special meaning and\n" +
	    "represent itself in a bracket expression if it occurs\n" +
	    "first in the list.  -- POSIX.2 2.8.3.2"
	  , ["[]]", ["]"], null, ["]"]]
	  , ["[]-]", ["]"], null, ["]"]]
	  , ["[a-\z]", ["p"], null, ["p"]]
	  , ["??**********?****?", [], { null: true }, ["abc"]]
	  , ["??**********?****c", [], { null: true }, ["abc"]]
	  , ["?************c****?****", [], { null: true }, ["abc"]]
	  , ["*c*?**", [], { null: true }, ["abc"]]
	  , ["a*****c*?**", [], { null: true }, ["abc"]]
	  , ["a********???*******", [], { null: true }, ["abc"]]
	  , ["[]", [], { null: true }, ["a"]]
	  , ["[abc", [], { null: true }, ["["]]
	
	  , "nocase tests"
	  , ["XYZ", ["xYz"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]
	  , ["ab*", ["ABC"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]
	  , ["[ia]?[ck]", ["ABC", "IjK"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]
	
	  // [ pattern, [matches], MM opts, files, TAP opts]
	  , "onestar/twostar"
	  , ["{/*,*}", [], {null: true}, ["/asdf/asdf/asdf"]]
	  , ["{/?,*}", ["/a", "bb"], {null: true}
	    , ["/a", "/b/b", "/a/b/c", "bb"]]
	
	  , "dots should not match unless requested"
	  , ["**", ["a/b"], {}, ["a/b", "a/.d", ".a/.d"]]
	
	  // .. and . can only match patterns starting with .,
	  // even when options.dot is set.
	  , function () {
	      files = ["a/./b", "a/../b", "a/c/b", "a/.d/b"]
	    }
	  , ["a/*/b", ["a/c/b", "a/.d/b"], {dot: true}]
	  , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: true}]
	  , ["a/*/b", ["a/c/b"], {dot:false}]
	  , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: false}]
	
	
	  // this also tests that changing the options needs
	  // to change the cache key, even if the pattern is
	  // the same!
	  , ["**", ["a/b","a/.d",".a/.d"], { dot: true }
	    , [ ".a/.d", "a/.d", "a/b"]]
	
	  , "paren sets cannot contain slashes"
	  , ["*(a/b)", ["*(a/b)"], {nonull: true}, ["a/b"]]
	
	  // brace sets trump all else.
	  //
	  // invalid glob pattern.  fails on bash4 and bsdglob.
	  // however, in this implementation, it's easier just
	  // to do the intuitive thing, and let brace-expansion
	  // actually come before parsing any extglob patterns,
	  // like the documentation seems to say.
	  //
	  // XXX: if anyone complains about this, either fix it
	  // or tell them to grow up and stop complaining.
	  //
	  // bash/bsdglob says this:
	  // , ["*(a|{b),c)}", ["*(a|{b),c)}"], {}, ["a", "ab", "ac", "ad"]]
	  // but we do this instead:
	  , ["*(a|{b),c)}", ["a", "ab", "ac"], {}, ["a", "ab", "ac", "ad"]]
	
	  // test partial parsing in the presence of comment/negation chars
	  , ["[!a*", ["[!ab"], {}, ["[!ab", "[ab"]]
	  , ["[#a*", ["[#ab"], {}, ["[#ab", "[ab"]]
	
	  // like: {a,b|c\\,d\\\|e} except it's unclosed, so it has to be escaped.
	  , ["+(a|*\\|c\\\\|d\\\\\\|e\\\\\\\\|f\\\\\\\\\\|g"
	    , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g"]
	    , {}
	    , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g", "a", "b\\c"]]
	
	
	  // crazy nested {,,} and *(||) tests.
	  , function () {
	      files = [ "a", "b", "c", "d"
	              , "ab", "ac", "ad"
	              , "bc", "cb"
	              , "bc,d", "c,db", "c,d"
	              , "d)", "(b|c", "*(b|c"
	              , "b|c", "b|cc", "cb|c"
	              , "x(a|b|c)", "x(a|c)"
	              , "(a|b|c)", "(a|c)"]
	    }
	  , ["*(a|{b,c})", ["a", "b", "c", "ab", "ac"]]
	  , ["{a,*(b|c,d)}", ["a","(b|c", "*(b|c", "d)"]]
	  // a
	  // *(b|c)
	  // *(b|d)
	  , ["{a,*(b|{c,d})}", ["a","b", "bc", "cb", "c", "d"]]
	  , ["*(a|{b|c,c})", ["a", "b", "c", "ab", "ac", "bc", "cb"]]
	
	
	  // test various flag settings.
	  , [ "*(a|{b|c,c})", ["x(a|b|c)", "x(a|c)", "(a|b|c)", "(a|c)"]
	    , { noext: true } ]
	  , ["a?b", ["x/y/acb", "acb/"], {matchBase: true}
	    , ["x/y/acb", "acb/", "acb/d/e", "x/y/acb/d"] ]
	  , ["#*", ["#a", "#b"], {nocomment: true}, ["#a", "#b", "c#d"]]
	
	
	  // begin channelling Boole and deMorgan...
	  , "negation tests"
	  , function () {
	      files = ["d", "e", "!ab", "!abc", "a!b", "\\!a"]
	    }
	
	  // anything that is NOT a* matches.
	  , ["!a*", ["\\!a", "d", "e", "!ab", "!abc"]]
	
	  // anything that IS !a* matches.
	  , ["!a*", ["!ab", "!abc"], {nonegate: true}]
	
	  // anything that IS a* matches
	  , ["!!a*", ["a!b"]]
	
	  // anything that is NOT !a* matches
	  , ["!\\!a*", ["a!b", "d", "e", "\\!a"]]
	
	  // negation nestled within a pattern
	  , function () {
	      files = [ "foo.js"
	              , "foo.bar"
	              // can't match this one without negative lookbehind.
	              , "foo.js.js"
	              , "blar.js"
	              , "foo."
	              , "boo.js.boo" ]
	    }
	  , ["*.!(js)", ["foo.bar", "foo.", "boo.js.boo"] ]
	
	  // https://github.com/isaacs/minimatch/issues/5
	  , function () {
	      files = [ 'a/b/.x/c'
	              , 'a/b/.x/c/d'
	              , 'a/b/.x/c/d/e'
	              , 'a/b/.x'
	              , 'a/b/.x/'
	              , 'a/.x/b'
	              , '.x'
	              , '.x/'
	              , '.x/a'
	              , '.x/a/b'
	              , 'a/.x/b/.x/c'
	              , '.x/.x' ]
	  }
	  , ["**/.x/**", [ '.x/'
	                 , '.x/a'
	                 , '.x/a/b'
	                 , 'a/.x/b'
	                 , 'a/b/.x/'
	                 , 'a/b/.x/c'
	                 , 'a/b/.x/c/d'
	                 , 'a/b/.x/c/d/e' ] ]
	
	  ]
	
	var regexps =
	  [ '/^(?:(?=.)a[^/]*?)$/',
	    '/^(?:(?=.)X[^/]*?)$/',
	    '/^(?:(?=.)X[^/]*?)$/',
	    '/^(?:\\*)$/',
	    '/^(?:(?=.)\\*[^/]*?)$/',
	    '/^(?:\\*\\*)$/',
	    '/^(?:(?=.)b[^/]*?\\/)$/',
	    '/^(?:(?=.)c[^/]*?)$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?)$/',
	    '/^(?:\\.\\.\\/(?!\\.)(?=.)[^/]*?\\/)$/',
	    '/^(?:s\\/(?=.)\\.\\.[^/]*?\\/)$/',
	    '/^(?:\\/\\^root:\\/\\{s\\/(?=.)\\^[^:][^/]*?:[^:][^/]*?:\\([^:]\\)[^/]*?\\.[^/]*?\\$\\/1\\/)$/',
	    '/^(?:\\/\\^root:\\/\\{s\\/(?=.)\\^[^:][^/]*?:[^:][^/]*?:\\([^:]\\)[^/]*?\\.[^/]*?\\$\\/\u0001\\/)$/',
	    '/^(?:(?!\\.)(?=.)[a-c]b[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[a-y][^/]*?[^c])$/',
	    '/^(?:(?=.)a[^/]*?[^c])$/',
	    '/^(?:(?=.)a[X-]b)$/',
	    '/^(?:(?!\\.)(?=.)[^a-c][^/]*?)$/',
	    '/^(?:a\\*b\\/(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?=.)a\\*[^/]\\/(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\\\\\![^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\![^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\.\\*)$/',
	    '/^(?:(?=.)a[b]c)$/',
	    '/^(?:(?=.)a[b]c)$/',
	    '/^(?:(?=.)a[^/]c)$/',
	    '/^(?:a\\*c)$/',
	    'false',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\/(?=.)man[^/]*?\\/(?=.)bash\\.[^/]*?)$/',
	    '/^(?:man\\/man1\\/bash\\.1)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?=.)a[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?k[^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[-abc])$/',
	    '/^(?:(?!\\.)(?=.)[abc-])$/',
	    '/^(?:\\\\)$/',
	    '/^(?:(?!\\.)(?=.)[\\\\])$/',
	    '/^(?:(?!\\.)(?=.)[\\[])$/',
	    '/^(?:\\[)$/',
	    '/^(?:(?=.)\\[(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[\\]])$/',
	    '/^(?:(?!\\.)(?=.)[\\]-])$/',
	    '/^(?:(?!\\.)(?=.)[a-z])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?c[^/]*?[^/][^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/][^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:\\[\\])$/',
	    '/^(?:\\[abc)$/',
	    '/^(?:(?=.)XYZ)$/i',
	    '/^(?:(?=.)ab[^/]*?)$/i',
	    '/^(?:(?!\\.)(?=.)[ia][^/][ck])$/i',
	    '/^(?:\\/(?!\\.)(?=.)[^/]*?|(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:\\/(?!\\.)(?=.)[^/]|(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?)$/',
	    '/^(?:a\\/(?!(?:^|\\/)\\.{1,2}(?:$|\\/))(?=.)[^/]*?\\/b)$/',
	    '/^(?:a\\/(?=.)\\.[^/]*?\\/b)$/',
	    '/^(?:a\\/(?!\\.)(?=.)[^/]*?\\/b)$/',
	    '/^(?:a\\/(?=.)\\.[^/]*?\\/b)$/',
	    '/^(?:(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\(a\\/b\\))$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:(?=.)\\[(?=.)\\!a[^/]*?)$/',
	    '/^(?:(?=.)\\[(?=.)#a[^/]*?)$/',
	    '/^(?:(?=.)\\+\\(a\\|[^/]*?\\|c\\\\\\\\\\|d\\\\\\\\\\|e\\\\\\\\\\\\\\\\\\|f\\\\\\\\\\\\\\\\\\|g)$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:a|(?!\\.)(?=.)[^/]*?\\(b\\|c|d\\))$/',
	    '/^(?:a|(?!\\.)(?=.)(?:b|c)*|(?!\\.)(?=.)(?:b|d)*)$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b|c)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\(a\\|b\\|c\\)|(?!\\.)(?=.)[^/]*?\\(a\\|c\\))$/',
	    '/^(?:(?=.)a[^/]b)$/',
	    '/^(?:(?=.)#[^/]*?)$/',
	    '/^(?!^(?:(?=.)a[^/]*?)$).*$/',
	    '/^(?:(?=.)\\!a[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?)$/',
	    '/^(?!^(?:(?=.)\\!a[^/]*?)$).*$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\.(?:(?!js)[^/]*?))$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?\\/\\.x\\/(?:(?!(?:\\/|^)\\.).)*?)$/' ]
	var re = 0;
	
	tap.test("basic tests", function (t) {
	  var start = Date.now()
	
	  // [ pattern, [matches], MM opts, files, TAP opts]
	  patterns.forEach(function (c) {
	    if (typeof c === "function") return c()
	    if (typeof c === "string") return t.comment(c)
	
	    var pattern = c[0]
	      , expect = c[1].sort(alpha)
	      , options = c[2] || {}
	      , f = c[3] || files
	      , tapOpts = c[4] || {}
	
	    // options.debug = true
	    var m = new mm.Minimatch(pattern, options)
	    var r = m.makeRe()
	    var expectRe = regexps[re++]
	    tapOpts.re = String(r) || JSON.stringify(r)
	    tapOpts.files = JSON.stringify(f)
	    tapOpts.pattern = pattern
	    tapOpts.set = m.set
	    tapOpts.negated = m.negate
	
	    var actual = mm.match(f, pattern, options)
	    actual.sort(alpha)
	
	    t.equivalent( actual, expect
	                , JSON.stringify(pattern) + " " + JSON.stringify(expect)
	                , tapOpts )
	
	    t.equal(tapOpts.re, expectRe, tapOpts)
	  })
	
	  t.comment("time=" + (Date.now() - start) + "ms")
	  t.end()
	})
	
	tap.test("global leak test", function (t) {
	  var globalAfter = Object.keys(global)
	  t.equivalent(globalAfter, globalBefore, "no new globals, please")
	  t.end()
	})
	
	function alpha (a, b) {
	  return a > b ? 1 : -1
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , minimatch = __webpack_require__(73)
	
	tap.test("brace expansion", function (t) {
	  // [ pattern, [expanded] ]
	  ; [ [ "a{b,c{d,e},{f,g}h}x{y,z}"
	      , [ "abxy"
	        , "abxz"
	        , "acdxy"
	        , "acdxz"
	        , "acexy"
	        , "acexz"
	        , "afhxy"
	        , "afhxz"
	        , "aghxy"
	        , "aghxz" ] ]
	    , [ "a{1..5}b"
	      , [ "a1b"
	        , "a2b"
	        , "a3b"
	        , "a4b"
	        , "a5b" ] ]
	    , [ "a{b}c", ["a{b}c"] ]
	  ].forEach(function (tc) {
	    var p = tc[0]
	      , expect = tc[1]
	    t.equivalent(minimatch.braceExpand(p), expect, p)
	  })
	  console.error("ending")
	  t.end()
	})
	
	


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var Minimatch = __webpack_require__(73).Minimatch
	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	tap.test("cache test", function (t) {
	  var mm1 = new Minimatch("a?b")
	  var mm2 = new Minimatch("a?b")
	  t.equal(mm1, mm2, "should get the same object")
	  // the lru should drop it after 100 entries
	  for (var i = 0; i < 100; i ++) {
	    new Minimatch("a"+i)
	  }
	  mm2 = new Minimatch("a?b")
	  t.notEqual(mm1, mm2, "cache should have dropped")
	  t.end()
	})


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test
	//
	// TODO: Some of these tests do very bad things with backslashes, and will
	// most likely fail badly on windows.  They should probably be skipped.
	
	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , globalBefore = Object.keys(global)
	  , mm = __webpack_require__(73)
	  , files = [ "a", "b", "c", "d", "abc"
	            , "abd", "abe", "bb", "bcd"
	            , "ca", "cb", "dd", "de"
	            , "bdir/", "bdir/cfile"]
	  , next = files.concat([ "a-b", "aXb"
	                        , ".x", ".y" ])
	
	tap.test("basic tests", function (t) {
	  var start = Date.now()
	
	  // [ pattern, [matches], MM opts, files, TAP opts]
	  ; [ "http://www.bashcookbook.com/bashinfo" +
	      "/source/bash-1.14.7/tests/glob-test"
	    , ["a*", ["a", "abc", "abd", "abe"]]
	    , ["X*", ["X*"], {nonull: true}]
	
	    // allow null glob expansion
	    , ["X*", []]
	
	    // isaacs: Slightly different than bash/sh/ksh
	    // \\* is not un-escaped to literal "*" in a failed match,
	    // but it does make it get treated as a literal star
	    , ["\\*", ["\\*"], {nonull: true}]
	    , ["\\**", ["\\**"], {nonull: true}]
	    , ["\\*\\*", ["\\*\\*"], {nonull: true}]
	
	    , ["b*/", ["bdir/"]]
	    , ["c*", ["c", "ca", "cb"]]
	    , ["**", files]
	
	    , ["\\.\\./*/", ["\\.\\./*/"], {nonull: true}]
	    , ["s/\\..*//", ["s/\\..*//"], {nonull: true}]
	
	    , "legendary larry crashes bashes"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"
	      , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"], {nonull: true}]
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"
	      , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"], {nonull: true}]
	
	    , "character classes"
	    , ["[a-c]b*", ["abc", "abd", "abe", "bb", "cb"]]
	    , ["[a-y]*[^c]", ["abd", "abe", "bb", "bcd",
	       "bdir/", "ca", "cb", "dd", "de"]]
	    , ["a*[^c]", ["abd", "abe"]]
	    , function () { files.push("a-b", "aXb") }
	    , ["a[X-]b", ["a-b", "aXb"]]
	    , function () { files.push(".x", ".y") }
	    , ["[^a-c]*", ["d", "dd", "de"]]
	    , function () { files.push("a*b/", "a*b/ooo") }
	    , ["a\\*b/*", ["a*b/ooo"]]
	    , ["a\\*?/*", ["a*b/ooo"]]
	    , ["*\\\\!*", [], {null: true}, ["echo !7"]]
	    , ["*\\!*", ["echo !7"], null, ["echo !7"]]
	    , ["*.\\*", ["r.*"], null, ["r.*"]]
	    , ["a[b]c", ["abc"]]
	    , ["a[\\b]c", ["abc"]]
	    , ["a?c", ["abc"]]
	    , ["a\\*c", [], {null: true}, ["abc"]]
	    , ["", [""], { null: true }, [""]]
	
	    , "http://www.opensource.apple.com/source/bash/bash-23/" +
	      "bash/tests/glob-test"
	    , function () { files.push("man/", "man/man1/", "man/man1/bash.1") }
	    , ["*/man*/bash.*", ["man/man1/bash.1"]]
	    , ["man/man1/bash.1", ["man/man1/bash.1"]]
	    , ["a***c", ["abc"], null, ["abc"]]
	    , ["a*****?c", ["abc"], null, ["abc"]]
	    , ["?*****??", ["abc"], null, ["abc"]]
	    , ["*****??", ["abc"], null, ["abc"]]
	    , ["?*****?c", ["abc"], null, ["abc"]]
	    , ["?***?****c", ["abc"], null, ["abc"]]
	    , ["?***?****?", ["abc"], null, ["abc"]]
	    , ["?***?****", ["abc"], null, ["abc"]]
	    , ["*******c", ["abc"], null, ["abc"]]
	    , ["*******?", ["abc"], null, ["abc"]]
	    , ["a*cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??k***", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??***k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??***k**", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a****c**?**??*****", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["[-abc]", ["-"], null, ["-"]]
	    , ["[abc-]", ["-"], null, ["-"]]
	    , ["\\", ["\\"], null, ["\\"]]
	    , ["[\\\\]", ["\\"], null, ["\\"]]
	    , ["[[]", ["["], null, ["["]]
	    , ["[", ["["], null, ["["]]
	    , ["[*", ["[abc"], null, ["[abc"]]
	    , "a right bracket shall lose its special meaning and\n" +
	      "represent itself in a bracket expression if it occurs\n" +
	      "first in the list.  -- POSIX.2 2.8.3.2"
	    , ["[]]", ["]"], null, ["]"]]
	    , ["[]-]", ["]"], null, ["]"]]
	    , ["[a-\z]", ["p"], null, ["p"]]
	    , ["??**********?****?", [], { null: true }, ["abc"]]
	    , ["??**********?****c", [], { null: true }, ["abc"]]
	    , ["?************c****?****", [], { null: true }, ["abc"]]
	    , ["*c*?**", [], { null: true }, ["abc"]]
	    , ["a*****c*?**", [], { null: true }, ["abc"]]
	    , ["a********???*******", [], { null: true }, ["abc"]]
	    , ["[]", [], { null: true }, ["a"]]
	    , ["[abc", [], { null: true }, ["["]]
	
	    , "nocase tests"
	    , ["XYZ", ["xYz"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]
	    , ["ab*", ["ABC"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]
	    , ["[ia]?[ck]", ["ABC", "IjK"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]
	
	    // [ pattern, [matches], MM opts, files, TAP opts]
	    , "onestar/twostar"
	    , ["{/*,*}", [], {null: true}, ["/asdf/asdf/asdf"]]
	    , ["{/?,*}", ["/a", "bb"], {null: true}
	      , ["/a", "/b/b", "/a/b/c", "bb"]]
	
	    , "dots should not match unless requested"
	    , ["**", ["a/b"], {}, ["a/b", "a/.d", ".a/.d"]]
	
	    // .. and . can only match patterns starting with .,
	    // even when options.dot is set.
	    , function () {
	        files = ["a/./b", "a/../b", "a/c/b", "a/.d/b"]
	      }
	    , ["a/*/b", ["a/c/b", "a/.d/b"], {dot: true}]
	    , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: true}]
	    , ["a/*/b", ["a/c/b"], {dot:false}]
	    , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: false}]
	
	
	    // this also tests that changing the options needs
	    // to change the cache key, even if the pattern is
	    // the same!
	    , ["**", ["a/b","a/.d",".a/.d"], { dot: true }
	      , [ ".a/.d", "a/.d", "a/b"]]
	
	    , "paren sets cannot contain slashes"
	    , ["*(a/b)", ["*(a/b)"], {nonull: true}, ["a/b"]]
	
	    // brace sets trump all else.
	    //
	    // invalid glob pattern.  fails on bash4 and bsdglob.
	    // however, in this implementation, it's easier just
	    // to do the intuitive thing, and let brace-expansion
	    // actually come before parsing any extglob patterns,
	    // like the documentation seems to say.
	    //
	    // XXX: if anyone complains about this, either fix it
	    // or tell them to grow up and stop complaining.
	    //
	    // bash/bsdglob says this:
	    // , ["*(a|{b),c)}", ["*(a|{b),c)}"], {}, ["a", "ab", "ac", "ad"]]
	    // but we do this instead:
	    , ["*(a|{b),c)}", ["a", "ab", "ac"], {}, ["a", "ab", "ac", "ad"]]
	
	    // test partial parsing in the presence of comment/negation chars
	    , ["[!a*", ["[!ab"], {}, ["[!ab", "[ab"]]
	    , ["[#a*", ["[#ab"], {}, ["[#ab", "[ab"]]
	
	    // like: {a,b|c\\,d\\\|e} except it's unclosed, so it has to be escaped.
	    , ["+(a|*\\|c\\\\|d\\\\\\|e\\\\\\\\|f\\\\\\\\\\|g"
	      , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g"]
	      , {}
	      , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g", "a", "b\\c"]]
	
	
	    // crazy nested {,,} and *(||) tests.
	    , function () {
	        files = [ "a", "b", "c", "d"
	                , "ab", "ac", "ad"
	                , "bc", "cb"
	                , "bc,d", "c,db", "c,d"
	                , "d)", "(b|c", "*(b|c"
	                , "b|c", "b|cc", "cb|c"
	                , "x(a|b|c)", "x(a|c)"
	                , "(a|b|c)", "(a|c)"]
	      }
	    , ["*(a|{b,c})", ["a", "b", "c", "ab", "ac"]]
	    , ["{a,*(b|c,d)}", ["a","(b|c", "*(b|c", "d)"]]
	    // a
	    // *(b|c)
	    // *(b|d)
	    , ["{a,*(b|{c,d})}", ["a","b", "bc", "cb", "c", "d"]]
	    , ["*(a|{b|c,c})", ["a", "b", "c", "ab", "ac", "bc", "cb"]]
	
	
	    // test various flag settings.
	    , [ "*(a|{b|c,c})", ["x(a|b|c)", "x(a|c)", "(a|b|c)", "(a|c)"]
	      , { noext: true } ]
	    , ["a?b", ["x/y/acb", "acb/"], {matchBase: true}
	      , ["x/y/acb", "acb/", "acb/d/e", "x/y/acb/d"] ]
	    , ["#*", ["#a", "#b"], {nocomment: true}, ["#a", "#b", "c#d"]]
	
	
	    // begin channelling Boole and deMorgan...
	    , "negation tests"
	    , function () {
	        files = ["d", "e", "!ab", "!abc", "a!b", "\\!a"]
	      }
	
	    // anything that is NOT a* matches.
	    , ["!a*", ["\\!a", "d", "e", "!ab", "!abc"]]
	
	    // anything that IS !a* matches.
	    , ["!a*", ["!ab", "!abc"], {nonegate: true}]
	
	    // anything that IS a* matches
	    , ["!!a*", ["a!b"]]
	
	    // anything that is NOT !a* matches
	    , ["!\\!a*", ["a!b", "d", "e", "\\!a"]]
	
	    // negation nestled within a pattern
	    , function () {
	        files = [ "foo.js"
	                , "foo.bar"
	                // can't match this one without negative lookbehind.
	                , "foo.js.js"
	                , "blar.js"
	                , "foo."
	                , "boo.js.boo" ]
	      }
	    , ["*.!(js)", ["foo.bar", "foo.", "boo.js.boo"] ]
	
	    ].forEach(function (c) {
	      if (typeof c === "function") return c()
	      if (typeof c === "string") return t.comment(c)
	
	      var pattern = c[0]
	        , expect = c[1].sort(alpha)
	        , options = c[2] || {}
	        , f = c[3] || files
	        , tapOpts = c[4] || {}
	
	      // options.debug = true
	      var Class = mm.defaults(options).Minimatch
	      var m = new Class(pattern, {})
	      var r = m.makeRe()
	      tapOpts.re = String(r) || JSON.stringify(r)
	      tapOpts.files = JSON.stringify(f)
	      tapOpts.pattern = pattern
	      tapOpts.set = m.set
	      tapOpts.negated = m.negate
	
	      var actual = mm.match(f, pattern, options)
	      actual.sort(alpha)
	
	      t.equivalent( actual, expect
	                  , JSON.stringify(pattern) + " " + JSON.stringify(expect)
	                  , tapOpts )
	    })
	
	  t.comment("time=" + (Date.now() - start) + "ms")
	  t.end()
	})
	
	tap.test("global leak test", function (t) {
	  var globalAfter = Object.keys(global)
	  t.equivalent(globalAfter, globalBefore, "no new globals, please")
	  t.end()
	})
	
	function alpha (a, b) {
	  return a > b ? 1 : -1
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var test = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).test
	var minimatch = __webpack_require__(73)
	
	test('extglob ending with statechar', function(t) {
	  t.notOk(minimatch('ax', 'a?(b*)'))
	  t.ok(minimatch('ax', '?(a*|b)'))
	  t.end()
	})


/***/ },
/* 83 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 84 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	var argv = process.argv;
	
	module.exports = (function () {
		if (argv.indexOf('--no-color') !== -1 ||
			argv.indexOf('--no-colors') !== -1 ||
			argv.indexOf('--color=false') !== -1) {
			return false;
		}
	
		if (argv.indexOf('--color') !== -1 ||
			argv.indexOf('--colors') !== -1 ||
			argv.indexOf('--color=true') !== -1 ||
			argv.indexOf('--color=always') !== -1) {
			return true;
		}
	
		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}
	
		if (process.platform === 'win32') {
			return true;
		}
	
		if ('COLORTERM' in process.env) {
			return true;
		}
	
		if (process.env.TERM === 'dumb') {
			return false;
		}
	
		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}
	
		return false;
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	var color = Base.color;
	
	/**
	 * Expose `Dot`.
	 */
	
	exports = module.exports = Dot;
	
	/**
	 * Initialize a new `Dot` matrix test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Dot(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var n = -1;
	
	  runner.on('start', function() {
	    process.stdout.write('\n');
	  });
	
	  runner.on('pending', function() {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    process.stdout.write(color('pending', Base.symbols.dot));
	  });
	
	  runner.on('pass', function(test) {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    if (test.speed === 'slow') {
	      process.stdout.write(color('bright yellow', Base.symbols.dot));
	    } else {
	      process.stdout.write(color(test.speed, Base.symbols.dot));
	    }
	  });
	
	  runner.on('fail', function() {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    process.stdout.write(color('fail', Base.symbols.dot));
	  });
	
	  runner.on('end', function() {
	    console.log();
	    self.epilogue();
	  });
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Dot, Base);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var utils = __webpack_require__(63);
	
	/**
	 * Expose `Doc`.
	 */
	
	exports = module.exports = Doc;
	
	/**
	 * Initialize a new `Doc` reporter.
	 *
	 * @param {Runner} runner
	 * @api public
	 */
	function Doc(runner) {
	  Base.call(this, runner);
	
	  var indents = 2;
	
	  function indent() {
	    return Array(indents).join('  ');
	  }
	
	  runner.on('suite', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    ++indents;
	    console.log('%s<section class="suite">', indent());
	    ++indents;
	    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));
	    console.log('%s<dl>', indent());
	  });
	
	  runner.on('suite end', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    console.log('%s</dl>', indent());
	    --indents;
	    console.log('%s</section>', indent());
	    --indents;
	  });
	
	  runner.on('pass', function(test) {
	    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));
	    var code = utils.escape(utils.clean(test.body));
	    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);
	  });
	
	  runner.on('fail', function(test, err) {
	    console.log('%s  <dt class="error">%s</dt>', indent(), utils.escape(test.title));
	    var code = utils.escape(utils.clean(test.fn.body));
	    console.log('%s  <dd class="error"><pre><code>%s</code></pre></dd>', indent(), code);
	    console.log('%s  <dd class="error">%s</dd>', indent(), utils.escape(err));
	  });
	}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	
	/**
	 * Expose `TAP`.
	 */
	
	exports = module.exports = TAP;
	
	/**
	 * Initialize a new `TAP` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function TAP(runner) {
	  Base.call(this, runner);
	
	  var n = 1;
	  var passes = 0;
	  var failures = 0;
	
	  runner.on('start', function() {
	    var total = runner.grepTotal(runner.suite);
	    console.log('%d..%d', 1, total);
	  });
	
	  runner.on('test end', function() {
	    ++n;
	  });
	
	  runner.on('pending', function(test) {
	    console.log('ok %d %s # SKIP -', n, title(test));
	  });
	
	  runner.on('pass', function(test) {
	    passes++;
	    console.log('ok %d %s', n, title(test));
	  });
	
	  runner.on('fail', function(test, err) {
	    failures++;
	    console.log('not ok %d %s', n, title(test));
	    if (err.stack) {
	      console.log(err.stack.replace(/^/gm, '  '));
	    }
	  });
	
	  runner.on('end', function() {
	    console.log('# tests ' + (passes + failures));
	    console.log('# pass ' + passes);
	    console.log('# fail ' + failures);
	  });
	}
	
	/**
	 * Return a TAP-safe title of `test`
	 *
	 * @api private
	 * @param {Object} test
	 * @return {String}
	 */
	function title(test) {
	  return test.fullTitle().replace(/#/g, '');
	}


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	
	/**
	 * Expose `JSON`.
	 */
	
	exports = module.exports = JSONReporter;
	
	/**
	 * Initialize a new `JSON` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function JSONReporter(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var tests = [];
	  var pending = [];
	  var failures = [];
	  var passes = [];
	
	  runner.on('test end', function(test) {
	    tests.push(test);
	  });
	
	  runner.on('pass', function(test) {
	    passes.push(test);
	  });
	
	  runner.on('fail', function(test) {
	    failures.push(test);
	  });
	
	  runner.on('pending', function(test) {
	    pending.push(test);
	  });
	
	  runner.on('end', function() {
	    var obj = {
	      stats: self.stats,
	      tests: tests.map(clean),
	      pending: pending.map(clean),
	      failures: failures.map(clean),
	      passes: passes.map(clean)
	    };
	
	    runner.testResults = obj;
	
	    process.stdout.write(JSON.stringify(obj, null, 2));
	  });
	}
	
	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    title: test.title,
	    fullTitle: test.fullTitle(),
	    duration: test.duration,
	    currentRetry: test.currentRetry(),
	    err: errorJSON(test.err || {})
	  };
	}
	
	/**
	 * Transform `error` into a JSON object.
	 *
	 * @api private
	 * @param {Error} err
	 * @return {Object}
	 */
	function errorJSON(err) {
	  var res = {};
	  Object.getOwnPropertyNames(err).forEach(function(key) {
	    res[key] = err[key];
	  }, err);
	  return res;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint-env browser */
	
	/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var utils = __webpack_require__(63);
	var Progress = __webpack_require__(91);
	var escapeRe = __webpack_require__(56);
	var escape = utils.escape;
	
	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */
	
	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */
	
	/**
	 * Expose `HTML`.
	 */
	
	exports = module.exports = HTML;
	
	/**
	 * Stats template.
	 */
	
	var statsTemplate = '<ul id="mocha-stats">'
	  + '<li class="progress"><canvas width="40" height="40"></canvas></li>'
	  + '<li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li>'
	  + '<li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li>'
	  + '<li class="duration">duration: <em>0</em>s</li>'
	  + '</ul>';
	
	/**
	 * Initialize a new `HTML` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function HTML(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var stats = this.stats;
	  var stat = fragment(statsTemplate);
	  var items = stat.getElementsByTagName('li');
	  var passes = items[1].getElementsByTagName('em')[0];
	  var passesLink = items[1].getElementsByTagName('a')[0];
	  var failures = items[2].getElementsByTagName('em')[0];
	  var failuresLink = items[2].getElementsByTagName('a')[0];
	  var duration = items[3].getElementsByTagName('em')[0];
	  var canvas = stat.getElementsByTagName('canvas')[0];
	  var report = fragment('<ul id="mocha-report"></ul>');
	  var stack = [report];
	  var progress;
	  var ctx;
	  var root = document.getElementById('mocha');
	
	  if (canvas.getContext) {
	    var ratio = window.devicePixelRatio || 1;
	    canvas.style.width = canvas.width;
	    canvas.style.height = canvas.height;
	    canvas.width *= ratio;
	    canvas.height *= ratio;
	    ctx = canvas.getContext('2d');
	    ctx.scale(ratio, ratio);
	    progress = new Progress();
	  }
	
	  if (!root) {
	    return error('#mocha div missing, add it to your document');
	  }
	
	  // pass toggle
	  on(passesLink, 'click', function() {
	    unhide();
	    var name = (/pass/).test(report.className) ? '' : ' pass';
	    report.className = report.className.replace(/fail|pass/g, '') + name;
	    if (report.className.trim()) {
	      hideSuitesWithout('test pass');
	    }
	  });
	
	  // failure toggle
	  on(failuresLink, 'click', function() {
	    unhide();
	    var name = (/fail/).test(report.className) ? '' : ' fail';
	    report.className = report.className.replace(/fail|pass/g, '') + name;
	    if (report.className.trim()) {
	      hideSuitesWithout('test fail');
	    }
	  });
	
	  root.appendChild(stat);
	  root.appendChild(report);
	
	  if (progress) {
	    progress.size(40);
	  }
	
	  runner.on('suite', function(suite) {
	    if (suite.root) {
	      return;
	    }
	
	    // suite
	    var url = self.suiteURL(suite);
	    var el = fragment('<li class="suite"><h1><a href="%s">%s</a></h1></li>', url, escape(suite.title));
	
	    // container
	    stack[0].appendChild(el);
	    stack.unshift(document.createElement('ul'));
	    el.appendChild(stack[0]);
	  });
	
	  runner.on('suite end', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    stack.shift();
	  });
	
	  runner.on('fail', function(test) {
	    // For type = 'test' its possible that the test failed due to multiple
	    // done() calls. So report the issue here.
	    if (test.type === 'hook'
	      || test.type === 'test') {
	      runner.emit('test end', test);
	    }
	  });
	
	  runner.on('test end', function(test) {
	    // TODO: add to stats
	    var percent = stats.tests / this.total * 100 | 0;
	    if (progress) {
	      progress.update(percent).draw(ctx);
	    }
	
	    // update stats
	    var ms = new Date() - stats.start;
	    text(passes, stats.passes);
	    text(failures, stats.failures);
	    text(duration, (ms / 1000).toFixed(2));
	
	    // test
	    var el;
	    if (test.state === 'passed') {
	      var url = self.testURL(test);
	      el = fragment('<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">‣</a></h2></li>', test.speed, test.title, test.duration, url);
	    } else if (test.pending) {
	      el = fragment('<li class="test pass pending"><h2>%e</h2></li>', test.title);
	    } else {
	      el = fragment('<li class="test fail"><h2>%e <a href="%e" class="replay">‣</a></h2></li>', test.title, self.testURL(test));
	      var stackString; // Note: Includes leading newline
	      var message = test.err.toString();
	
	      // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
	      // check for the result of the stringifying.
	      if (message === '[object Error]') {
	        message = test.err.message;
	      }
	
	      if (test.err.stack) {
	        var indexOfMessage = test.err.stack.indexOf(test.err.message);
	        if (indexOfMessage === -1) {
	          stackString = test.err.stack;
	        } else {
	          stackString = test.err.stack.substr(test.err.message.length + indexOfMessage);
	        }
	      } else if (test.err.sourceURL && test.err.line !== undefined) {
	        // Safari doesn't give you a stack. Let's at least provide a source line.
	        stackString = '\n(' + test.err.sourceURL + ':' + test.err.line + ')';
	      }
	
	      stackString = stackString || '';
	
	      if (test.err.htmlMessage && stackString) {
	        el.appendChild(fragment('<div class="html-error">%s\n<pre class="error">%e</pre></div>', test.err.htmlMessage, stackString));
	      } else if (test.err.htmlMessage) {
	        el.appendChild(fragment('<div class="html-error">%s</div>', test.err.htmlMessage));
	      } else {
	        el.appendChild(fragment('<pre class="error">%e%e</pre>', message, stackString));
	      }
	    }
	
	    // toggle code
	    // TODO: defer
	    if (!test.pending) {
	      var h2 = el.getElementsByTagName('h2')[0];
	
	      on(h2, 'click', function() {
	        pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
	      });
	
	      var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.body));
	      el.appendChild(pre);
	      pre.style.display = 'none';
	    }
	
	    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.
	    if (stack[0]) {
	      stack[0].appendChild(el);
	    }
	  });
	}
	
	/**
	 * Makes a URL, preserving querystring ("search") parameters.
	 *
	 * @param {string} s
	 * @return {string} A new URL.
	 */
	function makeUrl(s) {
	  var search = window.location.search;
	
	  // Remove previous grep query parameter if present
	  if (search) {
	    search = search.replace(/[?&]grep=[^&\s]*/g, '').replace(/^&/, '?');
	  }
	
	  return window.location.pathname + (search ? search + '&' : '?') + 'grep=' + encodeURIComponent(escapeRe(s));
	}
	
	/**
	 * Provide suite URL.
	 *
	 * @param {Object} [suite]
	 */
	HTML.prototype.suiteURL = function(suite) {
	  return makeUrl(suite.fullTitle());
	};
	
	/**
	 * Provide test URL.
	 *
	 * @param {Object} [test]
	 */
	HTML.prototype.testURL = function(test) {
	  return makeUrl(test.fullTitle());
	};
	
	/**
	 * Display error `msg`.
	 *
	 * @param {string} msg
	 */
	function error(msg) {
	  document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
	}
	
	/**
	 * Return a DOM fragment from `html`.
	 *
	 * @param {string} html
	 */
	function fragment(html) {
	  var args = arguments;
	  var div = document.createElement('div');
	  var i = 1;
	
	  div.innerHTML = html.replace(/%([se])/g, function(_, type) {
	    switch (type) {
	      case 's': return String(args[i++]);
	      case 'e': return escape(args[i++]);
	      // no default
	    }
	  });
	
	  return div.firstChild;
	}
	
	/**
	 * Check for suites that do not have elements
	 * with `classname`, and hide them.
	 *
	 * @param {text} classname
	 */
	function hideSuitesWithout(classname) {
	  var suites = document.getElementsByClassName('suite');
	  for (var i = 0; i < suites.length; i++) {
	    var els = suites[i].getElementsByClassName(classname);
	    if (!els.length) {
	      suites[i].className += ' hidden';
	    }
	  }
	}
	
	/**
	 * Unhide .hidden suites.
	 */
	function unhide() {
	  var els = document.getElementsByClassName('suite hidden');
	  for (var i = 0; i < els.length; ++i) {
	    els[i].className = els[i].className.replace('suite hidden', 'suite');
	  }
	}
	
	/**
	 * Set an element's text contents.
	 *
	 * @param {HTMLElement} el
	 * @param {string} contents
	 */
	function text(el, contents) {
	  if (el.textContent) {
	    el.textContent = contents;
	  } else {
	    el.innerText = contents;
	  }
	}
	
	/**
	 * Listen on `event` with callback `fn`.
	 */
	function on(el, event, fn) {
	  if (el.addEventListener) {
	    el.addEventListener(event, fn, false);
	  } else {
	    el.attachEvent('on' + event, fn);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * Expose `Progress`.
	 */
	
	module.exports = Progress;
	
	/**
	 * Initialize a new `Progress` indicator.
	 */
	function Progress() {
	  this.percent = 0;
	  this.size(0);
	  this.fontSize(11);
	  this.font('helvetica, arial, sans-serif');
	}
	
	/**
	 * Set progress size to `size`.
	 *
	 * @api public
	 * @param {number} size
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.size = function(size) {
	  this._size = size;
	  return this;
	};
	
	/**
	 * Set text to `text`.
	 *
	 * @api public
	 * @param {string} text
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.text = function(text) {
	  this._text = text;
	  return this;
	};
	
	/**
	 * Set font size to `size`.
	 *
	 * @api public
	 * @param {number} size
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.fontSize = function(size) {
	  this._fontSize = size;
	  return this;
	};
	
	/**
	 * Set font to `family`.
	 *
	 * @param {string} family
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.font = function(family) {
	  this._font = family;
	  return this;
	};
	
	/**
	 * Update percentage to `n`.
	 *
	 * @param {number} n
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.update = function(n) {
	  this.percent = n;
	  return this;
	};
	
	/**
	 * Draw on `ctx`.
	 *
	 * @param {CanvasRenderingContext2d} ctx
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.draw = function(ctx) {
	  try {
	    var percent = Math.min(this.percent, 100);
	    var size = this._size;
	    var half = size / 2;
	    var x = half;
	    var y = half;
	    var rad = half - 1;
	    var fontSize = this._fontSize;
	
	    ctx.font = fontSize + 'px ' + this._font;
	
	    var angle = Math.PI * 2 * (percent / 100);
	    ctx.clearRect(0, 0, size, size);
	
	    // outer circle
	    ctx.strokeStyle = '#9f9f9f';
	    ctx.beginPath();
	    ctx.arc(x, y, rad, 0, angle, false);
	    ctx.stroke();
	
	    // inner circle
	    ctx.strokeStyle = '#eee';
	    ctx.beginPath();
	    ctx.arc(x, y, rad - 1, 0, angle, true);
	    ctx.stroke();
	
	    // text
	    var text = this._text || (percent | 0) + '%';
	    var w = ctx.measureText(text).width;
	
	    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
	  } catch (err) {
	    // don't fail if we can't render progress
	  }
	  return this;
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	var color = Base.color;
	var cursor = Base.cursor;
	
	/**
	 * Expose `List`.
	 */
	
	exports = module.exports = List;
	
	/**
	 * Initialize a new `List` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function List(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var n = 0;
	
	  runner.on('start', function() {
	    console.log();
	  });
	
	  runner.on('test', function(test) {
	    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));
	  });
	
	  runner.on('pending', function(test) {
	    var fmt = color('checkmark', '  -')
	      + color('pending', ' %s');
	    console.log(fmt, test.fullTitle());
	  });
	
	  runner.on('pass', function(test) {
	    var fmt = color('checkmark', '  ' + Base.symbols.dot)
	      + color('pass', ' %s: ')
	      + color(test.speed, '%dms');
	    cursor.CR();
	    console.log(fmt, test.fullTitle(), test.duration);
	  });
	
	  runner.on('fail', function(test) {
	    cursor.CR();
	    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());
	  });
	
	  runner.on('end', self.epilogue.bind(self));
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(List, Base);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	
	/**
	 * Expose `Min`.
	 */
	
	exports = module.exports = Min;
	
	/**
	 * Initialize a new `Min` minimal test reporter (best used with --watch).
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Min(runner) {
	  Base.call(this, runner);
	
	  runner.on('start', function() {
	    // clear screen
	    process.stdout.write('\u001b[2J');
	    // set cursor position
	    process.stdout.write('\u001b[1;3H');
	  });
	
	  runner.on('end', this.epilogue.bind(this));
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Min, Base);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	var color = Base.color;
	var cursor = Base.cursor;
	
	/**
	 * Expose `Spec`.
	 */
	
	exports = module.exports = Spec;
	
	/**
	 * Initialize a new `Spec` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Spec(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var indents = 0;
	  var n = 0;
	
	  function indent() {
	    return Array(indents).join('  ');
	  }
	
	  runner.on('start', function() {
	    console.log();
	  });
	
	  runner.on('suite', function(suite) {
	    ++indents;
	    console.log(color('suite', '%s%s'), indent(), suite.title);
	  });
	
	  runner.on('suite end', function() {
	    --indents;
	    if (indents === 1) {
	      console.log();
	    }
	  });
	
	  runner.on('pending', function(test) {
	    var fmt = indent() + color('pending', '  - %s');
	    console.log(fmt, test.title);
	  });
	
	  runner.on('pass', function(test) {
	    var fmt;
	    if (test.speed === 'fast') {
	      fmt = indent()
	        + color('checkmark', '  ' + Base.symbols.ok)
	        + color('pass', ' %s');
	      cursor.CR();
	      console.log(fmt, test.title);
	    } else {
	      fmt = indent()
	        + color('checkmark', '  ' + Base.symbols.ok)
	        + color('pass', ' %s')
	        + color(test.speed, ' (%dms)');
	      cursor.CR();
	      console.log(fmt, test.title, test.duration);
	    }
	  });
	
	  runner.on('fail', function(test) {
	    cursor.CR();
	    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
	  });
	
	  runner.on('end', self.epilogue.bind(self));
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Spec, Base);


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	
	/**
	 * Expose `Dot`.
	 */
	
	exports = module.exports = NyanCat;
	
	/**
	 * Initialize a new `Dot` matrix test reporter.
	 *
	 * @param {Runner} runner
	 * @api public
	 */
	
	function NyanCat(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var nyanCatWidth = this.nyanCatWidth = 11;
	
	  this.colorIndex = 0;
	  this.numberOfLines = 4;
	  this.rainbowColors = self.generateColors();
	  this.scoreboardWidth = 5;
	  this.tick = 0;
	  this.trajectories = [[], [], [], []];
	  this.trajectoryWidthMax = (width - nyanCatWidth);
	
	  runner.on('start', function() {
	    Base.cursor.hide();
	    self.draw();
	  });
	
	  runner.on('pending', function() {
	    self.draw();
	  });
	
	  runner.on('pass', function() {
	    self.draw();
	  });
	
	  runner.on('fail', function() {
	    self.draw();
	  });
	
	  runner.on('end', function() {
	    Base.cursor.show();
	    for (var i = 0; i < self.numberOfLines; i++) {
	      write('\n');
	    }
	    self.epilogue();
	  });
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(NyanCat, Base);
	
	/**
	 * Draw the nyan cat
	 *
	 * @api private
	 */
	
	NyanCat.prototype.draw = function() {
	  this.appendRainbow();
	  this.drawScoreboard();
	  this.drawRainbow();
	  this.drawNyanCat();
	  this.tick = !this.tick;
	};
	
	/**
	 * Draw the "scoreboard" showing the number
	 * of passes, failures and pending tests.
	 *
	 * @api private
	 */
	
	NyanCat.prototype.drawScoreboard = function() {
	  var stats = this.stats;
	
	  function draw(type, n) {
	    write(' ');
	    write(Base.color(type, n));
	    write('\n');
	  }
	
	  draw('green', stats.passes);
	  draw('fail', stats.failures);
	  draw('pending', stats.pending);
	  write('\n');
	
	  this.cursorUp(this.numberOfLines);
	};
	
	/**
	 * Append the rainbow.
	 *
	 * @api private
	 */
	
	NyanCat.prototype.appendRainbow = function() {
	  var segment = this.tick ? '_' : '-';
	  var rainbowified = this.rainbowify(segment);
	
	  for (var index = 0; index < this.numberOfLines; index++) {
	    var trajectory = this.trajectories[index];
	    if (trajectory.length >= this.trajectoryWidthMax) {
	      trajectory.shift();
	    }
	    trajectory.push(rainbowified);
	  }
	};
	
	/**
	 * Draw the rainbow.
	 *
	 * @api private
	 */
	
	NyanCat.prototype.drawRainbow = function() {
	  var self = this;
	
	  this.trajectories.forEach(function(line) {
	    write('\u001b[' + self.scoreboardWidth + 'C');
	    write(line.join(''));
	    write('\n');
	  });
	
	  this.cursorUp(this.numberOfLines);
	};
	
	/**
	 * Draw the nyan cat
	 *
	 * @api private
	 */
	NyanCat.prototype.drawNyanCat = function() {
	  var self = this;
	  var startWidth = this.scoreboardWidth + this.trajectories[0].length;
	  var dist = '\u001b[' + startWidth + 'C';
	  var padding = '';
	
	  write(dist);
	  write('_,------,');
	  write('\n');
	
	  write(dist);
	  padding = self.tick ? '  ' : '   ';
	  write('_|' + padding + '/\\_/\\ ');
	  write('\n');
	
	  write(dist);
	  padding = self.tick ? '_' : '__';
	  var tail = self.tick ? '~' : '^';
	  write(tail + '|' + padding + this.face() + ' ');
	  write('\n');
	
	  write(dist);
	  padding = self.tick ? ' ' : '  ';
	  write(padding + '""  "" ');
	  write('\n');
	
	  this.cursorUp(this.numberOfLines);
	};
	
	/**
	 * Draw nyan cat face.
	 *
	 * @api private
	 * @return {string}
	 */
	
	NyanCat.prototype.face = function() {
	  var stats = this.stats;
	  if (stats.failures) {
	    return '( x .x)';
	  } else if (stats.pending) {
	    return '( o .o)';
	  } else if (stats.passes) {
	    return '( ^ .^)';
	  }
	  return '( - .-)';
	};
	
	/**
	 * Move cursor up `n`.
	 *
	 * @api private
	 * @param {number} n
	 */
	
	NyanCat.prototype.cursorUp = function(n) {
	  write('\u001b[' + n + 'A');
	};
	
	/**
	 * Move cursor down `n`.
	 *
	 * @api private
	 * @param {number} n
	 */
	
	NyanCat.prototype.cursorDown = function(n) {
	  write('\u001b[' + n + 'B');
	};
	
	/**
	 * Generate rainbow colors.
	 *
	 * @api private
	 * @return {Array}
	 */
	NyanCat.prototype.generateColors = function() {
	  var colors = [];
	
	  for (var i = 0; i < (6 * 7); i++) {
	    var pi3 = Math.floor(Math.PI / 3);
	    var n = (i * (1.0 / 6));
	    var r = Math.floor(3 * Math.sin(n) + 3);
	    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
	    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
	    colors.push(36 * r + 6 * g + b + 16);
	  }
	
	  return colors;
	};
	
	/**
	 * Apply rainbow to the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	NyanCat.prototype.rainbowify = function(str) {
	  if (!Base.useColors) {
	    return str;
	  }
	  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
	  this.colorIndex += 1;
	  return '\u001b[38;5;' + color + 'm' + str + '\u001b[0m';
	};
	
	/**
	 * Stdout helper.
	 *
	 * @param {string} string A message to write to stdout.
	 */
	function write(string) {
	  process.stdout.write(string);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var utils = __webpack_require__(63);
	var inherits = utils.inherits;
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var escape = utils.escape;
	var mkdirp = __webpack_require__(97);
	var path = __webpack_require__(57);
	
	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */
	
	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */
	
	/**
	 * Expose `XUnit`.
	 */
	
	exports = module.exports = XUnit;
	
	/**
	 * Initialize a new `XUnit` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function XUnit(runner, options) {
	  Base.call(this, runner);
	
	  var stats = this.stats;
	  var tests = [];
	  var self = this;
	
	  if (options.reporterOptions && options.reporterOptions.output) {
	    if (!fs.createWriteStream) {
	      throw new Error('file output not supported in browser');
	    }
	    mkdirp.sync(path.dirname(options.reporterOptions.output));
	    self.fileStream = fs.createWriteStream(options.reporterOptions.output);
	  }
	
	  runner.on('pending', function(test) {
	    tests.push(test);
	  });
	
	  runner.on('pass', function(test) {
	    tests.push(test);
	  });
	
	  runner.on('fail', function(test) {
	    tests.push(test);
	  });
	
	  runner.on('end', function() {
	    self.write(tag('testsuite', {
	      name: 'Mocha Tests',
	      tests: stats.tests,
	      failures: stats.failures,
	      errors: stats.failures,
	      skipped: stats.tests - stats.failures - stats.passes,
	      timestamp: (new Date()).toUTCString(),
	      time: (stats.duration / 1000) || 0
	    }, false));
	
	    tests.forEach(function(t) {
	      self.test(t);
	    });
	
	    self.write('</testsuite>');
	  });
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(XUnit, Base);
	
	/**
	 * Override done to close the stream (if it's a file).
	 *
	 * @param failures
	 * @param {Function} fn
	 */
	XUnit.prototype.done = function(failures, fn) {
	  if (this.fileStream) {
	    this.fileStream.end(function() {
	      fn(failures);
	    });
	  } else {
	    fn(failures);
	  }
	};
	
	/**
	 * Write out the given line.
	 *
	 * @param {string} line
	 */
	XUnit.prototype.write = function(line) {
	  if (this.fileStream) {
	    this.fileStream.write(line + '\n');
	  } else if (typeof process === 'object' && process.stdout) {
	    process.stdout.write(line + '\n');
	  } else {
	    console.log(line);
	  }
	};
	
	/**
	 * Output tag for the given `test.`
	 *
	 * @param {Test} test
	 */
	XUnit.prototype.test = function(test) {
	  var attrs = {
	    classname: test.parent.fullTitle(),
	    name: test.title,
	    time: (test.duration / 1000) || 0
	  };
	
	  if (test.state === 'failed') {
	    var err = test.err;
	    this.write(tag('testcase', attrs, false, tag('failure', {}, false, cdata(escape(err.message) + '\n' + err.stack))));
	  } else if (test.pending) {
	    this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));
	  } else {
	    this.write(tag('testcase', attrs, true));
	  }
	};
	
	/**
	 * HTML tag helper.
	 *
	 * @param name
	 * @param attrs
	 * @param close
	 * @param content
	 * @return {string}
	 */
	function tag(name, attrs, close, content) {
	  var end = close ? '/>' : '>';
	  var pairs = [];
	  var tag;
	
	  for (var key in attrs) {
	    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
	      pairs.push(key + '="' + escape(attrs[key]) + '"');
	    }
	  }
	
	  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;
	  if (content) {
	    tag += content + '</' + name + end;
	  }
	  return tag;
	}
	
	/**
	 * Return cdata escaped CDATA `str`.
	 */
	
	function cdata(str) {
	  return '<![CDATA[' + escape(str) + ']]>';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(53)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(57);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var _0777 = parseInt('0777', 8);
	
	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
	
	function mkdirP (p, opts, f, made) {
	    if (typeof opts === 'function') {
	        f = opts;
	        opts = {};
	    }
	    else if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;
	    
	    var cb = f || function () {};
	    p = path.resolve(p);
	    
	    xfs.mkdir(p, mode, function (er) {
	        if (!er) {
	            made = made || p;
	            return cb(null, made);
	        }
	        switch (er.code) {
	            case 'ENOENT':
	                mkdirP(path.dirname(p), opts, function (er, made) {
	                    if (er) cb(er, made);
	                    else mkdirP(p, opts, cb, made);
	                });
	                break;
	
	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                xfs.stat(p, function (er2, stat) {
	                    // if the stat fails, then that's super weird.
	                    // let the original error be the failure reason.
	                    if (er2 || !stat.isDirectory()) cb(er, made)
	                    else cb(null, made);
	                });
	                break;
	        }
	    });
	}
	
	mkdirP.sync = function sync (p, opts, made) {
	    if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;
	
	    p = path.resolve(p);
	
	    try {
	        xfs.mkdirSync(p, mode);
	        made = made || p;
	    }
	    catch (err0) {
	        switch (err0.code) {
	            case 'ENOENT' :
	                made = sync(path.dirname(p), opts, made);
	                sync(p, opts, made);
	                break;
	
	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                var stat;
	                try {
	                    stat = xfs.statSync(p);
	                }
	                catch (err1) {
	                    throw err0;
	                }
	                if (!stat.isDirectory()) throw err0;
	                break;
	        }
	    }
	
	    return made;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var utils = __webpack_require__(63);
	
	/**
	 * Constants
	 */
	
	var SUITE_PREFIX = '$';
	
	/**
	 * Expose `Markdown`.
	 */
	
	exports = module.exports = Markdown;
	
	/**
	 * Initialize a new `Markdown` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Markdown(runner) {
	  Base.call(this, runner);
	
	  var level = 0;
	  var buf = '';
	
	  function title(str) {
	    return Array(level).join('#') + ' ' + str;
	  }
	
	  function mapTOC(suite, obj) {
	    var ret = obj;
	    var key = SUITE_PREFIX + suite.title;
	
	    obj = obj[key] = obj[key] || { suite: suite };
	    suite.suites.forEach(function(suite) {
	      mapTOC(suite, obj);
	    });
	
	    return ret;
	  }
	
	  function stringifyTOC(obj, level) {
	    ++level;
	    var buf = '';
	    var link;
	    for (var key in obj) {
	      if (key === 'suite') {
	        continue;
	      }
	      if (key !== SUITE_PREFIX) {
	        link = ' - [' + key.substring(1) + ']';
	        link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\n';
	        buf += Array(level).join('  ') + link;
	      }
	      buf += stringifyTOC(obj[key], level);
	    }
	    return buf;
	  }
	
	  function generateTOC(suite) {
	    var obj = mapTOC(suite, {});
	    return stringifyTOC(obj, 0);
	  }
	
	  generateTOC(runner.suite);
	
	  runner.on('suite', function(suite) {
	    ++level;
	    var slug = utils.slug(suite.fullTitle());
	    buf += '<a name="' + slug + '"></a>' + '\n';
	    buf += title(suite.title) + '\n';
	  });
	
	  runner.on('suite end', function() {
	    --level;
	  });
	
	  runner.on('pass', function(test) {
	    var code = utils.clean(test.body);
	    buf += test.title + '.\n';
	    buf += '\n```js\n';
	    buf += code + '\n';
	    buf += '```\n\n';
	  });
	
	  runner.on('end', function() {
	    process.stdout.write('# TOC\n');
	    process.stdout.write(generateTOC(runner.suite));
	    process.stdout.write(buf);
	  });
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	var color = Base.color;
	var cursor = Base.cursor;
	
	/**
	 * Expose `Progress`.
	 */
	
	exports = module.exports = Progress;
	
	/**
	 * General progress bar color.
	 */
	
	Base.colors.progress = 90;
	
	/**
	 * Initialize a new `Progress` bar test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 * @param {Object} options
	 */
	function Progress(runner, options) {
	  Base.call(this, runner);
	
	  var self = this;
	  var width = Base.window.width * .50 | 0;
	  var total = runner.total;
	  var complete = 0;
	  var lastN = -1;
	
	  // default chars
	  options = options || {};
	  options.open = options.open || '[';
	  options.complete = options.complete || '▬';
	  options.incomplete = options.incomplete || Base.symbols.dot;
	  options.close = options.close || ']';
	  options.verbose = false;
	
	  // tests started
	  runner.on('start', function() {
	    console.log();
	    cursor.hide();
	  });
	
	  // tests complete
	  runner.on('test end', function() {
	    complete++;
	
	    var percent = complete / total;
	    var n = width * percent | 0;
	    var i = width - n;
	
	    if (n === lastN && !options.verbose) {
	      // Don't re-render the line if it hasn't changed
	      return;
	    }
	    lastN = n;
	
	    cursor.CR();
	    process.stdout.write('\u001b[J');
	    process.stdout.write(color('progress', '  ' + options.open));
	    process.stdout.write(Array(n).join(options.complete));
	    process.stdout.write(Array(i).join(options.incomplete));
	    process.stdout.write(color('progress', options.close));
	    if (options.verbose) {
	      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
	    }
	  });
	
	  // tests are complete, output some stats
	  // and the failures if any
	  runner.on('end', function() {
	    cursor.show();
	    console.log();
	    self.epilogue();
	  });
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Progress, Base);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	var inherits = __webpack_require__(63).inherits;
	var cursor = Base.cursor;
	var color = Base.color;
	
	/**
	 * Expose `Landing`.
	 */
	
	exports = module.exports = Landing;
	
	/**
	 * Airplane color.
	 */
	
	Base.colors.plane = 0;
	
	/**
	 * Airplane crash color.
	 */
	
	Base.colors['plane crash'] = 31;
	
	/**
	 * Runway color.
	 */
	
	Base.colors.runway = 90;
	
	/**
	 * Initialize a new `Landing` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Landing(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var total = runner.total;
	  var stream = process.stdout;
	  var plane = color('plane', '✈');
	  var crashed = -1;
	  var n = 0;
	
	  function runway() {
	    var buf = Array(width).join('-');
	    return '  ' + color('runway', buf);
	  }
	
	  runner.on('start', function() {
	    stream.write('\n\n\n  ');
	    cursor.hide();
	  });
	
	  runner.on('test end', function(test) {
	    // check if the plane crashed
	    var col = crashed === -1 ? width * ++n / total | 0 : crashed;
	
	    // show the crash
	    if (test.state === 'failed') {
	      plane = color('plane crash', '✈');
	      crashed = col;
	    }
	
	    // render landing strip
	    stream.write('\u001b[' + (width + 1) + 'D\u001b[2A');
	    stream.write(runway());
	    stream.write('\n  ');
	    stream.write(color('runway', Array(col).join('⋅')));
	    stream.write(plane);
	    stream.write(color('runway', Array(width - col).join('⋅') + '\n'));
	    stream.write(runway());
	    stream.write('\u001b[0m');
	  });
	
	  runner.on('end', function() {
	    cursor.show();
	    console.log();
	    self.epilogue();
	  });
	}
	
	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Landing, Base);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	
	/**
	 * Expose `JSONCov`.
	 */
	
	exports = module.exports = JSONCov;
	
	/**
	 * Initialize a new `JsCoverage` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 * @param {boolean} output
	 */
	function JSONCov(runner, output) {
	  Base.call(this, runner);
	
	  output = arguments.length === 1 || output;
	  var self = this;
	  var tests = [];
	  var failures = [];
	  var passes = [];
	
	  runner.on('test end', function(test) {
	    tests.push(test);
	  });
	
	  runner.on('pass', function(test) {
	    passes.push(test);
	  });
	
	  runner.on('fail', function(test) {
	    failures.push(test);
	  });
	
	  runner.on('end', function() {
	    var cov = global._$jscoverage || {};
	    var result = self.cov = map(cov);
	    result.stats = self.stats;
	    result.tests = tests.map(clean);
	    result.failures = failures.map(clean);
	    result.passes = passes.map(clean);
	    if (!output) {
	      return;
	    }
	    process.stdout.write(JSON.stringify(result, null, 2));
	  });
	}
	
	/**
	 * Map jscoverage data to a JSON structure
	 * suitable for reporting.
	 *
	 * @api private
	 * @param {Object} cov
	 * @return {Object}
	 */
	
	function map(cov) {
	  var ret = {
	    instrumentation: 'node-jscoverage',
	    sloc: 0,
	    hits: 0,
	    misses: 0,
	    coverage: 0,
	    files: []
	  };
	
	  for (var filename in cov) {
	    if (Object.prototype.hasOwnProperty.call(cov, filename)) {
	      var data = coverage(filename, cov[filename]);
	      ret.files.push(data);
	      ret.hits += data.hits;
	      ret.misses += data.misses;
	      ret.sloc += data.sloc;
	    }
	  }
	
	  ret.files.sort(function(a, b) {
	    return a.filename.localeCompare(b.filename);
	  });
	
	  if (ret.sloc > 0) {
	    ret.coverage = (ret.hits / ret.sloc) * 100;
	  }
	
	  return ret;
	}
	
	/**
	 * Map jscoverage data for a single source file
	 * to a JSON structure suitable for reporting.
	 *
	 * @api private
	 * @param {string} filename name of the source file
	 * @param {Object} data jscoverage coverage data
	 * @return {Object}
	 */
	function coverage(filename, data) {
	  var ret = {
	    filename: filename,
	    coverage: 0,
	    hits: 0,
	    misses: 0,
	    sloc: 0,
	    source: {}
	  };
	
	  data.source.forEach(function(line, num) {
	    num++;
	
	    if (data[num] === 0) {
	      ret.misses++;
	      ret.sloc++;
	    } else if (data[num] !== undefined) {
	      ret.hits++;
	      ret.sloc++;
	    }
	
	    ret.source[num] = {
	      source: line,
	      coverage: data[num] === undefined ? '' : data[num]
	    };
	  });
	
	  ret.coverage = ret.hits / ret.sloc * 100;
	
	  return ret;
	}
	
	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    duration: test.duration,
	    currentRetry: test.currentRetry(),
	    fullTitle: test.fullTitle(),
	    title: test.title
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(53)))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname, process) {/**
	 * Module dependencies.
	 */
	
	var JSONCov = __webpack_require__(101);
	var readFileSync = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync;
	var join = __webpack_require__(57).join;
	
	/**
	 * Expose `HTMLCov`.
	 */
	
	exports = module.exports = HTMLCov;
	
	/**
	 * Initialize a new `JsCoverage` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function HTMLCov(runner) {
	  var jade = __webpack_require__(103);
	  var file = join(__dirname, '/templates/coverage.jade');
	  var str = readFileSync(file, 'utf8');
	  var fn = jade.compile(str, { filename: file });
	  var self = this;
	
	  JSONCov.call(this, runner, false);
	
	  runner.on('end', function() {
	    process.stdout.write(fn({
	      cov: self.cov,
	      coverageClass: coverageClass
	    }));
	  });
	}
	
	/**
	 * Return coverage class for a given coverage percentage.
	 *
	 * @api private
	 * @param {number} coveragePctg
	 * @return {string}
	 */
	function coverageClass(coveragePctg) {
	  if (coveragePctg >= 75) {
	    return 'high';
	  }
	  if (coveragePctg >= 50) {
	    return 'medium';
	  }
	  if (coveragePctg >= 25) {
	    return 'low';
	  }
	  return 'terrible';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(53)))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	module.exports = process.env.JADE_COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/jade\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(104);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Jade
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Parser = __webpack_require__(105)
	  , Lexer = __webpack_require__(106)
	  , Compiler = __webpack_require__(123)
	  , runtime = __webpack_require__(127)
	// if node
	  , fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	// end
	
	/**
	 * Library version.
	 */
	
	exports.version = '0.26.3';
	
	/**
	 * Expose self closing tags.
	 */
	
	exports.selfClosing = __webpack_require__(126);
	
	/**
	 * Default supported doctypes.
	 */
	
	exports.doctypes = __webpack_require__(125);
	
	/**
	 * Text filters.
	 */
	
	exports.filters = __webpack_require__(124);
	
	/**
	 * Utilities.
	 */
	
	exports.utils = __webpack_require__(128);
	
	/**
	 * Expose `Compiler`.
	 */
	
	exports.Compiler = Compiler;
	
	/**
	 * Expose `Parser`.
	 */
	
	exports.Parser = Parser;
	
	/**
	 * Expose `Lexer`.
	 */
	
	exports.Lexer = Lexer;
	
	/**
	 * Nodes.
	 */
	
	exports.nodes = __webpack_require__(107);
	
	/**
	 * Jade runtime helpers.
	 */
	
	exports.runtime = runtime;
	
	/**
	 * Template function cache.
	 */
	
	exports.cache = {};
	
	/**
	 * Parse the given `str` of jade and return a function body.
	 *
	 * @param {String} str
	 * @param {Object} options
	 * @return {String}
	 * @api private
	 */
	
	function parse(str, options){
	  try {
	    // Parse
	    var parser = new Parser(str, options.filename, options);
	
	    // Compile
	    var compiler = new (options.compiler || Compiler)(parser.parse(), options)
	      , js = compiler.compile();
	
	    // Debug compiler
	    if (options.debug) {
	      console.error('\nCompiled Function:\n\n\033[90m%s\033[0m', js.replace(/^/gm, '  '));
	    }
	
	    return ''
	      + 'var buf = [];\n'
	      + (options.self
	        ? 'var self = locals || {};\n' + js
	        : 'with (locals || {}) {\n' + js + '\n}\n')
	      + 'return buf.join("");';
	  } catch (err) {
	    parser = parser.context();
	    runtime.rethrow(err, parser.filename, parser.lexer.lineno);
	  }
	}
	
	/**
	 * Compile a `Function` representation of the given jade `str`.
	 *
	 * Options:
	 *
	 *   - `compileDebug` when `false` debugging code is stripped from the compiled template
	 *   - `client` when `true` the helper functions `escape()` etc will reference `jade.escape()`
	 *      for use with the Jade client-side runtime.js
	 *
	 * @param {String} str
	 * @param {Options} options
	 * @return {Function}
	 * @api public
	 */
	
	exports.compile = function(str, options){
	  var options = options || {}
	    , client = options.client
	    , filename = options.filename
	      ? JSON.stringify(options.filename)
	      : 'undefined'
	    , fn;
	
	  if (options.compileDebug !== false) {
	    fn = [
	        'var __jade = [{ lineno: 1, filename: ' + filename + ' }];'
	      , 'try {'
	      , parse(String(str), options)
	      , '} catch (err) {'
	      , '  rethrow(err, __jade[0].filename, __jade[0].lineno);'
	      , '}'
	    ].join('\n');
	  } else {
	    fn = parse(String(str), options);
	  }
	
	  if (client) {
	    fn = 'attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;\n' + fn;
	  }
	
	  fn = new Function('locals, attrs, escape, rethrow, merge', fn);
	
	  if (client) return fn;
	
	  return function(locals){
	    return fn(locals, runtime.attrs, runtime.escape, runtime.rethrow, runtime.merge);
	  };
	};
	
	/**
	 * Render the given `str` of jade and invoke
	 * the callback `fn(err, str)`.
	 *
	 * Options:
	 *
	 *   - `cache` enable template caching
	 *   - `filename` filename required for `include` / `extends` and caching
	 *
	 * @param {String} str
	 * @param {Object|Function} options or fn
	 * @param {Function} fn
	 * @api public
	 */
	
	exports.render = function(str, options, fn){
	  // swap args
	  if ('function' == typeof options) {
	    fn = options, options = {};
	  }
	
	  // cache requires .filename
	  if (options.cache && !options.filename) {
	    return fn(new Error('the "filename" option is required for caching'));
	  }
	
	  try {
	    var path = options.filename;
	    var tmpl = options.cache
	      ? exports.cache[path] || (exports.cache[path] = exports.compile(str, options))
	      : exports.compile(str, options);
	    fn(null, tmpl(options));
	  } catch (err) {
	    fn(err);
	  }
	};
	
	/**
	 * Render a Jade file at the given `path` and callback `fn(err, str)`.
	 *
	 * @param {String} path
	 * @param {Object|Function} options or callback
	 * @param {Function} fn
	 * @api public
	 */
	
	exports.renderFile = function(path, options, fn){
	  var key = path + ':string';
	
	  if ('function' == typeof options) {
	    fn = options, options = {};
	  }
	
	  try {
	    options.filename = path;
	    var str = options.cache
	      ? exports.cache[key] || (exports.cache[key] = fs.readFileSync(path, 'utf8'))
	      : fs.readFileSync(path, 'utf8');
	    exports.render(str, options, fn);
	  } catch (err) {
	    fn(err);
	  }
	};
	
	/**
	 * Express support.
	 */
	
	exports.__express = exports.renderFile;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - Parser
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Lexer = __webpack_require__(106)
	  , nodes = __webpack_require__(107);
	
	/**
	 * Initialize `Parser` with the given input `str` and `filename`.
	 *
	 * @param {String} str
	 * @param {String} filename
	 * @param {Object} options
	 * @api public
	 */
	
	var Parser = exports = module.exports = function Parser(str, filename, options){
	  this.input = str;
	  this.lexer = new Lexer(str, options);
	  this.filename = filename;
	  this.blocks = {};
	  this.mixins = {};
	  this.options = options;
	  this.contexts = [this];
	};
	
	/**
	 * Tags that may not contain tags.
	 */
	
	var textOnly = exports.textOnly = ['script', 'style'];
	
	/**
	 * Parser prototype.
	 */
	
	Parser.prototype = {
	
	  /**
	   * Push `parser` onto the context stack,
	   * or pop and return a `Parser`.
	   */
	
	  context: function(parser){
	    if (parser) {
	      this.contexts.push(parser);
	    } else {
	      return this.contexts.pop();
	    }
	  },
	
	  /**
	   * Return the next token object.
	   *
	   * @return {Object}
	   * @api private
	   */
	
	  advance: function(){
	    return this.lexer.advance();
	  },
	
	  /**
	   * Skip `n` tokens.
	   *
	   * @param {Number} n
	   * @api private
	   */
	
	  skip: function(n){
	    while (n--) this.advance();
	  },
	  
	  /**
	   * Single token lookahead.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  peek: function() {
	    return this.lookahead(1);
	  },
	  
	  /**
	   * Return lexer lineno.
	   *
	   * @return {Number}
	   * @api private
	   */
	  
	  line: function() {
	    return this.lexer.lineno;
	  },
	  
	  /**
	   * `n` token lookahead.
	   *
	   * @param {Number} n
	   * @return {Object}
	   * @api private
	   */
	  
	  lookahead: function(n){
	    return this.lexer.lookahead(n);
	  },
	  
	  /**
	   * Parse input returning a string of js for evaluation.
	   *
	   * @return {String}
	   * @api public
	   */
	  
	  parse: function(){
	    var block = new nodes.Block, parser;
	    block.line = this.line();
	
	    while ('eos' != this.peek().type) {
	      if ('newline' == this.peek().type) {
	        this.advance();
	      } else {
	        block.push(this.parseExpr());
	      }
	    }
	
	    if (parser = this.extending) {
	      this.context(parser);
	      var ast = parser.parse();
	      this.context();
	      // hoist mixins
	      for (var name in this.mixins)
	        ast.unshift(this.mixins[name]);
	      return ast;
	    }
	
	    return block;
	  },
	  
	  /**
	   * Expect the given type, or throw an exception.
	   *
	   * @param {String} type
	   * @api private
	   */
	  
	  expect: function(type){
	    if (this.peek().type === type) {
	      return this.advance();
	    } else {
	      throw new Error('expected "' + type + '", but got "' + this.peek().type + '"');
	    }
	  },
	  
	  /**
	   * Accept the given `type`.
	   *
	   * @param {String} type
	   * @api private
	   */
	  
	  accept: function(type){
	    if (this.peek().type === type) {
	      return this.advance();
	    }
	  },
	  
	  /**
	   *   tag
	   * | doctype
	   * | mixin
	   * | include
	   * | filter
	   * | comment
	   * | text
	   * | each
	   * | code
	   * | yield
	   * | id
	   * | class
	   * | interpolation
	   */
	  
	  parseExpr: function(){
	    switch (this.peek().type) {
	      case 'tag':
	        return this.parseTag();
	      case 'mixin':
	        return this.parseMixin();
	      case 'block':
	        return this.parseBlock();
	      case 'case':
	        return this.parseCase();
	      case 'when':
	        return this.parseWhen();
	      case 'default':
	        return this.parseDefault();
	      case 'extends':
	        return this.parseExtends();
	      case 'include':
	        return this.parseInclude();
	      case 'doctype':
	        return this.parseDoctype();
	      case 'filter':
	        return this.parseFilter();
	      case 'comment':
	        return this.parseComment();
	      case 'text':
	        return this.parseText();
	      case 'each':
	        return this.parseEach();
	      case 'code':
	        return this.parseCode();
	      case 'call':
	        return this.parseCall();
	      case 'interpolation':
	        return this.parseInterpolation();
	      case 'yield':
	        this.advance();
	        var block = new nodes.Block;
	        block.yield = true;
	        return block;
	      case 'id':
	      case 'class':
	        var tok = this.advance();
	        this.lexer.defer(this.lexer.tok('tag', 'div'));
	        this.lexer.defer(tok);
	        return this.parseExpr();
	      default:
	        throw new Error('unexpected token "' + this.peek().type + '"');
	    }
	  },
	  
	  /**
	   * Text
	   */
	  
	  parseText: function(){
	    var tok = this.expect('text')
	      , node = new nodes.Text(tok.val);
	    node.line = this.line();
	    return node;
	  },
	
	  /**
	   *   ':' expr
	   * | block
	   */
	
	  parseBlockExpansion: function(){
	    if (':' == this.peek().type) {
	      this.advance();
	      return new nodes.Block(this.parseExpr());
	    } else {
	      return this.block();
	    }
	  },
	
	  /**
	   * case
	   */
	
	  parseCase: function(){
	    var val = this.expect('case').val
	      , node = new nodes.Case(val);
	    node.line = this.line();
	    node.block = this.block();
	    return node;
	  },
	
	  /**
	   * when
	   */
	
	  parseWhen: function(){
	    var val = this.expect('when').val
	    return new nodes.Case.When(val, this.parseBlockExpansion());
	  },
	  
	  /**
	   * default
	   */
	
	  parseDefault: function(){
	    this.expect('default');
	    return new nodes.Case.When('default', this.parseBlockExpansion());
	  },
	
	  /**
	   * code
	   */
	  
	  parseCode: function(){
	    var tok = this.expect('code')
	      , node = new nodes.Code(tok.val, tok.buffer, tok.escape)
	      , block
	      , i = 1;
	    node.line = this.line();
	    while (this.lookahead(i) && 'newline' == this.lookahead(i).type) ++i;
	    block = 'indent' == this.lookahead(i).type;
	    if (block) {
	      this.skip(i-1);
	      node.block = this.block();
	    }
	    return node;
	  },
	  
	  /**
	   * comment
	   */
	  
	  parseComment: function(){
	    var tok = this.expect('comment')
	      , node;
	
	    if ('indent' == this.peek().type) {
	      node = new nodes.BlockComment(tok.val, this.block(), tok.buffer);
	    } else {
	      node = new nodes.Comment(tok.val, tok.buffer);
	    }
	
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * doctype
	   */
	  
	  parseDoctype: function(){
	    var tok = this.expect('doctype')
	      , node = new nodes.Doctype(tok.val);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * filter attrs? text-block
	   */
	  
	  parseFilter: function(){
	    var block
	      , tok = this.expect('filter')
	      , attrs = this.accept('attrs');
	
	    this.lexer.pipeless = true;
	    block = this.parseTextBlock();
	    this.lexer.pipeless = false;
	
	    var node = new nodes.Filter(tok.val, block, attrs && attrs.attrs);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * tag ':' attrs? block
	   */
	  
	  parseASTFilter: function(){
	    var block
	      , tok = this.expect('tag')
	      , attrs = this.accept('attrs');
	
	    this.expect(':');
	    block = this.block();
	
	    var node = new nodes.Filter(tok.val, block, attrs && attrs.attrs);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * each block
	   */
	  
	  parseEach: function(){
	    var tok = this.expect('each')
	      , node = new nodes.Each(tok.code, tok.val, tok.key);
	    node.line = this.line();
	    node.block = this.block();
	    return node;
	  },
	
	  /**
	   * 'extends' name
	   */
	
	  parseExtends: function(){
	    var path = __webpack_require__(57)
	      , fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	      , dirname = path.dirname
	      , basename = path.basename
	      , join = path.join;
	
	    if (!this.filename)
	      throw new Error('the "filename" option is required to extend templates');
	
	    var path = this.expect('extends').val.trim()
	      , dir = dirname(this.filename);
	
	    var path = join(dir, path + '.jade')
	      , str = fs.readFileSync(path, 'utf8')
	      , parser = new Parser(str, path, this.options);
	
	    parser.blocks = this.blocks;
	    parser.contexts = this.contexts;
	    this.extending = parser;
	
	    // TODO: null node
	    return new nodes.Literal('');
	  },
	
	  /**
	   * 'block' name block
	   */
	
	  parseBlock: function(){
	    var block = this.expect('block')
	      , mode = block.mode
	      , name = block.val.trim();
	
	    block = 'indent' == this.peek().type
	      ? this.block()
	      : new nodes.Block(new nodes.Literal(''));
	
	    var prev = this.blocks[name];
	
	    if (prev) {
	      switch (prev.mode) {
	        case 'append':
	          block.nodes = block.nodes.concat(prev.nodes);
	          prev = block;
	          break;
	        case 'prepend':
	          block.nodes = prev.nodes.concat(block.nodes);
	          prev = block;
	          break;
	      }
	    }
	
	    block.mode = mode;
	    return this.blocks[name] = prev || block;
	  },
	
	  /**
	   * include block?
	   */
	
	  parseInclude: function(){
	    var path = __webpack_require__(57)
	      , fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	      , dirname = path.dirname
	      , basename = path.basename
	      , join = path.join;
	
	    var path = this.expect('include').val.trim()
	      , dir = dirname(this.filename);
	
	    if (!this.filename)
	      throw new Error('the "filename" option is required to use includes');
	
	    // no extension
	    if (!~basename(path).indexOf('.')) {
	      path += '.jade';
	    }
	
	    // non-jade
	    if ('.jade' != path.substr(-5)) {
	      var path = join(dir, path)
	        , str = fs.readFileSync(path, 'utf8');
	      return new nodes.Literal(str);
	    }
	
	    var path = join(dir, path)
	      , str = fs.readFileSync(path, 'utf8')
	     , parser = new Parser(str, path, this.options);
	    parser.blocks = this.blocks;
	    parser.mixins = this.mixins;
	
	    this.context(parser);
	    var ast = parser.parse();
	    this.context();
	    ast.filename = path;
	
	    if ('indent' == this.peek().type) {
	      ast.includeBlock().push(this.block());
	    }
	
	    return ast;
	  },
	
	  /**
	   * call ident block
	   */
	
	  parseCall: function(){
	    var tok = this.expect('call')
	      , name = tok.val
	      , args = tok.args
	      , mixin = new nodes.Mixin(name, args, new nodes.Block, true);
	
	    this.tag(mixin);
	    if (mixin.block.isEmpty()) mixin.block = null;
	    return mixin;
	  },
	
	  /**
	   * mixin block
	   */
	
	  parseMixin: function(){
	    var tok = this.expect('mixin')
	      , name = tok.val
	      , args = tok.args
	      , mixin;
	
	    // definition
	    if ('indent' == this.peek().type) {
	      mixin = new nodes.Mixin(name, args, this.block(), false);
	      this.mixins[name] = mixin;
	      return mixin;
	    // call
	    } else {
	      return new nodes.Mixin(name, args, null, true);
	    }
	  },
	
	  /**
	   * indent (text | newline)* outdent
	   */
	
	  parseTextBlock: function(){
	    var block = new nodes.Block;
	    block.line = this.line();
	    var spaces = this.expect('indent').val;
	    if (null == this._spaces) this._spaces = spaces;
	    var indent = Array(spaces - this._spaces + 1).join(' ');
	    while ('outdent' != this.peek().type) {
	      switch (this.peek().type) {
	        case 'newline':
	          this.advance();
	          break;
	        case 'indent':
	          this.parseTextBlock().nodes.forEach(function(node){
	            block.push(node);
	          });
	          break;
	        default:
	          var text = new nodes.Text(indent + this.advance().val);
	          text.line = this.line();
	          block.push(text);
	      }
	    }
	
	    if (spaces == this._spaces) this._spaces = null;
	    this.expect('outdent');
	    return block;
	  },
	
	  /**
	   * indent expr* outdent
	   */
	  
	  block: function(){
	    var block = new nodes.Block;
	    block.line = this.line();
	    this.expect('indent');
	    while ('outdent' != this.peek().type) {
	      if ('newline' == this.peek().type) {
	        this.advance();
	      } else {
	        block.push(this.parseExpr());
	      }
	    }
	    this.expect('outdent');
	    return block;
	  },
	
	  /**
	   * interpolation (attrs | class | id)* (text | code | ':')? newline* block?
	   */
	  
	  parseInterpolation: function(){
	    var tok = this.advance();
	    var tag = new nodes.Tag(tok.val);
	    tag.buffer = true;
	    return this.tag(tag);
	  },
	
	  /**
	   * tag (attrs | class | id)* (text | code | ':')? newline* block?
	   */
	  
	  parseTag: function(){
	    // ast-filter look-ahead
	    var i = 2;
	    if ('attrs' == this.lookahead(i).type) ++i;
	    if (':' == this.lookahead(i).type) {
	      if ('indent' == this.lookahead(++i).type) {
	        return this.parseASTFilter();
	      }
	    }
	
	    var tok = this.advance()
	      , tag = new nodes.Tag(tok.val);
	
	    tag.selfClosing = tok.selfClosing;
	
	    return this.tag(tag);
	  },
	
	  /**
	   * Parse tag.
	   */
	
	  tag: function(tag){
	    var dot;
	
	    tag.line = this.line();
	
	    // (attrs | class | id)*
	    out:
	      while (true) {
	        switch (this.peek().type) {
	          case 'id':
	          case 'class':
	            var tok = this.advance();
	            tag.setAttribute(tok.type, "'" + tok.val + "'");
	            continue;
	          case 'attrs':
	            var tok = this.advance()
	              , obj = tok.attrs
	              , escaped = tok.escaped
	              , names = Object.keys(obj);
	
	            if (tok.selfClosing) tag.selfClosing = true;
	
	            for (var i = 0, len = names.length; i < len; ++i) {
	              var name = names[i]
	                , val = obj[name];
	              tag.setAttribute(name, val, escaped[name]);
	            }
	            continue;
	          default:
	            break out;
	        }
	      }
	
	    // check immediate '.'
	    if ('.' == this.peek().val) {
	      dot = tag.textOnly = true;
	      this.advance();
	    }
	
	    // (text | code | ':')?
	    switch (this.peek().type) {
	      case 'text':
	        tag.block.push(this.parseText());
	        break;
	      case 'code':
	        tag.code = this.parseCode();
	        break;
	      case ':':
	        this.advance();
	        tag.block = new nodes.Block;
	        tag.block.push(this.parseExpr());
	        break;
	    }
	
	    // newline*
	    while ('newline' == this.peek().type) this.advance();
	
	    tag.textOnly = tag.textOnly || ~textOnly.indexOf(tag.name);
	
	    // script special-case
	    if ('script' == tag.name) {
	      var type = tag.getAttribute('type');
	      if (!dot && type && 'text/javascript' != type.replace(/^['"]|['"]$/g, '')) {
	        tag.textOnly = false;
	      }
	    }
	
	    // block?
	    if ('indent' == this.peek().type) {
	      if (tag.textOnly) {
	        this.lexer.pipeless = true;
	        tag.block = this.parseTextBlock();
	        this.lexer.pipeless = false;
	      } else {
	        var block = this.block();
	        if (tag.block) {
	          for (var i = 0, len = block.nodes.length; i < len; ++i) {
	            tag.block.push(block.nodes[i]);
	          }
	        } else {
	          tag.block = block;
	        }
	      }
	    }
	    
	    return tag;
	  }
	};


/***/ },
/* 106 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - Lexer
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Initialize `Lexer` with the given `str`.
	 *
	 * Options:
	 *
	 *   - `colons` allow colons for attr delimiters
	 *
	 * @param {String} str
	 * @param {Object} options
	 * @api private
	 */
	
	var Lexer = module.exports = function Lexer(str, options) {
	  options = options || {};
	  this.input = str.replace(/\r\n|\r/g, '\n');
	  this.colons = options.colons;
	  this.deferredTokens = [];
	  this.lastIndents = 0;
	  this.lineno = 1;
	  this.stash = [];
	  this.indentStack = [];
	  this.indentRe = null;
	  this.pipeless = false;
	};
	
	/**
	 * Lexer prototype.
	 */
	
	Lexer.prototype = {
	  
	  /**
	   * Construct a token with the given `type` and `val`.
	   *
	   * @param {String} type
	   * @param {String} val
	   * @return {Object}
	   * @api private
	   */
	  
	  tok: function(type, val){
	    return {
	        type: type
	      , line: this.lineno
	      , val: val
	    }
	  },
	  
	  /**
	   * Consume the given `len` of input.
	   *
	   * @param {Number} len
	   * @api private
	   */
	  
	  consume: function(len){
	    this.input = this.input.substr(len);
	  },
	  
	  /**
	   * Scan for `type` with the given `regexp`.
	   *
	   * @param {String} type
	   * @param {RegExp} regexp
	   * @return {Object}
	   * @api private
	   */
	  
	  scan: function(regexp, type){
	    var captures;
	    if (captures = regexp.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok(type, captures[1]);
	    }
	  },
	  
	  /**
	   * Defer the given `tok`.
	   *
	   * @param {Object} tok
	   * @api private
	   */
	  
	  defer: function(tok){
	    this.deferredTokens.push(tok);
	  },
	  
	  /**
	   * Lookahead `n` tokens.
	   *
	   * @param {Number} n
	   * @return {Object}
	   * @api private
	   */
	  
	  lookahead: function(n){
	    var fetch = n - this.stash.length;
	    while (fetch-- > 0) this.stash.push(this.next());
	    return this.stash[--n];
	  },
	  
	  /**
	   * Return the indexOf `start` / `end` delimiters.
	   *
	   * @param {String} start
	   * @param {String} end
	   * @return {Number}
	   * @api private
	   */
	  
	  indexOfDelimiters: function(start, end){
	    var str = this.input
	      , nstart = 0
	      , nend = 0
	      , pos = 0;
	    for (var i = 0, len = str.length; i < len; ++i) {
	      if (start == str.charAt(i)) {
	        ++nstart;
	      } else if (end == str.charAt(i)) {
	        if (++nend == nstart) {
	          pos = i;
	          break;
	        }
	      }
	    }
	    return pos;
	  },
	  
	  /**
	   * Stashed token.
	   */
	  
	  stashed: function() {
	    return this.stash.length
	      && this.stash.shift();
	  },
	  
	  /**
	   * Deferred token.
	   */
	  
	  deferred: function() {
	    return this.deferredTokens.length 
	      && this.deferredTokens.shift();
	  },
	  
	  /**
	   * end-of-source.
	   */
	  
	  eos: function() {
	    if (this.input.length) return;
	    if (this.indentStack.length) {
	      this.indentStack.shift();
	      return this.tok('outdent');
	    } else {
	      return this.tok('eos');
	    }
	  },
	
	  /**
	   * Blank line.
	   */
	  
	  blank: function() {
	    var captures;
	    if (captures = /^\n *\n/.exec(this.input)) {
	      this.consume(captures[0].length - 1);
	      if (this.pipeless) return this.tok('text', '');
	      return this.next();
	    }
	  },
	
	  /**
	   * Comment.
	   */
	  
	  comment: function() {
	    var captures;
	    if (captures = /^ *\/\/(-)?([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('comment', captures[2]);
	      tok.buffer = '-' != captures[1];
	      return tok;
	    }
	  },
	
	  /**
	   * Interpolated tag.
	   */
	
	  interpolation: function() {
	    var captures;
	    if (captures = /^#\{(.*?)\}/.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok('interpolation', captures[1]);
	    }
	  },
	
	  /**
	   * Tag.
	   */
	  
	  tag: function() {
	    var captures;
	    if (captures = /^(\w[-:\w]*)(\/?)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok, name = captures[1];
	      if (':' == name[name.length - 1]) {
	        name = name.slice(0, -1);
	        tok = this.tok('tag', name);
	        this.defer(this.tok(':'));
	        while (' ' == this.input[0]) this.input = this.input.substr(1);
	      } else {
	        tok = this.tok('tag', name);
	      }
	      tok.selfClosing = !! captures[2];
	      return tok;
	    }
	  },
	  
	  /**
	   * Filter.
	   */
	  
	  filter: function() {
	    return this.scan(/^:(\w+)/, 'filter');
	  },
	  
	  /**
	   * Doctype.
	   */
	  
	  doctype: function() {
	    return this.scan(/^(?:!!!|doctype) *([^\n]+)?/, 'doctype');
	  },
	
	  /**
	   * Id.
	   */
	  
	  id: function() {
	    return this.scan(/^#([\w-]+)/, 'id');
	  },
	  
	  /**
	   * Class.
	   */
	  
	  className: function() {
	    return this.scan(/^\.([\w-]+)/, 'class');
	  },
	  
	  /**
	   * Text.
	   */
	  
	  text: function() {
	    return this.scan(/^(?:\| ?| ?)?([^\n]+)/, 'text');
	  },
	
	  /**
	   * Extends.
	   */
	  
	  "extends": function() {
	    return this.scan(/^extends? +([^\n]+)/, 'extends');
	  },
	
	  /**
	   * Block prepend.
	   */
	  
	  prepend: function() {
	    var captures;
	    if (captures = /^prepend +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = 'prepend'
	        , name = captures[1]
	        , tok = this.tok('block', name);
	      tok.mode = mode;
	      return tok;
	    }
	  },
	  
	  /**
	   * Block append.
	   */
	  
	  append: function() {
	    var captures;
	    if (captures = /^append +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = 'append'
	        , name = captures[1]
	        , tok = this.tok('block', name);
	      tok.mode = mode;
	      return tok;
	    }
	  },
	
	  /**
	   * Block.
	   */
	  
	  block: function() {
	    var captures;
	    if (captures = /^block\b *(?:(prepend|append) +)?([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = captures[1] || 'replace'
	        , name = captures[2]
	        , tok = this.tok('block', name);
	
	      tok.mode = mode;
	      return tok;
	    }
	  },
	
	  /**
	   * Yield.
	   */
	  
	  yield: function() {
	    return this.scan(/^yield */, 'yield');
	  },
	
	  /**
	   * Include.
	   */
	  
	  include: function() {
	    return this.scan(/^include +([^\n]+)/, 'include');
	  },
	
	  /**
	   * Case.
	   */
	  
	  "case": function() {
	    return this.scan(/^case +([^\n]+)/, 'case');
	  },
	
	  /**
	   * When.
	   */
	  
	  when: function() {
	    return this.scan(/^when +([^:\n]+)/, 'when');
	  },
	
	  /**
	   * Default.
	   */
	  
	  "default": function() {
	    return this.scan(/^default */, 'default');
	  },
	
	  /**
	   * Assignment.
	   */
	  
	  assignment: function() {
	    var captures;
	    if (captures = /^(\w+) += *([^;\n]+)( *;? *)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var name = captures[1]
	        , val = captures[2];
	      return this.tok('code', 'var ' + name + ' = (' + val + ');');
	    }
	  },
	
	  /**
	   * Call mixin.
	   */
	  
	  call: function(){
	    var captures;
	    if (captures = /^\+([-\w]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('call', captures[1]);
	      
	      // Check for args (not attributes)
	      if (captures = /^ *\((.*?)\)/.exec(this.input)) {
	        if (!/^ *[-\w]+ *=/.test(captures[1])) {
	          this.consume(captures[0].length);
	          tok.args = captures[1];
	        }
	      }
	      
	      return tok;
	    }
	  },
	
	  /**
	   * Mixin.
	   */
	
	  mixin: function(){
	    var captures;
	    if (captures = /^mixin +([-\w]+)(?: *\((.*)\))?/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('mixin', captures[1]);
	      tok.args = captures[2];
	      return tok;
	    }
	  },
	
	  /**
	   * Conditional.
	   */
	  
	  conditional: function() {
	    var captures;
	    if (captures = /^(if|unless|else if|else)\b([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var type = captures[1]
	        , js = captures[2];
	
	      switch (type) {
	        case 'if': js = 'if (' + js + ')'; break;
	        case 'unless': js = 'if (!(' + js + '))'; break;
	        case 'else if': js = 'else if (' + js + ')'; break;
	        case 'else': js = 'else'; break;
	      }
	
	      return this.tok('code', js);
	    }
	  },
	
	  /**
	   * While.
	   */
	  
	  "while": function() {
	    var captures;
	    if (captures = /^while +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok('code', 'while (' + captures[1] + ')');
	    }
	  },
	
	  /**
	   * Each.
	   */
	  
	  each: function() {
	    var captures;
	    if (captures = /^(?:- *)?(?:each|for) +(\w+)(?: *, *(\w+))? * in *([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('each', captures[1]);
	      tok.key = captures[2] || '$index';
	      tok.code = captures[3];
	      return tok;
	    }
	  },
	  
	  /**
	   * Code.
	   */
	  
	  code: function() {
	    var captures;
	    if (captures = /^(!?=|-)([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var flags = captures[1];
	      captures[1] = captures[2];
	      var tok = this.tok('code', captures[1]);
	      tok.escape = flags[0] === '=';
	      tok.buffer = flags[0] === '=' || flags[1] === '=';
	      return tok;
	    }
	  },
	  
	  /**
	   * Attributes.
	   */
	  
	  attrs: function() {
	    if ('(' == this.input.charAt(0)) {
	      var index = this.indexOfDelimiters('(', ')')
	        , str = this.input.substr(1, index-1)
	        , tok = this.tok('attrs')
	        , len = str.length
	        , colons = this.colons
	        , states = ['key']
	        , escapedAttr
	        , key = ''
	        , val = ''
	        , quote
	        , c
	        , p;
	
	      function state(){
	        return states[states.length - 1];
	      }
	
	      function interpolate(attr) {
	        return attr.replace(/#\{([^}]+)\}/g, function(_, expr){
	          return quote + " + (" + expr + ") + " + quote;
	        });
	      }
	
	      this.consume(index + 1);
	      tok.attrs = {};
	      tok.escaped = {};
	
	      function parse(c) {
	        var real = c;
	        // TODO: remove when people fix ":"
	        if (colons && ':' == c) c = '=';
	        switch (c) {
	          case ',':
	          case '\n':
	            switch (state()) {
	              case 'expr':
	              case 'array':
	              case 'string':
	              case 'object':
	                val += c;
	                break;
	              default:
	                states.push('key');
	                val = val.trim();
	                key = key.trim();
	                if ('' == key) return;
	                key = key.replace(/^['"]|['"]$/g, '').replace('!', '');
	                tok.escaped[key] = escapedAttr;
	                tok.attrs[key] = '' == val
	                  ? true
	                  : interpolate(val);
	                key = val = '';
	            }
	            break;
	          case '=':
	            switch (state()) {
	              case 'key char':
	                key += real;
	                break;
	              case 'val':
	              case 'expr':
	              case 'array':
	              case 'string':
	              case 'object':
	                val += real;
	                break;
	              default:
	                escapedAttr = '!' != p;
	                states.push('val');
	            }
	            break;
	          case '(':
	            if ('val' == state()
	              || 'expr' == state()) states.push('expr');
	            val += c;
	            break;
	          case ')':
	            if ('expr' == state()
	              || 'val' == state()) states.pop();
	            val += c;
	            break;
	          case '{':
	            if ('val' == state()) states.push('object');
	            val += c;
	            break;
	          case '}':
	            if ('object' == state()) states.pop();
	            val += c;
	            break;
	          case '[':
	            if ('val' == state()) states.push('array');
	            val += c;
	            break;
	          case ']':
	            if ('array' == state()) states.pop();
	            val += c;
	            break;
	          case '"':
	          case "'":
	            switch (state()) {
	              case 'key':
	                states.push('key char');
	                break;
	              case 'key char':
	                states.pop();
	                break;
	              case 'string':
	                if (c == quote) states.pop();
	                val += c;
	                break;
	              default:
	                states.push('string');
	                val += c;
	                quote = c;
	            }
	            break;
	          case '':
	            break;
	          default:
	            switch (state()) {
	              case 'key':
	              case 'key char':
	                key += c;
	                break;
	              default:
	                val += c;
	            }
	        }
	        p = c;
	      }
	
	      for (var i = 0; i < len; ++i) {
	        parse(str.charAt(i));
	      }
	
	      parse(',');
	
	      if ('/' == this.input.charAt(0)) {
	        this.consume(1);
	        tok.selfClosing = true;
	      }
	
	      return tok;
	    }
	  },
	  
	  /**
	   * Indent | Outdent | Newline.
	   */
	  
	  indent: function() {
	    var captures, re;
	
	    // established regexp
	    if (this.indentRe) {
	      captures = this.indentRe.exec(this.input);
	    // determine regexp
	    } else {
	      // tabs
	      re = /^\n(\t*) */;
	      captures = re.exec(this.input);
	
	      // spaces
	      if (captures && !captures[1].length) {
	        re = /^\n( *)/;
	        captures = re.exec(this.input);
	      }
	
	      // established
	      if (captures && captures[1].length) this.indentRe = re;
	    }
	
	    if (captures) {
	      var tok
	        , indents = captures[1].length;
	
	      ++this.lineno;
	      this.consume(indents + 1);
	
	      if (' ' == this.input[0] || '\t' == this.input[0]) {
	        throw new Error('Invalid indentation, you can use tabs or spaces but not both');
	      }
	
	      // blank line
	      if ('\n' == this.input[0]) return this.tok('newline');
	
	      // outdent
	      if (this.indentStack.length && indents < this.indentStack[0]) {
	        while (this.indentStack.length && this.indentStack[0] > indents) {
	          this.stash.push(this.tok('outdent'));
	          this.indentStack.shift();
	        }
	        tok = this.stash.pop();
	      // indent
	      } else if (indents && indents != this.indentStack[0]) {
	        this.indentStack.unshift(indents);
	        tok = this.tok('indent', indents);
	      // newline
	      } else {
	        tok = this.tok('newline');
	      }
	
	      return tok;
	    }
	  },
	
	  /**
	   * Pipe-less text consumed only when 
	   * pipeless is true;
	   */
	
	  pipelessText: function() {
	    if (this.pipeless) {
	      if ('\n' == this.input[0]) return;
	      var i = this.input.indexOf('\n');
	      if (-1 == i) i = this.input.length;
	      var str = this.input.substr(0, i);
	      this.consume(str.length);
	      return this.tok('text', str);
	    }
	  },
	
	  /**
	   * ':'
	   */
	
	  colon: function() {
	    return this.scan(/^: */, ':');
	  },
	
	  /**
	   * Return the next token object, or those
	   * previously stashed by lookahead.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  advance: function(){
	    return this.stashed()
	      || this.next();
	  },
	  
	  /**
	   * Return the next token object.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  next: function() {
	    return this.deferred()
	      || this.blank()
	      || this.eos()
	      || this.pipelessText()
	      || this.yield()
	      || this.doctype()
	      || this.interpolation()
	      || this["case"]()
	      || this.when()
	      || this["default"]()
	      || this["extends"]()
	      || this.append()
	      || this.prepend()
	      || this.block()
	      || this.include()
	      || this.mixin()
	      || this.call()
	      || this.conditional()
	      || this.each()
	      || this["while"]()
	      || this.assignment()
	      || this.tag()
	      || this.filter()
	      || this.code()
	      || this.id()
	      || this.className()
	      || this.attrs()
	      || this.indent()
	      || this.comment()
	      || this.colon()
	      || this.text();
	  }
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	exports.Node = __webpack_require__(108);
	exports.Tag = __webpack_require__(109);
	exports.Code = __webpack_require__(113);
	exports.Each = __webpack_require__(114);
	exports.Case = __webpack_require__(115);
	exports.Text = __webpack_require__(116);
	exports.Block = __webpack_require__(111);
	exports.Mixin = __webpack_require__(117);
	exports.Filter = __webpack_require__(118);
	exports.Comment = __webpack_require__(119);
	exports.Literal = __webpack_require__(120);
	exports.BlockComment = __webpack_require__(121);
	exports.Doctype = __webpack_require__(122);


/***/ },
/* 108 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - nodes - Node
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Initialize a `Node`.
	 *
	 * @api public
	 */
	
	var Node = module.exports = function Node(){};
	
	/**
	 * Clone this node (return itself)
	 *
	 * @return {Node}
	 * @api private
	 */
	
	Node.prototype.clone = function(){
	  return this;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Tag
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Attrs = __webpack_require__(110),
	    Block = __webpack_require__(111),
	    inlineTags = __webpack_require__(112);
	
	/**
	 * Initialize a `Tag` node with the given tag `name` and optional `block`.
	 *
	 * @param {String} name
	 * @param {Block} block
	 * @api public
	 */
	
	var Tag = module.exports = function Tag(name, block) {
	  this.name = name;
	  this.attrs = [];
	  this.block = block || new Block;
	};
	
	/**
	 * Inherit from `Attrs`.
	 */
	
	Tag.prototype.__proto__ = Attrs.prototype;
	
	/**
	 * Clone this tag.
	 *
	 * @return {Tag}
	 * @api private
	 */
	
	Tag.prototype.clone = function(){
	  var clone = new Tag(this.name, this.block.clone());
	  clone.line = this.line;
	  clone.attrs = this.attrs;
	  clone.textOnly = this.textOnly;
	  return clone;
	};
	
	/**
	 * Check if this tag is an inline tag.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	Tag.prototype.isInline = function(){
	  return ~inlineTags.indexOf(this.name);
	};
	
	/**
	 * Check if this tag's contents can be inlined.  Used for pretty printing.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	Tag.prototype.canInline = function(){
	  var nodes = this.block.nodes;
	
	  function isInline(node){
	    // Recurse if the node is a block
	    if (node.isBlock) return node.nodes.every(isInline);
	    return node.isText || (node.isInline && node.isInline());
	  }
	  
	  // Empty tag
	  if (!nodes.length) return true;
	  
	  // Text-only or inline-only tag
	  if (1 == nodes.length) return isInline(nodes[0]);
	  
	  // Multi-line inline-only tag
	  if (this.block.nodes.every(isInline)) {
	    for (var i = 1, len = nodes.length; i < len; ++i) {
	      if (nodes[i-1].isText && nodes[i].isText)
	        return false;
	    }
	    return true;
	  }
	  
	  // Mixed tag
	  return false;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Attrs
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108),
	    Block = __webpack_require__(111);
	
	/**
	 * Initialize a `Attrs` node.
	 *
	 * @api public
	 */
	
	var Attrs = module.exports = function Attrs() {
	  this.attrs = [];
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Attrs.prototype.__proto__ = Node.prototype;
	
	/**
	 * Set attribute `name` to `val`, keep in mind these become
	 * part of a raw js object literal, so to quote a value you must
	 * '"quote me"', otherwise or example 'user.name' is literal JavaScript.
	 *
	 * @param {String} name
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @return {Tag} for chaining
	 * @api public
	 */
	
	Attrs.prototype.setAttribute = function(name, val, escaped){
	  this.attrs.push({ name: name, val: val, escaped: escaped });
	  return this;
	};
	
	/**
	 * Remove attribute `name` when present.
	 *
	 * @param {String} name
	 * @api public
	 */
	
	Attrs.prototype.removeAttribute = function(name){
	  for (var i = 0, len = this.attrs.length; i < len; ++i) {
	    if (this.attrs[i] && this.attrs[i].name == name) {
	      delete this.attrs[i];
	    }
	  }
	};
	
	/**
	 * Get attribute value by `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api public
	 */
	
	Attrs.prototype.getAttribute = function(name){
	  for (var i = 0, len = this.attrs.length; i < len; ++i) {
	    if (this.attrs[i] && this.attrs[i].name == name) {
	      return this.attrs[i].val;
	    }
	  }
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Block
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a new `Block` with an optional `node`.
	 *
	 * @param {Node} node
	 * @api public
	 */
	
	var Block = module.exports = function Block(node){
	  this.nodes = [];
	  if (node) this.push(node);
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Block.prototype.__proto__ = Node.prototype;
	
	/**
	 * Block flag.
	 */
	
	Block.prototype.isBlock = true;
	
	/**
	 * Replace the nodes in `other` with the nodes
	 * in `this` block.
	 *
	 * @param {Block} other
	 * @api private
	 */
	
	Block.prototype.replace = function(other){
	  other.nodes = this.nodes;
	};
	
	/**
	 * Pust the given `node`.
	 *
	 * @param {Node} node
	 * @return {Number}
	 * @api public
	 */
	
	Block.prototype.push = function(node){
	  return this.nodes.push(node);
	};
	
	/**
	 * Check if this block is empty.
	 *
	 * @return {Boolean}
	 * @api public
	 */
	
	Block.prototype.isEmpty = function(){
	  return 0 == this.nodes.length;
	};
	
	/**
	 * Unshift the given `node`.
	 *
	 * @param {Node} node
	 * @return {Number}
	 * @api public
	 */
	
	Block.prototype.unshift = function(node){
	  return this.nodes.unshift(node);
	};
	
	/**
	 * Return the "last" block, or the first `yield` node.
	 *
	 * @return {Block}
	 * @api private
	 */
	
	Block.prototype.includeBlock = function(){
	  var ret = this
	    , node;
	
	  for (var i = 0, len = this.nodes.length; i < len; ++i) {
	    node = this.nodes[i];
	    if (node.yield) return node;
	    else if (node.textOnly) continue;
	    else if (node.includeBlock) ret = node.includeBlock();
	    else if (node.block && !node.block.isEmpty()) ret = node.block.includeBlock();
	  }
	
	  return ret;
	};
	
	/**
	 * Return a clone of this block.
	 *
	 * @return {Block}
	 * @api private
	 */
	
	Block.prototype.clone = function(){
	  var clone = new Block;
	  for (var i = 0, len = this.nodes.length; i < len; ++i) {
	    clone.push(this.nodes[i].clone());
	  }
	  return clone;
	};
	


/***/ },
/* 112 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - inline tags
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	module.exports = [
	    'a'
	  , 'abbr'
	  , 'acronym'
	  , 'b'
	  , 'br'
	  , 'code'
	  , 'em'
	  , 'font'
	  , 'i'
	  , 'img'
	  , 'ins'
	  , 'kbd'
	  , 'map'
	  , 'samp'
	  , 'small'
	  , 'span'
	  , 'strong'
	  , 'sub'
	  , 'sup'
	];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Code
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `Code` node with the given code `val`.
	 * Code may also be optionally buffered and escaped.
	 *
	 * @param {String} val
	 * @param {Boolean} buffer
	 * @param {Boolean} escape
	 * @api public
	 */
	
	var Code = module.exports = function Code(val, buffer, escape) {
	  this.val = val;
	  this.buffer = buffer;
	  this.escape = escape;
	  if (val.match(/^ *else/)) this.debug = false;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Code.prototype.__proto__ = Node.prototype;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Each
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize an `Each` node, representing iteration
	 *
	 * @param {String} obj
	 * @param {String} val
	 * @param {String} key
	 * @param {Block} block
	 * @api public
	 */
	
	var Each = module.exports = function Each(obj, val, key, block) {
	  this.obj = obj;
	  this.val = val;
	  this.key = key;
	  this.block = block;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Each.prototype.__proto__ = Node.prototype;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Case
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a new `Case` with `expr`.
	 *
	 * @param {String} expr
	 * @api public
	 */
	
	var Case = exports = module.exports = function Case(expr, block){
	  this.expr = expr;
	  this.block = block;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Case.prototype.__proto__ = Node.prototype;
	
	var When = exports.When = function When(expr, block){
	  this.expr = expr;
	  this.block = block;
	  this.debug = false;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	When.prototype.__proto__ = Node.prototype;
	


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Text
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `Text` node with optional `line`.
	 *
	 * @param {String} line
	 * @api public
	 */
	
	var Text = module.exports = function Text(line) {
	  this.val = '';
	  if ('string' == typeof line) this.val = line;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Text.prototype.__proto__ = Node.prototype;
	
	/**
	 * Flag as text.
	 */
	
	Text.prototype.isText = true;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Mixin
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Attrs = __webpack_require__(110);
	
	/**
	 * Initialize a new `Mixin` with `name` and `block`.
	 *
	 * @param {String} name
	 * @param {String} args
	 * @param {Block} block
	 * @api public
	 */
	
	var Mixin = module.exports = function Mixin(name, args, block, call){
	  this.name = name;
	  this.args = args;
	  this.block = block;
	  this.attrs = [];
	  this.call = call;
	};
	
	/**
	 * Inherit from `Attrs`.
	 */
	
	Mixin.prototype.__proto__ = Attrs.prototype;
	


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Filter
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108)
	  , Block = __webpack_require__(111);
	
	/**
	 * Initialize a `Filter` node with the given 
	 * filter `name` and `block`.
	 *
	 * @param {String} name
	 * @param {Block|Node} block
	 * @api public
	 */
	
	var Filter = module.exports = function Filter(name, block, attrs) {
	  this.name = name;
	  this.block = block;
	  this.attrs = attrs;
	  this.isASTFilter = !block.nodes.every(function(node){ return node.isText });
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Filter.prototype.__proto__ = Node.prototype;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Comment
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `Comment` with the given `val`, optionally `buffer`,
	 * otherwise the comment may render in the output.
	 *
	 * @param {String} val
	 * @param {Boolean} buffer
	 * @api public
	 */
	
	var Comment = module.exports = function Comment(val, buffer) {
	  this.val = val;
	  this.buffer = buffer;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Comment.prototype.__proto__ = Node.prototype;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Literal
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `Literal` node with the given `str.
	 *
	 * @param {String} str
	 * @api public
	 */
	
	var Literal = module.exports = function Literal(str) {
	  this.str = str
	    .replace(/\\/g, "\\\\")
	    .replace(/\n|\r\n/g, "\\n")
	    .replace(/'/g, "\\'");
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Literal.prototype.__proto__ = Node.prototype;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - BlockComment
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `BlockComment` with the given `block`.
	 *
	 * @param {String} val
	 * @param {Block} block
	 * @param {Boolean} buffer
	 * @api public
	 */
	
	var BlockComment = module.exports = function BlockComment(val, block, buffer) {
	  this.block = block;
	  this.val = val;
	  this.buffer = buffer;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	BlockComment.prototype.__proto__ = Node.prototype;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Doctype
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Node = __webpack_require__(108);
	
	/**
	 * Initialize a `Doctype` with the given `val`. 
	 *
	 * @param {String} val
	 * @api public
	 */
	
	var Doctype = module.exports = function Doctype(val) {
	  this.val = val;
	};
	
	/**
	 * Inherit from `Node`.
	 */
	
	Doctype.prototype.__proto__ = Node.prototype;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - Compiler
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var nodes = __webpack_require__(107)
	  , filters = __webpack_require__(124)
	  , doctypes = __webpack_require__(125)
	  , selfClosing = __webpack_require__(126)
	  , runtime = __webpack_require__(127)
	  , utils = __webpack_require__(128);
	
	// if browser
	//
	// if (!Object.keys) {
	//   Object.keys = function(obj){
	//     var arr = [];
	//     for (var key in obj) {
	//       if (obj.hasOwnProperty(key)) {
	//         arr.push(key);
	//       }
	//     }
	//     return arr;
	//   }
	// }
	//
	// if (!String.prototype.trimLeft) {
	//   String.prototype.trimLeft = function(){
	//     return this.replace(/^\s+/, '');
	//   }
	// }
	//
	// end
	
	
	/**
	 * Initialize `Compiler` with the given `node`.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @api public
	 */
	
	var Compiler = module.exports = function Compiler(node, options) {
	  this.options = options = options || {};
	  this.node = node;
	  this.hasCompiledDoctype = false;
	  this.hasCompiledTag = false;
	  this.pp = options.pretty || false;
	  this.debug = false !== options.compileDebug;
	  this.indents = 0;
	  this.parentIndents = 0;
	  if (options.doctype) this.setDoctype(options.doctype);
	};
	
	/**
	 * Compiler prototype.
	 */
	
	Compiler.prototype = {
	
	  /**
	   * Compile parse tree to JavaScript.
	   *
	   * @api public
	   */
	
	  compile: function(){
	    this.buf = ['var interp;'];
	    if (this.pp) this.buf.push("var __indent = [];");
	    this.lastBufferedIdx = -1;
	    this.visit(this.node);
	    return this.buf.join('\n');
	  },
	
	  /**
	   * Sets the default doctype `name`. Sets terse mode to `true` when
	   * html 5 is used, causing self-closing tags to end with ">" vs "/>",
	   * and boolean attributes are not mirrored.
	   *
	   * @param {string} name
	   * @api public
	   */
	
	  setDoctype: function(name){
	    var doctype = doctypes[(name || 'default').toLowerCase()];
	    doctype = doctype || '<!DOCTYPE ' + name + '>';
	    this.doctype = doctype;
	    this.terse = '5' == name || 'html' == name;
	    this.xml = 0 == this.doctype.indexOf('<?xml');
	  },
	
	  /**
	   * Buffer the given `str` optionally escaped.
	   *
	   * @param {String} str
	   * @param {Boolean} esc
	   * @api public
	   */
	
	  buffer: function(str, esc){
	    if (esc) str = utils.escape(str);
	
	    if (this.lastBufferedIdx == this.buf.length) {
	      this.lastBuffered += str;
	      this.buf[this.lastBufferedIdx - 1] = "buf.push('" + this.lastBuffered + "');"
	    } else {
	      this.buf.push("buf.push('" + str + "');");
	      this.lastBuffered = str;
	      this.lastBufferedIdx = this.buf.length;
	    }
	  },
	
	  /**
	   * Buffer an indent based on the current `indent`
	   * property and an additional `offset`.
	   *
	   * @param {Number} offset
	   * @param {Boolean} newline
	   * @api public
	   */
	  
	  prettyIndent: function(offset, newline){
	    offset = offset || 0;
	    newline = newline ? '\\n' : '';
	    this.buffer(newline + Array(this.indents + offset).join('  '));
	    if (this.parentIndents)
	      this.buf.push("buf.push.apply(buf, __indent);");
	  },
	
	  /**
	   * Visit `node`.
	   *
	   * @param {Node} node
	   * @api public
	   */
	
	  visit: function(node){
	    var debug = this.debug;
	
	    if (debug) {
	      this.buf.push('__jade.unshift({ lineno: ' + node.line
	        + ', filename: ' + (node.filename
	          ? JSON.stringify(node.filename)
	          : '__jade[0].filename')
	        + ' });');
	    }
	
	    // Massive hack to fix our context
	    // stack for - else[ if] etc
	    if (false === node.debug && this.debug) {
	      this.buf.pop();
	      this.buf.pop();
	    }
	
	    this.visitNode(node);
	
	    if (debug) this.buf.push('__jade.shift();');
	  },
	
	  /**
	   * Visit `node`.
	   *
	   * @param {Node} node
	   * @api public
	   */
	
	  visitNode: function(node){
	    var name = node.constructor.name
	      || node.constructor.toString().match(/function ([^(\s]+)()/)[1];
	    return this['visit' + name](node);
	  },
	
	  /**
	   * Visit case `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */
	
	  visitCase: function(node){
	    var _ = this.withinCase;
	    this.withinCase = true;
	    this.buf.push('switch (' + node.expr + '){');
	    this.visit(node.block);
	    this.buf.push('}');
	    this.withinCase = _;
	  },
	
	  /**
	   * Visit when `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */
	
	  visitWhen: function(node){
	    if ('default' == node.expr) {
	      this.buf.push('default:');
	    } else {
	      this.buf.push('case ' + node.expr + ':');
	    }
	    this.visit(node.block);
	    this.buf.push('  break;');
	  },
	
	  /**
	   * Visit literal `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */
	
	  visitLiteral: function(node){
	    var str = node.str.replace(/\n/g, '\\\\n');
	    this.buffer(str);
	  },
	
	  /**
	   * Visit all nodes in `block`.
	   *
	   * @param {Block} block
	   * @api public
	   */
	
	  visitBlock: function(block){
	    var len = block.nodes.length
	      , escape = this.escape
	      , pp = this.pp
	    
	    // Block keyword has a special meaning in mixins
	    if (this.parentIndents && block.mode) {
	      if (pp) this.buf.push("__indent.push('" + Array(this.indents + 1).join('  ') + "');")
	      this.buf.push('block && block();');
	      if (pp) this.buf.push("__indent.pop();")
	      return;
	    }
	    
	    // Pretty print multi-line text
	    if (pp && len > 1 && !escape && block.nodes[0].isText && block.nodes[1].isText)
	      this.prettyIndent(1, true);
	    
	    for (var i = 0; i < len; ++i) {
	      // Pretty print text
	      if (pp && i > 0 && !escape && block.nodes[i].isText && block.nodes[i-1].isText)
	        this.prettyIndent(1, false);
	      
	      this.visit(block.nodes[i]);
	      // Multiple text nodes are separated by newlines
	      if (block.nodes[i+1] && block.nodes[i].isText && block.nodes[i+1].isText)
	        this.buffer('\\n');
	    }
	  },
	
	  /**
	   * Visit `doctype`. Sets terse mode to `true` when html 5
	   * is used, causing self-closing tags to end with ">" vs "/>",
	   * and boolean attributes are not mirrored.
	   *
	   * @param {Doctype} doctype
	   * @api public
	   */
	
	  visitDoctype: function(doctype){
	    if (doctype && (doctype.val || !this.doctype)) {
	      this.setDoctype(doctype.val || 'default');
	    }
	
	    if (this.doctype) this.buffer(this.doctype);
	    this.hasCompiledDoctype = true;
	  },
	
	  /**
	   * Visit `mixin`, generating a function that
	   * may be called within the template.
	   *
	   * @param {Mixin} mixin
	   * @api public
	   */
	
	  visitMixin: function(mixin){
	    var name = mixin.name.replace(/-/g, '_') + '_mixin'
	      , args = mixin.args || ''
	      , block = mixin.block
	      , attrs = mixin.attrs
	      , pp = this.pp;
	
	    if (mixin.call) {
	      if (pp) this.buf.push("__indent.push('" + Array(this.indents + 1).join('  ') + "');")
	      if (block || attrs.length) {
	        
	        this.buf.push(name + '.call({');
	        
	        if (block) {
	          this.buf.push('block: function(){');
	          
	          // Render block with no indents, dynamically added when rendered
	          this.parentIndents++;
	          var _indents = this.indents;
	          this.indents = 0;
	          this.visit(mixin.block);
	          this.indents = _indents;
	          this.parentIndents--;
	          
	          if (attrs.length) {
	            this.buf.push('},');
	          } else {
	            this.buf.push('}');
	          }
	        }
	        
	        if (attrs.length) {
	          var val = this.attrs(attrs);
	          if (val.inherits) {
	            this.buf.push('attributes: merge({' + val.buf
	                + '}, attributes), escaped: merge(' + val.escaped + ', escaped, true)');
	          } else {
	            this.buf.push('attributes: {' + val.buf + '}, escaped: ' + val.escaped);
	          }
	        }
	        
	        if (args) {
	          this.buf.push('}, ' + args + ');');
	        } else {
	          this.buf.push('});');
	        }
	        
	      } else {
	        this.buf.push(name + '(' + args + ');');
	      }
	      if (pp) this.buf.push("__indent.pop();")
	    } else {
	      this.buf.push('var ' + name + ' = function(' + args + '){');
	      this.buf.push('var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};');
	      this.parentIndents++;
	      this.visit(block);
	      this.parentIndents--;
	      this.buf.push('};');
	    }
	  },
	
	  /**
	   * Visit `tag` buffering tag markup, generating
	   * attributes, visiting the `tag`'s code and block.
	   *
	   * @param {Tag} tag
	   * @api public
	   */
	
	  visitTag: function(tag){
	    this.indents++;
	    var name = tag.name
	      , pp = this.pp;
	
	    if (tag.buffer) name = "' + (" + name + ") + '";
	
	    if (!this.hasCompiledTag) {
	      if (!this.hasCompiledDoctype && 'html' == name) {
	        this.visitDoctype();
	      }
	      this.hasCompiledTag = true;
	    }
	
	    // pretty print
	    if (pp && !tag.isInline())
	      this.prettyIndent(0, true);
	
	    if ((~selfClosing.indexOf(name) || tag.selfClosing) && !this.xml) {
	      this.buffer('<' + name);
	      this.visitAttributes(tag.attrs);
	      this.terse
	        ? this.buffer('>')
	        : this.buffer('/>');
	    } else {
	      // Optimize attributes buffering
	      if (tag.attrs.length) {
	        this.buffer('<' + name);
	        if (tag.attrs.length) this.visitAttributes(tag.attrs);
	        this.buffer('>');
	      } else {
	        this.buffer('<' + name + '>');
	      }
	      if (tag.code) this.visitCode(tag.code);
	      this.escape = 'pre' == tag.name;
	      this.visit(tag.block);
	
	      // pretty print
	      if (pp && !tag.isInline() && 'pre' != tag.name && !tag.canInline())
	        this.prettyIndent(0, true);
	
	      this.buffer('</' + name + '>');
	    }
	    this.indents--;
	  },
	
	  /**
	   * Visit `filter`, throwing when the filter does not exist.
	   *
	   * @param {Filter} filter
	   * @api public
	   */
	
	  visitFilter: function(filter){
	    var fn = filters[filter.name];
	
	    // unknown filter
	    if (!fn) {
	      if (filter.isASTFilter) {
	        throw new Error('unknown ast filter "' + filter.name + ':"');
	      } else {
	        throw new Error('unknown filter ":' + filter.name + '"');
	      }
	    }
	
	    if (filter.isASTFilter) {
	      this.buf.push(fn(filter.block, this, filter.attrs));
	    } else {
	      var text = filter.block.nodes.map(function(node){ return node.val }).join('\n');
	      filter.attrs = filter.attrs || {};
	      filter.attrs.filename = this.options.filename;
	      this.buffer(utils.text(fn(text, filter.attrs)));
	    }
	  },
	
	  /**
	   * Visit `text` node.
	   *
	   * @param {Text} text
	   * @api public
	   */
	
	  visitText: function(text){
	    text = utils.text(text.val.replace(/\\/g, '\\\\'));
	    if (this.escape) text = escape(text);
	    this.buffer(text);
	  },
	
	  /**
	   * Visit a `comment`, only buffering when the buffer flag is set.
	   *
	   * @param {Comment} comment
	   * @api public
	   */
	
	  visitComment: function(comment){
	    if (!comment.buffer) return;
	    if (this.pp) this.prettyIndent(1, true);
	    this.buffer('<!--' + utils.escape(comment.val) + '-->');
	  },
	
	  /**
	   * Visit a `BlockComment`.
	   *
	   * @param {Comment} comment
	   * @api public
	   */
	
	  visitBlockComment: function(comment){
	    if (!comment.buffer) return;
	    if (0 == comment.val.trim().indexOf('if')) {
	      this.buffer('<!--[' + comment.val.trim() + ']>');
	      this.visit(comment.block);
	      this.buffer('<![endif]-->');
	    } else {
	      this.buffer('<!--' + comment.val);
	      this.visit(comment.block);
	      this.buffer('-->');
	    }
	  },
	
	  /**
	   * Visit `code`, respecting buffer / escape flags.
	   * If the code is followed by a block, wrap it in
	   * a self-calling function.
	   *
	   * @param {Code} code
	   * @api public
	   */
	
	  visitCode: function(code){
	    // Wrap code blocks with {}.
	    // we only wrap unbuffered code blocks ATM
	    // since they are usually flow control
	
	    // Buffer code
	    if (code.buffer) {
	      var val = code.val.trimLeft();
	      this.buf.push('var __val__ = ' + val);
	      val = 'null == __val__ ? "" : __val__';
	      if (code.escape) val = 'escape(' + val + ')';
	      this.buf.push("buf.push(" + val + ");");
	    } else {
	      this.buf.push(code.val);
	    }
	
	    // Block support
	    if (code.block) {
	      if (!code.buffer) this.buf.push('{');
	      this.visit(code.block);
	      if (!code.buffer) this.buf.push('}');
	    }
	  },
	
	  /**
	   * Visit `each` block.
	   *
	   * @param {Each} each
	   * @api public
	   */
	
	  visitEach: function(each){
	    this.buf.push(''
	      + '// iterate ' + each.obj + '\n'
	      + ';(function(){\n'
	      + '  if (\'number\' == typeof ' + each.obj + '.length) {\n'
	      + '    for (var ' + each.key + ' = 0, $$l = ' + each.obj + '.length; ' + each.key + ' < $$l; ' + each.key + '++) {\n'
	      + '      var ' + each.val + ' = ' + each.obj + '[' + each.key + '];\n');
	
	    this.visit(each.block);
	
	    this.buf.push(''
	      + '    }\n'
	      + '  } else {\n'
	      + '    for (var ' + each.key + ' in ' + each.obj + ') {\n'
	      // if browser
	      // + '      if (' + each.obj + '.hasOwnProperty(' + each.key + ')){'
	      // end
	      + '      var ' + each.val + ' = ' + each.obj + '[' + each.key + '];\n');
	
	    this.visit(each.block);
	
	    // if browser
	    // this.buf.push('      }\n');
	    // end
	
	    this.buf.push('   }\n  }\n}).call(this);\n');
	  },
	
	  /**
	   * Visit `attrs`.
	   *
	   * @param {Array} attrs
	   * @api public
	   */
	
	  visitAttributes: function(attrs){
	    var val = this.attrs(attrs);
	    if (val.inherits) {
	      this.buf.push("buf.push(attrs(merge({ " + val.buf +
	          " }, attributes), merge(" + val.escaped + ", escaped, true)));");
	    } else if (val.constant) {
	      eval('var buf={' + val.buf + '};');
	      this.buffer(runtime.attrs(buf, JSON.parse(val.escaped)), true);
	    } else {
	      this.buf.push("buf.push(attrs({ " + val.buf + " }, " + val.escaped + "));");
	    }
	  },
	
	  /**
	   * Compile attributes.
	   */
	
	  attrs: function(attrs){
	    var buf = []
	      , classes = []
	      , escaped = {}
	      , constant = attrs.every(function(attr){ return isConstant(attr.val) })
	      , inherits = false;
	
	    if (this.terse) buf.push('terse: true');
	
	    attrs.forEach(function(attr){
	      if (attr.name == 'attributes') return inherits = true;
	      escaped[attr.name] = attr.escaped;
	      if (attr.name == 'class') {
	        classes.push('(' + attr.val + ')');
	      } else {
	        var pair = "'" + attr.name + "':(" + attr.val + ')';
	        buf.push(pair);
	      }
	    });
	
	    if (classes.length) {
	      classes = classes.join(" + ' ' + ");
	      buf.push("class: " + classes);
	    }
	
	    return {
	      buf: buf.join(', ').replace('class:', '"class":'),
	      escaped: JSON.stringify(escaped),
	      inherits: inherits,
	      constant: constant
	    };
	  }
	};
	
	/**
	 * Check if expression can be evaluated to a constant
	 *
	 * @param {String} expression
	 * @return {Boolean}
	 * @api private
	 */
	
	function isConstant(val){
	  // Check strings/literals
	  if (/^ *("([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|true|false|null|undefined) *$/i.test(val))
	    return true;
	  
	  // Check numbers
	  if (!isNaN(Number(val)))
	    return true;
	  
	  // Check arrays
	  var matches;
	  if (matches = /^ *\[(.*)\] *$/.exec(val))
	    return matches[1].split(',').every(isConstant);
	  
	  return false;
	}
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	function escape(html){
	  return String(html)
	    .replace(/&(?!\w+;)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - filters
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	module.exports = {
	  
	  /**
	   * Wrap text with CDATA block.
	   */
	  
	  cdata: function(str){
	    return '<![CDATA[\\n' + str + '\\n]]>';
	  },
	  
	  /**
	   * Transform sass to css, wrapped in style tags.
	   */
	  
	  sass: function(str){
	    str = str.replace(/\\n/g, '\n');
	    var sass = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"sass\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).render(str).replace(/\n/g, '\\n');
	    return '<style type="text/css">' + sass + '</style>'; 
	  },
	  
	  /**
	   * Transform stylus to css, wrapped in style tags.
	   */
	  
	  stylus: function(str, options){
	    var ret;
	    str = str.replace(/\\n/g, '\n');
	    var stylus = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"stylus\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    stylus(str, options).render(function(err, css){
	      if (err) throw err;
	      ret = css.replace(/\n/g, '\\n');
	    });
	    return '<style type="text/css">' + ret + '</style>'; 
	  },
	  
	  /**
	   * Transform less to css, wrapped in style tags.
	   */
	  
	  less: function(str){
	    var ret;
	    str = str.replace(/\\n/g, '\n');
	    __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).render(str, function(err, css){
	      if (err) throw err;
	      ret = '<style type="text/css">' + css.replace(/\n/g, '\\n') + '</style>';  
	    });
	    return ret;
	  },
	  
	  /**
	   * Transform markdown to html.
	   */
	  
	  markdown: function(str){
	    var md;
	
	    // support markdown / discount
	    try {
	      md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"markdown\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    } catch (err){
	      try {
	        md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"discount\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	      } catch (err) {
	        try {
	          md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"markdown-js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        } catch (err) {
	          try {
	            md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"marked\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	          } catch (err) {
	            throw new
	              Error('Cannot find markdown library, install markdown, discount, or marked.');
	          }
	        }
	      }
	    }
	
	    str = str.replace(/\\n/g, '\n');
	    return md.parse(str).replace(/\n/g, '\\n').replace(/'/g,'&#39;');
	  },
	  
	  /**
	   * Transform coffeescript to javascript.
	   */
	
	  coffeescript: function(str){
	    str = str.replace(/\\n/g, '\n');
	    var js = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"coffee-script\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).compile(str).replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
	    return '<script type="text/javascript">\\n' + js + '</script>';
	  }
	};


/***/ },
/* 125 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - doctypes
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	module.exports = {
	    '5': '<!DOCTYPE html>'
	  , 'default': '<!DOCTYPE html>'
	  , 'xml': '<?xml version="1.0" encoding="utf-8" ?>'
	  , 'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	  , 'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
	  , 'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">'
	  , '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
	  , 'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">'
	  , 'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">'
	};

/***/ },
/* 126 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - self closing tags
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	module.exports = [
	    'meta'
	  , 'img'
	  , 'link'
	  , 'input'
	  , 'source'
	  , 'area'
	  , 'base'
	  , 'col'
	  , 'br'
	  , 'hr'
	];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - runtime
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Lame Array.isArray() polyfill for now.
	 */
	
	if (!Array.isArray) {
	  Array.isArray = function(arr){
	    return '[object Array]' == Object.prototype.toString.call(arr);
	  };
	}
	
	/**
	 * Lame Object.keys() polyfill for now.
	 */
	
	if (!Object.keys) {
	  Object.keys = function(obj){
	    var arr = [];
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        arr.push(key);
	      }
	    }
	    return arr;
	  }
	}
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    ac = ac.filter(nulls);
	    bc = bc.filter(nulls);
	    a['class'] = ac.concat(bc).join(' ');
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null;
	}
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 * @api private
	 */
	
	exports.attrs = function attrs(obj, escaped){
	  var buf = []
	    , terse = obj.terse;
	
	  delete obj.terse;
	  var keys = Object.keys(obj)
	    , len = keys.length;
	
	  if (len) {
	    buf.push('');
	    for (var i = 0; i < len; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('boolean' == typeof val || null == val) {
	        if (val) {
	          terse
	            ? buf.push(key)
	            : buf.push(key + '="' + key + '"');
	        }
	      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	        buf.push(key + "='" + JSON.stringify(val) + "'");
	      } else if ('class' == key && Array.isArray(val)) {
	        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
	      } else if (escaped && escaped[key]) {
	        buf.push(key + '="' + exports.escape(val) + '"');
	      } else {
	        buf.push(key + '="' + val + '"');
	      }
	    }
	  }
	
	  return buf.join(' ');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	exports.escape = function escape(html){
	  return String(html)
	    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno){
	  if (!filename) throw err;
	
	  var context = 3
	    , str = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync(filename, 'utf8')
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 128 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - utils
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	
	/**
	 * Convert interpolation in the given string to JavaScript.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	var interpolate = exports.interpolate = function(str){
	  return str.replace(/(\\)?([#!]){(.*?)}/g, function(str, escape, flag, code){
	    return escape
	      ? str
	      : "' + "
	        + ('!' == flag ? '' : 'escape')
	        + "((interp = " + code.replace(/\\'/g, "'")
	        + ") == null ? '' : interp) + '";
	  });
	};
	
	/**
	 * Escape single quotes in `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	var escape = exports.escape = function(str) {
	  return str.replace(/'/g, "\\'");
	};
	
	/**
	 * Interpolate, and escape the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	exports.text = function(str){
	  return interpolate(escape(str));
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var Base = __webpack_require__(59);
	
	/**
	 * Expose `List`.
	 */
	
	exports = module.exports = List;
	
	/**
	 * Initialize a new `List` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function List(runner) {
	  Base.call(this, runner);
	
	  var self = this;
	  var total = runner.total;
	
	  runner.on('start', function() {
	    console.log(JSON.stringify(['start', { total: total }]));
	  });
	
	  runner.on('pass', function(test) {
	    console.log(JSON.stringify(['pass', clean(test)]));
	  });
	
	  runner.on('fail', function(test, err) {
	    test = clean(test);
	    test.err = err.message;
	    test.stack = err.stack || null;
	    console.log(JSON.stringify(['fail', test]));
	  });
	
	  runner.on('end', function() {
	    process.stdout.write(JSON.stringify(['end', self.stats]));
	  });
	}
	
	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    title: test.title,
	    fullTitle: test.fullTitle(),
	    duration: test.duration,
	    currentRetry: test.currentRetry()
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	exports.bdd = __webpack_require__(131);
	exports.tdd = __webpack_require__(139);
	exports.qunit = __webpack_require__(140);
	exports.exports = __webpack_require__(141);


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Suite = __webpack_require__(132);
	var Test = __webpack_require__(137);
	var escapeRe = __webpack_require__(56);
	
	/**
	 * BDD-style interface:
	 *
	 *      describe('Array', function() {
	 *        describe('#indexOf()', function() {
	 *          it('should return -1 when not present', function() {
	 *            // ...
	 *          });
	 *
	 *          it('should return the index when present', function() {
	 *            // ...
	 *          });
	 *        });
	 *      });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];
	
	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(138)(suites, context);
	
	    context.before = common.before;
	    context.after = common.after;
	    context.beforeEach = common.beforeEach;
	    context.afterEach = common.afterEach;
	    context.run = mocha.options.delay && common.runWithSuite(suite);
	    /**
	     * Describe a "suite" with the given `title`
	     * and callback `fn` containing nested suites
	     * and/or tests.
	     */
	
	    context.describe = context.context = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	      return suite;
	    };
	
	    /**
	     * Pending describe.
	     */
	
	    context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.pending = true;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	    };
	
	    /**
	     * Exclusive suite.
	     */
	
	    context.describe.only = function(title, fn) {
	      var suite = context.describe(title, fn);
	      mocha.grep(suite.fullTitle());
	      return suite;
	    };
	
	    /**
	     * Describe a specification or test-case
	     * with the given `title` and callback `fn`
	     * acting as a thunk.
	     */
	
	    var it = context.it = context.specify = function(title, fn) {
	      var suite = suites[0];
	      if (suite.pending) {
	        fn = null;
	      }
	      var test = new Test(title, fn);
	      test.file = file;
	      suite.addTest(test);
	      return test;
	    };
	
	    /**
	     * Exclusive test-case.
	     */
	
	    context.it.only = function(title, fn) {
	      var test = it(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	      return test;
	    };
	
	    /**
	     * Pending test case.
	     */
	
	    context.xit = context.xspecify = context.it.skip = function(title) {
	      context.it(title);
	    };
	
	    /**
	     * Number of attempts to retry.
	     */
	    context.it.retries = function(n) {
	      context.retries(n);
	    };
	  });
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var EventEmitter = __webpack_require__(133).EventEmitter;
	var Hook = __webpack_require__(134);
	var utils = __webpack_require__(63);
	var inherits = utils.inherits;
	var debug = __webpack_require__(64)('mocha:suite');
	var milliseconds = __webpack_require__(62);
	
	/**
	 * Expose `Suite`.
	 */
	
	exports = module.exports = Suite;
	
	/**
	 * Create a new `Suite` with the given `title` and parent `Suite`. When a suite
	 * with the same title is already present, that suite is returned to provide
	 * nicer reporter and more flexible meta-testing.
	 *
	 * @api public
	 * @param {Suite} parent
	 * @param {string} title
	 * @return {Suite}
	 */
	exports.create = function(parent, title) {
	  var suite = new Suite(title, parent.ctx);
	  suite.parent = parent;
	  if (parent.pending) {
	    suite.pending = true;
	  }
	  title = suite.fullTitle();
	  parent.addSuite(suite);
	  return suite;
	};
	
	/**
	 * Initialize a new `Suite` with the given `title` and `ctx`.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Context} parentContext
	 */
	function Suite(title, parentContext) {
	  this.title = title;
	  function Context() {}
	  Context.prototype = parentContext;
	  this.ctx = new Context();
	  this.suites = [];
	  this.tests = [];
	  this.pending = false;
	  this._beforeEach = [];
	  this._beforeAll = [];
	  this._afterEach = [];
	  this._afterAll = [];
	  this.root = !title;
	  this._timeout = 2000;
	  this._enableTimeouts = true;
	  this._slow = 75;
	  this._bail = false;
	  this._retries = -1;
	  this.delayed = false;
	}
	
	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Suite, EventEmitter);
	
	/**
	 * Return a clone of this `Suite`.
	 *
	 * @api private
	 * @return {Suite}
	 */
	Suite.prototype.clone = function() {
	  var suite = new Suite(this.title);
	  debug('clone');
	  suite.ctx = this.ctx;
	  suite.timeout(this.timeout());
	  suite.retries(this.retries());
	  suite.enableTimeouts(this.enableTimeouts());
	  suite.slow(this.slow());
	  suite.bail(this.bail());
	  return suite;
	};
	
	/**
	 * Set timeout `ms` or short-hand such as "2s".
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this._timeout;
	  }
	  if (ms.toString() === '0') {
	    this._enableTimeouts = false;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._timeout = parseInt(ms, 10);
	  return this;
	};
	
	/**
	 * Set number of times to retry a failed test.
	 *
	 * @api private
	 * @param {number|string} n
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this._retries;
	  }
	  debug('retries %d', n);
	  this._retries = parseInt(n, 10) || 0;
	  return this;
	};
	
	/**
	  * Set timeout to `enabled`.
	  *
	  * @api private
	  * @param {boolean} enabled
	  * @return {Suite|boolean} self or enabled
	  */
	Suite.prototype.enableTimeouts = function(enabled) {
	  if (!arguments.length) {
	    return this._enableTimeouts;
	  }
	  debug('enableTimeouts %s', enabled);
	  this._enableTimeouts = enabled;
	  return this;
	};
	
	/**
	 * Set slow `ms` or short-hand such as "2s".
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.slow = function(ms) {
	  if (!arguments.length) {
	    return this._slow;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('slow %d', ms);
	  this._slow = ms;
	  return this;
	};
	
	/**
	 * Sets whether to bail after first error.
	 *
	 * @api private
	 * @param {boolean} bail
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.bail = function(bail) {
	  if (!arguments.length) {
	    return this._bail;
	  }
	  debug('bail %s', bail);
	  this._bail = bail;
	  return this;
	};
	
	/**
	 * Run `fn(test[, done])` before running tests.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.beforeAll = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"before all" hook' + (title ? ': ' + title : '');
	
	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._beforeAll.push(hook);
	  this.emit('beforeAll', hook);
	  return this;
	};
	
	/**
	 * Run `fn(test[, done])` after running tests.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.afterAll = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"after all" hook' + (title ? ': ' + title : '');
	
	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._afterAll.push(hook);
	  this.emit('afterAll', hook);
	  return this;
	};
	
	/**
	 * Run `fn(test[, done])` before each test case.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.beforeEach = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"before each" hook' + (title ? ': ' + title : '');
	
	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._beforeEach.push(hook);
	  this.emit('beforeEach', hook);
	  return this;
	};
	
	/**
	 * Run `fn(test[, done])` after each test case.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.afterEach = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"after each" hook' + (title ? ': ' + title : '');
	
	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._afterEach.push(hook);
	  this.emit('afterEach', hook);
	  return this;
	};
	
	/**
	 * Add a test `suite`.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @return {Suite} for chaining
	 */
	Suite.prototype.addSuite = function(suite) {
	  suite.parent = this;
	  suite.timeout(this.timeout());
	  suite.retries(this.retries());
	  suite.enableTimeouts(this.enableTimeouts());
	  suite.slow(this.slow());
	  suite.bail(this.bail());
	  this.suites.push(suite);
	  this.emit('suite', suite);
	  return this;
	};
	
	/**
	 * Add a `test` to this suite.
	 *
	 * @api private
	 * @param {Test} test
	 * @return {Suite} for chaining
	 */
	Suite.prototype.addTest = function(test) {
	  test.parent = this;
	  test.timeout(this.timeout());
	  test.retries(this.retries());
	  test.enableTimeouts(this.enableTimeouts());
	  test.slow(this.slow());
	  test.ctx = this.ctx;
	  this.tests.push(test);
	  this.emit('test', test);
	  return this;
	};
	
	/**
	 * Return the full title generated by recursively concatenating the parent's
	 * full title.
	 *
	 * @api public
	 * @return {string}
	 */
	Suite.prototype.fullTitle = function() {
	  if (this.parent) {
	    var full = this.parent.fullTitle();
	    if (full) {
	      return full + ' ' + this.title;
	    }
	  }
	  return this.title;
	};
	
	/**
	 * Return the total number of tests.
	 *
	 * @api public
	 * @return {number}
	 */
	Suite.prototype.total = function() {
	  return utils.reduce(this.suites, function(sum, suite) {
	    return sum + suite.total();
	  }, 0) + this.tests.length;
	};
	
	/**
	 * Iterates through each suite recursively to find all tests. Applies a
	 * function in the format `fn(test)`.
	 *
	 * @api private
	 * @param {Function} fn
	 * @return {Suite}
	 */
	Suite.prototype.eachTest = function(fn) {
	  utils.forEach(this.tests, fn);
	  utils.forEach(this.suites, function(suite) {
	    suite.eachTest(fn);
	  });
	  return this;
	};
	
	/**
	 * This will run the root suite if we happen to be running in delayed mode.
	 */
	Suite.prototype.run = function run() {
	  if (this.root) {
	    this.emit('run');
	  }
	};


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Module exports.
	 */
	
	exports.EventEmitter = EventEmitter;
	
	/**
	 * Object#hasOwnProperty reference.
	 */
	var objToString = Object.prototype.toString;
	
	/**
	 * Check if a value is an array.
	 *
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean} true if the value is a boolean, otherwise false.
	 */
	function isArray(val) {
	  return objToString.call(val) === '[object Array]';
	}
	
	/**
	 * Event emitter constructor.
	 *
	 * @api public
	 */
	function EventEmitter() {}
	
	/**
	 * Add a listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.on = function(name, fn) {
	  if (!this.$events) {
	    this.$events = {};
	  }
	
	  if (!this.$events[name]) {
	    this.$events[name] = fn;
	  } else if (isArray(this.$events[name])) {
	    this.$events[name].push(fn);
	  } else {
	    this.$events[name] = [this.$events[name], fn];
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	/**
	 * Adds a volatile listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.once = function(name, fn) {
	  var self = this;
	
	  function on() {
	    self.removeListener(name, on);
	    fn.apply(this, arguments);
	  }
	
	  on.listener = fn;
	  this.on(name, on);
	
	  return this;
	};
	
	/**
	 * Remove a listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.removeListener = function(name, fn) {
	  if (this.$events && this.$events[name]) {
	    var list = this.$events[name];
	
	    if (isArray(list)) {
	      var pos = -1;
	
	      for (var i = 0, l = list.length; i < l; i++) {
	        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
	          pos = i;
	          break;
	        }
	      }
	
	      if (pos < 0) {
	        return this;
	      }
	
	      list.splice(pos, 1);
	
	      if (!list.length) {
	        delete this.$events[name];
	      }
	    } else if (list === fn || (list.listener && list.listener === fn)) {
	      delete this.$events[name];
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners for an event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.removeAllListeners = function(name) {
	  if (name === undefined) {
	    this.$events = {};
	    return this;
	  }
	
	  if (this.$events && this.$events[name]) {
	    this.$events[name] = null;
	  }
	
	  return this;
	};
	
	/**
	 * Get all listeners for a given event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.listeners = function(name) {
	  if (!this.$events) {
	    this.$events = {};
	  }
	
	  if (!this.$events[name]) {
	    this.$events[name] = [];
	  }
	
	  if (!isArray(this.$events[name])) {
	    this.$events[name] = [this.$events[name]];
	  }
	
	  return this.$events[name];
	};
	
	/**
	 * Emit an event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {boolean} true if at least one handler was invoked, else false.
	 */
	EventEmitter.prototype.emit = function(name) {
	  if (!this.$events) {
	    return false;
	  }
	
	  var handler = this.$events[name];
	
	  if (!handler) {
	    return false;
	  }
	
	  var args = Array.prototype.slice.call(arguments, 1);
	
	  if (typeof handler === 'function') {
	    handler.apply(this, args);
	  } else if (isArray(handler)) {
	    var listeners = handler.slice();
	
	    for (var i = 0, l = listeners.length; i < l; i++) {
	      listeners[i].apply(this, args);
	    }
	  } else {
	    return false;
	  }
	
	  return true;
	};


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Runnable = __webpack_require__(135);
	var inherits = __webpack_require__(63).inherits;
	
	/**
	 * Expose `Hook`.
	 */
	
	module.exports = Hook;
	
	/**
	 * Initialize a new `Hook` with the given `title` and callback `fn`.
	 *
	 * @param {String} title
	 * @param {Function} fn
	 * @api private
	 */
	function Hook(title, fn) {
	  Runnable.call(this, title, fn);
	  this.type = 'hook';
	}
	
	/**
	 * Inherit from `Runnable.prototype`.
	 */
	inherits(Hook, Runnable);
	
	/**
	 * Get or set the test `err`.
	 *
	 * @param {Error} err
	 * @return {Error}
	 * @api public
	 */
	Hook.prototype.error = function(err) {
	  if (!arguments.length) {
	    err = this._error;
	    this._error = null;
	    return err;
	  }
	
	  this._error = err;
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var EventEmitter = __webpack_require__(133).EventEmitter;
	var Pending = __webpack_require__(136);
	var debug = __webpack_require__(64)('mocha:runnable');
	var milliseconds = __webpack_require__(62);
	var utils = __webpack_require__(63);
	var inherits = utils.inherits;
	
	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */
	
	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */
	
	/**
	 * Object#toString().
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Expose `Runnable`.
	 */
	
	module.exports = Runnable;
	
	/**
	 * Initialize a new `Runnable` with the given `title` and callback `fn`.
	 *
	 * @param {String} title
	 * @param {Function} fn
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 */
	function Runnable(title, fn) {
	  this.title = title;
	  this.fn = fn;
	  this.async = fn && fn.length;
	  this.sync = !this.async;
	  this._timeout = 2000;
	  this._slow = 75;
	  this._enableTimeouts = true;
	  this.timedOut = false;
	  this._trace = new Error('done() called multiple times');
	  this._retries = -1;
	  this._currentRetry = 0;
	}
	
	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Runnable, EventEmitter);
	
	/**
	 * Set & get timeout `ms`.
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Runnable|number} ms or Runnable instance.
	 */
	Runnable.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this._timeout;
	  }
	  if (ms === 0) {
	    this._enableTimeouts = false;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._timeout = ms;
	  if (this.timer) {
	    this.resetTimeout();
	  }
	  return this;
	};
	
	/**
	 * Set & get slow `ms`.
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Runnable|number} ms or Runnable instance.
	 */
	Runnable.prototype.slow = function(ms) {
	  if (!arguments.length) {
	    return this._slow;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._slow = ms;
	  return this;
	};
	
	/**
	 * Set and get whether timeout is `enabled`.
	 *
	 * @api private
	 * @param {boolean} enabled
	 * @return {Runnable|boolean} enabled or Runnable instance.
	 */
	Runnable.prototype.enableTimeouts = function(enabled) {
	  if (!arguments.length) {
	    return this._enableTimeouts;
	  }
	  debug('enableTimeouts %s', enabled);
	  this._enableTimeouts = enabled;
	  return this;
	};
	
	/**
	 * Halt and mark as pending.
	 *
	 * @api private
	 */
	Runnable.prototype.skip = function() {
	  throw new Pending();
	};
	
	/**
	 * Set number of retries.
	 *
	 * @api private
	 */
	Runnable.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this._retries;
	  }
	  this._retries = n;
	};
	
	/**
	 * Get current retry
	 *
	 * @api private
	 */
	Runnable.prototype.currentRetry = function(n) {
	  if (!arguments.length) {
	    return this._currentRetry;
	  }
	  this._currentRetry = n;
	};
	
	/**
	 * Return the full title generated by recursively concatenating the parent's
	 * full title.
	 *
	 * @api public
	 * @return {string}
	 */
	Runnable.prototype.fullTitle = function() {
	  return this.parent.fullTitle() + ' ' + this.title;
	};
	
	/**
	 * Clear the timeout.
	 *
	 * @api private
	 */
	Runnable.prototype.clearTimeout = function() {
	  clearTimeout(this.timer);
	};
	
	/**
	 * Inspect the runnable void of private properties.
	 *
	 * @api private
	 * @return {string}
	 */
	Runnable.prototype.inspect = function() {
	  return JSON.stringify(this, function(key, val) {
	    if (key[0] === '_') {
	      return;
	    }
	    if (key === 'parent') {
	      return '#<Suite>';
	    }
	    if (key === 'ctx') {
	      return '#<Context>';
	    }
	    return val;
	  }, 2);
	};
	
	/**
	 * Reset the timeout.
	 *
	 * @api private
	 */
	Runnable.prototype.resetTimeout = function() {
	  var self = this;
	  var ms = this.timeout() || 1e9;
	
	  if (!this._enableTimeouts) {
	    return;
	  }
	  this.clearTimeout();
	  this.timer = setTimeout(function() {
	    if (!self._enableTimeouts) {
	      return;
	    }
	    self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));
	    self.timedOut = true;
	  }, ms);
	};
	
	/**
	 * Whitelist a list of globals for this test run.
	 *
	 * @api private
	 * @param {string[]} globals
	 */
	Runnable.prototype.globals = function(globals) {
	  if (!arguments.length) {
	    return this._allowedGlobals;
	  }
	  this._allowedGlobals = globals;
	};
	
	/**
	 * Run the test and invoke `fn(err)`.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runnable.prototype.run = function(fn) {
	  var self = this;
	  var start = new Date();
	  var ctx = this.ctx;
	  var finished;
	  var emitted;
	
	  // Sometimes the ctx exists, but it is not runnable
	  if (ctx && ctx.runnable) {
	    ctx.runnable(this);
	  }
	
	  // called multiple times
	  function multiple(err) {
	    if (emitted) {
	      return;
	    }
	    emitted = true;
	    self.emit('error', err || new Error('done() called multiple times; stacktrace may be inaccurate'));
	  }
	
	  // finished
	  function done(err) {
	    var ms = self.timeout();
	    if (self.timedOut) {
	      return;
	    }
	    if (finished) {
	      return multiple(err || self._trace);
	    }
	
	    self.clearTimeout();
	    self.duration = new Date() - start;
	    finished = true;
	    if (!err && self.duration > ms && self._enableTimeouts) {
	      err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');
	    }
	    fn(err);
	  }
	
	  // for .resetTimeout()
	  this.callback = done;
	
	  // explicit async with `done` argument
	  if (this.async) {
	    this.resetTimeout();
	
	    if (this.allowUncaught) {
	      return callFnAsync(this.fn);
	    }
	    try {
	      callFnAsync(this.fn);
	    } catch (err) {
	      done(utils.getError(err));
	    }
	    return;
	  }
	
	  if (this.allowUncaught) {
	    callFn(this.fn);
	    done();
	    return;
	  }
	
	  // sync or promise-returning
	  try {
	    if (this.pending) {
	      done();
	    } else {
	      callFn(this.fn);
	    }
	  } catch (err) {
	    done(utils.getError(err));
	  }
	
	  function callFn(fn) {
	    var result = fn.call(ctx);
	    if (result && typeof result.then === 'function') {
	      self.resetTimeout();
	      result
	        .then(function() {
	          done();
	          // Return null so libraries like bluebird do not warn about
	          // subsequently constructed Promises.
	          return null;
	        },
	        function(reason) {
	          done(reason || new Error('Promise rejected with no or falsy reason'));
	        });
	    } else {
	      if (self.asyncOnly) {
	        return done(new Error('--async-only option in use without declaring `done()` or returning a promise'));
	      }
	
	      done();
	    }
	  }
	
	  function callFnAsync(fn) {
	    fn.call(ctx, function(err) {
	      if (err instanceof Error || toString.call(err) === '[object Error]') {
	        return done(err);
	      }
	      if (err) {
	        if (Object.prototype.toString.call(err) === '[object Object]') {
	          return done(new Error('done() invoked with non-Error: '
	            + JSON.stringify(err)));
	        }
	        return done(new Error('done() invoked with non-Error: ' + err));
	      }
	      done();
	    });
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 136 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Pending`.
	 */
	
	module.exports = Pending;
	
	/**
	 * Initialize a new `Pending` error with the given message.
	 *
	 * @param {string} message
	 */
	function Pending(message) {
	  this.message = message;
	}


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Runnable = __webpack_require__(135);
	var inherits = __webpack_require__(63).inherits;
	
	/**
	 * Expose `Test`.
	 */
	
	module.exports = Test;
	
	/**
	 * Initialize a new `Test` with the given `title` and callback `fn`.
	 *
	 * @api private
	 * @param {String} title
	 * @param {Function} fn
	 */
	function Test(title, fn) {
	  Runnable.call(this, title, fn);
	  this.pending = !fn;
	  this.type = 'test';
	  this.body = (fn || '').toString();
	}
	
	/**
	 * Inherit from `Runnable.prototype`.
	 */
	inherits(Test, Runnable);
	
	Test.prototype.clone = function() {
	  var test = new Test(this.title, this.fn);
	  test.timeout(this.timeout());
	  test.slow(this.slow());
	  test.enableTimeouts(this.enableTimeouts());
	  test.retries(this.retries());
	  test.currentRetry(this.currentRetry());
	  test.globals(this.globals());
	  test.parent = this.parent;
	  test.file = this.file;
	  test.ctx = this.ctx;
	  return test;
	};


/***/ },
/* 138 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Functions common to more than one interface.
	 *
	 * @param {Suite[]} suites
	 * @param {Context} context
	 * @return {Object} An object containing common functions.
	 */
	module.exports = function(suites, context) {
	  return {
	    /**
	     * This is only present if flag --delay is passed into Mocha. It triggers
	     * root suite execution.
	     *
	     * @param {Suite} suite The root wuite.
	     * @return {Function} A function which runs the root suite
	     */
	    runWithSuite: function runWithSuite(suite) {
	      return function run() {
	        suite.run();
	      };
	    },
	
	    /**
	     * Execute before running tests.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    before: function(name, fn) {
	      suites[0].beforeAll(name, fn);
	    },
	
	    /**
	     * Execute after running tests.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    after: function(name, fn) {
	      suites[0].afterAll(name, fn);
	    },
	
	    /**
	     * Execute before each test case.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    beforeEach: function(name, fn) {
	      suites[0].beforeEach(name, fn);
	    },
	
	    /**
	     * Execute after each test case.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    afterEach: function(name, fn) {
	      suites[0].afterEach(name, fn);
	    },
	
	    test: {
	      /**
	       * Pending test case.
	       *
	       * @param {string} title
	       */
	      skip: function(title) {
	        context.test(title);
	      },
	
	      /**
	       * Number of retry attempts
	       *
	       * @param {string} n
	       */
	      retries: function(n) {
	        context.retries(n);
	      }
	    }
	  };
	};


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Suite = __webpack_require__(132);
	var Test = __webpack_require__(137);
	var escapeRe = __webpack_require__(56);
	
	/**
	 * TDD-style interface:
	 *
	 *      suite('Array', function() {
	 *        suite('#indexOf()', function() {
	 *          suiteSetup(function() {
	 *
	 *          });
	 *
	 *          test('should return -1 when not present', function() {
	 *
	 *          });
	 *
	 *          test('should return the index when present', function() {
	 *
	 *          });
	 *
	 *          suiteTeardown(function() {
	 *
	 *          });
	 *        });
	 *      });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];
	
	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(138)(suites, context);
	
	    context.setup = common.beforeEach;
	    context.teardown = common.afterEach;
	    context.suiteSetup = common.before;
	    context.suiteTeardown = common.after;
	    context.run = mocha.options.delay && common.runWithSuite(suite);
	
	    /**
	     * Describe a "suite" with the given `title` and callback `fn` containing
	     * nested suites and/or tests.
	     */
	    context.suite = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	      return suite;
	    };
	
	    /**
	     * Pending suite.
	     */
	    context.suite.skip = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.pending = true;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	    };
	
	    /**
	     * Exclusive test-case.
	     */
	    context.suite.only = function(title, fn) {
	      var suite = context.suite(title, fn);
	      mocha.grep(suite.fullTitle());
	    };
	
	    /**
	     * Describe a specification or test-case with the given `title` and
	     * callback `fn` acting as a thunk.
	     */
	    context.test = function(title, fn) {
	      var suite = suites[0];
	      if (suite.pending) {
	        fn = null;
	      }
	      var test = new Test(title, fn);
	      test.file = file;
	      suite.addTest(test);
	      return test;
	    };
	
	    /**
	     * Exclusive test-case.
	     */
	
	    context.test.only = function(title, fn) {
	      var test = context.test(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	    };
	
	    context.test.skip = common.test.skip;
	    context.test.retries = common.test.retries;
	  });
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Suite = __webpack_require__(132);
	var Test = __webpack_require__(137);
	var escapeRe = __webpack_require__(56);
	
	/**
	 * QUnit-style interface:
	 *
	 *     suite('Array');
	 *
	 *     test('#length', function() {
	 *       var arr = [1,2,3];
	 *       ok(arr.length == 3);
	 *     });
	 *
	 *     test('#indexOf()', function() {
	 *       var arr = [1,2,3];
	 *       ok(arr.indexOf(1) == 0);
	 *       ok(arr.indexOf(2) == 1);
	 *       ok(arr.indexOf(3) == 2);
	 *     });
	 *
	 *     suite('String');
	 *
	 *     test('#length', function() {
	 *       ok('foo'.length == 3);
	 *     });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];
	
	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(138)(suites, context);
	
	    context.before = common.before;
	    context.after = common.after;
	    context.beforeEach = common.beforeEach;
	    context.afterEach = common.afterEach;
	    context.run = mocha.options.delay && common.runWithSuite(suite);
	    /**
	     * Describe a "suite" with the given `title`.
	     */
	
	    context.suite = function(title) {
	      if (suites.length > 1) {
	        suites.shift();
	      }
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      return suite;
	    };
	
	    /**
	     * Exclusive test-case.
	     */
	
	    context.suite.only = function(title, fn) {
	      var suite = context.suite(title, fn);
	      mocha.grep(suite.fullTitle());
	    };
	
	    /**
	     * Describe a specification or test-case
	     * with the given `title` and callback `fn`
	     * acting as a thunk.
	     */
	
	    context.test = function(title, fn) {
	      var test = new Test(title, fn);
	      test.file = file;
	      suites[0].addTest(test);
	      return test;
	    };
	
	    /**
	     * Exclusive test-case.
	     */
	
	    context.test.only = function(title, fn) {
	      var test = context.test(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	    };
	
	    context.test.skip = common.test.skip;
	    context.test.retries = common.test.retries;
	  });
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Suite = __webpack_require__(132);
	var Test = __webpack_require__(137);
	
	/**
	 * TDD-style interface:
	 *
	 *     exports.Array = {
	 *       '#indexOf()': {
	 *         'should return -1 when the value is not present': function() {
	 *
	 *         },
	 *
	 *         'should return the correct index when the value is present': function() {
	 *
	 *         }
	 *       }
	 *     };
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];
	
	  suite.on('require', visit);
	
	  function visit(obj, file) {
	    var suite;
	    for (var key in obj) {
	      if (typeof obj[key] === 'function') {
	        var fn = obj[key];
	        switch (key) {
	          case 'before':
	            suites[0].beforeAll(fn);
	            break;
	          case 'after':
	            suites[0].afterAll(fn);
	            break;
	          case 'beforeEach':
	            suites[0].beforeEach(fn);
	            break;
	          case 'afterEach':
	            suites[0].afterEach(fn);
	            break;
	          default:
	            var test = new Test(key, fn);
	            test.file = file;
	            suites[0].addTest(test);
	        }
	      } else {
	        suite = Suite.create(suites[0], key);
	        suites.unshift(suite);
	        visit(obj[key], file);
	        suites.shift();
	      }
	    }
	  }
	};


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Expose `Context`.
	 */
	
	module.exports = Context;
	
	/**
	 * Initialize a new `Context`.
	 *
	 * @api private
	 */
	function Context() {}
	
	/**
	 * Set or get the context `Runnable` to `runnable`.
	 *
	 * @api private
	 * @param {Runnable} runnable
	 * @return {Context}
	 */
	Context.prototype.runnable = function(runnable) {
	  if (!arguments.length) {
	    return this._runnable;
	  }
	  this.test = this._runnable = runnable;
	  return this;
	};
	
	/**
	 * Set test timeout `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {Context} self
	 */
	Context.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this.runnable().timeout();
	  }
	  this.runnable().timeout(ms);
	  return this;
	};
	
	/**
	 * Set test timeout `enabled`.
	 *
	 * @api private
	 * @param {boolean} enabled
	 * @return {Context} self
	 */
	Context.prototype.enableTimeouts = function(enabled) {
	  this.runnable().enableTimeouts(enabled);
	  return this;
	};
	
	/**
	 * Set test slowness threshold `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {Context} self
	 */
	Context.prototype.slow = function(ms) {
	  this.runnable().slow(ms);
	  return this;
	};
	
	/**
	 * Mark a test as skipped.
	 *
	 * @api private
	 * @return {Context} self
	 */
	Context.prototype.skip = function() {
	  this.runnable().skip();
	  return this;
	};
	
	/**
	 * Allow a number of retries on failed tests
	 *
	 * @api private
	 * @param {number} n
	 * @return {Context} self
	 */
	Context.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this.runnable().retries();
	  }
	  this.runnable().retries(n);
	  return this;
	};
	
	/**
	 * Inspect the context void of `._runnable`.
	 *
	 * @api private
	 * @return {string}
	 */
	Context.prototype.inspect = function() {
	  return JSON.stringify(this, function(key, val) {
	    return key === 'runnable' || key === 'test' ? undefined : val;
	  }, 2);
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Module dependencies.
	 */
	
	var EventEmitter = __webpack_require__(133).EventEmitter;
	var Pending = __webpack_require__(136);
	var utils = __webpack_require__(63);
	var inherits = utils.inherits;
	var debug = __webpack_require__(64)('mocha:runner');
	var Runnable = __webpack_require__(135);
	var filter = utils.filter;
	var indexOf = utils.indexOf;
	var keys = utils.keys;
	var stackFilter = utils.stackTraceFilter();
	var stringify = utils.stringify;
	var type = utils.type;
	var undefinedError = utils.undefinedError;
	var isArray = utils.isArray;
	
	/**
	 * Non-enumerable globals.
	 */
	
	var globals = [
	  'setTimeout',
	  'clearTimeout',
	  'setInterval',
	  'clearInterval',
	  'XMLHttpRequest',
	  'Date',
	  'setImmediate',
	  'clearImmediate'
	];
	
	/**
	 * Expose `Runner`.
	 */
	
	module.exports = Runner;
	
	/**
	 * Initialize a `Runner` for the given `suite`.
	 *
	 * Events:
	 *
	 *   - `start`  execution started
	 *   - `end`  execution complete
	 *   - `suite`  (suite) test suite execution started
	 *   - `suite end`  (suite) all tests (and sub-suites) have finished
	 *   - `test`  (test) test execution started
	 *   - `test end`  (test) test completed
	 *   - `hook`  (hook) hook execution started
	 *   - `hook end`  (hook) hook complete
	 *   - `pass`  (test) test passed
	 *   - `fail`  (test, err) test failed
	 *   - `pending`  (test) test pending
	 *
	 * @api public
	 * @param {Suite} suite Root suite
	 * @param {boolean} [delay] Whether or not to delay execution of root suite
	 * until ready.
	 */
	function Runner(suite, delay) {
	  var self = this;
	  this._globals = [];
	  this._abort = false;
	  this._delay = delay;
	  this.suite = suite;
	  this.started = false;
	  this.total = suite.total();
	  this.failures = 0;
	  this.on('test end', function(test) {
	    self.checkGlobals(test);
	  });
	  this.on('hook end', function(hook) {
	    self.checkGlobals(hook);
	  });
	  this._defaultGrep = /.*/;
	  this.grep(this._defaultGrep);
	  this.globals(this.globalProps().concat(extraGlobals()));
	}
	
	/**
	 * Wrapper for setImmediate, process.nextTick, or browser polyfill.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runner.immediately = global.setImmediate || process.nextTick;
	
	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Runner, EventEmitter);
	
	/**
	 * Run tests with full titles matching `re`. Updates runner.total
	 * with number of tests matched.
	 *
	 * @param {RegExp} re
	 * @param {Boolean} invert
	 * @return {Runner} for chaining
	 * @api public
	 * @param {RegExp} re
	 * @param {boolean} invert
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.grep = function(re, invert) {
	  debug('grep %s', re);
	  this._grep = re;
	  this._invert = invert;
	  this.total = this.grepTotal(this.suite);
	  return this;
	};
	
	/**
	 * Returns the number of tests matching the grep search for the
	 * given suite.
	 *
	 * @param {Suite} suite
	 * @return {Number}
	 * @api public
	 * @param {Suite} suite
	 * @return {number}
	 */
	Runner.prototype.grepTotal = function(suite) {
	  var self = this;
	  var total = 0;
	
	  suite.eachTest(function(test) {
	    var match = self._grep.test(test.fullTitle());
	    if (self._invert) {
	      match = !match;
	    }
	    if (match) {
	      total++;
	    }
	  });
	
	  return total;
	};
	
	/**
	 * Return a list of global properties.
	 *
	 * @return {Array}
	 * @api private
	 */
	Runner.prototype.globalProps = function() {
	  var props = keys(global);
	
	  // non-enumerables
	  for (var i = 0; i < globals.length; ++i) {
	    if (~indexOf(props, globals[i])) {
	      continue;
	    }
	    props.push(globals[i]);
	  }
	
	  return props;
	};
	
	/**
	 * Allow the given `arr` of globals.
	 *
	 * @param {Array} arr
	 * @return {Runner} for chaining
	 * @api public
	 * @param {Array} arr
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.globals = function(arr) {
	  if (!arguments.length) {
	    return this._globals;
	  }
	  debug('globals %j', arr);
	  this._globals = this._globals.concat(arr);
	  return this;
	};
	
	/**
	 * Check for global variable leaks.
	 *
	 * @api private
	 */
	Runner.prototype.checkGlobals = function(test) {
	  if (this.ignoreLeaks) {
	    return;
	  }
	  var ok = this._globals;
	
	  var globals = this.globalProps();
	  var leaks;
	
	  if (test) {
	    ok = ok.concat(test._allowedGlobals || []);
	  }
	
	  if (this.prevGlobalsLength === globals.length) {
	    return;
	  }
	  this.prevGlobalsLength = globals.length;
	
	  leaks = filterLeaks(ok, globals);
	  this._globals = this._globals.concat(leaks);
	
	  if (leaks.length > 1) {
	    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));
	  } else if (leaks.length) {
	    this.fail(test, new Error('global leak detected: ' + leaks[0]));
	  }
	};
	
	/**
	 * Fail the given `test`.
	 *
	 * @api private
	 * @param {Test} test
	 * @param {Error} err
	 */
	Runner.prototype.fail = function(test, err) {
	  ++this.failures;
	  test.state = 'failed';
	
	  if (!(err instanceof Error || err && typeof err.message === 'string')) {
	    err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');
	  }
	
	  err.stack = (this.fullStackTrace || !err.stack)
	    ? err.stack
	    : stackFilter(err.stack);
	
	  this.emit('fail', test, err);
	};
	
	/**
	 * Fail the given `hook` with `err`.
	 *
	 * Hook failures work in the following pattern:
	 * - If bail, then exit
	 * - Failed `before` hook skips all tests in a suite and subsuites,
	 *   but jumps to corresponding `after` hook
	 * - Failed `before each` hook skips remaining tests in a
	 *   suite and jumps to corresponding `after each` hook,
	 *   which is run only once
	 * - Failed `after` hook does not alter
	 *   execution order
	 * - Failed `after each` hook skips remaining tests in a
	 *   suite and subsuites, but executes other `after each`
	 *   hooks
	 *
	 * @api private
	 * @param {Hook} hook
	 * @param {Error} err
	 */
	Runner.prototype.failHook = function(hook, err) {
	  if (hook.ctx && hook.ctx.currentTest) {
	    hook.originalTitle = hook.originalTitle || hook.title;
	    hook.title = hook.originalTitle + ' for "' + hook.ctx.currentTest.title + '"';
	  }
	
	  this.fail(hook, err);
	  if (this.suite.bail()) {
	    this.emit('end');
	  }
	};
	
	/**
	 * Run hook `name` callbacks and then invoke `fn()`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {Function} fn
	 */
	
	Runner.prototype.hook = function(name, fn) {
	  var suite = this.suite;
	  var hooks = suite['_' + name];
	  var self = this;
	
	  function next(i) {
	    var hook = hooks[i];
	    if (!hook) {
	      return fn();
	    }
	    self.currentRunnable = hook;
	
	    hook.ctx.currentTest = self.test;
	
	    self.emit('hook', hook);
	
	    if (!hook.listeners('error').length) {
	      hook.on('error', function(err) {
	        self.failHook(hook, err);
	      });
	    }
	
	    hook.run(function(err) {
	      var testError = hook.error();
	      if (testError) {
	        self.fail(self.test, testError);
	      }
	      if (err) {
	        if (err instanceof Pending) {
	          suite.pending = true;
	        } else {
	          self.failHook(hook, err);
	
	          // stop executing hooks, notify callee of hook err
	          return fn(err);
	        }
	      }
	      self.emit('hook end', hook);
	      delete hook.ctx.currentTest;
	      next(++i);
	    });
	  }
	
	  Runner.immediately(function() {
	    next(0);
	  });
	};
	
	/**
	 * Run hook `name` for the given array of `suites`
	 * in order, and callback `fn(err, errSuite)`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {Array} suites
	 * @param {Function} fn
	 */
	Runner.prototype.hooks = function(name, suites, fn) {
	  var self = this;
	  var orig = this.suite;
	
	  function next(suite) {
	    self.suite = suite;
	
	    if (!suite) {
	      self.suite = orig;
	      return fn();
	    }
	
	    self.hook(name, function(err) {
	      if (err) {
	        var errSuite = self.suite;
	        self.suite = orig;
	        return fn(err, errSuite);
	      }
	
	      next(suites.pop());
	    });
	  }
	
	  next(suites.pop());
	};
	
	/**
	 * Run hooks from the top level down.
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.hookUp = function(name, fn) {
	  var suites = [this.suite].concat(this.parents()).reverse();
	  this.hooks(name, suites, fn);
	};
	
	/**
	 * Run hooks from the bottom up.
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.hookDown = function(name, fn) {
	  var suites = [this.suite].concat(this.parents());
	  this.hooks(name, suites, fn);
	};
	
	/**
	 * Return an array of parent Suites from
	 * closest to furthest.
	 *
	 * @return {Array}
	 * @api private
	 */
	Runner.prototype.parents = function() {
	  var suite = this.suite;
	  var suites = [];
	  while (suite.parent) {
	    suite = suite.parent;
	    suites.push(suite);
	  }
	  return suites;
	};
	
	/**
	 * Run the current test and callback `fn(err)`.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.runTest = function(fn) {
	  var self = this;
	  var test = this.test;
	
	  if (this.asyncOnly) {
	    test.asyncOnly = true;
	  }
	
	  if (this.allowUncaught) {
	    test.allowUncaught = true;
	    return test.run(fn);
	  }
	  try {
	    test.on('error', function(err) {
	      self.fail(test, err);
	    });
	    test.run(fn);
	  } catch (err) {
	    fn(err);
	  }
	};
	
	/**
	 * Run tests in the given `suite` and invoke the callback `fn()` when complete.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @param {Function} fn
	 */
	Runner.prototype.runTests = function(suite, fn) {
	  var self = this;
	  var tests = suite.tests.slice();
	  var test;
	
	  function hookErr(_, errSuite, after) {
	    // before/after Each hook for errSuite failed:
	    var orig = self.suite;
	
	    // for failed 'after each' hook start from errSuite parent,
	    // otherwise start from errSuite itself
	    self.suite = after ? errSuite.parent : errSuite;
	
	    if (self.suite) {
	      // call hookUp afterEach
	      self.hookUp('afterEach', function(err2, errSuite2) {
	        self.suite = orig;
	        // some hooks may fail even now
	        if (err2) {
	          return hookErr(err2, errSuite2, true);
	        }
	        // report error suite
	        fn(errSuite);
	      });
	    } else {
	      // there is no need calling other 'after each' hooks
	      self.suite = orig;
	      fn(errSuite);
	    }
	  }
	
	  function next(err, errSuite) {
	    // if we bail after first err
	    if (self.failures && suite._bail) {
	      return fn();
	    }
	
	    if (self._abort) {
	      return fn();
	    }
	
	    if (err) {
	      return hookErr(err, errSuite, true);
	    }
	
	    // next test
	    test = tests.shift();
	
	    // all done
	    if (!test) {
	      return fn();
	    }
	
	    // grep
	    var match = self._grep.test(test.fullTitle());
	    if (self._invert) {
	      match = !match;
	    }
	    if (!match) {
	      // Run immediately only if we have defined a grep. When we
	      // define a grep — It can cause maximum callstack error if
	      // the grep is doing a large recursive loop by neglecting
	      // all tests. The run immediately function also comes with
	      // a performance cost. So we don't want to run immediately
	      // if we run the whole test suite, because running the whole
	      // test suite don't do any immediate recursive loops. Thus,
	      // allowing a JS runtime to breathe.
	      if (self._grep !== self._defaultGrep) {
	        Runner.immediately(next);
	      } else {
	        next();
	      }
	      return;
	    }
	
	    function parentPending(suite) {
	      return suite.pending || (suite.parent && parentPending(suite.parent));
	    }
	
	    // pending
	    if (test.pending || parentPending(test.parent)) {
	      self.emit('pending', test);
	      self.emit('test end', test);
	      return next();
	    }
	
	    // execute test and hook(s)
	    self.emit('test', self.test = test);
	    self.hookDown('beforeEach', function(err, errSuite) {
	      if (suite.pending) {
	        self.emit('pending', test);
	        self.emit('test end', test);
	        return next();
	      }
	      if (err) {
	        return hookErr(err, errSuite, false);
	      }
	      self.currentRunnable = self.test;
	      self.runTest(function(err) {
	        test = self.test;
	        if (err) {
	          var retry = test.currentRetry();
	          if (err instanceof Pending) {
	            test.pending = true;
	            self.emit('pending', test);
	          } else if (retry < test.retries()) {
	            var clonedTest = test.clone();
	            clonedTest.currentRetry(retry + 1);
	            tests.unshift(clonedTest);
	
	            // Early return + hook trigger so that it doesn't
	            // increment the count wrong
	            return self.hookUp('afterEach', next);
	          } else {
	            self.fail(test, err);
	          }
	          self.emit('test end', test);
	
	          if (err instanceof Pending) {
	            return next();
	          }
	
	          return self.hookUp('afterEach', next);
	        }
	
	        test.state = 'passed';
	        self.emit('pass', test);
	        self.emit('test end', test);
	        self.hookUp('afterEach', next);
	      });
	    });
	  }
	
	  this.next = next;
	  this.hookErr = hookErr;
	  next();
	};
	
	/**
	 * Run the given `suite` and invoke the callback `fn()` when complete.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @param {Function} fn
	 */
	Runner.prototype.runSuite = function(suite, fn) {
	  var i = 0;
	  var self = this;
	  var total = this.grepTotal(suite);
	  var afterAllHookCalled = false;
	
	  debug('run suite %s', suite.fullTitle());
	
	  if (!total || (self.failures && suite._bail)) {
	    return fn();
	  }
	
	  this.emit('suite', this.suite = suite);
	
	  function next(errSuite) {
	    if (errSuite) {
	      // current suite failed on a hook from errSuite
	      if (errSuite === suite) {
	        // if errSuite is current suite
	        // continue to the next sibling suite
	        return done();
	      }
	      // errSuite is among the parents of current suite
	      // stop execution of errSuite and all sub-suites
	      return done(errSuite);
	    }
	
	    if (self._abort) {
	      return done();
	    }
	
	    var curr = suite.suites[i++];
	    if (!curr) {
	      return done();
	    }
	
	    // Avoid grep neglecting large number of tests causing a
	    // huge recursive loop and thus a maximum call stack error.
	    // See comment in `this.runTests()` for more information.
	    if (self._grep !== self._defaultGrep) {
	      Runner.immediately(function() {
	        self.runSuite(curr, next);
	      });
	    } else {
	      self.runSuite(curr, next);
	    }
	  }
	
	  function done(errSuite) {
	    self.suite = suite;
	    self.nextSuite = next;
	
	    if (afterAllHookCalled) {
	      fn(errSuite);
	    } else {
	      // mark that the afterAll block has been called once
	      // and so can be skipped if there is an error in it.
	      afterAllHookCalled = true;
	
	      // remove reference to test
	      delete self.test;
	
	      self.hook('afterAll', function() {
	        self.emit('suite end', suite);
	        fn(errSuite);
	      });
	    }
	  }
	
	  this.nextSuite = next;
	
	  this.hook('beforeAll', function(err) {
	    if (err) {
	      return done();
	    }
	    self.runTests(suite, next);
	  });
	};
	
	/**
	 * Handle uncaught exceptions.
	 *
	 * @param {Error} err
	 * @api private
	 */
	Runner.prototype.uncaught = function(err) {
	  if (err) {
	    debug('uncaught exception %s', err !== function() {
	      return this;
	    }.call(err) ? err : (err.message || err));
	  } else {
	    debug('uncaught undefined exception');
	    err = undefinedError();
	  }
	  err.uncaught = true;
	
	  var runnable = this.currentRunnable;
	
	  if (!runnable) {
	    runnable = new Runnable('Uncaught error outside test suite');
	    runnable.parent = this.suite;
	
	    if (this.started) {
	      this.fail(runnable, err);
	    } else {
	      // Can't recover from this failure
	      this.emit('start');
	      this.fail(runnable, err);
	      this.emit('end');
	    }
	
	    return;
	  }
	
	  runnable.clearTimeout();
	
	  // Ignore errors if complete
	  if (runnable.state) {
	    return;
	  }
	  this.fail(runnable, err);
	
	  // recover from test
	  if (runnable.type === 'test') {
	    this.emit('test end', runnable);
	    this.hookUp('afterEach', this.next);
	    return;
	  }
	
	 // recover from hooks
	  if (runnable.type === 'hook') {
	    var errSuite = this.suite;
	    // if hook failure is in afterEach block
	    if (runnable.fullTitle().indexOf('after each') > -1) {
	      return this.hookErr(err, errSuite, true);
	    }
	    // if hook failure is in beforeEach block
	    if (runnable.fullTitle().indexOf('before each') > -1) {
	      return this.hookErr(err, errSuite, false);
	    }
	    // if hook failure is in after or before blocks
	    return this.nextSuite(errSuite);
	  }
	
	  // bail
	  this.emit('end');
	};
	
	/**
	 * Cleans up the references to all the deferred functions
	 * (before/after/beforeEach/afterEach) and tests of a Suite.
	 * These must be deleted otherwise a memory leak can happen,
	 * as those functions may reference variables from closures,
	 * thus those variables can never be garbage collected as long
	 * as the deferred functions exist.
	 *
	 * @param {Suite} suite
	 */
	function cleanSuiteReferences(suite) {
	  function cleanArrReferences(arr) {
	    for (var i = 0; i < arr.length; i++) {
	      delete arr[i].fn;
	    }
	  }
	
	  if (isArray(suite._beforeAll)) {
	    cleanArrReferences(suite._beforeAll);
	  }
	
	  if (isArray(suite._beforeEach)) {
	    cleanArrReferences(suite._beforeEach);
	  }
	
	  if (isArray(suite._afterAll)) {
	    cleanArrReferences(suite._afterAll);
	  }
	
	  if (isArray(suite._afterEach)) {
	    cleanArrReferences(suite._afterEach);
	  }
	
	  for (var i = 0; i < suite.tests.length; i++) {
	    delete suite.tests[i].fn;
	  }
	}
	
	/**
	 * Run the root suite and invoke `fn(failures)`
	 * on completion.
	 *
	 * @param {Function} fn
	 * @return {Runner} for chaining
	 * @api public
	 * @param {Function} fn
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.run = function(fn) {
	  var self = this;
	  var rootSuite = this.suite;
	
	  fn = fn || function() {};
	
	  function uncaught(err) {
	    self.uncaught(err);
	  }
	
	  function start() {
	    self.started = true;
	    self.emit('start');
	    self.runSuite(rootSuite, function() {
	      debug('finished running');
	      self.emit('end');
	    });
	  }
	
	  debug('start');
	
	  // references cleanup to avoid memory leaks
	  this.on('suite end', cleanSuiteReferences);
	
	  // callback
	  this.on('end', function() {
	    debug('end');
	    process.removeListener('uncaughtException', uncaught);
	    fn(self.failures);
	  });
	
	  // uncaught exception
	  process.on('uncaughtException', uncaught);
	
	  if (this._delay) {
	    // for reporters, I guess.
	    // might be nice to debounce some dots while we wait.
	    this.emit('waiting', rootSuite);
	    rootSuite.once('run', start);
	  } else {
	    start();
	  }
	
	  return this;
	};
	
	/**
	 * Cleanly abort execution.
	 *
	 * @api public
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.abort = function() {
	  debug('aborting');
	  this._abort = true;
	
	  return this;
	};
	
	/**
	 * Filter leaks with the given globals flagged as `ok`.
	 *
	 * @api private
	 * @param {Array} ok
	 * @param {Array} globals
	 * @return {Array}
	 */
	function filterLeaks(ok, globals) {
	  return filter(globals, function(key) {
	    // Firefox and Chrome exposes iframes as index inside the window object
	    if (/^d+/.test(key)) {
	      return false;
	    }
	
	    // in firefox
	    // if runner runs in an iframe, this iframe's window.getInterface method not init at first
	    // it is assigned in some seconds
	    if (global.navigator && (/^getInterface/).test(key)) {
	      return false;
	    }
	
	    // an iframe could be approached by window[iframeIndex]
	    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak
	    if (global.navigator && (/^\d+/).test(key)) {
	      return false;
	    }
	
	    // Opera and IE expose global variables for HTML element IDs (issue #243)
	    if (/^mocha-/.test(key)) {
	      return false;
	    }
	
	    var matched = filter(ok, function(ok) {
	      if (~ok.indexOf('*')) {
	        return key.indexOf(ok.split('*')[0]) === 0;
	      }
	      return key === ok;
	    });
	    return !matched.length && (!global.navigator || key !== 'onerror');
	  });
	}
	
	/**
	 * Array of globals dependent on the environment.
	 *
	 * @return {Array}
	 * @api private
	 */
	function extraGlobals() {
	  if (typeof process === 'object' && typeof process.version === 'string') {
	    var parts = process.version.split('.');
	    var nodeVersion = utils.reduce(parts, function(a, v) {
	      return a << 8 | v;
	    });
	
	    // 'errno' was renamed to process._errno in v0.9.11.
	
	    if (nodeVersion < 0x00090B) {
	      return ['errno'];
	    }
	  }
	
	  return [];
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(53)))

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./browser/debug": 64,
		"./browser/debug.js": 64,
		"./browser/events": 133,
		"./browser/events.js": 133,
		"./browser/progress": 91,
		"./browser/progress.js": 91,
		"./browser/tty": 60,
		"./browser/tty.js": 60,
		"./context": 142,
		"./context.js": 142,
		"./hook": 134,
		"./hook.js": 134,
		"./interfaces/bdd": 131,
		"./interfaces/bdd.js": 131,
		"./interfaces/common": 138,
		"./interfaces/common.js": 138,
		"./interfaces/exports": 141,
		"./interfaces/exports.js": 141,
		"./interfaces/index": 130,
		"./interfaces/index.js": 130,
		"./interfaces/qunit": 140,
		"./interfaces/qunit.js": 140,
		"./interfaces/tdd": 139,
		"./interfaces/tdd.js": 139,
		"./mocha": 54,
		"./mocha.js": 54,
		"./ms": 62,
		"./ms.js": 62,
		"./pending": 136,
		"./pending.js": 136,
		"./reporters/base": 59,
		"./reporters/base.js": 59,
		"./reporters/doc": 87,
		"./reporters/doc.js": 87,
		"./reporters/dot": 86,
		"./reporters/dot.js": 86,
		"./reporters/html": 90,
		"./reporters/html-cov": 102,
		"./reporters/html-cov.js": 102,
		"./reporters/html.js": 90,
		"./reporters/index": 58,
		"./reporters/index.js": 58,
		"./reporters/json": 89,
		"./reporters/json-cov": 101,
		"./reporters/json-cov.js": 101,
		"./reporters/json-stream": 129,
		"./reporters/json-stream.js": 129,
		"./reporters/json.js": 89,
		"./reporters/landing": 100,
		"./reporters/landing.js": 100,
		"./reporters/list": 92,
		"./reporters/list.js": 92,
		"./reporters/markdown": 98,
		"./reporters/markdown.js": 98,
		"./reporters/min": 93,
		"./reporters/min.js": 93,
		"./reporters/nyan": 95,
		"./reporters/nyan.js": 95,
		"./reporters/progress": 99,
		"./reporters/progress.js": 99,
		"./reporters/spec": 94,
		"./reporters/spec.js": 94,
		"./reporters/tap": 88,
		"./reporters/tap.js": 88,
		"./reporters/xunit": 96,
		"./reporters/xunit.js": 96,
		"./runnable": 135,
		"./runnable.js": 135,
		"./runner": 143,
		"./runner.js": 143,
		"./suite": 132,
		"./suite.js": 132,
		"./test": 137,
		"./test.js": 137,
		"./utils": 63,
		"./utils.js": 63
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 144;


/***/ },
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)
	
	/**
	 * Module dependencies.
	 */
	
	var exec = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).exec
	  , fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , path = __webpack_require__(57)
	  , exists = fs.existsSync || path.existsSync
	  , os = __webpack_require__(151)
	  , quote = JSON.stringify
	  , cmd;
	
	function which(name) {
	  var paths = process.env.PATH.split(':');
	  var loc;
	  
	  for (var i = 0, len = paths.length; i < len; ++i) {
	    loc = path.join(paths[i], name);
	    if (exists(loc)) return loc;
	  }
	}
	
	switch(os.type()) {
	  case 'Darwin':
	    if (which('terminal-notifier')) {
	      cmd = {
	          type: "Darwin-NotificationCenter"
	        , pkg: "terminal-notifier"
	        , msg: '-message'
	        , title: '-title'
	        , subtitle: '-subtitle'
	        , priority: {
	              cmd: '-execute'
	            , range: []
	          }
	      };
	    } else {
	      cmd = {
	          type: "Darwin-Growl"
	        , pkg: "growlnotify"
	        , msg: '-m'
	        , sticky: '--sticky'
	        , priority: {
	              cmd: '--priority'
	            , range: [
	                -2
	              , -1
	              , 0
	              , 1
	              , 2
	              , "Very Low"
	              , "Moderate"
	              , "Normal"
	              , "High"
	              , "Emergency"
	            ]
	          }
	      };
	    }
	    break;
	  case 'Linux':
	    cmd = {
	        type: "Linux"
	      , pkg: "notify-send"
	      , msg: ''
	      , sticky: '-t 0'
	      , icon: '-i'
	      , priority: {
	          cmd: '-u'
	        , range: [
	            "low"
	          , "normal"
	          , "critical"
	        ]
	      }
	    };
	    break;
	  case 'Windows_NT':
	    cmd = {
	        type: "Windows"
	      , pkg: "growlnotify"
	      , msg: ''
	      , sticky: '/s:true'
	      , title: '/t:'
	      , icon: '/i:'
	      , priority: {
	            cmd: '/p:'
	          , range: [
	              -2
	            , -1
	            , 0
	            , 1
	            , 2
	          ]
	        }
	    };
	    break;
	}
	
	/**
	 * Expose `growl`.
	 */
	
	exports = module.exports = growl;
	
	/**
	 * Node-growl version.
	 */
	
	exports.version = '1.4.1'
	
	/**
	 * Send growl notification _msg_ with _options_.
	 *
	 * Options:
	 *
	 *  - title   Notification title
	 *  - sticky  Make the notification stick (defaults to false)
	 *  - priority  Specify an int or named key (default is 0)
	 *  - name    Application name (defaults to growlnotify)
	 *  - image
	 *    - path to an icon sets --iconpath
	 *    - path to an image sets --image
	 *    - capitalized word sets --appIcon
	 *    - filename uses extname as --icon
	 *    - otherwise treated as --icon
	 *
	 * Examples:
	 *
	 *   growl('New email')
	 *   growl('5 new emails', { title: 'Thunderbird' })
	 *   growl('Email sent', function(){
	 *     // ... notification sent
	 *   })
	 *
	 * @param {string} msg
	 * @param {object} options
	 * @param {function} fn
	 * @api public
	 */
	
	function growl(msg, options, fn) {
	  var image
	    , args
	    , options = options || {}
	    , fn = fn || function(){};
	
	  // noop
	  if (!cmd) return fn(new Error('growl not supported on this platform'));
	  args = [cmd.pkg];
	
	  // image
	  if (image = options.image) {
	    switch(cmd.type) {
	      case 'Darwin-Growl':
	        var flag, ext = path.extname(image).substr(1)
	        flag = flag || ext == 'icns' && 'iconpath'
	        flag = flag || /^[A-Z]/.test(image) && 'appIcon'
	        flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image'
	        flag = flag || ext && (image = ext) && 'icon'
	        flag = flag || 'icon'
	        args.push('--' + flag, quote(image))
	        break;
	      case 'Linux':
	        args.push(cmd.icon, quote(image));
	        // libnotify defaults to sticky, set a hint for transient notifications
	        if (!options.sticky) args.push('--hint=int:transient:1');
	        break;
	      case 'Windows':
	        args.push(cmd.icon + quote(image));
	        break;
	    }
	  }
	
	  // sticky
	  if (options.sticky) args.push(cmd.sticky);
	
	  // priority
	  if (options.priority) {
	    var priority = options.priority + '';
	    var checkindexOf = cmd.priority.range.indexOf(priority);
	    if (~cmd.priority.range.indexOf(priority)) {
	      args.push(cmd.priority, options.priority);
	    }
	  }
	
	  // name
	  if (options.name && cmd.type === "Darwin-Growl") {
	    args.push('--name', options.name);
	  }
	
	  switch(cmd.type) {
	    case 'Darwin-Growl':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) args.push(quote(options.title));
	      break;
	    case 'Darwin-NotificationCenter':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) {
	        args.push(cmd.title);
	        args.push(quote(options.title));
	      }
	      if (options.subtitle) {
	        args.push(cmd.subtitle);
	        args.push(quote(options.subtitle));
	      }
	      break;
	    case 'Darwin-Growl':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) args.push(quote(options.title));
	      break;
	    case 'Linux':
	      if (options.title) {
	        args.push(quote(options.title));
	        args.push(cmd.msg);
	        args.push(quote(msg));
	      } else {
	        args.push(quote(msg));
	      }
	      break;
	    case 'Windows':
	      args.push(quote(msg));
	      if (options.title) args.push(cmd.title + quote(options.title));
	      break;
	  }
	
	  // execute
	  exec(args.join(' '), fn);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ },
/* 151 */
/***/ function(module, exports) {

	exports.endianness = function () { return 'LE' };
	
	exports.hostname = function () {
	    if (typeof location !== 'undefined') {
	        return location.hostname
	    }
	    else return '';
	};
	
	exports.loadavg = function () { return [] };
	
	exports.uptime = function () { return 0 };
	
	exports.freemem = function () {
	    return Number.MAX_VALUE;
	};
	
	exports.totalmem = function () {
	    return Number.MAX_VALUE;
	};
	
	exports.cpus = function () { return [] };
	
	exports.type = function () { return 'Browser' };
	
	exports.release = function () {
	    if (typeof navigator !== 'undefined') {
	        return navigator.appVersion;
	    }
	    return '';
	};
	
	exports.networkInterfaces
	= exports.getNetworkInterfaces
	= function () { return {} };
	
	exports.arch = function () { return 'javascript' };
	
	exports.platform = function () { return 'browser' };
	
	exports.tmpdir = exports.tmpDir = function () {
	    return '/tmp';
	};
	
	exports.EOL = '\n';


/***/ }
/******/ ])
});
;
//# sourceMappingURL=tests.js.map