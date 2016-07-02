import { Class } from '../class.ts'

export interface CollectionDefinition {
    Record : IRecord
}



export class Collection extends Class {
    get length(){
        return this.models.length;
    }

    _validateNested : function( errors ){
        var models = this.models,
            length = 0;

        for( var i = 0; i < models.length; i++ ){
            var model = models[ i ],
                error = model.validationError;

            if( error ){
                errors[ model.cid ] = error;
                length++;
            }
        }

        return length;
    },

    modelId : function( attrs ){
        return attrs[ this.Record.prototype.idAttribute || 'id' ];
    },

    constructor : function( models, a_options ){
        var options = a_options || {};

        this.__changing = 0;
        this._changed = false;
        this._changeToken = {};
        this._owner = this._store = null;

        this.model = options.model || this.model;
        if( options.comparator !== void 0 ){
            this.comparator = options.comparator;
        }

        this.models = [];
        this._byId = {};

        if( models ){
            this.reset( models, new SilentOptions( options ) );
        }

        this.listenTo( this, this._listenToChanges, handleChange );

        this.initialize.apply( this, arguments );
    },

    isValid : function( options ){
        return this.every( function( model ){
            return model.isValid( options );
        } );
    },

    get : function( obj ){
        if( obj == null ){ return void 0; }

        if( typeof obj === 'object' ){
            return this._byId[ obj[ this.model.prototype.idAttribute ] ] || this._byId[ obj.cid ];
        }

        return this._byId[ obj ];
    },

    set : method( function( models, options ){
        return this.length ?
               set( this, models, options ) :
               emptySet( this, models, options );
    } ),

    reset : method( function( a_models, a_options ){
        var options        = a_options || {},
            previousModels = dispose( this );

        var models = emptySet( this, a_models, new SilentOptions( options ) );

        options.silent || trigger2( this, 'reset', this, _.defaults( { previousModels : previousModels }, options ) );

        return models;
    } ),

    add : method( function( models, options ){
        return this.length ?
               add( this, models, options )
            : emptySet( this, models, options );
    } ),

    remove( models, options = {} ){
        const isRoot = begin( this ),
              result = models instanceof Array ?
                            removeMany( this, models, options ) :
                            removeOne( this, models, options );

        isRoot && commit( this );
        return result;
    },

    at( index ){
        const { models } = this;
        return models[ index < 0 ? index + models.length : index ];
    },

    clone( options ){
        const deep   = !options || options.deep,
              models = deep ?
                       this.map( record => record.clone( options ) ) :
                       this.models;

        return new this.constructor( models, {
            model : this.model, //todo ???
            comparator : this.comparator
        } );
    },

    transaction : function( func, self, args ){
        return transaction( func ).apply( self || this, args );
    },

    // support for relations
    getModelIds(){ return this.map( record => record.id ); },

    createSubset( models, options ){
        var SubsetOf = this.constructor.subsetOf( this ).createAttribute().type;
        var subset = new SubsetOf( models, options );
        subset.resolve( this );
        return subset;
    }
}