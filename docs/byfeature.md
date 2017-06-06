# API by Feature


## Attribute-level validators

Type-R supports declarative attribute-level validation declarations.
This is the preferable way of doing validation.

### `attrDef` attr : Type.has.check( predicate, errorMsg? )

Attribute-level validator.

- `predicate : value => boolean` is the function taking attribute's value and returning `true` whenever the value is valid.
- optional `errorMsg` is the error message which will be passed in case if the validation fail.

If `errorMsg` is omitted, error message will be taken from `predicate.error`. It makes possible to define reusable validation functions.

```javascript
function isAge( years ){
    return years >= 0 && years < 200;
}

isAge.error = "Age must be between 0 and 200";
```

Attribute may have any number of checks attached, which are execute in sequence. Validation stops when first check in sequence fails.

```javascript
// Define new attribute metatype encapsulating validation checks.
const Age = Number.has
                .check( x => x >= 0, 'I guess you are a bit older' )
                .check( x => x < 200, 'No way man can be that old' );
```

### `attrDef` attr : Type.isRequired

The special case of attribute-level check cutting out empty values. Attribute value must be truthy to pass, `"Required"` is used as validation error.

`isRequired` is the first validator to check, no matter in which order validators were attached.

## Object-level validators

### `abstract` recordOrCollection.validate()

Override in the subclass to add object-level validation. Whatever is returned from `validate()` is treated as an error message and triggers the validation error.

## Validation API

Validation happens transparently on the first access to any part of the validation API. Validation results are cached. Only the required parts of aggregation tree will be validated again

### recordOrCollection.isValid()

Returns `true` whenever an object and its aggregation tree is valid.

### record.isValid( attrName )
### collection.isValid( recordId )

Returns `true` whenever the record's attribute or collection's item is valid.

### record.validationError

Detailed validation error information, or `null` if the record and its _aggregated attributes_ are valid.
An error object has tree structure mapping the invalid subtree of the aggregation tree.

```javascript
// ValidationError object shape
{
    error : /* record-level validation error msg as returned from record.validate() */,

    // Attribute-level validation errors, one entry for each invalid attribute.
    nested : {
        // Contains nested ValidationError object for nested records and collections...
        nestedRecord : /* ValidationError */
        nestedCollection : /* ValidationError */

        // ...and error msg for all other attributes.
        otherAttr : /* attribute validation error as returned from .has.check() validator */
    }
}
```

### collection.validationError

Detailed validation error information, or `null` if the collection and its items are valid.
An error object has tree structure mapping the invalid subtree of the aggregation tree.

```javascript
// ValidationError object shape
{
    error : /* collection-level validation error msg as returned from collection.validate() */,

    // Collection items validation errors
    nested : {
        // Contains nested ValidationError object for nested records...
        /* record.cid */ : /* record.validationError */
    }
}
```

### record.getValidationError( attr )
### collection.getValidationError( recordId )

Return the validation error for the given `attr` or collection's item.

### recordOrCollection.eachValidationError( iteratee : ( error, key, recordOrCollection ) => void )

Recursively traverse aggregation tree errors. `key` is `null` for the record-level validation error (returned from `validate()`).
`recordOrCollection` is the reference to the current object.

## Polymorphic data structures

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

## Recursive data structures

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

### Forward declaration of the Collection

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
