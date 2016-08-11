# Onwership Scheme in Type-R

## Aggregated attributes

`attr : Record` and `attr : Record.Collection`

The default ownership policy for a record's attributes.

- Have one and only one owner.
- Default value - `new Record` and `new Record.Collection`
- Internal changes are tracked and cause owner 'change' event.  
- Can be updated in place (`merge` global transaction's setting).
- Type is automatically converted on assignment (with `new Record( value )`).
- Are serialized as nested JSON by default.

## Shared attributes

`attr : Record.shared` and `attr : Record.Collection.shared`

Attribute has 'shared' ownership policy when `shared` modifyer is added to the contructor type.

- Record don't attempt to take ownership on shared attributes.
- Default value is `null`.
- Internal changes are tracked and cause owner 'change' event.
- Never is updated in place.
- No type convertions allowed - attribute must be assigned with a valid subtype.
- Don't participate in serialization.

## Collection subsets

`attr : Collection.Subset`

Is a subclass of `Collection` (created when referenced for the first time).

- Have one and only one owner. But don't attempt to take ownership on its members.
- Default value is an empty collection (`new Collection.Subset`).
- Only collection (not enclosed record) changes are tracked and cause owner 'change' event.
- Can be updated in place. But never update its members in place (`merge : false` transaction option).
- Type is automatically converted on assignment (with `new Record( value )`).
- Don't participate in serialization.

`attr : Collection.Subset.of( 'path.to.collection.relative.to.this' )`

Serializable version of `Subset`

- Type is automatically converted on assignment. id arrays and record arrays are resolved against the given collection. 
- Serialized as an array of record ids. 

## Serializable shared records

`attr : Record.from( 'path.to.collection.relative.to.this' )`

- Record don't attempt to take ownership on this attribute.
- Default value is `null`.
- Internal changes are not tracked.
- Never is updated in place.
- Type is automatically converted on assignment. Record id is resolved against the given collection.
- Serialized as Record id.