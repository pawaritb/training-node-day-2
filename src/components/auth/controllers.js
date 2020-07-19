const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { User, Post } = require('mongoose').models
const { requireAuth } = require('./middlewares')

const jwtSign = promisify(jwt.sign)

module.exports = r => {
  r.post('/auth/register', async ctx => {
    const { body } = ctx.request
    const exist = await User.find({ email: body.email }).limit(1)
    if (exist.length) {
      ctx.status = 400
      ctx.body = 'email is in use'
      return
    }
    body.password = await bcrypt.hash(body.password, 10)
    const user = await User.create(body)
    ctx.body = user
  })

  r.post('/auth/login', async ctx => {
    const { body } = ctx.request
    const user = await User.findOne({ email: body.email })
    if (!user) {
      ctx.status = 400
      ctx.body = 'Email or password is invalid'
      return
    }

    const result = await bcrypt.compare(body.password, user.password)

    if (!result) {
      ctx.status = 400
      ctx.body = 'Email or password is invalid'
      return
    }

    const token = await jwtSign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
    )

    ctx.cookies.set('jwt', token)

    ctx.body = { token }
  })

  r.get('/auth/profile', requireAuth, async ctx => {
    const { user } = ctx.state
    const data = await User.findById(user.id) // คืนข้อมูลทั้งหมดจากไอดีที่อ่าน
    ctx.body = data
  })

  r.get('/auth/posts', requireAuth, async ctx => {
    const posts = await Post.find()
    ctx.body = posts
  })

  r.post('/auth/logout', async ctx => {
    ctx.cookies.set('jwt', null)
    ctx.body = 'logout success'
  })
}
