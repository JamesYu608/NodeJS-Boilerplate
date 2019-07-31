const app = require('./src/app')
const port = 3000 // TODO: extract to env

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
