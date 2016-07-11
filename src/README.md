# Model library core

It must implement:
- Two-phase transactions
- Basic data manipulations 
- Validation
- Serialization
- Attribute options as objects

Transactions, Relations, Serialization, Validation, Dynamic Type safety

It must _not_:
- Implement relations.
- Implement Model.Collection. Record must be unaware of collections. 
- Have any side dependencies, including underscore and backbone Events
- Implement I/O in any form

NestedTypes will be the service layer on top of this library, adding:
- Monadic type definitions, Model.Collection, type inference, etc.
- Relations and Stores
- Backbone Events
- Backbone-style I/O
- Backbone compatibility shims
- NestedTypes backward compatibility stuff
- Underscore/Lodash methods

Since it will be tough at the beginning, compiled core will be in subfolder.
Probably, it will be enough to compile it to ES5 CommonJS file-by-file.