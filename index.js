const { PORT } = require('./config')
const app = require('./src/app')
const { logger } = require('./src/utils/sessionLogger')
const errorHandler = require('./src/utils/errorHandler')

app.listen(PORT, () => logger.info(`Example app listening on port ${PORT}!`))

process.on('unhandledRejection', (reason) => {
  // throw and handle it in uncaughtException
  throw reason
})
process.on('uncaughtException', (error) => {
  errorHandler(error).then(() => process.exit(1))
})
