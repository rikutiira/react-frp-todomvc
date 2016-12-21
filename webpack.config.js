const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    debug: true,
    progress: true,
    colors: true,
    watch: true,
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
                cacheDirectory: true
            },
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [new HtmlWebpackPlugin()]
}
