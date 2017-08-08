class MutableType extends AnyType {
    doUpdate( record, value, options, nested : any[] ){ // Last to things can be wrapped to an object, either transaction or ad-hoc
        const key = this.name, { attributes } = record; 
        const prev = attributes[ key ];
        let update;

        // This can be moved to transactional attribute. And chained with the rest.
        if( update = this.canBeUpdated( prev, value, options ) ) { // todo - skip empty updates.
            const nestedTransaction = prev._createTransaction( update, options );
            if( nestedTransaction ){
                if( nested ){
                    nested.push( nestedTransaction );
                }
                else{
                    nestedTransaction.commit( record );
                }

                if( this.propagateChanges ) return true;
            }

            return false;
        }

        return super.processUpdate( record, value, options, nested );
    }

    doInit( record : AttributesContainer, value, options : TransactionOptions ){
        const v = options.clone ? this.clone( value, record ) : ( // TODO: move it 
            value === void 0 ? this.defaultValue() : value
        );

        const x = this.transform( v, options, void 0, record );
        this.handleChange( x, void 0, record );
        return x;
    }
}