const mongoose = require('mongoose')
const { STRING_REQUIRED_TRIM, STRING_REQUIRED, CREATED_DATE,NUMBER,STRING } = require('./SchemaType')

const adminSchema = new mongoose.Schema({
    userName: STRING,
    email: STRING_REQUIRED_TRIM,
    password: STRING_REQUIRED,
    telNo: NUMBER,
    created: CREATED_DATE
})

const Admins = mongoose.model('admin', adminSchema)

module.exports = Admins