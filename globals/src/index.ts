import { Integer, MicrosoftDate, Timestamp } from "ext-types";
import { ChainableAttributeSpec } from "type-r";

/*
 * dates
 */
declare global {
    interface DateConstructor {
        microsoft : ChainableAttributeSpec
        timestamp : ChainableAttributeSpec
    }
}

Object.defineProperties( Date, {
    microsoft: {
        value: MicrosoftDate
    },

    timestamp: {
        value: Timestamp
    }
} );


/*
 * integer
 */
declare global {
    interface Window {
        Integer : Function;
    }
}

(Number as any).integer = Integer;

if( typeof window !== 'undefined' ) {
    window.Integer = Integer;
}