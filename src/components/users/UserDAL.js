const User = require('./User')
const { NAME: TABLE_NAME, columns } = require('../../repositories/userTableSchema')
const AppError = require('../../utils/AppError')
const UserCache = require('./UserCache')

class UserDAL {
  constructor (repositories) {
    this.rds = repositories.rds
    this.userCache = new UserCache(repositories.redis)
  }

  async save (user) {
    try {
      const result = await this.rds(TABLE_NAME)
        .insert({
          [columns.NAME]: user.name,
          [columns.AGE]: user.age
        })
      const id = result[0]
      await this.userCache.deleteByID(id)
      return id
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Save user error: ${error}`)
    }
  }

  async getByID (id) {
    const cacheUser = await this.userCache.getByID(id)
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
        await this.userCache.setWithID(id, user)
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
        await this.userCache.deleteByID(user.id)
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
        await this.userCache.deleteByID(id)
      }
      return true
    } catch (error) {
      throw AppError.badImplementation(null, `[SQL Error] Remove user error: ${error}`)
    }
  }
}

module.exports = UserDAL
