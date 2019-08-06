const { Router } = require('express')
const bodyParser = require('body-parser')
const users = require('./users')
const errorHandler = require('../middlewares/errorHandler')
const AppError = require('../utils/AppError')

const apiRouter = Router()
apiRouter.use(bodyParser.json())
apiRouter.use('/users', users)

const router = Router()
router.get('/health', healthCheck)
router.use('/api', apiRouter)
router.use(errorHandlingRoute)

function healthCheck (req, res) {
  res.status(200).send()
}

async function errorHandlingRoute (err, req, res, next) {
  if (!(err instanceof AppError)) err = new AppError(err.name, err.message, 'Unknown error', err.toString(), false)

  const isOperationalError = await errorHandler(err)
  if (!isOperationalError) {
    process.exit(1)
  } else {
    res.status(err.code).json({
      code: err.code,
      message: err.message
    })
  }
}

module.exports = router
