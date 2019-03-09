/**
 * Created by Raion on 2019/2/20.
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: './src/server/server.pro.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
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
        loader: 'ignore-loader'
      }
    ],
    noParse: /\.min\.js/,
  },
  externals: [nodeExternals()], // 防止node_modules目录下的第三方模块被打包进去
  node: {
    __dirname: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
