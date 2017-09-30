var config = require('./dest/config/config').config;

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.username,
      password: config.mysql.password,
    },
    migrations: {
      tableName: 'migrations',
      directory: 'src/migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.username,
      password: config.mysql.password,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: 'src/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.username,
      password: config.mysql.password,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: 'src/migrations'
    }
  }

};
