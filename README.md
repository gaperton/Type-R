# TransactionalJS

Minimalistic transactional model core. ES6

Will be the basis for next NestedTypes version.

## Current state

Basic regression tests passes. Transactional core seems to work.

Seems that old performance tests are a bit misleading about the performance factors 
which are really important. Also, we need to shift shirt term goal from being the fastest
engine ever created to correct implementation of transactions and strict ownership scheme,
while having reasonable performance increase in real-world situations (2x would be enough for the beginning). 

Need to create new integration test harness, to test both performance and functionality
in conditions close to our production system. Requrement notes are in performance test folder.

New tests must recognize the fact that performance really matters on large data structures received
from the server, and must simulate all typical scenarios we have.

This time we're taking disciplined scientific approach, considering real priorities and isolating 
different factors contributing to performance with dedicated tests. 
Quality and professional decision making this time - we're good at that aren't we? :)   