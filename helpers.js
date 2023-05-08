const { Admin } = require('./model')
require('dotenv')

const verifyAdmin = async (_id) => {
  try {
    let count = await Admin.countDocuments({ _id })
    return count
  }
  catch (e) {
    console.log('e', e?.message)
    return false
  }
}

module.exports = { verifyAdmin }