import { Collection, CollectionOptions } from '../collection'
import { tools, define } from '../object-plus'
import { Record, TransactionalType } from '../record'
import { parseReference, CollectionReference } from './commons'
import { ChainableAttributeSpec } from '../record'
import { Transactional, TransactionOptions } from '../transactions'

const { fastDefaults } = tools;

type RecordsIds = ( string | number )[];

Object.defineProperty( Collection, 'Subset', {
    get : function(){ return this._Subset || ( this._Subset = defineSubsetCollection( this ) ); }
} );

Collection.subsetOf = function subsetOf( masterCollection : CollectionReference ) : ChainableAttributeSpec {
    return this.Subset.of( masterCollection );
};

/** @private */
function subsetOptions( options : CollectionOptions, parseIds : boolean ){
    const subsetOptions = { parse : parseIds, merge : false };
    if( options ) fastDefaults( subsetOptions, options );
    return subsetOptions;
}

class SubsetOfType extends TransactionalType {
    convert( value : any, options : TransactionOptions, record : Record ) : Transactional {
        // Invoke class factory to handle abstract classes
        return value == null || value instanceof this.type ? value : new this.type( value, options, record, true );
    }

    create() : Transactional {
        return new (<any>this.type)( void 0, void 0, void 0, true ); // this the subclass of Transactional here.
    }
}

function defineSubsetCollection( CollectionConstructor : typeof Collection ) {
    @define({
        _aggregates : false 
    })
    class SubsetOfCollection extends CollectionConstructor {
        static of( masterCollection : CollectionReference ){
            const getMasterCollection = parseReference( masterCollection ),
            typeSpec = new ChainableAttributeSpec({
                type : this,
                _attribute : SubsetOfType
            });

            typeSpec.get(
                function( refs ){
                    !refs || refs.resolvedWith || refs.resolve( getMasterCollection( this ) );
                    return refs;
                }
            );

            return typeSpec;
        }

        _validateNested( errors : {} ) : number { return 0; }

        refs : any[];
        resolvedWith : Collection = null;

        constructor( recordsOrIds?, options?, owner?, public _parseIds? : boolean ){
            super( recordsOrIds, subsetOptions( options, _parseIds ) );
        }

        add( elements, options? ){
            return super.add( elements, subsetOptions( options, this._parseIds ) );
        }

        reset( elements?, options? ){
            return super.reset( elements, subsetOptions( options, this._parseIds ) );
        }

        _createTransaction( elements, options? ){
            return super._createTransaction( elements, subsetOptions( options, this._parseIds ) );
        }

        // Serialized as an array of model ids.
        toJSON() : RecordsIds {
            // Don't serialize plain Subset.
            if( this._parseIds ){
                return this.refs ?
                    this.refs.map( objOrId => objOrId.id || objOrId ) :
                    this.models.map( model => model.id );
            }
        }

        // Must be shallow copied on clone.
        clone( owner? ){
            var Ctor = (<any>this).constructor,
                copy = new Ctor( this.models, {
                    model : this.model,
                    comparator : this.comparator
                }, owner, this._parseIds );

            copy.resolvedWith = this.resolvedWith;
            copy.refs         = this.refs;

            return copy;
        }

        // Parse is always invoked. Careful, performance-sensitive.
        parse( raw : any ) : Record[] {
            const { resolvedWith } = this,
                elements = Array.isArray( raw ) ? raw : [ raw ],
                records : Record[] = [];                            

            if( resolvedWith ){
                for( let element of elements ){
                    const record = resolvedWith.get( element );
                    if( record ) records.push( record );
                }
            }
            else{
                this.refs = raw;
            }

            return records;
        }

        resolve( collection : Collection ) : this {
            if( collection && collection.length ){
                this.resolvedWith = collection;

                if( this.refs ){
                    this.reset( this.refs, { silent : true } );
                    this.refs = null;
                }
            }

            return this;
        }

        getModelIds() : RecordsIds { return this.toJSON(); }

        toggle( modelOrId : any, val : boolean ) : boolean {
            return super.toggle( this.resolvedWith.get( modelOrId ), val );
        }

        addAll() : Record[] {
            return this.reset( this.resolvedWith.models );
        }

        toggleAll() : Record[] {
            return this.length ? this.reset() : this.addAll();
        }
    }

    return SubsetOfCollection;
}
