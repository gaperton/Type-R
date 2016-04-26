(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './tools', './primitives'], factory);
    }
})(function (require, exports) {
    "use strict";
    require('./tools');
    require('./primitives');
});
//# sourceMappingURL=index.js.map