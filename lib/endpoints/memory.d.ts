import { IOEndpoint, IOPromise } from '../io-tools';
export declare type Index = number[];
export declare function create(delay?: number): MemoryEndpoint;
export { create as memoryIO };
export declare class MemoryEndpoint implements IOEndpoint {
    delay: number;
    static create(delay?: number): MemoryEndpoint;
    resolve(value: any): IOPromise<any>;
    reject(value: any): IOPromise<any>;
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
