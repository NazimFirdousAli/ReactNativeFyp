const { Users, FundRaising } = require('../model')
const MissingPerson = require('../model/MissingPerson')
const Shelter = require('../model/Shelter')
const Volunteer = require('../model/Volunter')

const getUser = async (req, res) => {
    try {
        const { id } = req?.params

        if (!id || id == 'null' || id == null || id == undefined || id == 'undefined') {
            return res.send({ success: false, message: 'Request Params is missing!', })
        }


        await Users?.findOne({ _id: id }, { password: 0 }, async (err, user) => {
            if (err || !user) {
                return res.send({ success: false, message: 'No user found!', })
            }
            return res.send({ success: true, user })
        })
        // .populate({ path: 'preferredGolfCourse' })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!' })
    }
}


const getShelterById = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        if (!id || id == 'null' || id == null || id == undefined || id == 'undefined') {
            return res.send({ success: false, message: 'Request Params is missing!', })
        }

        await Shelter?.find({ userId: id, isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No shelter found!', })
            }
            return res.send({ success: true, data })
        })
    } catch (e) {
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getFundById = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        if (!id || id == 'null' || id == null || id == undefined || id == 'undefined') {
            return res.send({ success: false, message: 'Request Params is missing!', })
        }

        await FundRaising?.find({ userId: id, isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No Fundraising found!', })
            }
            return res.send({ success: true, data })
        })
    } catch (e) {
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getShelter = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        await Shelter?.find({ isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No shelter found!', })
            }
            console.log('data', data)
            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getFund = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        await FundRaising?.find({ isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No Fund found!', })
            }
            console.log('data', data)
            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}


const getMissingPersonById = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        if (!id || id == 'null' || id == null || id == undefined || id == 'undefined') {
            return res.send({ success: false, message: 'Request Params is missing!', })
        }

        await MissingPerson?.find({ _id: id, isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No MissingPerson found!', })
            }
            return res.send({ success: true, data })
        })
    } catch (e) {
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getVolunteerById = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        if (!id || id == 'null' || id == null || id == undefined || id == 'undefined') {
            return res.send({ success: false, message: 'Request Params is missing!', })
        }

        await Volunteer?.find({ _id: id, isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No Volunteer found!', })
            }
            return res.send({ success: true, data })
        })
    } catch (e) {
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getMissingPerson = async (req, res) => {

    try {
        const { params } = req

        await MissingPerson?.find({ isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No MissingPerson found!', })
            }
            console.log('Missing Person', data)
            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const getVolunteer = async (req, res) => {

    try {
        const { params } = req
        const { id } = params

        await Volunteer?.find({ isDeleted: false }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'No Volunteer found!', })
            }
            console.log('data', data)
            return res.send({ success: true, data })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

module.exports = {
    getUser,
    getShelter,
    getShelterById,
    getFundById,
    getFund,
    getMissingPerson,
    getMissingPersonById,
    getVolunteerById,
    getVolunteer
}