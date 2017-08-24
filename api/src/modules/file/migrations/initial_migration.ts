import { config } from './../../../config/config';
import { knex } from './../../knex/knex'

class CreateFileTable {
    
    // Run migration when declearing CreateDb class
    constructor () {
        // Create a table 
        knex.schema.createTable('file', function(table) {
            table.increments('id');
            table.string('title');
            table.integer('object_id');
            table.string('object_model');
            table.integer('created_by');
            table.dateTime('created_at');
            table.integer('updated_by');
            table.dateTime('updated_at');
        }).then( function () {
            console.log("Table created successfully");
        }).catch( function (e) {
            console.log('error', e);
        })
    }

}

new CreateFileTable();