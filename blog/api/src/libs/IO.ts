import { IConnection } from "mysql"
import { NoSuchElement, InternalServerError } from "../modules/common/ErrorHandler"

export class DBIO<T> {

  constructor(public query?: string, public params?: any[]) { }

  public flatMap<B>(action: (a: T) => DBIO<B>): DBIO<B> {
    return new IOFlatMap(this, action)
  }

  map<B>(action: (a: T) => B): DBIO<B> {
    return new IOMap(this, action)
  }

  filter(action: (a: T) => boolean): DBIO<T> {
    return new IOFilter<T>(this, action)
  }

  static ioSequance<A>(ios: DBIO<A>[]): DBIO<A[]> {
    return new IOSequance(ios)
  }

  static successful<A>(a: A): DBIO<A> {
    return new IOSuccessful(a)
  }

  static failed<A, E>(err: E): DBIO<A> {
    return new IOFail<A, E>(err)
  }

  execute(connection: IConnection): Promise<T> {
    return new Promise((resolve, reject) => {
      connection.query(this.query, this.params, (err, result) => {
        if (err) 
          reject(new InternalServerError(err))
        else 
          resolve(result)
      })
    })
  }

  static run<T>(connection: IConnection, ioAction: DBIO<T>) {
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

class IOFilter<A> extends DBIO<A> {
  constructor(public io: DBIO<A>, public action: (a: A) => boolean) { super() }

  execute(connection: IConnection): Promise<A> {
    return this.io.execute(connection)
      .then(result => {
        if (this.action(result)) 
          return result
        else 
          throw new NoSuchElement()
      })
  }
}

class IOFail<A, E> extends DBIO<A> {
  constructor(public err: E) { super() }

  execute(_: IConnection): Promise<A> {
    return Promise.reject(this.err)
  }
}

class IOSuccessful<A> extends DBIO<A> {
  constructor(public val: A) { super() }

  execute(_: IConnection): Promise<A> {
    return Promise.resolve(this.val)
  }
}

class IOSequance<A> extends DBIO<A[]> {
  constructor(public ios: DBIO<A>[]) { super() }

  execute(connection: IConnection): Promise<A[]> {
    return Promise.all(this.ios.map(io => io.execute(connection)))
  }
}

class IOFlatMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => DBIO<B>) { super() }

  execute(connection: IConnection): Promise<B> {
    return this.ioAction.execute(connection)
      .then(a => this.action(a).execute(connection))
  }
}

class IOMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => B) { super() }

  execute(connection: IConnection): Promise<B> {
    return this.ioAction.execute(connection)
      .then(a => this.action(a))
  }
}
