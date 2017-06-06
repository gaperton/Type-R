# Shared objects

Record's attributes can hold the records and collections from _other_ aggregation trees if they are marked as `shared`.

### `attrDef` attr : RecordOrCollection.shared

Record's attribute with a reference to the shared record or collection.

- It's initialized with `null`
- It's not cloned when the record is cloned (just the reference is copied over).
- It's not disposed when the record is disposed.
- It's not validated as part of the record (always valid by default)
- It's excluded from serialization.

```javascript
@define class UsersListState extends Record {
    static attributes = {
        users : User.Collection,
        selected : User.shared // Can be assigned with the user from this.users
    }
}
```

### `attrDef` attr : Collection.Refs
### new Collection.Refs()

Collection of references to shared records, which _does not aggregate_ its elements. In contrast to the `Collection.shared`, `Collection.Refs` creates an instance of collection which _is the part the parent record_. Still, its items are not validated and serialized.

    @define class MyRecord extends Record {
        static attributes = {
            notCloned : SomeCollection.shared, // Reference to the _shared collection_ object.
            cloned : SomeCollection.Refs // _Aggregated_ collection of references to the _shared records_.
    }
