/**
 * Created by Raion on 2019/2/19.
 */
const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const { colors, port } = require('./config');
const hmrRegister = require('./hmr');

const app = new Koa();
const router = new Router();

async function indexController(ctx) {
  const { renderStream } = require('../../dist/server.js');
  renderStream(ctx);
}

router.get('*', indexController);
hmrRegister(app).then(() => {
  app.use(KoaStatic(path.join('dist/static'), {
    maxage: 1000 * 60 * 60 * 24 * 30,
  }));
  app.use(router.routes());
  app.listen(port, () => {
    console.log(colors.green, `app start, listening to localhost:${port}`);
  });
});
