import * as knex from 'knex';
import { config } from './../../config/config';

export default knex({
  dialect: 'mysql',
  connection: {
    host: config.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: 'blog'
  }
});
