const express = require('express')
const router = express.Router()

const DrawController = require('../../controllers/DrawController')

// router.post("/register", DrawController.register);
// router.post("/login", DrawController.login);
// router.post("/verify-email", DrawController.verifyEmail);
router.post("/products", DrawController.getProducts);
/*================ Mr.New ==============*/
router.post('/createMockData', DrawController.createMockData)
router.post('/getRandomTables', DrawController.getRandomTables)
router.post(
  '/getRandomTablesByUserId/:userId/:currentDay',
  DrawController.getRandomTablesByUserId,
)
router.post('/getAllDays', DrawController.getAllDays)
router.post('/search', DrawController.searchData)
router.post('/getAllUsers', DrawController.getAllUsers)
router.post(
  '/getRandomTablesByDayIdAndRoomNumber',
  DrawController.getRandomTablesByDayIdAndRoomNumber,
)
router.put(
  '/getSatelliteUsersByEventId/:satelliteEventId',
  DrawController.getSatelliteUsersByEventId,
)
router.put(
  '/searchSatelliteUsersBySatelliteEventId/:satelliteEventId',
  DrawController.searchSatelliteUsersBySatelliteEventId,
)
router.post('/getEventById/:_id', DrawController.getEventById)
router.post('/sendEmailToAdmin', DrawController.sendEmailToAdmin)
router.post('/getTicketsByUserId/:userId', DrawController.getTicketsByUserId)
/*======================================*/
router.post("/payment", DrawController.payment);


/*=====================Play Game=================*/
router.post("/assignSatelliteTable", DrawController.assignSatelliteTable);
router.post("/makeTable", DrawController.makeTable);
router.post("/roomDraw/:roomnumber/:daynumber", DrawController.roomDraw);
router.post("/endDay/:daynumber", DrawController.endDay);
router.post("/finalRoom/:id", DrawController.finalRoom);
router.post("/getFinalWinner", DrawController.getFinalWinner);
router.post("/getFinalWinnerBypage", DrawController.getFinalWinnerBypage);

/*=====================Admin Page=================*/
router.post("/current_event", DrawController.getCurrentEvent);
router.post("/create_event", DrawController.create_Event);
router.post("/create_sEvent", DrawController.create_sEvent);
router.post("/create_mEvent", DrawController.create_mEvent);

router.post("/get_tickets", DrawController.get_tickets);
router.post("/resetPassword", DrawController.resetPassword);

 
/*=====================Mock Data for testing=================*/
router.post("/create_mock", DrawController.createMockData);

module.exports = router
