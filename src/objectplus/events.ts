import { once } from './tools.ts'
import { Class, mixins, define, extendable } from './mixins.ts'

/************
 * JIT-Optimized monomorphic functions to trigger single event 
 */
export function trigger0( self : Messenger, name : string ) : void {
    const { _events } = self;
    if( _events ){
        const { all } = _events;
        _fireEvent0( _events[ name ] );
        _fireEvent1( all, name );
    }
};

export function trigger1( self : Messenger, name : string, a : any ) : void {
    const { _events } = self;
    if( _events ){
        const { all } = _events;
        _fireEvent1( _events[ name ], a );
        _fireEvent2( all, name, a );
    }
};

export function trigger2( self : Messenger, name : string, a, b ) : void {
    const { _events } = self;
    if( _events ){
        const { all } = _events;
        _fireEvent2( _events[ name ], a, b );
        _fireEvent3( all, name, a, b );
    }
};

export function trigger3( self : Messenger, name : string, a, b, c ) : void{
    const { _events } = self;
    if( _events ){
        const { all } = _events;
        _fireEvent3( _events[ name ], a, b, c );
        _fireEvent4( all, name, a, b, c );
    }
};

// Backbone.Events
// ---------------

// A module that can be mixed in to *any object* in order to provide it with
// a custom event channel. You may bind a callback to an event with `on` or
// remove with `off`; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = {};
//     _.extend(object, Backbone.Events);
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//

// Regular expression used to split event strings.
var eventSplitter = /\s+/;

// Iterates over the standard `event, callback` (as well as the fancy multiple
// space-separated events `"change blur", callback` and jQuery-style event
// maps `{event: callback}`).
var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
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

function isEmpty( obj : {} ) : boolean {
    for( var i in obj ){
        return false;
    }

    return true;
}

let _idCount = 0;
function uniqueId(){
    return 'l' + _idCount++;
}

class ListeningTo {
    count : number = 0
    constructor( public obj, public objId, public id, public listeningTo ){}
}

interface ListeningToMap {
    [ id : string ] : ListeningTo
}

interface Listeners {
    [ id : string ] : Messenger
}

export interface EventHandlers {
    [ events : string ] : Function | string
}

/*************************
 * Messenger is extendable class with capabilities of sending and receiving messages.
 * This class itself can serve as both mixin and base class
 */

// Attach default cid prefix to the prototype.
@define({
    cidPrefix : 'l'
})
@extendable
export abstract class Messenger implements Class {
    bindAll : ( ...names : string [] ) => void

    _events : EventsMap = void 0;
    _listeners : Listeners = void 0;
    _listeningTo : ListeningToMap = void 0;
    cidPrefix : string
    cid : string

    static create : ( a : any, b? : any, c? : any ) => Messenger
    static define : ( a : any, b? : any ) => typeof Messenger
    static extend : ( a? : any, b? : any ) => typeof Messenger

    constructor( cid : string | number ){
        this.cid = this.cidPrefix + cid;
    }

    triggerEventFrom( source : Messenger, event : string ){
        this.listenTo( source, event, function( a, b, c ){
            switch( arguments.length ){
                // Forward call to monomorphic fast-path functions.
                case 0 : trigger0( this, event ); break;
                case 1 : trigger1( this, event, a ); break;
                case 2 : trigger2( this, event, a, b ); break;
                case 3 : trigger3( this, event, a, b, c ); break;
                default :
                    const args = [ event, a, b, c ];

                    for( let i = 3; i < arguments.length; i++ ){
                        args.push( arguments[ i ] );
                    }

                    this.trigger.apply( this, args );
            }
        });
    }

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on(name, callback, context) {
        return internalOn(this, name, callback, context);
    }
    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off(name? : string, callback? : Function, context? ) {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback,
                                new OffOptions(
                                    context,
                                    this._listeners )
                                );
        return this;
    }

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening( obj? : Messenger, name? : string, callback? : Function ) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;

        var ids = obj ? [obj.cid] : keys(listeningTo);

        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];

            // If listening doesn't exist, this object is not currently
            // listening to obj. Break out early.
            if (!listening) break;

            listening.obj.off(name, callback, this);
        }
        if (isEmpty(listeningTo)) this._listeningTo = void 0;

        return this;
    }

    // Inversion-of-control versions of `on`. Tell *this* object to listen to
    // an event in another object... keeping track of what it's listening to
    // for easier unbinding later.
    listenTo(obj : Messenger, name, callback? ) {
        if (!obj) return this;
        var id = obj.cid || (obj.cid = uniqueId());
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = listeningTo[id];

        // This object is not listening to any other events on `obj` yet.
        // Setup the necessary references to track the listening callbacks.
        if (!listening) {
            var thisId = this.cid || (this.cid = uniqueId());
            listening = listeningTo[id] = new ListeningTo( obj, id, thisId, listeningTo );
        }

        // Bind callbacks on obj, and keep track of them on listening.
        internalOn(obj, name, callback, this, listening);
        return this;
    }

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, its listener will be removed. If multiple events
    // are passed in using the space-separated syntax, the handler will fire
    // once for each event, not once for a combination of all events.
    once(name, callback, context) {
        // Map the event into a `{event: once}` object.
        var events = eventsApi(onceMap, {}, name, callback, this.off.bind( this ));
        return this.on(events, void 0, context);
    }

    // Inversion-of-control versions of `once`.
    listenToOnce(obj : Messenger, name, callback) {
        // Map the event into a `{event: once}` object.
        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind( this, obj ) );
        return this.listenTo(obj, events);
    }

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger(name : string, a?, b?, c? ) : this {
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

                if( _events ){
                    _fireEventAll( _events[ name ], allArgs.splice( 0, 1 ) );
                    _fireEventAll( _events.all, allArgs );
                }                      
        }

        return this;
    }

    dispose() : void {
        this.stopListening();
        this.off();
    }
}

