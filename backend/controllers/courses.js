const Course = require('../models/Course');
const {validationResult} = require("express-validator");

exports.courses_get = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
}

exports.add_course_post = async (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const course = await Course.create(req.body);
    res.json(course);
}