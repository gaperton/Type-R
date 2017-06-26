var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Record } from './transaction';
import { tools, define } from '../object-plus';
import { compile } from './define';
import { ChainableAttributeSpec } from './typespec';
import { Transactional } from '../transactions';
import { AggregatedType, MSDateType, TimestampType, NumericType, SharedType } from './attributes';
export * from './attributes';
export { Record, ChainableAttributeSpec };
var assign = tools.assign, defaults = tools.defaults, omit = tools.omit, getBaseClass = tools.getBaseClass;
Record.onDefine = function (definition, BaseClass) {
    var baseProto = BaseClass.prototype;
    var dynamicMixin = compile(this.attributes = getAttributes(definition), baseProto._attributes);
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    assign(dynamicMixin.properties, protoProps.properties || {});
    Transactional.onDefine.call(this, dynamicMixin, BaseClass);
    defineCollection.call(this, definition.collection || definition.Collection);
};
Record.onDefine = function (definition, BaseClass) {
    var baseProto = BaseClass.prototype;
    if ('Collection' in this && this.Collection === void 0) {
        tools.log.error("[Model Definition] " + this.prototype.getClassName() + ".Collection is undefined. It must be defined _before_ the model.", definition);
    }
    var dynamicMixin = compile(this.attributes = getAttributes(definition), baseProto._attributes);
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    this.mixin(dynamicMixin);
    defineCollection.call(this, definition.collection || definition.Collection);
    return this;
};
Record.onExtend = function (BaseClass) {
    Transactional.onExtend.call(this, BaseClass);
    var Class = this;
    var DefaultCollection = (function (_super) {
        __extends(DefaultCollection, _super);
        function DefaultCollection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DefaultCollection;
    }((BaseClass.Collection)));
    DefaultCollection.model = Class;
    DefaultCollection = __decorate([
        define
    ], DefaultCollection);
    this.Collection = DefaultCollection;
    createSharedTypeSpec(this, SharedType);
};
Record._attribute = AggregatedType;
createSharedTypeSpec(Record, SharedType);
function getAttributes(_a) {
    var defaults = _a.defaults, attributes = _a.attributes, idAttribute = _a.idAttribute;
    var definition = typeof defaults === 'function' ? defaults() : attributes || defaults || {};
    if (idAttribute && !(idAttribute in definition)) {
        definition[idAttribute] = void 0;
    }
    return definition;
}
function defineCollection(collection) {
    if (typeof collection === 'function') {
        this.Collection = collection;
        this.Collection.prototype.model = this;
    }
    else {
        this.Collection.define(collection || {});
    }
}
Object.defineProperties(Date, {
    microsoft: {
        get: function () {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: MSDateType
            });
        }
    },
    timestamp: {
        get: function () {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: TimestampType
            });
        }
    }
});
Number.integer = function (x) { return x ? Math.round(x) : 0; };
Number.integer._attribute = NumericType;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
export function createSharedTypeSpec(Constructor, Attribute) {
    Constructor.hasOwnProperty('shared') ||
        Object.defineProperty(Constructor, 'shared', {
            get: function () {
                return new ChainableAttributeSpec({
                    value: null,
                    type: Constructor,
                    _attribute: Attribute
                });
            }
        });
}
//# sourceMappingURL=index.js.map