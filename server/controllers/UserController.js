const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const keys = require('../config/keys')
const User = require('../models/User')

const { otplibAuthenticator } = require('../config/otplib')
const { mailgunHelper } = require('../config/mailgun')
const {
  SERVER_ERROR,
  ADMIN_EMAIL,
  ADMIN_EMAIL_PASSWORD,
} = require('../utils/constants')
const Avatar = require('../models/Avatar')

let otp

const transporter = nodemailer.createTransport({
  service: 'GMail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASSWORD,
  },
})

exports.register = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    address,
    city,
    province,
    postalcode,
    phone,
  } = req.body
  // otp = otplibAuthenticator.generate(email)
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ data: 'Email already exists' })
    } else {
      const newUser = new User({
        name: `${firstName} ${lastName}`,
        email,
        password,
        username,
        address,
        town: city,
        province,
        postalcode,
        phone,
      })

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                address: user.address,
                town: user.town,
                province: user.province,
                postalcode: user.postalcode,
                phone: user.phone,
                role: user.role,
              }
              console.log('successfully register!!!')
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: '5 days', // 1 year in seconds
                },
                (err, token) => {
                  if (err) throw err
                  // res.json({
                  //   success: true,
                  //   accessToken: 'Bearer ' + token,
                  //   user: payload,
                  // })
                  /* ================== Send user's mail the verification code ============ */
                  try {
                    let mailOptions = {
                      from: ADMIN_EMAIL,
                      to: email,
                      subject: 'Welcome!',
                      html: `<h3 style="text-align: center;">Welcome ${firstName}!</h3><h6 style="text-align:center;">Please verify your email.</h6><p style="text-align: center;"><a href="http://${req.hostname}/auth/verifyEmail/${token}">Verify</a></p>`,
                    }
                    console.log(req.hostname)
                    console.log(mailOptions)
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error)
                        // return res.status(200).send('Failed')
                        res.json({
                          success: true,
                          accessToken: 'Bearer ' + token,
                          user: payload,
                        })
                      } else {
                        console.log('Email sent: ' + info.response)
                        // return res.status(200).send('Success')
                        res.json({
                          success: true,
                          accessToken: 'Bearer ' + token,
                          user: payload,
                        })
                      }
                    })
                  } catch (err1) {
                    console.log(err1)
                  }

                  /* ======================================================================== */
                },
              )
            })
            .catch((err) => console.log(err))
        })
      })
    }
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body

  // Find user by email
  User.findOne({ email })
    .populate('avatar')
    .then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'Email not found' })
      }

      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            address: user.address,
            town: user.town,
            province: user.province,
            postalcode: user.postalcode,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
          }
          console.log('successfully login!!!')
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: '5 days', // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                accessToken: 'Bearer ' + token,
                user,
              })
            },
          )
        } else {
          return res.status(400).json({ error: 'Password incorrect' })
        }
      })
    })
}

exports.verifyEmail = (req, res) => {
  const { token } = req.body
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    console.log(decoded)
    if (err) {
      return res.status(404).send('Unregistered user')
    } else {
      return res.json({
        success: true,
        accessToken: 'Bearer ' + token,
        user: decoded,
      })
    }
  })
  // const { code, email } = req.body
  // if (code === otp) {
  //   console.log('Your Email is verified!  Code: ', code, 'OTP: ', otp)

  //   User.findOne({ email }).then((user) => {
  //     if (user) {
  //       User.findOneAndUpdate({ email }, { $set: { isVerified: true } }).then(
  //         (verifiedUser) => {
  //           const payload = {
  //             id: user._id,
  //             name: user.name,
  //             email: user.email,
  //             username: user.username,
  //             address: user.address,
  //             town: user.town,
  //             province: user.province,
  //             postalcode: user.postalcode,
  //             phone: user.phone,
  //             role: user.role,
  //           }
  //           jwt.sign(
  //             payload,
  //             keys.secretOrKey,
  //             {
  //               expiresIn: '5 days', // 1 year in seconds
  //             },
  //             (err, token) => {
  //               return res.json({
  //                 success: true,
  //                 accessToken: 'Bearer ' + token,
  //                 user: verifiedUser,
  //               })
  //             },
  //           )
  //         },
  //       )
  //     } else {
  //       return res.status(400).json({ email: 'Invalid email' })
  //     }
  //   })
  // } else {
  //   return res
  //     .status(400)
  //     .json({ error: 'Email verification is failed! Please resend email' })
  // }
}

exports.updateProfile = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    newpassword1,
    username,
    phone,
    id,
    avatar,
  } = req.body

  User.findOne({ _id: id }).then(async (user) => {
    if (password !== '') {
      User.findOne({ _id: id }).then((user) => {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newpassword1, salt, (err, hash) => {
                if (err) throw err

                if (avatar) {
                  console.log(1)
                  User.findOneAndUpdate(
                    { _id: id },
                    {
                      $set: {
                        name: firstname + ' ' + lastname,
                        email,
                        username,
                        phone,
                        password: hash,
                        avatar: mongoose.Types.ObjectId(avatar),
                      },
                    },
                  ).then(async (user) => {
                    const updatedUser = await User.findById(id).populate(
                      'avatars',
                    )
                    return res.json({ user: updatedUser })
                  })
                } else {
                  console.log(2)
                  User.findOneAndUpdate(
                    { _id: id },
                    {
                      $set: {
                        name: firstname + ' ' + lastname,
                        email,
                        username,
                        phone,
                        password: hash,
                      },
                    },
                  ).then(async (user) => {
                    const updatedUser = await User.findById(id).populate(
                      'avatars',
                    )
                    return res.json({ user: updatedUser })
                  })
                }
              })
            })
          } else {
            return res.status(400).json({ error: 'Password incorrect' })
          }
        })
      })
    }

    if (avatar) {
      console.log(3)
      User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: firstname + ' ' + lastname,
            email,
            username,
            phone,
            avatar: mongoose.Types.ObjectId(avatar),
          },
        },
      ).then(async (user) => {
        const updatedUser = await User.findById(id).populate('avatar')
        return res.json({ user: updatedUser })
      })
    } else {
      console.log(4)
      User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: firstname + ' ' + lastname,
            email,
            username,
            phone,
          },
        },
      ).then(async (user) => {
        const updatedUser = await User.findById(id).populate('avatars')
        return res.json({ user: updatedUser })
      })
    }
  })
}

exports.getAllUsers = async (req, res) => {
  const { pageNumber, pageSize } = req.body
  const resData = {}
  resData.data = await User.find()
    .sort('username')
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)
  resData.totalNumber = await User.find().count()
  return res.status(200).json(resData)
}

exports.createAvatar = (req, res) => {
  new Avatar(req.body)
    .save()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).send(error))
}

/**
 * Get all avatars
 * @param {object} req
 * @param {object} res
 */
exports.getAllAvatars = (req, res) => {
  Avatar.find()
    .then((results) => {
      return res.status(200).json(results)
    })
    .catch((error) => res.status(500).send(error))
}
