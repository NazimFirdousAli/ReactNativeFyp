const bcrypt = require('bcryptjs')
const jwt = require('jwt-simple')
const { Users } = require('../model')
const { getUser } = require('./get')
const moment = require('moment')


const verifyEmail = async (req, res) => {
    try {
        const { body } = req
        let { email, userType, verificationCode } = body

        if (!email || !userType || !verificationCode) {
            return res.send({ success: false, message: 'Please Provide All Fields!' })
        }
        console.log('body', body)

        let findUser = await Users.find({ email: email, userType: userType, confirmationCode: verificationCode/* , authType: 'web' */ })

        console.log('findUser', findUser)

        if (!findUser.length) {
            return res.send({ success: false, message: 'Oops, Incorrect Verification Code!', })
        }

        if (findUser && findUser.status === 'Active') {
            return res.send({ message: 'Email Already Verified.' })
        }

        await Users.findByIdAndUpdate(findUser[0]?._id, { status: 'Active' })

        return res.send({ success: true, message: 'Email Verified Successfully', data: findUser })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!' })
    }
}

const signUp = async (req, res) => {
    try {
        let { body } = req
        console.log('body',body)
        const { email, fullName, password, userType } = body

        if (!email || !fullName || !password || !userType) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        Users.findOne({ email })
            .then((response) => {
                console.log('response', response)


                if (response?.verify) {
                    return res.send({ success: false, message: 'User Already Exists!' })
                }


                if (!response) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(body?.password, salt, async (err, hash) => {
                            if (err) {
                                return res.send({ success: false })
                            }
                            body.password = hash
                            body.verify = true

                            let createUser = new Users(body)

                            await createUser.save()
                                .then((s) => {
                                    console.log('s', s)
                                    return res.send({ success: true, message: 'User Signup Successfully' })
                                })
                                .catch(e => {
                                    console.log('e', e)
                                    return res.send({ success: false, message: 'Something Went Wrong!' })
                                })
                        })
                    })
                }

            })
            .catch((e) => {
                console.log('e', e)
                return res.send({ success: false, message: 'User Already Exists!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}

const logIn = async (req, res) => {
    try {
        const { body } = req
        let { email, password } = body

        if (!email || !password) {
            return res.send({ success: false, message: 'Please provide All fields!' })
        }

        await Users.findOne({ email: email, })
            .then(async (response) => {
                if (response) {
                    return bcrypt.compare(password, response?.password, async (err, result) => {
                        if (err || !result) {
                            return res.send({ success: false, message: 'Oops, incorrect password!', })
                        }
                        if (response?.isBlock) {
                            return res.send({ success: false, message: 'your account has been Blocked!' })
                        }
                        req.params.id = response?._id
                        await Users.findByIdAndUpdate({ _id: response?._id })
                        return getUser(req, res)
                    })
                }
                return res.send({ success: false, message: 'Oops, incorrect Email!', })
            })
            .catch((e) => res.send({ success: false, message: 'Oops, Incorrect Email!', }))
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', })
    }
}


const changePassword = async (req, res) => {
    try {
        let { _id, password, newPassword } = req?.body

        if (!_id || !password || !newPassword) {
            return res.send({ success: false, message: 'Please provide All fields!', })
        }

        await Users.findById({ _id, status: 'Active', authType: 'web' }, async (err, response) => {
            if (err || !response) {
                return res.send({ success: false, message: 'Someting Went Wrong!' })
            }

            bcrypt?.compare(password, response?.password, (err, result) => {
                if (err || !result) {
                    return res.send({
                        success: false, message: 'Oops, Old Password is incorrect!',
                    })
                }

                bcrypt?.genSalt(10, async (err, salt) => {
                    bcrypt?.hash(newPassword, salt, async (err, hash) => {
                        if (err) {
                            return res.send({
                                success: false, message: 'Something went wrong, please try again!!',
                            })
                        }
                        await Users?.findByIdAndUpdate({ _id }, { password: hash }, { new: true, fields: { password: 0, otp: 0 } }, (err, user) => {
                            if (err || !user) {
                                return res.send({
                                    success: false, message: 'Something went wrong, please try again!!',
                                })
                            }
                            return res.send({ success: true, user, message: 'Successfully Updated Password', })
                        })
                    })
                })
            })
        })
    }
    catch (e) {
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '문제가 발생했습니다!' })
    }
}


module.exports = {
    signUp,
    logIn,
    verifyEmail,
    changePassword,
}
