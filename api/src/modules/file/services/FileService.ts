import { IFileRepository } from './../repositories/IFileRepository'
import { FileMysqlRepository } from './../repositories/FileMysqlRepository'
import { File } from './../models/File'


export class FileService {

    private fileRepository: IFileRepository = new FileMysqlRepository();
    

    // Get file by guid
    public getFile (guid: string) {
        return this.fileRepository.getFile(guid);
    }

    // Get file by object_model, object_id
    public getFiles (objectId: number, objectModel: string) {
        return this.fileRepository.getFiles(objectId, objectModel);
    }

    // Add new file
    public add (file: File) {
        return this.fileRepository.add(file);
    }

    // Delete file
    public delete (guid: string) {
        return this.fileRepository.delete(guid);
    }
}
