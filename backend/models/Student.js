const moment = require("moment");
const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minlength: [2, "Must have at least 2 character"],
        maxlength: [60, "name too long"]
    },
    familyName: {
        type:String,
        required: true,
        minlength: [2, "Must have at least 2 character"],
        maxlength: [60, "name too long"]
    },
    birthDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(birthDate) {
                const currentYear = moment().year();
                moment(birthDate).year() <= currentYear - 10;
            },
            message: "Student must be at least 10 years old"
        }
    }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;