#!/usr/bin/env node

const http = require('http')

const { app } = require('./../../src')
const config = require('./../../config')
const { logger, errorHandler } = require('./../../src/utils')

const closeGracefully = (signal) => {
  logger.info(`${signal} signal received: closing HTTP server`)

  server.close(() => {
    logger.info('HTTP server closed')

    process.kill(process.pid, signal)
  })
}

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server 'error' event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      errorHandler.handlexiteError(new Error(
        `${bind} requires elevated privileges`,
        { cause: error }
      ))

      process.exit(1)

      break
    case 'EADDRINUSE':
      errorHandler.handleError(new Error(
        `${bind} is already in use`,
        { cause: error }
      ))

      process.exit(1)

      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  logger.info(`Listening on ${addr.address} ${bind}`)
}

// Graceful shutdown
process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', error => {
  errorHandler.handleError(error)

  if (!errorHandler.isTrustedError(error)) {
    setImmediate(() => {
      process.exit(1)
    })
  }
})

// Get port from environment and store in Express.
const port = normalizePort(config.server.port)
const hostname = config.server.hostname

app.set('port', port)

// Create HTTP server.
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, hostname)
server.on('error', onError)
server.on('listening', onListening)
