import {Attribute} from './model'

class PrimitiveType extends Attribute {
    constructor( options ){
        super( options );
    }
    
    defaults(){ return this.type(); }
    convert( next ){ return next == null ? next : this.type( next ); }
    isChanged( next, prev ){ return next !== prev; }
}

// There are three major pipelines 
// `transform` - starts with `convert`
// `handleChange` - starts empty
// `get` - starts with attribute read function. 

Attribute.hasOptions({
    get( fun ){
        if( this._get ){
            
        }
        return { get : fun };
    }
        
    set( fun ){
        return {
            // `transform` pipeline starts with a call to `convert`
            // functions are combined in the way they transform first argument
            transform( val, options, prev, model ){
                if( this.isChanged( val, prev ) ){
                    const next = fun.call( model, val, this.name );
                    return next === void 0 ? prev : this.convert( next, options );
                }
            }
        }
    }
    
    events( map ){
        return {
            handleChange( next, prev, model ){
                prev && model.stopListening( prev );
                next && model.listenTo( next, map );
            }
        }
    }
});