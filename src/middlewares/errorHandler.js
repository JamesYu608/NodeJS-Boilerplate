async function errorHandler (err) {
  console.log('ErrorHandler', err)
  return err.isOperational
}

module.exports = errorHandler
