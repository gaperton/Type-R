All records are serializable by default. Record corresponds to an object in JSON.

The way how the record is parsed from JSON or serialized back to JSON can be controlled on the level of the
specific Record type and the specific attribute.

# Serialization

### `attrDef` attr : Type.has.toJSON( false )

Exclude attribute from serialization.

### `attrDef` attr : Type.has.toJSON( ( value, name ) => json )

Override the default toJSON() method for the selected record's attribute.

### record.toJSON()

Create record's JSON representation. This can be used for persistence, serialization, or for augmentation before being sent to the server.
The name of this method is a bit confusing, as it doesn't actually return a JSON string — but I'm afraid that it's the way that the JavaScript API for JSON.stringify works.

```javascript
@define class Artist extends Record {
    static attributes = {
        firstName: String,
        lastName: String,
        birthday : Date,
        code : String.has.toJSON( x => x.toLowerCase() )
    }
}

const artist = new Artist({
    firstName: "Wassily",
    lastName: "Kandinsky"
});

artist.birthday = new Date( 1866, 12, 16 );

alert( JSON.stringify( artist ) );
```

It will, however, produce correct JSON for all the complex attribute types.

# Parsing

Custom parse logic is invoked in the `constructor` or `set` to transform the data when the `{ parse : true }` option is used.

### `attrDef` attr : Type.has.parse( ( json, name ) => value )

Transform the data before it will be passed to the record's attribute.

### record.parse( json )

Transform the data to prodice an attribute hash used in `record.set()`.

