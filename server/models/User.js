const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 'fake'
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  town: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  postalcode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  avatar: {
    type: Schema.ObjectId,
    ref: 'avatars',
  },
})

module.exports = User = mongoose.model('users', UserSchema)
