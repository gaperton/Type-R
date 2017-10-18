import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
    input : 'lib/index.js',

    context: 'window', //Used to silence warning. All found tests and examples works without this op

    output : {
        file   : 'dist/index.js',
        format : 'umd',
        name   : 'Nested'
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
        uglify()
    ],
    sourcemap: true,
};