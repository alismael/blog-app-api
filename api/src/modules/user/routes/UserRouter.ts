import { UserService } from './../services/UserService';
import { UserPassword } from './../models/UserPassword'
import { RegistrationRequest } from './../models/UserPassword';
import * as express from 'express'

export let userRouter = express.Router();
let userService = new UserService()

userRouter.post("/register", (req, res) => {
    UserPassword.vaidateRegistrationRequest(req.body)
    .then(userPassword => userService.register(userPassword))
    .then(_ => res.sendStatus(201))
    .catch(err => {
        res.sendStatus(500)
        console.error(err)
    })
})