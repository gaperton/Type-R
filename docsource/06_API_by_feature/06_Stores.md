Store is the Record's subclass which can be used as a root to search for id-references. Path in id-reference starting with `~` look for the nearest `Store` subclass traversing the aggregation tree upwards,
and if there are none, it takes the `Store.global`.

For all objects inside of the store's aggregation tree `~reference` will point to the members of this store.
If the lookup will fail, the next available store upper in aggregation tree will be used (as regular records stores can be nested), or the `Store.global` if there are no one.

### Store.global

The default store class. Is always the last store to lookup when resolving tilda-reference.

Use the default store for the _globally shared data only_. Each application page must have its local store.

```javascript
@define class MyStore extends Store {
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }
}

Store.global = new MyStore();

// Now the reference '~users` will point to users collection from the MyStore.
```

### new StoreConstructor()

Create the "store" record. 

