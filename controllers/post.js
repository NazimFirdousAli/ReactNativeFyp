const Shelter = require("../model/Shelter")
const { Users, FundRaising } = require('../model')
const Volunteer = require("../model/Volunter")
const MissingPersonModel = require("../model/MissingPerson")

const shelter = async (req, res) => {
    try {
        let { body } = req
        const { email, fullName, address, telNo, shelter, image } = body
        console.log('body', body)

        if (!email || !fullName || !address || !telNo || !shelter || !image) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        const createShelter = new Shelter(body)

        await createShelter.save()
            .then((s) => {
                console.log('s', s)
                return res.send({ success: true, message: 'Shelter created successfully!' })
            })
            .catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const fundRaising = async (req, res) => {
    try {
        let { body } = req
        const { userId, email, fullName, accountDetails, pruposeForFunds, amountRequired, address, telNo, } = body
        console.log('body', body)

        if (!userId || !email || !fullName || !address || !telNo || !accountDetails || !pruposeForFunds || !amountRequired) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        const createFund = new FundRaising(body)

        await createFund.save()
            .then((s) => {
                console.log('s', s)
                return res.send({ success: true, message: 'Fundraising created successfully!' })
            })
            .catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const shelterUser = async (req, res) => {
    try {
        const { body } = req
        const { _id, userId } = body
        if (!_id || !userId) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }
        let findUser = await Users?.findOne({ _id: userId }).exec()

        if (!findUser) {
            return res.send({ success: false, message: 'No user found with this id!', })
        }

        await Shelter.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }

            return res.send({ success: true, message: 'Shelter Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const fundUser = async (req, res) => {
    try {
        const { body } = req
        const { _id, userId } = body
        if (!_id || !userId) {
            return res.send({ success: false, message: 'Please provide all fields!', })
        }
        let findUser = await Users?.findOne({ _id: userId }).exec()

        if (!findUser) {
            return res.send({ success: false, message: 'No user found with this id!', })
        }

        await FundRaising.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }

            return res.send({ success: true, message: 'Fund Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const shelterAdmin = async (req, res) => {
    try {
        const { body } = req
        const { _id } = body
        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }

        await Shelter.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }
            return res.send({ success: true, message: 'Shelter Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const fundAdmin = async (req, res) => {
    try {
        const { body } = req
        const { _id } = body
        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }

        await FundRaising.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }
            return res.send({ success: true, message: 'Fund Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}


const createMissingPerson = async (req, res) => {
    try {
        let { body } = req
        const { name,
            age,
            phoneNo,
            Missing_Place,
            Missing_Date,
            DressDescription,
            Identification_Symbol, image
        } = body
        console.log('body', body)

        if (!name
            || !age
            || !phoneNo
            || !Missing_Place
            || !Missing_Date
            || !DressDescription
            || !Identification_Symbol
            || !image) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        const newMissingPerson = new MissingPersonModel(body)

        await newMissingPerson.save()
            .then((s) => {
                console.log('s', s)
                return res.send({ success: true, message: 'MissingPerson created successfully!' })
            })
            .catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const createVolunteer = async (req, res) => {
    try {
        let { body } = req
        const {
            name,
            age,
            CNIC,
            AreaOfIntrest,
            Availibility,
            Contact_Info,
            Address,
            image,
        } = body
        console.log('body', body)
        console.log('fields', !name,
            !age,
            !CNIC,
            !AreaOfIntrest,
            !Availibility,
            !Contact_Info,
            !Address,
            !image)

        if (!name ||
            !age ||
            !CNIC ||
            !AreaOfIntrest ||
            !Availibility ||
            !Contact_Info ||
            !Address ||
            !image) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        const newVolunteer = new Volunteer(body)

        await newVolunteer.save()
            .then((s) => {
                console.log('s', s)
                return res.send({ success: true, message: 'Volunteer created successfully!' })
            })
            .catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const MissingPersonUser = async (req, res) => {
    try {
        const { body } = req
        const { _id, userId } = body
        if (!_id || !userId) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }
        let findUser = await Users?.findOne({ _id: userId }).exec()

        if (!findUser) {
            return res.send({ success: false, message: 'No user found with this id!', })
        }

        await MissingPersonModel.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }

            return res.send({ success: true, message: 'MissingPerson Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const VolunteerUser = async (req, res) => {
    try {
        const { body } = req
        const { _id, userId } = body
        if (!_id || !userId) {
            return res.send({ success: false, message: 'Please provide all fields!', })
        }
        let findUser = await Users?.findOne({ _id: userId }).exec()

        if (!findUser) {
            return res.send({ success: false, message: 'No user found with this id!', })
        }

        await Volunteer.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }

            return res.send({ success: true, message: 'Volunteer Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const MissingPersonAdmin = async (req, res) => {
    try {
        const { body } = req
        const { _id } = body
        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }

        await MissingPersonModel.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }
            return res.send({ success: true, message: 'MissingPerson Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const VolunteerAdmin = async (req, res) => {
    try {
        const { body } = req
        const { _id } = body
        if (!_id) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }

        await Volunteer.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!', })
            }
            return res.send({ success: true, message: 'Volunteer Deleted Successfully!', })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}


module.exports = {
    shelter,
    shelterUser,
    shelterAdmin,
    fundRaising,
    fundUser,
    fundAdmin,
    createMissingPerson,
    MissingPersonUser,
    MissingPersonAdmin,
    createVolunteer,
    VolunteerUser,
    VolunteerAdmin
}