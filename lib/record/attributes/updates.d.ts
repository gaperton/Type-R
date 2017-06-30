import { Transactional, TransactionOptions, Owner } from "../../transactions";
export interface AttributesContainer extends Transactional, Owner {
    getClassName(): string;
    Attributes: CloneAttributesCtor;
    _attributes: AttributesDescriptors;
    attributes: AttributesValues;
    _previousAttributes: AttributesValues;
    _changedAttributes: AttributesValues;
}
export declare type CloneAttributesCtor = new (x: AttributesValues) => AttributesValues;
export interface AttributesValues {
    [name: string]: any;
}
export interface AttributesDescriptors {
    [name: string]: AttributeUpdatePipeline;
}
export interface AttributeUpdatePipeline {
    canBeUpdated(prev: any, next: any, options: TransactionOptions): any;
    transform: Transform;
    isChanged(a: any, b: any): boolean;
    handleChange: ChangeHandler;
    propagateChanges: boolean;
}
export declare type Transform = (next: any, options: TransactionOptions, prev: any, record: AttributesContainer) => any;
export declare type ChangeHandler = (next: any, prev: any, record: AttributesContainer) => void;
export declare function setAttribute(record: AttributesContainer, name: string, value: any): void;
export declare function begin(record: AttributesContainer): boolean;
export declare function markAsDirty(record: AttributesContainer, options: TransactionOptions): boolean;
