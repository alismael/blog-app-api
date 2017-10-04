import { UserService } from "./../services/UserService";
import { UserPassword } from "./../models/UserPassword"
import { IRegistrationRequest } from "./../models/UserPassword";
import * as express from "express"
import { connection } from '../../mysql/mysql'

const userRouter = express.Router();
const userService = new UserService()

userRouter.post("/register", (req, res) => {
  UserPassword.vaidateRegistrationRequest(req.body)
    .then(userPassword => 
      userService.register(userPassword)
      .execute(connection)
    )
    .then(_ => res.sendStatus(201))
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})

// userRouter.post("/login", (req, res) => {
//   console.log(req.cookies)
//   userService.login(req.body.username, req.body.password)
//     .then(result => {
//       res.cookie("token", result)
//       res.send({
//         token: result
//       })
//     })
//     .catch(err => {
//       res.sendStatus(500)
//       console.error(err)
//     })
// })

export default userRouter