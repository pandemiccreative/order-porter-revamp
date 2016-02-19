'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.(json(\?.*)?)$/,
        loader: 'json'
      },
      {
        test: /\.(css(\?.*)?)$/,
        loader: ExtractTextPlugin.extract('css!postcss')
      },
      {
        test: /\.(less(\?.*)?)$/,
        loader: ExtractTextPlugin.extract('css!postcss!less')
      }
    ]
  },
  postcss: function() {
    return[require('autoprefixer')];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/styles.css')
  ]
};
