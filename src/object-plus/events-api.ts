/**************************************************************
 * Low-level high-performance publish-subscrive events API.
 * Monomorphic, minimalistic, JIT optimized.
 * 
 * Implementation is 100% structurally compatible woth a subset of Backbone 1.2 Events.
 * 
 * Type-R solely depends on that API for managing events subscriptions.
 */

/** @private */
export const eventSplitter = /\s+/;

/** @private Main interface object must conform to in order to send events */
export interface EventSource {
    _events : EventsSubscription
}

/** @private Internal hash holding events subscription */
export interface EventsSubscription {
    all? : EventHandler[]
    [ eventName : string ] : EventHandler[]
}

/** @private Event handler data structure, with a shape expected by Backbone 1.2 Events */
export class EventHandler {
    constructor(
        public context,
        public ctx,
        public listening : any,
        public callback? : Callback
    ){}

    clone( callback ){
        const { context, listening } = this;
        if (listening) listening.count++;
        return new EventHandler( context, context || this.ctx, listening, callback );
    }
}

/** @private Callback structure, with a shape expected by Backbone 1.2 Events */
export interface Callback extends Function{
    _callback? : any
}

/*******************
 * Prebuilt events map, used for optimized bulk event subscriptions.
 * 
 * const events = new EventMap({
 *      'change' : true, // Resend this event from self as it is.
 *      'change:attr' : 'localTargetFunction',
 *      'executedInTargetContext' : function(){ ... }
 *      'executedInNativeContext' : '^props.handler' 
 * })
 */
/** @private */
export interface EventsDefinition {
    [ events : string ] : Function | string | boolean
}

/** @private */
export class EventMap {
    handlers : EventDescriptor[] = [];

    constructor( map? : EventsDefinition | EventMap ){
        if( map ){
            if( map instanceof EventMap ){
                this.handlers = map.handlers.slice();
            }
            else{
                map && this.addEventsMap( map );
            }
        }
    }

    merge( map : EventMap ){
        this.handlers = this.handlers.concat( map.handlers );
    }

    addEventsMap( map : EventsDefinition ){
        for( let names in map ){
            this.addEvent( names, map[ names ] )
        }
    }

    bubbleEvents( names : string ){
        for( let name of names.split( eventSplitter ) ){
            this.addEvent( name, getBubblingHandler( name ) );
        }
    }

    addEvent( names : string, callback : Function | string | boolean ){
        const { handlers } = this;   
        
        for( let name of names.split( eventSplitter ) ){
            handlers.push( new EventDescriptor( name, callback ) );
        }        
    }

    subscribe( target : {}, source : EventSource ){
        const  _events = source._events || ( source._events = {} );
        for( let event of this.handlers ){
            _on( _events, event.name, event.callback, target );
        }
    }

    unsubscribe( target : {}, source : EventSource ){
        const { _events } = source;
        if( _events ){
            for( let event of this.handlers ){
                _off( _events, event.name, event.callback, target );
            }
        }
    }
}

class EventDescriptor {
    callback : Function

    constructor(
        public name : string,
        callback : Function | string | boolean
    ){
        if( callback === true ){
            this.callback = getBubblingHandler( name );
        }
        else if( typeof callback === 'string' ){
            this.callback = 
                function localCallback(){
                    const handler = this[ callback ]; 
                    handler && handler.apply( this, arguments );
                };
        }
        else{
            this.callback = <Function>callback;
        }
    }
}

/****************************
 * Subscription API 
 */

/** @private */
export function on( self : EventSource, name : string, callback : Function, context? ){
    const _events = self._events || ( self._events = {} );
    _on( _events, name, callback, context );
}

/** @private */
export function off( self : EventSource, name : string, callback : Function, context : {} ){
    const { _events } = self;
    _events && _off( _events, name, callback, context );
}

/*********************************
 * Event-triggering API 
 */
/** @private */
export function trigger0( self : EventSource, name : string ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent0( queue );
        if( all ) _fireEvent1( all, name );
    }
};

/** @private */
export function trigger1( self : EventSource, name : string, a : any ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent1( queue, a );
        if( all ) _fireEvent2( all, name, a );
    }
};

/** @private */
export function trigger2( self : EventSource, name : string, a, b ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent2( queue, a, b );
        if( all ) _fireEvent3( all, name, a, b );
    }
};

/** @private */
export function trigger3( self : EventSource, name : string, a, b, c ) : void{
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent3( queue, a, b, c );
        if( all ) _fireEvent4( all, name, a, b, c );
    }
};

// Specialized functions with events triggering loops.
// JS JIT loves these small functions and code duplication.
function _fireEvent0( events : EventHandler[] ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx );
}

function _fireEvent1( events : EventHandler[], a ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx, a );
}

function _fireEvent2( events : EventHandler[], a, b ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx, a, b );
}

function _fireEvent3( events : EventHandler[], a, b, c ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx, a, b, c );
}

function _fireEvent4( events : EventHandler[], a, b, c, d ) : void {
    for( let ev of events )
        ev.callback.call( ev.ctx, a, b, c, d );
}

// Subscrive for the single event
function _on( _events : EventsSubscription, name : string, callback : Function, context : Object, ctx? : Object ){
    const events = _events[ name ],
          handler = new EventHandler( context, ctx || context, null, callback );

    if( events ){
        events.push( handler );
    }
    else{
        _events[ name ] = [ handler ];
    }
};

// Remove all events with a given name and context, or callback, if its provided. 
function _off( _events : EventsSubscription, name : string, callback : Function, context : {} ) {
    const events = _events[ name ];

    if( events ) {
        const retain = [];

        for ( let ev of events ) {
            if( ( callback && callback !== ev.callback ) || context !== ev.context ) {
                retain.push(ev);
            }
        }

        _events[ name ] = retain.length ? retain : void 0;
    }
};

const _bubblingHandlers = {};

function getBubblingHandler( event : string ){
    return _bubblingHandlers[ event ] || (
        _bubblingHandlers[ event ] = function( a, b, c ){
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
        }
    );
}