const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TableSchema = new Schema(
  {
    table: {
      type: Number,
      require: true,
    },
    day: {
      type: Schema.ObjectId,
      ref: 'days'
    },
    seat: [
      {
        type: Schema.ObjectId,
        ref: 'maintickets',
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = Table = mongoose.model('tables', TableSchema)
