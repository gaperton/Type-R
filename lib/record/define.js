import { createAttribute } from './attributes';
import { tools, eventsApi } from '../object-plus';
import { CompiledReference } from '../traversable';
var defaults = tools.defaults, isValidJSON = tools.isValidJSON, transform = tools.transform, log = tools.log, EventMap = eventsApi.EventMap;
export function compile(rawSpecs, baseAttributes) {
    var myAttributes = transform({}, rawSpecs, createAttribute), allAttributes = defaults({}, myAttributes, baseAttributes), Attributes = createCloneCtor(allAttributes), mixin = {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }),
        defaults: createDefaults(allAttributes),
        _toJSON: createToJSON(allAttributes),
        _localEvents: createEventMap(myAttributes),
        _keys: Object.keys(allAttributes)
    };
    var _parse = createParse(myAttributes, allAttributes);
    if (_parse) {
        mixin._parse = _parse;
    }
    if (!log.level) {
        mixin.forEachAttr = createForEach(allAttributes);
    }
    return mixin;
}
function createEventMap(attrSpecs) {
    var events;
    for (var key in attrSpecs) {
        var attribute = attrSpecs[key], _onChange = attribute.options._onChange;
        if (_onChange) {
            events || (events = new EventMap());
            events.addEvent('change:' + key, typeof _onChange === 'string' ?
                createWatcherFromRef(_onChange, key) :
                wrapWatcher(_onChange, key));
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
    var _a = new CompiledReference(ref, true), local = _a.local, resolve = _a.resolve, tail = _a.tail;
    return local ?
        function (record, value) {
            record[tail](value, key);
        } :
        function (record, value) {
            resolve(record)[tail](value, key);
        };
}
export function createForEach(attrSpecs) {
    var statements = ['var v, _a=this._attributes;'];
    for (var name_1 in attrSpecs) {
        statements.push("( v = a." + name_1 + " ) === void 0 || f( v, \"" + name_1 + "\", _a." + name_1 + " );");
    }
    return new Function('a', 'f', statements.join(''));
}
export function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name_2 in attrSpecs) {
        statements.push("this." + name_2 + " = x." + name_2 + ";");
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
function createDefaults(attrSpecs) {
    var C;
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
function createAttributesCtor(attrDesccriptors) {
    var keys = Object.keys(attrDesccriptors), Attributes = new Function('r', 'v', 'o', "\n            var _attrs = r._attributes;\n\n            " + keys.map(function (key) { return "\n                this." + key + " = _attrs." + key + ".initAttribute( r, v." + key + ", o );\n            "; }) + "\n        ");
    Attributes.prototype = Object.prototype;
    return Attributes;
}
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'], create = false;
    for (var name_3 in allAttrSpecs) {
        var local = attrSpecs[name_3];
        if (local && local.parse)
            create = true;
        if (allAttrSpecs[name_3].parse) {
            var s = "r." + name_3 + " === void 0 ||( r." + name_3 + " = a." + name_3 + ".parse.call( this, r." + name_3 + ", \"" + name_3 + "\") );";
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
//# sourceMappingURL=define.js.map