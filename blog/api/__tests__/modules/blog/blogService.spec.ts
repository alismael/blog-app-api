import { db } from './../../db';
import { BlogFactory } from './../factory';
import { BlogService } from './../../../src/modules/blog/services/BlogService';
import { connection } from "../../../src/modules/mysql/mysql";
describe("blog service tests", () => {
  let service = new BlogService
  let factory = new BlogFactory
  test("create blog", (done) => {
    let action = service.insert(factory.blogData)
    db.run(action, (r) => {
      expect(r).toBeGreaterThan(1)
      done()
    })
  })
})
