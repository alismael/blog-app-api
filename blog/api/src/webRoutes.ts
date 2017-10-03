var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

export let webRoutes = express.Router();

webRoutes.use(bodyParser.urlencoded({ extended: false }));
webRoutes.use(bodyParser.json());

webRoutes.use("/public", express.static(path.join(__dirname, './../../web/public')));
webRoutes.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + "./../../web/index.html"));
});