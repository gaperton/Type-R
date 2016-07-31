/**
 * Simple overridable logging stubs, writing to `console` by default. Log levels:
 * Node.js users might want to redirect logging somewhere.
 * 
 * - 0 - errors only.
 * - 1 - errors and warnings.
 * - 2 - errors, warnings, and some (important) information.
 * - 3 - Everything, including debugging and troubleshooting logging.
 */
export class Log {
    level : number
    stops : LogOptions = {}
    throws : LogOptions = {}
    counts : { error : number, warn : number, info : number, debug : number }
    logger : Logger

    doLogging( type, args : any[] ){
        const { logger } = this,
              logMethod = logger && logger[ type ];

        if( logMethod ) logMethod.apply( logger, args );

        if( this.stops[ type ] )  debugger;
        if( this.throws[ type ] ) throw new Error( `[${ type }] ${ args[ 0 ] }` );

        this.counts[ type ]++;
    }

    reset(){
        this.level = 2;
        this.counts = { error : 0, warn : 0, info : 0, debug : 0 };
        this.stops = {};
        return this;
    }

    developer( trueDeveloper? : boolean ){
        this.level = 3;
        this.stops = { error : true, warn : Boolean( trueDeveloper ) };
        return this;
    }

    constructor(){
        this.logger = typeof console !== 'undefined' ? console : null;
        this.reset();
    }

    error( ...args : any[] ) : void {
        if( this.level > 0 ) this.doLogging( 'error', args );
    }

    warn( ...args : any[] ) : void {
        if( this.level > 1 ) this.doLogging( 'warn', args );
    }

    info( ...args : any[] ){
        if( this.level > 2 ) this.doLogging( 'info', args );
    }

    debug( ...args : any[] ){
        if( this.level > 3 ) this.doLogging( 'debug', args );
    }

    toString() : string {
        return (`
Object.log - Object+ Logging and Debugging Utility
--------------------------------------------------
Object.log.counts: Number of logged events by type
    { errors : ${ this.counts.error }, warns : ${ this.counts.warn }, info : ${ this.counts.info }, debug : ${ this.counts.debug } }

Object.log.level ( ${ this.level } ): Ignore events which are above specified level 
    - 0 - logging is off;
    - 1 - Object.log.error(...) only;
    - 2 - .error() and .warn();
    - 3 - .error(), .warn(), and .info();
    - 4 - all of above plus .debug().

Object.log.stops: Stops in debugger for some certain event types
     { error : ${ this.stops.error || false }, warn  : ${ this.stops.warn || false }, info  : ${ this.stops.info || false }, debug : ${ this.stops.debug || false } } 

Object.log.throws: Throws expection on some certain event types
     { error : ${ this.throws.error || false }, warn  : ${ this.throws.warn || false }, info  : ${ this.throws.info || false }, debug : ${ this.throws.debug || false } }
`);
    }
}

export interface Logger {
    error( ...args : any[] ) : void
    warn( ...args : any[] ) : void
    info( ...args : any[] ) : void
    debug( ...args : any[] ) : void
}

export interface LogOptions {
    error? : boolean
    warn? : boolean
    info? : boolean
    debug? : boolean
}

export let log = new Log();

/** Check if value is valid JSON */
export function isValidJSON( value : any ) : boolean {
    if( value === null ){
        return true;
    }

    switch( typeof value ){
    case 'number' :
    case 'string' :
    case 'boolean' :
        return true;

    case 'object':
        var proto = Object.getPrototypeOf( value );

        if( proto === Object.prototype || proto === Array.prototype ){
            return every( value, isValidJSON );
        }
    }

    return false;
}

/**
 * Object manipulation helpers...
 */

/** Get the base class constructor function */
export function getBaseClass( Class : Function ){
    return Object.getPrototypeOf( Class.prototype ).constructor
}

/** Get a hash of static (constructor) properties which have not been inherited */
export function getChangedStatics( Ctor : Function, ...names : string[] ) : {}{
    const Base = getBaseClass( Ctor ),
          props = {};

    for( let name of names ){
        const value = Ctor[ name ];
        if( value !== void 0 && value !== Base[ name ] ){
            props[ name ] = value;
        }
    }

    return props;
}

export function isEmpty( obj : {} ) : boolean {
    if( obj ){
        for( let key in obj ){
            if( obj.hasOwnProperty( key ) ){
                return false;
            }
        }
    }

    return true;
}

type Iteratee = ( value : any, key? : string | number ) => any;

function someArray( arr : any[], fun : Iteratee ) : any {
    let result;

    for( let i = 0; i < arr.length; i++ ){
        if( result = fun( arr[ i ], i ) ){
            return result;
        }
    }
}

function someObject( obj : {}, fun : Iteratee ) : any {
    let result;

    for( let key in obj ){
        if( obj.hasOwnProperty( key ) ){
            if( result = fun( obj[ key ], key ) ){
                return result;
            }
        }
    }
}

export function some( obj, fun : Iteratee ) : any {
    if( Object.getPrototypeOf( obj ) === ArrayProto ){
        return someArray( obj, fun );
    }
    else{
        return someObject( obj, fun );
    }
}

export function every( obj : { }, predicate : Iteratee ) : boolean {
    return !some( obj, x => !predicate( x ) );
}

export function getPropertyDescriptor( obj : {}, prop : string ) : PropertyDescriptor {
    let desc : PropertyDescriptor;

    for( let proto = obj; !desc && proto; proto = Object.getPrototypeOf( proto ) ) {
        desc = Object.getOwnPropertyDescriptor( obj, prop );
    }

    return desc;
}

