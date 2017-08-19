import { config } from './config/config'

// Import modules routes
import { blogRouter } from './modules/blog/routes/BlogRouter';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// use blog routes under /api/blog
app.use('/api/blog', blogRouter);

// Handle error routes
app.use(function(req, res){
    res.sendStatus(404);
});

// app listens on http://{{host}}:{{port}}
app.listen(config.port, config.host);