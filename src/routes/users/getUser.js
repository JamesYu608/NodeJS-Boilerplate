const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')
const AppError = require('../../utils/AppError')

async function getUser (req, res) {
  const { id } = req.params

  const userDAL = new UserDAL(repositories)
  const user = await userDAL.getByID(id)
  if (!user) {
    throw AppError.notFound(`User not found, ID: ${id}`)
  }

  res.json({
    id: user.id,
    name: user.name,
    age: user.age
  })
}

module.exports = getUser
