import * as tslib_1 from "tslib";
import { Messenger } from './events';
import { define } from './mixins';
export var isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production', logEvents = isProduction ?
    ['error', 'info'] :
    ['error', 'warn', 'debug', 'info', 'log'];
var Logger = (function (_super) {
    tslib_1.__extends(Logger, _super);
    function Logger() {
        var _this = _super.call(this) || this;
        if (typeof console !== 'undefined') {
            var _loop_1 = function (event_1) {
                this_1.on(event_1, function (topic, msg, props) {
                    var args = ["[" + topic + "] " + msg];
                    for (var name_1 in props) {
                        args.push("\n\t" + name_1 + ":", toString(props[name_1]));
                    }
                    console[event_1].apply(console, args);
                });
            };
            var this_1 = this;
            for (var _i = 0, logEvents_1 = logEvents; _i < logEvents_1.length; _i++) {
                var event_1 = logEvents_1[_i];
                _loop_1(event_1);
            }
        }
        return _this;
    }
    Logger = tslib_1.__decorate([
        define
    ], Logger);
    return Logger;
}(Messenger));
export { Logger };
var toString = typeof window === 'undefined' ?
    function (something) {
        if (something && typeof something === 'object') {
            var __inner_state__ = something.__inner_state__, value = __inner_state__ || something, isArray = Array.isArray(value);
            var body = isArray ? "[ length = " + value.length + " ]" : "{ " + Object.keys(value).join(', ') + " }";
            return something.constructor.name + ' ' + body;
        }
        return something;
    }
    : function (x) { return x; };
export var logRouter = new Logger();
export var log = logRouter.trigger.bind(logRouter);
//# sourceMappingURL=logging.js.map