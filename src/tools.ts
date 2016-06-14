/**
 * Simple overridable logging stubs
 *
 */

export let log = {
    level : 2,

    error(){
        console.error.apply( this, arguments );
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

/**
 * Object manipulation helpers...
 */

export function getPropertyDescriptor( obj, prop ) {
    for( var desc; !desc && obj; obj = Object.getPrototypeOf( obj ) ) {
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

export function mapObject( dest : {}, source : {}, fun : ( value : {}, key : string ) => {} ) {
    for( var name in source ) {
        if( source.hasOwnProperty( name ) ) {
            var value = fun( source[ name ], name );
            value === void 0 || ( dest[ name ] = value );
        }
    }

    return dest;
}

export function fastAssign( dest : {}, source : {} ) {
    for( var name in source ) {
        dest[ name ] = source[ name ];
    }
}

export function fastDefaults( dest : {}, source : {} ) {
    for( var name in source ) {
        dest[ name ] === void 0 || ( dest[ name ] = source[ name ] );
    }
}

function forAllArgs( fun ) {
    return function( dest, ...sources ) {
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

export function createForEach( attrSpecs ) {
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ) {
        statements.push( '(v=a.' + name + ')' + '===void 0||f(v,"' + name + '");' );
    }

    return new Function( 'a', 'f', statements.join( '' ) );
}

export function createCloneCtor( attrSpecs ) {
    var statements = [];

    for( let name in attrSpecs ) {
        statements.push( "this." + name + "=x." + name + ";" );
    }

    var CloneCtor       = new Function( "x", statements.join( '' ) );
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}

export function createTransformCtor( attrSpecs ) {
    var statements = [ 'var v;' ];

    for( let name in attrSpecs ) {
        statements.push( 'this.' + name + '=(v=a.' + name + ')' + '===void 0?void 0 :f(v,"' + name + '");' );
    }

    var TransformCtor       = new Function( "a", 'f', statements.join( '' ) );
    TransformCtor.prototype = Object.prototype;
    return TransformCtor;
}

/**
 * notEqual( a, b ) function, for deep JSON comparison
 * Optimized for primitive types
 */

const ArrayProto = Array.prototype,
      DateProto = Date.prototype,
      ObjectProto = Object.prototype;

export function notEqual( a, b ) : boolean {
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