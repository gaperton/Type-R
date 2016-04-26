type CollectionArg = {} | {}[] | IRecord | IRecord[] 

interface CtorOptions {
    parse? : Boolean;
    deep? : Boolean;
}

interface CollectionCtor {
    new ( models? : CollectionArg, options? : CtorOptions );
}


interface RecordCtor {
    new ( values? : {}, options? : CtorOptions );
    Collection : CollectionCtor
}

interface IRecord {
    constructor : RecordCtor;
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