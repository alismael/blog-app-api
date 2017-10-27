import { config } from "./config/config"
import global from "./global"
// Import modules routes
import { apiRoutes } from "./apiRoutes"
import { webRoutes } from "./webRoutes"

import * as bodyParser from "body-parser"
import * as express from "express"

global()

const app = express()

// parse application/json
app.use(bodyParser.json())

// use api routes under /api
app.use("/api", apiRoutes)

// use web routes under /
app.use("/", webRoutes)

// Handle error routes
app.use((_, res) => {
  res.sendStatus(404)
})

// app listens on http://{{host}}:{{port}}
app.listen(config.port, config.host)
