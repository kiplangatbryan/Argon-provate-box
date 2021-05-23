const router = require('express').Router()

const { indexPage, settingsPage, addTrackPage,postTrack, editor, profilePage } = require('../controllers/main')
const protection = require('../_helpers/_protect')
const { fileHandler } = require('../_helpers/_helpers')


router.get('/', protection, indexPage)
router.get('/new-stuni', protection, addTrackPage)

router.get('/editor',protection, editor)

router.get('/settings',protection, settingsPage)

router.get('/profile', protection, profilePage)




router.post('/new-stuff',protection , fileHandler, postTrack)




module.exports = router