Records can have attributes holding other Records and Collections, forming indefinitely nested data structures of arbitrary complexity.
To create nested record or collection you should just mention its type in attribute's type annotation.

```javascript
import { Record } from 'type-r'

@define class User extends Record {
    static attributes = {
        name : String,
        email : String,
        isActive : true
    }
}

@define class UsersListState extends Record {
    static attributes = {
        users : User.Collection
    }
}
```

All nested records and collections are *aggregated* by default and behave as integral parts of the containing record. Aggregated attributes are _exclusively owned_ by the record, and taken with it together form an _ownership tree_. Many operations are performed recursively on aggregated elements:

- They are created when the owner record is created.
- They are cloned when the record is cloned.
- They are disposed when the record is disposed.
- They are validated as part of the record.
- They are serialized as nested JSON.

# Aggregation tree methods

### recordOrCollection.getOwner()

Return the reference to the record's owner, or `null` if record is not the part of aggregation tree.

Due to the nature of _aggregation_, an object may have one and only one owner.

### recordOrCollection.clone()

Clone the record and all aggregated records and collections.

The whole aggregation tree will be recursively cloned, references to shared members will copied.

### record.set( json, { parse : true } )
### collection.set( json, { parse : true } )

Recursively update an aggregation tree in place with the raw JSON data.

```javascript
// Has the same effect as assignFrom():
record.set( otherRecord.toJSON(), { parse : true });
```

### record.assignFrom( otherRecord )
### collection.assignFrom( otherCollection )

Recursively assign the record and its aggregated members with values from `otherRecord`.
This operation is similar to `record.clone()`, but instead of _creation_ of the cloned record it makes an _existing_ record to be the copy
of other record.

The whole aggregation tree will be recursively assigned, references to shared members will copied.

### recordOrCollection.dispose()

Recursively dispose the record and its aggregated members. "Dispose" means that elements of the aggregation tree will unsubscribe from all event sources. It's crucial to prevent memory leaks in SPA.

The whole aggregation tree will be recursively disposed, shared members won't.
