'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')            // generated files will be put here: js, css, images ...
    },
    // devtool: 'source-map',
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }]
    }
};