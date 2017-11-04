import "reflect-metadata"
import { predefine, define, attr, prop, Record, Store, Collection } from '../../../lib'
import { expect } from 'chai'
import { memoryIO } from '../../../lib/endpoints/memory'

describe( 'IO', () => {
    const testData = [
        { name : "John" }
    ];

    @define class User extends Record {
        static endpoint = memoryIO( testData );

        @attr name : string
    }
    
    it( 'create', done =>{
        const x = new User({ name : "test" });
        x.save().then( () => {
            expect( x.id ).to.eql( "1" );
            done();
        });
    });

    it( 'read', done => {
        const x = new User({ id : "1" });
        x.fetch().then( () => {
            expect( x.name ).to.eql( "test" );
            done();
        });
    });

    it( 'update', done => {
        const x = new User({ id : "1" });
        x.fetch()
            .then( () => {
                x.name = "Mike";
                return x.save();
            })
            .then( () => {
                const y = new User({ id : "1" });
                return y.fetch();
            })
            .then( y => {
                expect( y.name ).to.eql( 'Mike' );
                done();
            });
    });

    it( 'list', done => {
        const users = new User.Collection();
        users.fetch()
            .then( () =>{
                expect( users.length ).to.eql( 2 );
                expect( ( users.last() as any ).name ).to.eql( "Mike" );
                done();
            });
    });

    it( "destroy", done => {
        const x = new User({ id : "1" });
        x.destroy()
            .then( () => {
                const users = new User.Collection();
                return users.fetch();
            })
            .then( users => {
                expect( users.length ).to.eql( 1 );
                done();
            });
    });
});