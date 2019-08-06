const { logger } = require('./sessionLogger')

async function errorHandler (err) {
  const logMessage = {
    error: {
      name: err.name,
      code: err.code,
      message: err.message,
      logMessage: err.logMessage,
      isOperational: err.isOperational
    }
  }

  if (!err.isOperational) {
    logger.fatal(logMessage)
  } else if (err.code >= 500) {
    logger.error(logMessage)
  } else {
    logger.warn(logMessage)
  }

  return err.isOperational
}

module.exports = errorHandler
