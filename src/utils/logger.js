const clsNamespace = require('cls-hooked').getNamespace('app')

const logger = require('pino')()

const loggerCls = new Proxy(logger, {
  get (target, property, receiver) {
    target = clsNamespace.get('loggerCls') || target
    return Reflect.get(target, property, receiver)
  },
})

module.exports = {
  logger,
  loggerCls
}
