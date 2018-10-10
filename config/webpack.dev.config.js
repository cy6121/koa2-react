const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('../config/babel').devClient;

const client = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    index: ['webpack-hot-middleware/client?timeout=10000&reload=true', './src/client/index.js'],
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: babelConfig,
    }, {
      test: /\.(css|pcss)$/,
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }],
    }, {
      test: /\.(svg|jpe?g|png|gif|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash:8].[ext]',
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new AssetsPlugin({ filename: 'assets.json', path: path.join(__dirname, '../'), prettyPrint: true }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
};

// const server = {
//   target: 'node',
//   entry: './src/server/app.js',
//   mode: 'development',
//   devtool: 'cheap-module-eval-source-map',
//   output: {
//     path: path.join(__dirname, '../dist'),
//     publicPath: '/',
//     filename: 'server.js',
//     libraryTarget: 'commonjs2',
//   },
//   module: {
//     rules: [{
//       test: /\.(js|jsx)$/,
//       enforce: 'pre',
//       exclude: /node_modules/,
//       loader: 'eslint-loader',
//     }, {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader',
//       options: babelConfig.server,
//     }, {
//       test: /\.(css|pcss)$/,
//       use: 'ignore-loader',
//     }],
//   },
//   plugins: [
//     new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
//     // new webpack.DefinePlugin({
//     //   __SERVER__: true,
//     //   __DEV__: true,
//     // }),
//   ],
// };

module.exports = client;


// module.exports = {
//   entry: {
//     vendor: [
//       'react',
//       'react-dom',
//     ],
//     index: ['webpack-hot-middleware/client?timeout=10000&reload=true', './src/client/index.js'],
//   },
//   mode: 'development',
//   devtool: 'cheap-module-eval-source-map',
//   output: {
//     path: path.join(__dirname, '../dist'),
//     publicPath: '/',
//     filename: 'js/[name].[hash:8].js',
//   },
//   module: {
//     rules: [{
//       test: /\.(js|jsx)$/,
//       enforce: 'pre',
//       exclude: /node_modules/,
//       loader: 'eslint-loader',
//     }, {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader',
//       options: babelConfig.client,
//     }, {
//       test: /\.(css|pcss)$/,
//       exclude: /node_modules/,
//       use: [{
//         loader: MiniCssExtractPlugin.loader,
//       }, {
//         loader: 'css-loader',
//       }, {
//         loader: 'postcss-loader',
//       }],
//     }],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: 'css/[name].css',
//       chunkFilename: 'css/[id].css',
//     }),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//     new AssetsPlugin({ filename: 'assets.json', path: path.join(__dirname, '../') }),
//     // new webpack.DefinePlugin({
//     //   __SERVER__: false,
//     // }),
//   ],
//   optimization: {
//     runtimeChunk: {
//       name: 'manifest',
//     },
//   },
// };
