const router = require('express').Router()

const { login, register, logout, updateUser, postRegister, postLogin} = require('../controllers/auth')

router.get('/sign-in', login)
router.get('/sign-up', register)
router.get('/logout', logout)
router.post('/account-update', updateUser)
router.post('/register', postRegister)
router.post('/login', postLogin)

module.exports = router