const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')
const AppError = require('../../utils/AppError')

async function getUser (req, res) {
  const userDAL = new UserDAL(repositories)
  const result = await userDAL.getByID(req.params.id)
  if (result) {
    res.json({
      id: result.id,
      name: result.name,
      age: result.age
    })
  } else {
    throw AppError.notFound('User not found')
  }
}

module.exports = getUser
