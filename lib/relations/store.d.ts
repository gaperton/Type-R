import { Record } from '../record';
import { IOPromise } from '../io-tools';
export declare class Store extends Record {
    getStore(): Store;
    get(name: string): any;
    static global: Store;
}
export declare class IOGroupStore extends Store {
    fetch(options?: {}): IOPromise<any>;
}
