## Update record attributes

#### record.attrName = val

Assign record attribute.

1. Assign new attribute value.
2. If value has changed,
    - trigger `change:attrName` *( record, value )* event.
    - trigger `change` *( record )* event.

#### record.set( { attrName : val, ... }, options? : `options` )

Bulk assign record's attributes, possibly taking options.

1. Assign new attribut values.
2. For any changed attribute, trigger `change:attrName` *( record, val, options )* event.
3. If any attribute has changed:
    - trigger `change` *(record, options)* event.

#### `options` { parse : true }

Transform `record.set` argument with user-defined parse logic. Typically used to process the responce from the server to make user-defined JSON format conversion.

#### `options` { merge : true }

Merge attributes of record and collection types instead of replacement. If the new instance of record or collection is to be assigned,
update the current instances instead.

#### record.assignFrom( otherRecord )

Makes the `record` to be the copy of `otherRecord`, recursively assigning all attributes.

Works similar to `record.set( otherRecord.attributes, { merge : true });

## Listening to events

### Deep changes detection

Records automatically listens to change events of nested records and collections, and triggers the corresponding change events on its attributes. It means that the single attribute change deeply inside of aggregation tree will trigger change events on all the parents in a sequence.

#### `attrDef` attr : Type.has.changeEvents( false )

Do _not_ listen for the inner changes of the `attr`.

### Custom attribute change watchers

Declaratively attach the watcher in attribute definition. Subscription will be managed automatically.

#### `attrDef` attr : Type.has.watcher( 'methodName' )
#### `attrDef` attr : Type.has.watcher( function( value, name ){ ... } )

Attach `change:attr` event listener to the particular record's attribute.

_Watcher function_ has the signature `( attrValue, attrName ) => void` and is executed in the context of the record.

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

### Generic event API

Generic events API can be used to listen to any record's events.

#### listener.listenTo( record, eventName, handler )
#### listener.listenTo( record, { eventName : handler, ... } )

Subscribe for `eventName` from the record. Subscription will be automatically cancelled when messenger is disposed.
The handler is executed in the context of the listener.

#### listener.stopListening( record?, eventName?, hander? )
#### listener.stopListening( record?, { eventName : handler, ... } )

`listener.stopListening( record )` stops subscriptions from the record.

`listener.stopListening()` stops _all_ event subscriptions and _is called automatically_ from the `listener.dispose()`.

### Low-level event API

Low level event API is more efficient but requires precise `off()` call to stop the subscription. It must be done 
in overidden `dispose()` method to prevent memory leaks.

#### record.onChanges( handler, context? )

Subscribe for `change` event from the record. If `context` is passed, handler will be called in this context.

#### record.on( eventName, handler, context? )
#### record.on( { eventName : handler, ... }, context? )

Subscribe for the `eventName` from the record. If `context` is passed, handler will be called in this context.

#### record.off( eventName, handler, context? )
#### record.off( { eventName : handler, ... }, context? )

Cancel event subscription.

## Transactions

All record updates occures in the scope of transactions. Transaction is the sequence of changes which results in a single `change` event.

Transaction can be opened either manually or implicitly with calling `set()` or assigning an attribute.
Any additional changes made to the record in `change:attr` event handler will be executed in the scope of the original transaction, and won't trigger additional `change` events.

#### record.transaction( fun )

Execute the all changes made to the record in `fun` as single transaction.

```javascript
some.record.transaction( record => {
    record.a = 1; // `change:a` is triggered.
    record.b = 2; // `change:b` is triggered.
}); // `change` is triggered.
```

Manual transactions with attribute assignments are superior to `record.set()` in terms of both performance and flexibility.

## Change inspection methods

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