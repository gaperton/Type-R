import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input : 'lib/endpoints/memory.js',

    output : {
        file   : 'endpoints/memory/index.js',
        format : 'umd',
        name   : 'memoryIO'
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
        sourcemaps(),
        uglify()
    ],
    sourcemap: true,
};