/* eslint-disable no-undef */
import Koa from 'koa';
import http from 'http';
import config from '../../config/base.config';
import middlewareRegister from './middlewareRegister';


const app = new Koa();
if (__DEV__) {
  const { devMiddleware, hotMiddleware } = require('./hmr');
  app.use(devMiddleware);
  app.use(hotMiddleware);
}
middlewareRegister(app);
http.createServer(app.callback()).listen(config.port, () => {
  console.log(`listen to ${config.port}...`);
});
