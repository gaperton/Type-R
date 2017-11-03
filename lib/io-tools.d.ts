export interface IONode {
    _endpoint: IOEndpoint;
    _ioPromise: IOPromise<any>;
}
export interface IOPromise<T> extends Promise<T> {
    abort(): void;
}
export interface IOEndpoint {
    list(options: object): IOPromise<any>;
    create(json: any, options: object): IOPromise<any>;
    update(id: string | number, json: any, options: object): IOPromise<any>;
    read(id: string | number, options: object): IOPromise<any>;
    destroy(id: string | number, options: object): IOPromise<any>;
    subscribe(events: IOEvents): IOPromise<any>;
    unsubscribe(events: IOEvents): void;
}
export interface IOEvents {
    updated?: (json: any) => void;
    removed?: (json: any) => void;
}
export declare function getOwnerEndpoint(self: any): IOEndpoint;
export declare function createIOPromise(initialize: InitIOPromise): IOPromise<any>;
export declare type InitIOPromise = (resolve: (x?: any) => void, reject: (x?: any) => void, abort?: (fn: Function) => void) => void;
export declare function startIO(self: IONode, promise: IOPromise<any>, options: object, thenDo: (json: any) => any): IOPromise<any>;
export declare function abortIO(self: IONode): void;
export declare function triggerAndBubble(eventSource: any, ...args: any[]): void;
