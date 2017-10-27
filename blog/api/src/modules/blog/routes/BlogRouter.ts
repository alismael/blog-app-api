import * as express from 'express'
import { BlogData } from '../models/Blog'
import { BlogService } from '../services/BlogService'
import { connection } from '../../mysql/mysql'
import { User } from '../../user/models/User'
import { DBIO } from '../../../libs/IO'
import { Maybe } from 'tsmonad/lib/src'
import { Unautherized } from './../../common/ErrorHandler'

export let blogRouter = express.Router();

let blogService = new BlogService();

// Get current user blogs
blogRouter.get('/', (req, res) => {
  let userIO: DBIO<Maybe<User>> = req.body.user

  let action = userIO.flatMap(user => {
    return user.caseOf({
      just: user => blogService.getUserBlogs(user),
      nothing: () => { throw new Unautherized }
    })
  })

  DBIO.run(connection, action)
    .then(result => {
      res.json(result)
    })
    .catch((err: Unautherized) => {
      err.apply(res)
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