import {DateType, ChainableAttributeSpec} from "type-r";
import {MicrosoftDate, Timestamp} from "types";

Date._attribute = DateType;

declare global {
    interface DateConstructor {
        microsoft : ChainableAttributeSpec
        timestamp : ChainableAttributeSpec
    }
}

Object.defineProperties( Date, {
    microsoft: {
        get() {
            return new ChainableAttributeSpec( {
                type      : Date,
                _attribute: MicrosoftDate
            } )
        }
    },

    timestamp: {
        get() {
            return new ChainableAttributeSpec( {
                type      : Date,
                _attribute: Timestamp
            } )
        }
    }
} );