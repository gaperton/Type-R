# map and forEach

### collection.forEach( iteratee : ( val : Record, index ) => void, context? )
### collection.each( iteratee : ( val : Record, index ) => void, context? )

Iterate through the elements of the collection. Similar to `Array.forEach`.

### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps an iteration in a transaction. The single `changes` event will be emitted
for the group of changes to the records made in `updateEach`.

*Use this method if you modify records in a loop*.

### collection.map( iteratee : ( val : Record, index ) => T, context? )

Map elements of the collection. Similar to `Array.map`, but `undefined` values returned by iteratee are filtered out.

Thus, `collection.map` can be used to map and filter elements in a single pass.

# Predicate methods

Predicate is either the iteratee function returning boolean, or an object with attribute values used to match with record's attributes.

### collection.filter( iteratee : Predicate, context? )

Return filtered array of records matching the predicate.

### collection.every( iteratee : Predicate, context? ) : boolean

Return `true` if all records match the predicate.

### collection.some( iteratee : Predicate, context? ) : boolean

Return `true` if at least one record match the predicated.


