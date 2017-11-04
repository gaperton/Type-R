import { IOEndpoint, IOPromise } from '../io-tools';
import FakeEndpoint from './fakeEndpoint';
export declare type Index = number[];
export default function localStorageIO(key: string, delay?: number): LocalStorageIOEndpoint;
export declare class LocalStorageIOEndpoint extends FakeEndpoint implements IOEndpoint {
    key: string;
    constructor(key: string, delay: any);
    create(json: any, options: any): IOPromise<any>;
    set(json: any): void;
    get(id: any): any;
    update(id: any, json: any, options: any): IOPromise<any>;
    read(id: any, options: any): IOPromise<any>;
    destroy(id: any, options: any): IOPromise<any>;
    index: number[];
    list(options?: object): IOPromise<any>;
    subscribe(events: any): any;
    unsubscribe(events: any): any;
}
