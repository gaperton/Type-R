import { IOEndpoint } from '../../io-tools';
import { eventsApi } from '../../object-plus';
import { AnyType } from './any';
import { ConstructorsMixin } from './updates';
export * from './any';
export * from './attrDef';
export * from './basic';
export * from './date';
export * from './owned';
export * from './shared';
export * from './updates';
export interface RecordAttributesMixin extends ConstructorsMixin {
    _attributes: AttributeDescriptors;
    _attributesArray: AnyType[];
    properties: PropertyDescriptorMap;
    _localEvents?: eventsApi.EventMap;
    _endpoints: {
        [name: string]: IOEndpoint;
    };
}
export interface AttributeDescriptors {
    [name: string]: AnyType;
}
export default function (attributesDefinition: object, baseClassAttributes: AttributeDescriptors): RecordAttributesMixin;
export declare function createAttribute(spec: any, name: string): AnyType;
export declare function createSharedTypeSpec(Constructor: Function, Attribute: typeof AnyType): void;
