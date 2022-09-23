/**
 * The middleware to upload the file on the server
 * Created at 2021/10/15
 * Created by Ilia L
 */
const multer = require('multer')
const { UPLOADS_DIRECTORY } = require('../utils/constants')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, UPLOADS_DIRECTORY)
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`)
      // cb(null, file.originalname)
    },
  }),
  limits: {
    fileSize: 500000000, // max file size 5MB = 5000000 bytes
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(jpeg|jpg|JPG|PNG|png|mp3|MP3|AAC|aac|wav|WAV)$/,
      )
    ) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.',
        ),
      )
    }
    cb(undefined, true) // continue with upload
  },
})

module.exports = upload
