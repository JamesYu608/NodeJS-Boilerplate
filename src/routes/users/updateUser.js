const repositories = require('../../repositories')
const User = require('../../components/users/User')
const UserDAL = require('../../components/users/UserDAL')

async function updateUser (req, res) {
  const { id } = req.params
  const { name, age } = req.body
  const user = new User({
    id,
    name,
    age
  })
  const userDAL = new UserDAL(repositories)
  await userDAL.update(user)
  res.json({
    updated: true
  })
}

module.exports = updateUser
