/**
 * Created by Raion on 2019/3/8.
 */

import assets from '../../../assets.json';

export const Header = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${assets.index.css}" />
    <title>React SSR</title>
  </head>
  <body>
    <div id="app">`;

export function getFooter(option) {
  const { vendor, index, manifest } = assets;
  return `</div>
    ${option.data ? `<script>window.__INITIAL_STATE__ = ${JSON.stringify(option.data)}</script>` : ''}
    <script src="${vendor.js}"></script>
    <script src="${index.js}"></script>
    <script src="${manifest.js}"></script>
  </body>
</html>`;
}
