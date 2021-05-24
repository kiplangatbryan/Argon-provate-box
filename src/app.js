const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const app = express()
var session_store = require('connect-mongodb-session')(session);
const mongoose = require('mongoose')
const flash = require('express-flash')

// user defined imports
const User = require('./Models/User')
const { errorHandler } = require('./_helpers/_helpers')
const  protection  = require('./_helpers/_protect')


// settings
app.use(logger('dev'))
app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', 'src/views')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
// set images available
app.use('/uploads', protection, express.static('uploads'))

// config
const local_uri = "mongodb://localhost:27017/stuni"


var store = new session_store({
  uri:  local_uri,
  collection: 'mySessions'
})

const sess = {
  secret: 'keyboard cat',
  resave: false,
  store,
  saveUninitialized: true,
  cookie: { }
}
app.use(session(sess))


// define routes 
const { auth, main } = require('./routes')

app.use(async (req, res, next) => {
   if (!req.session.user) {
      return next()
   }
  try {
      console.log('passed here')
     
      const user = await User.findById(req.session.user._id)
      req.user = user
      next()
   } catch (err) {
      const error = new Error(err)
      error.statusCode = 500
      next(error)
   }
})

app.use(auth)
app.use(main)

app.use(errorHandler)

mongoose.connect(local_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(8081, () => {
})

  })
  .catch(err => {
  console.log(err)
})
