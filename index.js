const { PORT } = require('./config')
const app = require('./src/app')
const { logger } = require('./src/utils/sessionLogger')

app.listen(PORT, () => logger.info(`Example app listening on port ${PORT}!`))
