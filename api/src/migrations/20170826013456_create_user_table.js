
exports.up = function (knex, Promise) {
    // Create a table 
    return knex.schema.createTable('user', table => {
        table.increments();
        table.string('guid')
            .unique()
            .notNullable();
        table.string('title');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user')
};
