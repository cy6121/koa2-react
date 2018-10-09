const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('../config/babel').proServer;

module.exports = {
  target: 'node',
  entry: './src/server/app.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
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
      use: 'ignore-loader',
    }],
    noParse: /\.min\.js/,
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEV__: true,
    }),
  ],
  externals: [nodeExternals()], // 防止node_modules目录下的第三方模块被打包进去
  node: {
    __dirname: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
