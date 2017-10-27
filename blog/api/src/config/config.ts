export const config = {
  port: 3000,
  host: '0.0.0.0',
  mysql: { database: 'blog', username: 'root', password: 'abdo' },
  hash: {
    saltRounds: 10
  },
  jwt: {
    key: process.env.JWT_KEY || "XBhGIzN0Ljy/NJhdZEDx77IXPNnMYAjaTgJIeoBwga0TxnF+QMHBxsRtYR74DDuysE2iq9C/wW1EZS7hvMirZg==",
    issuer: process.env.JWT_ISSUER || "lol-lol",
    algorithm: "HS512",
    expiresIn: "24h"
  },
  cookie: {
    jwt: "Authorization"
  }
}