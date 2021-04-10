const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
  mode: 'development',
  entry: {
    app: './_client/index.js',
    polyfill: 'babel-polyfill'
  },
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
  },

  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
            template: 'index.html'
          })],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, '_client')],
      loader: 'babel-loader'
    }, {
      test: /.css$/,

      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  },

  devServer: {
    open: true,
    writeToDisk: true,
    host: 'localhost',
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  }
}