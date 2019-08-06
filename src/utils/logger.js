const clsNamespace = require('cls-hooked').getNamespace('app')

const sourceLogger = require('pino')()

const logger = new Proxy(sourceLogger, {
  get (target, property, receiver) {
    target = clsNamespace.get('loggerCls') || target
    return Reflect.get(target, property, receiver)
  },
})

module.exports = {
  sourceLogger,
  logger
}
