const Router = require('koa-router')
const post = require('./components/post/controllers')
const user = require('./components/user/controllers')
const auth = require('./components/auth/controllers')

const r = new Router({ prefix: '/api' }) // ใส่prefix เพื่อให้ได้ลิงค์ตามต้องการ

post(r)
user(r)
auth(r)

module.exports = r
