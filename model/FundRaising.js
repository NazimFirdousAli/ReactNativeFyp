const mongoose = require('mongoose')
const { STRING, BOOLEAN_DEFAULT, DATE, NUMBER, REF_OBJECT_ID, ARRAY, REF_OBJECT_ID_REQUIRED, CREATED_DATE } = require('./SchemaType')

const fundRaising = new mongoose.Schema({
    userId: REF_OBJECT_ID_REQUIRED('users'),
    fullName: STRING,
    email: {
        ...STRING,
        trim: true,
        lowercase: true,
        default: null,
    },
    pruposeForFunds: {
        ...STRING,
        lowercase: true
    },
    address: {
        ...STRING,
        default: null,
    },
    telNo: STRING,
    amountRequired: {
        ...STRING,
        default: null,
    },
    accountDetails: {
        ...STRING,
        default: null,
    },
    createdAt: CREATED_DATE,
    isDeleted: BOOLEAN_DEFAULT
})

const FundRaising = mongoose.model('fundraising', fundRaising)

module.exports = FundRaising
