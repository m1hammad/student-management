const Score = require('../models/Score');
const Course = require("../models/Course");
const Student = require("../models/Student");

exports.scores_get = async (req,res) => {
    const score = await Score.find().populate("studentId").populate("courseId");
    res.json(score);
}

exports.add_score_post = async (req, res) => {
    const student = await Student.findById(req.body.studentId);
    const course = await Course.findById(req.body.courseId);

    if(!student || !course){
        return res.status(400).json({msg: "invalid student or course ID"});
    }

    const score = await Score.create(req.body);
    res.json(score);
}