const path = require('path')
const webpack = require('webpack')
const autohtml = require('html-webpack-plugin')
const bundleanalyzerplugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylemain.css');
const extractLESS = new ExtractTextPlugin('styleless.css');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(png|svg|jpg|gif|ttf|woff|eot|woff2)$/,
            use: ['file-loader']
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            use: extractLESS.extract(['css-loader', 'less-loader'])
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8888
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        extractCSS,
        extractLESS,
        // new UglifyJSPlugin(),
        new autohtml({
            title: 'test webpack',
            template: './template.html',
            hash: true
        }), new bundleanalyzerplugin({
            analyzerPort: 8889
        })
    ]

};