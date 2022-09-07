const path = require('path')

const pino = require('pino')

const levels = pino.levels.values

// log level that we want like separated files
const customDestinationsLogs = ['error']

const streams = Object.keys(levels).map((level) => {
  const filename = customDestinationsLogs.includes(level)
    ? `app-${level}.log`
    : 'combined.log'

  return {
    level,
    stream: pino.destination(path.join(process.cwd(), 'logs', filename))
  }
})

// We only send log to stdout on development environment
if (process.env.NODE_ENV === 'development') {
  streams.push({ stream: process.stdout })
}

// Create pino logger instance
const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label }
      }
    }
  },

  pino.multistream(streams, {
    levels,
    dedupe: true
  })
)

module.exports = logger
