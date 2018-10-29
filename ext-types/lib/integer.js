import { NumericType } from "type-r";
export function Integer(x) {
    return x ? Math.round(x) : 0;
}
Integer._metatype = NumericType;
//# sourceMappingURL=integer.js.map