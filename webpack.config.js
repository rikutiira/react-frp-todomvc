const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    debug: true,
    progress: true,
    colors: true,
    watch: true,
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'scripts/bundle.js',
        publicPath: ''
    },
    resolve: {
        root: path.join(__dirname, 'src')
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: /src/,
            options: {
                cacheDirectory: false
            },
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', [
                'css-loader?modules&localIdentName=[local]___[hash:base64:5]&sourceMap',
                'postcss-loader',
                'sass-loader?outputStyle=expanded&sourceMap'
            ])
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!html!src/index.html'
        }),
        new ExtractTextPlugin('styles/styles.css', {
            disable: process.env.NODE_ENV !== 'production'
        })
    ],
    sassLoader: {
        includePaths: [path.join(__dirname, 'src', 'styles')]
    }
}
