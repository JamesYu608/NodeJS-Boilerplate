const { Router } = require('express')
const bodyParser = require('body-parser')
const sessionLogger = require('../utils/sessionLogger')
const loggingRequest = require('../middlewares/loggingRequest')
const users = require('./users')
const errorHandler = require('../utils/errorHandler')
const AppError = require('../utils/AppError')

const apiRouter = Router()
apiRouter.use('/users', users)

const router = Router()
router.get('/health', healthCheck)
router.use(bodyParser.json())
router.use(sessionLogger.init)
router.use(loggingRequest)
router.use('/api', apiRouter)
router.use(errorHandlingRoute)

function healthCheck (req, res) {
  res.status(200).send()
}

async function errorHandlingRoute (err, req, res, next) {
  if (!(err instanceof AppError)) {
    err = new AppError(err.name, err.message, 'Unknown error', err.toString(), false)
  }

  const isOperationalError = await errorHandler(err)
  if (isOperationalError) {
    res.status(err.code)
      .json({
        code: err.code,
        message: err.message,
        id: req.sessionID
      })
  } else {
    process.exit(1)
  }
}

module.exports = router
