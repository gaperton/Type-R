import { Class, IClassSpec, IExtendable } from './class.ts'

export type CollectionRef = string | ( () => ICollection ) | ICollection

export interface CCollection extends IExtendable {
    new ( records? : Object[] | IRecord[], options? : {} ) : void;
    subsetOf( ref : CollectionRef ) : IAttribute
}

export interface CRecord extends IExtendable {
    new ( attrs? : {}, options? : {} ) : IRecord;
    Collection : CCollection
    from( ref : CollectionRef ) : IAttribute
    define( spec? : IRecordSpec, statics? : {} )
}

export interface IAttribute {

}

export interface IRecordSpec extends IClassSpec {
    attributes? : { [ name : string ] : IAttribute | Function | any }
}

interface IRecordChanges {
    changed : {}
    hasChanged( key? : string ) : boolean
    previousAttributes() : {}
    changedAttributes( diff? : {} ) : {}
    previous( attribute: string ): any;
}

interface Options {
    silent?: boolean
}

interface ISerializable {
    parse( response: any, options?: {} ): any;
    toJSON( options?: {} ): any;
}

interface ITransactional {
    set( data : {}, options? : Options )
    transaction( self : ( self : this ) => void, options? : Options ) : void
    createTransaction( data : {}, options? : Options ) : ITransaction
}

interface ITransaction {
    commit( options? : Options ) : void
}

export interface IRecord extends Class {
    idAttribute: string;
    id : string | number
    cid: string;

    constructor(attributes?: any, options?: any);

    Attributes : AttributesCtor
    attributes : Attributes
    defaults( attrs? : {} )
    initialize( values? : Object, options? : {} )
    clone( options? : { deep? : Boolean } ) : this

    collection : ICollection
    getOwner() : IRecord
}

export interface ICollection extends Class {
    Record : CRecord

    initialize( models? : CollectionArg, options? : {} )

    add( models : CollectionArg, options? : {} )
    remove( models : CollectionArg, options? : {} )
    set( models : CollectionArg, options? : {} )
}

interface AttributesCtor {
    new ( values : {} ) : Attributes;
}

interface Attributes {}

type CollectionArg = Object[] | IRecord[]
