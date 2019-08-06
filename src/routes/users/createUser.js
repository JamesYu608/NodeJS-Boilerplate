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
  res.json({
    id: await userDAL.save(user)
  })
}

module.exports = createUser
