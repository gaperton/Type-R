import { Record, RecordDefinition } from './record/index.ts'
//import { Collection, CollectionDefinition, ICollection } from './collection/transaction'

export class Model extends Record {
    static Collection : typeof Collection

    // Returns owner without the key (usually it's collection)
    get collection() : ICollection {
        return this._ownerKey ? null : <any> this._owner;
    }

    static define( protoProps : RecordDefinition, staticProps ){
        Record.define( protoProps, staticProps );

        const BaseCollection : CollectionConstructor = Object.getPrototypeOf( this.prototype ).constructor.Collection;

        const collection = protoProps && protoProps.collection;


        let CollectionConstructor : CollectionConstructor;

        // If collection constructor is specified, just take it. 
        if( typeof collection === 'function' ) {
            CollectionConstructor = <CollectionConstructor> collection;
        } 
        // Same when Collection is specified as static class member.  
        else if( this.Collection !== BaseCollection ){
            CollectionConstructor = this.Collection;
        } 
        // Otherwise we need to create new Collection type...
        else{
            // ...which must extend Collection of our base Record.
            CollectionConstructor = class Collection extends BaseCollection {};
            CollectionConstructor.define( <CollectionDefinition> collection );
        }

        // Link collection with the record
        CollectionConstructor.prototype.Record = this;
        this.Collection = CollectionConstructor;

        return this;
    }
}