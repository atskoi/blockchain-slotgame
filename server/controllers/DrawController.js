const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const keys = require('../config/keys')

var request = require('request')
var qs = require('querystring')

const { otplibAuthenticator } = require('../config/otplib')
const { mailgunHelper } = require('../config/mailgun')

const User = require('../models/User')
const Winner = require('../models/Winner')
const Avatar = require('../models/Avatar')
const Event = require('../models/Event')
const MainTicket = require('../models/MainTicket')
const SatelliteTicket = require('../models/SatelliteTicket')
const Table = require('../models/Table')
const Day = require('../models/Day')
const Room = require('../models/Room')
const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD } = require('../utils/constants')

let otp
let roomnames = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

const transporter = nodemailer.createTransport({
  service: 'GMail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASSWORD,
  },
})

exports.getProducts = (req, res) => {
  Event.findOne().then((event) => {
    if (event) {
      res.json({ products: event })
    }
  })
}

/**
 * Get 12 random tables from DB.
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.getRandomTables = async (req, res) => {
  let tables = []
  const numberOfAllTables = await Table.find().count()
  if (numberOfAllTables > 10) {
    tables = await Table.aggregate([{ $sample: { size: 10 } }])
  } else {
    tables = await Table.find()
  }
  await Table.populate(tables, {
    path: 'seat',
    populate: [{ path: 'user_id', populate: [{ path: 'avatar' }] }],
  })
    .then((results) => {
      return res.status(200).json(results)
    })
    .catch((err) => {
      return res.status(500).send('Server Error')
    })
}

/**
 * Get random 10 tables by user id
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.getRandomTablesByUserId = async (req, res) => {
  let tables = []
  let { userId, currentDay } = req.params

  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id, daynumber: currentDay })

  const resTables = []

  const numberOfTables = (
    await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          'seat.user_id': mongoose.Types.ObjectId(userId),
        },
      },
      { $count: 'numberOfTables' },
    ])
  ).numberOfTables

  if (numberOfTables > 10) {
    tables = await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          'seat.user_id': mongoose.Types.ObjectId(userId),
        },
      },
      { $sample: { size: 10 } },
    ])
  } else {
    tables = await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          'seat.user_id': mongoose.Types.ObjectId(userId),
        },
      },
    ])
  }

  let maxDay = await MainTicket.findOne({ user_id: userId }).sort({ day: -1 })

  for (let i = 0; i < tables.length; i += 1) {
    let table = await Table.findById(tables[i]._id).populate({
      path: 'seat',
      populate: [{ path: 'user_id', populate: [{ path: 'avatar' }] }],
    })
    await resTables.push(table)
  }
  return res
    .status(200)
    .json({ table: resTables, maxDay: currentDay })
}

/**
 * Get random 10 tables by day id and room number
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.getRandomTablesByDayIdAndRoomNumber = async (req, res) => {
  let tables = []
  const resTables = []
  const { dayId, roomnumber } = req.body

  const numberOfTables = (
    await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          day: mongoose.Types.ObjectId(dayId),
          table: {
            $lt: (Number(roomnumber) + 1) * 2000 + 1,
            $gt: Number(roomnumber) * 2000,
          },
          // 'seat.history': {
          //   $elemMatch: {
          //     room: roomnumber,
          //   },
          // },
        },
      },
      { $count: 'numberOfTables' },
    ])
  ).numberOfTables

  if (numberOfTables > 10) {
    tables = await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          day: mongoose.Types.ObjectId(dayId),
          table: {
            $lt: (Number(roomnumber) + 1) * 2000 + 1,
            $gt: Number(roomnumber) * 2000,
          },
          // 'seat.history': {
          //   $elemMatch: {
          //     room: roomnumber,
          //   },
          // },
        },
      },
      { $sample: { size: 10 } },
    ])
  } else {
    tables = await Table.aggregate([
      { $unwind: '$seat' },
      {
        $lookup: {
          from: 'maintickets',
          localField: 'seat',
          foreignField: '_id',
          as: 'seat',
        },
      },
      {
        $match: {
          day: mongoose.Types.ObjectId(dayId),
          table: {
            $lt: (Number(roomnumber) + 1) * 2000 + 1,
            $gt: Number(roomnumber) * 2000,
          },
          // 'seat.history': {
          //   $elemMatch: {
          //     room: roomnumber,
          //   },
          // },
        },
      },
    ])
  }

  for (let i = 0; i < tables.length; i += 1) {
    let table = await Table.findById(tables[i]._id).populate({
      path: 'seat',
      populate: [{ path: 'user_id', populate: [{ path: 'avatar' }] }],
    })
    await resTables.push(table)
  }
  return res.status(200).json(resTables)
}

/**
 * Search users
 * @param {object} req
 * @param {object} res
 */
