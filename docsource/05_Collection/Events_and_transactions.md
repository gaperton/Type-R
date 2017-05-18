## How collection updates are processed

All updates to the collections are executed in the scope of transactions, which are executed in 4 steps:

1. Apply all changes to collection and nested records.
2. Trigger `add`, `remove`, or `change` event for every individual record change.
3. Trigger an `update` event when there are any records added or removed, and `sort` event if an order of records was changed.
4. If any changes were applied to the collection:
    - trigger `changes` event;
    - notify collection's owner on aggregation subtree changes.

Every collection update method opens an implicit transaction.

#### record.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction, so it will trigger the single `change` event.

#### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps an iteration in a transaction. 

## Listening to change events

TODO (Events API)

#### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.