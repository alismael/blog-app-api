import { db } from './../../db'
import { BlogFactory } from './../factory'
import { BlogService } from './../../../src/modules/blog/services/BlogService'
import { connection } from "../../../src/modules/mysql/mysql"
import { DBIO } from '../../../src/libs/IO'
import { Blog, IBlogRecord } from '../../../src/modules/blog/models/Blog'
let logger = require('./../../../src/logger')

describe("blog service tests", () => {
  let service = new BlogService
  let factory = new BlogFactory

  test("find by id", (done) => {
    let action = service.insert(factory.blogData)
      .flatMap(id => service.findById(id))

    db.run(action)
      .then(result => {
        expect(typeof result).toBe('object')
        done()
      })
      .catch(err => {
        throw err
      })
  })

  test("find by guid", (done) => {
    let action = service.insert(factory.blogData)
      .flatMap(id => service.findById(id)
        .flatMap(blog => blog.caseOf({
          just: blog => service.findByGuid(blog.guid.value),
          nothing: () => DBIO.failed("blog not found")
        }))
      )
    db.run(action)
      .then(result => {
        expect(typeof result).toBe('object')
        done()
      })
      .catch(err => {
        throw err
      })
  })

  test("create blog", (done) => {
    let action = service.insert(factory.blogData)
    db.run(action)
      .then(result => {
        expect(result).toBeGreaterThan(0)
        done()
      })
      .catch(err => {
        throw err
      })
  })

  test("update blog", (done) => {
    let action = service.insert(factory.blogData)
      .flatMap(id => service.findById(id)
        .flatMap(blog => blog.caseOf({
          just: blog => service.update(blog.guid.value, factory.blogDataUpdate),
          nothing: () => DBIO.failed("blog not found")
        }))
      )
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
    let action = service.getUserBlogs(1)
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
