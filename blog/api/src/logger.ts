import { Logger, transports } from "winston";


const customColors = {
  trace: 'white',
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  crit: 'red',
  error: 'red'
};

let config = {
  colors: customColors,

  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    crit: 4,
    error: 5
  },
  transports: [
    new transports.Console({
      name: 'consoleLogger',
      level: 'error',
      colorize: true,
      timestamp: true
    })
  ]
}


export const logger = new Logger(config);
