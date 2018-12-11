import { CollectionConstructor } from '../collection';
import { ChainableAttributeSpec, Record } from '../record';
export declare function subsetOf<X extends CollectionConstructor<R>, R extends Record>(path: string, T?: X): ChainableAttributeSpec<X>;
