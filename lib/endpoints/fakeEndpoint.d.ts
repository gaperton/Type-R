import { IOPromise } from '../io-tools';
export default abstract class FakeEndpoint {
    delay: number;
    constructor(delay: number);
    resolve(value: any): IOPromise<any>;
    reject(value: any): IOPromise<any>;
}
