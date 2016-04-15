# TransactionalJS

Minimalistic transactional model core. ES6

Will be the basis for next NestedTypes version.


Features
------------
Model
    - new Model( attrs, options )
    - model.set( attrs, options )
    - model.toJSON()
    - model.parse( data )
    - model.name = value; 
    - model.transaction( fun );
    - model.attributes spec
        - Primitive Types
        - Type inference
        - Date
        - Model
        - Type.value( x ) support.
    - NO backbone events depencency


1. Transactional API:
- model.transaction( fun )
- model.attr = x;
    - every assignment is nested transaction
    - immediate change:attr event
    - optimized for primitives
    - 'deep set' uses object sync API.
    - every commited nested transaction is local `touch`.
    
2. Object sync API. Mostly used inside of fetch.
- model.set
    - optimized for complete object set (unrolled attr loop).
    - change:attr is delayed (two-phase commit, nested first)
    - treat every nested commited transaction in the same way as local attr change.
    - commit nested transactions ( -- )
    - commit self 
    Sequence (sync):
    0. Open transaction, if needed
    1. Set all local and nested attrs
    Check if marked for delayed external commit (delayed change:attr), exit if true.
    2. Commit nested transactions (change:attr + change).
    3. Commit self
    
- An API:
    - Open transaction and update
    - Commit.
     
