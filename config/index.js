require('dotenv').config()
const { validate } = require('./schema')

const config = {
  PORT: process.env.PORT,
  CACHE_EXPIRATION_SECS: process.env.CACHE_EXPIRATION_SECS || 3 * 60,
  repositories: {
    rds: {
      CLIENT: process.env.RDS_CLIENT,
      DATABASE: process.env.RDS_DATABASE,
      USER: process.env.RDS_USER,
      PASSWORD: process.env.RDS_PASSWORD,
      HOST: process.env.RDS_HOST
    },
    redis: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT
    }
  }
}

if (!validate(config)) throw new Error(validate.errors.map(e => e.message).join('\n'))
module.exports = config
