const express = require('express')
const router = express.Router()
const { shelter, shelterUser, shelterAdmin, fundRaising, fundUser, fundAdmin, createMissingPerson, MissingPersonUser, MissingPersonAdmin, VolunteerUser, VolunteerAdmin, createVolunteer } = require('../controllers/post')


router.post('/shelter', shelter)

router.post('/fund-rasing', fundRaising)


router.post('/delete-shelter-by-user', shelterUser)

router.post('/delete-shelter-by-admin', shelterAdmin)


router.post('/delete-fund-by-user', fundUser)

router.post('/delete-fund-by-admin', fundAdmin)


router.post('/missing-person', createMissingPerson)

router.post('/volunteer', createVolunteer)

router.post('/delete-missing-person-by-user', MissingPersonUser)

router.post('/delete-missing-person-by-admin', MissingPersonAdmin)


router.post('/delete-volunteer-by-user', VolunteerUser)

router.post('/delete-volunteer-by-admin', VolunteerAdmin)

module.exports = router