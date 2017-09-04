
exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_password', function (table) {
        table.increments();
        table.text('password')
            .notNullable();
        table.string('email')
            .notNullable();
        table.string('username')
            .unique()
            .notNullable();
        table.integer('user_id', 10)
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user');
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
    return knex.schema.dropTable('user_password')
};
