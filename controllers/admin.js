const bcrypt = require('bcryptjs')
const _ = require('lodash')
const { Admin, Users,  } = require('../model')
const { verifyAdmin } = require('../helpers')


const signUp = async (req, res) => {
    try {
        const { body } = req
        const { email, password, confirmPassword, telNo, userName } = body

        if (!email || !password || !confirmPassword || !userName) {
            return res.send({ success: false, message: 'Please provide All fields!', messageKr: '모든 항목을 작성해주세요!' })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.send({ success: false })
                }
                body.password = hash

                let createAdmin = new Admin(body)
                createAdmin.save()
                    .then(() => res.send({ success: true, message: 'Admin Created Successfully!' }))
                    .catch((e) => res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' }))
            })
        })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}

const logIn = async (req, res) => {
    try {
        const { body } = req
        const { email, password } = body
        console.log('body', body)

        Admin.findOne({ email: email })
            .then((response) => {
                if (response) {
                    return bcrypt.compare(password, response?.password, (err, result) => {
                        if (err || !result) {
                            return res.send({ success: false, message: 'Oops, incorrect Email or Password!', messageKr: '잘못된 이메일 또는 잘못된 이메일주소 입니다.' })
                        }

                        Admin.findById({ _id: response._id }, { password: 0 })
                            .then((admin) => {
                                return res.send({ success: true, admin })
                            })
                            .catch((e) => res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' }))
                    })
                }
                return res.send({ success: false, message: 'Oops, incorrect Email or Password!', messageKr: '잘못된 이메일 또는 잘못된 이메일주소 입니다.' })
            })
            .catch((e) => res.send({ success: false, message: 'Oops, incorrect Email or Password!', messageKr: '잘못된 이메일 또는 잘못된 이메일주소 입니다.' }))
    }
    catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}

const getAdmin = async (req, res) => {
    const { id } = req?.params

    await Admin?.findOne({ _id: id }, { password: 0 }, async (err, admin) => {
        if (err || !admin) {
            return res.send({ success: false, message: 'No Admin found!', messageKr: '어드민 계정에 접근할 수 없습니다.' })
        }
        return res.send({ success: true, admin })
    })
}

const getAllUsersForAdmin = async (req, res) => {
    try {
        const { params } = req
        const { id } = params

        let isAdmin = await verifyAdmin(id)

        if (isAdmin) {
            Users.find({ isDeleted: false }, async (err, data) => {
                if (err || !data) {
                    return res.send({ success: false, message: 'No Data Found!', messageKr: '정보를 찾을 수 없습니다.' })
                }
                return res.send({ success: true, data })
            })
        }
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { body } = req
        const { _id, isDeleted, adminId } = body

        if (!_id || !adminId) {
            return res.send({ success: false, message: 'Please provide All fields!', messageKr: '모든 항목을 작성해주세요!' })
        }

        let isAdmin = await verifyAdmin(adminId)
        if (!isAdmin) {
            return res.send({ success: false, message: `Don't have Admin Access`, messageKr: '어드민 계정에 접근할 수 없습니다.' })
        }

        Users.findByIdAndUpdate(_id, { isDeleted: true }, async (err, data) => {
            if (err || !data) {
                return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
            }

            return res.send({ success: true, message: `Sucessfully Deleted`, messageKr: '삭제완료' })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}


const changeAdminPassword = async (req, res) => {
    try {
        const { body } = req
        const { oldPassword, newPassword, confirmPassword, _id } = body

        if (!_id || !oldPassword || !newPassword || !confirmPassword) {
            return res.send({ success: false, message: 'Please provide All fields!', messageKr: '모든 항목을 작성해주세요!' })
        }

        if (newPassword !== confirmPassword) {
            return res.send({ success: false, message: 'Password did Not Match', messageKr: '비밀번호가 일치하지 않습니다.' })
        }
        let isAdmin = await verifyAdmin(_id)
        if (!isAdmin) {
            return res.send({ success: false, message: `Don't have Admin Access`, messageKr: '어드민 계정에 접근할 수 없습니다.' })
        }
        await Admin.findById({ _id }, async (err, response) => {
            if (err || !response) {
                return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
            }

            bcrypt?.compare(oldPassword, response?.password, (err, result) => {
                if (err || !result) {
                    return res.send({ success: false, message: 'Oops, incorrect password!', messageKr: '잘못된 비밀번호 입니다.' })
                }

                bcrypt?.genSalt(10, async (err, salt) => {
                    bcrypt?.hash(newPassword, salt, async (err, hash) => {
                        if (err) {
                            return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
                        }
                        await Admin?.findByIdAndUpdate({ _id }, { password: hash }, { new: true, fields: { password: 0, otp: 0 } }, (err, user) => {
                            if (err || !user) {
                                return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
                            }
                            return res.send({ success: true, user, message: 'Successfully Updated Password', messageKr: '비밀번호 업데이트 완료' })
                        })
                    })
                })
            })
        })
    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}


module.exports = {
    logIn,
    signUp,
    getAdmin,
    getAllUsersForAdmin,
    deleteUser,
    changeAdminPassword,
}