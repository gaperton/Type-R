By default there is no comparator for a collection. If you define a comparator, it will be used to maintain the collection in sorted order. This means that as records are added, they are inserted at the correct index in `collection.models`.

Note that Type-R depends on the arity of your comparator function to determine between the two styles, so be careful if your comparator function is bound.

Collections with a comparator will not automatically re-sort if you later change record attributes, so you may wish to call sort after changing record attributes that would affect the order.

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
