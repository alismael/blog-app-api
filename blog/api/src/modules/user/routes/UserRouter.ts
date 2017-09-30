import { UserService } from './../services/UserService';
import { UserPassword } from './../models/UserPassword'
import { IRegistrationRequest } from './../models/UserPassword';
import * as express from 'express'

export let userRouter = express.Router();
let userService = new UserService()

userRouter.post("/register", (req, res) => {
  UserPassword.vaidateRegistrationRequest(req.body)
    .then(userPasswordData => userService.register(userPasswordData))
    .then(_ => res.sendStatus(201))
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})