exports.searchData = async (req, res) => {
  const { pageNumber, pageSize, key, currentDay } = req.body

  MainTicket.aggregate(
    [
      { $match: { username: new RegExp(key) } },
      {
        $group: {
          _id: '$user_id',
          username: { $first: '$username' },
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $gt: ['$day', currentDay] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $gt: ['$day', currentDay] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAllUsers = async (req, res) => {
  const { pageNumber, pageSize } = req.body
  MainTicket.aggregate(
    [
      {
        $group: {
          _id: '$user_id',
          username: { $first: '$username' },
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Get all days
 * @param {object} req
 * @param {object} res
 */
exports.getAllDays = async (req, res) => {
  let event = await Event.findOne({ status: { $lt: 3 } })

  if (event) {
    Day.find({ event_id: event._id })
      .populate('room')
      .then((data) => {
        return res.json(data)
      })
      .catch((error) => res.status(500).send('Server Error'))
  } else {
    return res.json([])
  }
}

/**
 * Get the users who purchased the satellite tickets by event id
 * @param {object} req
 * @param {object} res
 */
exports.getSatelliteUsersByEventId = (req, res) => {
  const { satelliteEventId } = req.params
  const { pageNumber, pageSize } = req.body

  SatelliteTicket.aggregate(
    [
      {
        $match: {
          satelliteId: mongoose.Types.ObjectId(satelliteEventId),
        },
      },
      {
        $group: {
          _id: '$username',
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Search the users who purchased the satellite tickets by event id
 * @param {object} req
 * @param {object} res
 */
exports.searchSatelliteUsersBySatelliteEventId = (req, res) => {
  const { satelliteEventId } = req.params
  const { keyword, pageNumber, pageSize } = req.body
  // console.log(req.body)
  SatelliteTicket.aggregate(
    [
      {
        $match: {
          username: new RegExp(keyword),
          satelliteId: mongoose.Types.ObjectId(satelliteEventId),
        },
      },
      {
        $group: {
          _id: '$username',
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Get satellite events by the main event id
 * @param {object} req
 * @param {object}
 */
exports.getEventById = (req, res) => {
  Event.findOne({ status: { $lt: 3 } })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((error) => {
      return res.status(500).send('Server Error')
    })
}

/**
 * Get the tickets by user id
 * @param {object} req
 * @param {object} res
 * @returns object
 */
exports.getTicketsByUserId = async (req, res) => {
  const { userId } = req.params
  const resData = []

  //  Get the main event tickets
  const numberOfMainTicketsByUserId = await MainTicket.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$event', numberOfTickets: { $sum: 1 } } },
  ])
  for (let i = 0; i < numberOfMainTicketsByUserId.length; i += 1) {
    let mainEvent = await Event.findById(numberOfMainTicketsByUserId[i]._id)
    await resData.push({
      _id: numberOfMainTicketsByUserId[i]._id,
      purchaseData: 'Main',
      eventTime: mainEvent.main.date,
      quantity: numberOfMainTicketsByUserId[i].numberOfTickets,
      result: mainEvent.status,
    })
  }

  //  Get the satellite event tickets
  const numberOfSatelliteTicketsByUserId = await SatelliteTicket.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$satelliteId', numberOfTickets: { $sum: 1 } } },
  ])
  for (let i = 0; i < numberOfSatelliteTicketsByUserId.length; i += 1) {
    let wholeEvent = await Event.findOne({
      satellite: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(numberOfSatelliteTicketsByUserId[i]._id),
        },
      },
    })

    wholeEvent.satellite.map((item, index) => {
      if (String(item._id) == numberOfSatelliteTicketsByUserId[i]._id) {
        resData.push({
          _id: numberOfSatelliteTicketsByUserId[i]._id,
          purchaseData: `Satellite ${index + 1}`,
          eventTime: item.date,
          quantity: numberOfSatelliteTicketsByUserId[i].numberOfTickets,
          result: item.status,
        })
      }
    })
  }
  return res.status(200).json(resData)
}

/**
 * Send email to the administrator's email account
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.sendEmailToAdmin = (req, res) => {
  const { firstName, lastName, email, password, subject, message } = req.body
  const transporter = nodemailer.createTransport({
    service: 'GMail',
    auth: {
      user: email,
      pass: password,
    },
  })

  var mailOptions = {
    from: email,
    to: ADMIN_EMAIL,
    subject: subject,
    text: message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      // return res.status(200).send('Failed')
      return res.status(200).send('Success')
    } else {
      console.log('Email sent: ' + info.response)
      return res.status(200).send('Success')
    }
  })
}

/*========================= Admin page =============================*/
// Create New Evnet
exports.create_Event = async (req, res) => {
  let event = await Event.findOne({ status: { $lt: 3 } })
  await User.deleteMany({ password: 'fake' }) // for test

  if (event) {
    event.status = 3
    var entryCount = await MainTicket.find({ event: event._id }).count()
    var winnerCount = await MainTicket.find({
      event: event._id,
      status: true,
    }).count()

    event.entry = entryCount
    event.winner = winnerCount

    await event.save()
  }

  const newEvent = new Event({
    name: req.body.eventName,
    status: 0,
  })

  await MainTicket.deleteMany()
  await SatelliteTicket.deleteMany()

  newEvent
    .save()
    .then((event) => {
      res.json('OK')
    })
    .catch((err) => console.log(err))
}

// Create Satellite Event
exports.create_sEvent = async (req, res) => {
  const current_event = await Event.findById(req.body.id)
  const current_satellite = current_event.satellite
  current_satellite.push({
    price: req.body.price,
    entries: req.body.entries,
    winners: req.body.winners,
    date: req.body.date,
  })

  await Event.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { satellite: current_satellite } },
  )

  const updated_event = await Event.findById(req.body.id)

  res.json({
    success: true,
    current_event: updated_event,
  })
}

// Create Main Event
exports.create_mEvent = async (req, res) => {
  const current_event = await Event.findById(req.body.id)

  await Event.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        main: {
          price: req.body.price,
          date: req.body.date,
        },
      },
    },
  )

  const updated_event = await Event.findById(req.body.id)

  res.json({
    success: true,
    current_event: updated_event,
  })
}

exports.getCurrentEvent = async (req, res) => {
  const current_event = await Event.findOne({ status: { $lt: 3 } })
  res.json({
    success: true,
    current_event: current_event,
  })
}

exports.resetPassword = async (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err
      console.log(hash)
      User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            password: hash,
          },
        },
      )
        .then((user) => {
          console.log(user)
          let mailOptions = {
            from: ADMIN_EMAIL,
            to: user.email,
            subject: 'Password changed!',
            html: `<h6 style="text-align:center;">Please confirm your new password.</h6><p style="text-align: center; font-size: 24px;"><b>${req.body.password}</b></p>`,
          }
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          res.json({
            success: 'true',
            user: user,
          })
        })
        .catch((err) =>
          res.json({
            succeess: 'false',
          }),
        )
    })
  })
}

/*========================= CartPage =============================*/
exports.get_tickets = async (req, res) => {
  const current_event = await Event.findOne({ status: 0 })

  let tickets = []

  tickets.push(current_event.main)
  tickets.psuh(current_event.satellite)

  res.json({
    success: true,
    tickets,
  })
}
/*========================= CartPage =============================*/

/*========================= PlayGame =============================*/
exports.assignSatelliteTable = async (req, res) => {
  const { satelliteId, roomnumber } = req.body

  let flag = await SatelliteTicket.find({ satelliteId: satelliteId }).count()
  if (flag == 0) return res.json('not exist')

  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id, daynumber: 1 }).populate(
    'room',
    'roomnumber',
  ) // find day-1

  let newRoom

  let satelliteEvent = event.satellite.filter(
    (item) => item._id.toString() == satelliteId,
  )

  if (day == null) {
    // create day-1 when there is no day-1 info in day table.
    day = new Day({
      daynumber: 1,
      event_id: event._id,
    })

    newRoom = new Room({
      roomnumber: roomnumber,
      day: day._id,
    })
    await newRoom.save()

    day.room = [newRoom._id]
  } else {
    // when there is a day info in day table.
    let roomflag = day.room.filter((item) => item.roomnumber == roomnumber)
    if (!roomflag.length > 0) {
      // when there is a roomnumber info in day's room field.
      newRoom = new Room({
        roomnumber: roomnumber,
        day: day._id,
      })

      await newRoom.save()
      day.room = [...day.room, newRoom._id]
    }
    let checkRoom = await Room.findById(roomflag[0])

    if (checkRoom) {
      if (checkRoom.status) {
        // check room drawed
        return res.json('drawed')
      } else {
        // check room filled
        let checkTable = await Table.find({
          table: { $lt: (roomnumber + 1) * 2000 + 1, $gt: roomnumber * 2000 },
        }).count()
        if (checkTable >= 2000 - satelliteEvent[0].winners)
          return res.json('filled')
      }
    }
  }

  let maps
  var newMainTicket
  var i = 0,
    j = 0

  await SatelliteTicket.find({ satelliteId: satelliteId }).then(
    async (data) => {
      maps = data
      var newMainTicket = {}

      for (i = 0; i < satelliteEvent[0].winners && maps.length > 0; i++) {
        // get winners for satellite tickets
        let winnerNumber = Math.ceil(Math.random() * 1000) % maps.length

        await SatelliteTicket.findOneAndUpdate(
          { _id: maps[winnerNumber]._id },
          { $set: { status: true } },
        )

        newMainTicket = new MainTicket({
          user_id: maps[winnerNumber].user_id,
          username: maps[winnerNumber].username,
          satelliteId: satelliteId,
          event: event._id,
        })
        await newMainTicket.save()
        maps.splice(winnerNumber, 1)
      }

      MainTicket.find({ satelliteId: satelliteId }).then(async (maindata) => {
        // generate table for satellite tickets
        maps = maindata
        let temp = []
        let tempuser_id = []
        let avoiderror = 0
        j = roomnumber * 2000

        while (true) {
          var isExistRoomNumber = await Table.findOne({ table: j })

          if (isExistRoomNumber) {
            j++
            continue
          }

          for (i = 0; i < maps.length; i++) {
            let flag = tempuser_id.filter(
              (item) => item.toString() == maps[i].user_id.toString(),
            ).length

            if (flag < 2) {
              await MainTicket.findOneAndUpdate(
                { _id: maps[i]._id },
                {
                  $set: {
                    history: [
                      ...maps[i].history,
                      {
                        room: Math.floor(j / 2000),
                        table: j % 2000,
                        seat: temp.length,
                      },
                    ],
                  },
                },
              )

              temp.push(maps[i]._id)
              tempuser_id.push(maps[i].user_id)
              maps.splice(i, 1)
              avoiderror = 0
              i--
            } else {
              avoiderror++
              continue
            }
            if (temp.length == 10 || maps.length === 0) {
              newTable = new Table({
                table: j,
                seat: temp,
                day: day._id,
              })

              await newTable.save()
              j++
              temp = []
              tempuser_id = []
              break
            }
          }

          console.log('maps.length => ', maps.length)
          if (maps.length === 0) {
            break
          }

          if (avoiderror > maps.length) {
            newTable = new Table({
              table: j,
              seat: temp,
              day: day._id,
            })

            await newTable.save()
            j++
            temp = []
            tempuser_id = []
          }
        }

        let currentUser = await MainTicket.find().count()
        day.entry = currentUser
        await day.save()

        let event_satellite = event.satellite
        for (i = 0; i < event_satellite.length; i++) {
          if (event_satellite[i]._id.toString() == satelliteId) break
        }
        event_satellite[i].status = false
        await event.save()

        res.json('OK')
      })
    },
  )
}

