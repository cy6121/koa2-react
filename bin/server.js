/* eslint-disable import/no-dynamic-require,max-len */
// const chalk = require('chalk');
// const path = require('path');
// const webpack = require('webpack');
// const { devMiddleware, hotMiddleware } = require('../src/server/hmr');
// const webpackConfig = require('../config/webpack.dev.config');
//
// const serverCompiler = webpack(webpackConfig.server);
//
// serverCompiler.watch({
//   aggregateTimeout: 600,
//   poll: 1000,
//   ignored: /node_modules/,
// }, () => {
// });
// serverCompiler.plugin('compile', () => {
//   console.log(chalk.yellow('server compiling....  '));
// });
//
// serverCompiler.plugin('done', () => {
//   console.log(chalk.blue('server compile done! '));
//   const buildPath = path.join(serverCompiler.options.output.path, serverCompiler.options.output.filename);
//   const serverEntry = require(buildPath).default;
//   serverEntry(devMiddleware, hotMiddleware);
// });

const babelConfig = require('../config/babel');

require('babel-register')(babelConfig.devServer);

require('../src/server/app');
