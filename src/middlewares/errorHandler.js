const { logger } = require('../utils/logger')

async function errorHandler (err) {
  logger.error('ErrorHandler', err)
  return err.isOperational
}

module.exports = errorHandler
