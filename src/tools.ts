/**
 * Simple overridable logging stubs
 *
 */

export let log = {
    level : 2,

    error( ...args : any[] ) : void {
        console.error.apply( this, args );
    },

    warn(){
        if( this.level > 0 ) console.warn.apply( this, arguments );
    },

    info(){
        if( this.level > 1 ) console.info.apply( this, arguments );
    },

    debug(){
        if( this.level > 2 ) console.log.apply( this, arguments );
    }
};

// Check if value is valid JSON.
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

export function fastAssign( dest : {}, source : {} ) : void {
    for( var name in source ) {
        dest[ name ] = source[ name ];
    }
}

export function fastDefaults( dest : {}, source : {} ) : void {
    for( var name in source ) {
        dest[ name ] === void 0 || ( dest[ name ] = source[ name ] );
    }
}

function forAllArgs( fun ) {
    return function< T >( dest : T, ...sources ) : T {
        for( var i = 0; i < sources.length; i++ ) {
            const source = sources[ i ];
            source && fun( dest, source );
        }

        return dest;
    }
}

export const assign = forAllArgs( ( dest, source ) => {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            dest[ name ] = source[ name ];
        }
    }
} );

export const defaults = forAllArgs( ( dest, source ) => {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            dest[ name ] === void 0 || ( dest[ name ] = source[ name ] );
        }
    }
} );

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
