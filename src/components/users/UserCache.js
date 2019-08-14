const User = require('./User')
const { logger } = require('../../utils/sessionLogger')

const KEY_ID = 'USER_ID'

class UserCache {
  constructor (cache) {
    this.cache = cache
  }

  async setWithID (id, user) {
    try {
      await this.cache.set(`${KEY_ID}_${id}`, JSON.stringify(user))
    } catch (error) {
      logger.warn(`[UserCache Error] Set user error: ${error}`)
    }
  }

  async getByID (id) {
    try {
      const result = await this.cache.get(`${KEY_ID}_${id}`)
      if (result) {
        logger.info(`[UserCache] Hit! Get user cache by ID: ${id}`)
        const user = new User(JSON.parse(result))
        user.id = parseInt(id)
        return user
      } else {
        return null
      }
    } catch (error) {
      logger.warn(`[UserCache Error] Get user by ID error: ${error}`)
    }
  }

  async deleteByID (id) {
    try {
      await this.cache.del(`${KEY_ID}_${id}`)
    } catch (error) {
      logger.warn(`[UserCache Error] Delete user by ID error: ${error}`)
    }
  }
}

module.exports = UserCache
