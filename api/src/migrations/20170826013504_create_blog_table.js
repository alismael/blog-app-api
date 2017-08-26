
exports.up = function (knex, Promise) {
    // Create a table 
    return knex.schema.createTable('blog', function (table) {
        table.increments();
        table.string('title');
        table.text('description');
        table.string('guid')
            .unique()
            .notNullable();
        table.integer('created_by', 10)
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user');
        table.dateTime('created_at')
            .notNullable();
        table.integer('updated_by')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user');
        table.dateTime('updated_at')
            .notNullable();

    })
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blog')
};
