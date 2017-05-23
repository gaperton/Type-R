# The problem

When you building complex data layer, sooner or later you will need to cross-reference objects by id. Lets consider
users and roles as an example. For the purpose of the example we assume (and in many real cases its true),
that users and models related to each other as many-to-many.

Two questions arise - how will we send these data in JSON, and how would we ideally want them to appear in our models layer. Lets start with JSON for the users. Obvious solution would be the one as follows:

```javascript
const users = [{
    "id" : 1,
    "login" : "Vini"
    "roles" : [ { "id" : 1, "name" : "Admin" }, { "id" : 2, "name" : "User" } ]
},
{
    "id" : 2,
    "login" : "Avraham"
    "roles" : [ { "id" : 1, "name" : "Admin" }, { "id" : 2, "name" : "User" } ]
}, ... ]
```

So, our user's model in this case will look like this:
 
```javascript
@define class Role extends Record {
    static attributes = {
        name : String    
    }
}

@define class Users extends Record {
    static attributes = {
        login : String,
        roles : Role.Collection
    }
}
```

Obvious problem is that we're transferring the same roles multiple times, which increase the traffic.
Less obvious problem is that when objects for `role 1` will be deserialized, they will actually become _different_ objects
in every user model. So, when one of them needs to be modified, it should be modified for every user.
In short, as relational DB developer would say, _these data are not normalized_.

So, the best thing we could do, is to normalize them, putting roles in separate collection. So, our 'users collection'
becomes 'users directory object'. 

```javascript
{
    "users" : [
        {
            "id" : 1,
            "login" : "Vini"
            "roles" : [ 1, 2 ]
        },
        {
            "id" : 2,inter
            "login" : "Avraham"
            "roles" : [ 1, 2 ]
        }, ...
    ],

    "roles" : [ { "id" : 1, "name" : "Admins" }, { "id" : 2, "name" : "Users" }, ... ]
}
```

Now JSON looks okay, and we face the second problem. How would we want it to appear in our data layer?

# Handling "to-many" relationship

I would say, it would be an ideal case if the user of the data layer _wouldn't notice_ this complexity at all. 
If it will look for us like full collection of roles, _and_ as nested collections of roles in every user model (but 
roles in this nested collection will be actually the references to shared objects in full collection of roles), it would
be just fine.

Fortunately, this is just the thing which NestedTypes allows you to do. It will require some changes to our model definition,
though:

```javascript
@define class Role  extends Record {
    static attributes = {
        name : String    
    }
}

@define class Users extends Record{
    static attributes = {
        login : String,
        roles : Role.Collection.subsetOf( '~roles' )
    }
}

@define class UsersDirectory extends Record{
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }
}
```

There are two new things here - `Role.Collection.subsetOf( '~roles' )` and `Store`. Lets understand what does it mean.

`CollectionType.subsetOf( path )` spec literally means that the type of an attribute is the given collection, which will
  consists of an elements from different collection with a given `path` relative to model's `this`. `~` is the shortcut 
  for `getStore()` method, so `~roles` path will be resolved to `this.getStore().roles`. `getStore()` method, in turn, 
  will locate the nearest store model traversing object ownership tree upwards, until it will find something which 
  extends `Store` base class.
    
_Speaking simply, `~roles` reference points to the `roles` attribute of the `Store` model, which is the closest parent 
of our model. This semantic is important as it allows us to have multiple store instances in the system at the same time_.    
  
Now, how this code works. `subsetOf` attributes are always serialized as an arrays of model ids. So, it will take
 array of roles ids from the JSON, and wait for the moment you will actually try to read it. And when you read 
 `user.roles` attribute for the first time, it will take master collection from the path you specified, 
 and resolve ids to real models.
 
_Speaking simply, `user.roles` will appear to you as if it would be the regular `Roles.Collection`. And it's the key 
point of design that you should notice nothing strange._ 

There are some differences in behaviour, due to the fact that `subsetOf` is treated as _relation_, not _aggregation_:

- `Collection.subsetOf` is considered as changed (and throws 'changes' event) only in case its elements are being added or removed.
    _No member models changes will trigger collection change, and parent model change._
- When `Collection.subsetOf` is deep cloned, it doesn't clone its elements.
- You can use model ids in the place of the models in `set` and `add` methods.
- As it was mentioned above, it's serialized to an array of ids.

# Handling cross-references

Okay. But what if you want _both_ user and role to reference each other? Yep, you can do it too using 
the special form of `extend` for _forward declaration_:

```javascript
// Make forward declaration for the User...
@predefine class User extends Record{}

@define class Role extends Record {
    static attributes = {
        name : String,
        users : User.Collection.subsetOf( '~users' )
    }
}

User.define({
    attributes : {
        login : String,
        roles : Role.Collection.subsetOf( '~roles' )
    }
});

@define class UsersDirectory = Store.extend({
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }
}
```

# to-one relationships and default store

Lets say, we have some content created by users. We have few authors, and it would probably be not so bad idea to 
reference author of this content in JSON by user `id`. However, we don't like an idea that all our collections 
would be bound to the same store as UserDirectory.

First obvious thing we could do to resolve this situation, is to create some global default `store` holding all 'dictionary' data which would be used 
to resolve such an ids across the system. Lets create such a store:  

```javascript
Nested.store = new UsersDirectory();
```

Once we have _default store_, it will be used in all cases when ownership store lookup fails. So, we can just define
our standalone BlogPost model.

But wait. BlogPost have just one author, not many. Thus, we don't need `Collection`, which is `subsetOf` something.
We need `Model`, taken `from` collection.

```javascript
const BlogPost = Model.extend({
    attributes : {
        author : Model.from( '~users' ),
        created : Date,
        title : '',
        body : ''
    }
});

let posts = new BlogPost.Collection();
posts.fetch();
```

Whenever we have default store populated with data, this `post.author` attribute will be indistinguishable from regular
 nested model attribute. But as with `subsetOf`, it's not an _aggregation_, but _relation_. So, there are some differences:
 
- `Model.from` is considered as changed (and throws 'change:attr' event) only in case its model is _replaced_.
    _No nested model changes will trigger attribute change, and parent model change._
- When `Model.from` is deep cloned, it doesn't clone its element.
- You can assign model `id` to this attribute.
- It's serialized as just model ids.

## Pitfalls
There is one problem, however, which you should be aware of. In case when role is being deleted from master collection, you will need to reconcile
  users collection, in order to remove extra users. So far, there are no built in mechanics for that, and an easiest
  way of doing this is just to fetch UsersDirectory from server again.
  
Or (if it really important) you can do something like in the example below.
  
```javascript
const UsersDirectory = Model.extend({
  attributes : { ... },
  
  initialize(){
     this.listenTo( this.roles, 'remove', role => {
        this.users.transaction( () => { // 'users' will trigger single 'changes' event for bulk operation
            this.users.each( user => user.roles.remove( role ) );
        });
     });
  }
});
```

Or ask us to add generic `reconcile` method. In older NestedTypes
 versions it was hard to do efficient enough to make generic implementation, and also its quite rare situation 
 when you really need client-side reconcilation; that's why it's not done yet. But now we can.
