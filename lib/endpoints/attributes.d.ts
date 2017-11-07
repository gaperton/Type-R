import { IOEndpoint, IOPromise } from '../io-tools';
export declare function create(): AttributesEndpoint;
export { create as attributesIO };
export declare class AttributesEndpoint implements IOEndpoint {
    create(json: any, options: any): IOPromise<any>;
    update(id: any, json: any, options: any): IOPromise<any>;
    read(id: any, options: any, record: any): IOPromise<any>;
    destroy(id: any, options: any): IOPromise<any>;
    list(options?: object): IOPromise<any>;
    subscribe(events: any): any;
    unsubscribe(events: any): any;
}
