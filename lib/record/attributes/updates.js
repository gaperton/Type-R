import { transactionApi } from "../../transactions";
var _begin = transactionApi.begin, _markAsDirty = transactionApi.markAsDirty, commit = transactionApi.commit;
import { eventsApi } from '../../object-plus';
var trigger3 = eventsApi.trigger3;
export function setAttribute(record, name, value) {
    var isRoot = begin(record), options = {}, attributes = record.attributes, spec = record._attributes[name], prev = attributes[name];
    var update = spec.canBeUpdated(prev, value, options);
    if (update) {
        var nestedTransaction = prev._createTransaction(update, options);
        if (nestedTransaction) {
            nestedTransaction.commit(record);
            if (spec.propagateChanges) {
                markAsDirty(record, options);
                trigger3(record, 'change:' + name, record, prev, options);
            }
        }
    }
    else {
        var next = spec.transform(value, options, prev, record);
        attributes[name] = next;
        if (spec.isChanged(next, prev)) {
            spec.handleChange(next, prev, record);
            markAsDirty(record, options);
            trigger3(record, 'change:' + name, record, next, options);
        }
    }
    isRoot && commit(record);
}
export function begin(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.Attributes(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
export function markAsDirty(record, options) {
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
//# sourceMappingURL=updates.js.map