const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')

async function getUser (req, res) {
  const userDAL = new UserDAL(repositories)
  let result
  try {
    result = await userDAL.getByID(req.params.id)
  } catch (error) {
    throw new Error(`[Route][Users] get user error: ${error}`)
  }

  if (result) {
    res.json({
      id: result.id,
      name: result.name,
      age: result.age
    })
  } else {
    throw new Error('NotFoundError')
  }
}

module.exports = getUser
