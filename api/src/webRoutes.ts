var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var webpack = require('webpack');
var config = require('./../../web/webpack.config.js');
var compiler = webpack(config);

export let webRoutes = express.Router();

webRoutes.use(bodyParser.urlencoded({ extended: false }));
webRoutes.use(bodyParser.json());
webRoutes.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
webRoutes.use(require('webpack-hot-middleware')(compiler));
webRoutes.use("/public", express.static(path.join(__dirname, './../../web/public')));
webRoutes.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "./../../web/index.html"));
});