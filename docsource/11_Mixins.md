Type-R is based on mixins with configurable properties merge rules.

### `decorator` @mixins( mixinA, mixinB, ... ) class X ...

Merge mixins to the class definition. Both plain JS object and class constructor may be used as mixin. In the case of the class constructor, missing static members will copied over as well.

```javascript
    import { mixins, Events } from 'type-r'
    ...

    @mixins( Events, plainObject, MyClass, ... )
    class X {
        ...
    }
```

### `decorator` @mixinRules({ propName : `rule`, ... }) class ...`

Specified class properties will be merged according to the given rule.
Rules can be extended and overridden in any subclass.

## Mixin rules

### `rule` propName : 'merge'

Assume the property to be an object. Property values from mixins will be merged.

### `rule` propName : { name1 : `rule`, ... }

If merge rule is an object, the corresponding member is expected to be an object and the rule defines the merge rules for its members.

### `rule` propName : 'pipe'

Property is the function ( x : T ) => T transforming the value. Multiple functions joined in pipe.

### `rule` propName : 'sequence'

Property is the function. Multiple functions will be called in sequence.

### `rule` propName : 'reverse'
Same as sequence, but functions called in reverse sequence.

### `rule` propName : 'mergeSequence'
Merge the object returned by functions, executing them in sequence.

### `rule` propName : 'every'
Property is the function ( ...args : any[] ) => boolean. Resulting method will return true if every single function returns true.

### `rule` propName : 'some'
Same as `every`, but method will return true when at least one function returns true.
