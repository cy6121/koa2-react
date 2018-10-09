module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({ // https://github.com/browserslist/browserslist#readme
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
    require('postcss-nested')(), // css like sass
    require('cssnano')({
      discardComments: { removeAll: true }, // 移除注释
    }),
  ],
};
