const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const RoomSchema = new Schema(
  {
    roomnumber: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: false // not drawed
    },
    day: {
      type: Schema.ObjectId,
      ref: 'days'
    }
  },
  {
    timestamps: true,
  },
)

module.exports = Room = mongoose.model('rooms', RoomSchema)