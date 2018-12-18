# Collection

Collections are ordered sets of records. The collection is an array-like object exposing ES6 Array and BackboneJS Collection interface. It encapsulates JS Array of records (`collection.models`) and a hashmap for a fast O(1) access by the record `id` and `cid` (`collection.get( id )`).

Collactions are deeply observable. You can bind "changes" events to be notified when the collection has been modified, listen for the record "add",  "remove", and "change" events.

Every `Record` class has an implicitly defined `Collection` accessible as a static member of a record's constructor. In a most cases, you don't need to define the custom collection class.

```javascript
@define class Book extends Record {
    static attributes = {
        title : String
        author : Author
    }
}

// Implicitly defined collection.
const books = new Book.Collection();
```
```typescript
@define class Book extends Record {
    @auto title : string
    @auto author : Author

    // Tell TypeScript the proper type.
    static Collection : CollectionConstructor<Book>
}

const books = new Book.Collection();
```

You can define custom collection classes extending `Record.Collection` or any other collection class. It can either replace the default Collection type, or 

```javascript
// Define custom collection class.
@define class Library extends Record.Collection {
    doSomething(){ ... }
}

@define class Book extends Record {
    // Override the default collection.
    static Collection = Library;
}

// Define another custom collection class.
@define class OtherLibrary extends Record.Collection {
    // Specify the record so the collection will be able to restore itself from JSON.
    static model = Book; 
}
```
```typescript
// Define custom collection class.
@define class Library extends Collection<Book> {
    doSomething(){ ... }
}

@define class Book extends Record {
    // Override the default collection.
    static Collection = Library;
}

// Define another custom collection class.
@define class OtherLibrary extends Collection<Book> {
    // Specify the record so the collection will be able to restore itself from JSON.
    static model = Book;
}

// An alternative way of overriding the default collection class in TypeScript.
namespace Book {
    @define class Collection extends Collection<Book> {
        static model = Book;
    }
}
```

<aside class="notice">
The collection must know the type of its records to restore its elements from JSON properly. When the `model` is not specified, the collection can hold any Record subclass but it cannot deserialize itself.
</aside>

## Collection types

### `constructor` CollectionClass( records?, options? )

The most common collection type is an **aggregating serializable collection**. By default, collection aggregates its elements which are treated as an integral part of the collection (serialized, cloned, disposed, and validated recursively). An aggregation means the _single owner_, as the single object cannot be an integral part of two distinct things.

Create an aggregating serializable collection of records. The collection will take ownership on its records and will put an error in the console if it can't.

When creating a Collection, you may choose to pass in the initial array of records. The collection's comparator may be included as an option. Passing `false` as the comparator option will prevent sorting. If you define an `initialize() ` function, it will be invoked when the collection is created.

```typescript
@define class Role extends Record {
    static attributes = {
        name : String
    }
}

const roles = new Role.Collection( json, { parse : true } );
```
```typescript
@define class Role extends Record {
    // In typescript, you have to specify record's Collection type expicitly.
    static Collection : CollectionConstructor<Role>

    @auto name : string
}

@define class User extends Record {
    @auto name : string

    // Type-R cannot infer a Collection metatype from the TypeScript type automatically.
    // Full attribute type annotation is required.
    @type( Role.Collection ).as roles : Collection<User>
}
```

### `constructor` CollectionClass.Refs

Collection of record references is a **non-aggregating non-serializable collection**. `Collection.Refs` doesn't aggregate its elements, which means that containing records are not considered as an integral part of the enclosing collection and not being validated, cloned, disposed, and serialized recursively.

It is useful for a local non-persistent application state.

### `metatype` subsetOf(collectionRef, CollectionClass?)

The subset of other collections are **non-aggregating serializable collection**. Subset-of collection is serialized as an array of record ids and used to model many-to-many relationships. The collection object itself is recursively created and cloned, however, its records are not aggregated by the collection thus they are not recursively cloned, validated, or disposed. `CollectionClass` argument may be omitted unless you need the record's attribute to be an instance of the particular collection class.

<aside class="notice">
<b>subsetOf</b> collections are not deeply observable.
</aside>

<aside class="notice">
Since its an attribute <i>metatype</i> (combination of type and attribute metadata), it's not a real constructor and cannot be used with <b>new</b>. Use <b>collection.createSubset()</b> method to create subset-of collection instances.
</aside>

Must have a reference to the master collection which is used to resolve record ids to records. `collectionRef` may be:

- direct reference to a singleton collection.
- function, returning the reference to the collection.
- symbolic dot-separated path to the master collection resolved relative to the record's `this`. You may use `owner` and `store` macro in path:
    - `owner` is the reference to the record's owner. `owner.some.path` works as `() => this.getOwner().some.path`.
    - `store` is the reference to the closes store. `store.some.path` works as `() => this.getStore().some.path`.

