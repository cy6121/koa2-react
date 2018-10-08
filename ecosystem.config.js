module.exports = {
  apps: [{
    name: 'Koa2-react',
    script: 'dist/server.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
