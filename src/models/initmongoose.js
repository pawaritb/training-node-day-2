const mongoose = require('mongoose')

require('dotenv').config()
require('./user')
require('./post')

const { MONGO_HOST, MONGO_PASSWORD, MONGO_USER } = process.env

const initMongoose = dbName =>
  new Promise((resolve, reject) => {
    const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${dbName}?retryWrites=true&w=majority`
    mongoose
      .connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .catch(err => {
        console.warn(`Error: ${err}`)
        return reject(err)
      })

    mongoose.connection.once('open', async () => {
      console.log(`Database connected on ${dbName}`)
      return resolve(mongoose)
    })
  })

module.exports = initMongoose
