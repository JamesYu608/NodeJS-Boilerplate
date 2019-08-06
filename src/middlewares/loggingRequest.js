const { logger } = require('../utils/sessionLogger')

function logging (req, res, next) {
  logger.info({
    req: {
      method: req.method,
      url: req.url
    }
  })
  next()
}

module.exports = logging
