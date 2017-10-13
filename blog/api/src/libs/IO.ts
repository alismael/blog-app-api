import { IConnection } from "mysql";

export class DBIO<T> {

  constructor(public query?: string, public params?: any[]) { }

  public flatMap<B>(action: (a: T) => DBIO<B>): DBIO<B> {
    return new IOFlatMap(this, action);
  }

  map<B>(action: (a: T) => B): DBIO<B> {
    return new IOMap(this, action)
  }

  filter(action: (a: T) => boolean): DBIO<T> {
    return new IOFilter<T>(this, action)
  }

  static ioTransaction<A>(io: DBIO<A>): DBIO<A> {
    return new IOTransaction(io)
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

  execute(connection: IConnection, isTransaction: boolean = false): Promise<T> {
    return new Promise((resolve, reject) => {
      connection.query(this.query, this.params, (err, result, fields) => {
        if (err) {
          if (isTransaction)
            connection.rollback(() => { reject(err) })
          else
            reject(err)
        }
        else
          resolve(result)
      })
    })
  }
}

class IOFilter<A> extends DBIO<A> {
  constructor(public io: DBIO<A>, public action: (a: A) => boolean) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<A> {
    return this.io.execute(connection, isTransaction)
      .then(result => {
        if (this.action(result)) {
          return result
        } else {
          throw "No such element";
        }
      })
  }

}

class IOFail<A, E> extends DBIO<A> {
  constructor(public err: E) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<A> {
    throw this.err
  }
}


class IOSuccessful<A> extends DBIO<A> {
  constructor(public val: A) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<A> {
    return Promise.resolve(this.val)
  }
}

class IOSequance<A> extends DBIO<A[]> {
  constructor(public ios: DBIO<A>[]) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<A[]> {
    return Promise.all(this.ios.map(io => io.execute(connection, isTransaction)))
  }
}

class IOFlatMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => DBIO<B>) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<B> {
    return this.ioAction.execute(connection, isTransaction)
      .then(a => {
        return this.action(a).execute(connection, isTransaction)
      })
  }
}

class IOMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => B) { super() }

  execute(connection: IConnection, isTransaction: boolean = false): Promise<B> {
    return this.ioAction.execute(connection, isTransaction)
      .then(a => {
        return this.action(a)
      })
  }
}

class IOTransaction<A> extends DBIO<A> {
  constructor(public ioAction: DBIO<A>) { super() }

  execute(connection: IConnection): Promise<A> {
    return new Promise<A>((resolve, reject) => {
      connection.beginTransaction(err => {
        if (err)
          connection.rollback(() => {
            reject(err);
          })
        else {
          let promise: Promise<A> = this.ioAction.execute(connection, true)
            .then(a => {
              connection.commit(err => {
                if (err)
                  return connection.rollback(() => {
                    reject(err);
                  })
              })
              return a
            })
          resolve(promise)
        }
      })
    })

  }
}
