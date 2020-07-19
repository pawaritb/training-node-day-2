const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, trim: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
)

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
})

mongoose.model('User', userSchema)
