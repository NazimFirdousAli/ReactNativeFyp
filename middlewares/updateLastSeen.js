const { Users } = require("../model")
const moment = require('moment')

const updateLastSeen = async (req, res, next) => {
    try {
        const { userId } = req?.body
        const { _id } = req?.body
        const { id } = req?.params
        let ID = userId || id || _id
        if (ID) {
            await Users.findByIdAndUpdate({ _id: ID }, { lastLogin: moment() })
            // console.log('MIDDLEWARE WOKING')
            next()
        } else {
            next()
        }
    } catch (e) {
        console.log('e.....', e)
        return res.send({ success: false, message: 'Something Went Wrong!', messageKr: '뭔가 잘못됐어!' })
    }
}

module.exports = { updateLastSeen }