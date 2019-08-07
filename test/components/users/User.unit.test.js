const User = require('../../../src/components/users/User')

describe('[Unit][Component] User model', () => {
  describe('[Function] isLegal, two users, one\'s age is greater and another is less than MIN_LEGAL_AGE', () => {
    test('age is greater than MIN_LEGAL_AGE, should return true', () => {
      // Arrange
      const user = new User({
        age: User.MIN_LEGAL_AGE + 1
      })

      // Act
      const result = user.isLegal()

      // Assert
      expect(result).toBe(true)
    })

    test('age is less than MIN_LEGAL_AGE, should return false', () => {
      // Arrange
      const user = new User({
        age: User.MIN_LEGAL_AGE - 1
      })

      // Act
      const result = user.isLegal()

      // Assert
      expect(result).toBe(false)
    })
  })
})
