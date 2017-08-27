import { File } from './../models/File'

export interface IFileRepository {
    getFile (guid: string);
    getFiles (objectId: number, objectModel: string);
    add (file: File);
    delete (guid: string);
}
