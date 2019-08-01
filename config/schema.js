const Ajv = require('ajv')

const rdsSchema = {
  type: 'object',
  properties: {
    CLIENT: { type: 'string' },
    DATABASE: { type: 'string' },
    USER: { type: 'string' },
    PASSWORD: { type: 'string' },
    HOST: { type: 'string' }
  },
  required: ['CLIENT', 'DATABASE', 'USER', 'PASSWORD', 'HOST']
}

const schema = {
  type: 'object',
  properties: {
    PORT: { 'type': 'number' },
    repositories: {
      type: 'object',
      properties: {
        rds: rdsSchema
      },
      required: ['rds']
    }
  },
  required: ['PORT', 'repositories']
}
const ajv = new Ajv({ removeAdditional: true, useDefaults: true, coerceTypes: true })
const validate = ajv.compile(schema)

module.exports = {
  validate
}
