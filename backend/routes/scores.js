const express = require("express");
const router = express.Router();
const scoreController = require('../controllers/scores');

router.use(express.urlencoded({extended: true}));

router.get('/list', scoreController.scores_get);
router.post('/add', scoreController.add_score_post);

module.exports = router;