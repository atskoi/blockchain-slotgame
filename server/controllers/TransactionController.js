const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

var request = require('request')
var qs = require('querystring')

let otp;

exports.purchase = (req, res) => {
  let xKey = 'companydev55893efda04f4797a2cb3b9ef28eed68'
  let xSoftwareName = 'xSoftwareName'
  let xSoftwareVersion = '1.0'
  let transactionUrl = 'https://x1.cardknox.com/gateway'
  let xVersion = '4.5.5'
  let xCommand = req.body.xCommand; //'cc:Sale'
  let xCardNum = req.body.xCardNum; //'4444333322221111'
  let xExp = req.body.xExp; //'1230'
  let xCVV = req.body.xCVV; //'111'
  let xBillFirstName = req.body.xBillFirstName; //'John1'
  let xBillLastName = req.body.xBillLastName; //'Doe'
  let xBillStreet = req.body.xBillStreet; //'123 Any Street'
  let xBillCity = req.body.xBillCity; //'Anytown'
  let xBillState = req.body.xBillState; //'NY'
  let xBillZip = req.body.xBillZip;// '12345'
  let xBillCountry = req.body.xBillCountry; //'USA'
  let xBillPhone = req.body.xBillPhone; //'8005551212'
  let xBillCompany = req.body.xBillCompany; //'Acme'
  let xShipPhone = '8005551212'
  let xAmount = '100'
  let xEmail = 'brewmaster0806@gmail.com'
  let xInvoice = '123426A'

  request.post(
    {
      url: transactionUrl,
      form: {
        xKey: keys.cardknoxKey,
        xVersion: xVersion,
        xSoftwareName: xSoftwareName,
        xSoftwareVersion: xSoftwareVersion,
        xCommand: xCommand,
        xAmount: xAmount,
        xCardNum: xCardNum,
        xCVV: xCVV,
        xExp: xExp,
        xInvoice: xInvoice,
        xEmail: xEmail,
        xBillFirstName: xBillFirstName,
        xBillLastName: xBillLastName,
        xBillStreet: xBillStreet,
        xBillCity: xBillCity,
        xBillState: xBillState,
        xBillZip: xBillZip,
        xBillCountry: xBillCountry,
        xBillCompany: xBillCompany,
        xBillPhone: xBillPhone,
      },
    },
    (error, response, body) => {
      // console.log('error:', error)
      console.log('statusCode:', response && response.statusCode)
      // console.log('body:', qs.parse(body))
      var data = qs.parse(body);
      console.log(data)
      res.json(data)
    },
  )
};
