import {type, ChainableAttributeSpec, AttributeCheck} from 'type-r'

const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

export function isIPAddress( x : string ) {
    return !x || ipPattern.test( x );
}

(isIPAddress as AttributeCheck).error = 'Not valid IP address'

export const IPAddress : ChainableAttributeSpec = type( String ).check( isIPAddress, void 0 );