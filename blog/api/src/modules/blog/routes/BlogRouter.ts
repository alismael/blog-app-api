import * as express from 'express'
import { BlogData } from '../models/Blog'
import { BlogService } from '../services/BlogService'
import { connection } from '../../mysql/mysql'
import { Id } from '../../common/models';

export let blogRouter = express.Router();

let blogService = new BlogService();

// Get current user blogs
blogRouter.get('/', (_, res) => {
  let currentUserId: Id = 1 // Get blogs for user with id = 1
  blogService.getUserBlogs(currentUserId)
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
blogRouter.get('/:guid', (req, res) => {
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
blogRouter.post('/', (req, res) => {
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
blogRouter.put('/:guid', (req, res) => {
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