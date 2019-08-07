const User = require('../../../src/components/users/User')
const UserDAL = require('../../../src/components/users/UserDAL')
const repositories = require('../../../src/repositories')
const { createAndSaveUser } = require('../../util/seedUserUtil')

describe('[Integration][Component] UserDAL', () => {
  let userDAL

  beforeAll(() => {
    userDAL = new UserDAL(repositories)
  })

  test('Save a user and getByID, user instance should be the same', async () => {
    // Arrange
    const user = await createAndSaveUser()

    // Act
    const userByID = await userDAL.getByID(user.id)

    // Assert
    expect(user).toEqual(userByID)
  })

  test('Save a user and getAll, result should be an array and elements are User instance', async () => {
    // Arrange
    await createAndSaveUser()

    // Act
    const result = await userDAL.getAll()

    // Assert
    expect(Array.isArray(result)).toBe(true)
    result.forEach(user => {
      expect(user).toBeInstanceOf(User)
    })
  })

  test('Save a user and update, getByID, user instance should be the same', async () => {
    // Arrange
    const user = await createAndSaveUser()

    // Act
    user.name = 'Mark'
    const result = await userDAL.update(user)

    // Assert
    expect(result).toBe(true)
    const userByID = await userDAL.getByID(user.id)
    expect(user).toEqual(userByID)
  })

  test('Save a user and delete, getByID, result should be null', async () => {
    // Arrange
    const user = await createAndSaveUser()

    // Act
    const result = await userDAL.deleteByID(user.id)

    // Assert
    expect(result).toBe(true)
  })
})
