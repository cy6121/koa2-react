/**
 * Created by Raion on 2019/2/20.
 */

const path = require('path');
const AssetPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&timeout=10000';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    vendor: ['react', 'react-dom'],
    index: [hotMiddlewareScript, './src/client/index.js']
  },
  output: {
    path: path.join(__dirname, '../dist/static'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new AssetPlugin({ filename: 'assets.json', path: path.join(__dirname, '..'), prettyPrint: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
  }
};
