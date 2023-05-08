const mongoose = require('mongoose')
const { STRING, BOOLEAN_DEFAULT, DATE, NUMBER, REF_OBJECT_ID, ARRAY, REF_OBJECT_ID_REQUIRED, CREATED_DATE } = require('./SchemaType')

const shelterSchema = new mongoose.Schema({
    fullName: STRING,
    userId: REF_OBJECT_ID_REQUIRED('users'),
    email: {
        ...STRING,
        trim: true,
        lowercase: true,
        default: null,
    },
    shelterCat: {
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
    shelter: {
        ...STRING,
        default: null,
    },
    days: {
        ...STRING,
        default: null,
    },
    shelterCat: {
        ...STRING,
        default: null,
    },
    image:{
        type: String,
        required: true,
        trim: true,
        unique: true  
    },
    createdAt: CREATED_DATE,
    isDeleted: BOOLEAN_DEFAULT

})

const Shelter = mongoose.model('shelter', shelterSchema)

module.exports = Shelter
