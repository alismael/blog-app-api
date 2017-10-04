import { config } from "./config/config"

// Import modules routes
import * as cookieParser from "cookie-parser"
import { apiRoutes } from "./apiRoutes"
import { webRoutes } from "./webRoutes"

import * as bodyParser from "body-parser"
import * as express from "express"

const app = express()

// parse application/json
app.use(bodyParser.json())

// cookie parser
// app.use(cookieParser)

// use api routes under /api
app.use("/api", apiRoutes)

// use web routes under /
app.use("/", webRoutes)

// Handle error routes
app.use((req, res) => {
  res.sendStatus(404)
})

// app listens on http://{{host}}:{{port}}
app.listen(config.port, config.host)
