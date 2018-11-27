import { CollectionConstructor } from '../collection';
import { IOEndpoint, IOPromise } from '../io-tools';
import { Logger, LogLevel } from '../object-plus';
import { CloneOptions, Owner, Transaction, Transactional, TransactionalDefinition, TransactionOptions } from '../transactions';
import { ChildrenErrors } from '../validation';
import { AggregatedType, AnyType } from './metatypes';
import { IORecord } from './io-mixin';
import { AttributesConstructor, AttributesContainer, AttributesCopyConstructor, AttributesValues } from './updates';
export interface ConstructorOptions extends TransactionOptions {
    clone?: boolean;
}
export interface RecordDefinition extends TransactionalDefinition {
    idAttribute?: string;
    attributes?: AttributesValues;
    collection?: object;
    Collection?: typeof Transactional;
}
export declare class Record extends Transactional implements IORecord, AttributesContainer, Iterable<any> {
    static _metatype: typeof AggregatedType;
    static onDefine(definition: any, BaseClass: any): void;
    static Collection: CollectionConstructor;
    static DefaultCollection: CollectionConstructor;
    static from: (collectionReference: any) => any;
    static id: import("./attrDef").ChainableAttributeSpec;
    static readonly ref: import("./attrDef").ChainableAttributeSpec;
    static defaults(attrs: AttributesValues): typeof Record;
    static attributes: AttributesValues;
    _endpoints: {
        [name: string]: IOEndpoint;
    };
    save(options?: object): IOPromise<this>;
    destroy(options?: object): IOPromise<this>;
    _previousAttributes: {};
    previousAttributes(): AttributesValues;
    attributes: AttributesValues;
    readonly __inner_state__: AttributesValues;
    _changedAttributes: AttributesValues;
    readonly changed: AttributesValues;
    changedAttributes(diff?: {}): boolean | {};
    hasChanged(key?: string): boolean;
    previous(key: string): any;
    isNew(): boolean;
    has(key: string): boolean;
    unset(key: string, options?: any): any;
    clear(options?: any): this;
    getOwner(): Owner;
    idAttribute: string;
    id: string;
    _attributes: {
        [key: string]: AnyType;
    };
    _attributesArray: AnyType[];
    Attributes: AttributesConstructor;
    AttributesCopy: AttributesCopyConstructor;
    defaults(values?: {}): {};
    constructor(a_values?: any, a_options?: ConstructorOptions);
    initialize(values?: Partial<this>, options?: any): void;
    clone(options?: CloneOptions): this;
    _validateNested(errors: ChildrenErrors): number;
    get(key: string): any;
    set(values: any, options?: TransactionOptions): this;
    toJSON(options?: object): any;
    parse(data: any, options?: TransactionOptions): any;
    deepSet(name: string, value: any, options?: any): this;
    readonly collection: any;
    dispose(): void;
    _log(level: LogLevel, topic: string, text: string, props: object, a_logger?: Logger): void;
    getClassName(): string;
    _createTransaction(values: object, options: TransactionOptions): Transaction;
    forceAttributeChange: (key: string, options: TransactionOptions) => void;
    _onChildrenChange: (child: Transactional, options: TransactionOptions) => void;
    forEach(iteratee: (value?: any, key?: string) => void, context?: any): void;
    mapObject(a_fun: (value: any, key: any) => any, context?: any): object;
    [Symbol.iterator](): RecordEntriesIterator;
    entries(): RecordEntriesIterator;
    keys(): string[];
}
export declare class RecordEntriesIterator implements Iterator<[string, any]> {
    private readonly record;
    private idx;
    constructor(record: Record);
    next(): IteratorResult<[string, any]>;
}
