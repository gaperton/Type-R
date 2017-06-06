# Mixins

## Decorators

Type-R is based on mixins with configurable properties merge rules.

### `decorator` @mixins( mixinA, mixinB, ... ) class X ...

Merge specified mixins to the class definition. Both plain JS object and class constructor may be used as mixin. In the case of the class constructor, missing static members will copied over as well.

```javascript
    import { mixins, Events } from 'type-r'
    ...

    @mixins( Events, plainObject, MyClass, ... )
    class X {
        ...
    }
```

### `decorator` @mixinRules({ propName : `rule`, ... }) class ...

Specified class properties will be merged according to the given rule.
Rules can be extended and overridden in any subclass.

## Mixin rules

### `rule` propName : 'merge'

Assume the property to be an object. Merge objects from mixins.

### `rule` propName : { name1 : `rule`, ... }

Assume the property to be an object. Recursively define merge rules for its properties.

### `rule` propName : 'pipe'

Assume the property to be the function with a signature `( x : T ) => T`. Join functions from mixins in a pipe: `f1( f2( f3( x ) ) )`.

### `rule` propName : 'sequence'

Assume the property to be the function. Call functions from mixins in sequence: `f1.apply( this, arguments ); f2.apply( this, arguments );...`

### `rule` propName : 'reverse'
Same as sequence, but functions are called in the reverse sequence.

### `rule` propName : 'mergeSequence'
Assume the property to be the function returning object. Merge objects returned by functions from mixins, executing them in sequence.

### `rule` propName : 'every'
Assume property to be the function returning boolean. Return `true` if all functions from mixins return truthy values.

### `rule` propName : 'some'
Same as `every`, but return true when at least one function from mixins returns true.
