import { Class, ClassDefinition, Extendable } from './class.ts'

/**********************
 * Record Definitions
 */

export interface RecordConstructor extends Extendable {
    new ( attrs? : {}, options? : {} ) : IRecord;
    Collection : CollectionConstructor
    from( ref : CollectionRef ) : IAttribute
    define( spec? : RecordDefinition, statics? : {} )
}

export interface RecordDefinition extends ClassDefinition {
    attributes? : { [ name : string ] : TypeSpec | ( new ( x : any ) => any ) | any }
    collection? : CollectionDefinition | CollectionConstructor
}

export interface TypeSpec {

}

export type CollectionRef = string | ( () => ICollection ) | ICollection

export interface CollectionConstructor extends Extendable {
    new ( records? : Object[] | IRecord[], options? : {} ) : ICollection;
    subsetOf( ref : CollectionRef ) : IAttribute
}


export interface IAttribute {

}


interface RecordChanges {
    changed : {}
    hasChanged( key? : string ) : boolean
    previousAttributes() : {}
    changedAttributes( diff? : {} ) : {}
    previous( attribute: string ): any;
}

interface Options {
    silent?: boolean
}

interface Serializable {
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

export interface IRecord extends Class, Events {
    idAttribute: string;
    id : string | number
    cid: string;

    Attributes : AttributesCtor
    attributes : Attributes
    defaults( attrs? : {} )
    initialize( values? : Object, options? : {} )
    clone( options? : { deep? : Boolean } ) : this

    collection : ICollection
    getOwner() : IRecord
}

export interface CollectionDefinition extends ClassDefinition {
    Record? : RecordConstructor
}

export interface ICollection extends Class {
    Record : RecordConstructor

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


export interface EventsHash {
    [events : string]: string | Function;
}

export interface Events{
    trigger(eventName: string, ...args: any[]): any;

    on(eventName: string, callback: Function, context?: any): any;
    on(eventMap: EventsHash): any;
    listenTo(object: any, events: EventsHash ): any;
    listenTo(object: any, events: string, callback: Function): any;

    once(events: string, callback: Function, context?: any): any;
    listenToOnce(object: any, events: string, callback: Function): any;

    off(eventName?: string, callback?: Function, context?: any): any;
    stopListening(object?: any, events?: string, callback?: Function): any;
}
