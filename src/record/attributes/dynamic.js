export function forEach( attrSpecs ){
    let statements = [ 'var v;' ];

    for( let name of attrSpecs ){
        statements.push( `( v = a.${name} ) === void 0 || f( v, "${name}" );` );
    }

    return new Function( 'a', 'f', statements.join( '' ) );
}

export function cloneCtor( attrSpecs ){
    var statements = [];

    for( let name of attrSpecs ){
        statements.push( `this.${name} = x.${name};` );
    }

    var CloneCtor = new Function( "x", statements.join( '' ) );
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}

// Check if value is valid JSON.
function isValidJSON( value ){
    if( value === null ){
        return true;
    }

    switch( typeof value ){
    case 'number' :
    case 'string' :
    case 'boolean' :
        return true;

    case 'object':
        var proto = Object.getPrototypeOf( value );

        if( proto === Object.prototype || proto === Array.prototype ){
            return _.every( value, isValidJSON );
        }
    }

    return false;
}

// Create optimized model.defaults( attrs, options ) function
export function defaults( attrSpecs ){
    let assign_f = ['var v;'], create_f = [];

    function appendExpr( name, expr ){
        assign_f.push( `this.${name} = ( v = a.${name} ) === void 0 ? ${expr} : v;` );
        create_f.push( `this.${name} = ${expr};` );
    }

    // Compile optimized constructor function for efficient deep copy of JSON literals in defaults.
    for( let name of attrSpecs ){
        const attrSpec = attrSpecs[ name ],
              { value, type } = attrSpec;

        if( value === void 0 && type ){
            // if type with no value is given, create an empty object
            appendExpr( name, `i.${name}.create()` );
        }
        else{
            // If value is given, type casting logic will do the job later, converting value to the proper type.
            if( isValidJSON( value ) ){
                // JSON literals must be deep copied.
                appendExpr( name, JSON.stringify( value ) );
            }
            else if( value === void 0 ){
                // handle undefined value separately. Usual case for model ids.
                appendExpr( name, 'void 0' );
            }
            else{
                // otherwise, copy value by reference.
                appendExpr( name, `i.${name}.value` );
            }
        }
    }

    var CreateDefaults = new Function( 'i', create_f.join( '' ) ),
        AssignDefaults = new Function( 'a', 'i', assign_f.join( '' ) );

    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;

    // Create model.defaults( attrs, options ) function
    // 'attrs' will override default values, options will be passed to nested backbone types
    return function( attrs = {} ){
        return attrs ? new AssignDefaults( attrs, attrSpecs ) : new CreateDefaults( attrSpecs );
    }
}

function createParse( allAttrSpecs, attrSpecs ){
    var statements = [ 'var a=this._attributes;' ],
        create     = false;

    for( let name of allAttrSpecs ){
        const local = attrSpecs[ name ];

        // Is there any 'parse' option in local model definition?
        if( local && local.parse ) create = true;

        // Add statement for each attribute with 'parse' option.
        if( allAttrSpecs[ name ].parse ){
            const s = `r.${name} === void 0 ||( r.${name} = a.${name}.parse.call( this, r.${name}, "${name}") );`;
            statements.push( s );
        }
    }

    if( create ){
        statements.push( 'return r;' );
        const parse = new Function( 'r', statements.join( '' ) );

        return function( data ){
            return parse( this, data, allAttrSpecs );
        }
    }
 }

function toJSON( attrSpecs ){
    let statements = [ `var json = {},v=this.attributes,a=this._attributes;` ];

    for( let key of attrSpecs ){
        const toJSON = attrSpecs[ key ].toJSON;

        if( toJSON ){
            statements.push( `json.${key} = a.${key}.toJSON.call( this, v.${ key }, '${key}' );` );
        }
    }

    statements.push( `return json;` );

    return new Function( statements.join( '' ) );
}
