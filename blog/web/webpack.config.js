var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    entry: APP_DIR + '/index.tsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: "/public/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: ["src", "node_modules"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by
            // 'awesome-typescript-loader'.
            {
                test: /\.(tsx|ts)?$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
    devServer: {
        inline: true,
        host: '0.0.0.0',
        port: 8001,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "source-map",

};

module.exports = config;