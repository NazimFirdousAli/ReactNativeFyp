const express = require('express')
const router = express.Router()
const { getUser, getShelter, getShelterById, getFundById, getFund, getMissingPerson, getMissingPersonById, getVolunteer, getVolunteerById } = require('../controllers/get')

router.get('/get-user/:id', getUser)

router.get('/get-shelter-by-user-id/:id', getShelterById)

router.get('/get-shelter', getShelter)

router.get('/get-fund', getFund)

router.get('/get-fund-by-user-id/:id', getFundById)

router.get('/get-missing-person-by-user-id/:id', getMissingPersonById)

router.get('/get-missing-person', getMissingPerson)

router.get('/get-volunteer', getVolunteer)

router.get('/get-volunteer-by-user-id/:id', getVolunteerById)

module.exports = router