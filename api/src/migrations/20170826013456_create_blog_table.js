
exports.up = function(knex, Promise) {
    // Create a table 
    knex.schema.createTable('blog', function(table) {
        table.increments('id');
        table.string('title');
        table.string('description');
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
    return knex.schema.dropTable('blog')
};
