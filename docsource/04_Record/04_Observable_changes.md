# Observable changes

Object tree formed by nested records and collection is deeply observable by default; changes in every attribute trigger change events for the record and all parent elements in sequence.

Record triggers following events on change:

- `change:attrName` *( record, value )* for every changed attribute.
- `change` *( record )* when record is changed.

### `attrDef` attr : Type.has.changeEvents( false )

Record automatically listens to change events of all nested records and collections, triggering appropriate change events for its attributes. This declaration turns it off for the specific attribute.

## Listening to changes with Events API

[Events API](../10_Events.md) is used for managing events subscriptions.

### listener.listenTo( record, event, handler )

[Events API](../10_Events.md) method used to listen to the any of the change events.

### listener.stopListening( record )

[Events API](../10_Events.md) method to explicitly stop all event subscriptions from the record.

Not needed if the listener is other record or collection.

# Listening to events in a record

Record has declarative API for managing custom event subscriptions for its attributes.

### `attrDef` attr : Type.has.watcher( 'methodName' )
### `attrDef` attr : Type.has.watcher( function( value, name ){ ... } )

Attach `change:attr` event listener to the particular record's attribute.

_Watcher function_ has the signature `( attrValue, attrName ) => void` and is executed in the context of the record. Note that it differs from the event signature.

```javascript
@define class User extends Record {
    static attributes = {
        name : String.has.watcher( 'onNameChange' ),
        isAdmin : Boolean,
    }

    onNameChange(){
        // Cruel. But we need it for the purpose of the example.
        this.isAdmin = this.name.indexOf( 'Admin' ) >= 0;
    }
}
```

### `attrDef` attr : Type.has.events({ eventName : handler, ... })

Automatically manage custom event subscription for the attribute. `handler` is either the method name or the handler function.

# Change inspection methods

Following API might be useful in change event listeners.

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
