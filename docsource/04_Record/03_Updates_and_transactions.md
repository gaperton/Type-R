# Update record attributes

### record.attrName = value

Assign record attribute.

If the value is not compatible with attribute's type, special action is taken:

- For primitive attribute, it's converted with `Type( value )` call.
- For record or collection, it's used to update it in place with `record.attrName.set( value )`.
- In other cases, it's converted with `new Type( value )` call.

In case of changes, the record triggers events:
- `change:attrName` *( record, value )*.
- `change` *( record )*.

### record.set( { attrName : value, ... }, options? : `options` )

Bulk assign record's attributes, possibly taking options.

If the value is not compatible with attribute's type, special action is taken:

- For primitive attribute, it's converted with `Type( value )` call.
- For record or collection, it's used to update it in place with `record.attrName.set( value )`.
- In other cases, it's converted with `new Type( value )` call.

In case of changes, the record triggers events:

1. For any changed attribute, trigger event `change:attrName` *( record, val, options )*.
2. If any attribute has changed:
    - trigger event `change` *(record, options)*.

### `options` { parse : true }

Transform `record.set` argument with user-defined parse logic. Typically used to process the response from the server to make user-defined JSON format conversion.

### `options` { merge : true }

Merge attributes of record and collection types instead of replacement. If the new instance of record or collection is to be assigned,
update the current instances instead.

### record.assignFrom( otherRecord )

Makes an existing `record` to be the copy of `otherRecord`, recursively assigning all attributes.

Works similar to `record.set( otherRecord.attributes, { merge : true })`;

# Transactions

All record updates occurs in the scope of transactions. Transaction is the sequence of changes which results in a single `change` event.

Transaction can be opened either manually or implicitly with calling `set()` or assigning an attribute.
Any additional changes made to the record in `change:attr` event handler will be executed in the scope of the original transaction, and won't trigger additional `change` events.

### record.transaction( fun )

Execute the all changes made to the record in `fun` as single transaction.

```javascript
some.record.transaction( record => {
    record.a = 1; // `change:a` is triggered.
    record.b = 2; // `change:b` is triggered.
}); // `change` is triggered.
```

Manual transactions with attribute assignments are superior to `record.set()` in terms of both performance and flexibility.
