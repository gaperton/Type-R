## Updates

Collections notify listeners on the details of the update with events. It's executed in 3 steps:

1. Apply all changes to collection and nested records.
2. Trigger events for individual changes:
    - Trigger `add`, `remove`, or `change` event for every individual record change.
    - Trigger an `update` event when there are any records added or removed, and `sort` event if an order of records was changed.
3. If any changes were applied to the collection:
    - trigger `changes` event;
    - notify collection's owner on aggregation subtree changes.

#### collection.add( models, options? )

Add a record (or an array of records) to the collection, firing an "add" event for each record, and an "update" event afterwards. If a record property is defined, you may also pass raw attributes objects, and have them be vivified as instances of the record. Returns the added (or preexisting, if duplicate) records. Pass {at: index} to splice the record into the collection at the specified index. If you're adding records to the collection that are already in the collection, they'll be ignored, unless you pass {merge: true}, in which case their attributes will be merged into the corresponding records, firing any appropriate "change" events.

    var ships = new Backbone.Collection;

    ships.on("add", function(ship) {
        alert("Ahoy " + ship.get("name") + "!");
    });

    ships.add([
        {name: "Flying Dutchman"},
        {name: "Black Pearl"}
    ]);

Note that adding the same record (a record with the same id) to a collection more than once 
is a no-op.

#### collection.remove( records, options? ) 

Remove a record (or an array of records) from the collection, and return them. Each record can be a record instance, an id string or a JS object, any value acceptable as the id argument of collection.get. Fires a "remove" event for each record, and a single "update" event afterwards, unless {silent: true} is passed. The record's index before removal is available to listeners as options.index.

#### collection.set( records, options? )
 
The set method performs a "smart" update of the collection with the passed list of records. If a record in the list isn't yet in the collection it will be added; if the record is already in the collection its attributes will be merged; and if the collection contains any records that aren't present in the list, they'll be removed. All of the appropriate "add", "remove", and "change" events are fired as this happens. Returns the touched records in the collection. If you'd like to customize the behavior, you can disable it with options: {add: false}, {remove: false}, or {merge: false}.

```javascript
const vanHalen = new Man.Collection([ eddie, alex, stone, roth ]);

vanHalen.set([ eddie, alex, stone, hagar ]);

// Fires a "remove" event for roth, and an "add" event for "hagar".
// Updates any of stone, alex, and eddie's attributes that may have
// changed over the years.
```

#### record.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction.

Transaction is the sequence of updates resuling in a single `changes` event. Every collection update method opens an implicit transaction. 

#### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps an iteration in a transaction. 



#### collection.reset( records, options? )

Adding and removing records one at a time is all well and good, but sometimes you have so many records to change that you'd rather just update the collection in bulk. Use reset to replace a collection with a new list of records (or attribute hashes), triggering a single "reset" event on completion, and without triggering any add or remove events on any records. Returns the newly-set records.

Pass null for records to empty your Collection with options.

Here's an example using reset to bootstrap a collection during initial page load, in a Rails application:

    <script>
    var accounts = new Backbone.Collection;
    accounts.reset(<%= @accounts.to_json %>);
    </script>

Calling collection.reset() without passing any records as arguments will empty the entire collection.

## Listening to events

Collection implements Events API (`on`, `off`, `once`, `listenTo`, `stopListening`, `listenToOnce`, `trigger`), and dedicated methods for listening to the `changes` event (`onChanges`, `offChanges`, `listenToChanges`).

#### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.

## List of built-in events

### Collection-level events

#### `event` "changes" (collection, options)

The main change event. Single event triggered when the collection has been changed.

#### `event` "update" (collection, options)

Single event triggered after any number of records have been added or removed from a collection.

#### `event` "reset" (collection, options) 

When the collection's entire contents have been reset.

#### `event` "sort" (collection, options) 

When the collection has been re-sorted.

### Record-level events

#### `event` "add" (record, collection, options)

When a record is added to a collection.

#### `event` "remove" (record, collection, options) 

When a record is removed from a collection.

#### `event` "change" (record, options) 

When a record's attributes have changed.