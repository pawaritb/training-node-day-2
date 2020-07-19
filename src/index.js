require('dotenv').config()
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const initMongoose = require('./models/initmongoose')

const r = require('./router')

const app = new Koa()

app.use(bodyParser())
app.use(logger())
app.use(r.routes())

const dbName = 'blogs'
const port = 3000
initMongoose(dbName).then(() => {
  app.listen(port, () => {
    console.log(`Server listen onport ${port}`)
  })
})
