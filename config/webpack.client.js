const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('../config/babel').proClient;

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    index: './src/client/index.js',
  },
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
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new AssetsPlugin({ filename: 'assets.json', path: path.join(__dirname, '../'), prettyPrint: true }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEV__: true,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            warnings: false,
            collapse_vars: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons',
          minChunks: 2,
          minSize: 0, // This is example is too small to create commons chunks
        },
        styles: { // 抽取公共样式
          test: /\.(pcss|css)$/,
          chunks: 'all',
          name: 'styles',
          minChunks: 2,
          enforce: true,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
        },
      },
    },
  },
};