```javascript
@define class Role extends Record {
    static attributes = {
        name : String,
        ...
    }
}

@define class User extends Record {
    static attributes = {
        name : String,
        roles : subsetOf( 'owner.roles', Role.Collection )
    }
}

@define class UsersDirectory extends Store {
    static attributes = {
        roles : Role.Collection,
        users : User.Collection // `~roles` references will be resolved against this.roles
    }
}
```
```typescript
@define class Role extends Record {
    static Collection : CollectionConstructor<Role>

    @auto name : string
    ...
}

@define class User extends Record {
    static Collection : CollectionConstructor<User>

    @auto name : string
    @subsetOf('store.roles').as roles : Collection<Role>
}

@define class UsersDirectory extends Store {
    @type(Role.Collection).as roles : Collection<Role>,
    @type(User.Collection).as users : Collection<User> // <- `store.roles` references will be resolved against this.roles
}
```

## Create and dispose

### new Collection(records?, options?)

Create an aggregating serializable collection of records. The collection will take ownership on its records and will put an error in the console if it can't.

When creating a Collection, you may choose to pass in the initial array of records. The collection's comparator may be included as an option. Passing `false` as the comparator option will prevent sorting. If you define an `initialize() ` function, it will be invoked when the collection is created.

```javascript
var tabs = new TabSet([tab1, tab2, tab3]);
```

### new Collection.Refs( records?, options? )

Create a non-aggregating non-serializable collection. The collection does not take ownership of its records. In all other aspects, it behaves like the regular collection.

### collection.createSubset( records?, options? )

Create the collection which is a subset of a source collection serializable as an array of record ids. Takes the same arguments as the collection's constructor.

The created collection is an instance of `subsetOf( sourceCollection, CollectionCtor )` attribute type (non-aggregating serializable collection). 

<aside class="notice">
Records in the collection must have an `id` attribute populated to work properly with subsets.
</aside>

### CollectionClass.from( models, options? )

Create `CollectionClass` from the array of models. Similar to direct collection creation, but supports additional option for strict data validation.
If `{ strict : true }` option is passed the validation will be performed and an exception will be thrown in case of an error.

Please note, that Type-R always performs type checks on assignments, convert types, and reject improper updates reporting it as an error. It won't, however, execute custom validation
rules on every update as they are evaluated lazily. `strict` option will invoke custom validators and will throw on every error or warning instead of reporting them and continue.

```javascript
// Validate the body of an incoming HTTP request.
// Throw an exception if validation fails.
const body = MyRequestBody.from( ctx.request.body, { parse : true, strict : true });
```

```typescript
// Validate the body of an incoming HTTP request.
// Throw an exception if validation fails.
const body = MyRequestBody.from( ctx.request.body, { parse : true, strict : true });
```

### `callback` collection.initialize( records?, options? )

Initialization function which is called at the end of the constructor.

### collection.clone()

Clone the collection. An aggregating collection will be recursively cloned, non-aggregated collections will be shallow cloned.

### collection.dispose()

Dispose of the collection. An aggregating collection will recursively dispose of its records.

## Read and iterate

### collection.get( id )
Get a record from a collection, specified by an `id`, a `cid`, or by passing in a record.

```javascript
const book = library.get(110);
```

### collection.at( index )

Get a record from a collection, specified by index. Useful if your collection is sorted, and if your collection isn't sorted, at will still retrieve records in insertion order. When passed a negative index, it will retrieve the record from the back of the collection.

## Array methods

A collection class is an array-like object implementing ES6 Array methods and properties.

### collection.models

Raw access to the JavaScript array of records inside of the collection. Usually, you'll want to use `get`, `at`, or the other methods to access record objects, but occasionally a direct reference to the array is desired.

### collection.length

Like an array, a Collection maintains a length property, counting the number of records it contains.

### collection.slice( begin, end )

Return a shallow copy of the `collection.models`, using the same options as native Array#slice.

### collection.indexOf( recordOrId : any ) : number

Return an index of the record in the collection, and -1 if there is no such a record in the collection.

Can take the record itself as an argument, `id`, or `cid` of the record.

### collection.forEach( iteratee : ( val : Record, index ) => void, context? )

Iterate through the elements of the collection.

<aside class="notice">Use <code>collection.updateEach( iteratee, index )</code> method to update records in a loop.</aside>

### collection.map( iteratee : ( val : Record, index ) => T, context? )

Map elements of the collection. Similar to `Array.map`.

### collection.filter( iteratee : Predicate, context? )

Return the filtered array of records matching the predicate.

The predicate is either the iteratee function returning boolean, or an object with attribute values used to match with record's attributes.

### collection.every( iteratee : Predicate, context? ) : boolean

Return `true` if all records match the predicate.

### collection.some( iteratee : Predicate, context? ) : boolean

Return `true` if at least one record matches the predicated.

### collection.push( record, options? )

Add a record at the end of a collection. Takes the same options as `add()`.

### collection.pop( options? )
Remove and return the last record from a collection. Takes the same options as `remove()`.

