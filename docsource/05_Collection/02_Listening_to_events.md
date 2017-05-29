## Observable changes

Object tree formed by records and collection is deeply observable by default; changes in tree leafs triggers the changes of all parent elements in sequence.

Collection automatically listens to `change` events of all of its records, and triggers `change` and `changes` events.

## Listening to item events in the collection

### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.

## Events subscription with Events API

`listener.listenTo()` and `listener.listenToOnce()` methods can be used to listen to the any of the collection events.s

If listener itself is the record or collection, subscriptions will be stopped automatically. Otherwise they must be stopped
manually with `listener.stopListening()` call to prevent memory leaks.
