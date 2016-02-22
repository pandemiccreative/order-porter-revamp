var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
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
    return[
      require('postcss-import')(),
      require('postcss-bem')(),
      require('postcss-nested')(),
      require('postcss-clearfix')(),
      require('css-mqpacker')(),
      require('postcss-font-magician')(),
      require('postcss-will-change')(),
      require('autoprefixer')(),
      require('cssnano')()
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
