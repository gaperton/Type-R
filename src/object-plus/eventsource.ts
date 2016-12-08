import { once as _once } from './tools'

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
    [ name : string ] : EventHandler
}

export class EventHandler {
    constructor( public callback : Callback, public context : any, public next = null ){}
}

function listOff( _events : HandlersByEvent, name : string, callback : Callback, context : any ){
    const head = _events[ name ];

    let filteredHead, prev;

    for( let ev = head; ev; ev = ev.next ){
        // Element must be kept
        if( ( callback && callback !== ev.callback && callback !== ev.callback._callback ) ||
            ( context && context !== ev.context ) ){
            
            prev = ev;
            filteredHead || ( filteredHead = ev );
        }
        // Element must be skipped
        else{
            if( prev ) prev.next = ev.next;
        }
    }

    if( head !== filteredHead ) _events[ name ] = filteredHead;
}

function listSend( head : EventHandler, args ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.apply( ev.context, args );
}

function listSend0( head : EventHandler, ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.call( ev.context );
}

function listSend1( head : EventHandler, a ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.call( ev.context, a );
}

function listSend2( head : EventHandler, a, b ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.call( ev.context, a, b );
}

function listSend3( head : EventHandler, a, b, c ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.call( ev.context, a, b, c );
}

function listSend4( head : EventHandler, a, b, c, d ){
    for( let ev = head; ev; ev = ev.next ) ev.callback.call( ev.context, a, b, c, d );
}

interface Callback extends Function {
    _callback? : Function
}

export function on( source : EventSource, name : string, callback : Callback, context? : any ) : void {
    if( callback ){
        const _events = source._events || ( source._events = Object.create( null ) );
        _events[ name ] = new EventHandler( callback, context, _events[ name ] );
    }
}

export function once( source : EventSource, name : string, callback : Callback, context? : any ) : void {
    if( callback ){
        const once : Callback = _once( function(){
            off( source, name, once );
            callback.apply(this, arguments);
        });

        once._callback = callback;
        on( source, name, once, context );
    }
}

export function off( source : EventSource, name? : string, callback? : Callback, context? : any ) : void {
    const { _events } = source;
    if( _events ){
        if( callback || context ) {
            if( name ){
                listOff( _events, name, callback, context );
            }
            else{
                for( let name in _events ){
                    listOff( _events, name, callback, context );
                }
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

export interface EventSource {
    _events : HandlersByEvent
}

const eventSplitter = /\s+/;

export function strings( api : ApiEntry, source : EventSource, events : string, callback : Callback, context ){
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

        listSend( queue, args );
        listSend( all, [ name ].concat( args ) );
    }
}

/** @hide */
export function trigger0( self : EventSource, name : string ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        listSend0( queue );
        listSend1( all, name );
    }
};

/** @hide */
export function trigger1( self : EventSource, name : string, a : any ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        listSend1( queue, a );
        listSend2( all, name, a );
    }
};

/** @hide */
export function trigger2( self : EventSource, name : string, a, b ) : void {
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        listSend2( queue, a, b );
        listSend3( all, name, a, b );
    }
};

/** @hide */
export function trigger3( self : EventSource, name : string, a, b, c ) : void{
    const { _events } = self;
    if( _events ){
        const queue = _events[ name ],
            { all } = _events;

        listSend3( queue, a, b, c );
        listSend4( all, name, a, b, c );
    }
};
