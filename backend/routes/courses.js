const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const courseController = require('../controllers/courses');

router.use(express.urlencoded({extended: true}));

const validateAddCourse = check('courseName').not().isEmpty().withMessage("Course Name is required");

router.get("/list", courseController.courses_get);
router.post("/add", validateAddCourse, courseController.add_course_post);

module.exports = router;