exports.makeTable = async (req, res) => {
  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id, daynumber: 1 }) // find day-1

  if (day == null) {
    // create day-1 when there is no day-1 info in day table.
    day = new Day({
      daynumber: 1,
      event_id: event._id,
    })
  }

  let mainticketFlag = await MainTicket.find({ satelliteId: null }).count()

  if (mainticketFlag == 0) {
    return res.json('There is no main ticket. Please add main tickets.')
  }

  let winnerCount = await MainTicket.find().count()
  day.entry = winnerCount
  day.status = 1

  await day.save()

  await generateTable(day._id, { day: 1, satelliteId: null })

  if (event.status == 0) {
    event.status = 1
    await event.save()
  }

  res.json('OK')
}

exports.roomDraw = async (req, res) => {
  let roomnumber = Number(req.params.roomnumber)
  let daynumber = Number(req.params.daynumber)
  let tempwinner = []

  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id, daynumber: daynumber }) // get current day info

  let newDay = await Day.findOne({
    event_id: event._id,
    daynumber: daynumber + 1,
  })

  if (newDay == null) {
    newDay = new Day({
      // start to create new day
      daynumber: daynumber + 1,
      event_id: event._id,
    })

    await newDay.save()
  }

  var tables = await Table.find({
    day: day._id,
    table: { $lt: (roomnumber + 1) * 2000, $gt: roomnumber * 2000 - 1 },
  }) // get tables in this selected room

  for (var i = tables.length - 1; i >= 0; i--) {
    // choose winners from tables in selected room - play game
    let temp = tables[i].seat

    for (var j = temp.length - 1; j >= 0; j--) {
      // set main ticket's day current before choose (for again room draw) - play game
      let currentWinner = await MainTicket.findOne({
        _id: temp[j]._id,
        day: daynumber,
      })
      if (currentWinner) {
        // if current is exist, current winner's day increase by 1
        currentWinner.day = daynumber + 1
        await currentWinner.save()
      }
    }

    for (var j = temp.length - 1; j > 2; j--) {
      // choose winners - play game
      let rand = Math.ceil(Math.random() * 100) % temp.length

      await MainTicket.findOneAndUpdate(
        // loser's day decrease by 1
        { _id: temp[rand]._id },
        { $set: { day: daynumber } },
      )

      temp.splice(rand, 1)
    }
    console.log('winner-length----->', i)
  }

  await generateTable(newDay._id, { day: daynumber + 1 }) // generate tables for new days

  let room = await Room.findOne({ roomnumber: roomnumber, day: day._id })

  room.status = true
  await room.save()

  let currentUser = await MainTicket.findOne({
    day: { $gt: daynumber },
  }).count()

  day.winner = currentUser
  await day.save()
  newDay.entry = currentUser
  await newDay.save()

  res.json('OK')
}

