const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    main: {
      date: {
        type: Date,
        default: Date.now
      },
      price: {
        type: Number,
        default: 0
      },
      status: {
        type: Boolean,
        default: false,
      }
    },
    status: {
      type: Number,
      default: 0
      // 0: Started New Event -> After created new Event! Disable "New Event" button
      // 1: Ended salesment and assignment -> click: "Draw" button (Main Event), Disable: product page(purchase button)
      // 2: Ended Event -> Click: "End" button, "Final Draw" button, Enable: "New Event" Button
      // 3: xxx
    },
    entry: {
      type: Number,
      default: 0,
    },
    winner: {
      type: Number,
      default: 0,
    },
    satellite: [
      {
        price: {
          type: Number,
          default: 0
        },
        entries: {
          type: Number,
          default: 0
        },
        winners: {
          type: Number,
          default: 0
        }, 
        date: {
          type: Date,
          default: Date.now 
        },
        status: {
          type: Boolean,
          default: true
        }
      },
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Event = mongoose.model("events", EventSchema);
