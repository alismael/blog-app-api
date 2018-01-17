import * as winston from "winston";
import { config } from "./config/config";

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.debugLevel,
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});