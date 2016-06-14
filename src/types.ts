import { Class } from './class.ts'

export interface ClassItf {
    define( spec? : {}, statics? : {} )
    extend( spec? : {}, statics? : {} )
}

export interface CollectionCtor extends ClassItf {
    new ( records? : Object[], options? : {} ) : CollectionItf;
}

export interface RecordCtor extends ClassItf {
    new ( attrs? : {}, options? : {} ) : RecordItf;
    Collection : CollectionCtor
}

export interface RecordItf {
    Attributes : AttributesCtor
    attributes : {}
    initialize( values? : Object, options? : {} )
    clone( options? : { deep? : Boolean } ) : this;
}

export interface CollectionItf {
    Record : RecordCtor

    initialize( models? : CollectionArg, options? : {} )

    add( models : CollectionArg, options? : {} )
    remove( models : CollectionArg, options? : {} )
    set( models : CollectionArg, options? : {} )
}

interface AttributesCtor {
    new ( values : {} ) : {};
}

type CollectionArg = Object[] | RecordItf[]