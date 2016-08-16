# Onwership Scheme in Type-R

`Type-R` and `NestedTypes 2.0` enforces strict ownerhip policy.

*Ownership tree* - is the tree formed by nested records and collections, which is:
- serialized as nested JSON
- can be updated _in place_ from JSON, preserving all the references to its parts.
- all changes to the members are tracked across the tree, resulting in root change event.
- disposed when the root is disposed.

One object cannot have more than one owner, attempt to violate this rule results 
in immediate run-time error.

Default Record/Collection type annotations denotes aggregation, and forms ownership tree.
Thus, by default, all compound Record types you define are serializable. 

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
- No type convertions allowed - attribute must be assigned with a valid subtype.
- Don't participate in serialization.

## Collection subsets

`attr : Collection.Subset`

Is a subclass of `Collection` (created when referenced for the first time).
Used when collection needs to be populated with records wich are the part of different ownership tree.

- Have one and only one owner. But don't attempt to take ownership on its members.
- Default value is an empty collection (`new Collection.Subset`).
- Only collection (not enclosed record) changes are tracked and cause owner 'change' event.
- Can be updated in place. But never update its members in place (`merge : false` transaction option).
- Type is automatically converted on assignment (with `new Record( value )`).
- Don't participate in serialization.

`attr : Collection.Subset.of( 'path.to.collection.relative.to.this' )`

Serializable version of `Subset`.

- Type is automatically converted on assignment. id arrays and record arrays are resolved against the given collection. 
- Serialized as an array of record ids. 

## Serializable shared records

`attr : Record.from( 'path.to.collection.relative.to.this' )`

Serializable reference to the record, which is a part of existing collection.

- Record don't attempt to take ownership on this attribute.
- Default value is `null`.
- Internal changes are not tracked.
- Never is updated in place.
- Type is automatically converted on assignment. Record id is resolved against the given collection.
- Serialized as Record id.