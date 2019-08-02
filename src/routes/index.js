const { Router } = require('express')
const bodyParser = require('body-parser')
const users = require('./users')

const apiRouter = Router()
apiRouter.use(bodyParser.json())
apiRouter.use('/users', users)

const router = Router()
router.use('/api', apiRouter)

module.exports = router
