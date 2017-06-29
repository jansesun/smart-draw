'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isDebug = process.env.NODE_ENV === 'development';
var hash = isDebug ? '' : '.[chunkhash:8]';
var plugins = [];
if(isDebug) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './jade/index.jade',
      inject: true,
      chunks: ['draw']
    })
  );
} else {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
    })
  );
}
module.exports = {
  devtool: isDebug ? 'eval-source-map' : false,
  output: {
    path: path.join(__dirname, 'release'),
    filename: 'js/[name]' + hash + '.js',
    publicPath: isDebug ? '//localhost:3000/static/' : '//jansesun.github.io/'
  },
  entry: {
    'draw': ['./js/page/draw']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(?:jade|pug)$/,
        loader: 'pug-loader'
      }
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
