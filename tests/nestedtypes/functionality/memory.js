var Nested = require( '../../../index' ),
    expect = require( 'chai' ).expect,
    sinon = require( 'sinon' );

var Model = Nested.Model, Collection = Nested.Collection;

describe( 'Memory management', function(){
    var M = Model.extend();
    
    M.define({
        attributes : {
            x : Integer,
            agg : M.value( null ),
            ref : M.shared,
            col : M.Collection,
            refs : M.Collection.shared,
            ids : M.Collection.subsetOf( 'col' ) 
        }
    });

    var singleton = new M();

    it( 'Shared refs do not create a leak', function(){
        var m = new M();
        m.ref = singleton;
        m.refs = [ singleton ];

        m.dispose();

        expect( singleton._events ).to.be.empty;
    } );
});