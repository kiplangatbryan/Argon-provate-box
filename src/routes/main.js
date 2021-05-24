const router = require('express').Router()

const {
    indexPage,
    settingsPage,
    addTrackPage,
    postTrack,
    editor,
    profilePage,
    postAuthProfile,
    occupationOptions

} = require('../controllers/main')


const protection = require('../_helpers/_protect')
const { fileHandler } = require('../_helpers/_helpers')


router.get('/', protection, indexPage)
router.get('/new-stuni', protection, addTrackPage)

router.get('/editor',protection, editor)

router.get('/settings',protection, settingsPage)

router.get('/profile', protection, profilePage)

router.get('/post-auth-profile', postAuthProfile)
router.get('/post-role-select', occupationOptions)

router.post('/new-stuff',protection , fileHandler, postTrack)




module.exports = router