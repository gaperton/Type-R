![master build](https://api.travis-ci.org/Volicon/Type-R.svg?branch=master)

# Getting started

Type-R is the modern JS data framework allowing declaratively definitions of complex domain and UI application state. The state is defined as the superposition of JS classes extending `Record` and `Collection`, and has following features:

- _It's mapped to JSON by default_. The mapping can handle sophisticated scenarios with nested JSON and relations by id, and can be easily customized for every particular attribute or class.
- _All changes are observable_, happens in the scope of transactions, and there's the fine-grained change events system.
- _Validation_ is performed on the first access to the validation error and never happens twice for unchanged data.
- _Everything is typed at run-time_ and is protected from improper updates. The shape of generated JSON and data classes is guaranteed to match the definitions.
- It still looks like regular JS classes and is freaking fast. Type-R data structures are about 10 times faster than Backbone models and collections.

![overview](docs/images/overview.png)

Data layer is defined as a superposition of three kinds of building blocks:

- *Record* classes with typed attributes.
- Ordered *collections* of records.
- *Stores* are records with a set of collections in its attributes used to resolve id-references in JSON.

Type-R is completely unopinionated on the client-server transport protocol and the view layer technology. It's your perfect M and VM in modern MVVM or MVC architecture.

```javascript
import { define, Record } from 'type-r'

// Define email attribute type with encapsulated validation check.
const Email = String.has.check( x => x! || x.indexOf( '@' ) >= 0, 'Invalid email' );

@define class User extends Record {
    static attributes = {
        name  : String.isRequired, // should not be empty for the record to be valid.
        email : Email.isRequired
    }
}

@define class Message extends Record {
    static attributes = {
        created : Date //  = new Date()
        author  : User, // aggregated User record.
        to      : User.Collection, // aggregating collection of users
        subject : '',
        body    : ''
    }
}

const msg = new Message();
assert( !msg.isValid() ); // Is not valid because msg.author has empty attributes

// Listen for the changes in aggregation tree...
msg.on( 'change', () => console.log( 'change!!!' ) );

msg.transaction( () => { // Prepare to make the sequence of changes on msg
    msg.author.name = 'John Dee'; // No 'change' event yet as we're in the transaction. 
    msg.author.email = 'dee@void.com'; 

    assert( msg.isValid() ); // Now msg is valid as all of its attributes are valid.
}); // Got single 'change!!!' message in the console.
```


## [Documentation](https://volicon.github.io/Type-R/)

## Installation and requirements

Is packed as UMD and ES6 module. No peer dependencies are required.

`npm install type-r --save-dev`

<aside class="success">IE10+, Edge, Safari, Chrome, and Firefox are supported</aside>

<aside class="warning">IE9 and Opera may work but has not been tested. IE8 won't work.</aside>

## Roadmap

- Implement I/O adapter abstraction (#12). It will bring back standard BackboneJS I/O methods, and makes it trivial to substitute the transport.
- Implement TypeScript support (#11). Records will become accurately typed.
- API cleanup. Remove deprecated stuff to reduce size.
- Maybe, implement proper two-phase update transactions. If it won't slow down the bulk updates.
- Your ideas. The most wonderful features of NestedTypes and Type-R appeared as result of user's issues.
