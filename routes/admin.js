const express = require('express')
const router = express.Router()
const { signUp, logIn, getAllUsersForAdmin } = require('../controllers/admin')


router.post('/signup', signUp)

router.post('/logIn', logIn)

router.get('/get-all-users/:id', getAllUsersForAdmin)

module.exports = router