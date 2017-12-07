const path = require('path')
const webpack = require('webpack')
const autohtml = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylemain.css');
const extractLESS = new ExtractTextPlugin('styleless.css');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
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
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        extractCSS,
        extractLESS,
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([{
            from: './jquery.min.js'
        }, {
            from: './echarts.common.min.js'
        }, {
            from: './lodash.core.min.js'
        }]),
        new CleanWebpackPlugin(['dist']),
        new autohtml({
            title: 'test webpack',
            template: './template.html',
            hash: true
        })
    ]

};