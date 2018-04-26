import {DateType, ChainableAttributeSpec} from "type-r";
import {MicrosoftDate, Timestamp, Integer} from "ext-types";

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

Number.integer = Integer;

if( typeof window !== 'undefined' ) {
    window.Integer = Number.integer;
}