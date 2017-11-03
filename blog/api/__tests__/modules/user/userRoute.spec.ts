import { UserRouter } from './../../../src/modules/user/routes/UserRouter';
import { UserService } from "../../../src/modules/user/services/UserService";
import { UserFactory } from "../factory";
import { UserPasswordData } from "../../../src/modules/user/models/UserPassword";
import { DBIO } from "../../../src/libs/IO";
import * as supertest from "supertest"
import * as express from "express"
import * as bodyParser from "body-parser"
import { JWT } from "../../../src/modules/user/models/User";

describe("user route tests", () => {
  let factory = new UserFactory

  let userRoute = new class extends UserRouter {
    userService = new class extends UserService {
      register(data: UserPasswordData): DBIO<number> {
        return DBIO.successful(1)
      }
      
      login(username: string, plainPassword: string): DBIO<JWT> {
        return DBIO.successful("123")
      }
    }()
  }()

  const app = express()
  app.use(bodyParser.json())
  app.use(userRoute.route())

  test("register route", (done) => {
    supertest(app)
      .post('/register')
      .send(factory.registrationRequest)
      .set('Accept', "application/json")
      .expect(201)
      .end((err, res) => done())
  })

  test("login route", (done) => {
    supertest(app)
      .post('/login')
      .send(factory.loginRequest)
      .set('Accept', "application/json")
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        done()
      })
  })
})