import { File } from './../models/File'
import { ObjectId } from 'mongodb'

export interface IFileRepository {
    getFile (_id: ObjectId, callback);
    getFiles (objectId: ObjectId, objectModel: string, callback);
    add (file: File, callback);
    delete (file: File, callback);
}
