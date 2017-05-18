
## Declarations

#### `attrDef` attr : Type.has.check( predicate, errorMsg? )

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

#### `attrDef` attr : Type.isRequired

The special case of attribute-level check cutting out empty values. Attribute value must be truthy to pass, `"Required"` is used as validation error.

`isRequired` is the first validator to check, no matter in which order validators were attached.

## Class members

#### record.validate()

Override in Record subclass to add record-level validation. Whatever is returned is treated as an error message.

#### record.isValid()

Returns `true` whenever the record is valid. The whole aggregation tree is validated.

#### record.isValid( attrName )

Returns `true` whenever the record's attribute is valid.

#### record.validationError

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

### Validation error traversal

ValidationError has a couple of methods for tree traversal.

#### validationError.each( ( error, key ) => void )

Iterate through the records's errors (not recursive). `key` is `null` for the record-level validation error.

#### validationError.eachError( ( error, key, recordOrCollection ) => void )

Recursively traverse aggregation tree errors. `key` is `null` for the record-level validation error.
`recordOrCollection` is the reference to the current object.
