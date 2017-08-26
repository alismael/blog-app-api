import { IFileRepository } from './IFileRepository'
import { File } from './../models/File'
import  knex  from './../../knex/knex'
var uuid = require('uuid')

export class FileMysqlRepository implements IFileRepository {
    
    // get file
    public async getFile (id: number) {
        return await knex
                    .select('*')
                    .from('file')
                    .where('id', id)
                    .catch( function (err) {
                        return "error"
                    });
    }

    // get all files
    public async getFiles (objectId: number, objectModel: string) {
        return await knex
                    .select('*')
                    .from('file')
                    .where('object_id', objectId)
                    .where('object_model', objectModel)
                    .catch( function (err) {
                        return "error"
                    });
    }

    // Add new file
    public async add (file: File) {
        file.guid = uuid.v1();        
        return await knex('file')
                    .insert( file )
                    .catch( function (err) {
                        return "error"
                    });
    }

    // Delete file
    public async delete (file: File) {
        return await knex('file')
                    .where('id', file.id)
                    .del()
                    .catch( function (err) {
                        return "error"
                    });
    }
}
