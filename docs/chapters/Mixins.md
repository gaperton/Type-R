# Mixins

Type-R mechanics is based on class transformations at the moment of module load.

## Class Definition

### `decorator` @define

All Type-R class definitions must be precedeed with the `@define` (or `@predefine`) decorator.

1. It calls static `onExtend( BaseClass )` function if it's defined.
2. It extracts the definitions from the static class members and all the mixins applied to the particular class.
3. It calls static `onDefine( definitions, BaseClass )` functions if it's defined.
4. It applies _merge rules_ for overriden class methods.

### `decorator` @define( definitions )

When called with an argument, `@define` decorator applies the given `definitions` mixin as if it would be the first mixin applied.

In other aspects, it behaves the same as the `@default` decorator without argument.

### `decorator` @predefine

The sequence of `@predefine` with the following `Class.define()` call is equivalent to `@define` decorator. It should be used in the case if the class definition must reference itself, or multiple definitions contain circular dependency. 

It calls static `onExtend( BaseClass )` function if it's defined. It assumes that the `Class.define( definitions )` method will be called later, and attaches `Class.define` method to the class if it was not defined.

### `static` Class.define( definitions? )

Finalized the class definition started with `@predefine` decorator. Has the same effect as the `@define` decorator excepts it assumes that `Class.onExtend()` static function was called already.

### `static` Class.onExtend( BaseClass )

Called from the `@predefine` or as the first action of the `@define`. Takes base class constructor as an argument.

### `static` Class.onDefine( definition, BaseClass )

Called from the `@define` or `Class.define()` method. Takes class definition as the first argument.

### `decorator` @mixins( mixinA, mixinB, ... ) class X ...

Merge specified mixins to the class definition. Both plain JS object and class constructor may be used as mixin. In the case of the class constructor, missing static members will copied over as well.

```javascript
    import { mixins, Events } from 'type-r'
    ...

    @define
    @mixins( Events, plainObject, MyClass, ... )
    class X {
        ...
    }
```

### `static` Class.mixins

Class member holding the state of the mixins. Experimental (API may change in future).

## Merge rules

### `decorator` @mixinRules({ propName : `rule`, ... }) 

The `rule` is the reducer function which is applied when there are several values for the particular class members are defined in different mixins or the class, or if the class member is overriden in the subclass.

<aside class="warning">
This is an experimental feature to support React-style mixins. Should be used with an extreme care.
</aside>

### `rule` mixinRules.classFirst

Assume the property to be the function. Call functions from mixins in sequence: `f1.apply( this, arguments ); f2.apply( this, arguments );...`

### `rule` mixinRules.classLast
Same as sequence, but functions are called in the reverse sequence.

### `rule` mixinRules.pipe

Assume the property to be the function with a signature `( x : T ) => T`. Join functions from mixins in a pipe: `f1( f2( f3( x ) ) )`.

### `rule` mixinRules.defaults

Assume the property to be the function returning object. Merge objects returned by functions from mixins, executing them in sequence.

### `rule` mixinRules.every

Assume property to be the function returning boolean. Return `true` if all functions from mixins return truthy values.

### `rule` mixinRules.some

Same as `every`, but return true when at least one function from mixins returns true.

## Definitions

### `decorator` @definition({ propName : `rule` })

Treat specified properties from mixins and static class members as _definitions_. When `@define` decorator is being called, definitions are extracted and passed to the `Class.onDefine( definition )` method.

### `rule` mixinRules.value

The value defined in the class overrides the value in the mixins.

The default merge rule. When no rules are defined for the class member it's being merged with `value` rule.

### `rule` mixinRules.protoValue

Same as `mixinRules.value`, but the value is being assigned to the class prototype.

### `rule` mixinRules.merge

Assume the property to be an object. Merge objects from mixins.
