import { ChainableAttributeSpec, Record } from '../record';
import { CollectionReference } from './commons';
export declare function memberOf<R extends typeof Record>(this: void, masterCollection: CollectionReference, T?: R): ChainableAttributeSpec<typeof Record>;
