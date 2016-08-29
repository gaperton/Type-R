import Mixins = require( './mixins' )
import tools = require( './tools' );
import _eventsApi = require( './events-api' );
import { EventMap, EventsDefinition } from './events-api'

const { mixins, define, extendable } = Mixins,
      { omit, once, isEmpty, keys } = tools,
      { EventHandler, trigger0, trigger1, trigger2, trigger3 } = _eventsApi;

// Regular expression used to split event strings.
const eventSplitter = /\s+/;

let _idCount = 0;

function uniqueId() : string {
    return 'l' + _idCount++;
}

export { EventMap, EventsDefinition }

export interface MessengerDefinition extends Mixins.ClassDefinition {
    _localEvents? : EventMap
    localEvents? : EventsDefinition
}

/*************************
 * Messenger is mixable class with capabilities of sending and receiving synchronous events.
 * This class itself can serve as both mixin and base class.
 */
@extendable
export abstract class Messenger implements Mixins.Mixable {
    // Define extendable mixin static properties.
    static create : ( a : any, b? : any, c? : any ) => Messenger
    static mixins : ( ...mixins : ( Mixins.Constructor<any> | {} )[] ) => Mixins.MixableConstructor< Messenger >
    static mixinRules : ( mixinRules : Mixins.MixinRules ) => Mixins.MixableConstructor< Messenger >
    static mixTo : ( ...args : Mixins.Constructor<any>[] ) => Mixins.MixableConstructor< Messenger >
    static extend : (spec? : MessengerDefinition, statics? : {} ) => Mixins.MixableConstructor< Messenger >
    static predefine : () => Mixins.MixableConstructor< Messenger >

    /** @hidden */ 
    _events : _eventsApi.EventsSubscription = void 0;

    /** @hidden */ 
    _listeners : Listeners = void 0

    /** @hidden */ 
    _listeningTo : ListeningToMap = void 0

    /** Unique client-only id. */
    cid : string

    // Prototype-only property to manage automatic local events subscription.
    /** @hidden */ 
    _localEvents : _eventsApi.EventMap

    /** @private */
    static define( protoProps? : MessengerDefinition , staticProps? ) : typeof Messenger {
        const spec : MessengerDefinition = omit( protoProps || {}, 'localEvents' );

        if( protoProps ){
            const { localEvents, _localEvents } = protoProps;
            if( localEvents || _localEvents ){
                const eventsMap = new EventMap( this.prototype._localEvents );
                localEvents && eventsMap.addEventsMap( localEvents );
                _localEvents && eventsMap.merge( _localEvents );
                spec._localEvents = eventsMap;
            }
        }

        return Mixins.Mixable.define.call( this, spec, staticProps );
    }

    /** @hidden */ 
    constructor(){
        this.cid = uniqueId();
        this.initialize.apply( this, arguments );
    }

    /** Method is called at the end of the constructor */
    initialize() : void {}
    
    /** Bind an event to a `callback` function. Passing `"all"` will bind
     *  the callback to all events fired.
     */
    on(name, callback, context) : this  {
        return <this>internalOn(this, name, callback, context);
    }

    /** Remove one or many callbacks. If `context` is null, removes all
     * callbacks with that function. If `callback` is null, removes all
     * callbacks for the event. If `name` is null, removes all bound
     * callbacks for all events.
     */
    off(name? : string, callback? : Function, context? )  : this {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback,
                                new OffOptions(
                                    context,
                                    this._listeners )
                                );
        return this;
    }

    /** Tell this object to stop listening to either specific events ... or
     * to every object it's currently listening to.
     */ 
    stopListening( obj? : Messenger, name? : string, callback? : Function ) : this {
        const listeningTo = this._listeningTo;
        if (!listeningTo) return this;

        const ids = obj ? [obj.cid] : keys(listeningTo);

        for (let i = 0; i < ids.length; i++) {
            const listening = listeningTo[ids[i]];

            // If listening doesn't exist, this object is not currently
            // listening to obj. Break out early.
            if (!listening) break;

            listening.obj.off(name, callback, this);
        }
        if (isEmpty(listeningTo)) this._listeningTo = void 0;

        return this;
    }

    /** Inversion-of-control versions of `on`. Tell *this* object to listen to
     * an event in another object... keeping track of what it's listening to
     * for easier unbinding later.
     */ 
    listenTo(obj : Messenger, name, callback? ) : this {
        if( !obj ) return this;
        
        const id = obj.cid || (obj.cid = uniqueId()),
              listeningTo = this._listeningTo || (this._listeningTo = {});

        let listening = listeningTo[id];

        // This object is not listening to any other events on `obj` yet.
        // Setup the necessary references to track the listening callbacks.
        if (!listening) {
            const thisId = this.cid || (this.cid = uniqueId());
            listening = listeningTo[id] = new ListeningTo( obj, id, thisId, listeningTo );
        }

        // Bind callbacks on obj, and keep track of them on listening.
        internalOn( obj, name, callback, this, listening );
        return this;
    }

    /** Bind an event to only be triggered a single time. After the first time
     * the callback is invoked, its listener will be removed. If multiple events
     * are passed in using the space-separated syntax, the handler will fire
     * once for each event, not once for a combination of all events.
     */ 
    once(name, callback, context)  : this {
        // Map the event into a `{event: once}` object.
        const events = eventsApi(onceMap, {}, name, callback, this.off.bind( this ));
        return this.on(events, void 0, context);
    }

    /** Inversion-of-control versions of `once`.*/
    listenToOnce(obj : Messenger, name, callback)  : this {
        // Map the event into a `{event: once}` object.
        const events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind( this, obj ) );
        return this.listenTo(obj, events);
    }

    /** Trigger one or many events, firing all bound callbacks. Callbacks are
     * passed the same arguments as `trigger` is, apart from the event name
     * (unless you're listening on `"all"`, which will cause your callback to
     * receive the true name of the event as the first argument).
     */ 
    trigger(name : string, a?, b?, c? ) : this {
        if( !this._events ) return this;

        switch( arguments.length ){
            // Forward call to monomorphic fast-path functions.
            case 1 : trigger0( this, name ); break;
            case 2 : trigger1( this, name, a ); break;
            case 3 : trigger2( this, name, a, b ); break;
            case 4 : trigger3( this, name, a, b, c ); break;
            
            // Trigger event with more than 3 arguments.
            default :
                // Passing arguments around killing performance. Convert it to array.
                const allArgs = Array( arguments.length );
                
                for( let i = 0; i < allArgs.length; i++ ){
                    allArgs[ i ] = arguments[ i ];
                }

                // Send events.
                const { _events } = this;
                let queue = _events[ name ];

                if( queue ) _fireEventAll( queue, allArgs.splice( 0, 1 ) );
                if( queue = _events.all ) _fireEventAll( queue, allArgs );                      
        }

        return this;
    }

    /**
     * Destructor. Stops messenger from listening to all objects,
     * and stop others from listening to the messenger. 
     */
    dispose() : void {
        this.stopListening();
        this.off();
    }
}