### collection.unshift( record, options? )

Add a record at the beginning of a collection. Takes the same options as `add()`.

### collection.shift( options? )
Remove and return the first record from a collection. Takes the same options as `remove()`.

## Update

Methods to update the collection. They accept common options:

- `{ sort : false }` - do not sort the collection.
- `{ parse : true }` - parse raw JSON (used to set collection with data from the server).

### collection.add( records, options? )

Add a record (or an array of records) to the collection. If this is the `Record.Collection`, you may also pass raw attributes objects, and have them be vivified as instances of the `Record`. Returns the added (or preexisting, if duplicate) records.

Pass `{at: index}` to splice the record into the collection at the specified index. If you're adding records to the collection that are already in the collection, they'll be ignored, unless you pass `{merge: true}`, in which case their attributes will be merged into the corresponding records.

1. Trigger the one event per record:
    - `add`(record, collection, options) for each record added.
    - `change`(record, options) for each record changed (if the `{merge: true}` option is passed).
3. Trigger the single event:
    - `update`(collection, options) if any records were added.
    - `sort`(collection, options) if an order of records was changed.
4. Trigger `changes` event in case if any changes were made to the collection and objects inside.

### collection.remove( records, options? )

Remove a record (or an array of records) from the collection, and return them. Each record can be a record instance, an id string or a JS object, any value acceptable as the id argument of collection.get.

1. Trigger `remove`(record, collection, options) for each record removed.
3. If any records were removed, trigger:
    - `update`(collection, options)
    - `changes`(collection, options).

### collection.set( records, options? )

The set method performs a "smart" update of the collection with the passed list of records. If a record in the list isn't yet in the collection it will be added; if the record is already in the collection its attributes will be merged; and if the collection contains any records that aren't present in the list, they'll be removed. All of the appropriate "add", "remove", and "change" events are fired as this happens. Returns the touched records in the collection. If you'd like to customize the behavior, you can disable it with options: `{remove: false}`, or `{merge: false}`.

#### Events
1. Trigger the one event per record:
    - `add`(record, collection, options) for each record added.
    - `remove`(record, collection, options) for each record removed.
    - `change`(record, options) for each record changed.
3. Trigger the single event:
    - `update`(collection, options) if any records were added.
    - `sort`(collection, options) if an order of records was changed.
4. Trigger `changes` event in case if any changes were made to the collection and objects inside.

```javascript
const vanHalen = new Man.Collection([ eddie, alex, stone, roth ]);

vanHalen.set([ eddie, alex, stone, hagar ]);

// Fires a "remove" event for roth, and an "add" event for hagar.
// Updates any of stone, alex, and eddie's attributes that may have
// changed over the years.
```

### collection.assignFrom( otherCollection )

Synchronize the state of the collection and its aggregation tree with other collection of the same type. Updates existing objects in place. Record in the collection is considered to be "existing" if it has the same `id`.

Equivalent to `collection.set( otherCollection.models, { merge : true } )` and triggers similar events on change.

### collection.reset( records, options? )

Replace the collection's content with the new records. More efficient than `collection.set`, but does not send record-level events.

Calling `collection.reset()` without passing any records as arguments will empty the entire collection.

1. Trigger event `reset`( collection, options ).
2. Trigger event `changes`( collection, options ).

### collection.sort( options? )

Force a collection to re-sort itself. You don't need to call this under normal circumstances, as a collection with a comparator will sort itself whenever a record is added. To disable sorting when adding a record, pass `{sort: false}` to add. Calling sort triggers a "sort" event on the collection.

By default, there is no comparator for a collection. If you define a comparator, it will be used to maintain the collection in sorted order. This means that as records are added, they are inserted at the correct index in `collection.models`.

Note that Type-R depends on the arity of your comparator function to determine between the two styles, so be careful if your comparator function is bound.

Collections with a comparator will not automatically re-sort if you later change record attributes, so you may wish to call sort after changing record attributes that would affect the order.

### `static` comparator = 'attrName'

Maintain the collection in sorted order by the given record's attribute.

### `static` comparator = x => number | string

Maintain the collection in sorted order according to the "sortBy" comparator function.

"sortBy" comparator functions take a record and return a numeric or string value by which the record should be ordered relative to others.

### `static` comparator = ( x, y ) => -1 | 0 | 1

Maintain the collection in sorted order according to the "sort" comparator function.

"sort" comparator functions take two records and return -1 if the first record should come before the second, 0 if they are of the same rank and 1 if the first record should come after.

Note how even though all of the chapters in this example are added backward, they come out in the proper order:

```javascript
@define class Chapter extends Record {
    static attributes = {
        page : Number,
        title : String
    }
}

var chapters = new Chapter.Collection();

chapters.comparator = 'page';

chapters.add({page: 9, title: "The End"});
chapters.add({page: 5, title: "The Middle"});
chapters.add({page: 1, title: "The Beginning"});

alert(chapters.map( x => x.title ));
```
