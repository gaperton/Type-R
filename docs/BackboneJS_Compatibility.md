*Type-R* implements the core subset of [BackboneJS 1.2](https://cdn.rawgit.com/jashkenas/backbone/1.2.3/index.html) model and collection API, maiking it simple
to start for the developers who are familiar with BackboneJS.

Following types have a reasonable level of API compatibility: Model, Collection, Events.

*Not* supported: Router, History, View, sync and REST functionality.

*Type-R* is data framework which is not dependent on BackboneJS in any way and not designed as a drop-in BackboneJS replacement.
For that purpose use [NestedTypes]() which implements the complete BackboneJS API.  

## Events

Type-R Events implements [BackboneJS Events API](https://cdn.rawgit.com/jashkenas/backbone/1.2.3/index.html#Events) with following differences:

- `trigger( 'a b c' )` is not supported. Performance reasons, use `trigger( 'a' ).trigger( 'b' ).trigger( 'c' )` instead.

## Model

#### model.attributes is _not_ a hash

In Type-R, all model attributes are _typed_ and must be _declared_ in `defaults` section.

- Attempt to assign undeclared attribute with `model.set()` will result in console error and will be ignored.
- Attribute assignments are guarded with type checks, and attributes infer their types from the default values.
    - if attribute is initialized with `0` and you assign it with `"Joe"`, it will end up with `NaN` (and the console warning).
    - to declare polimorphic attribute and turn this logic off, use `R.value( defaultValue )`.  
- Function as default value is assumed to be the constructor and means _attribute type_, not value.
    - if `Date` is used as default value, `new Date()` will be invoked to create the default value.
    - to declare attribute of function type use `Function.value( defaultFunction )`.
- Do not use _function_ in `defaults`. Use plain object. It's safe, plain arrays and objects will be copied automatically. 

In the exchange, you will receive:

- Speed. Type-R is more than 10 (ten) times faster than Backbone.
- Direct access to model attributes, no `model.get` and `model.set` is required no more.
- Collection is defined automatically. `YourModel.Collection`.
- No pain with dates. Just use `Date` constructor as an attribute default value.
- Nested models and collections support. Just use their constructors as default value like `Date`.

#### ES6 Support 

ES6 classes are supported, but it works entirely different compared to BackboneJS:

```javascript
import { define, Model } from 'type-r'

@define // <- It's mandatory.
class User extends Model {
    static attributes = { // <- use it instead 'defaults'
        age      : 18,
        email    : '',
        birthday : Date
    }
}
```

#### Other incompatibilities 

- `this.collection` is not available inside of `initialize()`.
- `validationError`, `isValid()`, and `validate()` exists, but works completely different. Please, refer to the manual.
- `model.set()` options:
    - ignored: `validate`, `unset`;
    - *not* ignored (like it was in BackboneJS): `parse`.
- `urlRoot`, `save()`, `fetch()`, `destroy()`, `sync()` are not available. Implemented by [NestedTypes](). 

## Collection

- Collection doesn't bubble other model events than `change`.
    - Use `itemEvents : { 'change:attrName' : true, ... }` declaration in the Collection definition to enable events bubbling.  
- `collection.set` method ignores `add` option.
- Collection is assumed to be the single owner of its elements.
    - Use `new Collection.Refs()` to create collection who do _not_ take ownership on its models.

## Model and Collection Underscore Methods

*Type-R* doesn't depend on [Underscore] in any way. However, Underscore methods are
fully supported for both [Model](https://cdn.rawgit.com/jashkenas/backbone/1.2.3/index.html#Model-Underscore-Methods) and [Collection](https://cdn.rawgit.com/jashkenas/backbone/1.2.3/index.html#Collection-Underscore-Methods).

You *must* do the following at the application start if you want to enable Underscore support:

```javascript
import _ from 'underscore'
import { useUnderscore } from 'type-r'

useUnderscore( _ );
```

It might work with lodash as well, but didn't tested.