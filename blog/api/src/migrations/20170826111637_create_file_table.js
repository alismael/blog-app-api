
exports.up = function (knex, Promise) {
    return knex.schema.createTable('file', function (table) {
        table.increments();
        table.string('title');
        table.integer('object_id');
        table.string('object_model');
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
    return knex.schema.dropTable('file')
};
