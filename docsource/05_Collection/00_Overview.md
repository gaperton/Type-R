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

# Declarations

### `static` model = RecordConstructor

```javascript
@define
class Library extends Record.Collection {
    static model = Book;
}
```

If defined, you can pass raw attributes objects (and arrays) to add, create, and reset, and the attributes will be converted into a model of the proper type.

This property is being set automatically for collection types referenced as `MyRecord.Collection`. In the majority of cases you don't need to define it explicitly.

# Members

### constructor( models?, options? ) 

When creating a Collection, you may choose to pass in the initial array of models. The collection's comparator may be included as an option. Passing false as the comparator option will prevent sorting. If you define an initialize function, it will be invoked when the collection is created. There are a couple of options that, if provided, are attached to the collection directly: model and comparator.
Pass null for models to create an empty Collection with options.

```javascript
var tabs = new TabSet([tab1, tab2, tab3]);
```

### collection.add( models, options? )

Add a record (or an array of records) to the collection, firing an "add" event for each record, and an "update" event afterwards. If a record property is defined, you may also pass raw attributes objects, and have them be vivified as instances of the record. Returns the added (or preexisting, if duplicate) records. Pass {at: index} to splice the record into the collection at the specified index. If you're adding records to the collection that are already in the collection, they'll be ignored, unless you pass {merge: true}, in which case their attributes will be merged into the corresponding records, firing any appropriate "change" events.

    var ships = new Backbone.Collection;

    ships.on("add", function(ship) {
    alert("Ahoy " + ship.get("name") + "!");
    });

    ships.add([
    {name: "Flying Dutchman"},
    {name: "Black Pearl"}
    ]);

Note that adding the same record (a record with the same id) to a collection more than once 
is a no-op.

### collection.remove( records, options? ) 

Remove a record (or an array of records) from the collection, and return them. Each record can be a record instance, an id string or a JS object, any value acceptable as the id argument of collection.get. Fires a "remove" event for each record, and a single "update" event afterwards, unless {silent: true} is passed. The record's index before removal is available to listeners as options.index.

### collection.reset( records, options? )

Adding and removing records one at a time is all well and good, but sometimes you have so many records to change that you'd rather just update the collection in bulk. Use reset to replace a collection with a new list of records (or attribute hashes), triggering a single "reset" event on completion, and without triggering any add or remove events on any records. Returns the newly-set records.

Pass null for records to empty your Collection with options.

Here's an example using reset to bootstrap a collection during initial page load, in a Rails application:

    <script>
    var accounts = new Backbone.Collection;
    accounts.reset(<%= @accounts.to_json %>);
    </script>

Calling collection.reset() without passing any records as arguments will empty the entire collection.

### collection.set( records, options? )
 
The set method performs a "smart" update of the collection with the passed list of records. If a record in the list isn't yet in the collection it will be added; if the record is already in the collection its attributes will be merged; and if the collection contains any records that aren't present in the list, they'll be removed. All of the appropriate "add", "remove", and "change" events are fired as this happens. Returns the touched records in the collection. If you'd like to customize the behavior, you can disable it with options: {add: false}, {remove: false}, or {merge: false}.

```javascript
const vanHalen = new Man.Collection([ eddie, alex, stone, roth ]);

vanHalen.set([ eddie, alex, stone, hagar ]);

// Fires a "remove" event for roth, and an "add" event for "hagar".
// Updates any of stone, alex, and eddie's attributes that may have
// changed over the years.
```

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
