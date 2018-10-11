import { Messenger } from './events'
import { define } from './mixins';

export type LogLevel = 'error' | 'warn' | 'debug' | 'info' | 'log';
export type LoggerEventHandler = ( topic : string, msg : string, props : object )  => void;

export const isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production',
    logEvents : LogLevel[] =  isProduction ?
        [ 'error', 'info' ] :
        [ 'error', 'warn', 'debug', 'info', 'log' ];

@define
export class Logger extends Messenger {
    constructor(){
        super();

        if( typeof console !== 'undefined' ) {
            for( let event of logEvents ){
                this.on( event, ( topic, msg, props ) => {
                    const args = [ `[${topic}] ${msg}` ];

                    for( let name in props ){
                        args.push( `\n\t${name}:`, toString( props[ name ] ) );
                    }
            
                    console[ event ].apply( console, args );
                });
            }
        }
    }

    trigger : ( level : LogLevel, topic : string, message : string, props? : object ) => this;
    off : ( event? : LogLevel ) => this;
    on : ( handlers : { [ name in LogLevel ] : LoggerEventHandler } | LogLevel, handler? : LoggerEventHandler ) => this
}

/**
 * Convert objects to the plain text friendly format.
 * primitives as in JSON.
 */
let toString = typeof window === 'undefined' ? 
    something => {
        if( something && typeof something === 'object' ){
            const { __inner_state__ } = something,
                value = __inner_state__ || something,
                isArray = Array.isArray( value );

            const body = isArray ? `[ length = ${ value.length } ]` : `{ ${ Object.keys( value ).join( ', ' )} }`;

            return something.constructor.name + ' ' + body;
        }

        return JSON.stringify( something );
    }
    : x => x;

export const logger = new Logger();
export const log : typeof logger.trigger = logger.trigger.bind( logger );