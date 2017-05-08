# Type-R

![master build](https://api.travis-ci.org/Volicon/Type-R.svg?branch=master)

Universal state container for modern JS applications written with TypeScript for both UI and domain state management.

Distributed application state is defined as supersposition of the recursively nested `Record` and `Collection` objects.
State trees supports transactional and deeply observable changes, and is JSON-serializable by default. All state elements are _typed_ with run-time type assertions and type conversions on assignment. The declarative state validation is supported out of box as well.

Type-R explicitly supports both _aggregation_ and _associations by id_ with the majority of operations performed recursively on _ownership trees_.

Mostly compatible by API with backbonejs, but 10 times faster in all browsers.

Type-R represents the pinnacle of Volicon/Verizon R&D in the state management technology lasted for 3 previous years. 

## Rationale

Because we can.

## Current state

Tested and deployed to Volicon/Verizon production systems. Documentation is pending.

## Compatibility notes

It highly unlikely that you even aware about the most of these Backbone API features, but still:

- `object.trigger( 'a b' )` is not supported. Use `object.trigger( 'a' ).trigger( 'b' )`. Performance reasons. Not to mention, that when you doing so, you are most likely doing something wrong.
- `model.initialize( attrs, options, owner )` uses third parameter to set owner, `options.collection` is ignored.
- default model cid prefix is `m`.
- model.set `unset` option is deprecated. In Type-R, model is not a hash, it's a record with pre-defined members. So, you cannot really delete the model attribute. Just assign it with `void 0` instead.
- model `change:attr` events are not bubbled up by collection by default. Manual `itemEvents` spec is required. Performance reasons.
- Collection doesn't have `_addReference` and `_removeReference` callbacks. Impossible to implement efficiently. Use 'add' and 'remove' events instead.
- Collection.set `add` option is not supported. Period. But `remove` option works.
- Collection doesn't set options.at options when firing `add` event. No way, dude. It's even not documented in official backbone API.
- Collection.subsetOf:
    - `.justOne( x )` method is deprecated. Use `.set([ x ])` instead.
    - `.removeAll()` method is deprecated. Use `.reset()` instead.
- experimental NestedTypes features not supported:
    - has.proxy - too complex and was never needed.
- Types of models and collection default valus are now inferred to shared types.
- Symbolic references - `store.x` syntax is deprecated, use `~x` instead.
- `Integer` -> `Number.integer`
- `Date` attribute doesn't parse MS format. Use `Date.microsoft`.
- Object.extend.attach( Something ) => Nested.Messenger.mixTo( Something ).
