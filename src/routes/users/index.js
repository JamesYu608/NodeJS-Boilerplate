const { Router } = require('express')
const schemaValidator = require('../../middlewares/schemaValidator')
const getAllUsers = require('./getAllUsers')
const getUser = require('./getUser')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

const router = Router()
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', schemaValidator(createUser.schema), createUser.route)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
