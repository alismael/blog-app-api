import { Unautherized, errorHandler } from './../../common/ErrorHandler';
import { connection } from './../../mysql/mysql';
import { Maybe } from 'tsmonad';
import { IFileService } from './../services/IFileService'
import * as express from 'express'
import * as uuid from 'uuid'
import * as Busboy from "busboy"
import { IO } from '../../../libs/IO';
import { User } from '../../user/models/User';
import { FileUUID } from '../models/File';

export class FileRouter {
  constructor(public service: IFileService) { }

  upload(req: express.Request, res: express.Response) {
    const userIO: IO<Maybe<User>> = req.body.user
    const busboy = new Busboy({ headers: req.headers });
    userIO.execute(connection)
      .then((mUser: Maybe<User>) => {
        mUser.caseOf({
          just: (user) => {
            busboy.on('file', (_: string, file: NodeJS.ReadableStream, __: string, ___: string, ____: string) => {
              let fileUUID = uuid.v4()
              this.service.upload(file, fileUUID, user.id).on('close', () => {
                this.service.insert(new FileUUID(fileUUID), user.id).execute(connection)
                  .then(_ => res.status(200)
                    .send({
                      uuid: fileUUID
                    })
                  )
                  .catch(errorHandler(res))
              })
            })
            req.pipe(busboy);
          },
          nothing: () => {
            throw Unautherized
          }
        })
      })
      .catch(errorHandler(res))
  }

  route(): express.Router {
    let fileRouter = express.Router();
    fileRouter.post("/upload", (req, res) => this.upload(req, res))
    return fileRouter
  }

}
