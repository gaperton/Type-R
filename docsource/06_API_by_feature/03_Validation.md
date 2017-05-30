# Defining validators

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

# Validation API

Validation
Validation happens transparently on the first access to any part of the validation API. Validation results are cached. Only the required parts of aggregation tree will be validated again

### recordOrCollection.isValid()

Returns `true` whenever an object and its aggregation tree is valid.

### record.isValid( attrName )
### collection.isValid( recordId )

Returns `true` whenever the record's attribute or collection's item is valid.

### record.validationError

Detailed validation error information, or `null` if the record and its _aggregation tree_ is valid.
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

Detailed validation error information, or `null` if the collection and its _aggregation tree_ is valid.
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
