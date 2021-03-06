const Track = require('../Models/Track')


const indexPage = (req, res) => {
    res.render('index',
    {
        content: 'dashboard',
        user: req.session.user
    })
}

const settingsPage = (req, res) => {
    res.render('settings',
    {
        content: 'Customize your House',
        user: req.session.user

    })
}

const addTrackPage = (req, res) => {
    res.render('new-stuni', {
        content: 'Upload a new Track',
        user: req.session.user

    })
}

const editor = async(req, res) => {

    const myTracks = await Track.find({ userId: req.user._id })
    console.log(myTracks)
    
    res.render('editor',{
        content: 'Editor',
        user: req.session.user,
        items: myTracks
    }
    )
}


const profilePage = (req, res) => {
    res.render('profile',{
        content: 'Your Identity',
        user: req.session.user

    })
}

const postTrack = async (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    const { type, genre, track_name } = req.body

    const  { path: trackImg } = req.files.wallpaper[0]
    const { path: trackUrl , size } = req.files.track[0]

    let components = {}
    if (req.files.acapella || req.files.beat) {

    let { path: acapella, size:sizeA } = req.files.acapella[0]
    let { path: beat, size:sizeB } = req.files.beat[0]


        components = {
        acapella: {
            size: sizeA,
            url: acapella,
        },
        beat: {
            size: sizeB,
            url: beat,
        }
        }
    }
    
    const trackInfo = {
        size: size,
        likes: 0,
        listens: 0,
        incomplete: 0,
        comments: []
    }
    


      const product = new Track({
         type,
         genre,
          title: track_name,
          trackImg,
         trackUrl,
        trackInfo,
          components,
         userId: req.user
      })

      try {
         await product.save()

         return res.status(201).redirect('/new-stuni')

      } catch (err) {
         const Err = new Error(err)
         Err.statusCode = 500
         next(Err)
      }

}

const postAuthProfile = (req, res) => {
    res.render('post-auth/profile')
}

const occupationOptions = (req, res) => {
    res.render('post-auth/category')
    
}


module.exports = {
    indexPage,
    settingsPage,
    addTrackPage,
    editor,
    profilePage,
    postTrack,
    postAuthProfile,
    occupationOptions
}