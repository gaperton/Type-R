import "reflect-metadata"
import { predefine, define, attr, prop, Record, Store, Collection } from '../../../lib'
import { expect } from 'chai'

describe( 'Bugs from Volicon Observer', () =>{
    describe( 'Attribute change watcher', () =>{
        it( 'works in base class and subclass', () => {
            let calls = [];

            @define class Base extends Record {
                @attr( String.has.watcher( x => calls.push( 'inherited' ) ) )
                inherited : string;

                @attr( String.has.watcher( x => calls.push( 'base' ) ) )
                overriden : string;
            }

            @define class Subclass extends Base {
                @attr( String.has.watcher( x => calls.push( 'added' ) ) )
                added : string;

                @attr( String.has.watcher( x => calls.push( 'subclass') ) )
                overriden : string;
            }

            const subclass = new Subclass();
            subclass.inherited = "a";
            subclass.added = "b";
            subclass.overriden = "b";

            expect( calls ).to.eql( [ 'inherited', 'added', 'subclass', 'base' ] );
        } );

    } );
} );