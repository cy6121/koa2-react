import React from 'react';
import { renderToString } from 'react-dom/server';
import Router from 'koa-router';
import { StaticRouter, Route, matchPath } from 'react-router-dom';
import { routes } from '../../client/router/index';

const router = new Router();

async function index(ctx) {
  const assets = require('../../../assets.json');
  const { url } = ctx.request;
  const data = {
    script: `<script src="${assets.index.js}"></script><script src="${assets.vendor.js}"></script><script src="${assets.manifest.js}"></script>`,
    link: `<link rel="stylesheet" href="${assets.index.css}" >`,
  };
  const path = url.indexOf('?') > -1 ? url.substr(0, url.indexOf('?')) : url;
  const route = routes.find(item => matchPath(path, item));
  if (route) {
    data.content = renderToString(
      <StaticRouter context={{}} location={url}>
        <Route {...route} />
      </StaticRouter>,
    );
  } else {
    ctx.status = 404;
  }
  return ctx.render('index', data);
}

router.get(routes.map(item => item.path), index);

export default router.routes();
