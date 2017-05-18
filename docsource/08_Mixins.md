Both plain JS object and class constructor may be used as mixins. In the case of the class constructor, missing static members will copied over as well.

#### `decorator` @mixins( mixinA, mixinB, ... ) class ...

You need to import mixins decorator to use mixins:

    import { mixins } from 'type-r'

    ...

    @mixins( plainObject, MyClass, ... )
    class X {
        ...
    }

#### `decorator` @mixinRules({ name : `rule`, ... }) class ...`

MixtureJS implements configurable merge rules. Rules can be extented in any subclass using the `mixinRules` class decorator. Rule is the string from the following list.

If merge rule is an object, the corresponding member is expected to be an object and the rule defines the merge rules for its members.

## Mixin rules

#### `rule` name : 'merge'

Assume property to be an object, which members taken from mixins must be merged.

#### `rule` name : 'pipe'

Property is the function ( x : T ) => T transforming the value. Multiple functions joined in pipe.

#### `rule` name : 'sequence'

Property is the function. Multiple functions will be called in sequence.

#### `rule` name : 'reverse'
Same as sequence, but functions called in reverse sequence.

#### `rule` name : 'mergeSequence'
Merge the object returned by functions, executing them in sequence.

#### `rule` name : 'every'
Property is the function ( ...args : any[] ) => boolean. Resulting method will return true if every single function returns true.

#### `rule` name : 'some'
Same as `every`, but method will return true when at least one function returns true.
