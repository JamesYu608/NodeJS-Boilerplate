const repositories = require('../../repositories')
const User = require('../../components/users/User')
const UserDAL = require('../../components/users/UserDAL')

async function createUser (req, res) {
  const { name, age } = req.body
  const user = new User({
    name,
    age
  })
  const userDAL = new UserDAL(repositories)
  try {
    res.json({
      id: await userDAL.save(user)
    })
  } catch (error) {
    throw new Error(`[Route][Users] create user error: ${error}`)
  }
}

module.exports = createUser
