import {NumericType} from "type-r";

/**
 * Add Number.integer attrubute type
 */
declare global {
    // interface NumberConstructor {
    //     integer : Function
    // }

    interface Window {
        Integer : Function;
    }
}

export function Integer( x ) {
    return x ? Math.round( x ) : 0;
}

(Integer as any)._attribute = NumericType;
Number.integer = Integer;

if( typeof window !== 'undefined' ) {
    window.Integer = Number.integer;
}