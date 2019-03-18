module.exports = {
  plugins: process.env.NODE_ENV === 'development' ? [
    require('postcss-preset-env')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
    require('postcss-import'),
  ] : [
    require('postcss-preset-env')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
    require('postcss-import'),
    require('cssnano'),
  ],
};
