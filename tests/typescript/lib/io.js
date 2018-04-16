import * as tslib_1 from "tslib";
import "reflect-metadata";
import "isomorphic-fetch";
import { define, attr, prop, Record, Store, type, Collection } from 'type-r';
import { expect } from 'chai';
import { memoryIO } from '../../../endpoints/memory';
import { attributesIO } from '../../../endpoints/attributes';
import { localStorageIO } from '../../../endpoints/localStorage';
import { restfulIO, RestfulEndpoint } from '../../../endpoints/restful';
import nock from 'nock';
describe('IO', function () {
    describe('memory endpoint', () => {
        const testData = [
            { name: "John" }
        ];
        let User = class User extends Record {
        };
        User.endpoint = memoryIO(testData);
        tslib_1.__decorate([
            attr,
            tslib_1.__metadata("design:type", String)
        ], User.prototype, "name", void 0);
        User = tslib_1.__decorate([
            define
        ], User);
        it('loads the test data', done => {
            const users = new User.Collection();
            users.fetch()
                .then(() => {
                expect(users.length).to.eql(1);
                expect(users.first().name).to.eql('John');
                done();
            });
        });
        it('create', done => {
            const x = new User({ name: "test" });
            x.save().then(() => {
                expect(x.id).to.eql("1");
                done();
            });
        });
        it('read', done => {
            const x = (new User({ id: "1" })).fetch().then(x => {
                expect(x.name).to.eql("test");
                done();
            });
        });
        it('update', done => {
            const x = new User({ id: "1" });
            x.fetch()
                .then(() => {
                x.name = "Mike";
                return x.save();
            })
                .then(() => {
                const y = new User({ id: "1" });
                return y.fetch();
            })
                .then(y => {
                expect(y.name).to.eql('Mike');
                done();
            });
        });
        it('list', done => {
            const users = new User.Collection();
            users.fetch()
                .then(() => {
                expect(users.length).to.eql(2);
                expect(users.first().name).to.eql("John");
                expect(users.last().name).to.eql("Mike");
                done();
            });
        });
        it("destroy", done => {
            const x = new User({ id: "1" });
            x.destroy()
                .then(() => {
                const users = new User.Collection();
                return users.fetch();
            })
                .then(users => {
                expect(users.length).to.eql(1);
                expect(users.first().name).to.eql("John");
                done();
            });
        });
    });
    it('can override endpoint with .has.endpoint', done => {
        let NoEndpoint = class NoEndpoint extends Record {
        };
        NoEndpoint.attributes = {
            type: 'no endpoint'
        };
        NoEndpoint = tslib_1.__decorate([
            define
        ], NoEndpoint);
        let HasEndpoint = class HasEndpoint extends Record {
        };
        HasEndpoint.endpoint = memoryIO([{ id: 666 }]);
        HasEndpoint.attributes = {
            type: 'has endpoint'
        };
        HasEndpoint = tslib_1.__decorate([
            define
        ], HasEndpoint);
        let TestStore = class TestStore extends Store {
        };
        TestStore.endpoint = attributesIO();
        TestStore.attributes = {
            a: type(NoEndpoint.Collection).endpoint(memoryIO([{ id: "777" }])),
            b: HasEndpoint.Collection,
            c: type(HasEndpoint.Collection).endpoint(memoryIO([{ id: "555" }]))
        };
        TestStore = tslib_1.__decorate([
            define
        ], TestStore);
        const s = new TestStore();
        s.fetch().then(() => {
            expect(s.a.first().id).to.eql("777");
            expect(s.b.first().id).to.eql(666);
            expect(s.c.first().id).to.eql("555");
            done();
        });
    });
    describe("restful endpoint", () => {
        describe('Base test', () => {
            let usersStorage = {
                models: [],
                counter: 0
            };
            const USER_REGEX = /\/users\/(\w+)/;
            function getUserId(uri) {
                return uri.match(USER_REGEX)[1];
            }
            function getUser(id) {
                return usersStorage.models.filter(u => u.id == id)[0];
            }
            function cloneUser({ id, name }) {
                return { id, name };
            }
            nock.cleanAll();
            nock('http://restful.basic')
                .persist()
                .get('/users')
                .reply(200, function () {
                return usersStorage.models.map(cloneUser);
            })
                .get(USER_REGEX)
                .reply(function (uri) {
                const user = getUser(getUserId(uri));
                if (user) {
                    return [200, cloneUser(user)];
                }
                else {
                    console.warn("GET: NOT FOUND", uri);
                    return [404];
                }
            })
                .post('/users')
                .reply(200, function (uri, requestBody) {
                let id = ++usersStorage.counter, user = Object.assign({ id: String(id) }, requestBody);
                usersStorage.models.push(user);
                return cloneUser(user);
            })
                .put(USER_REGEX)
                .reply(function (uri, requestBody) {
                const user = getUser(getUserId(uri));
                if (user) {
                    user.name = requestBody.name;
                    return [200, cloneUser(user)];
                }
                else {
                    console.warn("PUT: NOT FOUND", uri);
                    return [404];
                }
            })
                .delete(USER_REGEX)
                .reply(function (uri) {
                const user = getUser(getUserId(uri));
                if (user) {
                    const idx = usersStorage.models.indexOf(user);
                    usersStorage.models.splice(idx, 1);
                    return [200];
                }
                else {
                    console.warn("DELETE: NOT FOUND", uri);
                    return [404];
                }
            });
            testEndpoint(restfulIO('http://restful.basic/users'))();
        });
        describe('Relative urls', () => {
            let User = class User extends Record {
            };
            User.endpoint = restfulIO('./users');
            tslib_1.__decorate([
                attr,
                tslib_1.__metadata("design:type", String)
            ], User.prototype, "name", void 0);
            User = tslib_1.__decorate([
                define
            ], User);
            let Store = class Store extends Record {
            };
            Store.endpoint = restfulIO('./store');
            tslib_1.__decorate([
                attr,
                tslib_1.__metadata("design:type", String)
            ], Store.prototype, "name", void 0);
            tslib_1.__decorate([
                prop(User),
                tslib_1.__metadata("design:type", User)
            ], Store.prototype, "user", void 0);
            Store = tslib_1.__decorate([
                define
            ], Store);
            let Root = class Root extends Record {
            };
            Root.endpoint = restfulIO('http://restful.relative/');
            tslib_1.__decorate([
                prop(User.Collection),
                tslib_1.__metadata("design:type", Collection)
            ], Root.prototype, "users", void 0);
            tslib_1.__decorate([
                prop(Store),
                tslib_1.__metadata("design:type", Store)
            ], Root.prototype, "store", void 0);
            Root = tslib_1.__decorate([
                define
            ], Root);
            const root = new Root();
            root.store.id = 99;
            root.store.user.id = 1000;
            nock('http://restful.relative')
                .get('/users')
                .reply(200, [{ id: 10, name: 'John' }, { id: 11, name: 'Jack' }])
                .get('/store/99')
                .reply(200, { id: 99, name: 'something' })
                .get('/store/99/users/1000')
                .reply(200, { id: 1000, name: 'special' });
            it('resolves in simple case', done => {
                root.store.fetch().then(() => {
                    expect(root.store.name).to.eql('something');
                    done();
                });
            });
            it('resolves for collection', done => {
                root.users.fetch().then(() => {
                    expect(root.users.map(u => u.id)).deep.equal([10, 11]);
                    done();
                });
            });
            it('nested resolve', done => {
                const { user } = root.store;
                user.fetch().then(() => {
                    expect(user.name).to.equal('special');
                    done();
                });
            });
        });
        describe("Merging options", () => {
            RestfulEndpoint.defaultFetchOptions = {
                cache: "force-cache",
                credentials: "omit",
                mode: "navigate",
                redirect: "manual",
            };
            it("uses default options", () => {
                let io = restfulIO(""), options = io.buildRequestOptions("get");
                expect(options.cache).to.equal("force-cache");
                expect(options.credentials).to.equal("omit");
                expect(options.mode).to.equal("navigate");
                expect(options.redirect).to.equal("manual");
            });
            it("Overrides at ctor", () => {
                let io = restfulIO("", { credentials: "include", cache: "reload" }), options = io.buildRequestOptions("get");
                expect(options.cache).to.equal("reload");
                expect(options.credentials).to.equal("include");
            });
            it("Overrides at call", () => {
                let io = restfulIO("", { credentials: "include", cache: "reload" }), options = io.buildRequestOptions("get", { cache: "no-store", credentials: "same-origin" });
                expect(options.cache).to.equal("no-store");
                expect(options.credentials).to.equal("same-origin");
            });
        });
    });
    if (typeof localStorage !== 'undefined')
        describe('localStorage endpoint', testEndpoint(localStorageIO("/test")));
});
function testEndpoint(endpoint) {
    return () => {
        let User = class User extends Record {
        };
        User.endpoint = endpoint;
        tslib_1.__decorate([
            attr,
            tslib_1.__metadata("design:type", String)
        ], User.prototype, "name", void 0);
        User = tslib_1.__decorate([
            define
        ], User);
        let generatedId;
        it('create', done => {
            const x = new User({ name: "test" });
            x.save().then(() => {
                generatedId = x.id;
                expect(x.id).to.be.not.empty;
                done();
            });
        });
        it('read', done => {
            const x = new User({ id: generatedId });
            x.fetch().then(() => {
                expect(x.name).to.eql("test");
                done();
            });
        });
        it('update', done => {
            const x = new User({ id: generatedId });
            x.fetch()
                .then(() => {
                x.name = "Mike";
                return x.save();
            })
                .then(() => {
                const y = new User({ id: generatedId });
                return y.fetch();
            })
                .then(y => {
                expect(y.name).to.eql('Mike');
                done();
            });
        });
        it('list', done => {
            const users = new User.Collection();
            users.fetch()
                .then(() => {
                expect(users.length).to.eql(1);
                expect(users.last().name).to.eql("Mike");
                done();
            });
        });
        it("destroy", done => {
            const x = new User({ id: generatedId });
            x.destroy()
                .then(() => {
                const users = new User.Collection();
                return users.fetch();
            })
                .then(users => {
                expect(users.length).to.eql(0);
                done();
            });
        });
    };
}
//# sourceMappingURL=io.js.map