/** @hidden */
const slice = Array.prototype.slice;

/**
 * Backbone 1.2 API conformant Events mixin.
 */
export const Events : Messenger = <Messenger> omit( Messenger.prototype, 'constructor', 'initialize' );

// Iterates over the standard `event, callback` (as well as the fancy multiple
// space-separated events `"change blur", callback` and jQuery-style event
// maps `{event: callback}`).
/** @hidden */
function eventsApi(iteratee, events, name, callback, opts) {
    let i = 0, names;
    if (name && typeof name === 'object') {
        // Handle event maps.
        if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
        for (names = keys(name); i < names.length ; i++) {
            events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
        }
    } else if (name && eventSplitter.test(name)) {
        // Handle space separated event names by delegating them individually.
        for (names = name.split(eventSplitter); i < names.length; i++) {
            events = iteratee(events, names[i], callback, opts);
        }
    } else {
        // Finally, standard events.
        events = iteratee(events, name, callback, opts);
    }
    return events;
};

/** @hidden */
class ListeningTo {
    count : number = 0
    constructor( public obj, public objId, public id, public listeningTo ){}
}

/** @hidden */
export interface ListeningToMap {
    [ id : string ] : ListeningTo
}

/** @hidden */
export interface Listeners {
    [ id : string ] : Messenger
}

// Guard the `listening` argument from the public API.
/** @hidden */
function internalOn(obj : Messenger, name, callback, context, listening? ) : Messenger {
    obj._events = eventsApi(onApi, obj._events || {}, name,
                            callback, new EventHandler( context, obj, listening));

    if (listening) {
        const listeners = obj._listeners || (obj._listeners = {});
        listeners[listening.id] = listening;
    }

    return obj;
};

// The reducing API that adds a callback to the `events` object.
/** @hidden */
function onApi(events : _eventsApi.EventsSubscription, name : string, callback : Function, options) : _eventsApi.EventsSubscription {
    if (callback) {
        const handlers = events[name],
              toAdd = [ options.clone( callback ) ];
            
        events[name] = handlers ? handlers.concat( toAdd ) : toAdd;
    }
    
    return events;
};

/** @hidden */
class OffOptions {
    constructor( public context, public listeners : Listeners ){}
}

// The reducing API that removes a callback from the `events` object.
/** @hidden */
function offApi(events : _eventsApi.EventsSubscription, name, callback, options : OffOptions ) {
    if (!events) return;

    let i = 0, listening;
    const context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
        const ids = keys(listeners);
        for (; i < ids.length; i++) {
            listening = listeners[ids[i]];
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
        }
        return {};
    }

    const names = name ? [name] : keys(events);
    for (; i < names.length; i++) {
        name = names[i];
        const handlers = events[name];

        // Bail out if there are no events stored.
        if (!handlers) break;

        // Replace events if there are any remaining.  Otherwise, clean up.
        const remaining = [];
        for (let j = 0; j < handlers.length; j++) {
            const handler = handlers[j];
            if (
                callback && callback !== handler.callback &&
                callback !== handler.callback._callback ||
                context && context !== handler.context
            ) {
                remaining.push(handler);
            } else {
                listening = handler.listening;
                if (listening && --listening.count === 0) {
                    delete listeners[listening.id];
                    delete listening.listeningTo[listening.objId];
                }
            }
        }

        // Update tail event if the list has any events.  Otherwise, clean up.
        if (remaining.length) {
            events[name] = remaining;
        } else {
            delete events[name];
        }
    }
    return events;
};

// Reduces the event callbacks into a map of `{event: onceWrapper}`.
// `offer` unbinds the `onceWrapper` after it has been called.
/** @hidden */
function onceMap(map, name, callback, offer) {
    if (callback) {
        const _once : _eventsApi.Callback = map[name] = once(function() {
            offer(name, _once);
            callback.apply(this, arguments);
        });
        _once._callback = callback;
    }
    return map;
};

/** @hidden */
function _fireEventAll( events : _eventsApi.EventHandler[], a ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx, a );
}