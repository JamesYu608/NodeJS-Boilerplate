const knex = require('knex')
const { rds: rdsConfig } = require('../../config').repositories

const rdsConnection = knex({
  client: rdsConfig.CLIENT,
  connection: {
    host: rdsConfig.HOST,
    user: rdsConfig.USER,
    password: rdsConfig.PASSWORD,
    database: rdsConfig.DATABASE
  }
})

async function shutDown () {
  await rdsConnection.destroy()
}

module.exports = {
  rds: rdsConnection,
  shutDown
}