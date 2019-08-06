const clsNamespace = require('cls-hooked').createNamespace('app')
const uuid = require('uuid/v4')
const { logger } = require('../utils/logger')

function session (req, res, next) {
  clsNamespace.bind(req)
  clsNamespace.bind(res)

  const sessionID = uuid()
  const loggerWithTraceId = logger.child({ sessionID })

  clsNamespace.run(() => {
    clsNamespace.set('loggerCls', loggerWithTraceId)
    next()
  })
}

module.exports = session
