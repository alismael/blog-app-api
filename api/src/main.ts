import { config } from './config/config'

// Import modules routes
import { blogRouter } from './modules/blog/routes/BlogRouter';
import { fileRouter } from './modules/file/routes/FileRouter';
import { userRouter } from "./modules/user/routes/UserRouter"

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// use blog routes under /api/blog
app.use('/api/blog', blogRouter);

// use file routes under /api/file
app.use('/api/file', fileRouter);

// use file routes under /api/file
app.use('/api', userRouter);

// Handle error routes
app.use(function(req, res){
    res.sendStatus(404);
});

// app listens on http://{{host}}:{{port}}
app.listen(config.port, config.host);