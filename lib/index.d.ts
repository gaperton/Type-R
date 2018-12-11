<<<<<<< HEAD
import { Mixable as Class, MixableConstructor } from './object-plus/';
import { ChainableAttributeSpec, Record as Model } from './record';
=======
import { Mixable as Class } from './object-plus/';
import { Record as Model } from './record';
>>>>>>> develop
export * from './collection';
export * from './io-tools';
export * from './object-plus';
export * from './record';
export * from './relations';
export * from './transactions';
export { Model, Class };
export declare const on: any, off: any, trigger: any, once: any, listenTo: any, stopListening: any, listenToOnce: any;
<<<<<<< HEAD
export interface RecordConstructor<A> extends MixableConstructor {
    new (attrs?: Partial<A>, options?: object): Model & A;
    prototype: Model;
}
export declare type AttrTypes<A> = {
    [key in keyof A]: A[key] extends (...args: any[]) => any ? ReturnType<A[key]> : InstanceType<A[key] extends new (...args: any[]) => any ? A[key] : A[key] extends ChainableAttributeSpec<any> ? A[key]['options']['type'] : new () => A[key]>;
};
export declare function attributes<D>(attrDefs: D): RecordConstructor<AttrTypes<D>>;
export declare function value(x: any): ChainableAttributeSpec<any>;
=======
export declare function attributes(attrDefs: any): typeof Model;
>>>>>>> develop
export declare function transaction<F extends Function>(method: F): F;
