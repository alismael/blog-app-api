import { db } from './../../db'
import { BlogService } from './../../../src/modules/blog/services/BlogService'
import { connection } from "../../../src/modules/mysql/mysql"
import { DBIO } from '../../../src/libs/IO'
import { Blog, IBlogRecord } from '../../../src/modules/blog/models/Blog'
import { USER, UserFactory } from '../../factories/UserFactory'
import { BlogFactory } from '../../factories/BlogFactory'
let logger = require('./../../../src/logger')

describe("blog service tests", () => {
  let service = new BlogService
  let blogFactory = new BlogFactory
  let userFactory = new UserFactory

  test("find by id", (done) => {
    let testUser = userFactory.user(USER.ADMIN)
    let userIO = userFactory.createUser(testUser)
    let testBlog = BlogFactory.blogs(testUser.user)[0]

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(testBlog)
        .flatMap(blog => service.findById(blog.id.value))
    })

    db.run(action)
      .then(result => {
        result.caseOf({
          just: blog => {
            expect(blog.guid.value).toBe(testBlog.guid.value)
            expect(blog.data.title).toBe(testBlog.data.title)
            expect(blog.data.description).toBe(testBlog.data.description)
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
    let testUser = userFactory.user(USER.ADMIN)
    let userIO = userFactory.createUser(testUser)
    let testBlog = BlogFactory.blogs(testUser.user)[0]

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(testBlog)
        .flatMap(blog => service.findByGuid(blog.guid.value))
    })

    db.run(action)
      .then(result => {
        result.caseOf({
          just: blog => {
            expect(blog.guid.value).toBe(testBlog.guid.value)
            expect(blog.data.title).toBe(testBlog.data.title)
            expect(blog.data.description).toBe(testBlog.data.description)
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
    let testUser = userFactory.user(USER.ADMIN)
    let userIO = userFactory.createUser(testUser)
    let testBlog = BlogFactory.blogs(testUser.user)[0]
    let updatedBlog = BlogFactory.blogs(testUser.user)[1]

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(testBlog)
        .flatMap(blog => service.update(blog.guid.value, updatedBlog.data, testUser.user)
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
    let testUser = userFactory.user(USER.ADMIN)
    let userIO = userFactory.createUser(testUser)
    let testBlog = BlogFactory.blogs(testUser.user)[0]

    let action = userIO.flatMap(userRecord => {
      return blogFactory.createBlog(testBlog)
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
