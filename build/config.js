const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        'j-router': path.join(ROOT_PATH, 'src/main.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: "j-router.js",
        library: "j-router",
        libraryTarget: "umd"
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
};
