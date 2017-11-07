import { IOEndpoint, IOPromise, IONode } from '../io-tools';
export interface IORecord extends IONode {
    getEndpoint(): IOEndpoint;
    save(options?: object): IOPromise<any>;
    fetch(options?: object): IOPromise<any>;
    destroy(options?: any): IOPromise<any>;
    toJSON(): any;
    isNew(): boolean;
    id: string | number;
    set(json: object, options: object): any;
}
export declare const IORecordMixin: {
    getEndpoint(this: IORecord): IOEndpoint;
    save(this: IORecord, options?: object): IOPromise<any>;
    fetch(options?: {}): IOPromise<any>;
    fetchAttributes(options?: {}): IOPromise<any>;
    destroy(options?: {}): IOPromise<any>;
};
