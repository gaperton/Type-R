# Onwership Scheme in Type-R

`Type-R` and `NestedTypes 2.0` enforces strict ownerhip policy.

*Ownership tree* is the tree formed by nested records and collections, which are:
- serialized as nested JSON
- can be updated _in place_ from JSON, preserving all the references to its parts.
- all changes to the members are tracked across the tree, resulting in root change event.
- disposed when the root is disposed.

One object cannot have more than one owner, attempt to violate this rule results 
in immediate run-time error.

Default Record/Collection type annotations denotes aggregation, and forms ownership tree.
Thus, by default, all compound Record types you define are serializable.

There are three kinds of attributes in total. Aggregated, shared, and serializable shared attributes. 

## Owned (aggregated) attributes

`attr : Record` and `attr : Record.Collection`

The default ownership policy for a record's attributes.
Used when attribute is an integral part of the Record - when Record is disposed, aggregated attributes
are disposed too.    

- Have one and only one owner.
- Default value - `new Record` and `new Record.Collection`
- Internal changes are tracked and cause owner 'change' event.  
- Can be updated in place (`merge` global transaction's setting).
- Type is automatically converted on assignment (with `new Record( value )`).
- Are serialized as nested JSON by default.

## Shared attributes

`attr : Record.shared` and `attr : Record.Collection.shared`

Attribute has 'shared' ownership policy when `shared` modifyer is added to the contructor type.
Used when attribute is the reference to some exiting record or collection.

- Record don't attempt to take ownership on shared attributes.
- Default value is `null`.
- Internal changes are tracked and cause owner 'change' event.
- Never is updated in place.
- Collections are converted to Subset with nested changes tracking.
- Don't participate in serialization.

## Serializable shared attributes
### Collection subsets

`Collection.Subset`

Is the direct reference to the of `Collection` which doesn't take an ownership on its members, but observes the changes.

Should not be used to create such a collections manually.

When mentioned as attribute type, acts in the same way as Colleciton.shared, but defaults to an empty collection.

`attr : Collection.subsetOf( 'path.to.collection.relative.to.this' )`
`attr : Collection.Subset.of( 'path.to.collection.relative.to.this' )`

Serializable version of `Subset`.

- Type is automatically converted on assignment. id arrays and record arrays are resolved against the given collection. 
- Serialized as an array of record ids. 

### Serializable shared records

`attr : Record.from( 'path.to.collection.relative.to.this' )`

Serializable reference to the record, which is a part of existing collection.

- Record don't attempt to take ownership on this attribute.
- Default value is `null`.
- Internal changes are not tracked.
- Never is updated in place.
- Type is automatically converted on assignment. Record id is resolved against the given collection.
- Serialized as Record id.