import { Class, IExtendable } from './class.ts'

export type CollectionRef = string | ( () => ICollection ) | ICollection

export interface CCollection extends IExtendable {
    new ( records? : Object[] | IRecord[], options? : {} ) : void;
    subsetOf( ref : CollectionRef ) : IAttribute
}

export interface CRecord extends IExtendable {
    new ( attrs? : {}, options? : {} ) : void;
    Collection : CCollection
    from( ref : CollectionRef ) : IAttribute
}

export interface IAttribute {

}

export interface IRecordSpec {
    attributes : { [ name : string ] : IAttribute | Function | any }
}

export interface IRecord extends Class {
    Attributes : AttributesCtor
    attributes : {}
    initialize( values? : Object, options? : {} )
    clone( options? : { deep? : Boolean } ) : this;
}

export interface ICollection extends Class {
    Record : CRecord

    initialize( models? : CollectionArg, options? : {} )

    add( models : CollectionArg, options? : {} )
    remove( models : CollectionArg, options? : {} )
    set( models : CollectionArg, options? : {} )
}

interface AttributesCtor {
    new ( values : {} ) : {};
}

type CollectionArg = Object[] | IRecord[]