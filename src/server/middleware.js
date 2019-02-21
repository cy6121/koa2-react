/**
 * Created by Raion on 2019/2/20.
 */

function middlewareRegister(app) {
  return new Promise((resolve) => {
    const clientConfig = require('../../webpack/webpack.dev.client.js');
    const serverConfig = require('../../webpack/webpack.dev.server.js');
    const webpack = require('webpack');
    const DevMiddle = require('webpack-dev-middleware');
    const HotMiddle = require('webpack-hot-middleware');
    const c2k = require('koa2-connect');

    const clientCompiler = webpack(clientConfig);

    const devMiddle = DevMiddle(clientCompiler, {
      noInfo: true,
      publicPath: clientConfig.output.publicPath,
      stats: 'minimal',
      watchOptions: {
        poll: 1000,//监测修改的时间(ms)
        aggregateTimeout: 500, //防止重复按键，500毫秒内算按键一次(client要比server晚编译，值略大点)
        ignored:/node_modules/, //不监测
      }
    });

    const hotMiddle = HotMiddle(clientCompiler, { reload: true });
    app.use(c2k(devMiddle));
    app.use(c2k(hotMiddle));

    const serverCompiler = webpack(serverConfig);
    serverCompiler.watch({
      poll: 1000,
      aggregateTimeout: 400,
      ignored: /node_modules/,
    }, () => {});

    clientCompiler.plugin('compile', () => {
      console.log('client compiling....  ');
    });
    clientCompiler.plugin('done', () => {
      console.log('client compiler done');
    });
    serverCompiler.plugin('compile', () => {
      console.log('server compiling....  ');
    });
    serverCompiler.plugin('done', () => {
      console.log('server compiler done');
      resolve('done');
    });
  });
}

module.exports = middlewareRegister;