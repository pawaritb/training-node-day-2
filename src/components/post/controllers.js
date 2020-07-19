const { Post } = require('mongoose').models

module.exports = r => {
  r.get('/posts', async ctx => {
    const { title } = ctx.query
    const find = {}
    if (title) {
      find.title = title
    }
    const titles = await Post.find(find, { __v: 0 })
    ctx.body = titles
  })

  r.get('/posts', async ctx => {
    const posts = await Post.find()
    ctx.body = posts
  })

  r.get('/posts/:id', async ctx => {
    const { id } = ctx.params
    const post = await Post.findById(id)
    ctx.body = post
  })

  r.put('/posts/:id', async ctx => {
    const { body } = ctx.request
    const { id } = ctx.params
    const post = await Post.findByIdAndUpdate(id, body, { new: true })
    ctx.body = post
  })

  r.post('/posts', async ctx => {
    const { body } = ctx.request
    const post = await Post.create(body)
    ctx.body = post
  })

  r.del('/posts/:id', async ctx => {
    const { id } = ctx.params
    const post = await Post.findByIdAndDelete(id)
    ctx.body = post
  })
}
