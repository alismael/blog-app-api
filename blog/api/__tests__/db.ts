import { connection } from './../src/modules/mysql/mysql';
import { DBIO } from './../src/libs/IO';
import global from "./../src/global"
let logger = require('./../../api/src/logger');

global()

class DBContext {
  public run<T>(dbIO: DBIO<T>, fn: (result: T) => void) {
    let rollbackIO = dbIO.flatMap(result => {
      fn(result)
      return DBIO.failed("rollback")
    })

    DBIO.run(connection, rollbackIO)
    .catch(err => {
      logger.debug(err)
      throw err
    })
  }
}

export const db = new DBContext