import * as express from 'express'
import { BlogData, Blog } from '../models/Blog'
import { BlogService } from '../services/BlogService'
import { connection } from '../../mysql/mysql'
import { User } from '../../user/models/User'
import { DBIO, IO } from '../../../libs/IO'
import { Maybe } from 'tsmonad/lib/src'
import { Unautherized, NoSuchElement, errorHandler } from './../../common/ErrorHandler'
import * as _ from "lodash";
import { Response, Request } from "express"

export class BlogRouter {

  blogService = new BlogService  

  getUserBlogs(req: Request, res: Response): Promise<Response> {
    const userIO: IO<Maybe<User>> = req.body.user
    const action = userIO.flatMap(user => {
      return user.caseOf({
        just: user => this.blogService.getUserBlogs(user),
        nothing: () => { throw new Unautherized }
      })
    })

    return DBIO.executeTransactionally(connection, action)
      .then<Response>(result => {
        const blogs = _.map(result, (blog: Blog) => blog.toDto());
        return res.status(200).json(blogs)
      })
      .catch<Response>(errorHandler(res))
  }

  getBlog(req: Request, res: Response): Promise<Response> {
    return this.blogService.findByGuid(req.params.guid)
      .execute(connection)
      .then<Response>(blog => {
        return blog.caseOf({
          just: blog => res.status(200).send(blog.toDto()),
          nothing: () => { throw new NoSuchElement }
        })
      })
      .catch<Response>(errorHandler(res))
  }

  createBlog(req: Request, res: Response): Promise<Response> {
    const userIO: IO<Maybe<User>> = req.body.user

    return BlogData.vaidateInsertBlogRequest(req.body)
      .then(blogData => {
        const action = userIO.flatMap(user => {
          return user.caseOf({
            just: user => this.blogService.insert(blogData, user),
            nothing: () => { throw new Unautherized }
          })
        })
        return DBIO.executeTransactionally(connection, action)
          .then<Response>(_ => res.sendStatus(201))
          .catch<Response>(errorHandler(res))
      })
      .catch(errorHandler(res))
  }

  updateBlog(req: Request, res: Response): Promise<Response> {
    const userIO: IO<Maybe<User>> = req.body.user

    return BlogData.vaidateInsertBlogRequest(req.body)
      .then(blogData => {
        const action = userIO.flatMap(user => {
          return user.caseOf({
            just: user => this.blogService.update(req.params.guid, blogData, user),
            nothing: () => { throw new Unautherized }
          })
        })
        return DBIO.executeTransactionally(connection, action)
          .then(_ => res.sendStatus(200))
          .catch(errorHandler(res))
      })
      .catch(errorHandler(res))
  }

  route(): express.Router {
    let blogRoute = express.Router()
    blogRoute.get("/:guid", (req, res) => this.getBlog(req, res))
    blogRoute.get("/", (req, res) => this.getUserBlogs(req, res))
    blogRoute.post("/", (req, res) => this.createBlog(req, res))
    blogRoute.put("/:guid", (req, res) => this.updateBlog(req, res))
    return blogRoute
  }
}
