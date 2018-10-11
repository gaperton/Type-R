"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("isomorphic-fetch");
var type_r_1 = require("type-r");
var chai_1 = require("chai");
var ext_types_1 = require("../../../ext-types");
describe('Extended Type specs', function () {
    describe('Date type', function () {
        var user, User = type_r_1.Record.extend({
            attributes: {
                timestamp: ext_types_1.Timestamp,
                microsoft: ext_types_1.MicrosoftDate,
                name: String
            }
        });
        before(function () {
            user = new User();
        });
        it('create new Date object on construction', function () {
            chai_1.expect(user.microsoft).to.be.instanceOf(Date);
            chai_1.expect(user.timestamp).to.be.instanceOf(Date);
        });
        it('parse ISO dates in all browsers on assignment', function () {
            user.timestamp = "2012-12-12T10:00Z";
            chai_1.expect(user.timestamp).to.be.instanceof(Date);
            chai_1.expect(user.timestamp.toISOString()).to.be.eql('2012-12-12T10:00:00.000Z');
            user.microsoft = "2012-12-12T10:00Z";
            chai_1.expect(user.microsoft).to.be.instanceof(Date);
            chai_1.expect(user.microsoft.toISOString()).to.be.eql('2012-12-12T10:00:00.000Z');
        });
        it('parse integer time stamps on assignment', function () {
            user.timestamp = 1234567890123;
            chai_1.expect(user.timestamp).to.be.instanceof(Date);
            chai_1.expect(user.timestamp.toISOString()).to.be.eql('2009-02-13T23:31:30.123Z');
            user.microsoft = 1234567890123;
            chai_1.expect(user.microsoft).to.be.instanceof(Date);
            chai_1.expect(user.microsoft.toISOString()).to.be.eql('2009-02-13T23:31:30.123Z');
        });
        it('parse MS time stamps on assignment', function () {
            user.microsoft = "/Date(1234567890123)/";
            chai_1.expect(user.microsoft).to.be.instanceof(Date);
            chai_1.expect(user.microsoft.toISOString()).to.be.eql('2009-02-13T23:31:30.123Z');
        });
        it('is serialized to ISO date', function () {
            var json = user.toJSON();
            chai_1.expect(json.timestamp).to.be.eql(1234567890123);
            chai_1.expect(json.microsoft).to.be.eql('/Date(1234567890123)/');
        });
    });
    describe("Url", function () {
        var user, User = type_r_1.Record.extend({
            attributes: {
                url: ext_types_1.Url
            }
        });
        before(function () {
            user = new User();
        });
        it('create new URL string on construction', function () {
            chai_1.expect(user.url).to.be.eq('');
        });
        it('checks for invalid urls', function () {
            user.url = 'asd123';
            chai_1.expect(user.isValid()).to.be.false;
            chai_1.expect(user.getValidationError('url')).to.eq('Not valid URL');
            user.url = 'http://test.com?x=y';
            chai_1.expect(user.isValid()).to.be.true;
        });
    });
    describe("Email", function () {
        var user, User = type_r_1.Record.extend({
            attributes: {
                email: ext_types_1.Email
            }
        });
        before(function () {
            user = new User();
        });
        it('create new email string on construction', function () {
            chai_1.expect(user.email).to.be.eq('');
        });
        it('checks for invalid emails', function () {
            user.email = 'asd123';
            chai_1.expect(user.isValid()).to.be.false;
            chai_1.expect(user.getValidationError('email')).to.eq('Not valid email');
            user.email = 'my@mail.com';
            chai_1.expect(user.isValid()).to.be.true;
        });
    });
    describe("IP Address", function () {
        var user, User = type_r_1.Record.extend({
            attributes: {
                ip: ext_types_1.IPAddress
            }
        });
        before(function () {
            user = new User();
        });
        it('create new ip string on construction', function () {
            chai_1.expect(user.ip).to.be.eq('');
        });
        it('checks for invalid ip', function () {
            user.ip = 'asd123';
            chai_1.expect(user.isValid()).to.be.false;
            chai_1.expect(user.getValidationError('ip')).to.eq('Not valid IP address');
            user.ip = '222.111.123.001';
            chai_1.expect(user.isValid()).to.be.true;
        });
    });
    describe("Integer", function () {
        var user, User = type_r_1.Record.extend({
            attributes: {
                int: ext_types_1.Integer
            }
        });
        before(function () {
            user = new User();
        });
        it('create new int string on construction', function () {
            chai_1.expect(user.int).to.be.eq(0);
        });
        it('rounding and conversion', function () {
            user.int = 3.2;
            chai_1.expect(user.int).to.be.a('number').and.be.eq(3);
            user.int = "25.7";
            chai_1.expect(user.int).to.be.a('number').and.equal(26);
        });
        it('can be set with null', function () {
            user.int = null;
            chai_1.expect(user.int).to.be.null;
            chai_1.expect(user.isValid()).to.be.true;
        });
    });
});
//# sourceMappingURL=ext-types.js.map