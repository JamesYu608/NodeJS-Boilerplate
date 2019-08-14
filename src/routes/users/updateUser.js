const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')
const AppError = require('../../utils/AppError')

async function updateUser (req, res) {
  const { id } = req.params
  const { name, age } = req.body

  const userDAL = new UserDAL(repositories)
  const user = await userDAL.getByID(id)
  if (!user) {
    throw AppError.notFound(`User not found, ID: ${id}`)
  }

  if (name) user.name = name
  if (age) user.age = age
  await userDAL.update(user)
  res.json({
    id: user.id,
    name: user.name,
    age: user.age
  })
}

module.exports = updateUser
