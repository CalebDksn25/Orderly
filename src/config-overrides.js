const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url/'),
    querystring: require.resolve('querystring-es3'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    process: require.resolve('process/browser'),
    assert: require.resolve('assert/')
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};