const Student = require('../models/Student');
const {validationResult} = require('express-validator');

exports.students_get = async (req, res) => {
    const students = await Student.find();
    res.json(students);
}

exports.add_students_post = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const student = await Student.create(req.body);
    res.json(student);
}