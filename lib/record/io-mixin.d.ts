import { IOOptions, IOEndpoint, IOPromise, IONode } from '../io-tools';
export interface IORecord extends IONode {
    getEndpoint(): IOEndpoint;
    save(options?: IOOptions): IOPromise<any>;
    fetch(options?: IOOptions): IOPromise<any>;
    destroy(options?: IOOptions): IOPromise<any>;
    toJSON(): any;
    isNew(): boolean;
    id: string | number;
    set(json: object, options: object): any;
}
export declare const IORecordMixin: {
    save(this: IORecord, options?: IOOptions): IOPromise<any>;
    fetch(options?: IOOptions): IOPromise<any>;
    destroy(options?: IOOptions): IOPromise<any>;
};
