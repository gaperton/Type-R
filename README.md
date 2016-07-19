# TransactionalJS

Minimalistic transactional model core. ES6

Will be the basis for next NestedTypes version.

## Current state

Basic regression tests passes. Transactional core seems to work.

Need to create new integration test harness, to test both performance and functionality
in conditions close to our production system. Reuqurements notes are in performance test folder.

New tests must recognize the fact that performance really matters on large data structures received
from the server, and must simulate all typical scenarios we have.

This time we're taking disciplined scientific approach, considering real priorities and isolating 
different factors contributing to performance with dedicated tests. 
Quality and professional decision making this time - we're good at that aren't we? :)   