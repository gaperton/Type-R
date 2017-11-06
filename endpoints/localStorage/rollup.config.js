import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input : 'lib/endpoints/localStorage.js',

    output : {
        file   : 'endpoints/localStorage/index.js',
        format : 'umd',
        name   : 'localStorageIO'
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
        sourcemaps(),
        uglify()
    ],
    sourcemap: true,
};