exports.endDay = async (req, res) => {
  let { daynumber } = req.params
  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id, daynumber: daynumber })
  let nextDay = await Day.findOne({
    event_id: event._id,
    daynumber: Number(daynumber) + 1,
  })

  day.status = 2
  nextDay.status = 1

  let winnerCount = await MainTicket.find({ day: { $gt: daynumber } }).count()

  day.winner = winnerCount
  nextDay.entry = winnerCount

  await nextDay.save()
  await day.save()

  if (event.status == 0) {
    event.status = 1
    await event.save()
  }

  res.json('OK')
}

exports.finalRoom = async (req, res) => {
  let finalwinnernum = Number(req.params.id)

  let event = await Event.findOne({ status: { $lt: 3 } })
  let day = await Day.findOne({ event_id: event._id }).sort({ daynumber: -1 })

  var tables = await Table.find({ day: day._id })

  let total = 0

  day.status = false
  day.winner = finalwinnernum

  let allwinner = []
  let finalwinner = []

  for (var i = tables.length - 1; i >= 0; i--) {
    allwinner = [...allwinner, ...tables[i].seat]
  }

  for (var i = allwinner.length - 1; total < finalwinnernum; i--) {
    let random = Math.ceil(Math.random() * 1000) % finalwinnernum

    finalwinner.push(allwinner[random])
    await MainTicket.findOneAndUpdate(
      { _id: allwinner[random] },
      { $set: { day: day.daynumber + 1 } },
    )

    total++
    allwinner.splice(random, 1)
  }

  let winnerItem = {}

  for (var i = finalwinner.length - 1; i >= 0; i--) {
    let tempWinner = await MainTicket.findOne({ _id: finalwinner[i] })

    winnerItem = await Winner.findOne({
      user: tempWinner.user_id,
      event: event._id,
    })

    if (winnerItem) {
      winnerItem.tickets = [...winnerItem.tickets, i + 1]
    } else {
      winnerItem = new Winner({
        user: tempWinner.user_id,
        event: event._id,
        tickets: [i + 1],
      })
    }

    await winnerItem.save()
  }

  let rooms = await Room.find({ day: day._id })

  for (i = 0; i < rooms.length; i++) {
    rooms[i].status = true
    await rooms[i].save()
  }

  await day.save()
  let entry = await MainTicket.find().count()

  event.status = 2
  event.winner = finalwinnernum
  event.entry = entry
  await event.save()

  res.json('OK')
}

