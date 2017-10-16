import { DBIO } from './../../libs/IO';
import { config } from "../../config/config"
import * as mysql from "mysql";

export const connection = mysql.createConnection({
  database: config.mysql.database,
  password: config.mysql.password,
  user: config.mysql.username
});
