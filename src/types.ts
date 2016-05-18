interface RecordCtor {
    new ( values? : {}, options? : CtorOptions );
    Collection : CollectionCtor
}


type RecordOptions = {
    parse? : Boolean
    deep? : Boolean 
}

interface AttributesCtor {
    new ( values : {} ) 
}

interface IRecord {
    constructor : RecordCtor;
    
    Attributes : AttributesCtor
    initialize( values? : Object, options? : RecordOptions )
    clone( options? : { deep? : Boolean } ) : this;
    defaults
    
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