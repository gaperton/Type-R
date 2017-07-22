import { AttributesContainer, AttributeUpdatePipeline, RecordTransaction } from './updates';
import { tools } from '../../object-plus';
import { TransactionOptions } from '../../transactions';
declare global  {
    interface Function {
        _attribute: typeof AnyType;
    }
}
export declare type Transform = (next: any, options: TransactionOptions, prev: any, record: AttributesContainer) => any;
export declare type ChangeHandler = (next: any, prev: any, record: AttributesContainer) => void;
export interface AttributeOptions {
    _attribute?: typeof AnyType;
    validate?: (record: AttributesContainer, value: any, key: string) => any;
    isRequired?: boolean;
    changeEvents?: boolean;
    type?: Function;
    value?: any;
    parse?: AttributeParse;
    toJSON?: AttributeToJSON;
    getHooks?: GetHook[];
    transforms?: Transform[];
    changeHandlers?: ChangeHandler[];
    _onChange?: ChangeAttrHandler;
}
export declare type GetHook = (value: any, key: string) => any;
export declare type AttributeToJSON = (value: any, key: string) => any;
export declare type AttributeParse = (value: any, key: string) => any;
export declare type ChangeAttrHandler = ((value: any, attr: string) => void) | string;
export declare class AnyType implements AttributeUpdatePipeline {
    name: string;
    static create(options: AttributeOptions, name: string): AnyType;
    canBeUpdated(prev: any, next: any, options: TransactionOptions): any;
    transform(value: any, options: TransactionOptions, prev: any, model: AttributesContainer): any;
    convert(value: any, options: TransactionOptions, prev: any, model: AttributesContainer): any;
    isChanged(a: any, b: any): boolean;
    handleChange(next: any, prev: any, model: AttributesContainer): void;
    create(): any;
    clone(value: any, record: AttributesContainer): any;
    dispose(record: AttributesContainer, value: any): void;
    validate(record: AttributesContainer, value: any, key: string): void;
    toJSON(value: any, key: any): any;
    createPropertyDescriptor(): PropertyDescriptor | void;
    value: any;
    static defaultValue: any;
    type: Function;
    parse: (value, key: string) => any;
    initialize(name: string, options: any): void;
    options: AttributeOptions;
    doInit(record: AttributesContainer, value: any, options: TransactionOptions): any;
    doUpdate(record: AttributesContainer, value: any, options: any, nested?: RecordTransaction[]): boolean;
    initAttribute(record: AttributesContainer, value: any, options: TransactionOptions): any;
    updateAttribute(value: any, options: any, record: any, nested: any[]): boolean;
    propagateChanges: boolean;
    _log(level: tools.LogLevel, text: string, value: any, record: AttributesContainer): void;
    defaultValue(): any;
    constructor(name: string, a_options: AttributeOptions);
    getHook: (value, key: string) => any;
    get: (value, key: string) => any;
}
