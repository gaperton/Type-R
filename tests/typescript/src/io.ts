import "reflect-metadata"
import { predefine, define, attr, prop, Record, Store, Collection } from '../../../lib'
import { expect } from 'chai'
import { memoryIO } from '../../../lib/endpoints/memory'
import { localStorageIO } from '../../../lib/endpoints/localStorage'

describe( 'IO', function(){
    describe( 'memory endpoint', () => {
        const testData = [
            { name : "John" }
        ];
    
        @define class User extends Record {
            static endpoint = memoryIO( testData );
    
            @attr name : string
        }
    
        it( 'loads the test data', done => {
            const users = new User.Collection();
            users.fetch()
                .then( () => {
                    expect( users.length ).to.eql( 1 );
                    expect( ( users.first() as any ).name ).to.eql( 'John' );
                    done();
                });
        });
        
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
                    expect( ( users.first() as any ).name ).to.eql( "John" );
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
                    expect( users.first().name ).to.eql( "John" );
                    done();
                });
        });
    });

    if( typeof localStorage !== 'undefined') describe( 'localStorage endpoint', testEndpoint( localStorageIO( "/test" ) ));
});

function testEndpoint( endpoint ){
    return () =>{

        @define class User extends Record {
            static endpoint = endpoint;
    
            @attr name : string
        }

        let generatedId;
        
        it( 'create', done =>{
            const x = new User({ name : "test" });
            x.save().then( () => {
                generatedId = x.id;
                expect( x.id ).to.be.not.empty;
                done();
            });
        });
    
        it( 'read', done => {
            const x = new User({ id : generatedId });
            x.fetch().then( () => {
                expect( x.name ).to.eql( "test" );
                done();
            });
        });
    
        it( 'update', done => {
            const x = new User({ id : generatedId });
            x.fetch()
                .then( () => {
                    x.name = "Mike";
                    return x.save();
                })
                .then( () => {
                    const y = new User({ id : generatedId });
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
                    expect( users.length ).to.eql( 1 );
                    expect( ( users.last() as any ).name ).to.eql( "Mike" );
                    done();
                });
        });
    
        it( "destroy", done => {
            const x = new User({ id : generatedId });
            x.destroy()
                .then( () => {
                    const users = new User.Collection();
                    return users.fetch();
                })
                .then( users => {
                    expect( users.length ).to.eql( 0 );
                    done();
                });
        });
    }
}