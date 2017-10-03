
exports.up = function (knex, Promise) {
    // Create a table 
    return knex.schema.createTable("user", table => {
        table.increments();
        table.string("guid")
            .unique()
            .notNullable();
        table.string("title");
        table.integer("created_by", 10)
            .unsigned()
            .references("id")
            .inTable("user");
        table.dateTime("created_at")
            .notNullable();
        table.integer("updated_by")
            .unsigned()
            .references("id")
            .inTable("user");
        table.dateTime("updated_at")
            .notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("user")
};
