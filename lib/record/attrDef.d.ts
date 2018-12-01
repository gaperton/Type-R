import { IOEndpoint } from '../io-tools';
import { EventsDefinition } from '../object-plus';
import { AttributeOptions, Parse, AnyType } from './metatypes';
export interface AttributeCheck {
    (value: any, key: string): boolean;
    error?: any;
}
export declare class ChainableAttributeSpec<F extends Function> {
    options: AttributeOptions & {
        type?: F;
    };
    constructor(options: AttributeOptions);
    check(check: AttributeCheck, error?: any): this;
    readonly asProp: (proto: object, name: string) => void;
    readonly as: (proto: object, name: string) => void;
    readonly isRequired: this;
    readonly required: this;
    endpoint(endpoint: IOEndpoint): this;
    watcher(ref: string | ((value: any, key: string) => void)): this;
    parse(fun: Parse): this;
    toJSON(fun: any): this;
    get(fun: any): this;
    set(fun: any): this;
    changeEvents(events: boolean): this;
    events(map: EventsDefinition): this;
    readonly has: this;
    metadata(options: AttributeOptions): this;
    value(x: any): this;
    static from(spec: any): ChainableAttributeSpec<any>;
}
export declare function type<F extends Function>(this: void, type: ChainableAttributeSpec<F> | F, value?: any): ChainableAttributeSpec<F>;
export declare function createSharedTypeSpec(Constructor: Function, Attribute: typeof AnyType): void;
