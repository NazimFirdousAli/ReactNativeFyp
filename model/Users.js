const mongoose = require('mongoose')
const { CREATED_DATE, STRING, BOOLEAN_DEFAULT, DATE, NUMBER, REF_OBJECT_ID, ARRAY } = require('./SchemaType')

const userSchema = new mongoose.Schema({
    fullName: STRING,
    email: {
        ...STRING,
        trim: true,
        lowercase: true,
        default: null,
    },
    gender: {
        ...STRING,
        lowercase: true
    },
    userType: {
        ...STRING,
        lowercase: true
    },
    status: {
        ...STRING,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    address: {
        ...STRING,
        default: null,
    },
    telNo: STRING,
    password: STRING,
    verify: BOOLEAN_DEFAULT,
    DOB: DATE,
    createdAt: CREATED_DATE,
    
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
