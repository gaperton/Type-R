## Observable changes

Object tree formed by nested records is deeply observable by default; changes in every item trigger change events for the collection and all parent elements in sequence.

Collection triggers following events on change:

- `change` *( record, options )* for every changed record.
- `add` *( record, collection, options )* for every added record.
- `remove` *( record, collection, options )* for every removed record.
- `update` *( collection, options )* when any records were added or removed.
- `sort` *( collection, options )* when any records changed their order.
- `reset` *( collection, options )* if `collection.reset()` was used to update the collection.
- `changes` *( collection, options )* in case of any changes.

## Listening to changes with Events API

[Events API](../10_Events.md) is used for managing events subscriptions.

### listener.listenTo( record, event, handler )

[Events API](../10_Events.md) method used to listen to the any of the change events.

### listener.stopListening( record )

[Events API](../10_Events.md) method to explicitly stop all event subscriptions from the record.

Not needed if the listener is other record or collection.

## Listening to item events in the collection

### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.
