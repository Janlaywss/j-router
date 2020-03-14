const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        'j-router': path.join(ROOT_PATH, 'example/app.js'),
    },
    output: {
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.html', '.css', '.jsx'],
        alias: {
            'j-router': path.join(ROOT_PATH, 'src'),
        },
    },
    module: {
        rules: [
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'use': 'babel-loader'
            }
        ]
    },
    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: true,
        inline: true,
        progress: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(ROOT_PATH, 'example/index.html'),
        }),
    ]
};