exports.payment = async (req, res) => {
  let xKey = keys.cardknoxKey
  let xSoftwareName = keys.xSoftwareName
  let xSoftwareVersion = keys.xSoftwareVersion
  let transactionUrl = keys.transactionUrl
  let xVersion = keys.xVersion

  let event = await Event.findOne({ status: { $lt: 3 } })
  let { cart, user } = req.body

  let amount = 0
  for (var i = cart.length - 1; i >= 0; i--) {
    amount += cart[i].qty * cart[i].price
  }

  // request.post(
  //   {
  //     url: transactionUrl,
  //     form: {
  //       xKey: xKey,
  //       xVersion: xVersion,
  //       xSoftwareName: xSoftwareName,
  //       xSoftwareVersion: xSoftwareVersion,
  //       xCommand: 'cc:Sale',
  //       xAmount: amount,
  //       xCardNum: user.cardname,
  //       xCVV: user.cvc,
  //       xExp: user.expire,
  //       xEmail: user.xEmail,
  //       xBillFirstName: user.xBillFirstName,
  //       xBillLastName: user.xBillLastName,
  //       xBillStreet: user.xBillStreet,
  //       xBillCity: user.xBillCity,
  //       xBillState: user.xBillState,
  //       xBillZip: user.xBillZip,
  //       xBillCountry: user.xBillCountry,
  //       xBillCompany: user.xBillCompany,
  //       xBillPhone: user.xBillPhone,
  //     },
  //   },
  //   async function (error, response, body) {
  //     data = qs.parse(body)

  let main = cart.filter((item) => !item.satelliteId)
  let satellite = cart.filter((item) => item.satelliteId)

  let newTicket = {}

  if (main.length > 0) {
    for (var i = 0; i < main[0].qty; i++) {
      newTicket = new MainTicket({
        user_id: main[0].user_id,
        username: main[0].username,
        event: event._id,
      })

      await newTicket.save()
    }
  }

  if (satellite.length > 0) {
    for (var i = 0; i < satellite.length; i++) {
      for (var j = 0; j < satellite[i].qty; j++) {
        newTicket = new SatelliteTicket({
          user_id: satellite[i].user_id,
          username: satellite[i].username,
          eventId: satellite[i].eventId,
          satelliteId: satellite[i].satelliteId,
        })

        await newTicket.save()
      }
    }
  }

  let day = await Day.findOne({ event_id: event._id, daynumber: 1 }) // find day-1

  if (day == null) {
    // create day-1 when there is no day-1 info in day table.
    day = new Day({
      daynumber: 1,
      event_id: event._id,
    })
  }

  let winnerCount = await MainTicket.find().count()
  day.entry = winnerCount
  day.status = 1

  await day.save()

  await generateTable(day._id, { day: 1, satelliteId: null })

  res.json('OK')
  //   },
  // )
}

