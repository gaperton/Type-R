import {DateType, ChainableAttributeSpec} from "type-r";

const msDatePattern  = /\/Date\(([0-9]+)\)\//;

export class MicrosoftDateType extends DateType {
    convert( next ) {
        if( typeof next === 'string' ){
            const msDate = msDatePattern.exec( next );
            if( msDate ){
                return new Date( Number( msDate[ 1 ] ) );
            }
        }

        return DateType.prototype.convert.apply( this, arguments );
    }

    toJSON( value ) { return value && `/Date(${ value.getTime() })/`; }
}


export class TimestampType extends DateType {
    toJSON( value ) { return value && value.getTime(); }
}

export const MicrosoftDate = new ChainableAttributeSpec({
    type      : Date,
    _attribute: MicrosoftDateType
})

export const Timestamp = new ChainableAttributeSpec({
    type      : Date,
    _attribute: TimestampType
})