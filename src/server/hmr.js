const webpack = require('webpack');
const c2k = require('koa2-connect');
const chalk = require('chalk');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../config/webpack.dev.config');

const clientCompiler = webpack(webpackConfig);

clientCompiler.plugin('compile', () => {
  console.log(chalk.yellow('client compiling....  '));
});

clientCompiler.plugin('done', () => {
  console.log(chalk.green('client compile done!'));
});

module.exports = {
  devMiddleware: c2k(devMiddleware(clientCompiler, {
    noInfo: true,
    stats: 'minimal',
    publicPath: webpackConfig.output.publicPath,
    // serverSideRender: true,
    watchOptions: {
      aggregateTimeout: 400, // client 重新编译要晚于server，这个数值要略大点
      poll: 1000,
      ignored: /node_modules/,
    },
  })),
  hotMiddleware: c2k(hotMiddleware(clientCompiler)),
};