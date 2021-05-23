const mongoose = require('mongoose')




const UserModel = mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
         type: String,
    },
    password: {
          required: true,
         type: String,
    },
    number: {
        required: true,
        type: String,
    },
    stats: {},
    resetToken: "",
    resetTokenExpiration: "",
    profile: {

    }          

})


module.exports = mongoose.model('user', UserModel)