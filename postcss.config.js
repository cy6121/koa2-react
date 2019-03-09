module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
    require('postcss-import'),
    require('cssnano'),
  ],
};
