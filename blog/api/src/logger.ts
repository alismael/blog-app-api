import { createLogger, transports } from "winston";

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});