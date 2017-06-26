import { Record } from '../transaction';
import { AnyType } from './generic';
import { Transactional, TransactionOptions } from '../../transactions';
import { ValidationError } from '../../validation';
export declare class AggregatedType extends AnyType {
    type: typeof Transactional;
    clone(value: Transactional): Transactional;
    toJSON(x: any): any;
    canBeUpdated(prev: Transactional, next: any, options: TransactionOptions): any;
    convert(value: any, options: TransactionOptions, prev: any, record: Record): Transactional;
    dispose(record: Record, value: Transactional): void;
    validate(record: Record, value: Transactional): ValidationError;
    create(): Transactional;
    initialize(options: any): void;
    _handleChange(next: Transactional, prev: Transactional, record: Record): void;
}
