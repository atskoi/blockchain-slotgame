const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const WinnerSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'users',
    },
    event: {
      type: Schema.ObjectId,
      ref: 'evnets',
    },
    tickets: [
      {
        type: Number,
      }
    ],
  },
  { timestamps: true },
)

module.exports = Winner = mongoose.model('winners', WinnerSchema)
