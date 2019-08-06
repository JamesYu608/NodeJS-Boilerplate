const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')

async function getAllUsers (req, res) {
  const userDAL = new UserDAL(repositories)
  const result = await userDAL.getAll()
  if (result.length === 0) {
    res.json({
      users: []
    })
  } else {
    res.json({
      users: result.map(user => ({
        id: user.id,
        name: user.name,
        age: user.age
      }))
    })
  }
}

module.exports = getAllUsers
