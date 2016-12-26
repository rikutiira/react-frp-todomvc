const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const entry = {
    development: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    production: ['./src/index.js']
}

const plugins = {
    all: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: '!!html!src/index.html'
        })
    ],
    development: [
        new ExtractTextPlugin('styles/styles.css', { disable: true })
    ],
    production: [
        new ExtractTextPlugin('styles/styles.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}


module.exports = {
    entry: entry[process.env.NODE_ENV] || entry.development,
    debug: true,
    progress: true,
    colors: true,
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'scripts/bundle.js',
        publicPath: ''
    },
    resolve: {
        root: path.join(__dirname, 'src')
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'], //react-hot-loader v1 is useless with the stateless component approach, upload to v3 at some point
            include: path.join(__dirname, 'src'),
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
    plugins: plugins.all.concat(plugins[process.env.NODE_ENV] || plugins.development),
    sassLoader: {
        includePaths: [path.join(__dirname, 'src', 'styles')]
    },
    devServer: {
        hot: true,
        contentBase: './docs/'
    }
}
