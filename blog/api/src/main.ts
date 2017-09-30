import { config } from './config/config'

// Import modules routes
import { apiRoutes } from './apiRoutes';
import { webRoutes } from './webRoutes';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// use api routes under /api
app.use('/api', apiRoutes);

// use web routes under /
app.use('/', webRoutes);

// Handle error routes
app.use(function(req, res) {
  res.sendStatus(404);
});

// app listens on http://{{host}}:{{port}}
app.listen(config.port, config.host);