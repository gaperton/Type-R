var Nested = require( '../../../index' ),
    expect = require( 'chai' ).expect,
    sinon = require( 'sinon' );

var Model = Nested.Model, Collection = Nested.Collection;

describe( 'Advanced functionality', function(){
    describe( 'Collection.Subset', function(){
        var M = Model.extend({
            attributes : {
                name : String
            }
        });

        var A = Model.extend({
            attributes : {
                subset : M.Collection.Subset,
                aggregated : M.Collection
            }
        });

        it( 'inherits from collection type', function(){
            expect( Collection.Subset.prototype ).to.equal( Collection.prototype );

            var M = Model.extend({});

            expect( M.Collection ).to.not.equal( Collection );
            expect( M.Collection.prototype ).to.be.instanceOf( Collection );
            expect( M.Collection.Subset.prototype ).to.equal( M.Collection.prototype ); 
        } );

        it( "doesn't take ownership on its elements", function(){
            var a = new A();

            a.subset.set([ { name : '1'}, { name : '2'} ]);
            a.aggregated.set( a.subset.models );
            expect( a.aggregated.first()._owner ).to.equal( a.aggregated );
        } );

        it( "doesn't merge records on set", function(){
            var a = new A();

            a.subset.set([ { id : 1, name : '1'}, { id : 2, name : '2'} ]);
            var f = a.subset.get( 1 );
            a.subset.set([ { id : 1, name : '3'}, { id : 2, name : '4'} ]);
            
            expect( a.subset.get( 1 ).name ).to.equal( '1' );                        
        });
    });

    describe( 'Attribute .has options', function(){
        describe( '.has.changeEvents( false )', function(){
            var M = Model.extend({
                attributes : {
                    a : Model.defaults({
                        x : 1
                    }).has.changeEvents( false ),

                    b : Model.shared.changeEvents( false )
                },

                initialize(){
                    this.b = this.a;
                }
            });

            it( 'disables change events for an attribute', function(){
                var m = new M();
                var token = m._changeToken;
                m.a.x = 2;
                expect( token ).to.equal( m._changeToken ); 
            } );

            it( 'disables change events in case of nested transaction', function(){
                var m = new M();
                var token = m._changeToken;
                m.set({ a : { x : 2 } });
                expect( token ).to.equal( m._changeToken ); 
            } );
        });

    });
});
