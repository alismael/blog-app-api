import { File } from './../models/File'

export interface IFileRepository {
    getFile (id: number);
    getFiles (objectId: number, objectModel: string);
    add (file: File);
    delete (file: File);
}
