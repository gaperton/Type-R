import { IOEndpoint, IOPromise } from '../io-tools';
import FakeEndpoint from './fakeEndpoint';
export declare type Index = number[];
export default function memoryIO(delay?: number): MemoryIOEndpoint;
export declare class MemoryIOEndpoint extends FakeEndpoint implements IOEndpoint {
    constructor(delay: number);
    index: number[];
    items: {};
    generateId(): number;
    create(json: any, options: any): IOPromise<any>;
    update(id: any, json: any, options: any): IOPromise<any>;
    read(id: any, options: any): IOPromise<any>;
    destroy(id: any, options: any): IOPromise<any>;
    list(options?: object): IOPromise<any>;
    subscribe(events: any): any;
    unsubscribe(events: any): any;
}
