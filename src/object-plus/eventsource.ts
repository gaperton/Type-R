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
/** @hide */
export interface EventsDefinition {
    [ events : string ] : Function | string | boolean
}

/** @hide */
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
        for( let event of this.handlers ){
            on( source, event.name, event.callback, target );
        }
    }

    unsubscribe( target : {}, source : EventSource ){
        for( let event of this.handlers ){
            off( source, event.name, event.callback, target );
        }
    }
}

/** @hide */
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


/** @hide */
const _bubblingHandlers = {};

/** @hide */
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
                    const args = Array( arguments.length );
                    for( let i = 0; i < arguments.length; i++ ){
                        args[ i ] = arguments[ i ];
                    }

                    trigger( this, event, args );
            }
        }
    );
}

export interface HandlersByEvent {
    [ name : string ] : EventHandler[] 
}

export class EventHandler {
    constructor( public callback : Callback, public context : any ){}
}

interface Callback extends Function {
    _callback? : Function
}

export function on( source : EventSource, name : string, callback : Callback, context? : any ) : void {
    const _events = source._events || ( source._events = Object.create( null ) ),
          handlers = _events[ name ],
          handler = new EventHandler( callback, context );

    if( handlers )
        handlers.push( handler );
    else
        _events[ name ] = [ handler ];
}

export function once( source : EventSource, name : string, callback : Callback, context? : any ) : void {
    const once : Callback = function(){
        off( source, name, once );
        callback.apply(this, arguments);
    }

    once._callback = callback;
    on( source, name, once, context );
}

export function off( source : EventSource, name? : string, callback? : Callback, context? : any ) : void {
    const { _events } = source;
    if( _events ){
        if( callback || context ) {
            if( name ){
                _events[ name ] = removeHandlers( _events[ name ], callback, context );
            }
            else{
                const filteredEvents = Object.create( null );

                for( let name in _events ){
                    const queue = removeHandlers( _events[ name ], callback, context );
                    queue && ( filteredEvents[ name ] = queue );
                }

                source._events = filteredEvents;
            }
        }
        else if( name ){
            _events[ name ] = void 0;
        }
        else{
            source._events = void 0;
        }
    }
}

function removeHandlers( handlers : EventHandler[], callback : Callback, context : any ) : EventHandler[] {
    if( handlers ){
        const res = handlers.filter( ev => (
                (context && context !== ev.context) ||
                (callback && callback !== ev.callback && callback !== ev.callback._callback)
            )
        );
        
        return res.length ? res : void 0;
    }
}

export interface EventSource {
    _events : HandlersByEvent
}

const eventSplitter = /\s+/;

export function strings( api : ApiEntry, source : EventSource, events : string, a_callback : Callback | string, context ){
    const callback = typeof a_callback === 'string' ? context[ a_callback ] : a_callback;

    if( eventSplitter.test( events ) ){
        const names = events.split( eventSplitter );
        for( let name of names ) api( source, name, callback, context );
    }
    else api( source, events, callback, context );
}

export type ApiEntry = ( source : EventSource, event : string, callback : Callback, context? : any ) => void 

/*********************************
 * Event-triggering API 
 */
export function trigger( self : EventSource, name : string, args : any[] ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent( queue, args );
        if( all ) _fireEvent( all, [ name ].concat( args ) );
    }
}

/** @hide */
export function trigger0( self : EventSource, name : string ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent0( queue );
        if( all ) _fireEvent1( all, name );
    }
};

/** @hide */
export function trigger1( self : EventSource, name : string, a : any ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent1( queue, a );
        if( all ) _fireEvent2( all, name, a );
    }
};

/** @hide */
export function trigger2( self : EventSource, name : string, a, b ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        if( queue ) _fireEvent2( queue, a, b );
        if( all ) _fireEvent3( all, name, a, b );
    }
};

/** @hide */
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
/** @hide */
function _fireEvent0( events : EventHandler[] ) : void {
    for( let ev of events ) ev.callback.call( ev.context );
}

/** @hide */
function _fireEvent1( events : EventHandler[], a ) : void {
    for( let ev of events ) ev.callback.call( ev.context, a );
}

/** @hide */
function _fireEvent2( events : EventHandler[], a, b ) : void {
    for( let ev of events ) ev.callback.call( ev.context, a, b );
}

/** @hide */
function _fireEvent3( events : EventHandler[], a, b, c ) : void {
    for( let ev of events ) ev.callback.call( ev.context, a, b, c );
}

/** @hide */
function _fireEvent4( events : EventHandler[], a, b, c, d ) : void {
    for( let ev of events ) ev.callback.call( ev.context, a, b, c, d );
}

function _fireEvent( events : EventHandler[], a : any[] ) : void {
    for( let ev of events ) ev.callback.apply( ev.context, a );
}