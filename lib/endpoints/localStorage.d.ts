import { IOEndpoint, IOPromise } from '../io-tools';
export declare type Index = number[];
export declare function create(key: string): LocalStorageEndpoint;
export { create as localStorageIO };
export declare class LocalStorageEndpoint implements IOEndpoint {
    key: string;
    constructor(key: string);
    resolve(value: any): IOPromise<any>;
    reject(value: any): IOPromise<any>;
    create(json: any, options: any): IOPromise<any>;
    set(json: any): void;
    get(id: any): any;
    update(id: any, json: any, options: any): IOPromise<any>;
    read(id: any, options: any): IOPromise<any>;
    destroy(id: any, options: any): IOPromise<any>;
    index: (string | number)[];
    list(options?: object): IOPromise<any>;
    subscribe(events: any): any;
    unsubscribe(events: any): any;
}
