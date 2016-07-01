interface Transactional {
    // true while inside of the transaction
    _transaction : boolean

    // true, if there's unsent change event
    _isDirty  : boolean

    _notifyChange( options : TransactionOptions )
 }

 interface TransactionOptions {
     silent? : boolean
 }

// Start transaction. Return true if it's opening transaction.
function begin( object : Transactional ) : boolean {
    const isRoot = !object._transaction;

    if( isRoot ){
        object._transaction = true;
    }

    return isRoot;
}

// Commit transaction. Send out change event and notify owner. Returns true if there were changes.
function commit( object : Transactional, options : TransactionOptions ){
    const wasDirty = object._isDirty;

    if( options.silent ){
        object._isDirty  = false;
    }
    else{
        while( object._isDirty ){
            object._isDirty = false;
            object._notifyChange( options );
        }
    }
    
    object._transaction = false;

    return wasDirty;
}