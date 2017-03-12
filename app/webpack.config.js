var webpack = require('webpack');
module.exports = {
    entry:  [
        './index.js',
    ],
    output: {
        filename: 'todo.js',
        publicPath: ''
    },
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
        extensions: ['', '.js', '.jsx','style']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-3', 'react']
            }
        },{
            test:/\.css$/,
            exclude:/node_modules/,
            loaders:['style','css']
        }]
    }
}