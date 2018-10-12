# Type Safety and Validation

Type-R records and collections are _dynamically type safe_. It's guaranteed that Type-R data structures will always conform to the declared shape.
Records and collections convert values to the declared types on assignment, and reject an update (logging an error in a console) if it cannot be done.

In addition to that, Type-R supports validation API allowing developer to attach custom validation rules to attributes, records, and collections. Type-R validation mechanics based on following principles:

- Validation happens transparently on the first access to the validation error. There's no special API to trigger the validation.
- Validation is performed recursively on the aggregation tree formed by nested records and collections. If an element at the bottom of the tree is not valid, the whole object tree is not valid.
- Validation results are cached across the aggregation tree, thus consequent validation error reads are cheap. Only changed parts of aggregation tree will be revalidated when necessary.

## Attribute-level checks

### `attrDef` : type( Type ).check( predicate, errorMsg? )

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

Attribute may have any number of checks attached which are being executed in a sequence. Validation stops when first check in sequence fails.
It can be used to define reusable attribute types as demonstrated below:

```javascript
// Define new attribute metatypes encapsulating validation checks.
const Age = type( Number )
                .check( x => x == null || x >= 0, 'I guess you are a bit older' )
                .check( x => x == null || x < 200, 'No way man can be that old' );

const Word = type( String ).check( x => indexOf( ' ' ) < 0, 'No spaces allowed' );

@define class Person extends Record {
    static attributes = {
        firstName : Word,
        lastName : Word,
        age : Age
    }
}
```

### `attrDef` : type( Type ).required

The special case of attribute-level check cutting out empty values. Attribute value must be truthy to pass, `"Required"` is used as validation error.

`isRequired` is the first validator to check, no matter in which order validators were attached.

## Record

### rec.isValid( attrName )

Returns `true` if the specified record's attribute is valid.

### rec.getValidationError( attrName )

Return the validation error for the given attribute or `null` if it's valid.

## Record and Collection

Record and Collection share the same validation API. `key` is the attribute name for the record and record's id/cid for the collection.

### `callback` obj.validate()

Override this method in subclass to define object-level validation rules. Whatever is returned from `validate()` is treated as validation error.

<aside class="notice">Do not call this method directly, that's not the way how validation works.</aside>

### obj.isValid()

Returns `true` if the object is valid. Has same effect as `!object.validationError`.

### obj.isValid( key )

Returns `true` if the specified record's attribute or collection element is valid. `key` is an attribute's name for the record or record's id/cid for the collection.

### obj.validationError

`null` if an object is valid, or the the ValidationError object with detailed information on validation results.

ValidationError object has following shape:

```javascript
{
    error : /* as returned from collection.validate() */,

    // Members validation errors.
    nested : {
        // key is an attrName for the record, and record.cid for the collcation
        key : validationError,
        ...
    }
}
```

### obj.getValidationError( key )

Return the validation error for the given attribute or collection's item.
`key` is an attribute's name for the record or record's id/cid for the collection.

### obj.eachValidationError( iteratee : ( error, key, obj ) => void )

Recursively traverse aggregation tree validation errors. `key` is `null` for the object-level validation error returned by `obj.validate()`.
`obj` is the reference to the current object.