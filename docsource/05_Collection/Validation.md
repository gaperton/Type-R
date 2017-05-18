#### collection.validate()

Override in the subclass to add collection-level validation. Whatever is returned is treated as an error message.

#### collection.isValid()

Returns `true` whenever all records in the collection is valid and collection.validate() returns `undefined`.

#### collection.isValid( id )

Returns `true` whenever the record with a given `id` or `cid` is valid.

#### collection.validationError

Detailed validation error information, or `null` if all the records are valid.
An error object has tree structure mapping the invalid subtree of the aggregation tree.

```javascript
// ValidationError object shape
{
    error : /* record-level validation error msg as returned from collection.validate() */,

    nested : {
        // One entry per each invalid record.
        /* record.cid */ : /* record.validationError */
    }
}
```

### Validation error traversal

ValidationError has a couple of methods for tree traversal.

#### validationError.each( ( error, key ) => void )

Iterate through the records's errors (not recursive). `key` is `null` for the collection-level validation error.

#### validationError.eachError( ( error, key, recordOrCollection ) => void )

Recursively traverse aggregation tree errors. `key` is `null` for the record-level validation error.
`recordOrCollection` is the reference to the current object.
