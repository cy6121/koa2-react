// module.exports = {
//   client: {
//     presets: ['es2015', 'stage-0', 'react'],
//     plugins: [
//       ['transform-runtime'],
//     ],
//   },
//   server: {
//     presets: [
//       ['env', {
//         targets: { node: 'current' },
//       }],
//       ['stage-0'],
//       ['react'],
//     ],
//     plugins: [
//       ['transform-runtime'],
//     ],
//   },
// };
module.exports = {
  devClient: {
    presets: ['es2015', 'stage-0', 'react'],
    plugins: [
      ['transform-runtime'],
      // ['dynamic-import-node'],
      ['inline-replace-variables', {
        __CLIENT__: true,
        __DEV__: true,
      }],
    ],
    babelrc: false,
  },
  devServer: {
    presets: [
      ['env', {
        targets: { node: 'current' },
      }],
      ['stage-0'],
      ['react'],
    ],
    plugins: [
      [
        'babel-plugin-transform-require-ignore',
        {
          extensions: ['.pcss', 'css', '.sass', '.less'],
        },
      ],
      ['dynamic-import-node'],
      ['inline-replace-variables', {
        __CLIENT__: false,
        __DEV__: true,
      }],
      ['transform-runtime'],
    ],
    babelrc: false,
  },
  proClient: {
    presets: ['es2015', 'stage-0', 'react'],
    plugins: [
      ['transform-runtime'],
    ],
    babelrc: false,
  },
  proServer: {
    presets: [
      ['env', {
        targets: { node: 'current' },
      }],
      ['stage-0'],
      ['react'],
    ],
    plugins: [
      ['transform-runtime'],
    ],
    babelrc: false,
  },
};