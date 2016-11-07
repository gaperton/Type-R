`Type-R` has powerful declarative validation tools, allowing
you to express complex business rules for the models, collections, and model attributes.  

```javascript
@define
class User extends Model {
    static attributes = {
        // Adults only. We're not playing games here.
        age : Number.has.check( x => x > 18, 'Age must be greater than 18' ),

        // Check as pre-defined function.
        name : String.has.check( isRequired ),

        // Sequence of checks.
        email : String.has.check( isRequired )
                          .check( isValidEmail ),

        password : String
    }

    // Object-level validator
    validate(){
        // Here we can do some cross-checks. Rarely needed.
        if( this.name === this.password ){
            return 'Silly password. Or the name.';
        }
    }
}

function isRequired( x ){ return x; }
isRequired.error = 'Required'; // message can be attached to the check function.

function isValidEmail( x ){ /* take it from stackoverflow */ }
isValidEmail.error = 'Not valid email';
```

## Validation API

Models and collection shares the same validation API.

#### `method` validate() : any

Object-level custom validator, may be overriden for models and collections. Returns validation error (any non-null object), or `undefined`.

#### `attribute spec` name : Type.has.check( isValid, error? )

Attribute-level custom validator, may be attached to any model attribute.

- `isValid` is the function of form `( attrValue, attrName ) => boolean` taking attribute value as an argument and returning truthy value when its valid.
- `error` is the custom error object which will be stored inside of `validationError`. Must be truthy.

Checks can be chained. In this case, they are executed in sequence, the first failed check will stop the validation populate its `error`.

Checks are executed in the context of the model, thus you can refer to other model attributes inside of the check:

```javascript
static attributes = {
    category    : String,
    subcategory : String
        // Can have subcategory only when there is the category selected.
        .has.check( function( x ){ // cannot use => here, need the correct `this`.
            return !x || this.category;
        })
}
```

#### `var` validationError : ValidationError

Object holding detailed error information or `null` if all checks are passed. ValidationError has following members:

- `error`: whatever was returned from `object.validate()`. Truthy value counts as an error.
- `nested`: the hash of errors, where the `key` is an attribute name for the model or `model.cid` for the collection.
    - For the collection: hash of its models' `validationError` objects by their `cid`.
    - For the model: hash of errors from `.has.check` by attribute name, or `validationError` objects for nested models and collections.  
- `length`: total count of nested errors + 1 if local error is present`

Validation error is lazily evaluated (calculated on first access), cached, and cleared when any changes are applied
to the holding model or collection. Which means that an actual validation happens in the moment when you
 access `validationError` for the first time, but subsequent reads are cheap.

```javascript
const error = user.validationError; 
if( error ){
    console.log( error.nested.age );
}
```

Most of the time you're not supposed to work with `validationError` directly.  

#### `method` isValid( key? : string ) : boolean

Check whenever member with a given key is valid.
Key is an attribute name for the model and model id or cid for the collection.

If the key is not provided, method checks the validity of all object members (similar to `!model.validationError`). 

```javascript
if( !user.isValid() ){
    if( !user.isValid( 'age' ) ){
        console.log( "Hey, you're too young!" );
    }
}
```

#### `method` getValidationError( key : string ) : any

Return validation error (or undefined) for an attribute or collection item with the given key.

It would be an object passed as the second argument to `.has.check( isValid, error )` attribute specification.
Typically the string.

```javascript
if( !user.isValid( 'age' ) ){
    console.log( user.getValidationError( 'age' ) );
}
```
    
#### `method` deepValidationError( reference : string ) : any

Same as `getValidationError( key )`, but can use deep symbolic reference (dot-separated path) as a key.
When there are no error, or any of the items on the path are `null`, returns `undefined`.

```javascript
console.log( someObject.deepValidationError( 'path.to.the.user.age' ); );
```
    
#### `method` eachValidationError( iteratee ) : void

Iterate through all validation errors across the object ownership tree. `iteratee` is the function
of the following signature:

`( error : any, key : string, object : Transactional ) => void`

It will be called one time for every attribute-level and object-level validation error.
It might be useful when you want to format and show all the errors at once.
