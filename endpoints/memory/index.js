!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.memoryIO={})}(this,function(t){"use strict";function e(t){function e(t){r=t}var i,n,r,o=new Promise(function(r,o){t(i=r,n=o,e)});return o.abort=function(){r?r(i,n):n(new Error("I/O Aborted"))},o}function i(t,e){return void 0===t&&(t=[]),void 0===e&&(e=50),new n(t,e)}var n=function(){function t(t,e){this.delay=e,this.index=[0],this.items={};for(var i=0,n=t;i<n.length;i++){var r=n[i];this.create(r,{})}}return t.prototype.resolve=function(t){var i=this;return e(function(e,n){setTimeout(function(){return e(t)},i.delay)})},t.prototype.reject=function(t){var i=this;return e(function(e,n){setTimeout(function(){return n(t)},i.delay)})},t.prototype.generateId=function(t){var e=Number(t);return isNaN(e)?String(this.index[0]++):(this.index[0]=Math.max(this.index[0],e),String(e))},t.prototype.create=function(t,e){var i=t.id=this.generateId(t.id);return this.index.push(i),this.items[i]=t,this.resolve({id:i})},t.prototype.update=function(t,e,i){return this.items[t]?(this.items[t]=e,this.resolve({})):this.reject("Not found")},t.prototype.read=function(t,e){var i=this.items[t];return i?this.resolve(i):this.reject("Not found")},t.prototype.destroy=function(t,e){return this.items[t]?(delete this.items[t],this.index=this.index.filter(function(e){return e!==t}),this.resolve({})):this.reject("Not found")},t.prototype.list=function(t){var e=this;return this.resolve(this.index.slice(1).map(function(t){return e.items[t]}))},t.prototype.subscribe=function(t){},t.prototype.unsubscribe=function(t){},t}();t.create=i,t.memoryIO=i,t.MemoryEndpoint=n,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
