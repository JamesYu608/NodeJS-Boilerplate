const repositories = require('../../repositories')
const UserDAL = require('../../components/users/UserDAL')

async function deleteUser (req, res) {
  const userDAL = new UserDAL(repositories)
  await userDAL.deleteByID(req.params.id)
  res.json({
    deleted: true
  })
}

module.exports = deleteUser
