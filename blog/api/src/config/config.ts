export const config = {
  port: 3000,
  host: '0.0.0.0',
  mysql: { 
    database: process.env.DATABASE || 'blog', 
    username: process.env.DATABASE_USERNAME || 'root', 
    password: process.env.DATABASE_PASSWORD || 'blog' },
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
  },
  uploadPath: `${__dirname}/../uploads`
}