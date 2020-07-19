const { assert } = require('chai')
const { User } = require('mongoose').models

const mockUser = {
  email: 'test3@gmail.com',
  password: 'password3',
  name: 'test3',
}

describe('User', () => {
  it('Create user by helper function', async () => {
    await User.create(mockUser)
    const users = await User.find()
    assert.equal(users.length, 1)
  })

  xit('Create user by constructor', async () => {
    // ใส่ x หน้า it จะลดเทสเคส
    const user = new User(mockUser)
    await user.save()
    const users = await User.find()
    assert.equal(users.length, 1)
  })

  it('Update user', async () => {
    // จะรันเทสนี้เทสเดียวถ้าใส่ .only
    const user = new User(mockUser)
    await user.save()
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: 'editpassword',
        name: 'edited name',
      },
      { new: true },
    )
    assert.equal(newUser.name, 'edited name')
    console.log(user)
  })
})
