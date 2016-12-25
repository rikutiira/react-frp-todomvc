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
        publicPath: 'http://localhost:8080/'
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
            loader: `
                style-loader!
                css-loader?modules&localIdentName=[local]___[hash:base64:5]&sourceMap!
                postcss-loader!
                sass-loader?outputStyle=expanded&sourceMap!
            `.replace(/\s/g, '')
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!html!src/index.html'
        })
    ].concat(
        process.env.NODE_ENV === 'production'
            ? [new ExtractTextPlugin()]
            : []
    ),
    sassLoader: {
        includePaths: [path.join(__dirname, 'src', 'styles')]
    }
}
