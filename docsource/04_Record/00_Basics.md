Record is the serializable class with typed attributes, observable changes, and custom validation checks.
It is the main building block for managing the application state; component local state, stores, and collection elements are all subclasses of the `Record`.

In contrast to the "model" class in the majority of data frameworks, Record is *not the key-value hash*. It's the class with statically
defined set of attributes of known types.
 
`Record` itself is an abstract class. The subclass needs to be defined for every data structure of different shape,
in a similar way as it's done in statically typed languages.

```javascript
import { define, Record } from 'type-r'

// ⤹ required to make magic work  
@define class User extends Record {
    // ⤹ attribute's declaration
    static attributes = {
        firstName : '', // ⟵ String type is inferred from the default value
        lastName  : String, // ⟵ Or you can just mention its constructor
        email     : String.value( null ), //⟵ Or you can provide both
        createdAt : Date, // ⟵ And it works for any constructor.
        // And you can attach ⤹ metadata to fine-tune attribute's behavior
        lastLogin : Date.value( null ).has.toJSON( false ) // ⟵ not serializable
    }
}

const user = new User();
console.log( user.createdAt ); // ⟵ this is an instance of Date created for you.

const users = new User.Collection(); // ⟵ Collections are defined automatically. 
users.on( 'changes', () => updateUI( users ) ); // ⟵ listen to the changes.

users.set( json, { parse : true } ); // ⟵ parse raw JSON from the server.
users.updateEach( user => user.firstName = '' ); // ⟵ bulk update triggering 'changes' once
```

# Record definition

Record must extend `Record` base class, it must have `static attributes` definition, and the class definition must be preceeded with `@define` decorator.

### `static` attributes = { name : `attrDef`, ... }

Record is a class with an observalbe and serializable public attributes. Attributes *must* be declared statically
in `static attributes` class member, which is an object hash mapping an attribute name name to its declaration, encapsulating
attribute type, default value, and metadata controlling different aspects of attribute behavior.

```javascript
@define class User extends Record {
    static attributes = {
        name    : String.value( 'John Dow' ),
        email   : 'john.dow@mail.com', // Same as String.value( 'john.dow@mail.com' )
        address : String, // Same as String.value( '' )
    }
}
```

The Record guarantee that _every attribute will always hold the value of the declared type_. Whenever the an attribute is being assigned
with the value which is not compatible with its declared type, the type is being converted with an invocation of the constructor: `new Type( value )` (primitive types are treated specially).

## Attribute definitions

### `attrDef` name : Type.value( defaultValue )

The general form of type annotation is `Type.value( defaultValue )`, where the `Type` is the corresponding constructor function.

### `attrDef` name : Type

When the function is used as `attrDef`, it's treated as the constructor function.
Any constructor function may be used as an attribute type, if it behaves as _converting constructor_ (like `new Date( msecs )`).

### `attrDef` name : defaultValue

When other value than function is passed, it's treated as the default value and the type is being inferred form the value.
 If you need to pass function as the default value, use `Function.value( theFunction )`.

# Record's class members

Record behaves as regular ES6 class with attributes accessible as properties.

### new Record()

Create an instance of the record with the default attribute values taken from the attributes definition.

When no default value is explicitly provided, it's `new Type()` (just `Type()` for primitives). When the default value is provided and it's not compatible with the attribute type, it's converted with `new Type( defaultValue )` call.

### new Record({ attrName : value, ... }, options? )

When creating an instance of a record, you can pass in the initial values of the attributes,
 which will be set on the record.

If `{parse: true}` is passed as an option, `attrs` is assumed to be the JSON.

If the value of the particular attribute is not compatible with its type, it's converted to this type invoking the constructor `new Type( value )` (just `Type( value )` for primitives).

```javascript
@define class Book extends Record {
    static attributes = {
        title  : '',
        author : ''
    }
}

const book = new Book({
  title: "One Thousand and One Nights",
  author: "Scheherazade"
});
```

### record.initialize( attrs?, options? )

Called at the end of the `Record` constructor when all attributes are assigned
and record's inner state is properly initialized. Takes the same arguments as
a constructor.

### record.attrName

Record's attributes may be directly accessed with `record.name`, as if they would be the members of the class.
Please note, that you *have to declare all attributes* in `static attributes` declaration before use.

```javascript
@define class Account extends Record {
    static attributes = {
        name : String,
        ballance : Number
    }
}

const myAccount = new Account({ name : 'mine' });
myAccount.ballance += 1000000; // That works. Good, eh?
```
