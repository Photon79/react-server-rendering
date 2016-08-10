var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  compiler: {
    hash_type: 'hash',
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      modules: false,
      timings: true,
    },
  },
  devtool: 'cheap-module-eval-source-map',
  entry: [
    __dirname + '/src/client.js',
  ],
  module: {
    loaders: [{
      test: /.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      plugins: ['transform-runtime'],
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'scripts/bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([ {
      context: 'node_modules',
      from: 'highlight.js/styles/default.css',
      to: 'css/highlight.js/'
    }]),
  ],
  resolve: {
    extensions: [
      '', '.js', '.json'
    ],
    modulesDirectories: [
      'node_modules'
    ],
    root: process.cwd(),
  },
  target: 'web'
};
