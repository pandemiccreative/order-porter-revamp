'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
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
