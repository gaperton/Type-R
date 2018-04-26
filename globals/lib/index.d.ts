import { ChainableAttributeSpec } from "type-r";
declare global  {
    interface DateConstructor {
        microsoft: ChainableAttributeSpec;
        timestamp: ChainableAttributeSpec;
    }
}
declare global  {
    interface Window {
        Integer: Function;
    }
}
