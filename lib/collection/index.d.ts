import { IOPromise } from '../io-tools';
import { EventMap, EventsDefinition, Logger, LogLevel, MixableConstructor } from '../object-plus';
import { AggregatedType, ChainableAttributeSpec, Record } from '../record';
import { CloneOptions, Transactional, TransactionalDefinition, TransactionOptions } from '../transactions';
import { AddOptions } from './add';
import { CollectionCore, CollectionTransaction } from './commons';
export declare type GenericComparator = string | ((x: Record) => number) | ((a: Record, b: Record) => number);
export interface CollectionOptions extends TransactionOptions {
    comparator?: GenericComparator;
    model?: typeof Record;
}
export declare type Predicate<R> = ((val: R, key?: number) => boolean) | Partial<R>;
export interface CollectionDefinition extends TransactionalDefinition {
    model?: typeof Record;
    itemEvents?: EventsDefinition;
    _itemEvents?: EventMap;
}
export interface CollectionConstructor<R extends Record = Record> extends MixableConstructor {
    new (records?: Partial<R> | Partial<R>[], options?: CollectionOptions): Collection<R>;
    prototype: Collection<R>;
    Refs: CollectionConstructor<R>;
    subsetOf(C: Collection<R> | string | (() => Collection<R>)): ChainableAttributeSpec<any>;
}
export declare class Collection<R extends Record = Record> extends Transactional implements CollectionCore, Iterable<R> {
    _shared: number;
    _aggregationError: R[];
    static Subset: typeof Collection;
    static Refs: typeof Collection;
    static _SubsetOf: typeof Collection;
    createSubset(models: ElementsArg<R>, options: any): Collection<R>;
    static onExtend(BaseClass: typeof Transactional): void;
    static onDefine(definition: CollectionDefinition, BaseClass: any): void;
    static subsetOf: (collectionReference: any) => any;
    _itemEvents: EventMap;
    models: R[];
    readonly __inner_state__: R[];
    _byId: {
        [id: string]: R;
    };
    comparator: GenericComparator;
    getStore(): Transactional;
    _store: Transactional;
    _comparator: (a: R, b: R) => number;
    _onChildrenChange(record: R, options?: TransactionOptions, initiator?: Transactional): void;
    get(objOrId: string | {
        id?: string;
        cid?: string;
    }): R;
    each(iteratee: (val: R, key?: number) => void, context?: any): void;
    updateEach(iteratee: (val: R, key?: number) => void): void;
    _validateNested(errors: {}): number;
    model: typeof Record;
    idAttribute: string;
    constructor(records?: ElementsArg<R>, options?: CollectionOptions, shared?: number);
    initialize(): void;
    first(): R;
    last(): R;
    at(a_index: number): R;
    clone(options?: CloneOptions): this;
    toJSON(options?: object): any;
    set(elements?: ElementsArg<R>, options?: TransactionOptions): this;
    liveUpdates(enabled: LiveUpdatesOption): IOPromise<this>;
    _liveUpdates: object;
    fetch(a_options?: {
        liveUpdates?: LiveUpdatesOption;
    } & TransactionOptions): IOPromise<this>;
    dispose(): void;
    reset(a_elements?: ElementsArg<R>, options?: TransactionOptions): R[];
    add(a_elements: ElementsArg<R>, options?: AddOptions): any;
    remove(recordsOrIds: any, options?: CollectionOptions): R[] | R;
    _createTransaction(a_elements: ElementsArg<R>, options?: TransactionOptions): CollectionTransaction | void;
    static _metatype: typeof AggregatedType;
    pluck<K extends keyof R>(key: K): R[K][];
    sort(options?: TransactionOptions): this;
    unset(modelOrId: R | string, options?: any): R;
    modelId(attrs: {}): any;
    toggle(model: R, a_next?: boolean): boolean;
    _log(level: LogLevel, topic: string, text: string, value: object, a_logger?: Logger): void;
    getClassName(): string;
    readonly length: number;
    push(model: ElementsArg<R>, options?: CollectionOptions): any;
    pop(options?: CollectionOptions): R;
    unshift(model: ElementsArg<R>, options?: CollectionOptions): any;
    shift(options?: CollectionOptions): R;
    slice(begin?: number, end?: number): R[];
    indexOf(modelOrId: string | Partial<R>): number;
    filter(iteratee: Predicate<R>, context?: any): R[];
    find(iteratee: Predicate<R>, context?: any): R;
    some(iteratee: Predicate<R>, context?: any): boolean;
    forEach(iteratee: (val: R, key?: number) => void, context?: any): void;
    [Symbol.iterator](): IterableIterator<R>;
    values(): IterableIterator<R>;
    entries(): IterableIterator<[number, R]>;
    every(iteratee: Predicate<R>, context?: any): boolean;
    includes(idOrObj: string | Partial<R>): boolean;
    map<T>(iteratee: (val: R, key?: number) => T, context?: any): T[];
    reduce<T>(iteratee: (previousValue: R, currentValue: R, currentIndex?: number) => R): R;
    reduce<T>(iteratee: (previousValue: T, currentValue: R, currentIndex?: number) => T, init?: any): T;
}
export declare type LiveUpdatesOption = boolean | ((x: any) => boolean);
export declare type ElementsArg<R = Record> = Partial<R> | Partial<R>[];
