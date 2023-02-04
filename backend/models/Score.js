const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
    score: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
});

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;