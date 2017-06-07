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

Type-R is the universal state management framework for both UI and domain state.

Application state is described with the superposition of two main container types - [Record](04_Record/00_Overview.md) and [Collection](./05_Collection/00_Overview.md) of records. The state has observable changes and is serializable by default.

- Records are classes with typed attributes. They are protected from attributes assignment of incompatible types with run-time type assertions and conversions. Which means that the client-server protocol is protected from both ends.
- Records distinguish [aggregated attributes](06_API_by_feature/01_Aggregation_tree.md) and those which are [references to shared objects](06_API_by_feature/04_Shared_objects.md). Aggregated attributes are serialized as nested JSON, while references might be [serialized as ids](06_API_by_feature/05_id-references_and_Stores.md). Operations like `clone()`, `dispose()`, and `toJSON()` are performed recursively on elements of aggregation tree.
- Type-R features declarative [validation](06_API_by_feature/03_Validation.md) with attribute-level rules. Validation is transparent and lazily evaluated.
- Architecture does not depend on stores and singletons. [Stores](05_API_by_feature/05_id-references_and_Stores.md) are optional and used for shared data only. There might be as many stores as you need, and they can be created and disposed dynamically.
- Type-R data structures are pretty efficient. They are about 10 times faster in real-world data scenarios than BackboneJS.

## Installation

Is packed as UMD and ES6 module. No side dependencies.

`npm install type-r --save-dev`

## Requirements

IE10+, Edge, Safari, Chrome, and Firefox are supported.

IE9 and Opera may work but has not been tested. IE8 _won't work_.

## How the Type-R compares with X?

Type-R is designed to be the substitution for BackboneJS, which was used extensively 3 years ago in Volicon/Verizon Observer products. While it largely backward compatible by its API with BackboneJS (for Events and Collections), it's entirely different internally.

In its core, it's an engine for managing the _aggregation trees_ composed of nested Records and Collections. It contains no View, Router, REST, and jQuery/Underscore dependencies.

Feature | Type-R | BackboneJS | EmberJS | mobx
-|-|-|-|-
View and Router | - | ✓ | ✓ | -
Models | ✓ | ✓ | ✓ | Objects as models
Collections | ✓ | ✓ | modeled as relations | Arrays as collections
Nested Data Strictures | as aggregation trees and relations | - | as relations | as object graph
Relations by id | resolved agains the chain of dynamic stores | - | resolved agains the global store | - 
JSON Serialization | ✓ | ✓ | ✓ | -
Validation | ✓ | ✓ | ✓ | -
