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

All nested records and collections are *aggregated* by default and behave as integral parts of the containing record. Aggregated attributes are _exclusively owned_ by the record, and taken with it together form an _ownerhip tree_. Many operations are performed recursively on aggregated elements:

- They are created when the owner record is created.
- They are cloned when the record is cloned.
- They are disposed when the record is disposed.
- They are validated as part of the record.
- They are serialized as nested JSON.

## Declarations

#### `attrDef` attr : Type.shared

Attributes can be marked as *shared* with adding `Type.shared` modifier. Such an attribute is not the member of record's aggregation/ownership tree.

- It's initialized with `null`
- It's not cloned when the record is cloned (just the reference is copied over).
- It's not disposed when the record is disposed.
- It's not validated as part of the record (always valid by default)
- It's excluded from serialization.

```javascript
@define class UsersListState extends Record {
    static attributes = {
        users : User.Collection,
        selected : User.shared // can be assigned with the user from this.users
    }
}
```

## Class methods

#### record.getOwner()

Return the reference to the record's owner, or `null` if record is not the part of aggregation tree.

Due to the nature of _aggregation_, record may have one and only one owner.

#### record.clone()

Clone the record and all aggregated records and collections.

The whole aggregation tree will be recursively cloned, references to shared members will copied.

#### record.assignFrom( otherRecord )

Recursively assign the record and its aggregated members with values from `otherRecord`.
This operation is similar to `record.clone()`, but instead of _creation_ of the cloned record it makes an _existing_ record to be the copy
of other record.

The whole aggregation tree will be recursively assigned, references to shared members will copied.

#### record.dispose()

Recursively dispose the record and its aggregated members. "Dispose" means that elements of the aggregation tree will unsubscribe from all event sources. It's crucial to prevent memory leaks in SPA.

The whole aggregation tree will be recursively disposed, shared members won't.