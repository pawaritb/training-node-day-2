const { User } = require('mongoose').models

module.exports = r => {
  r.get('/users', async ctx => {
    const { name } = ctx.query
    const find = {}
    if (name) {
      find.name = name
    }
    const users = await User.find(find, { password: 0, _id: 0, __v: 0 })
    ctx.body = users
  })

  r.get('/users/:id', async ctx => {
    const { id } = ctx.params
    const user = await User.findById(id)
    ctx.body = user
  })

  r.post('/users', async ctx => {
    const { body } = ctx.request
    const user = await User.create(body)
    ctx.body = user
  })

  r.del('/users/:id', async ctx => {
    const { id } = ctx.params
    const user = await User.findByIdAndDelete(id)
    console.log(id)
    ctx.body = user
  })

  r.put('/users/:id', async ctx => {
    const { id } = ctx.params
    const { body } = ctx.request
    const user = await User.findByIdAndUpdate(id, body, { new: true })
    ctx.body = user
  })
}
