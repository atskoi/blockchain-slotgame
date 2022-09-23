const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MainTicketSchema = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: 'users',
    },
    event: {
      type: Schema.ObjectId,
      ref: 'events',
    },
    satelliteId: {
      type: Schema.ObjectId,
      ref: 'satellitetickets',
    },
    username: {
      type: String,
      require: true,
    },
    history: [
      {
        room: {
          type: Number,
        },
        seat: {
          type: Number,
        },
        table: {
          type: Number,
        },
        status: {
          type: Boolean
        }
      },
    ],
    day: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: true,
  },
)

module.exports = MainTicket = mongoose.model('maintickets', MainTicketSchema)
