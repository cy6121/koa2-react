/**
 * Created by Raion on 2019/2/21.
 */

const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const render = require('./controller').default;

async function indexController(ctx) {
  const assets = require('../../assets.json');
  const content = render(ctx.url);
  return ctx.render('index', { content, scripts: [assets.vendor, assets.index, assets.manifest] });
}

const app = new Koa();
const router = new Router();
router.get('*', indexController);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const status = e.status || 500;
    ctx.status = status;

    if (status === 500) {
      // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
      app.emit('error', e, ctx);
    }
  }
});

app.use(views(path.resolve(__dirname, './views'), {
  extension: 'hbs',
  map: { hbs: 'handlebars' },
}));
app.use(KoaStatic('dist/static'));
app.use(router.routes());
// 配置静态资源
app.listen(3000, () => {
  console.log('app start');
});
