const mongoose = require("mongoose");
const { DATE_REQUIRED, BOOLEAN_DEFAULT } = require("./SchemaType");

const MissingPersonSchema = new mongoose.Schema({
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
    phoneNo: {
        type: String,
        required: true,
    },
    Missing_Place: {
        type: String,
        required: true,
        trim: true,
    },
    Missing_Date: {
        ...DATE_REQUIRED,
        required: true,
        trim: true,
    },
    DressDescription: {
        type: String,
        required: true,
        trim: true,
    },
    Identification_Symbol: {
        type: String,
        required: true,
        trim: true,
    },
    image:{
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

const MissingPerson = mongoose.model("MissingPerson", MissingPersonSchema);

module.exports = MissingPerson;