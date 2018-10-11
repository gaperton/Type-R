# Observable Changes

## Overview

Type-R implements *deeply observable changes* on the object graph constructed of records and collection.

All of the record and collection updates happens in a scope of the transaction followed by the change event. Every record or collection update operation opens _implicit_ transaction. Several update operations can be groped to the single _explicit_ transaction if executed in the scope of the `obj.transaction()` or `col.updateEach()` call.

```javascript
@define class Author extends Record {
    static attributes = {
        name : ''
    }
}

@define class Book extends Record {
    static attributes = {
        name : '',
        datePublished : Date,
        author : Author
    }
}

const book = new Book();
book.on( 'change', () => console.log( 'Book is changed') );

// Implicit transaction, prints to the console
book.author.name = 'John Smith';
```

## Record

### Events mixin methods (7)

Record implements [Events](#events-mixin) mixin.

### `event` "change" ( record )

Triggered by the record at the end of the attributes update transaction in case if there were any changes applied.

### `event` "change:attrName" ( record, value )

Triggered by the record during the attributes update transaction for every changed attribute.

### `attrDef` : type( Type ).watcher( watcher )

Attach `change:attr` event listener to the particular record's attribute. `watcher` can either be the record's method name or the function `( newValue, attr ) => void`. Watcher is always executed in the context of the record.

```javascript
@define class User extends Record {
    static attributes = {
        name : type( String ).watcher( 'onNameChange' ),
        isAdmin : Boolean,
    }

    onNameChange(){
        // Cruel. But we need it for the purpose of the example.
        this.isAdmin = this.name.indexOf( 'Admin' ) >= 0;
    }
}
```

### `attrDef` : type( Type ).changeEvents( false )

Turn off changes observation for nested records or collections.

Record automatically listens to change events of all nested records and collections, triggering appropriate change events for its attributes. This declaration turns it off for the specific attribute.

### `attrDef` : type( Type ).events({ eventName : handler, ... })

Automatically manage custom event subscription for the attribute. `handler` is either the method name or the handler function.

### record.changed

The `changed` property is the internal hash containing all the attributes that have changed during its last transaction.
Please do not update `changed` directly since its state is internally maintained by `set()`.
A copy of `changed` can be acquired from `changedAttributes()`.

### record.changedAttributes( attrs? )

Retrieve a hash of only the record's attributes that have changed during the last transaction,
or false if there are none. Optionally, an external attributes hash can be passed in,
returning the attributes in that hash which differ from the record.
This can be used to figure out which portions of a view should be updated,
or what calls need to be made to sync the changes to the server.

### record.previous( attr )

During a "change" event, this method can be used to get the previous value of a changed attribute.

```javascript
@define class Person extends Record{
    static attributes = {
        name: ''
    }
}

const bill = new Person({
  name: "Bill Smith"
});

bill.on("change:name", ( record, name ) => {
  alert( `Changed name from ${ bill.previous('name') } to ${ name }`);
});

bill.name = "Bill Jones";
```

### record.previousAttributes()

Return a copy of the record's previous attributes. Useful for getting a diff between versions of a record, or getting back to a valid state after an error occurs.

## Collection

All changes in the records cause change events in the collections they are contained in.

Subset collections is an exception; they don't observe changes of its elements by default.

### Events mixin methods (7)

Collection implements [Events](#events-mixin) mixin.

### collection.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction.

All collection updates occurs in the scope of transactions. Transaction is the sequence of changes which results in a single `changes` event.

Transaction can be opened either manually or implicitly with calling any of collection update methods.
Any additional changes made to the collection or its items in event handlers will be executed in the scope of the original transaction, and won't trigger an additional `changes` events.

### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps an iteration in a transaction. The single `changes` event will be emitted for the group of changes to the records made in `updateEach`.

### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.

### `event` "changes" (collection, options)

When collection has changed. Single event triggered when the collection has been changed.

### `event` "reset" (collection, options)

When the collection's entire contents have been reset (`reset()` method was called).

### `event` "update" (collection, options)

Single event triggered after any number of records have been added or removed from a collection.

### `event` "sort" (collection, options)

When the collection has been re-sorted.

### `event` "add" (record, collection, options)

When a record is added to a collection.

### `event` "remove" (record, collection, options)

When a record is removed from a collection.

### `event` "change" (record, options)

When a record inside of the collection is changed.

## Events mixin

Type-R uses an efficient synchronous events implementation which is backward compatible with Backbone 1.1 Events API but is about twice faster in all major browsers. It comes in form of `Events` mixin and the `Messenger` base class.

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

### Built-in events

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