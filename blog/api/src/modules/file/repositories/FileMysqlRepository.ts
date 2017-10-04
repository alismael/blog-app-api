// import { IFileRepository } from './IFileRepository'
// import { File } from './../models/File'
// import knex from './../../knex/knex'
// var uuid = require('uuid')

// export class FileMysqlRepository implements IFileRepository {

//   // Attach file with object
//   public async attach(object_id: number, object_model: string, files: string[]) {
//     return await knex('file')
//       .where('guid', 'IN', files)
//       .update({
//         object_model: object_model,
//         object_id: object_id
//       })
//       .catch(function(err) {
//         return "error"
//       });
//   }

// }