const slice = Array.prototype.slice;

export const Events = Messenger.prototype;

// Guard the `listening` argument from the public API.
var internalOn = function(obj : Messenger, name, callback, context, listening? ) : Messenger {
    obj._events = eventsApi(onApi, obj._events || {}, name,
                            callback, new Handler( context, obj, listening));

    if (listening) {
        var listeners = obj._listeners || (obj._listeners = {});
        listeners[listening.id] = listening;
    }

    return obj;
};

interface Callback extends Function{
    _callback? : any
}

class Handler {
    constructor( public context, public ctx, public listening : ListeningTo, public callback? : Callback ){
    }

    clone( callback ){
        const { context, listening } = this;
        if (listening) listening.count++;
        return new Handler( context, context || this.ctx, listening, callback );
    }
}

interface EventsMap {
    all? : Handler[]
    [ name : string ] : Handler[]
}

// The reducing API that adds a callback to the `events` object.
var onApi = function(events : EventsMap, name : string, callback : Function, options) : EventsMap {
    if (callback) {
        var handlers = events[name],
            toAdd = [ options.clone( callback ) ];
            
        events[name] = handlers ? handlers.concat( toAdd ) : toAdd;
    }
    
    return events;
};

class OffOptions {
    constructor( public context, public listeners : Listeners ){}
}

function keys( o : any ) : string[]{
    return o ? Object.keys( o ) : [];
}

// The reducing API that removes a callback from the `events` object.
var offApi = function(events : EventsMap, name, callback, options : OffOptions ) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
        var ids = keys(listeners);
        for (; i < ids.length; i++) {
            listening = listeners[ids[i]];
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
        }
        return;
    }

    var names = name ? [name] : keys(events);
    for (; i < names.length; i++) {
        name = names[i];
        var handlers = events[name];

        // Bail out if there are no events stored.
        if (!handlers) break;

        // Replace events if there are any remaining.  Otherwise, clean up.
        var remaining = [];
        for (var j = 0; j < handlers.length; j++) {
            var handler = handlers[j];
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
    if (!isEmpty(events)) return events;
};


interface Once extends Function {
    _callback? : Function
}

// Reduces the event callbacks into a map of `{event: onceWrapper}`.
// `offer` unbinds the `onceWrapper` after it has been called.
var onceMap = function(map, name, callback, offer) {
    if (callback) {
        var _once : Once = map[name] = once(function() {
            offer(name, _once);
            callback.apply(this, arguments);
        });
        _once._callback = callback;
    }
    return map;
};

// Specialized functions with events triggering loops.
// JS JIT loves these small functions and code duplication.
function _fireEvent0( events : Handler[] ) : void {
    if( events )
        for( let ev of events )
            ev.callback.call( ev.ctx );
}

function _fireEvent1( events : Handler[], a ) : void {
    if( events )
        for( let ev of events )
            ev.callback.call( ev.ctx, a );
}

function _fireEvent2( events : Handler[], a, b ) : void {
    if( events )
        for( let ev of events )
            ev.callback.call( ev.ctx, a, b );
}

function _fireEvent3( events : Handler[], a, b, c ) : void {
    if( events )
        for( let ev of events )
            ev.callback.call( ev.ctx, a, b, c );
}

function _fireEvent4( events : Handler[], a, b, c, d ) : void {
    if( events )
        for( let ev of events )
            ev.callback.call( ev.ctx, a, b, c, d );
}

function _fireEventAll( events : Handler[], args : any[] ) : void {
    if( events )
        for( let ev of events )
            ev.callback.apply( ev.ctx, args );
}