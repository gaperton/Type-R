#### node.set( values, options? )



#### node.transaction( fun : ( self : this ) => void, options : TransactionOptions = {} ) : void{


## Change events

There are different change events for different types of nodes in aggregation tree.

#### node.onChanges( handler, context? )

#### node.offChanges( handler?, context? )

#### node.listenToChanges( source, handler )

## Generic Events API

Aggregation tree node implements [Events API](../07_Events.md).

#### eventsSource.trigger(event, [*args]) 
#### eventSource.on(event, callback, [context])
#### eventSource.off([event], [callback], [context])
#### eventsSource.once(event, callback, [context]) 
#### eventsSource.listenTo(other, event, callback) 
#### eventsSource.stopListening([other], [event], [callback]) 
#### eventsSource.listenToOnce(other, event, callback) 