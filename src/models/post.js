const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema({
  title: String,
  detail: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

mongoose.model('Post', postSchema)
