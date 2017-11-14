import * as express from 'express'
import * as cookieParser from "cookie-parser"
import * as auth from "./libs/Authentication"

// Import modules api routes
import { BlogRouter } from './modules/blog/routes/BlogRouter';
// import { fileRouter } from './modules/file/routes/FileRouter';
import {UserRouter} from "./modules/user/routes/UserRouter"

export let apiRoutes = express.Router();

// cookie parser
apiRoutes.use(cookieParser())

// Authentication middleware
apiRoutes.use(auth.isAuthenticated)

// use blog routes under /api/blog
apiRoutes.use('/blog', new BlogRouter().route());

// use file routes under /api/file
// apiRoutes.use('/file', fileRouter);

// use file routes under /api/file
apiRoutes.use('/user', new UserRouter().route());
