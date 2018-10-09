const babelConfig = require('../config/babel');
require('babel-register')(babelConfig.devServer);
require('../src/server/app');
