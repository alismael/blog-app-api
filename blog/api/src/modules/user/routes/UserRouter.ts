import { connection } from './../../mysql/mysql'
import { errorHandler } from './../../common/ErrorHandler'
import { UserService } from "./../services/UserService"
import { UserPassword } from "./../models/UserPassword"
import * as express from "express"
import { DBIO } from "../../../libs/IO"

export class UserRouter {
  public userService: UserService = new UserService
  
  register(req: express.Request, res: express.Response) {
    UserPassword.vaidateRegistrationRequest(req.body)
    .then(userPassword => 
      DBIO.run(connection, this.userService.register(userPassword))
    )
    .then(_ => res.sendStatus(201))
    .catch(errorHandler(res))
  }

  login(req: express.Request, res: express.Response) {
    DBIO.run(connection, this.userService.login(req.body.username, req.body.password))
    .then(result => {
      res.cookie("token", result)
      res.status(200).send({
        token: result
      })
    })
    .catch(errorHandler(res))
  }
  route(): express.Router {
    let userRoute = express.Router()
    userRoute.post("/register", (req, res) => this.register(req, res))
    userRoute.post("/login", (req, res) => this.login(req, res))
    return userRoute
  }
}
