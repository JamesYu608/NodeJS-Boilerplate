const request = require('supertest')
const app = require('../../../src/app')
const { createAndSaveUser } = require('../../util/seedUserUtil')

describe('[Integration][Route] Users', () => {
  test('getAllUsers, ', async () => {
    const { body: result } = await request(app)
      .get('/api/users')
      .expect(200)
    expect(result).toHaveProperty('users')
    expect(Array.isArray(result.users)).toBe(true)
  })

  test('getUser, ', async () => {
    const user = await createAndSaveUser()
    const { body: result } = await request(app)
      .get(`/api/users/${user.id}`)
      .expect(200)
    expect(result.id).toBe(user.id)
  })

  test('createUser, ', async () => {
    const { body: result } = await request(app)
      .post(`/api/users`)
      .send({ name: 'Mark', age: 32 })
      .expect(200)
    expect(result).toHaveProperty('id')
  })

  test('updateUser, ', async () => {
    const user = await createAndSaveUser()
    const { body: result } = await request(app)
      .put(`/api/users/${user.id}`)
      .send({ name: 'Joe', age: 28 })
      .expect(200)
    expect(result).toHaveProperty('updated')
  })

  test('deleteUser, ', async () => {
    const user = await createAndSaveUser()
    const { body: result } = await request(app)
      .delete(`/api/users/${user.id}`)
      .expect(200)
    expect(result).toHaveProperty('deleted')
  })
})
