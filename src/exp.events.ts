
interface EventMap {
    [ events : string ] : Handler
}

type Handler = Function | string


class EventHandler {
    ctx : any
    callback : Function

    constructor( callback : Function | string, 
                 public context : any,
                 listener : Messenger ){
                     this.ctx = context || listener;
                     this.callback = typeof callback === 'string' ? listener[ callback ] : callback;
                 }
    
    filter( handlers : EventHandler[], )
}

interface EventsMap {
    [ name : string ] : EventHandler[] 
}

const eventSplitter = /\s+/;

function on( messenger : Messenger, names : string, eventHandler : EventHandler ) : void {
    this._events || (this._events = {});

    for( name of names.split( eventSplitter ) ){
        const events = this._events[name] || (this._events[name] = []);
        events.push( eventHandler );
    }
}

function listenTo( listener : Messenger, messenger : Messenger, names : string, eventHandler ) : void {
    const listeningTo = this._listeningTo || (this._listeningTo = {}),
          id = listener.cid || ( listener.cid = 'l' + _count++ );
        
    listeningTo[id] = listener;

    on( messenger, names, eventHandler );

}

class Messenger {
    // Outgoing events
    _events : { [ name : string ] : EventHandler[] }

    // Incoming events 
    _listeningTo : { [ cid : string ] : Messenger } 

    constructor( public cid : string ){
    }

    dispose(){
        this.stopListening();
    }

    on( events : EventMap, context? : any )
    on( events : string, handler : Function | string, context? : any )
    on( events : string | EventMap, handler : Function | any, context? : any ){
        if( typeof events === 'string' ){
            on( this, events, new EventHandler( handler, context, this ) );
        }
        else{
            for( const names in events ){
                on( this, names, new EventHandler( events[ names ], handler, this ) );
            }
        }
    }

    once( events : EventMap, context? : any )
    once( events : string, handler : Function | string, context? : any )
    once( events : string | EventMap, handler : Function | any, context? : any ){
        if( typeof events === 'string' ){
            on( this, events, new EventHandler( handler, context, this ) );
        }
        else{
            for( const names in events ){
                on( this, names, new EventHandler( events[ names ], handler, this ) );
            }
        }
    }

    off(name? : string, callback?, context?) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    }

    listenTo( messenger : Messenger, events : EventMap )
    listenTo( messenger : Messenger, events : string, handler : Handler )
    listenTo( messenger, events, handler?, context? : any ){
        if( typeof events === 'string' ){
            listenTo( this, messenger, events, new EventHandler( handler, context, this ) );
        }
        else{
            for( const names in events ){
                listenTo( this, messenger, names, new EventHandler( events[ names ], handler, this ) );
            }
        }
    }

    stopListening( ){

    }

    trigger( names, a?, b?, c? ) {
        const { _events } = this;
        if( !_events ) return this;
        const all = _events.all;

        for( const event of names.split( eventSplitter ) ){
             const handlers = _events[ event ];
             if( handlers ){
                switch( arguments.length ){
                    case 1 :
                        fireEvent0( handlers );
                        fireEvent1( all, event );
                        break;
                }

             }
      }

      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    }
}