import { DBIO } from './../../../src/libs/IO';
import { User } from './../../../src/modules/user/models/User';
import { Id } from './../../../src/modules/common/models';
import { Blog, BlogData } from './../../../src/modules/blog/models/Blog';
import { Maybe } from 'tsmonad';
import { BlogRouter } from './../../../src/modules/blog/routes/BlogRouter';
import { BlogFactory } from './../../factories/BlogFactory';
import { UserRouter } from './../../../src/modules/user/routes/UserRouter';
import { UserService } from "../../../src/modules/user/services/UserService";
import { UserPasswordData } from "../../../src/modules/user/models/UserPassword";
import * as supertest from "supertest"
import * as express from "express"
import * as bodyParser from "body-parser"
import { JWT } from "../../../src/modules/user/models/User";
import {} from "jest";
import { UserFactory } from "../../factories/UserFactory";
import { BlogService } from '../../../src/modules/blog/services/BlogService';

describe("blog route tests", () => {
  const factory = new BlogFactory
  const userFactory = new UserFactory

  let blogRoute = new class extends BlogRouter {
    blogService = new class extends BlogService {
        // Get blog by guid
  findByGuid(guid: string): DBIO<Maybe<Blog>> {
    return DBIO.successful(Maybe.just(factory.blog))
  }

  // Get blog by guid
  findById(id: Id): DBIO<Maybe<Blog>> {
    return DBIO.successful(Maybe.just(factory.blog))
  }

  // Add new blog
  insert(data: BlogData, user: User): DBIO<number> {
    return DBIO.successful(1)
  }

  // Update blog
  update(guid: string, data: BlogData, user: User): DBIO<number> {
    return DBIO.successful(1)
  }

  // Get user blogs
  getUserBlogs(user: User): DBIO<Blog[]> {
    return DBIO.successful([factory.blog])
  }
    }()
  }()

  const app = express()
  app.use(bodyParser.json())
  // middleware mockups
  app.use((req, _, next) => {
    req.body.user = DBIO.successful(Maybe.just(userFactory.userModel))
    next()
  })
  app.use(blogRoute.route())

  test("find blog by uuid", done => {
    supertest(app)
      .get(`/${factory.blog.guid.value}`)
      .set('Accept', "application/json")
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).toMatchObject(factory.blog.toDto())
        done()
      })
  })

  test("find user blogs", done => {
    supertest(app)
      .get('/')
      .set('Accept', "application/json")
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).toMatchObject([factory.blog.toDto()])
        done()
      })
  })
})