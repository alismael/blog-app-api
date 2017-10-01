import * as mysql from "mysql";

const connection = mysql.createConnection({
  database: "blog",
  password: "abdo",
  user: "root"
});

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

  static ioPure<A>(a: A): DBIO<A> {
    return new IOPure(a)
  }

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<T> {
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

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<A> {
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

class IOPure<A> extends DBIO<A> {
  constructor(public val: A) { super() }

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<A> {
    return Promise.resolve(this.val)
  }
}

class IOSequance<A> extends DBIO<A[]> {
  constructor(public ios: DBIO<A>[]) { super() }

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<A[]> {
    return Promise.all(this.ios.map(io => io.execute(connection, isTransaction)))
  }
}

class IOFlatMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => DBIO<B>) { super() }

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<B> {
    return this.ioAction.execute(connection, isTransaction)
      .then(a => {
        return this.action(a).execute(connection, isTransaction)
      })
  }
}

class IOMap<A, B> extends DBIO<B> {
  constructor(public ioAction: DBIO<A>, public action: (a: A) => B) { super() }

  execute(connection: mysql.IConnection, isTransaction: boolean = false): Promise<B> {
    return this.ioAction.execute(connection, isTransaction)
      .then(a => {
        return this.action(a)
      })
  }
}

class IOTransaction<A> extends DBIO<A> {
  constructor(public ioAction: DBIO<A>) { super() }

  execute(connection: mysql.IConnection): Promise<A> {
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

interface User {
  id: number,
  guid: string,
  title: string,
  created_by: number,
  created_at: string,
  updated_by: number,
  updated_at: string
}


let io = new DBIO<User[]>("select * from user", [])
  .flatMap(res => {
    let user = res.filter(user => user.id == 16)[0]
    return new DBIO("select * from user_password where user_id = ?", [user.id])
  })
  .map(res => {
    return res
  })

  
// rollback io
let io2 = new DBIO("insert into user(guid, created_at, updated_at) values(uuid(), now(), now());", [])
  .flatMap(id => new DBIO("select * from user_password", []))

DBIO.ioTransaction(io2).execute(connection)
  .then(a => console.log("success success success success success"))
  .catch(err => console.log(err))

