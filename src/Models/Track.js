const mongoose = require('mongoose')


const TrackSchema = mongoose.Schema({
    title: {
         required: true,
         type: String,
    },
    type: {
         required: true,
         type: String,
    },
    genre: {
         required: true,
         type: String,
    },
    trackUrl: {
        required: true,
        type: String
    },
    trackImg: {
        required: true,
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    type_of_song: {
        required: true,
        default: 'single',
        type: String,
    },
    trackInfo: {},
    components: {}
}, { timestamps: true })


module.exports = mongoose.model('track', TrackSchema)