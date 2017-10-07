import * as express from 'express'
import { Blog, BlogData } from '../models/Blog'
import { BlogService } from '../services/BlogService'
import { connection } from '../../mysql/mysql'
import * as uuid from 'uuid'

export let blogRouter = express.Router();

let blogService = new BlogService();

// Get all blogs
blogRouter.get('/', (req, res, next) => {

  blogService.findAll()
    .execute(connection)
    .then(blogs => {
      res.json(blogs)
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
});

// Get blog
blogRouter.get('/:guid', (req, res, next) => {
  blogService.findByGuid(req.params.guid)
    .execute(connection)
    .then(blog => {
      blog.caseOf({
        just: blog => res.send(blog),
        nothing: () => res.sendStatus(404)
      })
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
});

// Insert new blog
blogRouter.post('/', (req, res, next) => {
  BlogData.vaidateInsertBlogRequest(req.body)
    .then(blogData => {
      blogService.insert(blogData)
        .execute(connection)
        .then(_ => res.sendStatus(200))
        .catch(err => {
          res.sendStatus(500)
          console.log(err)
        })
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
});

// Update blog
blogRouter.put('/:guid', (req, res, next) => {
  BlogData.vaidateInsertBlogRequest(req.body)
  .then(blogData => {
    blogService.update(req.params.guid, blogData)
      .execute(connection)
      .then(_ => res.sendStatus(200))
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
  })
  .catch(err => {
    res.sendStatus(500)
    console.log(err)
  })
});

// // Delete blog
// blogRouter.delete('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let response = await blogService.delete(guid);
//   res.json(response);
// });