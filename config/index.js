require('dotenv').config()
const Ajv = require('ajv')
const ajv = new Ajv({ removeAdditional: true, useDefaults: true, coerceTypes: true })

const schema = {
  type: 'object',
  properties: {
    PORT: { 'type': 'number' },
  },
  required: ['PORT']
}
const validate = ajv.compile(schema)

const config = {
  PORT: process.env.PORT
}

if (!validate(config)) throw new Error(validate.errors.map(e => e.message).join('\n'))
module.exports = config
