const clsNamespace = require('cls-hooked').createNamespace('app')
const uuid = require('uuid/v4')

const sourceLogger = require('pino')()
const logger = new Proxy(sourceLogger, {
  get (target, property, receiver) {
    target = clsNamespace.get('loggerCls') || target
    return Reflect.get(target, property, receiver)
  },
})

function init (req, res, next) {
  clsNamespace.bind(req)
  clsNamespace.bind(res)

  const sessionID = uuid()
  const loggerWithTraceId = sourceLogger.child({ sessionID })

  clsNamespace.run(() => {
    clsNamespace.set('loggerCls', loggerWithTraceId)
    req.sessionID = sessionID
    next()
  })
}

module.exports = {
  init,
  logger
}
