### collection.push( record, options? )

Add a record at the end of a collection. Takes the same options as add.

### collection.pop( options? )
Remove and return the last record from a collection. Takes the same options as remove.

### collection.unshift( record, options? )

Add a record at the beginning of a collection. Takes the same options as add.

### collection.shift( options? )
Remove and return the first record from a collection. Takes the same options as remove.

### collection.slice( begin, end )

Return a shallow copy of the `collection.models`, using the same options as native Array#slice.

### collection.indexOf( recordOrId : any ) : number

Return an index of the record in the collection, and -1 if there are no such a record in the collection.

Can take the record itself as an argument, `id`, or `cid` of the record.
