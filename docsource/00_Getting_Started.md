# Introduction

Type-R is the universal state container for both UI and domain state management.

Application state is described with the superposition of two main container types - [Record](04_Record/00_Definition.md) and [Collection](05_Collection/00_Definition.md) or records. The state has observable changes and is serializable by default.

- Records are classes with typed attributes. They are protected from assignment of incompatible types with run-time type assertions and convertions. Which means that the client-server protocol is protected from both ends.
- Records distinguish [aggregated attributes](06_API_by_feature/01_Aggregation_tree.md) and those which are [references to shared objects](06_API_by_feature/04_Shared_objects.md). Aggregated attributes are serialized as nested JSON, while references might be [serialized as ids](06_API_by_feature/05_id-references_and_Stores.md). Many operations like `clone()`, `dispose()`, and `toJSON()` are performed recursively on elements of aggregation tree.
- Type-R features declarative [validation](06_API_by_feature/03_Validation.md) with attribute-level rules. Validation is transarent and lazily evaluated.
- Architecture does not depend on stores and singletons. [Stores](05_API_by_feature/05_id-references_and_Stores.md) are optional and used for shared data only. There might be as many stores as you need, and they can be created and disposed dynamically.
- Type-R data structures are pretty efficient. They are about 10 times faster in real-world data scenarios than BackboneJS.

# Installation

Is packed as UMD and ES6 module. No side dependencies.

`npm install type-r --save-dev`

## Requirements

IE10+, Edge, Safari, Chrome, Firefox are supported.

IE9 and Opera may work but has not been tested. IE8 _won't work_.
