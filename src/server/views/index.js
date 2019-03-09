/**
 * Created by Raion on 2019/3/8.
 */

function Header(assets) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${assets.index.css}" />
    <title>React SSR</title>
  </head>
  <body>
    <div id="app">`;
}

function getFooter(option) {
  const { vendor, index, manifest } = option.assets;
  return `</div>
    ${option.data ? `<script>window.__INITIAL_STATE__ = JSON.stringify(${option.data})</script>` : ''}
    <script src="${vendor.js}"></script>
    <script src="${index.js}"></script>
    <script src="${manifest.js}"></script>
  </body>
</html>`;
}

module.exports = {
  Header,
  getFooter,
};
