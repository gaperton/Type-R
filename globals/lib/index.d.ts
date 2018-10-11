import { Integer } from "type-r/ext-types";
import { ChainableAttributeSpec } from "type-r";
declare global {
    interface Function {
        value: (x: any) => ChainableAttributeSpec;
        isRequired: ChainableAttributeSpec;
        asProp: PropertyDecorator;
        has: ChainableAttributeSpec;
    }
    interface DateConstructor {
        microsoft: ChainableAttributeSpec;
        timestamp: ChainableAttributeSpec;
    }
    interface Window {
        Integer: Function;
    }
    interface NumberConstructor {
        integer: typeof Integer;
    }
}
