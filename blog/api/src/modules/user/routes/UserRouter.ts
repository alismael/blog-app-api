import { connection } from './../../mysql/mysql'
import { ErrorHandler } from './../../common/ErrorHandler'
import { UserService } from "./../services/UserService"
import { UserPassword } from "./../models/UserPassword"
import { RegistrationError } from "./../models/UserPassword"
import * as express from "express"
import { DBIO } from "../../../libs/IO"

const userRouter = express.Router()
const userService = new UserService()

userRouter.post("/register", (req, res) => {
  UserPassword.vaidateRegistrationRequest(req.body)
    .then(userPassword => 
      DBIO.run(connection, userService.register(userPassword))
    )
    .then(_ => res.sendStatus(201))
    .catch((err: ErrorHandler<RegistrationError>) => {
      err.apply(res)
    })
})

userRouter.post("/login", (req, res) => {
  DBIO.run(connection, userService.login(req.body.username, req.body.password))
    .then(result => {
      res.cookie("token", result)
      res.send({
        token: result
      })
    })
    .catch((err: ErrorHandler<string>) => {
      err.apply(res)
    })
})

export default userRouter