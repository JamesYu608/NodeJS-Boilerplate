const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')

async function getAllUsers (req, res) {
  const userDAL = new UserDAL(repositories)
  try {
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
  } catch (error) {
    throw new Error(`[Route][Users] get all users error: ${error}`)
  }
}

module.exports = getAllUsers
