module.exports = {
    entry : {
        index : "./src/index",
        tests : "mocha!./tests/index"
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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    stage : 1
                }
            }
        ]
    }
};
