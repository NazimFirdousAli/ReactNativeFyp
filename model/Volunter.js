const mongoose = require("mongoose");
const { DATE_REQUIRED, BOOLEAN_DEFAULT, REF_OBJECT_ID_REQUIRED } = require("./SchemaType");

const VolunteerSchema = new mongoose.Schema({
    userId: REF_OBJECT_ID_REQUIRED('users'),
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        default: 80,
    },
    CNIC: {
        type: String,
        required: true,
    },
    AreaOfIntrest: {
        type: String,
        required: true,
        trim: true,
    },
    Availibility: {
        type: Number,
        required: true,
        trim: true,
    },
    Contact_Info: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Address: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isDeleted: BOOLEAN_DEFAULT

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

const Volunteer = mongoose.model("volunteer", VolunteerSchema);

module.exports = Volunteer;