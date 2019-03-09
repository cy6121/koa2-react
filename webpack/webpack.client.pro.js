/**
 * Created by Raion on 2019/2/20.
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetPlugin = require('assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
    index: './src/client/index.js',
  },
  output: {
    path: path.join(__dirname, '../dist/static'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
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
      }, {
        test: /\.(css|pcss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
          }
        ]
      }
    ],
  },
  plugins: [
    new AssetPlugin({ filename: 'assets.json', path: path.join(__dirname, '..'), prettyPrint: false }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[contenthash:12].css'
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
};
