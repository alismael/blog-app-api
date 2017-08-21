var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    watch: true,
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: "/public/"
    },
     resolve: {
        extensions: [".js", ".jsx", ".json"],
        modules: ["src", "node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loaders: ['babel-loader']
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8001
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "source-map",

};

module.exports = config;