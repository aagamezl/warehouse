const logger = require('./logger')

// centralized error handler encapsulates error-handling related logic
const errorHandler = {
  handleError: (error) => {
    logger.error(error.message)
  },
  isTrustedError: (error) => {
    return error.isOperational
  }
}

module.exports = errorHandler
