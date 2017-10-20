import { db } from './../../db';
import { BlogFactory } from './../factory';
import { BlogService } from './../../../src/modules/blog/services/BlogService';
import { connection } from "../../../src/modules/mysql/mysql";
import { DBIO } from '../../../src/libs/IO';
import { Blog } from '../../../src/modules/blog/models/Blog';
let log = require('./../../../src/logger');

describe("blog service tests", () => {
  let service = new BlogService
  let factory = new BlogFactory

  test("find by id", (done) => {
    let action = service.findById(3)
    db.run(action, (r) => {
      expect(r).toBeInstanceOf(Blog)
      done()
    })
  })

  test("find by guid", (done) => {
    let action = service.findByGuid("967f9290-8f53-11e7-8b34-cdd8c538c8a6")
    db.run(action, (r) => {
      expect(r).toBeInstanceOf(Blog)
      done()
    })
  })

  test("create blog", (done) => {
    let action = service.insert(factory.blogData)
    db.run(action, (r) => {
      expect(r).toBeGreaterThan(0)
      done()
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
    db.run(action, (r) => {
      expect(r).toBeGreaterThan(0)
      done()
    })
  })

  test("get user blogs", (done) => {
    let action = service.getUserBlogs(1)
    db.run(action, (r) => {
      expect(Array.isArray(r))
      r.forEach(blog => expect(blog).toBeInstanceOf(Blog))
      done()
    })
  })
})
