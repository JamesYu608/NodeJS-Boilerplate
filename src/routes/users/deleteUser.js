const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')
const AppError = require('../../utils/AppError')

async function deleteUser (req, res) {
  const { id } = req.params

  const userDAL = new UserDAL(repositories)
  const user = await userDAL.getByID(id)
  if (!user) {
    throw AppError.notFound(`User not found, ID: ${id}`)
  }

  await userDAL.deleteByID(req.params.id)
  res.json({})
}

module.exports = deleteUser
