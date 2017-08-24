import { IFileRepository } from './../repositories/IFileRepository'
import { FileMysqlRepository } from './../repositories/FileMysqlRepository'
import { File } from './../models/File'


export class FileService {

    private fileRepository: IFileRepository = new FileMysqlRepository();
    

    // get all files
    public getFile (id: number) {
        return this.fileRepository.getFile(id);
    }

    // get all files
    public getFiles (objectId: number, objectModel: string) {
        return this.fileRepository.getFiles(objectId, objectModel);
    }

    // Add new blog
    public add (file: File) {
        return this.fileRepository.add(file);
    }

    // Delete blog
    public delete (file: File) {
        return this.fileRepository.delete(file);
    }
}