exports.getFinalWinner = async (req, res) => {
  let event = await Event.findOne({ status: 2 })
  if (event) {
    Winner.find({ event: event._id })
      .populate('user')
      .then((data) => {
        res.json(data)
      })
  } else {
    res.json([])
  }
}

exports.getFinalWinnerBypage = async (req, res) => {
  const { pageNumber, pageSize } = req.body
  let event = await Event.findOne({ status: 2 })
  if (event) {
    Winner.find({ event: event._id })
      .populate('user')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .then((data) => {
        res.json(data)
      })
  } else {
    res.json([])
  }
}

/*========================= PlayGame =============================*/

/*========================= Custom Function =============================*/
async function generateTable(day_id, search_param) {
  let day = await Day.findOne({ _id: day_id })

  await MainTicket.find(search_param).then(async (data) => {
    let maps = data
    let temp = []
    let tempuser_id = []
    let newTable, newRoom
    let avoiderror = 0 // avoid always flag == 2
    var i = 0,
      j = 0

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let roomcount = Math.ceil(data.length / 20000)

    for (i = 0; i < roomcount; i++) {
      // add new rooms
      let existRoom = await Room.findOne({ roomnumber: i, day: day._id })
      if (existRoom === null) {
        newRoom = new Room({
          roomnumber: i,
          day: day._id,
        })

        await newRoom.save()

        day.room = [...day.room, newRoom._id]
        await day.save()
      }
    }

    while (true) {
      var isExistRoomNumber = await Table.findOne({ table: j, day: day._id }) //if j is existed in table number, continue

      if (isExistRoomNumber) {
        j++
        continue
      }

      for (i = 0; i < maps.length; i++) {
        let flag = tempuser_id.filter(
          (item) => item.toString() == maps[i].user_id.toString(),
        ).length

        if (flag < 2) {
          // check if there are more than 2 users in temp
          let maphistory = maps[i].history
          let ticket_day = maps[i].day

          await MainTicket.findOneAndUpdate(
            { _id: maps[i]._id },
            {
              $set: {
                history: [
                  ...maphistory,
                  {
                    room: Math.floor(j / 2000),
                    table: j % 2000,
                    seat: temp.length,
                  },
                ],
                day: ticket_day,
              },
            },
          )

          temp.push(maps[i]._id)
          tempuser_id.push(maps[i].user_id)
          maps.splice(i, 1)
          avoiderror = 0
          i--
        } else {
          avoiderror++
          continue
        }
        if (temp.length == 10 || maps.length === 0) {
          newTable = new Table({
            table: j,
            seat: temp,
            day: day._id,
          })

          await newTable.save()
          j++
          temp = []
          tempuser_id = []
          break
        }
      }

      console.log('generateTable => ', maps.length)
      if (maps.length === 0) {
        break
      }

      if (avoiderror > maps.length) {
        newTable = new Table({
          table: j,
          seat: temp,
          day: day._id,
        })

        await newTable.save()
        j++
        temp = []
        tempuser_id = []
      }
    }
  })
}
/*========================= Custom Function =============================*/

