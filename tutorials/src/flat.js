describe( 'Flat models', () =>{
    @define
    class Flat extends Model {
        static attributes = {
            num : 0,
            str : 'Hello!',
            bool : false,
            any : null,
            arr : [],
            obj : {}
        }
    }

    descibe( 'construction and attribute assignments', () => {
        it( 'sets attribute default values upon creation', () =>{
            const f = new Flat();
            expect( f.num ).to.equal( 0 );
            expect( f.str ).to.equal( 'Hello!' );
            expect( f.bool ).to.equal( false );
            expect( f.any ).to.equal( null );
        });

        it( 'it deeply clones object literals', () => {
            const f1 = new Flat(), f2 = Flat();

            expect( f1.arr ).to.eql( [] );
            expect( f1.arr ).to.not.equal( f2.arr );
            
            expect( f1.obj ).to.eql( {} );
            expect( f1.obj ).to.not.equal( f2.obj );
        });

        it( 'handle direct assignments' );
    });

    descibe( 'Collections' );
    
    describe( 'Change events and transactions basics' );

    describe( 'Serialization basics' );

    describe( 'Type checks and type coercion' );
});