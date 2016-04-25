/**
 * Tools functionality test
 */

describe( 'Mixins', () => {
    it( 'merges objects to the prototype, if they are not defined', () => {
    
    });
    
    it( 'works on a plain class', () => {
    
    });
    
    describe( 'mixin rules', () => {
        it( 'merges object properties' );
        it( 'merges rules on inheritance' );
        it( 'works on the plain class' );
        
        describe( 'methods composition', () => {
            it( 'execute methods sequentially' );
            it( 'execute methods in reverse order' );
            it( 'pipeline methods passing the first argument through' );
        });
        
        describe( 'boolean methods composition', () => {
            it( 'joins checks by "and"' );
            it( 'joins checks by "or"');
        });
    });
});

describe( 'Class#define', () => {
    it( 'adds members to the prototype' );

    it( 'defines properties passed in "properties" spec' );
    
    it( 'clear up "create" factory method on inheritance' );
    
    it( 'merges mixin rules on inheritance' );
});