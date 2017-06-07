# Collection

Collections are ordered sets of records. You can bind "changes" events to be notified when the collection has been modified, listen for the record "add",  "remove", and "change" events, and use a full suite of iteration methods.

```javascript
// Implicitly defined collection.
const books = new Book.Collection();

@define
class ComicsShelve extends Book.Collection {
    static itemEvents = {
        // List of records's events we want to be triggered on the collection
        'change:inMyReadingList' : true,
        'customEvent' : true
    }
}

@define
class Comics extends Book {
    // Use custom collection instead of the implicitly created one
    static Collection = ComicsShelve;

    // Extend record's attributes
    static attributes = {
        artist : Author
    }
}
```

## Definition

### RecordClass.Collection

Default collection constructor for the given Record class.

Collection is implicitly defined for every record with a constructor accessible as `MyRecord.Collection`. In most cases, you don't need to declare it manually.

### CollectionClass.Refs

Non-aggregating collection constructor.

### `static` model = RecordConstructor

Specify the record type inside of the collection's definition. This property is being set automatically for collection types referenced as `MyRecord.Collection`.

```javascript
@define class Library extends Record.Collection {
    static model = Book;
}
```

## Create and dispose

### new Collection( records?, options? )

Create an aggregating serializable collection of records. The collection will take an ownership on its records and will put an error in the console if it can't.

When creating a Collection, you may choose to pass in the initial array of records. The collection's comparator may be included as an option. Passing `false` as the comparator option will prevent sorting. If you define an `initialize() ` function, it will be invoked when the collection is created.

```javascript
var tabs = new TabSet([tab1, tab2, tab3]);
```

### new Collection.Refs( records?, options? )

Create a non-aggregating non-serializable collection. The collection does not take ownership in its records. In all other aspects it behaves as the regular collection.

### collection.createSubset( records?, options? )

Create a non-aggregating serializable collection which is the subset of the given collection. Takes the same arguments as the collection's constructor.

<aside class="notice">Records in the collection must have an `id` attribute populated to work properly with subsets.</aside>

### `callback` collection.initialize( records?, options? )

Initialization function which is called at the end of the constructor.

### collection.clone()

Clone the collection. Aggregating collection will be recursively cloned, non-aggregated collections will be shallow cloned.

### collection.dispose()

Dispose the collection. Aggregating collection will recursively dispose its records.

## Read and iterate

### collection.get( id )
Get a record from a collection, specified by an `id`, a `cid`, or by passing in a record.

```javascript
const book = library.get(110);
```

### collection.at( index )

Get a record from a collection, specified by index. Useful if your collection is sorted, and if your collection isn't sorted, at will still retrieve records in insertion order. When passed a negative index, it will retrieve the record from the back of the collection.

### collection.length
Like an array, a Collection maintains a length property, counting the number of records it contains.

### collection.models

Raw access to the JavaScript array of records inside of the collection. Usually you'll want to use `get`, `at`, or the other methods to access record objects, but occasionally a direct reference to the array is desired.

### collection.slice( begin, end )

Return a shallow copy of the `collection.models`, using the same options as native Array#slice.

### collection.indexOf( recordOrId : any ) : number

Return an index of the record in the collection, and -1 if there are no such a record in the collection.

Can take the record itself as an argument, `id`, or `cid` of the record.

### collection.forEach( iteratee : ( val : Record, index ) => void, context? )

Same as `collection.each()`.

### collection.each( iteratee : ( val : Record, index ) => void, context? )

Iterate through the elements of the collection. Similar to `Array.forEach`.

<aside class="notice">Use <code>collection.updateEach( iteratee, index )</code> method to update records in a loop.</aside>

### collection.map( iteratee : ( val : Record, index ) => T, context? )

Map elements of the collection. Similar to `Array.map`, but `undefined` values returned by iteratee are filtered out.

Thus, `collection.map` can be used to map and filter elements in a single pass.

### collection.filter( iteratee : Predicate, context? )

Return filtered array of records matching the predicate.

Predicate is either the iteratee function returning boolean, or an object with attribute values used to match with record's attributes.

### collection.every( iteratee : Predicate, context? ) : boolean

Return `true` if all records match the predicate.

### collection.some( iteratee : Predicate, context? ) : boolean

