'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
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
      },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
      { test: /\.(woff|woff2)$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/,    loader: 'file-loader' },
      { test: /\.eot$/,    loader: 'file-loader' },
      { test: /\.svg$/,    loader: 'file-loader' }
    ]
  },
  postcss: function() {
    return[
      // require('postcss-nested')(),
      // require('postcss-import')(),
      require('postcss-clearfix')(),
      // require('css-mqpacker')(),
      // require('postcss-font-magician')(),
      // require('postcss-will-change')(),
      require('autoprefixer')()
      // require('cssnano')()
    ];
  },
  resolve: {
    extensions: ['', '.js']
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
