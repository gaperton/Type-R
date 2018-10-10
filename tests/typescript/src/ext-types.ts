import "reflect-metadata"
import "isomorphic-fetch"
import {Record} from 'type-r'
import {expect} from 'chai'
import {Timestamp, MicrosoftDate, Integer, Url, IPAddress, Email} from "../../../ext-types";

describe( 'Extended Type specs', function () {

    describe( 'Date type', function () {
        var user, User = Record.extend( {
            attributes: {
                timestamp: Timestamp,
                microsoft: MicrosoftDate,
                name     : String
            }
        } );

        before( function () {
            user = new User();
        } );

        it( 'create new Date object on construction', function () {
            expect( user.microsoft ).to.be.instanceOf( Date );
            expect( user.timestamp ).to.be.instanceOf( Date );
        } );

        it( 'parse ISO dates in all browsers on assignment', function () {
            // parse Date from string

            user.timestamp = "2012-12-12T10:00Z";
            expect( user.timestamp ).to.be.instanceof( Date );
            expect( user.timestamp.toISOString() ).to.be.eql( '2012-12-12T10:00:00.000Z' );

            user.microsoft = "2012-12-12T10:00Z";
            expect( user.microsoft ).to.be.instanceof( Date );
            expect( user.microsoft.toISOString() ).to.be.eql( '2012-12-12T10:00:00.000Z' );
        } );

        it( 'parse integer time stamps on assignment', function () {
            // parse Date from timestamp
            user.timestamp = 1234567890123;
            expect( user.timestamp ).to.be.instanceof( Date );
            expect( user.timestamp.toISOString() ).to.be.eql( '2009-02-13T23:31:30.123Z' );

            user.microsoft = 1234567890123;
            expect( user.microsoft ).to.be.instanceof( Date );
            expect( user.microsoft.toISOString() ).to.be.eql( '2009-02-13T23:31:30.123Z' );
        } );

        it( 'parse MS time stamps on assignment', function () {
            user.microsoft = "/Date(1234567890123)/";
            expect( user.microsoft ).to.be.instanceof( Date );
            expect( user.microsoft.toISOString() ).to.be.eql( '2009-02-13T23:31:30.123Z' );
        } );

        it( 'is serialized to ISO date', function () {
            var json = user.toJSON();
            expect( json.timestamp ).to.be.eql( 1234567890123 );
            expect( json.microsoft ).to.be.eql( '/Date(1234567890123)/' );
        } );
    } );

    describe( "Url", function () {
        var user, User = Record.extend( {
            attributes: {
                url: Url
            }
        } )
        before( function () {
            user = new User();
        } );

        it( 'create new URL string on construction', function () {
            expect( user.url ).to.be.eq( '' );
        } );
        it( 'checks for invalid urls', function () {
            user.url = 'asd123'
            expect( user.isValid() ).to.be.false;
            expect( user.getValidationError( 'url' ) ).to.eq( 'Not valid URL' )

            user.url = 'http://test.com?x=y'
            expect( user.isValid() ).to.be.true;
        } )
    } )
    describe( "Email", function () {
        var user, User = Record.extend( {
            attributes: {
                email: Email
            }
        } )
        before( function () {
            user = new User();
        } );

        it( 'create new email string on construction', function () {
            expect( user.email ).to.be.eq( '' );
        } );
        it( 'checks for invalid emails', function () {
            user.email = 'asd123'
            expect( user.isValid() ).to.be.false;
            expect( user.getValidationError( 'email' ) ).to.eq( 'Not valid email' )

            user.email = 'my@mail.com'
            expect( user.isValid() ).to.be.true;
        } )
    } )

    describe( "IP Address", function () {
        var user, User = Record.extend( {
            attributes: {
                ip: IPAddress
            }
        } )
        before( function () {
            user = new User();
        } );

        it( 'create new ip string on construction', function () {
            expect( user.ip ).to.be.eq( '' );
        } );
        it( 'checks for invalid ip', function () {
            user.ip = 'asd123'
            expect( user.isValid() ).to.be.false;
            expect( user.getValidationError( 'ip' ) ).to.eq( 'Not valid IP address' )

            user.ip = '222.111.123.001'
            expect( user.isValid() ).to.be.true;
        } )
    } )

    describe( "Integer", function () {
        var user, User = Record.extend( {
            attributes: {
                int: Integer
            }
        } )
        before( function () {
            user = new User();
        } );

        it( 'create new int string on construction', function () {
            expect( user.int ).to.be.eq( 0 );
        } );
        it( 'rounding and conversion', function () {
            user.int = 3.2
            expect( user.int ).to.be.a( 'number' ).and.be.eq( 3 );

            user.int = "25.7";
            expect( user.int ).to.be.a( 'number' ).and.equal( 26 );
        } )

        it( 'can be set with null', function(){
            user.int = null;
            expect( user.int ).to.be.null;
            expect( user.isValid() ).to.be.true;
        });
    } )

} );