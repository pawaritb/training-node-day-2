const { Post, User } = require('mongoose').models
const { assert } = require('chai')

const mockUser = {
  email: 'test@gmail.com',
  password: 'testpassword',
  name: 'test',
}

describe.only('Post', () => {
  it('Create post', async () => {
    const user = await User.create(mockUser)
    const post = await Post.create({
      title: 'mytitle',
      detail: 'mydetail',
      user: user.id,
    })

    await Post.create({
      title: 'mytitle2',
      detail: 'mydetail',
      user: user.id,
    })

    const posts = await Post.find().populate('user')
    // populate ได้เพราะ schema ที่ไปตั้งค่าไว้
    // console.log(posts)
    assert.equal(true, true)

    const myuser = await User.findById(user.id).populate('posts')
    console.log(myuser.posts)
  })
})

// lib แนะนำ
// joi github -เอาไว้ verify schema
// ajv github -jason schema
// pdfmake github -generate pdf
// boom github -gen error code
// sequelize - เอาไว้ต่อกับ database อื่นพวก sql
