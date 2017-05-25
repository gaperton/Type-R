## Observable changes

Object tree formed by records and collection is deeply observable by default; changes in tree leafs triggers the changes of all parent elements in sequence.

Records automatically listens to change events of all nested records and collections, and triggers the corresponding change events on its attributes.

### `attrDef` attr : Type.has.changeEvents( false )

Do _not_ listen for the inner changes of the specific `attr`.

## Listening to events in the record

Record has declarative API for managing event subscriptions for its attributes.

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

## Events subscription with Events API

`listener.listenTo()` and `listener.listenToOnce()` methods can be used to listen to the any of the change events.

If listener itself is the record or collection, subscribtions will be stopped automatically. Otherwise they must be stopped
manually with `listener.stopListening()` call to prevent memory leaks.

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