import { IFileRepository } from './../repositories/IFileRepository'
import { FileMongoRepository } from './../repositories/FileMongoRepository'
import { ObjectId } from 'mongodb'

// File repository
let _repository: IFileRepository = new FileMongoRepository();

export class File {
    
    
    // Public attributes
    public _id: ObjectId;
    public title: string;
    public objectModel: string;
    public objectId: ObjectId;
    public created_by: ObjectId;
    public created_at: string;

    // Get all Files
    public async getFile(_id: ObjectId, callback ) {
        _repository.getFile( _id, function (res) {
            callback(res);
        });
    }

    // Get all Files
    public async getFiles(objectId: ObjectId, objectModel: string, callback ) {
        _repository.getFiles( objectId, objectModel, function (res) {
            callback(res);
        });
    }

    // Add new File
    public async add(callback) {
        _repository.add(this, function (res) {
            callback(res);
        });
    }

    // Delete File    
    public async delete(callback) {
        _repository.delete(this, function (res) {
            callback(res);
        });
    }
}