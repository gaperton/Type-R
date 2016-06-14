"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var transactions_ts_1 = require('./transactions.ts');
var compile_1 = require('./compile');
var tools_1 = require('../../tools');
var _cidCount = 0;
var Record = (function (_super) {
    __extends(Record, _super);
    /**
     * Construction and cloning
     */
    function Record(attributes, opts) {
        var _this = this;
        _super.call(this);
        var attrs = this.__attributes, values = attributes || {}, options = opts || {};
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
            }
            else {
                error.unknownAttribute(model, key, value);
            }
        });
        this._previousAttributes = this.attributes = values;
        this.initialize.apply(this, arguments);
    }
    Record.define = function (spec) {
        var BaseModel = Object.getPrototypeOf(this.prototype).constructor;
        // Create collection
        if (this.Collection === BaseModel.Collection) {
            this.Collection = (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    _super.apply(this, arguments);
                }
                return class_1;
            }(BaseModel.Collection));
            this.Collection.prototype.Record = this;
        }
        if (spec) {
            // define stuff
            _super.define.call(this, compile_1["default"](spec, BaseModel.prototype));
            var collection = spec.collection;
            if (collection) {
                if (typeof collection === 'function') {
                    // Link model to collection
                    this.Collection = collection;
                    this.Collection.prototype.Record = this;
                }
                else {
                    // Configure our local Collection
                    this.Collection.define(collection);
                }
            }
        }
    };
    Record.prototype.initialize = function () { };
    Record.prototype.defaults = function (attrs, options) {
        return new this.Attributes(attrs);
    };
    Record.prototype.clone = function (options) {
        if (options === void 0) { options = { deep: true }; }
        return new this.constructor(this.attributes, options);
    };
    /**
     * Attributes handling and ownership
     */
    Record.prototype.Attributes = function (attrs) {
    };
    Record.prototype.forEachAttr = function (obj, fun) {
    };
    Object.defineProperty(Record.prototype, "id", {
        get: function () {
            // (!) No get hooks on id attribute.
            var idAttribute = this.idAttribute;
            return idAttribute && this.attributes[idAttribute];
        },
        set: function (value) {
            var idAttribute = this.idAttribute;
            idAttribute && transactions_ts_1.setAttribute(this, idAttribute, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "collection", {
        get: function () {
            return (!this._ownerKey && this._owner) || null;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.getOwner = function () {
        var _owner = this._owner;
        return this._ownerKey ? _owner : (_owner && _owner._owner);
    };
    /**
     * Object sync API
     * set( { attrs }, options )
     */
    Record.prototype.set = function (values, options) {
        if (values) {
            if (Object.getPrototypeOf(values) === Object.prototype) {
                this.createTransaction(values, options).commit(options);
            }
            else {
            }
        }
        return this;
    };
    /**
     * Transactional API stubs (provided by separate mixin)
     */
    Record.prototype.createTransaction = function (values, options) { };
    Record.prototype.transaction = function (fun, options) { };
    Record.prototype._onChildrenChange = function (child, options) {
        if (options === void 0) { options = {}; }
        this.forceChange(child._ownerAttr, options);
    };
    Record.prototype.forceChange = function (key, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin(this);
        if (!options.silent) {
            this._pending = options;
            key && this._notifyChangeAttr(key, options);
        }
        isRoot && commit(this, options);
    };
    /**
     * Events system stubs
     */
    Record.prototype._notifyChange = function (options) {
        this._changeToken = {};
        this.trigger('change', this, options);
    };
    Record.prototype._notifyChangeAttr = function (name, options) {
        this.trigger('change:' + name, this.attributes[name], this, options);
    };
    /**
     * Serialization API
     * toJSON(), parse( data )
     */
    Record.prototype.toJSON = function () {
        var self = this, res = {}, attrSpecs = this.__attributes;
        this.forEachAttr(this.attributes, function (value, key) {
            var attrSpec = attrSpecs[key], toJSON = attrSpec && attrSpec.toJSON;
            if (toJSON) {
                res[key] = toJSON.call(self, value, key);
            }
        });
        return res;
    };
    Record.prototype.parse = function (resp) {
        return this._parse(resp);
    };
    Record.prototype._parse = function (resp) {
        return resp;
    };
    Object.defineProperty(Record.prototype, "changed", {
        /**
         * Changes tracking API
         * hasChanges( attr ), changedAttributes( diff ), previousAttributes()
         */
        get: function () {
            var changed = this._changed;
            if (!changed) {
                changed = this._changed = {};
                var _a = this, attributes_1 = _a.attributes, _previousAttributes_1 = _a._previousAttributes;
                this.forEachAttr(this._attributes, function (attr, key) {
                    var curr = attributes_1[key], prev = _previousAttributes_1[key];
                    if (attr.isChanged(curr, prev)) {
                        changed[key] = curr;
                    }
                });
            }
            return changed;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.hasChanged = function (attr) {
        if (attr == null) {
            return !_.isEmpty(this.changed); //TODO: remove underscore.
        }
        return this._attributes[attr].isChanged(this.attributes[attr], this._previousAttributes[attr]);
    };
    Record.prototype.changedAttributes = function (diff) {
        if (!diff) {
            return this.hasChanged() ? _.clone(this.changed) : false;
        }
        var val, changed = false, old = this._changing ? this._previousAttributes : this.attributes, attrSpecs = this._attributes;
        for (var attr in diff) {
            if (!attrSpecs[attr].isChanged(old[attr], (val = diff[attr]))) {
                continue;
            }
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };
    Record.prototype.previousAttributes = function () {
        return new this.Attributes(this._previousAttributes);
    };
    return Record;
}(tools_1.Class));
exports.Record = Record;
tools_1.assign(Record.prototype, transactions_ts_1.RecordMixin);
var s = {
    // extend Model and its Collection
    extend: function (protoProps, staticProps) {
        var Child;
        if (typeof protoProps === 'function') {
            Child = protoProps;
            protoProps = null;
        }
        else if (protoProps && protoProps.hasOwnProperty('constructor')) {
            Child = protoProps.constructor;
        }
        else {
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
    define: function (protoProps, staticProps) {
        var Base = Object.getPrototypeOf(this.prototype).constructor, spec = createDefinition(protoProps, Base), This = this;
        Object.extend.Class.define.call(This, spec, staticProps);
        attachMixins(This);
        // define Collection
        var collectionSpec = { model: This };
        spec.urlRoot && (collectionSpec.url = spec.urlRoot);
        This.Collection.define(_.defaults(protoProps.collection || {}, collectionSpec));
        return This;
    }
};
//# sourceMappingURL=index.js.map