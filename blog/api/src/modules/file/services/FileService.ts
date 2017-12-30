import { WriteStream } from 'fs';
import { IFileService } from './IFileService';
import * as path from "path";
import * as fs from 'fs'
import { UUID } from '../../common/models';

export class FileService implements IFileService { 
  upload(stream: NodeJS.ReadableStream, fileUUID: UUID): WriteStream {
    let saveTo = path.join((path.join(__dirname, `/../../../../dest/uploads/${fileUUID}`)))
    let fstream = fs.createWriteStream(saveTo) 
    stream.pipe(fstream);
    return fstream    
  }

}
//   private file = new File();


//   // abstraction for finding file
//   public find(guid?: string) {
//     if (guid)
//       return this.findByGuid(guid);
//     else
//       return this.findAll();
//   }

//   // Get all files
//   public async findAll() {
//     return await this.file
//       .find()
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Get file by guid
//   public async findByGuid(guid: string) {
//     return await this.file
//       .find()
//       .where('guid', guid)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Get file by guid
//   public async findByObject(objectId: number, objectModel: string) {
//     return await this.file
//       .find()
//       .where('object_id', objectId)
//       .where('object_model', objectModel)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Add new file
//   public async insert(file: File) {
//     return await this.file
//       .insert(file)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Update file
//   public async update(guid: string, updates: any) {
//     return await this.file
//       .update(updates)
//       .where('guid', guid)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Delete file
//   public async delete(guid: string) {
//     return await this.file
//       .delete()
//       .where('guid', guid)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Attach file
//   public attach(objectId: number, objectModel: string, files: string[]) {
//     return this.file
//       .attach(objectId, objectModel, files)
//       .catch(function(err) {
//         return err
//       });
//   }
// }
