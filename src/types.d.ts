/**
 * Class Types Declarations
 */

interface ClassCtor {
    new ( ...args : any[] ) : {}
    define( spec? : Specification ) : this
    mixins( ...mixins : Mixin[] ) : this
    mixinRules( rules : MixinRules ) : this
}

interface Specification {
    properties? : PropertyDescriptorMap
    mixins? : Mixin[]
    mixinRules? : MixinRules
    [ name : string ] : any
}

type Mixin = Object

interface MixinRules {
    [ propName : string ] : MergeRule
}

type MergeRule = 'merge' | 'pipe' | 'sequence' | 'reverse' | 'some' | 'every'  

/**
 * Record Types declaration
 */

interface RecordCtor extends ClassCtor {
    new ( values? : {}, options? : RecordOptions ) : IRecord
    prototype : IRecord
    Collection : CollectionCtor
}

interface RecordOptions {
    parse? : boolean
    deep? : boolean 
}

interface IRecord {    
    // precompiled loop through attributes function 
    forEachAttr( data : {}, iteratee : ( value, key : string ) => void ) : void
    
    // precompiled defaults function
    defaults( values? : {} ) : {}

    // working structures
    cid : string
    
    idAttribute : string 
    id : string | number | void
         
    constructor : RecordCtor
    initialize( values? : {}, options? : RecordOptions ) : void
    
    clone( options? : { deep? : boolean } ) : this
    
    set( values : {}, options? : RecordOptions ) : this
    
    createTransaction( values : {}, options? : RecordOptions ) : ITransaction
    transaction( func : ( IRecord ) => void ) : void
    
    parse( resp : {} ) : {}
    toJSON() : {}
}

interface IAttribute {
    name : string 
}

/**
 * Collection Types declaration
 */

type CollectionArg = {} | {}[] | IRecord | IRecord[] 

interface CtorOptions {
    parse? : Boolean;
    deep? : Boolean;
}

interface CollectionCtor {
    new ( models? : CollectionArg, options? : CtorOptions ) : ICollection;
    prototype : ICollection;
}

interface SetOptions extends CtorOptions {
    merge? : Boolean
    sort? : Boolean
}

interface AddOptions extends SetOptions {
    at? : number;
} 

interface ICollection {
    Record : RecordCtor;
    
    initialize( models? : CollectionArg, options? : CtorOptions );
    
    parse( data : {} ) : {};
    toJSON() : {};
    
    set( models? : CollectionArg, options? : SetOptions )
    reset( models? : CollectionArg, options? : SetOptions )
    add( models? : CollectionArg, options? : AddOptions )
    remove( models? : CollectionArg, options? : CtorOptions )
}

class Collection implements ICollection {
    constructor( records? : CollectionArg, options? : CtorOptions ){
        
    }
    
    Record : RecordCtor;
    
    initialize( records? : CollectionArg, options? : CtorOptions ){
        
    }
}