import { UserService } from './../services/UserService';
import { RegistrationRequest } from './../models/UserPassword';
import * as express from 'express'

export let userRouter = express.Router();
let userService = new UserService()

userRouter.post("/register", (req, res) => {
    let registerRequest: RegistrationRequest = req.body
    console.log(registerRequest)
    userService.register(registerRequest)
    .then(_ => res.sendStatus(201))
    .catch(err => {
        res.status(500)
        console.error(err)
    })
})