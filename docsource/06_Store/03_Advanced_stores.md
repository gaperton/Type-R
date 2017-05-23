# Multiple stores
 
Now let's imagine the situation that we have a lot of authors and posts, and we can't afford to load everything upfront.
 So we want to utilize paging. Still, we have an intention to pack users in JSON separately from the posts.
  
We can do this using the same trick as we done for users and roles originally, no matter do we have default store or not.
Lets just add one more store for our task. For this case, we will create the model for every page with posts.
This model `id` will be the page id.

```javascript
const PostsPage = Store.extend({
    attributes : {
        posts : BlogPost.Collection,
        users : User.Collection
    }
});
```

Now, all `~users` references from `page.posts` will use local `page.users` collection. But `~roles` references from 
`page.users` will find no collection for roles, so what will happen? _They will fall back to the default store we have 
defined above, and take roles from there._

In nested types, you may have multiple stores at the same time, you can dynamically create them, and they plays together:

- Whenever closest parent lookup for the store fails, default store is taken.
- Stores can aggregate other stores.
- Whenever lookup for the resource in particular store fails...
    - parent store is taken, and procedure continues;
 
# Modeling UI state with relations

The fact that reference `path` is taken relative to model's `this` allows us to use local relations in scenarious wihout Stores, which are way simpler and more common than example discussed above. Most of these scenarious happens when you use NestedTypes not in data layer, but to model UI state. Which is very convinient due to _deep changes detection_ feature, and invaluable in sutuations when you need to preserve UI state on browser refresh.

> It's hard to write about UI patterns in general, because different frameworks has different assumptions on what is UI state. So, the case of React is covered in the last section, and React is actually the recommended way of writing applications with NestedTypes.

## List of items with selection

Suppose that we have a list of items in collection, which we need to display. And some items might be selected with a click.

It could be done with DOM manipulation, and we can rely on the DOM as the primary source of information about selection. Which is extrimely bad practice. In case of any UI framework the code will be much cleaner if we would keep information about selection (and other information which is required to render the widget) as a part of the separately managed UI _state_. And here the situation our models and relations comes to help.

First idea which comes to the mind is to add 'selected' attribute to the item's model. And again, it is bad idea no matter which framework you're using. In this case we would mix UI state with our data layer. Server and other part of our application have no interest in selection made in particular UI widget, so we need to keep it separate from the `items` collection.

Thus, we introduce collection of selected items, which is, obviously, the subset of items collection, and put it along with items we wanna render:

```javascript
const State = Model.extend({
    attributes : {
        items : Collection,
        selected : Collection.subsetOf( 'items' )
    }
})
```

Here, since master collection's path is taken relative to `this`, it will be `this.items`. And this spec gives reader quite precise information about the purpose of this `selected`.

Then we can just subscribe for the changes of this model and update our UI on every change. Thanks to `NestedTypes` deep changes detection feature, whenever we will receive items from the server or anything will be changed deep inside of the models for any reason, our UI will be in sync. In case of Backbone View, it will look like this:

```javascript
initialize : function( options ){
	this.model = new State( options );
	this.listenTo( this.model, 'change', this.render );
}
```

So, instead of DOM manipulation, now it's enough to add or remove corresponding item in `selected` collection in our click event handler. It has `toggle` method for that purpose, like `selected.toggle( modelOrId )`. And since `selected` collections knows which subset it is, it can easily handle `toggle` with model id taken from the DOM as an argument.

```javascript
onClick : function( e ){
	const id = $( e.target ).attr( 'model-id' );
	this.model.selected.toggle( id ); // will trigger state model change, which will trigger UI update
}
```


> If just one item may be selected at a time, it will obviously be `Model.from( 'items' )` instead of `Collection.subsetOf`.

## Adding persistence

Now let's suppose that we need to preserve our selection in local storage when browser is refreshed.

First idea is to take some Backbone plugin for working with `localStorage`, and try it on our model. As usual. Bad idea. This time - because it could be done trivially without plugins. Thanks to powerful `NestedTypes` serialization facilities, it's enough to convert our State model to JSON and save it as one piece.

Lets do something quick and dirty to illustrate an idea. First, we need to teach our model to save to and be loaded from local storage. We suspect it won't be the single case, so we create the base class for that.

```javascript
const LocalStorage = Model.extend({
	fetch(){
		if( this.id ){ // take model id as key...
			const json = localStorage.getItem( this.id );
			json && ( this.set( JSON.parse( json ), { parse: true }) );
		}
	},

	save( attrs ){
		attrs && this.set( attrs );
		this.id && localStorage.setItem( this.id, JSON.stringify( this ) );
	}
});
```

Great. When it comes to the `State` model, we probably don't want to save `items` to local storage, because they are received from the server. Just `selected`. And thanks to `subsetOf` metatype, it will be serialized as an array of model ids, and it's exactly what we want. So...

```javascript
const State = LocalStorage.extend({
    attributes : {
        id : 'My Very Specific Widget State Local Storage Key',
        items : Collection.has.toJSON( false ),
        selected : Collection.subsetOf( 'items' )
    }
})
```

Assuming that we will have just one instance of this widget on the screen, it's okay, so it would be enough to add something like this in widget's constructor:

```javascript
    this.model.fetch();
	window.onunload = () => this.model.save();
```

That's really quick and very dirty example (describen trick with local storage is really okay for the top level View only), but I think you got the general idea.

# For the React guys...

...this example would look a bit different. Because React handle state differently (and in much better way) than traditional MVC frameworks. And because we have [special support for React](https://github.com/Volicon/NestedReact) (you're also warmly welcomed to see our complete [React TodoMVC example](https://github.com/gaperton/todomvc-nestedreact/)).

Here `props` will be translated to `propTypes`, `state` will lead to creation of the NestedTypes model to manage state (as you see both have the common type annotation style), `Model` specify the base class for the state model, and `pureRender`... Well, it's pure render, which you've probably been told of as an impossible optimization for mutable data. :) So now you know it was not true.

In the context of our topic, you might wander what `^props.items` reference means. `^` is the shortcut for `getOwner()` call, thus this reference will be translated to `this.getOwner().props.items`, which literally means _the reference to the member of my component's `props`._ Model can make direct references to its parents too, yes. I wouldn't recommend using them in other context, though.

```javascript
const QuickAndDirty = React.createClass({
    props : {
        items : Collection
    },
    
    pureRender : true,
    
    Model : LocalStorage,
    state : {
        id : 'My Very Specific Widget State Local Storage Key',
        selected : Collection.subsetOf( '^props.items' )
    },
    
    componentWillMount(){
        this.state.fetch();
    },
    
    componentWillUnmount(){
        this.state.save();
    },
    
    ...
});
```
