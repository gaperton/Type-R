import { Integer } from "type-r/ext-types";
import { ChainableAttributeSpec } from "type-r";
declare global {
    interface Function {
        value: (x: any) => ChainableAttributeSpec<this>;
        isRequired: ChainableAttributeSpec<this>;
        asProp: PropertyDecorator;
        has: ChainableAttributeSpec<this>;
    }
    interface DateConstructor {
        microsoft: ChainableAttributeSpec<this>;
        timestamp: ChainableAttributeSpec<this>;
    }
    interface Window {
        Integer: Function;
    }
    interface NumberConstructor {
        integer: typeof Integer;
    }
}
