import { config } from './../../../config/config';
import { IFileRepository } from './IFileRepository'
import { MongoClient, ObjectId } from 'mongodb'
import { File } from './../models/File'

export class FileMongoRepository implements IFileRepository {

    // MongoDb url
    private dbUrl: string = config.mongoDb.url;
    
    // get all files
    public async getFile (_id: ObjectId, callback) {

        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err)
                callback( { error: true, message: err } );

            var condition = { _id: ObjectId(_id) };

            db.collection("files").find( condition ).toArray(function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, message: 'File retrived!', files: obj } );
            });
        });
    }

    // get all files
    public async getFiles (ObjectId: ObjectId, objectModel: string, callback) {

        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err)
                callback( { error: true, message: err } );

            var condition = { 'Object_id': ObjectId, 'object_model': objectModel };

            db.collection("files").find( condition ).toArray(function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, message: 'Files retrived!', files: obj } );
            });
        });
    }

    // Add new file
    public async add (file: File, callback) {
        
        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("files").insertOne(file, function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, message: 'File added!', file: file } );
            });
        });
    }

    // Delete file
    public async delete (file: File, callback) {
        
        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("files").deleteOne({_id: ObjectId(file._id) }, function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();
                
                // Count of affected rows
                if ( obj.result.n > 0 )
                    callback( { error: false, message: 'File deleted!' } );
                else
                    callback( { error: true, message: 'No file found!' } );
            });
        });
    }
}
