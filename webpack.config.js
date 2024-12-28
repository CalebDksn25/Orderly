const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser.js'), // Add the correct extension
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      os: require.resolve('os-browserify/browser'),
      querystring: require.resolve('querystring-es3'),
      fs: false,
      net: false,
      tls: false,
      http2: false, // Ensure http2 is set to false
      child_process: false
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/boxicons/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js', // Add the correct extension
    }),
  ],
};