/*========================= Create Mock Data =============================*/
exports.createMockData = async (req, res) => {
  let { mockUsernum, mockMainNum } = req.body

  // let mockflag = await MainTicket

  for (var i = 1; i <= 20; i++) {
    let avatar = await Avatar.findOne({ name: 'avatar (' + i + ').png' })
    if (avatar == null) {
      let newAvatar = new Avatar({ name: 'avatar (' + i + ').png' })
      await newAvatar.save()
    }
  }

  let newUser = {}
  let avatars = await Avatar.find()

  let existFakeuser = await User.find({ password: 'fake' })
  if (existFakeuser.length == 0) {
    for (var i = 0; i < Number(mockUsernum); i++) {
      newUser = new User({
        name: 'fake user' + i,
        email: 'fake' + i + 'gmail.com',
        username: 'fake user' + i,
        address: 'fake address' + i,
        town: 'fake town' + i,
        province: 'fake province' + i,
        postalcode: 'fake postalcode' + i,
        phone: 'fake phone' + i,
        avatar: mongoose.Types.ObjectId(avatars[i % 20]._id),
      })
      await newUser.save()
      console.log(i)
    }
  }

  let event = await Event.findOne({ status: { $lt: 2 } })

  let newMainTicket = {}

  let existFaketicket = await MainTicket.find()

  let users = await User.find({ password: 'fake' })

  if (existFaketicket.length == 0) {
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < Number(mockMainNum); j++) {
        console.log(users[i]._id + '-----' + i + '-----' + j)
        newMainTicket = new MainTicket({
          user_id: mongoose.Types.ObjectId(users[i]._id),
          username: users[i].username,
          event: mongoose.Types.ObjectId(event._id),
        })
        await newMainTicket.save()
      }
    }
  }

  var newSatelliteTicket = {}

  var i = 0
  var sat = event.satellite.filter((item) => item.status == true)
  for (var ii = 0; ii < sat.length; ii++) {
    let existFakesate = await SatelliteTicket.find({ satelliteId: sat[ii]._id })
    if (existFakesate.length == 0) {
      for (i = ii * 200; i < 200 * (ii + 1); i++) {
        for (var j = 0; j < 5; j++) {
          newSatelliteTicket = new SatelliteTicket({
            user_id: users[i % users.length]._id,
            username: users[i % users.length].username,
            eventId: event._id,
            satelliteId: sat[ii]._id,
          })
          await newSatelliteTicket.save()
          console.log(i + '-----' + j)
        }
      }
    }
  }
  res.json('OK')
}
/*========================================================================*/
