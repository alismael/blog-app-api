import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { UserService } from '../modules/user/services/UserService'
import { DBIO } from './IO'
import { Maybe } from 'tsmonad'

export function isAuthenticated(req: express.Request, _: express.Response, next: any) {
	let token = req.cookies.token
	let service = new UserService

	// If token exist set user in request
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token,
			new Buffer(config.jwt.key, 'base64'),
			(err: jwt.JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError, decoded: any) => {

				if (!err) {
					let userUuid = decoded.sub.value
					req.body.user = service.getUser(userUuid)
					next()
				} else {
					req.body.user = DBIO.successful(Maybe.nothing())
					next()
				}

			});
	} else {
		req.body.user = DBIO.successful(Maybe.nothing())
		next()
	}
		

}