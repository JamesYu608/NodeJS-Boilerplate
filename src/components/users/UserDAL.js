const User = require('./User')
const { NAME: TABLE_NAME, columns } = require('../../repositories/userTableSchema')
const AppError = require('../../utils/AppError')
const { logger } = require('../../utils/sessionLogger')

const CACHE_ID = 'USER_ID'

class UserDAL {
  constructor (repositories) {
    this.rds = repositories.rds
    this.cache = repositories.redis
  }

  async save (user) {
    try {
      const result = await this.rds(TABLE_NAME)
        .insert({
          [columns.NAME]: user.name,
          [columns.AGE]: user.age
        })
      const id = result[0]
      await setUserCacheWithID(id, user, this.cache)
      return id
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Save user error: ${error}`)
    }
  }

  async getByID (id) {
    const cacheUser = await getUserCacheByID(id, this.cache)
    if (cacheUser) {
      return cacheUser
    }

    try {
      const result = await this.rds(TABLE_NAME)
        .select(columns.ID, columns.NAME, columns.AGE)
        .where(columns.ID, id)
      if (result.length === 0) {
        return null
      } else {
        const user = new User({
          id: result[0][columns.ID],
          name: result[0][columns.NAME],
          age: result[0][columns.AGE]
        })
        await setUserCacheWithID(user.id, user, this.cache)
        return user
      }
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Get user by ID error: ${error}`)
    }
  }

  async getAll () {
    try {
      const result = await this.rds(TABLE_NAME)
        .select(columns.ID, columns.NAME, columns.AGE)
      if (result.length === 0) {
        return []
      } else {
        return result.map(raw => new User({
          id: raw[columns.ID],
          name: raw[columns.NAME],
          age: raw[columns.AGE]
        }))
      }
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Get all users error: ${error}`)
    }
  }

  async update (user) {
    try {
      const result = await this.rds(TABLE_NAME)
        .where(columns.ID, user.id)
        .update({
          [columns.NAME]: user.name,
          [columns.AGE]: user.age
        })
      if (result === 1) {
        await deleteUserCacheWithID(user.id, this.cache)
      }
      return user
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Update user error: ${error}`)
    }
  }

  async deleteByID (id) {
    try {
      const result = await this.rds(TABLE_NAME)
        .where(columns.ID, id).del()
      if (result === 1) {
        await deleteUserCacheWithID(id, this.cache)
      }
      return true
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Remove user error: ${error}`)
    }
  }
}

async function setUserCacheWithID (id, user, cache) {
  try {
    await cache.set(`${CACHE_ID}_${id}`, JSON.stringify(user))
  } catch (error) {
    logger.warn(`[Cache Error] Set user error: ${error}`)
  }
}

async function getUserCacheByID (id, cache) {
  try {
    const result = await cache.get(`${CACHE_ID}_${id}`)
    if (result) {
      logger.info(`Hit! Get user cache by ID: ${id}`)
      const user = new User(JSON.parse(result))
      user.id = parseInt(id)
      return user
    } else {
      return null
    }
  } catch (error) {
    logger.warn(`[Cache Error] Get user by ID error: ${error}`)
  }
}

async function deleteUserCacheWithID (id, cache) {
  try {
    await cache.del(`${CACHE_ID}_${id}`)
  } catch (error) {
    logger.warn(`[Cache Error] Delete user by ID error: ${error}`)
  }
}

module.exports = UserDAL
