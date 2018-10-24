import { AnyType } from './any';
import { ChainableAttributeSpec } from './attrDef';

export * from './any';
export * from './attrDef';
export * from './basic';
export * from './date';
export * from './mixin';
export * from './owned';
export * from './shared';
export * from './updates';

export function createSharedTypeSpec( Constructor : Function, Attribute : typeof AnyType ){
    if( !Constructor.hasOwnProperty( 'shared' ) ){
        Object.defineProperty( Constructor, 'shared', {
            get(){
                return new ChainableAttributeSpec({
                    value : null,
                    type : Constructor,
                    _attribute : Attribute
                });
            }
        });
    }
}