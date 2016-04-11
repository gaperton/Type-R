// Reference backbone code
export class Model {
    constructor(){
        this._changing           = false;
        this._pending            = false;

        this._previousAttributes = {};
        this.changed             = {}; // we need it to handle Nested stuff.
        this.attributes          = {};
    }

    // Reference backbone transaction
    transaction( fun, options = {} ){
        var changing   = this._changing;
        this._changing = true;

        if( !changing ){
            // prepare internal structures...
            this._previousAttributes = _.clone( this.attributes );
            this.changed             = {};
        }

        // Do the job...
        fun( this );

        if( !changing ){
            if( !options.silent ){
                while( this._pending ){
                    this._pending = false;
                    this.trigger( 'change', this, options );
                }
            }

            this._pending  = false;
            this._changing = false;
        }

        return this;
    }

    // Reference backbone attributes sync function
    syncAttrs( attrs, options ){
        var current = this.attributes;
        var changed = this.changed;
        var prev    = this._previousAttributes;
        var changes = [];

        // For each `set` attribute, update or delete the current value.
        for( var attr in attrs ){
            var val = attrs[ attr ];

            if( !_.isEqual( prev[ attr ], val ) ){
                changed[ attr ] = val;
            }
            else{
                delete changed[ attr ];
            }

            if( !_.isEqual( current[ attr ], val ) ) changes.push( attr );
            current[ attr ] = val;
        }

        // Trigger all relevant attribute changes.
        // Nested .set will trigger transaction with immediate change:attr
        if( !options.silent ){
            if( changes.length ) this._pending = true;

            for( var i = 0; i < changes.length; i++ ){
                this.trigger( 'change:' + changes[ i ], this, current[ changes[ i ] ], options );
            }
        }
    }

    // Reference backbone single attr update
    singleAttrSync( attr, val, options ){
        // Update changed
        var changed = this.changed;
        var prev    = this._previousAttributes;

        if( !_.isEqual( prev[ attr ], val ) ){
            changed[ attr ] = val;
        }
        else{
            delete changed[ attr ];
        }

        // update current
        var current = this.attributes;
        current[ attr ] = val;

        // Notify
        if( !options.silent ){
            if( !_.isEqual( current[ attr ], val ) ){
                this._pending = true;
                this.trigger( 'change:' + attr, this, val, options );
            }
        }
    }

    // Plain assignment
    simpleAttrSync( attr, val, options ){
        // update current
        var current = this.attributes;


        current[ attr ] = val;


        if( !_.isEqual( current[ attr ], val ) ){
            this._pending = true;
            this.trigger( 'change:' + attr, this, val, options );
        }
    }



    // complete code
    set( attrs, options ){
        var silent     = options.silent;
        var changes    = [];
        var changing   = this._changing;
        this._changing = true;

        if( !changing ){
            this._previousAttributes = _.clone( this.attributes );
            this.changed             = {};
        }

        var current = this.attributes;
        var changed = this.changed;
        var prev    = this._previousAttributes;

        // For each `set` attribute, update or delete the current value.
        for( var attr in attrs ){
            val = attrs[ attr ];
            if( !_.isEqual( current[ attr ], val ) ) changes.push( attr );
            if( !_.isEqual( prev[ attr ], val ) ){
                changed[ attr ] = val;
            }
            else{
                delete changed[ attr ];
            }

            current[ attr ] = val;
        }

        // Trigger all relevant attribute changes.
        if( !silent ){
            if( changes.length ) this._pending = options;
            for( var i = 0; i < changes.length; i++ ){
                this.trigger( 'change:' + changes[ i ], this, current[ changes[ i ] ], options );
            }
        }

        // You might be wondering why there's a `while` loop here. Changes can
        // be recursively nested within `"change"` events.
        if( changing ) return this;
        if( !silent ){
            while( this._pending ){
                options       = this._pending;
                this._pending = false;
                this.trigger( 'change', this, options );
            }
        }
        this._pending  = false;
        this._changing = false;
        return this;
    }
}