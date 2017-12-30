import * as express from 'express'
import * as cookieParser from "cookie-parser"
import * as auth from "./libs/Authentication"

// Import modules api routes
import { BlogRouter } from './modules/blog/routes/BlogRouter';
// import { fileRouter } from './modules/file/routes/FileRouter';
import {UserRouter} from "./modules/user/routes/UserRouter"
import { FileRouter } from './modules/file/routes/FileRouter';
import { FileService } from './modules/file/services/FileService';

export let apiRoutes = express.Router();

// serve static files
var path = require('path');
apiRoutes.use("/public", express.static(path.join(__dirname, '../public')));

// cookie parser
apiRoutes.use(cookieParser())

// Authentication middleware
apiRoutes.use(auth.isAuthenticated)

// use blog routes under /api/blog
apiRoutes.use('/blog', new BlogRouter().route());

// use file routes under /api/file
// apiRoutes.use('/file', fileRouter);

apiRoutes.use('/user', new UserRouter().route());

// use file routes under /api/file
apiRoutes.use('/file', new FileRouter(new FileService()).route());
