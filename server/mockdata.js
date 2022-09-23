// Create Avatar
  for (var i = 1; i <= 20; i++) {
    let newAvatar = new Avatar({name: 'avatar ('+i+').png'})
    await newAvatar.save()
  }
  res.json("OK")

// Create Users

  var newUser = {}
  let avatars = await Avatar.find()

  for (var i = 0; i < 7512; i++) {
    newUser = new User({
      name: 'abc admin' + i,
      email: 'admin' + i + 'gmail.com',
      username: 'abc admin' + i,
      address: 'address' + i,
      town: 'town' + i,
      province: 'province' + i,
      postalcode: 'postalcode' + i,
      phone: 'phone' + i,
      avatar: avatars[i % 20]._id
    })
    console.log(i)
    await newUser.save()
  }

  res.json("OK")
// Create Main Ticket

  let event = await Event.findOne({status: {$lt : 2}});

  var newMainTicket = {}

  User.find().then(async (users) => {
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < 4; j++) {
        console.log(i + '-----' + j)
        newMainTicket = new MainTicket({
          user_id: users[i]._id,
          username: users[i].username,
          event: event._id
        })
        await newMainTicket.save()
      }
    }
    res.json("OK")
  })

// Create Satellite Ticket
  let event = await Event.findOne({status: {$lt : 2}});

  var newSatellTicket = {}

  User.find().then(async (users) => {
    var i = 0;
    var sat = event.satellite.filter(item => item.status == true);
    for (var ii = 0; ii < sat.length; ii++) {
      for (i = ii*200; i < 200*(ii+1); i++) {
        for (var j = 0; j < 5; j++) {
          newSatelliteTicket = new SatelliteTicket({
            user_id: users[i]._id,
            username: users[i].username,
            eventId: event._id,
            satelliteId: sat[ii]._id,
          })
          await newSatelliteTicket.save()
          console.log(i + '-----' + j)
        }
      }
    }
    res.json("OK")
  })

// Create Satellite Table
async function assignSatelliteTable(roomnumber, satelliteId) {
  const {satelliteId, roomnumber} = req.body

  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).populate('room', 'roomnumber').sort({'daynumber': -1});

  let newRoom;

  if(day == null) { // when there is no day info in day table.
    day = new Day({
      daynumber: 1,
      event_id: event._id,
    })

    newRoom = new Room({
      roomnumber: roomnumber,
      day: day._id
    });
    await newRoom.save();

    day.room = [newRoom._id];
    await day.save();
  } else {  // when there is a day info in day table.
    let roomflag = day.room.filter(item => item.roomnumber == roomnumber).length > 0;
    if(!roomflag) { // when there is a roomnumber info in day's room field.
      newRoom = new Room({
        roomnumber: roomnumber,
        day: day._id
      });

      await newRoom.save();
      day.room = [...day.room, newRoom._id];
      await day.save();
    }
  }

  let satelliteEvent = event.satellite.filter(item => item._id.toString() == satelliteId);

  let maps
  var newMainTicket
  var i = 0, j = 0

  SatelliteTicket.find({ satelliteId: satelliteId }).then(async data => {
    maps = data;
    var newMainTicket = {}

    for (i = 0; i < satelliteEvent[0].winners; i++) {
      let winnerNumber = Math.ceil(Math.random() * 1000) % maps.length;
      await SatelliteTicket.findOneAndUpdate(
        { _id: maps[winnerNumber]._id },
        { $set: { status: true } },
      )

      newMainTicket = new MainTicket({
        user_id: maps[winnerNumber].user_id,
        satelliteId: satelliteId,
        event: event._id
      })
      await newMainTicket.save()
      maps.splice(winnerNumber, 1);
    }

    MainTicket.find({ satelliteId: satelliteId }).then(async (maindata) => {
      maps = maindata
      let temp = []
      let tempuser_id = []
      let avoiderror = 0;
      j = (roomnumber) * 2000;

      while (true) {
        var isExistRoomNumber = await Table.findOne({table: j});

        if(isExistRoomNumber) {
          j++; continue;
        }

        for (i = 0; i < maps.length; i++) {
          let flag = tempuser_id.filter(item => item.toString() == maps[i].user_id.toString()).length;

          if (flag < 2) {
            await MainTicket.findOneAndUpdate(
              { _id: maps[i]._id },
              {
                $set: {
                  history: [
                    ...maps[i].history,
                    {
                      room: Math.floor(j / 20000),
                      table: j % 20000,
                      seat: temp.length,
                    },
                  ],
                },
              },
            )

            temp.push(maps[i]._id)
            tempuser_id.push(maps[i].user_id)
            maps.splice(i, 1)
            avoiderror = 0;
            i--
          } else {
            avoiderror++;
            continue;
          }
          if (temp.length == 10 || maps.length === 0) {
            newTable = new Table({
              table: j,
              seat: temp,
              day: day._id
            })

            await newTable.save()
            j++;
            temp = [];
            tempuser_id = [];
            break;
          }
        }

        console.log("maps.length => ", maps.length)
        if (maps.length === 0) {
          break
        }

        if(avoiderror > maps.length) {
          newTable = new Table({
            table: j,
            seat: temp,
            day: day._id
          })

          await newTable.save()
          j++;
          temp = [];
          tempuser_id = [];
        }
      }
    })

  })

  res.json("OK")
}

