/* eslint-disable no-undef */
import Koa from 'koa';
import http from 'http';
import middlewareRegitster from './middlewareRegitster';


// export default function serverEntry(devMiddleware, hotMiddleware) {
const app = new Koa();
if (__DEV__) {
  const { devMiddleware, hotMiddleware } = require('./hmr');
  app.use(devMiddleware);
  app.use(hotMiddleware);
}
middlewareRegitster(app);
http.createServer(app.callback()).listen(9092, () => {
  console.log('listen to 9092...');
});
// }
//
// if (!__DEV__) {
//   http.createServer(serverEntry()).listen(9092, () => {
//     console.log('listen to 9092...');
//   });
// }
