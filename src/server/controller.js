/* eslint-disable import/prefer-default-export */
/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes, { routes } from '../client/router/router';
import { Header, getFooter } from './views/index';
import configureStore from '../client/store/store';

function serverRender(url, data) {
  const store = configureStore(data);
  return (
    <Provider store={store}>
      <StaticRouter context={{}} location={url}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
}

async function handlePreData(ctx) {
  const lists = routes.filter(route => matchPath(ctx.url, route));
  if (lists.length) {
    const fetchList = lists.filter(route => typeof route.component.fetchData === 'function');
    const data = await Promise.all(fetchList.map(route => route.component.fetchData()));
    const result = {};
    data.forEach(item => Object.assign(result, item));
    return result;
  }
  return undefined;
}

export async function renderStream(ctx) {
  ctx.respond = false; // 防止koa自动处理response
  ctx.status = 200; // koa未处理会报404
  ctx.res.write(Header);
  const data = await handlePreData(ctx);
  const stream = renderToNodeStream(serverRender(ctx.url, data));
  stream.pipe(ctx.res, { end: false });
  stream.on('end', () => {
    ctx.res.end(getFooter({ data }));
  });
}
