const User = require('../../src/components/users/User')
const UserDAL = require('../../src/components/users/UserDAL')
const repositories = require('../../src/repositories')

const userDAL = new UserDAL(repositories)

async function createAndSaveUser (data = {}) {
  const user = new User({
    name: data.name || 'James',
    age: data.age || 30
  })
  user.id = await userDAL.save(user)
  return user
}

module.exports = {
  createAndSaveUser
}
