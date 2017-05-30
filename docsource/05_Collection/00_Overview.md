Collections are ordered sets of records. You can bind "change" events to be notified when any record in the collection has been modified, listen for "add" and "remove" events, fetch the collection from the server, and use a full suite of Underscore.js methods.

Collection is implicitly defined for every record with a constructor accessible as `MyRecord.Collection`. In most cases, you
don't need to declare it manually.

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

# Collection definition

## Implicitly defined collections
### RecordConstructor.Collection

Every `Record` class has implicitly defined Collection, which can be referenced adding the `.Collection` to the record's constructor.

## Extending the Collection class

Collections can be defined explicitly extending the base `Collection` class. There are two ways to bind collection to the record.

### (record definition) `static` Collection = CollectionConstructor

Replaces implicitly defined collection with externally defined collection class.

### (colleciton definition) `static` model = RecordConstructor

Specify the record type inside of the collection's definition. This property is being set automatically for collection types referenced as `MyRecord.Collection`.

```javascript
@define class Library extends Record.Collection {
    static model = Book;
}
```

# Create and access the colleciton

### new Collection()

Create an empty collection.

### new Collection( models, options? ) 

When creating a Collection, you may choose to pass in the initial array of models. The collection's comparator may be included as an option. Passing `false` as the comparator option will prevent sorting. If you define an `initialize() ` function, it will be invoked when the collection is created. There are a couple of options that, if provided, are attached to the collection directly: model and comparator.
Pass `null` for `models` to create an empty Collection with options.

```javascript
var tabs = new TabSet([tab1, tab2, tab3]);
```

### collection.initialize( models?, options? )

Initialization function which is called at the end of the constructor.

### collection.get( id ) 
Get a record from a collection, specified by an `id`, a `cid`, or by passing in a record.

```javascript
const book = library.get(110);
```

### collection.at( index ) 

Get a record from a collection, specified by index. Useful if your collection is sorted, and if your collection isn't sorted, at will still retrieve records in insertion order. When passed a negative index, it will retrieve the record from the back of the collection.

### collection.length 
Like an array, a Collection maintains a length property, counting the number of models it contains.

### collection.models 

Raw access to the JavaScript array of models inside of the collection. Usually you'll want to use `get`, `at`, or the other methods to access model objects, but occasionally a direct reference to the array is desired.
