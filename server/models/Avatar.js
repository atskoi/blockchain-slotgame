const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AvatarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)

module.exports = Avatar = mongoose.model('avatars', AvatarSchema)
