import { Collection } from '../collection';
import { ChainableAttributeSpec } from '../record';
import { CollectionReference } from './commons';
export declare function subsetOf<X extends typeof Collection>(this: void, masterCollection: CollectionReference, T?: X): ChainableAttributeSpec<X>;
