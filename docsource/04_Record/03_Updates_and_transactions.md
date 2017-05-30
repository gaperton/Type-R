# Update record attributes

### record.attrName = value

Assign the record's attribute. If the value is not compatible with attribute's type from the declaration, it is converted:

- with `Type( value )` call, for primitive types.
- with `record.attrName.set( value )`, for existing record or collection (updated in place).
- with `new Type( value )` in all other cases.

Record triggers events on changes:
- `change:attrName` *( record, value )*.
- `change` *( record )*.

```javascript
@define class Book extends Record {
    static attributes = {
        title : String,
        author : String
        price : Number,
        publishedAt : Date,
        available : Boolean
    }
}

const myBook = new Book({ title : "State management with Type-R" });
myBook.author = 'Vlad'; // That works.
myBook.price = 'Too much'; // Converted with Number( 'Too much' ), resulting in NaN.
myBook.price = '123'; // = Number( '123' ).
myBook.publishedAt = new Date(); // Type is compatible, no conversion.
myBook.publishedAt = '1678-10-15 12:00'; // new Date( '1678-10-15 12:00' )
myBook.available = some && weird || condition; // Will always be Boolean. Or null.
```

### record.set( { attrName : value, ... }, options? : `options` )

Bulk assign record's attributes, possibly taking options.

If the value is not compatible with attribute's type from the declaration, it is converted:

- with `Type( value )` call, for primitive types.
- with `record.attrName.set( value )`, for existing record or collection (updated in place).
- with `new Type( value )` in all other cases.

Record triggers events after all changes are applied:

1. `change:attrName` *( record, val, options )* for any changed attribute.
2. `change` *(record, options)*, if there were changed attributes.

### `options` { parse : true }

Assume `record.set` argument is the raw JSON and parse it. Must be used to process the response from the server.

```javascript
// Another way of doing the bestSeller.clone()
// Amazingly, this is guaranteed to work by default.
const book = new Book();
book.set( bestSeller.toJSON(), { parse : true } );
```

### record.assignFrom( otherRecord )

Makes an existing `record` to be the full clone of `otherRecord`, recursively assigning all attributes.

```javascript
// Another way of doing the bestSeller.clone()
const book = new Book();
book.assignFrom( bestSeller );
```

# Transactions

All record updates occurs in the scope of transactions. Transaction is the sequence of changes which results in a single `change` event.

Transaction can be opened either manually or implicitly with calling `set()` or assigning an attribute.
Any additional changes made to the record in `change:attr` event handler will be executed in the scope of the original transaction, and won't trigger additional `change` events.

### record.transaction( fun )

Execute the all changes made to the record in `fun` as single transaction triggering the single `change` event.

```javascript
some.record.transaction( record => {
    record.a = 1; // `change:a` event is triggered.
    record.b = 2; // `change:b` event is triggered.
}); // `change` event is triggered.
```

Manual transactions with attribute assignments are superior to `record.set()` in terms of both performance and flexibility.
