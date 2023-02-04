const express = require("express");
const router = express.Router();
const moment = require("moment");
const {check} = require('express-validator');
const studentController = require('../controllers/students')

router.use(express.urlencoded({extended: true}));

const validateAddStudent = [
    check('firstName').isLength({min: 2}).withMessage('First name must have at least 2 characters'),
    check('familyName').isLength({min: 2}).withMessage('Family name must have at least 2 characters'),
    check('birthDate').custom((date, {req}) => {
        const currentYear = moment().year();
        return moment(date).year() <= currentYear - 10;
    }).withMessage('Student must be at least 10 years old')
];

router.get('/list', studentController.students_get);
router.post('/add', validateAddStudent, studentController.add_students_post);

module.exports = router;