const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')

async function deleteUser (req, res) {
  const userDAL = new UserDAL(repositories)
  try {
    await userDAL.deleteByID(req.params.id)
    res.json({
      deleted: true
    })
  } catch (error) {
    throw new Error(`[Route][Users] delete user error: ${error}`)
  }
}

module.exports = deleteUser
