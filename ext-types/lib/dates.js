import * as tslib_1 from "tslib";
import { DateType, ChainableAttributeSpec } from "type-r";
var msDatePattern = /\/Date\(([0-9]+)\)\//;
var MicrosoftDateType = (function (_super) {
    tslib_1.__extends(MicrosoftDateType, _super);
    function MicrosoftDateType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MicrosoftDateType.prototype.convert = function (next) {
        if (typeof next === 'string') {
            var msDate = msDatePattern.exec(next);
            if (msDate) {
                return new Date(Number(msDate[1]));
            }
        }
        return DateType.prototype.convert.apply(this, arguments);
    };
    MicrosoftDateType.prototype.toJSON = function (value) { return value && "/Date(" + value.getTime() + ")/"; };
    return MicrosoftDateType;
}(DateType));
export { MicrosoftDateType };
var TimestampType = (function (_super) {
    tslib_1.__extends(TimestampType, _super);
    function TimestampType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimestampType.prototype.toJSON = function (value) { return value && value.getTime(); };
    return TimestampType;
}(DateType));
export { TimestampType };
export var MicrosoftDate = new ChainableAttributeSpec({
    type: Date,
    _attribute: MicrosoftDateType
});
export var Timestamp = new ChainableAttributeSpec({
    type: Date,
    _attribute: TimestampType
});
//# sourceMappingURL=dates.js.map