import { CollectionConstructor } from '../collection';
import { ChainableAttributeSpec, Record } from '../record';
import { CollectionReference } from './commons';
export declare function subsetOf<X extends CollectionConstructor<R>, R extends Record>(this: void, masterCollection: CollectionReference, T?: X): ChainableAttributeSpec<X>;
