interface RecordCtor extends IExtendable {
    new ( values? : {}, options? : CtorOptions )
    Collection : CollectionCtor
    attributes( spec ) : RecordCtor
}


type RecordOptions = {
    parse? : Boolean
    deep? : Boolean 
}

interface AttributesCtor {
    new ( values : {} ) 
}

interface IExtendable {
    define( spec, statics )
    extend( spec, statics )
}

interface IRecord {
    constructor : RecordCtor;
    
    Attributes : AttributesCtor
    initialize( values? : Object, options? : RecordOptions )
    clone( options? : { deep? : Boolean } ) : this;
}

type CollectionArg = {} | {}[] | IRecord | IRecord[] 

interface CtorOptions {
    parse? : Boolean;
    deep? : Boolean;
}

interface CollectionCtor {
    new ( models? : CollectionArg, options? : CtorOptions );
}



interface ICollection {
    constructor : CollectionCtor;
    Record : IRecord;
    initialize( models? : CollectionArg, options? : CtorOptions ); 
}

class Collection implements ICollection {
    constructor( records? : CollectionArg, options? : CtorOptions ){
        
    }
    
    initialize( records? : CollectionArg, options? : CtorOptions ){
        
    }
}