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

Return the reference to the record which is an owner, or `null` if the object is the root of an aggregation tree.

Due to the nature of _aggregation_, an object may have one and only one owner.

### recordOrCollection.clone()

Create the deep copy of the aggregation tree, recursively cloning all aggregated records and collections. References to [shared members](04_Shared_objects.md) will be copied, but not shared members themselves.

### recordOrCollection.set( json, { parse : true } )

Recursively update an aggregation tree in place with the raw JSON data.

```javascript
// Has the same effect as assignFrom():
record.set( otherRecord.toJSON(), { parse : true });
```

### record.assignFrom( otherRecord )
### collection.assignFrom( otherCollection )

Make an _existing_ record or collection to be an exact copy of other record or collection. The whole aggregation tree will be recursively traversed and assigned.

Other record/collection must have the similar shape as the record/collection type.

```javascript
// Has the same effect as record.clone():
const clonedRecord = new MyRecord();
clonedRecord.assignFrom( record );
```

### recordOrCollection.dispose()

Recursively dispose the record and its aggregated members. "Dispose" means that elements of the aggregation tree will unsubscribe from all event sources. It's crucial to prevent memory leaks in SPA.

The whole aggregation tree will be recursively disposed, shared members won't.
