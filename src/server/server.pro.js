/**
 * Created by Raion on 2019/2/21.
 */

const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const { colors, port } = require('./config');
const { renderStream } = require('./controller');

const app = new Koa();
const router = new Router();

async function indexController(ctx) {
  renderStream(ctx);
}

router.get('*', indexController);
app.use(KoaStatic(path.join('dist/static'), {
  maxage: 1000 * 60 * 60 * 24 * 30,
}));
app.use(router.routes());

app.listen(port, () => {
  console.log(colors.green, `app start, listening to localhost:${port}`);
});
