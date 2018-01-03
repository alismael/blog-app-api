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
                  .then(_ => res.send(fileUUID))
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

// let fileService = new FileService();

// // Get files by object_model, object_id
// fileRouter.get('/all/:model/:id', async (req, res, next) => {
//   let objectId = req.params.id;
//   let objectModel = req.params.model;
//   let files = await fileService.findByObject(objectId, objectModel);
//   res.json(files);
// });

// // Get file with guid
// fileRouter.get('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let file = await fileService.find(guid);
//   res.json(file);
// });

// fileRouter.post('/upload', async function(req, res) {

//   let fileObj = new File();

//   fileObj.guid = uuid.v1();
//   fileObj.object_id = 1;
//   fileObj.object_model = 'blog';
//   fileObj.created_by = 1;
//   fileObj.updated_by = 1;

//   var storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//       let uploadDir = './uploads/';
//       let dest = uploadDir + fileObj.guid;
//       let stat = null;
//       try {
//         stat = fs.statSync(dest);
//       }
//       catch (err) {
//         try {
//           fs.statSync(uploadDir);
//         }
//         catch (err) {
//           fs.mkdirSync(uploadDir);
//         }
//         fs.mkdirSync(dest);
//       }
//       if (stat && !stat.isDirectory()) {
//         res.json("error");
//       }
//       callback(null, dest);
//     },
//     filename: function(req, file, callback) {
//       fileObj.title = file.originalname;
//       callback(null, file.originalname);
//     }
//   });
//   var upload = multer({ storage: storage }).single('file');

//   upload(req, res, async function(err) {
//     if (err) {
//       res.json("error");
//     }

//     // Add new file
//     let response = await fileService.insert(fileObj);
//     res.json(response);
//   });
// });

// // Attach files with object_id, object_model
// fileRouter.put('/attach', async (req, res, next) => {
//   let response = await fileService.attach(req.body.object_id, req.body.object_model, req.body.files);
//   res.json(response);
// });

// // Update file
// fileRouter.put('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let updates = req.body;

//   let response = await fileService.update(guid, updates);
//   res.json(response);
// });

// // Default delete route
// fileRouter.delete('/:guid', async (req, res, next) => {
//   let guid = req.params.guid;
//   let response = await fileService.delete(guid);
//   res.json(response);
// });