// Create Table
async function firstDraw() {
  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort({'daynumber': -1});

  MainTicket.find({ status: true }).then(async (data) => {
    let maps = data
    let temp = []
    let tempuser_id = []
    let newTable
    let avoiderror = 0; // avoid always flag == 2
    var i = 0, j = 0

    while (true) {
      for (i = 0; i < maps.length; i++) {
        let flag = tempuser_id.filter(item => item.toString() == maps[i].user_id.toString()).length;

        if (flag < 2) {
          await MainTicket.findOneAndUpdate(
            { _id: maps[i]._id },
            {
              $set: {
                history: [
                  ...maps[i].history,
                  {
                    room: Math.floor(j / 20000),
                    table: j % 20000,
                    seat: temp.length,
                  },
                ],
              },
            },
          )

          temp.push(maps[i]._id)
          tempuser_id.push(maps[i].user_id)
          maps.splice(i, 1)
          avoiderror = 0;
          i--
        } else {
          avoiderror++;
          continue;
        }
        if (temp.length == 10 || maps.length === 0) {
          newTable = new Table({
            table: j,
            seat: temp,
            day: day._id
          })

          await newTable.save()
          j++;
          temp = [];
          tempuser_id = [];
          break;
        }
      }

      console.log("maps.length => ", maps.length)
      if (maps.length === 0) {
        break
      }

      if(avoiderror > maps.length) {
        newTable = new Table({
          table: j,
          seat: temp,
          day: day._id
        })

        await newTable.save()
        j++;
        temp = [];
        tempuser_id = [];
      }

    }
  })
}

// Play
async function play() {
  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort({'daynumber': -1});

  var tables = await Table.find({day: day._id})

  for (var i = tables.length - 1; i >= 0; i--) {
    let temp = tables[i].seat

    for (var j = temp.length - 1; j > 2; j--) {
      let rand = Math.ceil(Math.random() * 100) % temp.length

      await MainTicket.findOneAndUpdate(
        { _id: temp[rand]._id },
        { $set: { status: false } },
      )

      temp.splice(rand, 1)
    }
    console.log('temp-length----->', i)
    // await Table.findOneAndUpdate({ _id: tables[i]._id }, {$set: {'seat': temp} })
  }
}


// drawRoom
async function drawRoom(room) {
  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort({'daynumber': -1});

  var tables = await Table.find({day: day._id, "table": {$lt : room*2000, $gt : (room - 1)*2000}})

  for (var i = tables.length - 1; i >= 0; i--) {
    let temp = tables[i].seat

    for (var j = temp.length - 1; j > 2; j--) {
      let rand = Math.ceil(Math.random() * 100) % temp.length

      await MainTicket.findOneAndUpdate(
        { _id: temp[rand]._id },
        { $set: { status: false } },
      )

      temp.splice(rand, 1)
    }
    console.log('temp-length----->', i)
    // await Table.findOneAndUpdate({ _id: tables[i]._id }, {$set: {'seat': temp} })
  }
}

// finalDraw
async function finalRoom(finalwinner) {
  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort({'daynumber': -1});

  var tables = await Table.find({day: day._id})

  let total = 0;

  for (var i = tables.length - 1; i >= 0 && total <= finalwinner; i--) {
    let temp = tables[i].seat

    let randomlimit = Math.ceil(Math.random() * 100) % 3;

    for (var j = temp.length - 1; j > randomlimit; j--) {
      let rand = Math.ceil(Math.random() * 100) % temp.length

      await MainTicket.findOneAndUpdate(
        { _id: temp[rand]._id },
        { $set: { status: false } },
      )

      temp.splice(rand, 1)
      total++
    }

    console.log('temp-length----->', i)
    // await Table.findOneAndUpdate({ _id: tables[i]._id }, {$set: {'seat': temp} })
  }
}






// Create first Room and Day

  let event = await Event.findOne({status: 0});
  let count = await MainTicket.find({ status: true, event: event._id }).count();

  let newRoom = {}, roomlist=[];

  let newDay = new Day({
    daynumber: 1,
    event_id: event._id,
  })

  for (var i = 1; i <= 26; i++) {
    newRoom = new Room({
      roomnumber: i,
      day: newDay._id
    });
    roomlist.push(newRoom._id);
    newRoom.save();
  }

  newDay.room = roomlist;

  await newDay.save();
  console.log("OOO AAA OOO AAA OOO AAA OOO AAA");