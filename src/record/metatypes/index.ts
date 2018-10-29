import { PrimitiveType, NumericType, ObjectType, ImmutableClassType, FunctionType, ArrayType } from './basic';
import { DateType } from './date';
import { AnyType, AttributeOptions } from './any';

export * from './any';
export * from './basic';
export * from './date';
export * from './owned';
export * from './shared';

const builtins : Function[] = [ String, Number, Boolean, Date, Object, Array, Function ],
      metatypes = [ PrimitiveType, NumericType, PrimitiveType, DateType, ObjectType, ArrayType, FunctionType ];

export function getMetatype( Ctor : Function ){
    return ( Ctor as any )._attribute || resolveBuiltins( Ctor );
}

AnyType.create = ( options : AttributeOptions, name : string ) => {
    const type = options.type,
          AttributeCtor = options._attribute || ( type ? getMetatype( type ): AnyType );

    return new AttributeCtor( name, options );
}

function resolveBuiltins( Ctor : Function ){
    const idx = builtins.indexOf( Ctor );
    return idx < 0 ? ImmutableClassType : metatypes[ idx ];
}