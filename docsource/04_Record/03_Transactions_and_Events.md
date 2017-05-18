## How record updates are processed

Record changes occure in the scope of transactions. Record triggers the set of events during the transaction.
Transaction is executed in three steps.

1. Apply all the changes to the record and nested records and collections.
2. Send `change:[attribute]` *(record, value, options)* events for each attribute which has been updated (including nested objects).
3. If any of the model's attributes have changed:
    - Send `change` *(record, options)* event.
    - Notify record's owner on changes.

So, the statement like `user.name = 'Joe'` will trigger two events: `change:attr` and the subsequent `change`.

Statement `user.set({ name : 'Joe', email : 'joe@mail.com' })` will (assuming that both attributes was changed) execute like this:

1. New name and email values will be applied to the user.
2. `change:name` and `change:user` events will be sent out.
3. `change` event will be sent out.

Any additional changes that may be applied to the record in `change:[attribute]` and `change` event handlers will be executed in the scope of the original transaction. It means, that:

- No additional `change` events will be triggered if you modify the record in `change:[attribute]` event handler (but new `change:[attribute]` events will).
- If the record will be modified in `change` event handler, there _will_ be additional `change` events. However, record's owner will be notifyed only once when the wave of events and reactions will finish its processing.

#### record.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction, so it will trigger the single `change` event.
Transactions are superior to `record.set()` in terms of both performance and flexibility.

```javascript
some.record.transaction( record => {
    record.a = 1; // `change:a` is triggered.
    record.b = 2; // `change:b` is triggered.
}); // `change` is triggered.
```

## Listening to change events

#### `attrDef` attr : Type.has.watcher( 'methodName' )
#### `attrDef` attr : Type.has.watcher( function( value, name ){ ... } )

To attach some custom reaction on specific record's attribute change event, you attach the _watcher function_ to this attribute.
Watcher has the signature `( attrValue, attrName ) => void` and is executed in the context of the record.

Watcher internally listens to `change:attr` event which is triggered during the step 2. Therefore, no additional `change` events will be triggered. In the example below, any change of the `name` attribute will result in the subsequent update of the `isAdmin` attribute, and the single`change` event is triggered.

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

#### Events API

TODO

## Class methods

Following API might be useful in change event listeners.

#### record.changed

The `changed` property is the internal hash containing all the attributes that have changed during its last transaction.
Please do not update `changed` directly since its state is internally maintained by `set()`.
A copy of `changed` can be acquired from `changedAttributes()`.

#### record.changedAttributes( attrs? ) 

Retrieve a hash of only the record's attributes that have changed during the last transaction,
or false if there are none. Optionally, an external attributes hash can be passed in,
returning the attributes in that hash which differ from the record.
This can be used to figure out which portions of a view should be updated,
or what calls need to be made to sync the changes to the server.

#### record.previous( attr ) 

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

#### record.previousAttributes()

Return a copy of the record's previous attributes. Useful for getting a diff between versions of a record, or getting back to a valid state after an error occurs.