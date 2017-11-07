# Stores and id-references

`Store` is the special kind of record which serves as a root for ~references.

For all records inside of the store's aggregation tree `~attrName` will resolve to the attribute of the store class found with `record.getStore()` method. If there are no such an attribute in the store, the next available store upper in aggregation tree will be used (as regular records stores can be nested), or the default store if there are no one.

<aside class="notice">Stores in Type-R is _very different_ to stores in other framework. Pay attention.</aside>

## Definition

Store is the subclass of the Record. It's defined extending the `Store` abstract base class. It behaves as a regular record in most aspects.

### store._defaultStore

Reference to the master store used for lookups if the current store doesn't have the required attribute and there are no other store found upper in the ownership chain.

Defaults to the `Store.global`. May be explicitly defined to create custom store lookup chains across the ownership hierarchy.

### Store.global

The default singleton store class. Is always the last store to lookup when resolving ~reference.

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

## References to stores

### recordOrCollection.getStore()

Return the closest store. Used internally to resolve symbolic ~references to the stores.

Method looks for the `Store` subclass traversing the ownership chain of current aggregation tree upwards. If there are no store found this way, default Store from `Store.global` is returned.

### recordOrCollection.clone({ pinStore : true })

Make the cloned object to preserve the reference to its original store.

Cloned objects don't have an owner by default, thus they loose the reference to their store as no ownership chain can be traversed. `pinStore` option should be used in such a cases.

### `attrDef` : Record.from( '~collectionFromStore' )

Serializable reference to the record from the collection taken from the closest store found with `this.getStore()` call.

### `attrDef` : Collection.subsetOf( `~collectionFromStore` )

Serializable collection of references to the records from the collection taken from the closest store found with `this.getStore()` call.

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
        roles : Role.Collection.subsetOf( '~roles' )
    }
}

@define class UsersDirectory extends Store {
    static attributes = {
        roles : Role.Collection,
        users : User.Collection // `~roles` references will be resolved against this.roles
    }
}
```