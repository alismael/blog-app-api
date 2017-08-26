
exports.up = function(knex, Promise) {
    // Create a table 
    return knex.schema.createTable('file', function(table) {
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
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('file')
};
