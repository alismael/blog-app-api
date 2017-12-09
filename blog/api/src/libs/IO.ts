import { Connection, OkPacket, RowDataPacket } from "mysql2"
import { NoSuchElement, InternalServerError, InvalidState } from "../modules/common/ErrorHandler"

type R = RowDataPacket
type Ok = OkPacket

export abstract class IO<T> {
  flatMap<B>(action: (a: T) => IO<B>): IO<B> {
    return new IOFlatMap(this, action)
  }

  map<B>(action: (a: T) => B): IO<B> {
    return new IOMap(this, action)
  }

  filter(action: (a: T) => boolean): IO<T> {
    return new IOFilter<T>(this, action)
  }

  static successful<A>(a: A): IO<A> {
    return new IOSuccessful(a)
  }

  static failed<A, E>(err: E): IO<A> {
    return new IOFail<A, E>(err)
  }

  static ioSequance<A>(ios: IO<A>[]): IO<A[]> {
    return new IOSequance(ios)
  }

  abstract execute(connection: Connection): Promise<T>
}

export class DBIO extends IO<R[] | R[][] | Ok | Ok[]> {

  constructor(public query?: string, public params?: any[]) { super() }

  execute(connection: Connection) {
    return new Promise<R[] | R[][] | Ok | Ok[]>((resolve, reject) => {
      if(this.query && this.params) {
        connection.query(this.query, this.params, (err, result) => {
          if (err) 
            reject(new InternalServerError(err))
          else 
            resolve(result)
        })
      } else {
        reject(new InvalidState)
      }
    })
  }

  static executeTransactionally<T>(connection: Connection, ioAction: IO<T>) {
    return new Promise<T>((resolve, reject) => {
      connection.beginTransaction(err => {
        if (err) 
          reject(new InternalServerError(err))
        else {
          ioAction.execute(connection)
            .then(a => {
              connection.commit(err => {
                if (err)
                  return connection.rollback(() => {
                    reject(new InternalServerError(err))
                  })
                else 
                  resolve(a)
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

class IOFilter<A> extends IO<A> {
  constructor(public io: IO<A>, public action: (a: A) => boolean) { super() }

  execute(connection: Connection) {
    return this.io.execute(connection)
      .then(result => {
        if (this.action(result)) 
          return result
        else 
          throw new NoSuchElement
      })
  }
}

class IOFail<A, E> extends IO<A> {
  constructor(public err: E) { super() }

  execute(_: Connection) {
    return Promise.reject(this.err)
  }
}

class IOSuccessful<A> extends IO<A> {
  constructor(public val: A) { super() }

  execute(_: Connection): Promise<A> {
    return Promise.resolve(this.val)
  }
}

class IOSequance<A> extends IO<A[]> {
  constructor(public ios: IO<A>[]) { super() }

  execute(connection: Connection) {
    return Promise.all(this.ios.map(io => io.execute(connection)))
  }
}

class IOFlatMap<A, B> extends IO<B> {
  constructor(public ioAction: IO<A>, public action: (a: A) => IO<B>) { super() }

  execute(connection: Connection) {
    return this.ioAction.execute(connection)
      .then(a => this.action(a).execute(connection))
  }
}

class IOMap<A, B> extends IO<B> {
  constructor(public ioAction: IO<A>, public action: (a: A) => B) { super() }

  execute(connection: Connection) {
    return this.ioAction.execute(connection)
      .then(a => this.action(a))
  }
}