Return `true` if at least one record match the predicated.

By default there is no comparator for a collection. If you define a comparator, it will be used to maintain the collection in sorted order. This means that as records are added, they are inserted at the correct index in `collection.models`.

Note that Type-R depends on the arity of your comparator function to determine between the two styles, so be careful if your comparator function is bound.

Collections with a comparator will not automatically re-sort if you later change record attributes, so you may wish to call sort after changing record attributes that would affect the order.

## Update

Methods to update the collection. They accept common options:

- `sort : false` - do not sort the collection.
- `parse : true` - parse raw JSON (used to set collection with a data from the server).

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

### collection.transaction( fun )

Execute the sequence of updates in `fun` function in the scope of the transaction.

All collection updates occurs in the scope of transactions. Transaction is the sequence of changes which results in a single `changes` event.

Transaction can be opened either manually or implicitly with calling any of collection update methods.
Any additional changes made to the collection or its items in event handlers will be executed in the scope of the original transaction, and won't trigger an additional `changes` events.

### collection.updateEach( iteratee : ( val : Record, index ) => void, context? )

Similar to the `collection.each`, but wraps an iteration in a transaction. The single `changes` event will be emitted for the group of changes to the records made in `updateEach`.

### collection.push( record, options? )

Add a record at the end of a collection. Takes the same options as add.

### collection.pop( options? )
Remove and return the last record from a collection. Takes the same options as remove.

### collection.unshift( record, options? )

Add a record at the beginning of a collection. Takes the same options as add.

### collection.shift( options? )
Remove and return the first record from a collection. Takes the same options as remove.

## Change events

Object tree formed by nested records is deeply observable by default; changes in every item trigger change events for the collection and all parent elements in sequence.

Collection triggers following events on change:

- `change` *( record, options )* for every changed record.
- `add` *( record, collection, options )* for every added record.
- `remove` *( record, collection, options )* for every removed record.
- `update` *( collection, options )* when any records were added or removed.
- `sort` *( collection, options )* when any records changed their order.
- `reset` *( collection, options )* if `collection.reset()` was used to update the collection.
- `changes` *( collection, options )* in case of any changes.

### Events mixin methods (7)

Collection implements [Events](#events-mixin) mixin.

### `static` itemEvents = { eventName : `handler`, ... }

Subscribe for events from records. The `hander` is either the collection's method name, the handler function, or `true`.

When `true` is passed as a handler, the corresponding event will be triggered on the collection.

### `event` "changes" (collection, options)

When collection has changed. Single event triggered when the collection has been changed.

### `event` "reset" (collection, options)

When the collection's entire contents have been reset (`reset()` method was called).

### `event` "update" (collection, options)

Single event triggered after any number of records have been added or removed from a collection.

### `event` "sort" (collection, options)

When the collection has been re-sorted.

### `event` "add" (record, collection, options)

When a record is added to a collection.

### `event` "remove" (record, collection, options)

When a record is removed from a collection.

### `event` "change" (record, options)

When a record inside of the collection is changed.

## Sorting

### `static` comparator = 'attrName'

Maintain the collection in sorted order by the given record's attribute.

### `static` comparator = x => number | string

"sortBy" comparator functions take a record and return a numeric or string value by which the record should be ordered relative to others.

### `static` comparator = ( x, y ) => -1 | 0 | 1

"sort" comparator functions take two records, and return -1 if the first record should come before the second, 0 if they are of the same rank and 1 if the first record should come after.

Note how even though all of the chapters in this example are added backwards, they come out in the proper order:

```javascript
@define class Chapter extends Record {
    static attributes = {
        page : Number,
        title : String
    }
}

var chapters = new Chapter.Collection();

chapters.comparator = 'page';

chapters.add(new Chapter({page: 9, title: "The End"}));
chapters.add(new Chapter({page: 5, title: "The Middle"}));
chapters.add(new Chapter({page: 1, title: "The Beginning"}));

alert(chapters.map( x => x.title ));
```

### collection.sort( options? )

Force a collection to re-sort itself. You don't need to call this under normal circumstances, as a collection with a comparator will sort itself whenever a record is added. To disable sorting when adding a record, pass `{sort: false}` to add. Calling sort triggers a "sort" event on the collection.

## Serialization

## Validation

