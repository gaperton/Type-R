import { NumericType } from "type-r";
export function Integer(x) {
    return x ? Math.round(x) : 0;
}
Integer._attribute = NumericType;
Number.integer = Integer;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
//# sourceMappingURL=integer.js.map