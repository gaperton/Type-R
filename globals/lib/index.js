import { MicrosoftDate, Timestamp, Integer } from "ext-types";
Object.defineProperties(Date, {
    microsoft: {
        value: MicrosoftDate
    },
    timestamp: {
        value: Timestamp
    }
});
Number.integer = Integer;
if (typeof window !== 'undefined') {
    window.Integer = Integer;
}
//# sourceMappingURL=index.js.map