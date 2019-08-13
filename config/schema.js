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

const redisSchema = {
  type: 'object',
  properties: {
    HOST: { type: 'string' },
    PORT: { type: 'integer' }
  },
  required: ['HOST', 'PORT']
}

const schema = {
  type: 'object',
  properties: {
    PORT: { type: 'number' },
    repositories: {
      type: 'object',
      properties: {
        rds: rdsSchema,
        redis: redisSchema
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
