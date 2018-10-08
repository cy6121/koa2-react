/* eslint-disable no-undef */
import views from 'koa-views';
import koaStatic from 'koa-static';
import path from 'path';
import router from './router/router';

module.exports = async function middlewareRegister(app) {
  app.use(views(path.join(__dirname, './views'), {
    default: 'html',
    map: { html: 'handlebars' },
  }));
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      app.emit('error', err, ctx);
      ctx.status = err.status || 500;
      ctx.body = '亲，>.<服务器出错啦~';
    }
  });
  app.use(koaStatic(path.join(__dirname, '../dist/assets')));
  app.use(router);
  app.use(async (ctx) => {
    ctx.status = 404;
  });
};
