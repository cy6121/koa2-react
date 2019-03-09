/**
 * Created by Raion on 2019/2/20.
 */

const fs = require('fs');
const { colors } = require('./config');

function cleanCache(modulePath) {
  const module = require.cache[modulePath];
  // remove reference in module.parent
  if (module && module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}

function watchModule() {
  const serverPath = '../../dist/server.js';
  const assetsPath = '../../assets.json';
  fs.watch(require.resolve(serverPath), () => {
    cleanCache(require.resolve(serverPath));
  });

  fs.watch(require.resolve(assetsPath), () => {
    cleanCache(require.resolve(assetsPath));
  });
}

function hmrRegister(app) {
  const webpack = require('webpack');
  const c2k = require('koa2-connect');
  // return Promise.all([new Promise((resolve) => {
  //   const clientConfig = require('../../webpack/webpack.dev.client.js');
  //   const DevMiddle = require('webpack-dev-middleware');
  //   const HotMiddle = require('webpack-hot-middleware');
  //   const clientCompiler = webpack(clientConfig);
  //
  //   clientCompiler.plugin('compile', () => {
  //     console.log(colors.yellow, 'client compiling....  ');
  //   });
  //   clientCompiler.plugin('done', () => {
  //     console.log(colors.yellow, 'client compiler done');
  //     resolve();
  //   });
  //
  //   const devMiddle = DevMiddle(clientCompiler, {
  //     noInfo: true,
  //     publicPath: clientConfig.output.publicPath,
  //     stats: 'minimal',
  //     watchOptions: {
  //       poll: 1000, // 监测修改的时间(ms)
  //       aggregateTimeout: 400, // 防止重复按键，500毫秒内算按键一次(client要比server晚编译，值略大点)
  //       ignored: /node_modules/, // 不监测
  //     },
  //   });
  //
  //   const hotMiddle = HotMiddle(clientCompiler, { reload: true });
  //   app.use(c2k(devMiddle));
  //   app.use(c2k(hotMiddle));
  // }), new Promise((resolve) => {
  //   const serverConfig = require('../../webpack/webpack.dev.server.js');
  //   const serverCompiler = webpack(serverConfig);
  //   serverCompiler.watch({
  //     poll: 1000,
  //     aggregateTimeout: 600,
  //     ignored: /node_modules/,
  //   }, () => {});
  //
  //   serverCompiler.plugin('compile', () => {
  //     console.log(colors.cyan, 'server compiling....  ');
  //   });
  //   serverCompiler.plugin('done', () => {
  //     console.log(colors.cyan, 'server compiler done');
  //     resolve();
  //   });
  // })]).then(() => {
  //   watchModule();
  // });
  return new Promise((resolve) => {
    const clientConfig = require('../../webpack/webpack.dev.client.js');
    const DevMiddle = require('webpack-dev-middleware');
    const HotMiddle = require('webpack-hot-middleware');
    const clientCompiler = webpack(clientConfig);

    clientCompiler.plugin('compile', () => {
      console.log(colors.yellow, 'client compiling....  ');
    });
    clientCompiler.plugin('done', () => {
      console.log(colors.yellow, 'client compiler done');
      resolve();
    });

    const devMiddle = DevMiddle(clientCompiler, {
      noInfo: true,
      publicPath: clientConfig.output.publicPath,
      stats: 'minimal',
      watchOptions: {
        poll: 1000, // 监测修改的时间(ms)
        aggregateTimeout: 400, // 防止重复按键，500毫秒内算按键一次(client要比server晚编译，值略大点)
        ignored: /node_modules/, // 不监测
      },
    });

    const hotMiddle = HotMiddle(clientCompiler, { reload: true });
    app.use(c2k(devMiddle));
    app.use(c2k(hotMiddle));
  }).then(() => new Promise((resolve) => {
    const serverConfig = require('../../webpack/webpack.dev.server.js');
    const serverCompiler = webpack(serverConfig);
    serverCompiler.watch({
      poll: 1000,
      aggregateTimeout: 600,
      ignored: /node_modules/,
    }, () => {});

    serverCompiler.plugin('compile', () => {
      console.log(colors.cyan, 'server compiling....  ');
    });
    serverCompiler.plugin('done', () => {
      console.log(colors.cyan, 'server compiler done');
      resolve();
    });
  })).then(() => {
    watchModule();
  });
}

module.exports = hmrRegister;
