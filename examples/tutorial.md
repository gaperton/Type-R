# Tutorial

- Flat data structures
    - Defining the Model
    - Type checks and type coercion
    - Working with Collections
    - Change events and transactions
    - Serialization
- Complex data structures and aggregation
    - Defining nested data structures
    - Type checks and coercion
    - Serialization
    - Change events and transactions on object tree
- Shared data





`npm install type-r`

```javascript
import { define, Model } from 'type-r'
```

## Flat data structure

```javascript
@define
class Flat extends Model {
    static attributes = {
        num : 0,
        str : 'Hello!',
        bool : false,
        any : null
    }
}
```

Default values.

```javascript
const f = new Flat();
assert( f.num === 0 && f.str === 'Hello!' && f.bool === false && f.any === null );
```

Assignments.

```javascript
f.num += f.num;
f.str = "world";
```

Change events.

```javascript
f.on( 'change:num', () => f.str = f.num );
f.on( 'change:num change:any', () => f.bool = f.num && f.any );
f.on( 'change', () => console.log( `num: ${ f.num } str: ${ f.str } bool: ${ f.bool } any : ${ f.any }`) );
```

Automatic type coercion.

```javascript
f.num = "5";
f.str = 5;
f.bool = 5;
f.any = 5;

assert( f.num === 5 && f.str === '5' && f.bool === true && f.any === 5 );
```

Type specs

```javascript
@define
class Flat extends Model {
    static attributes = {
        num : Number,
        str : String.value( 'Hello!' ),
        bool : Boolean,
        any : null
    }
}
```