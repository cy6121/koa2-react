/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/router/router';


export default function render(url, data) {
  return renderToString(
    <StaticRouter context={{}} location={url}>
      <Routes/>
    </StaticRouter>
  );
}