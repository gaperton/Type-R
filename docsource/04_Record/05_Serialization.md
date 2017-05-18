## Declarations

#### `attrDef` attr : Type.has.toJSON( false )

Exclude attribute from serialization.

#### `attrDef` attr : Type.has.toJSON( ( value, name ) => json )

Override the default toJSON() method for the selected record's attribute.

#### `attrDef` attr : Type.has.parse()

Transform the data before it will be passed to the record's attribute when `{ parse : true }` option is used.

## Class members

#### record.parse( json )

May be overriden to transform constructor or `set` argument when `{ parse : true }` option is used.

#### constructor( json, { parse : true } )

Call `record.parse( json )` and attribute-level parse transforms. They won't be executed by default.

#### record.set( json, { parse : true } )

Call `record.parse( json )` and attribute-level parse transforms. They won't be executed by default.

#### record.toJSON()

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
