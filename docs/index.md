---
title: API Reference

toc_footers:
  - <a href="https://github.com/Volicon/Type-R">GitHub repository</a>
  - <a href="https://github.com/Volicon/Type-R/issues">Ask the question or report the bug</a>
  - <a href="http://www.volicon.com/">Supported by <img style="vertical-align: middle" src="images/volicon_verizon_dm.png"/></a>

includes:
  - events
  - record
  - collection
  - store
  - mixins

search: true
---

# Getting started

Type-R helps to declaratively define complex domain and UI application state in modern JS applications as a superposition of three kinds of building blocks:

- *Record* classes with typed attributes.
- Ordered *collections* of records.
- *Stores* to hold collections used to resolve id-references in JSON.

The state defined with Type-R classes is deeply observable and serializable by default. While being an advanced JSON serialization engine handling sophisticated scenarios (like cross-collections many-to-many relationships), Type-R is completely unopinionated on the client-server transport protocol.

Type-R is your perfect M and VM in MVVM and MVC architecture imposing no restrictions on V and C parts.

    import { define, Record } from 'type-r'

    const Email = String.has.check( x => x! || x.indexOf( '@' ) >= 0, 'Invalid email' );

    @define class User extends Record {
        static attributes = {
            name  : String.isRequired,
            email : Email.isRequired
        }
    }

    @define class Message extends Record {
        static attributes = {
            created : Date
            author  : User,
            to      : User.Collection,
            subject : '',
            body    : ''
        }
    }

    const msg = new Message();
    assert( !msg.isValid() );

    msg.on( 'change', () => console.log( "something is changed!" ) );

    msg.transaction( () => {
        msg.author.name = 'John Dee';
        msg.author.email = 'dee@void.com';

        assert( msg.isValid() );
    });
> something is changed!


## Installation and requirements

Is packed as UMD and ES6 module. No peer dependencies are required.

`npm install type-r --save-dev`

<aside class="success">IE10+, Edge, Safari, Chrome, and Firefox are supported</aside>

<aside class="warning">IE9 and Opera may work but has not been tested. IE8 won't work.</aside>

## How the Type-R compares with X?

Type-R started to develop in 2014 as the modern substitution for BackboneJS, which would retain the spirit of the BackboneJS simplicity but would be superior to Ember Data in its capabilities and an order of magnitude faster than Backbone.

The closest things to the Type-R are [Ember Data](https://guides.emberjs.com/v2.2.0/models/), [BackboneJS models and collections](http://backbonejs.org/#Model), and [mobx](https://github.com/mobxjs/mobx). 

There are a lot of similarities:

- All that things can be used to manage an application's state.
- Type-R handles observable transactional changes in the way more or less similar to mobx (however, it's heavily optimized for the case of large aggregated object trees).
- Type-R id-relationships and validation capabilities are comparable to ones in [Ember Data](https://guides.emberjs.com/v2.2.0/models/relationships/), which was used a source of inspiration.
- Type-R has a lot of common in some API parts with BackboneJS models and collections. For instance, it uses the close API for the [collection updates](#update) and the [similar event model](#built-in-events) for the changes (however, it's generalized for the case of transactions on the nested records and collections).

Speaking of the distinguishing differences,

- Type-R's records are not key-value pairs but _classes_ with typed attributes. They are protected from improper assignment with run-time type assertions and conversions. Which means that the client-server protocol is protected again errors from both ends.
- Type-R distinguishes aggregation and the plain association operating with _aggregation trees_ formed by nested records and collections. Aggregation tree is serialized as nested JSON. Operations like `clone()`, `dispose()`, `isValid()` and `toJSON()` are performed recursively on elements of aggregation tree gracefully handling the references to shared objects.
- Type-R relies on _layered application state_ instead of the global singleton store. In Type-R, the stores are the special kind of records which can participate in dynamically configured lookup chains. There might be as many dynamically created and disposed stores as you need, starting with no stores at all.
- Type-R features automatic lazily evaluated [validation](#validation) with declarative attribute-level rules. Validation checks are the part of the attribute type; they are evaluated in the moment they needed and never performed twice on the unchanged data. 
- Type-R is really fast. It's capable of handling collections of 10K elements with real-time response and is about 10 times faster than BackboneJS.

Feature | Type-R | Backbone Models | Ember Data | mobx
-|-|-|-|-
Observable changes in object graph | ✓ | - | - | ✓
JSON Serialization | ✓ | ✓ | ✓ | -
Validation | ✓ | ✓ | ✓ | -
Dynamic Type Safety | ✓ | - | For serialization only | -
Aggregation | ✓ | - | - | -
Relations by id | ✓ | - | ✓ | - 
