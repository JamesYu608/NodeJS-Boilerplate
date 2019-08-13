class User {
  constructor (data) {
    this.id = parseInt(data.id) || -1
    this.name = data.name
    this.age = data.age
  }

  isLegal () {
    return this.age >= User.MIN_LEGAL_AGE
  }
}

User.MIN_LEGAL_AGE = 21

module.exports = User
