/* eslint-disable max-len */
/**
 * Created by Raion on 2019/2/19.
 */

const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const fs = require('fs');

const middlewareRegister = require('./middleware');

async function indexController(ctx) {
  const render = require('../../dist/server.js').default;
  const assets = require('../../assets.json');
  const content = render(ctx.url);
  return ctx.render('index', { content, scripts: [assets.vendor, assets.index, assets.manifest] });
}

function cleanCache(modulePath) {
  const module = require.cache[modulePath];
  // remove reference in module.parent
  if (module && module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}

const app = new Koa();
const router = new Router();
router.get('*', indexController);
middlewareRegister(app).then(() => {
  app.use(views(path.resolve(__dirname, './views'), {
    extension: 'hbs',
    map: { hbs: 'handlebars' },
  }));
  app.use(KoaStatic(path.join('dist/static')));
  app.use(router.routes());
  // 配置静态资源
  app.listen(3000, () => {
    console.log('app start');
  });
  fs.watch(require.resolve('../../dist/server.js'), () => {
    cleanCache(require.resolve('../../dist/server.js'));
  });

  fs.watch(require.resolve('../../assets.json'), () => {
    cleanCache(require.resolve('../../assets.json'));
  });
});

// const express = require('express');
// const path = require('path');
// const exhbs = require('express-handlebars');
// const fs = require('fs');
//
// const middlewareRegister = require('./middleware');
//
// async function indexController(req, res) {
//   const render = require('../../dist/server.js').default;
//   const assets = require('../../assets.json');
//   const content = render(req.url);
//   return res.render('index', { content, scripts: [assets.vendor, assets.index, assets.manifest] });
// }
//
// function cleanCache (modulePath) {
//   var module = require.cache[modulePath];
//   // remove reference in module.parent
//   if (module && module.parent) {
//     module.parent.children.splice(module.parent.children.indexOf(module), 1);
//   }
//   require.cache[modulePath] = null;
// }
//
// const app = new express();
// middlewareRegister(app).then(() => {
//   app.use(express.static(path.join(__dirname, '../../dist/static')));
//   app.engine('.hbs', exhbs({
//     extname: '.hbs',
//   }));
//   app.set('view engine', '.hbs');
//   app.set('views', path.join(__dirname, './views'));
//   app.get('*', indexController);
// // 配置静态资源
//   app.listen(3000, () => {
//     console.log('app start')
//   });
//   fs.watch(require.resolve('../../dist/server.js'), function () {
//     cleanCache(require.resolve('../../dist/server.js'));
//   });
//
//   fs.watch(require.resolve('../../assets.json'), function () {
//     cleanCache(require.resolve('../../assets.json'));
//   });
// });
