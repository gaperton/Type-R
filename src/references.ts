/**
 * Some sketches for reference resolution.
 *
 * 
 * a : Model.from( '~collection' )
 * 
 * We need two functions. One for get, and one for compile. 
 */

const referenceMask =  /\~|\^|([^.]+)/g;

// Need to be implemented in the model
function get( object : any, reference : string ) : any { 
    return resolve( object, reference, ( self, key ) => self[ key ] );
}

// Compile reference to function
function compile( reference : string ) : ( root : any ) => any {
    const path = reference
                    .match( referenceMask )
                    .map( key => key === '~' ? 'getStrore()' : ( key === '^' ? 'getOwner()' : key ) )
                    .join( '.' );

    return <any> new Function( 'self', `return self.${ path };` );          
}

function resolve( object : any, reference : string, action ) : any {
    const path = reference.match( referenceMask ),
          skip = path.length - 1;
    
    let self = object;

    for( var i = 0; i < skip; i++ ){
        const key = path[ i ];
        switch( key ){
            case '~' : self = self.getStore(); break;
            case '^' : self = self.getOwner(); break;
            default  : self = self[ key ];
        }

        // Do nothing if object on the path doesn't exist.
        if( !self ) return;
    }

    return action( self, path[ skip ] );
}