const express = require('express')
const router = express.Router()
const { verifyEmail, signUp, logIn } = require('../controllers/auth')


router.post('/verify-email', verifyEmail)

router.post('/sign-up', signUp)

router.post('/login', logIn)



// router.post('/change-password', updateLastSeen, changePassword)


module.exports = router