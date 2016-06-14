"use strict";
exports.RecordMixin = {
    createTransaction: function (values, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var transaction = new Transaction(this), changes = transaction.changes, nested = transaction.nested, _a = this, attributes = _a.attributes, _attributes = _a._attributes;
        this.forEachAttr(values, function (value, key) {
            var attr = _attributes[key], prev = attributes[key];
            if (attr.canBeUpdated) {
                if (prev && attr.canBeUpdated(value)) {
                    nested.push(prev.createTransaction(value, options));
                    return;
                }
            }
            var next = attr.transform(value, options, prev, _this);
            if (attr.isChanged(next, prev)) {
                attributes[key] = next;
                changes.push(key);
                attr.handleChange(next, prev);
            }
        });
        return transaction;
    },
    transaction: function (fun, options) {
        var isRoot = begin(this);
        fun(this);
        isRoot && commit(this, options);
    },
    _onChildrenChange: function (child, options) {
        var isRoot = begin(this);
        if (!options.silent) {
            this._pending = options;
            this._notifyChangeAttr(child._ownerAttr, options);
        }
        isRoot && commit(this, options);
    }
};
function setAttribute(model, name, value) {
    var isRoot = begin(model), options = {};
    var attributes = model.attributes, spec = model._attributes[name], prev = attributes[name];
    if (spec.canBeUpdated && prev && spec.canBeUpdated(value)) {
        prev.createTransaction(value, options).commit(options);
    }
    else {
        var next = spec.transform(value, options, prev, model);
        if (spec.isChanged(next, prev)) {
            attributes[name] = next;
            if (spec.handleChange) {
                spec.handleChange(next, prev);
            }
            model._pending = options;
            model._notifyChangeAttr(name, options);
        }
    }
    isRoot && commit(model, options);
}
exports.setAttribute = setAttribute;
function begin(model) {
    var isRoot = !model._changing;
    if (isRoot) {
        model._changing = true;
        model._previousAttributes = new model.Attributes(model.attributes);
    }
    return isRoot;
}
function commit(model, options) {
    if (!options.silent) {
        while (model._pending) {
            model._pending = false;
            model._notifyChange(options);
        }
    }
    model._pending = false;
    model._changing = false;
    var _owner = model._owner;
    if (_owner) {
        _owner._onChildrenChange(model, options);
    }
}
var Transaction = (function () {
    function Transaction(model) {
        this.isRoot = begin(model);
        this.model = model;
        this.changed = [];
        this.nested = [];
    }
    Transaction.prototype.commit = function (options) {
        if (options === void 0) { options = {}; }
        var _a = this, nested = _a.nested, model = _a.model;
        for (var i = 0; i < nested.length; i++) {
            nested[i].commit(options);
        }
        if (!options.silent) {
            var changed = this.changed;
            if (changed.length) {
                model._pending = options;
            }
            for (var i = 0; i < changed.length; i++) {
                model._notifyChangeAttr(changed[i], options);
            }
        }
        this.isRoot && commit(model, options);
    };
    return Transaction;
}());
//# sourceMappingURL=transactions.js.map