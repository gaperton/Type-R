# Records todo list

## Minimal flat record
[ ] Primitive types attributes
[ ] Type inference
[ ] constructor
[ ] default record.toJSON()
[ ] set
[ ] transactional updates
[ ] ad-hoc attribute access

- no parsing
- no nested stuff

## Advanced flat record
[ ] Date type attribute
[ ] Object and Array types
[ ] JSON attr type
[ ] Constructor type
[ ] Global type inference
[ ] Custom toJSON()
[ ] Custom parse()
[ ] deep and shallow copy

## Nested record
[ ] deep update
[ ]

# Remarks

Ownership stuff.

There's a pattern with ViewModels - assigning if the globals
to state members just to listen the changes.

With a current ownership scheme, it won't work.
1) New metatypes are needed:
- Model.ref( optional std ref )
- Collection.ref( optional std ref )

These things are not serializable. Nor they set an owner.
Nor they will trigger the change.

2) So, we need either to add these watching support to the core
(which we don't want to do), or use some mechanics to listen for events.

```
a : Model.Ref.events({
    change(){ this.forceChange( 'a' ); }
})
```

or, more clear syntax:

```
a : Model.Ref.changeEvents( 'change' )
```

We need to support both.


or, use special type

```
a : Model.LinkedRef
```

or, reverse semantic:

```
a : Model.Ref // listening to changes
a : Model.WeakRef // doesn't listen to changes
```

Regarding the text ref stuff.
- in this case attribute should be constant.
- there's an unsolvable issue that master link can be changed. So, its dangerous.
- Therefore, we could use separate .take() thingy for that.

# Decorators

For attributes, it's possible to make it way better.

@define
class M extends Record {
    @type( String ) s
    @type( Number ) x = 6
    @type( Model ) m
    @type( Model ) @has({ toJSON : false }) m5
    @attr x = 5
    @attr y = ''
    @attr z = false
    @attr({ type : Number }) g

    static attributes = {
        s : String,
        x : Number.value( 6 ),
        m : Model,
        m5 : Model.has.toJSON( false ),
        x : 5,
        y : '',
        z : false,
        g : Number
    }
}

- so, we can really do crazy shit here.
- for typescript, it's possible to get design-time type (!) in decorator.

- decorator returns native property immediately.
- it can update _attributes in the prototype immediately.
- @define can just grab the results.