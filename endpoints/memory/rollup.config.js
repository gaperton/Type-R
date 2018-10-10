import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input : 'lib/index.js',
    external : "type-r",
    
    output : {
        file   : 'dist/index.js',
        format : 'umd',
        name   : 'memoryIO',
        globals : {
            "type-r":"Nested"
        },
        sourcemap: true
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
        sourcemaps(),
        uglify()
    ],
};