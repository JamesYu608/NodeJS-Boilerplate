const { logger } = require('../utils/sessionLogger')

async function errorHandler (err) {
  logger.error('ErrorHandler', err)
  return err.isOperational
}

module.exports = errorHandler
