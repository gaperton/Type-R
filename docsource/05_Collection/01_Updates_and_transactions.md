# Updates

Methods to update the collection. They accept common options:

- `sort : false` - do not sort the collection.
- `parse : true` - parse raw JSON (used to set collection with a data from the server).

### collection.add( models, options? )

Add a record (or an array of records) to the collection. If this is the `Record.Collection`, you may also pass raw attributes objects, and have them be vivified as instances of the `Record`. Returns the added (or preexisting, if duplicate) records.

Pass `{at: index}` to splice the record into the collection at the specified index. If you're adding records to the collection that are already in the collection, they'll be ignored, unless you pass `{merge: true}`, in which case their attributes will be merged into the corresponding records.

1. Trigger the one event per record:
    - `add`(record, collection, options) for each record added.
    - `change`(record, options) for each record changed (if the `{merge: true}` option is passed).
3. Trigger the single event:
    - `update`(collection, options) if any records were added.
    - `sort`(collection, options) if an order of records was changed.
4. Trigger `changes` event in case if any changes were made to the collection and objects inside.

### collection.remove( records, options? ) 

Remove a record (or an array of records) from the collection, and return them. Each record can be a record instance, an id string or a JS object, any value acceptable as the id argument of collection.get.

1. Trigger `remove`(record, collection, options) for each record removed.
3. If any records were removed, trigger:
    - `update`(collection, options)
    - `changes`(collection, options).

### collection.set( records, options? )
 
The set method performs a "smart" update of the collection with the passed list of records. If a record in the list isn't yet in the collection it will be added; if the record is already in the collection its attributes will be merged; and if the collection contains any records that aren't present in the list, they'll be removed. All of the appropriate "add", "remove", and "change" events are fired as this happens. Returns the touched records in the collection. If you'd like to customize the behavior, you can disable it with options: `{remove: false}`, or `{merge: false}`.

#### Events
1. Trigger the one event per record:
    - `add`(record, collection, options) for each record added.
    - `remove`(record, collection, options) for each record removed.
    - `change`(record, options) for each record changed.
3. Trigger the single event:
    - `update`(collection, options) if any records were added.
    - `sort`(collection, options) if an order of records was changed.
4. Trigger `changes` event in case if any changes were made to the collection and objects inside.

```javascript
const vanHalen = new Man.Collection([ eddie, alex, stone, roth ]);

vanHalen.set([ eddie, alex, stone, hagar ]);

// Fires a "remove" event for roth, and an "add" event for "hagar".
// Updates any of stone, alex, and eddie's attributes that may have
// changed over the years.
```

### collection.reset( records, options? )

Replace the collection's content with the new records. More efficient than `collection.set`, but does not send record-level events.

Calling `collection.reset()` without passing any records as arguments will empty the entire collection.

1. Trigger event `reset`( collection, options ).
2. Trigger event `changes`( collection, options ).

# Transactions

All collection updates occures in the scope of transactions. Transaction is the sequence of changes which results in a single `changes` event.

Transaction can be opened either manually or implicitly with calling any of collection update methods.
Any additional changes made to the collection or its items in event handlers will be executed in the scope of the original transaction, and won't trigger an additional `changes` events.

### collection.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction.

### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps the loop in a transaction. 
