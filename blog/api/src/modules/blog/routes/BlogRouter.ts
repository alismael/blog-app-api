import * as express from 'express'
import { Blog } from '../models/Blog'
import { BlogService } from '../services/BlogService'
var uuid = require('uuid')

export let blogRouter = express.Router();

let blogService = new BlogService();

// Get all blogs
blogRouter.get('/', async (req, res, next) => {
  let blogs = await blogService.findAll();
  res.json(blogs);
});

// // Get blog
// blogRouter.get('/:guid', async (req, res, next) => {
//   let blog = await blogService.findByGuid(req.params.guid);
//   res.json(blog);
// });

// // Insert new blog
// blogRouter.post('/', async (req, res, next) => {
//   let blog = new Blog();

//   blog.title = req.body.title;
//   blog.description = req.body.description;
//   blog.guid = uuid.v1();
//   blog.created_by = req.body.user_id;
//   blog.updated_by = req.body.user_id;

//   let response = await blogService.insert(blog);
//   res.json(response);
// });

// // Update blog
// blogRouter.put('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let updates = req.body;

//   let response = await blogService.update(guid, updates);
//   res.json(response);
// });

// // Delete blog
// blogRouter.delete('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let response = await blogService.delete(guid);
//   res.json(response);
// });