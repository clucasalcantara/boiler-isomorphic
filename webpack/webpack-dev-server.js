const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./dev.config');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const config = {};
const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = new Express();

app.use(WebpackDevMiddleware(compiler, serverOptions));
app.use(WebpackHotMiddleware(compiler));

/* eslint-disable */
app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {    
    console.log(`PORT ${port} ready`)
  }
});

