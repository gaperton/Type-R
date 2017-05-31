Record is the serializable class with typed attributes, observable changes, and custom validation checks. It is the main building block for managing the application state; component local state, stores, and collection elements are all subclasses of the `Record`.

In contrast to the "model" class in the majority of data frameworks, Record is *not the key-value hash*. It's the class with statically defined set of attributes of known types.

`Record` itself is an abstract class. The subclass needs to be defined for every data structure of different shape, in a similar way as it's done in statically typed languages.

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

Record definition must:

- be the class extending the `Record`;
- be preceded with the `@define` decorator;
- have `static attributes` definition.

### `decorator` @define

_Must_ be placed before record class definition.

```javascript
import { define, Record } from 'type-r'

@define class X extends Record {
    ...    
}
```

### `static` attributes = { name : `attrDef`, ... }

Record's attributes definition. Lists attribute names along with their types, default values, and metadata controlling different aspects of attribute behavior.

```javascript
@define class User extends Record {
    static attributes = {
        name    : String.value( 'John Dow' ),
        email   : 'john.dow@mail.com', // Same as String.value( 'john.dow@mail.com' )
        address : String, // Same as String.value( '' )
    }
}
```

The Record guarantee that _every attribute will retain the value of the declared type_. Whenever an attribute is being assigned with the value which is not compatible with its declared type, the type is being converted with an invocation of the constructor: `new Type( value )` (primitive types are treated specially).

## Attribute definitions

### `attrDef` name : Type

When the function is used as `attrDef`, it's treated as the constructor function. Any constructor function which behaves as _converting constructor_ (like `new Date( msecs )`) may be used as an attribute type.

You can use other record's and collection's constructors as attribute types. They will be treated as an _integral part_ of the record (created, serialized, validated, and disposed together), i.e. as _aggregated members_.

```javascript
@define class Person extends Record {
    static attributes = {
        name : String // String attribute which is "" by default.
        createdAt : Date // Date attribute
        ...
    }
}
```

### `attrDef` name : defaultValue

When value of other type than function is used as `attrDef` it's treated as attribute's default value. Attribute's type is being inferred from the value.

Use the general form of attribute definition for attributes of `Function` type: `Function.value( theFunction )`.

```javascript
@define class GridColumn extends Record {
    static attributes = {
        name : '', // String attribute which is '' by default.
        render : Function.value( x => x ),
        ...
    }
}
```

### `attrDef` name : Type.value( defaultValue )

The general form of attribute definition is `Type.value( defaultValue )`, where the `Type` is the corresponding constructor function.

```javascript
@define class Person extends Record {
    static attributes = {
        phone : String.value( null ) // String attribute which is null by default.
        ...
    }
}
```

# Create the record

Record behaves as regular ES6 class with attributes accessible as properties.

### new Record()

Create an instance of the record with default attribute values taken from the attributes definition.

When no default value is explicitly provided for an attribute, it's initialized as `new Type()` (just `Type()` for primitives). When the default value is provided and it's not compatible with the attribute type, it's converted with `new Type( defaultValue )` call.

### new Record({ attrName : value, ... }, options? )

When creating an instance of a record, you can pass in the initial attribute values to override the defaults.

If `{parse: true}` option is used, `attrs` is assumed to be the JSON.

If the value of the particular attribute is not compatible with its type, it's converted to the declared type invoking the constructor `new Type( value )` (just `Type( value )` for primitives).

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

### `abstract` record.initialize( attrs?, options? )

Called at the end of the `Record` constructor when all attributes are assigned and the record's inner state is properly initialized. Takes the same arguments as
a constructor.

### record.attrName

Record's attributes may be directly accessed as `record.name`.

> Please note, that you *have to declare all attributes* in `static attributes` declaration.

```javascript
@define class Account extends Record {
    static attributes = {
        name : String,
        balance : Number
    }
}

const myAccount = new Account({ name : 'mine' });
myAccount.balance += 1000000; // That works. Good, eh?
```
