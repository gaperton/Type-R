function _reallocateEmpty( self : CollectionData, source, options ){
    var len         = source ? source.length : 0,
        models      = Array( len ),
        _byId : Index      = {},
        idAttribute = self.model.prototype.idAttribute;

    for( var i = 0, j = 0; i < len; i++ ){
        var src = source[ i ];

        if( src && ( _byId[ src[ idAttribute ] ] || _byId[ src.cid ] ) ){
            continue;
        }

        var model = toModel( self, src, options );

        self._addReference( model );
        models[ j++ ] = model;
        addIndex( _byId, model );

    }

    models.length = j;
    self._byId    = _byId;

    return self.models = models;
}


interface CollectionData {
    models : Record[]
    _byId : Index
    model : typeof Record
    _addReference( model : Record ) : void
    _removeReference( model : Record ) : void
}
