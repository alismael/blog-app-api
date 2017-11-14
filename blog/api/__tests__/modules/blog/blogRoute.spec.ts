import { DBIO } from './../../../src/libs/IO';
import { User } from './../../../src/modules/user/models/User';
import { Id, Trace } from './../../../src/modules/common/models';
import { Blog, BlogData } from './../../../src/modules/blog/models/Blog';
import { Maybe } from 'tsmonad';
import { BlogRouter } from './../../../src/modules/blog/routes/BlogRouter';
import blogFactory from './../../factories/BlogFactory';
import { UserRouter } from './../../../src/modules/user/routes/UserRouter';
import { UserService } from "../../../src/modules/user/services/UserService";
import { UserPasswordData } from "../../../src/modules/user/models/UserPassword";
import * as supertest from "supertest"
import * as express from "express"
import * as bodyParser from "body-parser"
import { JWT, UserUUID, UserId } from "../../../src/modules/user/models/User";
import {} from "jest";
import { UserFactory } from "../../factories/UserFactory";
import { BlogService } from '../../../src/modules/blog/services/BlogService';
import blogServiceMock from "./BlogServiceMock"

describe("blog route tests", () => {
  const userFactory = new UserFactory
  const userId: UserId = new UserId(1)
  const userModel: User = new User(this.userId, new UserUUID("test"), userFactory.userData, Trace.createTrace(this.userId))

  const blogRoute = new class extends BlogRouter {
    blogService: BlogService = blogServiceMock
  }()

  const app = express()
  app.use(bodyParser.json())
  // middleware mockups
  app.use((req, _, next) => {
    req.body.user = DBIO.successful(Maybe.just(userModel))
    next()
  })
  app.use(blogRoute.route())

  test("find blog by uuid", done => {
    supertest(app)
      .get(`/${blogFactory.blog.guid.value}`)
      .set('Accept', "application/json")
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).toMatchObject(blogFactory.blog.toDto())
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
        expect(res.body).toMatchObject([blogFactory.blog.toDto()])
        done()
      })
  })
})