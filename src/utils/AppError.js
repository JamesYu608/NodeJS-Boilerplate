class AppError extends Error {
  constructor (name, code, message, logMessage = 'No additional information', isOperational = true) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }

    this.name = name
    this.code = code
    this.message = message || name
    this.logMessage = logMessage
    this.isOperational = isOperational
  }

  // Common Errors:
  static badRequest (message, logMessage) {
    return new AppError('badRequest', 400, message, logMessage)
  }

  static unauthorized (message, logMessage) {
    return new AppError('unauthorized', 401, message, logMessage)
  }

  static forbidden (message, logMessage) {
    return new AppError('forbidden', 403, message, logMessage)
  }

  static notFound (message, logMessage) {
    return new AppError('notFound', 404, message, logMessage)
  }

  static badImplementation (message = 'An internal server error occurred', logMessage = '') {
    return new AppError('badImplementation', 500, message, logMessage)
  }
}

module.exports = AppError
