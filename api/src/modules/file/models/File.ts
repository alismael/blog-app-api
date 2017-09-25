// import { Entity } from './../../entity/models/Entity'
// import { IFileRepository } from './../repositories/IFileRepository'
// import { FileMysqlRepository } from './../repositories/FileMysqlRepository'

// // File repository
// let _fileRepository: IFileRepository = new FileMysqlRepository();

// export class File extends Entity {


//   // Public attributes
//   public id: number;
//   public title: string;
//   public object_id: number;
//   public object_model: string;
//   public guid: string;
//   public created_by: number;
//   public created_at: string;
//   public updated_by: number;
//   public updated_at: string;

//   public tableName() {
//     return "file";
//   }

//   public tableColumns() {
//     return ['id', 'title', 'object_id', 'object_model', 'guid', 'created_by', 'created_at', 'updated_by', 'updated_at'];
//   }

//   // Attach file with object
//   public attach(objectId: number, objectModel: string, files: string[]) {
//     return _fileRepository.attach(objectId, objectModel, files);
//   }
// }