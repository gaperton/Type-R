module.exports = {
    entry : "./src/index",

    output : {
        filename      : './dist/index.js',
        library       : "Nested",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    resolve : {
        extensions : [ '.ts', '.js' ] 
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            },
            {
                enforce : "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
    }
};
