import { DateType, ChainableAttributeSpec } from "type-r";
export declare class MicrosoftDateType extends DateType {
    convert(next: any): any;
    toJSON(value: any): string;
}
export declare const MicrosoftDate: ChainableAttributeSpec;
export declare const Timestamp: ChainableAttributeSpec;
