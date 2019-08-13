const request = require('supertest')
const app = require('../../../src/app')
const { createAndSaveUser } = require('../../util/seedUserUtil')

describe('[Integration][Route] Users', () => {
  describe('getAllUsers', () => {
    test('Happy path, result should be an array, ', async () => {
      // Act
      const { body: result } = await request(app)
        .get('/api/users')
        .expect(200)

      // Assert
      expect(result).toHaveProperty('users')
      expect(Array.isArray(result.users)).toBe(true)
    })
  })

  describe('getUser', () => {
    test('Happy path, result should be the same userID, ', async () => {
      // Arrange
      const user = await createAndSaveUser()

      // Act
      const { body: result } = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200)

      // Assert
      expect(result.id).toBe(user.id)
    })

    test('User not found, status code should be 404, ', async () => {
      await request(app)
        .get(`/api/users/99999999`)
        .expect(404)
    })
  })

  describe('createUser', () => {
    test('Happy path, result should be inserted userID, ', async () => {
      // Arrange, Act
      const { body: result } = await request(app)
        .post(`/api/users`)
        .send({ name: 'Mark', age: 32 })
        .expect(200)

      // Assert
      expect(result).toHaveProperty('id')
    })
  })

  describe('updateUser', () => {
    test('Happy path, status code should be 200 ', async () => {
      // Arrange
      const user = await createAndSaveUser()

      // Act
      const { body: result } = await request(app)
        .put(`/api/users/${user.id}`)
        .send({ name: 'Joe', age: 28 })
        .expect(200)

      // Assert
      expect(result.name).toBe('Joe')
    })
  })

  describe('deleteUser', () => {
    test('Happy path, status code should be 200, ', async () => {
      // Arrange
      const user = await createAndSaveUser()

      // Act
      const { body: result } = await request(app)
        .delete(`/api/users/${user.id}`)
        .expect(200)

      // Assert
      expect(result).toEqual({})
    })
  })
})
