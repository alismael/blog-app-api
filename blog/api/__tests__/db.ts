import { connection } from './../src/modules/mysql/mysql';
import { DBIO } from './../src/libs/IO';
import global from "./../src/global"

global()

class DBContext {
  public run<T>(dbIO: DBIO<T>, fn: (result: T) => void) {
    connection.beginTransaction(err => {
      if (err)
        connection.rollback(() => {
          return
        })
      else {
        dbIO.execute(connection).then(r => {
          fn(r)
          return Promise.resolve(true)
        }).then(_ => {
          connection.rollback(() => {
            return Promise.resolve(true)
          })
        })
      }
    })
  }
}

export const db = new DBContext