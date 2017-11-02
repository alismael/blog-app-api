import * as express from 'express'
import { BlogData, Blog } from '../models/Blog'
import { BlogService } from '../services/BlogService'
import { connection } from '../../mysql/mysql'
import { User } from '../../user/models/User'
import { DBIO } from '../../../libs/IO'
import { Maybe } from 'tsmonad/lib/src'
import { IErrorHandler, Unautherized, NoSuchElement } from './../../common/ErrorHandler'
import _ = require('lodash');

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
      let blogs = _(result).map(blog => blog.toDto()).value();
      res.json(blogs)
    })
    .catch((err: IErrorHandler) => {
      err.apply(res)
    })
});

// Get blog
blogRouter.get('/:guid', (req, res) => {
  blogService.findByGuid(req.params.guid)
    .execute(connection)
    .then(blog => {
      blog.caseOf({
        just: blog => { 
          res.send(blog.toDto()) 
        },
        nothing: () => { throw new NoSuchElement }
      })
    })
    .catch((err: IErrorHandler) => {
      err.apply(res)
    })
});

// Insert new blog
blogRouter.post('/', (req, res) => {
  let userIO: DBIO<Maybe<User>> = req.body.user

  BlogData.vaidateInsertBlogRequest(req.body)
    .then(blogData => {
      let action = userIO.flatMap(user => {
        return user.caseOf({
          just: user => blogService.insert(blogData, user),
          nothing: () => { throw new Unautherized }
        })
      })
      DBIO.run(connection, action)
        .then(_ => res.sendStatus(201))
        .catch((err: IErrorHandler) => {
          err.apply(res)
        })
    })
    .catch(err => err.apply(res))
});

// Update blog
blogRouter.put('/:guid', (req, res) => {
  let userIO: DBIO<Maybe<User>> = req.body.user

  BlogData.vaidateInsertBlogRequest(req.body)
    .then(blogData => {
      let action = userIO.flatMap(user => {
        return user.caseOf({
          just: user => blogService.update(req.params.guid, blogData, user),
          nothing: () => { throw new Unautherized }
        })
      })
      DBIO.run(connection, action)
        .then(_ => res.sendStatus(200))
        .catch((err: IErrorHandler) => {
          err.apply(res)
        })
    })
    .catch(err => err.apply(res))
});