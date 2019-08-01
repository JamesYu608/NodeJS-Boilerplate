const User = require('../../../src/components/users/User')

describe('[Unit][Component] User model', () => {
  test('[Function] isLegal, two users, one\'s age is greater and another is less than MIN_LEGAL_AGE', () => {
    const user1 = new User({
      age: User.MIN_LEGAL_AGE + 1
    })
    expect(user1.isLegal()).toBe(true)

    const user2 = new User({
      age: User.MIN_LEGAL_AGE - 1
    })
    expect(user2.isLegal()).toBe(false)
  })
})
