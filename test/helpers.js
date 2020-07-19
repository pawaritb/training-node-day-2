require('dotenv').config()
const initMongoose = require('../src/models/initmongoose')

const dbName = 'blogs'

let mongoose

before(async () => {
  mongoose = await initMongoose(dbName)
})

beforeEach(async () => {
  await mongoose.connection.dropDatabase()
})

after(() => {
  console.log('after')
})
