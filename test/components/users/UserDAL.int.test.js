const User = require('../../../src/components/users/User')
const UserDAL = require('../../../src/components/users/UserDAL')
const repositories = require('../../../src/repositories')

describe('[Integration][Component] UserDAL', () => {
  let userDAL

  beforeAll(() => {
    userDAL = new UserDAL(repositories)
  })

  test('Save a user and getByID, user instance should be the same', async () => {
    const user = await createAndSaveUser()
    const userByID = await userDAL.getByID(user.id)
    expect(user).toEqual(userByID)
  })

  test('Save a user and getAll, result should be an array and elements are User instance', async () => {
    await createAndSaveUser()
    const result = await userDAL.getAll()
    expect(Array.isArray(result)).toBe(true)
    result.forEach(user => {
      expect(user).toBeInstanceOf(User)
    })
  })

  test('Save a user and update, getByID, user instance should be the same', async () => {
    const user = await createAndSaveUser()

    user.name = 'Mark'
    const result = await userDAL.update(user)
    expect(result).toBe(true)

    const userByID = await userDAL.getByID(user.id)
    expect(user).toEqual(userByID)
  })

  test('Save a user and delete, getByID, result should be null', async () => {
    const user = await createAndSaveUser()

    const result = await userDAL.deleteByID(user.id)
    expect(result).toBe(true)
  })

  async function createAndSaveUser () {
    const user = new User({
      name: 'James',
      age: 30
    })
    user.id = await userDAL.save(user)
    return user
  }
})
