# Polymorphic data structures

Sometimes it's required to deal with the collection of records of different types.
In the simplest case, `Record.Collection` is polymorphic in a sense that it may hold any record
inside, as well as the record's attribute of the `Record` type.

The trick, however, is to restore polymorphic data from JSON as its type is unknown.
Type-R solves it with _abstract records_.

## Defining an abstract record

Record base class with the `create()` factory function attached to its definition is an _abstract record_.

### `static` create( attrs, options )

The factory function used internally by Type-R to create the instance of the record.
Must be defined in the base class for the polymorphic record.

```javascript
@define class Widget extends Record {
    static attributes = {
        type : String
    }

    static create( attrs, options ){
        switch( attrs.type ){
            case "typeA" : return new TypeA( attrs, options );
            case "typeB" : return new TypeB( attrs, options );
        }
    }
}

@define class TypeA extends Widget {
    static attributes = {
        type : "typeA",
        ...
    }
}

@define class TypeB extends Widget {
    static attributes = {
        type : "typeB",
        ...
    }
}
```

## Polymorphic attributes and collections

Abstract record type can be used to define serializable polymorphic attributes and collections.

### `attrDef` attr : PolymorphicRecord

Attribute of polymorphic record type is serializable.

### PolymorphicRecord.Collection

The default Collection for the polymorphic record type is serializable.

# Recursive data structures

The record is _recursive_ if it's uses the type of itself in its attribute definition.

### RecordOrCollection.define({ attributes : { name : `attrDef` } })

Used in conjunction with `@predefine` decorator to make recursive definitions
referencing the same type.

Replaces `static attributes` declaration.

```javascript
@predefine class Comment extends Record{}

Comment.define({
    attributes : {
        text : String,
        replies : Comment.Collection
    }
});
```

### Forward collection declaration

As an alternative to `@predefine` decorator, you may make forward declaration for the collection.

```javascript
// Declare the collection class.
@define class Comments extends Record.Collection {}

@define class Comment extends Record({
    static Collection = Comments; // Make it the default Comment collection.

    attributes : {
        text : String,
        replies : Comments
    }
});
```
