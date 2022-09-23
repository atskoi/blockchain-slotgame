const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DaySchema = new Schema(
  {
    daynumber: {
      type: Number,
      default: 1
    },
    status: {
      type: Number,
      default: 0 
      // 0 : not start
      // 1 : started
      // 2 : finished
    },
    event_id: {
      type: Schema.ObjectId,
      ref: 'events',
    },
    room: [
      {
        type: Schema.ObjectId,
        ref: 'rooms'
      }
    ],
    entry: {
      type: Number,
      default: 0
    },
    winner: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = Day = mongoose.model("days", DaySchema);