# Events

Type-R uses an efficient synchronous events implementation which is backward compatible with Backbone 1.1 Events API but is about twice faster in all major browsers. It comes in form of `Events` mixin and the `Messenger` base class.

## Events mixin

`Events` is a [mixin](#mixins) giving the object the ability to bind and trigger custom named events. Events do not have to be declared before they are bound, and may take passed arguments.

Both `source` and `listener` mentioned in method signatures must implement Events methods.

```javascript
import { mixins, Events } from 'type-r'

@mixins( Events )
class EventfulClass {
    ...
}
```

<aside class="notice">There's the <code>Messenger</code> abstract base class with Events mixed in.</aside>

### source.trigger(event, arg1, arg2, ... )

Trigger callbacks for the given event, or space-delimited list of events. Subsequent arguments to trigger will be passed along to the event callbacks.

### listener.listenTo(source, event, callback)
Tell an object to listen to a particular event on an other object. The advantage of using this form, instead of other.on(event, callback, object), is that listenTo allows the object to keep track of the events, and they can be removed all at once later on. The callback will always be called with object as context.

```javascript
    view.listenTo(record, 'change', view.render );
```

<aside class="success">Subscriptions made with <code>listenTo()</code> will be stopped automatically if an object is properly disposed (<code>dispose()</code> method is called).</aside>

### listener.stopListening([source], [event], [callback])

Tell an object to stop listening to events. Either call stopListening with no arguments to have the object remove all of its registered callbacks ... or be more precise by telling it to remove just the events it's listening to on a specific object, or a specific event, or just a specific callback.

```javascript
    view.stopListening(); // Unsubscribe from all events

    view.stopListening(record); // Unsubscribe from all events from the record
```

<aside class="notice">Messenger, Record, Collection, and Store execute <code>this.stopListening()</code> from their <code>dispose()</code> method. You don't have to unsubscribe from events explicitly if you are using <code>listenTo()</code> method and disposing your objects properly.</aside>

### listener.listenToOnce(source, event, callback)

Just like `listenTo()`, but causes the bound callback to fire only once before being automatically removed.

### source.on(event, callback, [context])

Bind a callback function to an object. The callback will be invoked whenever the event is fired. If you have a large number of different events on a page, the convention is to use colons to namespace them: `poll:start`, or `change:selection`. The event string may also be a space-delimited list of several events...

```javascript
    book.on("change:title change:author", ...);
```

Callbacks bound to the special "all" event will be triggered when any event occurs, and are passed the name of the event as the first argument. For example, to proxy all events from one object to another:

```javascript
    proxy.on("all", function(eventName) {
        object.trigger(eventName);
    });
```

All event methods also support an event map syntax, as an alternative to positional arguments:

```javascript
    book.on({
        "change:author": authorPane.update,
        "change:title change:subtitle": titleView.update,
        "destroy": bookView.remove
    });
```

To supply a context value for this when the callback is invoked, pass the optional last argument: `record.on('change', this.render, this)` or `record.on({change: this.render}, this)`.

<aside class="warning">Event subscription with <code>source.on()</code> may create memory leaks if it's not stopped properly with <code>source.off()</code></aside>

### source.off([event], [callback], [context])

Remove a previously bound callback function from an object. If no context is specified, all of the versions of the callback with different contexts will be removed. If no callback is specified, all callbacks for the event will be removed. If no event is specified, callbacks for all events will be removed.

```javascript
    // Removes just the `onChange` callback.
    object.off("change", onChange);

    // Removes all "change" callbacks.
    object.off("change");

    // Removes the `onChange` callback for all events.
    object.off(null, onChange);

    // Removes all callbacks for `context` for all events.
    object.off(null, null, context);

    // Removes all callbacks on `object`.
    object.off();
```

Note that calling `record.off()`, for example, will indeed remove all events on the record — including events that Backbone uses for internal bookkeeping.

### source.once(event, callback, [context])
Just like `on()`, but causes the bound callback to fire only once before being removed. Handy for saying "the next time that X happens, do this". When multiple events are passed in using the space separated syntax, the event will fire once for every event you passed in, not once for a combination of all events

## Messenger class

Messenger is an abstract base class implementing Events mixin and some convenience methods.

```javascript
import { define, Messenger } from 'type-r'

class MyMessenger extends Messenger {

}
```

### Events mixin methods (7)

Messenger implements [Events](#events-mixin) mixin.
 
### messenger.cid

Unique run-time only messenger instance id (string).

### `callback` messenger.initialize()

Callback which is called at the end of the constructor.

### messenger.dispose()

Executes `messenger.stopListening()` and `messenger.off()`.

Objects must be disposed to prevent memory leaks caused by subscribing for events from singletons.

## Built-in events

All Type-R objects implement Events mixin and use events to notify listeners on changes.

Record and Store change events:

Event name | Handler arguments | When triggered
-------|-------------------|------------
change | (record, options) | At the end of any changes.
change:attrName | (record, value, options) | The record's attribute has been changed.

Collection change events:

Event name | Handler arguments | When triggered
-------|-------------------|------------
changes | (collection, options) | At the end of any changes.
reset | (collection, options) | `reset()` method was called.
update | (collection, options) | Any records added or removed.
sort | (collection, options) | Order of records is changed. 
add | (record, collection, options) | The record is added to a collection.
remove | (record, collection, options) | The record is removed from a collection.
change | (record, options) | The record is changed inside of collection.




