/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/router/router';
import { Header, getFooter } from './views/index';

function serverRender(url) {
  return (
    <StaticRouter context={{}} location={url}>
      <Routes />
    </StaticRouter>
  );
}

export function renderHtml(ctx, data) {
  const assets = require('../../assets.json');
  const content = renderToString(serverRender(ctx.url));
  ctx.body = `${Header}${content}${getFooter({ assets, ...data })}`;
}

export function renderStream(ctx, data) {
  ctx.respond = false; // 防止koa自动处理response
  ctx.status = 200; // koa未处理会报404
  ctx.res.write(Header);
  const stream = renderToNodeStream(serverRender(ctx.url));
  const assets = require('../../assets.json');
  stream.pipe(ctx.res, { end: false });
  stream.on('end', () => {
    ctx.res.end(getFooter({ assets, ...data }));
  });
}
