import { setAttribute } from './transactions'
import { notEqual, assign } from '../class'

export class Attribute {
    /**
     * Update pipeline functions
     * =========================
     *
     * Stage 0. canBeUpdated( value )
     * - presence of this function implies attribute's ability to update in place.
     *
     * Stage 1. Transform stage
     */
    transform( value ) { return value; }

    // convert attribute type to `this.type`
    convert( value, options ) { return value; }

    // when set hook is present, call it
    convertAndSet( value, options, prev, model ) {
        const next = this.convert( value, options, model );

        if( this.isChanged( next, prev ) ) {
            const value = this.set.call( model, next, this.name );
            return value === void 0 ? prev : this.convert( value, options );
        }
    }

    /**
     * Stage 2. Check if attr value is changed
     */
    // todo: remove underscore dependency
    isChanged( a, b ) {
        return notEqual( a, b );
    }

    /**
     * Stage 3. Handle attribute change
     */
    handleChange( next, prev, model ) {}

    // delegate user and system events on attribute transform
    // todo: remove backbone events dependency from the core
    delegateEvents( next, prev, model ) {
        // console.assert( this.events );
        prev && prev.trigger && model.stopListening( prev );

        if( next && next.trigger ) {
            model.listenTo( next, this.events );
        }
    }

    // attribute-level change event.
    onAttrChange( next, prev, model ) {
        this.onChange.call( model, next, this.name );
    }

    /**
     * End update pipeline definitions.
     */

    // create empty object passing backbone options to constructor...
    create( options ) { return new this.type(); }

    // generic clone function for typeless attributes
    // Must be overriden in sublass
    clone( value, options = {} ) {
        if( value && typeof value === 'object' ) {
            // delegate to object's clone(), if it exist...
            if( value.clone ) {
                return value.clone( options );
            }

            if( options.deep ){
                const proto = Object.getPrototypeOf( value );

                // attempt to deep copy raw objects, assuming they are JSON
                if( proto === Object.prototype || proto === Array.prototype ){
                    return JSON.parse( JSON.stringify( value ) );
                }
            }
        }

        return value;
    }

    validate( model, value, name ) {}

    toJSON( value, key ) {
        return value && value.toJSON ? value.toJSON() : value;
    }

    createPropertyDescriptor() {
        const { name, getHook } = this;

        return {
            // call to optimized set function for single argument.
            set( value ){
                setAttribute( this, name, value );
            },

            // attach get hook to the getter function, if present
            get : getHook ?
                  function() {
                      return getHook.call( this, this.attributes[ name ], name );
                  } :
                  function() {
                      return this.attributes[ name ];
                  }
        }
    }

    constructor( name, options ) {
        const {
                  value, type, parse, toJSON,
                  getHooks = [],
                  transforms = [],
                  changeHandlers = []
              } = this.options = options;

        this.name  = name;
        this.value = value;
        this.type  = type;

        this.parse  = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;

        /**
         * Assemble pipelines...
         */

        // `convert` is default transform, which is always present...
        this.addTransform( this.convert );

        // No change handler by default
        this.changeHandler = null;

        // Get hook from the attribute will be used first...
        this.getHook = this.get || null;

        // let subclasses configure the pipeline...
        this.initialize.apply( this, arguments );

        // let attribute spec configure the pipeline...
        getHooks.forEach( gh => this.addGetHook( gh ) );
        transforms.forEach( t => this.addTransform( t ) );
        changeHandlers.forEach( ch => this.addChangeHandler( ch ) );
    }

    addGetHook( next ) {
        const { prev } = this;

        this.getHook = prev ?
                       function( value, name ) {
                           const next = prev.call( value, name );
                           return next.call( next, name );
                       } : next;
    }

    addTransform( next ) {
        const { prev } = this;

        this.transform = prev ?
                         function( value, options, prev, model ) {
                             const next = prev.call( this, value, options, prev, model );
                             return next.call( this, next, options, prev, model );
                         } : next;
    }

    addChangeHandler( next ) {
        const { prev } = this;

        this.handleChange = prev ?
                            function( next, prev, model ) {
                                prev.call( this, next, prev, model );
                                next.call( this, next, prev, model );
                            } : next;
    }
}