export function omit( source : {}, ...rest : string[] ) : {}
export function omit( source ) : {} {
    const dest = {}, discard = {};

    for( let i = 1; i < arguments.length; i ++ ){
        discard[ arguments[ i ] ] = true;
    }

    for( var name in source ) {
        if( !discard[ name ] && source.hasOwnProperty( name ) ) {
            dest[ name ] = source[ name ];
        }
    }

    return dest;
}

export function transform< A, B >( dest : { [ key : string ] : A }, source : { [ key : string ] : B }, fun : ( value : B, key : string ) => A | void ) : { [ key : string ] : A } {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            var value = fun( source[ name ], name );
            value === void 0 || ( dest[ name ] = < A >value );
        }
    }

    return dest;
}

export function fastAssign< A, B >( dest : A, source : B ) : A & B {
    for( var name in source ) {
        dest[ name ] = source[ name ];
    }

    return <A & B >dest;
}

export function fastDefaults<A, B>( dest : A, source : B ) : A & B {
    for( var name in source ) {
        if( dest[ name ] === void 0 ){
            dest[ name ] = source[ name ];
        }
    }

    return <A & B >dest;
}

export function assign< T >( dest : T, ...sources : Object[] ) : T
export function assign< T >( dest : T, source : Object ) : T {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            dest[ name ] = source[ name ];
        }
    }

    if( arguments.length > 2 ){
        for( let i = 2; i < arguments.length; i++ ){
            const other = arguments[ i ];
            other && assign( dest, other );
        }
    }

    return dest;
}

export function defaults< T >( dest : T, ...sources : Object[] ) : T
export function defaults< T >( dest : T, source : Object ) : T {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) && dest[ name ] === void 0 ) {
            dest[ name ] = source[ name ];
        }
    }

    if( arguments.length > 2 ){
        for( let i = 2; i < arguments.length; i++ ){
            const other = arguments[ i ];
            other && defaults( dest, other );
        }
    }

    return dest;
}

export function keys( o : any ) : string[]{
    return o ? Object.keys( o ) : [];
}

export function once( func : Function ) : Function {
    var memo, first = true;
    return function() {
        if ( first ) {
            first = false;
            memo = func.apply(this, arguments);
            func = null;
        }
        return memo;
    };
}

/**
 * notEqual( a, b ) function, for deep JSON comparison
 * Optimized for primitive types
 */

const ArrayProto = Array.prototype,
      DateProto = Date.prototype,
      ObjectProto = Object.prototype;

export function notEqual( a : any, b : any) : boolean {
    if( a === b ) return false;

    if( a && b && typeof a == 'object' && typeof b == 'object' ) {
        const protoA = Object.getPrototypeOf( a );

        if( protoA !== Object.getPrototypeOf( b ) ) return true;

        switch( protoA ){
            case DateProto   : return +a !== +b;
            case ArrayProto  : return arraysNotEqual( a, b );
            case ObjectProto :
            case null:
                return objectsNotEqual( a, b );
        }
    }

    return true;
}

function objectsNotEqual( a, b ) {
    const keysA = Object.keys( a );

    if( keysA.length !== Object.keys( b ).length ) return true;

    for( let i = 0; i < keysA.length; i++ ) {
        const key = keysA[ i ];

        if( !b.hasOwnProperty( key ) || notEqual( a[ key ], b[ key ] ) ) {
            return true;
        }
    }

    return false;
}

function arraysNotEqual( a, b ) {
    if( a.length !== b.length ) return true;

    for( let i = 0; i < a.length; i++ ) {
        if( notEqual( a[ i ], b[ i ] ) ) return true;
    }

    return false;
}


var numericKeys    = [ 1, 4, 5, 6, 7, 10, 11 ],
    msDatePattern  = /\/Date\(([0-9]+)\)\//,
    isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

function safeParseDate( date : string ) : number {
    var msDate, timestamp, struct, minutesOffset = 0;

    if( msDate = msDatePattern.exec( date ) ) {
        timestamp = Number( msDate[ 1 ] );
    }
    else if( ( struct = isoDatePattern.exec( date )) ) {
        // avoid NaN timestamps caused by undefined values being passed to Date.UTC
        for( var i = 0, k; ( k = numericKeys[ i ] ); ++i ) {
            struct[ k ] = +struct[ k ] || 0;
        }

        // allow undefined days and months
        struct[ 2 ] = (+struct[ 2 ] || 1) - 1;
        struct[ 3 ] = +struct[ 3 ] || 1;

        if( struct[ 8 ] !== 'Z' && struct[ 9 ] !== undefined ) {
            minutesOffset = struct[ 10 ] * 60 + struct[ 11 ];

            if( struct[ 9 ] === '+' ) {
                minutesOffset = 0 - minutesOffset;
            }
        }

        timestamp =
            Date.UTC( struct[ 1 ], struct[ 2 ], struct[ 3 ], struct[ 4 ], struct[ 5 ] + minutesOffset, struct[ 6 ],
                    struct[ 7 ] );
    }
    else {
        timestamp = Date.parse( date );
    }

    return timestamp;
}

function fastParseDate( date : string ) : number {
    const msDate = msDatePattern.exec( date );
    return msDate ? Number( msDate[ 1 ] ) : Date.parse( date ); 
}

function supportsDate( date ){
    return !isNaN( Date.parse( date ) );
} 

const parseDate = supportsDate('2011-11-29T15:52:30.5') && 
                supportsDate('2011-11-29T15:52:30.52') &&
                supportsDate('2011-11-29T15:52:18.867') &&
                supportsDate('2011-11-29T15:52:18.867Z') &&
                supportsDate('2011-11-29T15:52:18.867-03:30') ? fastParseDate : safeParseDate;

//console.log( parseDate === fastParseDate );

export { parseDate };
