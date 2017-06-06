All records and collections except [shared objects](04_Shared_objects.md) are serializable by default as nested JSON reflecting the structure of their aggregation tree.

## Serialization API

### recordOrCollection.toJSON()

Produces the JSON for the given record or collection and its aggregated members. Aggregation tree is serialized as nested JSON. Record corresponds to an object in JSON, while the collection is represented as an array.

May be overridden in the particular record or collection class.

```javascript
@define class Comment extends Record {
    static attributes = {
        body : ''
    }
}

@define class BlogPost extends Record {
    static attributes = {
        title : '',
        body : '',
        comments : Comment.Collection
    }
}

const post = new BlogPost({
    title: "Type-R is cool!",
    comments : [ { body : "Agree" }]
});

const rawJSON = post.toJSON()
// { title : "Type-R is cool!", body : "", comments : [{ body : "Agree" }] }
```

### new RecordOrCollection( json, { parse : true } )

Create an object and its aggregated members from its JSON representation.

```javascript
// Create the blog post from previous example.
const rawJSON = { title : "Type-R is cool!", body : "", comments : [{ body : "Agree" }] };

const post = new BlogPost( rawJSON, { parse : true });
```

### recordOrCollection.set( json, { parse : true } )

Update an existing object and its aggregated members from its JSON representation.

```javascript
// Create the blog post from previous example.
const rawJSON = { title : "Type-R is cool!", body : "", comments : [{ body : "Agree" }] };

// Similar to new BlogPost( rawJSON, { parse : true });
const post = new BlogPost();
post.set( rawJSON, { parse : true });
```

### `abstract` recordOrCollection.parse( json )

Invoked internally when `{ parse : true }` is passed. May be overridden to define custom JSON transformation. Should not be called explicitly.

## Attribute-level serialization control

Serialization can be configured for the specific attribute in the Record's attribute definition.

### `attrDef` attr : Type.has.toJSON( false )

Do _not_ serialize the specific attribute.

### `attrDef` attr : Type.has.toJSON( ( value, name ) => json )

Override the default serialization for the specific record's attribute.

Attribute is not serialized when the function return `undefined`.

### `attrDef` attr : Type.has.parse( ( json, name ) => value )

Transform the data before it will be assigned to the record's attribute.

Invoked when the `{ parse : true }` option is set.

```javascript
// Define custom boolean attribute type which is serialized as 0 or 1.
const MyWeirdBool = Boolean.has
                      .parse( x => x === 1 )
                      .toJSON( x => x ? 1 : 0 );
```

## Serialization of Date

There's no built-in Date type in JSON. Type-R address this issue providing the attribute-level control on date's JSON representation.

### `attrDef` attr : Date

`attr` is serialized as an ISO string. Works in Safari as well.

### `attrDef` attr : Date.microsoft

`attr` is serialized as Microsoft's `"/Date(msecs)/"` string.

### `attrDef` attr : Date.timestamp

`attr` is serialized as UNIX integer timestamp.
