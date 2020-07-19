// require('dotenv').config()

// console.log(process.env.MONGO_USER)
// console.log(process.env.MONGO_PASSWORD)
// console.log(process.env.MONGO_HOST)

// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const jwtSign = promisify(jwt.sign)
const jwtVerify = promisify(jwt.verify)

const secret = 'supersecretkey'

const app = async () => {
  // const hash = await bcrypt.hash('[vlohvpojk', 10)
  // console.log(hash)
  // const result = await bcrypt.compare('[vlohvpojk', hash)
  // console.log(result)

  // jwt.sign({ id: 'userpk', email: 'test@emaill.com' }, secret, function (
  //   err,
  //   token,
  // ) {
  //   console.log(token)
  //   jwt.verify(token, secret, function (err, user) {
  //     console.log(user)
  //   })
  // })
  try {
    const token = await jwtSign(
      { id: 'userpk', email: 'test@email.com' },
      secret,
    )
    console.log(token)
    const user = await jwtVerify(token, secret)
    console.log(user)
  } catch (err) {
    console.log('Token is invalid')
  }
}

app()
