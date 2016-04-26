module.exports = {
    entry : {
        //index : "./src/index.ts",
        tests : "./tests/index.ts"
    },

    output : {
        filename      : '[name].js',
        library       : "Transactional",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    externals : [],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts'
            }
        ]
    }
};
