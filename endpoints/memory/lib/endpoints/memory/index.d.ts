import { IOEndpoint, IOPromise } from '../../src/io-tools';
export declare type Index = number[];
export declare function create(delay?: number): Endpoint;
export declare class Endpoint implements IOEndpoint {
    delay: number;
    static create(delay?: number): Endpoint;
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
