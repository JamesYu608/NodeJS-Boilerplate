const { PORT } = require('./config')
const app = require('./src/app')

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
