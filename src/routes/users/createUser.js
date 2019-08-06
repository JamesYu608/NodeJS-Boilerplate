const repositories = require('../../repositories')
const User = require('../../components/users/User')
const UserDAL = require('../../components/users/UserDAL')

const schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'James'
      },
      age: {
        type: 'integer',
        example: 30
      }
    },
    required: ['name', 'age']
  }
}

async function route (req, res) {
  const { name, age } = req.body
  const user = new User({
    name,
    age
  })
  const userDAL = new UserDAL(repositories)
  res.json({
    id: await userDAL.save(user)
  })
}

module.exports = {
  route,
  schema
}
