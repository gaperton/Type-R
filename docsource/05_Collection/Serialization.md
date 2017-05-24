# Serialization methods

### colleciton.parse( json )

Called when `{ parse : true }` option is used in collection's `constructor`, `set`, `reset`, and `add` methods.

May be overriden to transforms the responce from the server.

### collection.toJSON()

Return an array containing the attributes hash of each model (via toJSON) in the collection. This can be used to serialize and persist the collection as a whole. The name of this method is a bit confusing, because it conforms to JavaScript's JSON API.

```javascript
@define class Man extends Record {
  static attributes = {
    name : '',
    age : 0
  }
}

const collection = new Man.Collection([
  {name: "Tim", age: 5},
  {name: "Ida", age: 26},
  {name: "Rob", age: 55}
]);

alert(JSON.stringify(collection));
```

# Polymorphic collections

Collection may contain polimorphic records of different types if they are the subclass of the `model`.
You need to define static `Model.create` factory method to make an abstract model serializable.

```javascript
@define // Serializable abstract Record
class Document extends Record {
    static attrbutes = {
      type : String,
      // attrs definition...
    };

    // Factory method needs to be defined.
    static create( attrs, options ){
        switch( attrs.type ){
            case "public" : return new PublicDocument( attrs, options );
            case "private" : return new PrivateDocument( attrs, options );
        }
    }
}

const Library = Document.Collection;

@define
class PublicDocument extends Document {
  static attributes = {
    type : 'public',
    // attrs definition...
  }
}

@define
class PrivateDocument extends Document {
  static attributes = {
    type : 'private',
    // attrs definition...
  }
}
```
