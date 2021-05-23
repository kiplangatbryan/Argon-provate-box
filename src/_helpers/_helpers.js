const crypto = require('crypto')
const multer = require('multer')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      console.log(file.mimetype)
      let file_type = file.mimetype.split('/')[0]

      if (file_type == "audio") {
         cb(null, 'uploads/Tracks/');
      }
      if (file_type == "image") {
         cb(null, 'uploads/Images/');
      }  
      
    },
    filename: (req, file, cb) => {
      cb(
         null,
         crypto.randomBytes(12).toString("hex") + Date.now() +
            "." +
            file.mimetype.split("/")[1]
      )
   },
})


const fileFilter = (req, file, cb) => {
   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return cb(null, true)
   }
   cb(false)
}

const fileMachine = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 10,
   },
   fileFilter: null,
})

config = [
   { name: 'wallpaper', maxCount: 1 },
    { name: 'track', maxCount: 1 },
    { name: 'beat', maxCount: 1 },
    { name: 'acapella', maxCount: 1 }
]
fileHandler = fileMachine.fields(config)

module.exports = {
    fileHandler
}

