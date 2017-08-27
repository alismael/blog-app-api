import { IFileRepository } from './IFileRepository'
import { File } from './../models/File'
import  knex  from './../../knex/knex'
var uuid = require('uuid')

export class FileMysqlRepository implements IFileRepository {
    
    // get file
    public async getFile (guid: string) {
        return await knex
                    .select('*')
                    .from('file')
                    .where('guid', guid)
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
    public async delete (guid: string) {
        return await knex('file')
                    .where('guid', guid)
                    .del()
                    .catch( function (err) {
                        return "error"
                    });
    }

    // Attach file with object
    public async attach (object_id: number, object_model: string, guid: string[]) {
        return await knex('file')
                    .where('guid', 'IN', guid)
                    .update({
                        object_model: object_model,
                        object_id: object_id
                    })
                    .catch( function (err) {
                        return "error"
                    });
    }
}
