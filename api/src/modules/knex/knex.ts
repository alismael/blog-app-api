import { config } from './../../config/config';

export var knex = require('knex')({
    dialect: 'mysql',
    connection: {
        host: config.host,
        user: config.mysql.username,
        password: config.mysql.password,
        database : 'blog'
    }
});
