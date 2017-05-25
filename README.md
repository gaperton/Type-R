# Type-R

![master build](https://api.travis-ci.org/Volicon/Type-R.svg?branch=master)

Universal state container for modern JS applications written with TypeScript for both UI and domain state management.

API docs are here: https://volicon.github.io/Type-R/

Distributed application state is defined as a superposition of the recursively nested `Record` and `Collection` objects.
State trees support transactional and deeply observable changes and are JSON-serializable by default. All state elements are _typed_ with run-time type assertions and type conversions on assignment. The declarative attribute-level validation is supported as well.

Type-R explicitly supports both _aggregation_ and _associations by id_ with the majority of operations performed recursively on _ownership trees_.

10 times faster than BackboneJS in all browsers.

Type-R represents the pinnacle of Volicon/Verizon R&D in the state management technology lasted for 3 previous years. 

## Rationale

All existing solutions for SPA state management are weird. We cannot wait when there will be the perfect one.

## Roadmap

- Implement I/O adapter abstraction (#12). It will bring back standard BackboneJS I/O methods, and makes it trivial to substitute the transport.
- Implement TypeScript support (#11). Records will become accurately typed.
- API cleanup. Remove deprecated stuff to reduce size.
- Maybe, implement proper two-phase update transactions. If it won't slow down the bulk updates.
- Your ideas. The most wonderful features of NestedTypes and Type-R appeared as result of user's issues.