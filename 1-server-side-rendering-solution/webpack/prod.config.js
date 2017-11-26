// Webpack config for creating the production bundle.
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const strip = require('strip-loader');
const CompressionPlugin = require('compression-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './public/dist');
const distPath = path.resolve(projectRootPath, './dist/');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const WebpackIsomophichTools = require('./webpack-isomorphic-tools');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomophichTools);

require('dotenv').config();

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './client/index.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: './dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: strip.loader('debug') },
          { loader: 'babel-loader' },
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  resolve: {
    modules: ['common', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanPlugin([assetsPath, distPath], { root: projectRootPath }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.ENVIRONMENT),
        REDIRECTS_BASE_URL: JSON.stringify(process.env.REDIRECTS_BASE_URL),
        ZED_AUTH_SECRET: JSON.stringify(process.env.ZED_AUTH_SECRET),
        FACEBOOK_API_KEY: JSON.stringify(process.env.FACEBOOK_API_KEY),
        HOST_NAME: JSON.stringify(process.env.HOST_NAME),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 500,
    }),
    webpackIsomorphicToolsPlugin,
  ],
};

