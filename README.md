# Type-R

![master build](https://api.travis-ci.org/Volicon/Type-R.svg?branch=master)

Transactional, reactive, and serializable state management core written with TypeScript.

Properly implemented two-phase update transactions on object ownership tree, dude. Change events, with updates in the scope of current transaction. All serializable. All dynamically type safe. Just what the doctors prescribe for the modern data layer.

Mostly compatible by API with your backbonejs, but 10 times faster in all browsers and capable of way more than your old plugins are, dude. :) 

Will be the basis of NestedTypes 2.0 version. Does to your React app the same thing as mobx does, but adds serialization. And to be fair, we started earler, so it's appropriate to say that they do the part of tricks we're doing for two years.

## Rationale

Because we can.

## Current state

- [x] Basic regression tests passes. Transactional core seems to work.
- [x] New integral performance tests shows 2-3 times performance improvement in complex structure updates. Good enough to go further.
- [x] Launching backbone Model/Collection regression to implement missing core functionality. That's gonna be tough.
    - [x] Model regression passes.
    - [x] Collection regression passes.
- [x] Implement relations.
- [x] Implement NestedTypes compatibility layer.
    - [x] Underscore/Lodash mixin for Model and Collection
    - [x] Backbone Persistence API
- [ ] Test it with NestedReact examples.
- [ ] Release ObjectPlus as separate package.
- [ ] Implement classes support in NestedReact.
- [ ] Deploy NestedReact and NestedTypes 2.0 RC to Volicon Observer product.
- [ ] Release NestedTypes 2.0 and NestedReact 1.0

## To do later

- [-] Fix silent option semantic. Now it's wrong (as in NestedTypes 1.3). Update should be propagated upper, just events must be supressed. (UPD: under the closer look, it's really the question what is wrong and what is not. Let's keep it like this for a while.)
- [ ] Fix new event maps semantic in case of inheritance. There might be the problem with inherited models.
- [x] Fix TypeDoc. It doesn't work.
- [-] Tune-up the performance (UPD: seems to be fine for the first release - at least 2x gain compared to NestedTypes 1.3).  

## Compatibility notes

I bet you never was aware about the most of these things, but still:

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
