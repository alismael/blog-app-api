import { db } from './../../db'
import { BlogService } from './../../../src/modules/blog/services/BlogService'
import { connection } from "../../../src/modules/mysql/mysql"
import { DBIO } from '../../../src/libs/IO'
import { Blog, IBlogRecord, BlogData } from '../../../src/modules/blog/models/Blog'
import { USER, UserFactory } from '../../factories/UserFactory'
import { BlogFactory } from '../../factories/BlogFactory'
import { Maybe } from 'tsmonad';
let logger = require('./../../../src/logger')

describe("blog service tests", () => {
  const service = new BlogService
  const blogFactory = new BlogFactory
  const userFactory = new UserFactory

  test("find by id", (done) => {
    const userIO = userFactory.user()

    let action: DBIO<Maybe<Blog>> = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(userRecord.userPassword.trace)
        .flatMap(blog => service.findById(blog.id.value))
    })

    db.run(action)
      .then(result => {
        result.caseOf({
          just: blog => {
            expect(blog.data.title).toBe(blogFactory.blogData.title)
            expect(blog.data.description).toBe(blogFactory.blogData.description)
            done()
          },
          nothing: () => { throw Error("Error: blog not found") }
        })
      })
      .catch(err => {
        throw err
      })
  })

  test("find by guid", (done) => {
    let userIO = userFactory.user()

    let action: DBIO<Maybe<Blog>> = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(userRecord.userPassword.trace)
        .flatMap(blog => service.findByGuid(blog.guid.value))
    })

    db.run(action)
      .then(result => {
        result.caseOf({
          just: blog => {
            expect(blog.data.title).toBe(blogFactory.blogData.title)
            expect(blog.data.description).toBe(blogFactory.blogData.description)
            done()
          },
          nothing: () => { throw Error("Error: blog not found") }
        })
      })
      .catch(err => {
        throw err
      })
  })

  test("update blog", (done) => {
    const userIO = userFactory.user()
    const blog = blogFactory.blogData
    const updatedBlog: BlogData = Object.assign({}, blogFactory.blogData, {
      title: "updated title"
    })

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(userRecord.userPassword.trace)
        .flatMap(blog => service.update(blog.guid.value, updatedBlog, userRecord.user))
    })

    db.run(action)
      .then(result => {
        expect(result['affectedRows']).toBe(1)
        done()
      })
      .catch(err => {
        throw err
      })
  })

  test("get user blogs", (done) => {
    let userIO = userFactory.user()

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(userRecord.userPassword.trace)
        .flatMap(blog => service.getUserBlogs(userRecord.user))
    })

    db.run(action)
      .then(result => {
        expect(Array.isArray(result))
        result.forEach(blog => expect(blog).toBeInstanceOf(Blog))
        done()
      })
      .catch(err => {
        throw err
      })
  })
})
