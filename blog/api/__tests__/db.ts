import { connection } from './../src/modules/mysql/mysql'
import { DBIO } from './../src/libs/IO'
import global from "./../src/global"
let logger = require('./../../api/src/logger')

global()

class DBContext {
  run<T>(ioAction: DBIO<T>) {
    return new Promise<T>((resolve, reject) => {
      connection.beginTransaction(err => {
        if (err)
          connection.rollback(() => {
            reject(err)
          })
        else {
          ioAction.execute(connection)
            .then(a => {
              resolve(a)
              connection.rollback(() => {
                reject()
              })
            })
            .catch(catchErr => {
              return connection.rollback(() => {
                reject(catchErr)
              })
            })
        }
      })
    })
  }
}

export const db = new DBContext