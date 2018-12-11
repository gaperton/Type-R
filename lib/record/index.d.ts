import { Record } from './record';
export * from './attrDef';
export * from './metatypes';
export { Record };
export declare function auto(value: any): PropertyDecorator;
export declare function auto(proto: object, attrName: string): void;
